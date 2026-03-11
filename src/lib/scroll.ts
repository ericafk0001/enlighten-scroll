// Re-export Locomotive Scroll provider and hook
export {
  SmoothScrollProvider,
  useLocomotiveScroll,
} from "@/components/providers/SmoothScrollProvider";

// Re-export GSAP utilities
export {
  gsap,
  ScrollTrigger,
  createScrollAnimation,
  fadeIn,
  staggerFadeIn,
} from "@/lib/gsap";

// Re-export GSAP hooks
export { useGSAP, useScrollTrigger, useTimeline } from "@/hooks/useGSAP";
