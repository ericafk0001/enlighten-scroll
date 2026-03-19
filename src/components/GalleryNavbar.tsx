"use client";

import Image from "next/image";
import Link from "next/link";

export default function GalleryNavbar() {
  return (
    <nav
      aria-label="Gallery navigation"
      className="relative z-20 mx-auto mt-4 w-[calc(100%-1.5rem)] rounded-2xl border border-slate-200/90 bg-white/95 px-3 py-2.5 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur md:mt-6 md:w-[calc(100%-3rem)] md:max-w-7xl md:px-5"
    >
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/"
          aria-label="Go to home"
          className="flex min-w-16 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
        >
          <Image
            src="/images/enlighten-icon-banner.svg"
            alt="Enlighten home"
            width={160}
            height={32}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/gallery"
            className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900"
            aria-current="page"
          >
            Gallery
          </Link>
          <Link
            href="/#core-subjects"
            className="rounded-full border border-transparent px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-200 hover:bg-slate-100"
          >
            Subjects
          </Link>
          <Link
            href="/#why-enlighten"
            className="rounded-full border border-transparent px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-200 hover:bg-slate-100"
          >
            About
          </Link>
        </div>

        <Link
          href="/"
          className="whitespace-nowrap rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
        >
          Back Home
        </Link>
      </div>
    </nav>
  );
}
