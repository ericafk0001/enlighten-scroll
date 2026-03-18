"use client";

import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@/hooks/useGSAP";

export default function Navbar() {
  const navRef = useGSAP<HTMLElement>((element, gsap) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(element, { y: 0 });
      return;
    }

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
  });

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className="fixed inset-x-0 top-6 z-50 mx-auto w-[calc(100%-3rem)] rounded-full border border-white/45 bg-white/20 px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-xl md:top-9 md:w-[calc(100%-4rem)] md:max-w-6xl"
    >
      <div className="flex items-center justify-between">
        <Link
          href="/"
          aria-label="Go to home"
          className="flex items-center min-w-15 rounded-md md:min-w-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        >
          <Image
            src="/images/enlighten-icon-banner.svg"
            alt="Enlighten home"
            width={160}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>
        <ul className="flex items-center gap-2 sm:gap-3 md:gap-6 lg:gap-8">
          <li>
            <Link
              href="/#why-enlighten"
              className="inline-flex items-center rounded-full border border-transparent px-3 py-1.5 text-sm font-medium text-neutral-950/90 transition-colors hover:border-white/40 hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 md:px-5 md:py-2 md:text-[20px]"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/#core-subjects"
              className="hidden items-center rounded-full border border-transparent px-5 py-2 text-[20px] font-medium text-neutral-950/90 transition-colors hover:border-white/40 hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 md:inline-flex"
            >
              Lessons
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hidden items-center rounded-full border border-transparent px-5 py-2 text-[20px] font-medium text-neutral-950/90 transition-colors hover:border-white/40 hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 md:inline-flex"
            >
              FAQ
            </Link>
          </li>
        </ul>
        <Link
          href="/#why-enlighten"
          className="min-w-15 rounded-full border border-white/60 bg-white/65 px-3 py-2 text-sm font-medium text-neutral-950 backdrop-blur-md transition-colors hover:bg-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 md:min-w-20 md:px-4 md:text-[18px]"
        >
          Try Now
        </Link>
      </div>
    </nav>
  );
}
