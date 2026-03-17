"use client";

import { useGSAP, useScrollTrigger } from "@/hooks/useGSAP";
import { SmoothDotCursor } from "@/components/ui/SmoothDotCursor";
import { ThreeGradientBackground } from "@/components/ui/ThreeGradientBackground";
import { RevealText } from "@/components/ui/RevealText";
import { Petit_Formal_Script } from "next/font/google";

const petitFormalScript = Petit_Formal_Script({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const heroRef = useGSAP<HTMLDivElement>((element, gsap) => {
    const tl = gsap.timeline();

    tl.fromTo(
      element,
      { scale: 0, opacity: 1, transformOrigin: "center center" },
      {
        scale: 1,
        opacity: 1,
        duration: 2.1,
        ease: "expo.out",
      },
    );

    tl.fromTo(
      element.querySelector("[data-hero-copy]"),
      { scale: 1.3, opacity: 0, transformOrigin: "center center" },
      {
        scale: 1,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
      },
      "-=1",
    );

    return tl;
  }, []);

  const sectionRef = useScrollTrigger<HTMLElement>(
    (element, gsap, ScrollTrigger) => {
      const chars = element.querySelectorAll<HTMLSpanElement>("[data-char]");
      gsap.fromTo(
        chars,
        { opacity: 0.12 },
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.018,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
            end: "center 40%",
            scrub: 1.2,
          },
        },
      );
    },
    [],
  );

  return (
    <div className="min-h-screen px-4 py-4">
      <SmoothDotCursor />
      <div
        ref={heroRef}
        className="relative overflow-hidden h-full min-h-[calc(100vh-2rem)] mx-auto bg-[#c8cfd6] rounded-[3rem] flex flex-col items-center justify-center px-4"
      >
        <ThreeGradientBackground />
        <div
          data-hero-copy
          className="relative z-10 flex flex-col items-center"
        >
          <p className="text-sm md:text-[18px] font-semibold uppercase tracking-[0.2em] text-black-500 mb-4">
            Picture this
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-[120px] font-semibold text-black-500 text-center leading-tight">
            Like Tiktok,
            <br />
            but for
            <br />
            <span className={`${petitFormalScript.className} italic font-bold`}>
              knowledge
            </span>
          </h1>
        </div>
      </div>

      <section
        ref={sectionRef}
        className="flex flex-col items-center justify-center text-center mt-4 mx-auto min-h-[50vh] w-full rounded-[3rem] bg-[#c8cfd6] px-4"
      >
        <div className="max-w-3xl">
          <RevealText
            as="h2"
            controlled
            className="text-sm font-semibold uppercase tracking-widest text-neutral-950 mb-6"
          >
            {"Why Enlighten?"}
          </RevealText>
          <RevealText
            controlled
            className="text-2xl sm:text-3xl md:text-4xl text-neutral-950 leading-snug"
          >
            {
              "The world's best ideas are locked inside long videos, dense articles, and paywalled courses. We surface them in seconds — short, sharp, and endlessly scrollable."
            }
          </RevealText>
        </div>
      </section>
    </div>
  );
}
