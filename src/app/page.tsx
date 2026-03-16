"use client";

import { useGSAP } from "@/hooks/useGSAP";
import { Petit_Formal_Script } from "next/font/google";
import Image from "next/image";
import { useRef } from "react";

const petitFormalScript = Petit_Formal_Script({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const cloudTwoRef = useRef<HTMLDivElement>(null);

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

    if (cloudTwoRef.current) {
      tl.fromTo(
        cloudTwoRef.current,
        { yPercent: 15, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.3,
          ease: "power4.out",
        },
        "-=1.1",
      );
    }

    return tl;
  }, []);

  return (
    <div className="min-h-screen px-4 py-4">
      <div
        ref={heroRef}
        className="relative overflow-hidden max-w-360 h-full min-h-[calc(100vh-2rem)] mx-auto bg-[#28b2eb] rounded-[3rem] flex flex-col items-center justify-center px-4"
      >
        <div
          className="absolute top-0 left-1/2 z-1 w-400 max-w-none -translate-x-1/2 pointer-events-none opacity-60"
          aria-hidden="true"
        >
          <Image
            src="/images/cloud-0.webp"
            alt=""
            aria-hidden="true"
            width={2048}
            height={1024}
            className="w-full h-auto"
            priority
          />
        </div>

        <div
          ref={cloudTwoRef}
          className="absolute top-[45%] max-[1200px]:top-[50%] max-md:top-[30%] w-500 max-md:w-400 left-1/2 z-20 -translate-x-1/2 pointer-events-none opacity-75"
          aria-hidden="true"
        >
          <Image
            src="/images/cloud-2.webp"
            alt=""
            aria-hidden="true"
            width={1920}
            height={800}
            className="w-full h-auto"
          />
        </div>

        <div
          data-hero-copy
          className="relative z-10 flex flex-col items-center"
        >
          <p className="text-sm md:text-[18px] font-semibold uppercase tracking-[0.2em] text-blue-500 mb-4">
            Picture this
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-[120px] font-semibold text-blue-500 text-center leading-tight">
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
    </div>
  );
}
