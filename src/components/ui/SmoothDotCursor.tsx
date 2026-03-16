"use client";

import { gsap } from "@/lib/gsap";
import { useEffect, useRef, useState } from "react";

export function SmoothDotCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const finePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const updateEnabledState = () => {
      setIsEnabled(finePointerQuery.matches && !reducedMotionQuery.matches);
    };

    updateEnabledState();

    finePointerQuery.addEventListener("change", updateEnabledState);
    reducedMotionQuery.addEventListener("change", updateEnabledState);

    return () => {
      finePointerQuery.removeEventListener("change", updateEnabledState);
      reducedMotionQuery.removeEventListener("change", updateEnabledState);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveX = gsap.quickTo(cursor, "x", {
      duration: 0.67,
      ease: "power3.out",
    });
    const moveY = gsap.quickTo(cursor, "y", {
      duration: 0.67,
      ease: "power3.out",
    });

    const handleMouseMove = (event: MouseEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      moveX.tween?.kill();
      moveY.tween?.kill();
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-9999 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/85 mix-blend-difference"
    />
  );
}
