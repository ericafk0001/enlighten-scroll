"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import LocomotiveScroll from "locomotive-scroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LocomotiveScrollInstance extends LocomotiveScroll {
  on(event: string, callback: (...args: unknown[]) => void): void;
  off(event: string, callback: (...args: unknown[]) => void): void;
}

interface SmoothScrollContextType {
  scroll: LocomotiveScrollInstance | null;
  isReady: boolean;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  scroll: null,
  isReady: false,
});

export const useLocomotiveScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: ReactNode;
  options?: Record<string, unknown>;
}

export function SmoothScrollProvider({
  children,
  options,
}: SmoothScrollProviderProps) {
  const [scroll, setScroll] = useState<LocomotiveScrollInstance | null>(null);
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const locomotiveScroll = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      ...options,
    } as any) as LocomotiveScrollInstance;

    const handleScroll = () => {
      ScrollTrigger.update();
    };

    locomotiveScroll.on("scroll", handleScroll);

    setScroll(locomotiveScroll);
    setIsReady(true);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      locomotiveScroll.off("scroll", handleScroll);
      locomotiveScroll.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [options]);

  return (
    <SmoothScrollContext.Provider value={{ scroll, isReady }}>
      <div ref={containerRef} data-scroll-container>
        {children}
      </div>
    </SmoothScrollContext.Provider>
  );
}

export default SmoothScrollProvider;
