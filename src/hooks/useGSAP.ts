"use client";

import { useEffect, useRef, RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function useGSAP<T extends HTMLElement = HTMLDivElement>(
  animationFn: (
    element: T,
    gsapInstance: typeof gsap,
  ) => gsap.core.Tween | gsap.core.Timeline | void,
): RefObject<T | null> {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      animationFn(elementRef.current!, gsap);
    }, elementRef);

    return () => ctx.revert();
  }, [animationFn]);

  return elementRef;
}

export function useScrollTrigger<T extends HTMLElement = HTMLDivElement>(
  animationFn: (
    element: T,
    gsapInstance: typeof gsap,
    ScrollTriggerInstance: typeof ScrollTrigger,
  ) => gsap.core.Tween | gsap.core.Timeline | void,
): RefObject<T | null> {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      animationFn(elementRef.current!, gsap, ScrollTrigger);
    }, elementRef);

    return () => ctx.revert();
  }, [animationFn]);

  return elementRef;
}

export function useTimeline(
  timelineFn: (tl: gsap.core.Timeline) => void,
): RefObject<gsap.core.Timeline | null> {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    timelineRef.current = tl;
    timelineFn(tl);

    return () => {
      tl.kill();
    };
  }, [timelineFn]);

  return timelineRef;
}

export { gsap, ScrollTrigger };
