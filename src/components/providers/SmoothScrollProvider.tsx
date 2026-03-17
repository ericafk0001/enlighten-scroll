"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import LocomotiveScroll, {
  type ILocomotiveScrollOptions,
  type ILenisScrollValues,
} from "locomotive-scroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const [scroll, setScroll] = useState<LocomotiveScroll | null>(null);
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const locomotiveOptions: ILocomotiveScrollOptions = {
      ...options,
      scrollCallback: (scrollValues: ILenisScrollValues) => {
        options?.scrollCallback?.(scrollValues);
        ScrollTrigger.update();
      },
    };

    const locomotiveScroll = new LocomotiveScroll(locomotiveOptions);

    const readyTimer = window.setTimeout(() => {
      setScroll(locomotiveScroll);
      setIsReady(true);
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      window.clearTimeout(readyTimer);
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
