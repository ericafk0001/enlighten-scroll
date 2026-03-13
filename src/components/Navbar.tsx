"use client";

import Image from "next/image";
import { useGSAP } from "@/hooks/useGSAP";

export default function Navbar() {
  const navRef = useGSAP<HTMLElement>((element, gsap) => {
    return gsap.fromTo(
      element,
      {
        y: -200,
        transformOrigin: "center top",
      },
      {
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 1.5,
      },
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-9 left-10 right-10 z-50 rounded-full bg-white/80 px-4 py-3 shadow-lg backdrop-blur-md md:left-1/2 md:right-auto md:w-[calc(100%-4rem)] md:max-w-6xl md:-translate-x-1/2"
    >
      <div className="flex items-center justify-between">
        <button className="flex items-center min-w-15 md:min-w-20">
          <Image
            src="/images/enlighten-icon-banner.svg"
            alt="Enlighten"
            width={160}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </button>
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          <li>
            <a
              href="/"
              className="inline-flex items-center rounded-full px-5 py-2 text-[20px] font-medium text-zinc-950 transition-colors hover:bg-zinc-950/10"
            >
              Feed
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="inline-flex items-center rounded-full px-5 py-2 text-[20px] font-medium text-zinc-950 transition-colors hover:bg-zinc-950/10"
            >
              Lessons
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="inline-flex items-center rounded-full px-5 py-2 text-[20px] font-medium text-zinc-950 transition-colors hover:bg-zinc-900/10"
            >
              FAQ
            </a>
          </li>
        </ul>
        <button className="text-[18px] font-medium bg-zinc-900 text-white px-3 md:px-4 py-2 rounded-full hover:bg-zinc-700 transition-colors min-w-15 md:min-w-20">
          Sign Up
        </button>
      </div>
    </nav>
  );
}
