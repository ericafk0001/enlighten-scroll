"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from "react";
import LocomotiveScroll, {
  type ILocomotiveScrollOptions,
  type ILenisScrollValues,
} from "locomotive-scroll";
import type { LenisOptions } from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollContextType {
  scroll: LocomotiveScroll | null;
  isReady: boolean;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  scroll: null,
  isReady: false,
});

export const useLocomotiveScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: ReactNode;
  options?: ILocomotiveScrollOptions;
}

export function SmoothScrollProvider({
  children,
  options,
}: SmoothScrollProviderProps) {
  const pathname = usePathname();
  const disableSmoothScroll = pathname.startsWith("/gallery");
  const [scroll, setScroll] = useState<LocomotiveScroll | null>(null);
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotionRef = useRef(false);

  const baseLenisOptions = useMemo<LenisOptions>(
    () => ({
      smoothWheel: true,
      orientation: "vertical",
      gestureOrientation: "vertical",
      lerp: 0.055,
      duration: 1.6,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    }),
    [],
  );

  useEffect(() => {
    if (disableSmoothScroll) {
      document.documentElement.classList.remove(
        "has-scroll-smooth",
        "has-scroll-dragging",
      );
      document.body.style.removeProperty("height");

      // Defer state updates so the effect body only performs external sync work.
      const disableTimer = window.setTimeout(() => {
        setScroll(null);
        setIsReady(true);
      }, 0);

      return () => {
        window.clearTimeout(disableTimer);
      };
    }

    const container = containerRef.current;
    if (!container) return;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    prefersReducedMotionRef.current = reducedMotionQuery.matches;

    const handleMotionChange = (event: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = event.matches;
    };
    reducedMotionQuery.addEventListener("change", handleMotionChange);

    const handleScroll = (scrollValues: ILenisScrollValues) => {
      options?.scrollCallback?.(scrollValues);
      ScrollTrigger.update();
    };

    const locomotiveOptions: ILocomotiveScrollOptions = {
      ...options,
      scrollCallback: handleScroll,
      lenisOptions: {
        ...baseLenisOptions,
        ...options?.lenisOptions,
        smoothWheel: prefersReducedMotionRef.current
          ? false
          : (options?.lenisOptions?.smoothWheel ??
            baseLenisOptions.smoothWheel),
      },
    };

    const locomotiveScroll = new LocomotiveScroll(locomotiveOptions);

    ScrollTrigger.scrollerProxy(container, {
      scrollTop(value) {
        if (typeof value === "number") {
          locomotiveScroll.scrollTo(value, { immediate: true, force: true });
        }

        return locomotiveScroll.lenisInstance?.scroll ?? window.scrollY;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: container.style.transform ? "transform" : "fixed",
    });

    ScrollTrigger.defaults({ scroller: container });

    const handleRefresh = () => {
      locomotiveScroll.resize();
    };
    ScrollTrigger.addEventListener("refresh", handleRefresh);

    const scrollToHash = (hash: string, immediate = false) => {
      if (!hash) return;

      const decodedHash = decodeURIComponent(hash.replace(/^#/, ""));
      if (!decodedHash) return;

      const target = document.getElementById(decodedHash);
      if (!target) return;

      locomotiveScroll.scrollTo(target, {
        offset: -100,
        duration: immediate ? 0 : 1.2,
        immediate,
        force: true,
      });
    };

    const handleHashChange = () => {
      scrollToHash(window.location.hash);
    };

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.includes("#")) return;

      const isAbsolute =
        href.startsWith("http://") || href.startsWith("https://");
      if (isAbsolute) return;

      const [pathPart, hashPart] = href.split("#");
      if (!hashPart) return;

      const normalizedPath =
        pathPart === "" ? window.location.pathname : pathPart;
      if (normalizedPath !== window.location.pathname) return;

      event.preventDefault();

      const nextHash = `#${hashPart}`;
      if (window.location.hash !== nextHash) {
        window.history.pushState(null, "", nextHash);
      }

      scrollToHash(nextHash);
    };

    window.addEventListener("hashchange", handleHashChange);
    document.addEventListener("click", handleAnchorClick, true);

    const readyTimer = window.setTimeout(() => {
      setScroll(locomotiveScroll);
      setIsReady(true);

      if (window.location.hash) {
        scrollToHash(window.location.hash, true);
      }

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      window.clearTimeout(readyTimer);
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleAnchorClick, true);
      ScrollTrigger.removeEventListener("refresh", handleRefresh);
      reducedMotionQuery.removeEventListener("change", handleMotionChange);
      locomotiveScroll.destroy();
    };
  }, [baseLenisOptions, disableSmoothScroll, options]);

  if (disableSmoothScroll) {
    return (
      <SmoothScrollContext.Provider value={{ scroll: null, isReady: true }}>
        {children}
      </SmoothScrollContext.Provider>
    );
  }

  return (
    <SmoothScrollContext.Provider value={{ scroll, isReady }}>
      <div ref={containerRef} data-scroll-container>
        {children}
      </div>
    </SmoothScrollContext.Provider>
  );
}

export default SmoothScrollProvider;
