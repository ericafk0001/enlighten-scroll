"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface RevealTextProps {
  children: string;
  className?: string;
  as?: "p" | "h1" | "h2" | "h3" | "h4";
  startOpacity?: number;
  triggerStart?: string;
  triggerEnd?: string;
  controlled?: boolean;
}

export function RevealText({
  children,
  className,
  as: Tag = "p",
  startOpacity = 0.12,
  triggerStart = "top 95%",
  triggerEnd = "bottom 20%",
  controlled = false,
}: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (controlled || !containerRef.current) return;

    const spans = containerRef.current.querySelectorAll<HTMLSpanElement>("[data-char]");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: triggerStart,
          end: triggerEnd,
          scrub: 1.2,
        } satisfies ScrollTrigger.Vars,
      });

      tl.fromTo(
        spans,
        { opacity: startOpacity },
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.022,
          ease: "power2.inOut",
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [controlled]);

  const words = children.split(" ");

  return (
    <div ref={containerRef}>
      <Tag className={className} aria-label={children}>
        {words.map((word, wi) => (
          <span key={wi} style={{ display: "inline" }}>
            <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              {Array.from(word).map((char, ci) => (
                <span
                  key={ci}
                  data-char
                  aria-hidden="true"
                  style={{ opacity: startOpacity, display: "inline" }}
                >
                  {char}
                </span>
              ))}
            </span>
            {wi < words.length - 1 && " "}
          </span>
        ))}
      </Tag>
    </div>
  );
}
