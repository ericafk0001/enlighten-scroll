import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export function createScrollAnimation(
  element: gsap.TweenTarget,
  animation: gsap.TweenVars,
  triggerOptions?: ScrollTrigger.Vars,
) {
  return gsap.to(element, {
    ...animation,
    scrollTrigger: {
      trigger: element as Element,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
      ...triggerOptions,
    },
  });
}

export function fadeIn(
  element: gsap.TweenTarget,
  options?: { duration?: number; delay?: number; y?: number },
) {
  const { duration = 1, delay = 0, y = 50 } = options || {};

  return gsap.fromTo(
    element,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: "power2.out",
    },
  );
}

export function staggerFadeIn(
  elements: gsap.TweenTarget,
  options?: { duration?: number; stagger?: number; y?: number },
) {
  const { duration = 0.8, stagger = 0.1, y = 30 } = options || {};

  return gsap.fromTo(
    elements,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: "power2.out",
    },
  );
}
