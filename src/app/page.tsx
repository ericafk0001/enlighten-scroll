"use client";

import { useGSAP, useScrollTrigger } from "@/hooks/useGSAP";
import { SmoothDotCursor } from "@/components/ui/SmoothDotCursor";
import { ThreeGradientBackground } from "@/components/ui/ThreeGradientBackground";
import { RevealText } from "@/components/ui/RevealText";
import { SubjectPills } from "@/components/ui/SubjectPills";
import { Petit_Formal_Script } from "next/font/google";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const petitFormalScript = Petit_Formal_Script({
  weight: "400",
  subsets: ["latin"],
});

interface TypeInDropTextProps {
  children: string;
  className?: string;
  id?: string;
  as?: "p" | "h2";
}

function TypeInDropText({
  children,
  className,
  id,
  as: Tag = "p",
}: TypeInDropTextProps) {
  const words = children.split(" ");

  return (
    <Tag id={id} className={className} data-type-line>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <span key={wi} style={{ display: "inline" }}>
            <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              {Array.from(word).map((char, ci) => (
                <span
                  key={ci}
                  data-type-char
                  style={{
                    display: "inline-block",
                    opacity: 0,
                    transform: "translateY(-12px)",
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
            {wi < words.length - 1 && " "}
          </span>
        ))}
      </span>
    </Tag>
  );
}

export default function Home() {
  const pageRootRef = useRef<HTMLDivElement>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const root = pageRootRef.current;
    if (!root) return;

    let isMounted = true;
    let loaded = 0;
    const listeners: Array<() => void> = [];

    const images = Array.from(root.querySelectorAll("img"));
    const total = Math.max(1, images.length + 1);

    const markLoaded = () => {
      if (!isMounted) return;
      loaded += 1;

      const nextProgress = Math.min(100, Math.round((loaded / total) * 100));
      setLoadProgress((current) =>
        nextProgress > current ? nextProgress : current,
      );

      if (loaded >= total) {
        window.setTimeout(() => {
          if (isMounted) setShowLoader(false);
        }, 180);
      }
    };

    if (document.readyState === "complete") {
      markLoaded();
    } else {
      const handleWindowLoad = () => {
        markLoaded();
      };
      window.addEventListener("load", handleWindowLoad, { once: true });
      listeners.push(() =>
        window.removeEventListener("load", handleWindowLoad),
      );
    }

    images.forEach((image) => {
      if (image.complete) {
        markLoaded();
        return;
      }

      const handleImageDone = () => {
        markLoaded();
      };

      image.addEventListener("load", handleImageDone, { once: true });
      image.addEventListener("error", handleImageDone, { once: true });

      listeners.push(() => image.removeEventListener("load", handleImageDone));
      listeners.push(() => image.removeEventListener("error", handleImageDone));
    });

    return () => {
      isMounted = false;
      listeners.forEach((cleanup) => cleanup());
    };
  }, []);

  const subjects = [
    "Physics",
    "Chemistry",
    "Algebra",
    "Biology",
    "Geometry",
    "World History",
    "Computer Science",
    "Economics",
  ];

  const heroRef = useGSAP<HTMLDivElement>((element, gsap) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(element, { scale: 1, opacity: 1 });
      gsap.set(element.querySelector("[data-hero-copy]"), {
        scale: 1,
        opacity: 1,
      });
      return;
    }

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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(element.querySelectorAll<HTMLSpanElement>("[data-char]"), {
        opacity: 1,
      });
      gsap.set(element.querySelectorAll<HTMLElement>("[data-orbit-image]"), {
        x: 0,
        y: 0,
        rotate: 0,
      });
      return;
    }

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

  const lowerTextRef = useScrollTrigger<HTMLDivElement>((element, gsap) => {
    const lines = element.querySelectorAll<HTMLElement>("[data-type-line]");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(element.querySelectorAll<HTMLElement>("[data-type-char]"), {
        opacity: 1,
        y: 0,
      });
      return;
    }

    lines.forEach((line) => {
      const chars = line.querySelectorAll<HTMLElement>("[data-type-char]");

      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.28,
        ease: "power2.out",
        stagger: 0.01,
        scrollTrigger: {
          trigger: line,
          start: "top 86%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    });
  });

  return (
    <div ref={pageRootRef} className="min-h-screen px-3 py-3 sm:px-4 sm:py-4">
      {showLoader && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#dfe3e8]/95 backdrop-blur-[2px]">
          <div className="w-[260px] max-w-[84vw]">
            <div
              className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-neutral-800"
              aria-live="polite"
            >
              <span>Loading</span>
              <span>{loadProgress}%</span>
            </div>
            <div
              role="progressbar"
              aria-label="Page loading progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={loadProgress}
              className="h-4 w-full overflow-hidden border-2 border-neutral-900 bg-white"
            >
              <div
                className="h-full bg-neutral-900 transition-[width] duration-150 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}
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
        aria-labelledby="why-enlighten-heading"
        className="relative overflow-hidden flex scroll-mt-28 flex-col items-center justify-center text-center mt-3 sm:mt-4 mx-auto min-h-[72vh] sm:min-h-[60vh] md:min-h-[62vh] w-full rounded-[2.25rem] sm:rounded-[3rem] bg-[#c3dbe6] px-4"
      >
        <div
          className="pointer-events-none absolute inset-0 z-20 block grayscale"
          aria-hidden="true"
        >
          <Image
            src="/images/atom.jpg"
            alt=""
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
            alt=""
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
            alt=""
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
            alt=""
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
            alt=""
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
            alt=""
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
            alt=""
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
            id="why-enlighten-heading"
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

      <div
        ref={lowerTextRef}
        className="mt-3 sm:mt-4 mx-auto grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-3 sm:gap-4 md:gap-5 w-full"
      >
        <section
          id="core-subjects"
          aria-labelledby="subjects-heading"
          className="relative overflow-hidden scroll-mt-28 rounded-[2.25rem] sm:rounded-[3rem] bg-[#d5c8e6] px-5 sm:px-8 py-8 sm:py-10 min-h-[420px] sm:min-h-[560px] lg:min-h-[670px] flex flex-col justify-start pt-6 sm:pt-8"
        >
          <div className="relative z-10 max-w-2xl">
            <TypeInDropText
              as="h2"
              id="subjects-heading"
              className="text-3xl sm:text-5xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.1] mb-4 sm:mb-6"
            >
              {"Core subjects you'll explore every day"}
            </TypeInDropText>
            <TypeInDropText className="text-base sm:text-xl md:text-2xl lg:text-[35px] text-neutral-800 leading-snug">
              {
                "Deep understanding comes from exploring key subjects and learning how they connect in real life. Nobody starts out mastering all of them, but every one of them can be learned. That's what Enlighten is for."
              }
            </TypeInDropText>
            <ul className="sr-only">
              {subjects.map((subject) => (
                <li key={subject}>{subject}</li>
              ))}
            </ul>
          </div>

          <SubjectPills subjects={subjects} className="z-20" />
        </section>

        <section
          aria-labelledby="brain-rot-heading"
          className="relative overflow-hidden rounded-[2.25rem] sm:rounded-[3rem] bg-[#d8d4cd] px-5 sm:px-8 pt-8 sm:pt-10 min-h-[520px] sm:min-h-[620px] lg:min-h-[670px]"
        >
          <div className="relative z-10 max-w-[260px] sm:max-w-[380px] md:max-w-[460px]">
            <TypeInDropText
              as="h2"
              id="brain-rot-heading"
              className="text-3xl sm:text-5xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.05] mb-4 sm:mb-6"
            >
              {"The antidote to brain rot"}
            </TypeInDropText>
            <TypeInDropText className="text-base sm:text-xl md:text-2xl lg:text-[35px] text-neutral-800 leading-snug">
              {
                "Enlighten brings ideas that actively engage your brain, and helps you learn by simplifying what others overcomplicate."
              }
            </TypeInDropText>
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
