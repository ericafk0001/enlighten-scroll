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
          <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-[140px] font-semibold text-black-500 text-center leading-tight">
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
        className="relative overflow-hidden flex scroll-mt-28 flex-col items-center justify-center text-center mt-4 mx-auto min-h-[60vh] w-full rounded-[3rem] bg-[#c3dbe6] px-4"
      >
        <div className="pointer-events-none absolute inset-0 block grayscale">
          <Image
            src="/images/atom.jpg"
            alt="Atom"
            width={126}
            height={126}
            data-orbit-image
            data-move-x="-190"
            data-move-y="-190"
            data-rotate="-16"
            className="absolute left-[18%] top-[21%] rounded-2xl object-cover shadow-md ring-2 ring-neutral-900/35"
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
            className="absolute left-[21%] top-[43%] rounded-2xl object-cover shadow-md ring-2 ring-neutral-900/35"
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
            className="absolute left-[18%] top-[63%] rounded-2xl object-cover shadow-md ring-2 ring-neutral-900/35"
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
            className="absolute right-[18%] top-[21%] rounded-2xl object-cover shadow-md ring-2 ring-neutral-900/35"
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
            className="absolute right-[22%] top-[39%] rounded-2xl object-cover shadow-md ring-2 ring-neutral-900/35"
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
            className="absolute right-[18%] top-[54%] rounded-2xl object-cover shadow-md ring-2 ring-neutral-900/35"
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
            className="absolute right-[18%] top-[68%] rounded-2xl object-cover shadow-md ring-2 ring-neutral-900/35"
          />
        </div>

        <div className="relative z-10 max-w-3xl">
          <RevealText
            as="h2"
            controlled
            className="text-[12px] sm:text-sm font-semibold uppercase tracking-widest text-neutral-950 mb-6"
          >
            {"Why Enlighten?"}
          </RevealText>
          <RevealText
            controlled
            className="text-[16px] sm:text-3xl md:text-4xl text-neutral-950 leading-snug mb-24"
          >
            {
              "Students are trying to learn and retain knowledge, but encounter social media doomscrolling and short-form content addiction in doing so."
            }
          </RevealText>
          <RevealText
            controlled
            className="text-[16px] sm:text-3xl md:text-4xl text-neutral-950 leading-snug"
          >
            {'So we said, "why not combine the two?"'}
          </RevealText>
        </div>
      </section>

      <div className="mt-4 mx-auto grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-4 w-full">
        <section className="rounded-[3rem] bg-[#c8cfd6] px-8 py-10 min-h-[670px] flex flex-col justify-center">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-950 mb-5">
            Focused Learning
          </h3>
          <p className="text-xl sm:text-2xl text-neutral-950 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus eius
            aliquam error animi quod. Natus ipsam dolores, aliquid quo vitae
            unde nihil. Vel iusto itaque facere, possimus explicabo alias
            temporibus.
          </p>
        </section>

        <section className="rounded-[3rem] bg-[#c8cfd6] px-8 py-10 min-h-[670px] flex flex-col justify-center">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-950 mb-5">
            Better Retention
          </h3>
          <p className="text-xl sm:text-2xl text-neutral-950 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
            nulla quis veniam libero quia nostrum alias mollitia explicabo
            doloremque sed fuga eaque, nemo esse, laudantium porro sequi, quos
            tenetur! Nostrum.
          </p>
        </section>
      </div>
    </div>
  );
}
