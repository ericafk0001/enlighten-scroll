"use client";

import { useGSAP, useScrollTrigger } from "@/hooks/useGSAP";
import { SmoothDotCursor } from "@/components/ui/SmoothDotCursor";
import { ThreeGradientBackground } from "@/components/ui/ThreeGradientBackground";
import { RevealText } from "@/components/ui/RevealText";
import { Petit_Formal_Script } from "next/font/google";
import Image from "next/image";

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
  });

  const sectionRef = useScrollTrigger<HTMLElement>((element, gsap) => {
    const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;
    const moveMultiplier = isSmallScreen ? 2.6 : 1;

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

    const orbitingImages =
      element.querySelectorAll<HTMLElement>("[data-orbit-image]");

    gsap.to(orbitingImages, {
      x: (_, target) =>
        Number((target as HTMLElement).dataset.moveX ?? 0) * moveMultiplier,
      y: (_, target) =>
        Number((target as HTMLElement).dataset.moveY ?? 0) * moveMultiplier,
      rotate: (_, target) =>
        Number((target as HTMLElement).dataset.rotate ?? 0),
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom top",
        scrub: 1.1,
      },
    });
  });

  return (
    <div className="min-h-screen px-3 py-3 sm:px-4 sm:py-4">
      <SmoothDotCursor />
      <div
        ref={heroRef}
        className="relative overflow-hidden h-full min-h-[calc(100vh-1.5rem)] sm:min-h-[calc(100vh-2rem)] mx-auto bg-[#c8cfd6] rounded-[2.25rem] sm:rounded-[3rem] flex flex-col items-center justify-center px-4"
      >
        <ThreeGradientBackground />
        <div
          data-hero-copy
          className="relative z-10 flex flex-col items-center"
        >
          <p className="text-sm md:text-[18px] font-semibold uppercase tracking-[0.2em] text-black-500 mb-4">
            Picture this
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-[140px] font-semibold text-black-500 text-center leading-tight">
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
        id="why-enlighten"
        ref={sectionRef}
        className="relative overflow-hidden flex scroll-mt-28 flex-col items-center justify-center text-center mt-3 sm:mt-4 mx-auto min-h-[72vh] sm:min-h-[60vh] md:min-h-[62vh] w-full rounded-[2.25rem] sm:rounded-[3rem] bg-[#c3dbe6] px-4"
      >
        <div className="pointer-events-none absolute inset-0 z-20 block grayscale">
          <Image
            src="/images/atom.jpg"
            alt="Atom"
            width={126}
            height={126}
            data-orbit-image
            data-move-x="-190"
            data-move-y="-190"
            data-rotate="-16"
            className="absolute left-[14%] top-[18%] w-[68px] sm:w-[94px] md:w-[108px] lg:w-auto rounded-2xl object-cover shadow-md ring-2 ring-neutral-900/35"
          />
          <Image
            src="/images/book.jpg"
            alt="Book"
            width={104}
            height={104}
            data-orbit-image
            data-move-x="-220"
            data-move-y="-60"
            data-rotate="-12"
            className="absolute left-[16%] top-[40%] w-[62px] sm:w-[84px] md:w-[96px] lg:w-auto rounded-2xl object-cover shadow-md ring-2 ring-neutral-900/35"
          />
          <Image
            src="/images/money.jpg"
            alt="Money"
            width={136}
            height={136}
            data-orbit-image
            data-move-x="-180"
            data-move-y="190"
            data-rotate="14"
            className="absolute left-[14%] top-[64%] w-[74px] sm:w-[102px] md:w-[116px] lg:w-auto rounded-2xl object-cover shadow-md ring-2 ring-neutral-900/35"
          />
          <Image
            src="/images/basketball.jpg"
            alt="Basketball"
            width={100}
            height={100}
            data-orbit-image
            data-move-x="190"
            data-move-y="-190"
            data-rotate="12"
            className="absolute right-[14%] top-[18%] w-[62px] sm:w-[82px] md:w-[92px] lg:w-auto rounded-2xl object-cover shadow-md ring-2 ring-neutral-900/35"
          />
          <Image
            src="/images/einstein.png"
            alt="Einstein"
            width={102}
            height={102}
            data-orbit-image
            data-move-x="170"
            data-move-y="-130"
            data-rotate="-10"
            className="absolute right-[16%] top-[36%] w-[62px] sm:w-[84px] md:w-[94px] lg:w-auto rounded-2xl object-cover shadow-md ring-2 ring-neutral-900/35"
          />
          <Image
            src="/images/rocket.jpg"
            alt="Rocket"
            width={100}
            height={100}
            data-orbit-image
            data-move-x="220"
            data-move-y="60"
            data-rotate="16"
            className="absolute right-[14%] top-[52%] w-[64px] sm:w-[84px] md:w-[94px] lg:w-auto rounded-2xl object-cover shadow-md ring-2 ring-neutral-900/35"
          />
          <Image
            src="/images/scale.png"
            alt="Scale"
            width={96}
            height={96}
            data-orbit-image
            data-move-x="190"
            data-move-y="190"
            data-rotate="-12"
            className="absolute right-[14%] top-[68%] w-[58px] sm:w-[78px] md:w-[88px] lg:w-auto rounded-2xl object-cover shadow-md ring-2 ring-neutral-900/35"
          />
        </div>

        <div className="relative z-10 max-w-3xl px-2 sm:px-4">
          <RevealText
            as="h2"
            controlled
            className="text-[12px] sm:text-sm font-semibold uppercase tracking-widest text-neutral-950 mb-6"
          >
            {"Why Enlighten?"}
          </RevealText>
          <RevealText
            controlled
            className="text-[16px] sm:text-3xl md:text-3xl lg:text-4xl text-neutral-950 leading-snug mb-10 sm:mb-16 md:mb-16 lg:mb-24"
          >
            {
              "Students are trying to learn and retain knowledge, but encounter social media doomscrolling and short-form content addiction in doing so."
            }
          </RevealText>
          <RevealText
            controlled
            className="text-[16px] sm:text-3xl md:text-3xl lg:text-4xl text-neutral-950 leading-snug"
          >
            {'So we said, "why not combine the two?"'}
          </RevealText>
        </div>
      </section>

      <div className="mt-3 sm:mt-4 mx-auto grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-3 sm:gap-4 md:gap-5 w-full">
        <section className="rounded-[2.25rem] sm:rounded-[3rem] bg-[#c8cfd6] px-5 sm:px-8 py-8 sm:py-10 min-h-[420px] sm:min-h-[560px] lg:min-h-[670px] flex flex-col justify-center">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-950 mb-5">
            Focused Learning
          </h3>
          <p className="text-base sm:text-xl lg:text-2xl text-neutral-950 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus eius
            aliquam error animi quod. Natus ipsam dolores, aliquid quo vitae
            unde nihil. Vel iusto itaque facere, possimus explicabo alias
            temporibus.
          </p>
        </section>

        <section className="relative overflow-hidden rounded-[2.25rem] sm:rounded-[3rem] bg-[#d8d4cd] px-5 sm:px-8 pt-8 sm:pt-10 min-h-[520px] sm:min-h-[620px] lg:min-h-[670px]">
          <div className="relative z-10 max-w-[260px] sm:max-w-[380px] md:max-w-[460px]">
            <h3 className="text-3xl sm:text-5xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.05] mb-4 sm:mb-6">
              The antidote to brain rot
            </h3>
            <p className="text-base sm:text-xl md:text-2xl lg:text-[35px] text-neutral-700 leading-snug">
              Enlighten brings ideas that actively engage your brain, not
              pre-digested material for passive consumption.
            </p>
          </div>

          <div className="absolute -bottom-[20%] -right-[34%] sm:-bottom-[28%] sm:-right-[24%] md:-bottom-[26%] md:-right-[14%] lg:-bottom-[34%] lg:-right-[24%] w-[92%] sm:w-[84%] md:w-[68%] lg:w-[78%] aspect-square rounded-full bg-[#f09470]" />
          <Image
            src="/images/phone.png"
            alt="Enlighten app on phone"
            width={900}
            height={1300}
            className="pointer-events-none absolute -bottom-4 right-[-24%] sm:-bottom-8 sm:right-[-20%] md:-bottom-8 md:right-[-12%] lg:-bottom-10 lg:right-[-18%] z-20 w-[82%] sm:w-[78%] md:w-[62%] lg:w-[74%] object-contain"
            priority
          />
        </section>
      </div>
    </div>
  );
}
