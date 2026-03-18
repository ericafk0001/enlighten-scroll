"use client";

import { useEffect, useRef } from "react";
import {
  Bodies,
  Body,
  Composite,
  Engine,
  Vector,
  type Body as MatterBody,
} from "matter-js";

type PhysicsSkillPillsProps = {
  skills: string[];
  className?: string;
};

type SkillBody = {
  body: MatterBody;
  element: HTMLDivElement;
  renderX: number;
  renderY: number;
  renderAngle: number;
  chaosPhase: number;
};

const WALL_THICKNESS = 160;
const CURSOR_INFLUENCE_RADIUS = 180;
const CURSOR_FORCE = 0.0027;
const CHAOS_FORCE = 0.00003;
const MAX_SPEED = 11;

function getPillDimensions(text: string, isSmallScreen: boolean) {
  const horizontalPadding = isSmallScreen ? 68 : 88;
  const height = isSmallScreen ? 56 : 68;
  const charWidth = isSmallScreen ? 8.5 : 10;

  return {
    width: Math.max(
      isSmallScreen ? 176 : 220,
      text.length * charWidth + horizontalPadding,
    ),
    height,
  };
}

export function PhysicsSkillPills({
  skills,
  className = "",
}: PhysicsSkillPillsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || skills.length === 0) {
      return;
    }

    let engine: Engine | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let rafId = 0;
    let frameLastTime = performance.now();

    const initializeWorld = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) {
        return;
      }

      container.innerHTML = "";

      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      engine = Engine.create({
        gravity: { x: 0, y: 0 },
      });
      engine.positionIterations = 8;
      engine.velocityIterations = 6;
      engine.constraintIterations = 2;

      const walls = [
        Bodies.rectangle(
          width / 2,
          -WALL_THICKNESS / 2,
          width + WALL_THICKNESS * 2,
          WALL_THICKNESS,
          {
            isStatic: true,
          },
        ),
        Bodies.rectangle(
          width / 2,
          height + WALL_THICKNESS / 2,
          width + WALL_THICKNESS * 2,
          WALL_THICKNESS,
          {
            isStatic: true,
          },
        ),
        Bodies.rectangle(
          -WALL_THICKNESS / 2,
          height / 2,
          WALL_THICKNESS,
          height + WALL_THICKNESS * 2,
          {
            isStatic: true,
          },
        ),
        Bodies.rectangle(
          width + WALL_THICKNESS / 2,
          height / 2,
          WALL_THICKNESS,
          height + WALL_THICKNESS * 2,
          {
            isStatic: true,
          },
        ),
      ];

      Composite.add(engine.world, walls);

      const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
      const skillBodies: SkillBody[] = [];

      const columns = isSmallScreen ? 2 : 3;
      const baseXStep = width / (columns + 1);
      const rows = Math.ceil(skills.length / columns);
      const baseYStep = Math.max(66, height / (rows + 1));

      skills.forEach((skill, index) => {
        const pillElement = document.createElement("div");
        pillElement.className =
          "absolute rounded-full bg-[#d4e157] px-8 py-4 flex items-center justify-center text-base sm:text-xl font-semibold text-neutral-900 whitespace-nowrap select-none pointer-events-none";
        pillElement.textContent = skill;
        container.appendChild(pillElement);

        const { width: pillWidth, height: pillHeight } = getPillDimensions(
          skill,
          isSmallScreen,
        );

        const col = index % columns;
        const row = Math.floor(index / columns);
        const jitterX = (Math.random() - 0.5) * Math.min(120, baseXStep * 0.6);
        const jitterY = (Math.random() - 0.5) * 64;

        const x = baseXStep * (col + 1) + jitterX;
        const y = baseYStep * (row + 1) + jitterY;

        const body = Bodies.rectangle(x, y, pillWidth, pillHeight, {
          frictionAir: 0.022,
          friction: 0.06,
          restitution: 0.9,
          inertia: Infinity,
          chamfer: { radius: pillHeight / 2 },
        });

        Composite.add(engine!.world, body);
        skillBodies.push({
          body,
          element: pillElement,
          renderX: x,
          renderY: y,
          renderAngle: 0,
          chaosPhase: Math.random() * Math.PI * 2,
        });
      });

      const pointer = {
        x: -10_000,
        y: -10_000,
        px: -10_000,
        py: -10_000,
        vx: 0,
        vy: 0,
        active: false,
        seenAt: performance.now(),
      };

      const handlePointerMove = (event: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        pointer.px = pointer.x;
        pointer.py = pointer.y;
        pointer.x = event.clientX - rect.left;
        pointer.y = event.clientY - rect.top;
        pointer.vx = pointer.x - pointer.px;
        pointer.vy = pointer.y - pointer.py;
        pointer.active =
          pointer.x >= 0 &&
          pointer.x <= rect.width &&
          pointer.y >= 0 &&
          pointer.y <= rect.height;
        pointer.seenAt = performance.now();
      };

      const handlePointerLeave = () => {
        pointer.active = false;
        pointer.vx = 0;
        pointer.vy = 0;
      };

      container.addEventListener("pointermove", handlePointerMove);
      container.addEventListener("pointerleave", handlePointerLeave);

      frameLastTime = performance.now();
      const animate = (now: number) => {
        const dt = Math.min(28, Math.max(8, now - frameLastTime));
        frameLastTime = now;
        const seconds = now * 0.001;

        if (pointer.active || now - pointer.seenAt < 60) {
          for (const skill of skillBodies) {
            const { body } = skill;
            const delta = Vector.sub(body.position, pointer);
            const distance = Math.max(1, Vector.magnitude(delta));

            if (distance <= CURSOR_INFLUENCE_RADIUS) {
              const direction = Vector.normalise(delta);
              const pointerSpeed = Math.min(
                32,
                Math.hypot(pointer.vx, pointer.vy),
              );
              const speedBoost = 1 + pointerSpeed * 0.12;
              const strength =
                (1 - distance / CURSOR_INFLUENCE_RADIUS) *
                CURSOR_FORCE *
                body.mass *
                speedBoost;

              Body.applyForce(body, body.position, {
                x: direction.x * strength,
                y: direction.y * strength,
              });
            }
          }
        }

        for (const skill of skillBodies) {
          const { body, chaosPhase } = skill;
          const chaosX = Math.sin(seconds * 1.7 + chaosPhase) * CHAOS_FORCE;
          const chaosY = Math.cos(seconds * 1.3 + chaosPhase) * CHAOS_FORCE;
          Body.applyForce(body, body.position, { x: chaosX, y: chaosY });

          const speed = Math.hypot(body.velocity.x, body.velocity.y);
          if (speed > MAX_SPEED) {
            const scale = MAX_SPEED / speed;
            Body.setVelocity(body, {
              x: body.velocity.x * scale,
              y: body.velocity.y * scale,
            });
          }
        }

        Engine.update(engine!, dt);

        const blend = 0.24;
        for (const skill of skillBodies) {
          const { body, element } = skill;
          skill.renderX += (body.position.x - skill.renderX) * blend;
          skill.renderY += (body.position.y - skill.renderY) * blend;
          skill.renderAngle += (body.angle - skill.renderAngle) * 0.2;

          element.style.transform = `translate(-50%, -50%) translate(${skill.renderX}px, ${skill.renderY}px) rotate(${skill.renderAngle}rad)`;
        }

        pointer.vx *= 0.82;
        pointer.vy *= 0.82;

        rafId = requestAnimationFrame((time) => {
          animate(time);
        });
      };

      animate(frameLastTime);

      return () => {
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerleave", handlePointerLeave);
      };
    };

    let disposeWorld = initializeWorld();

    resizeObserver = new ResizeObserver(() => {
      disposeWorld?.();
      disposeWorld = initializeWorld();
    });
    resizeObserver.observe(container);

    return () => {
      disposeWorld?.();
      resizeObserver?.disconnect();

      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      if (engine) {
        Engine.clear(engine);
      }

      container.innerHTML = "";
    };
  }, [skills]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      aria-hidden
    />
  );
}
