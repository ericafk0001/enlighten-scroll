import type { Metadata } from "next";
import { Chivo } from "next/font/google";
import Navbar from "@/components/Navbar";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import "./globals.css";
import { cn } from "@/lib/utils";

const chivo = Chivo({
  subsets: ["latin"],
  variable: "--font-chivo",
});

export const metadata: Metadata = {
  title: "Enlighten",
  description: "Like Tiktok, but for Knowledge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", chivo.variable)}>
      <body className={`${chivo.className} antialiased`}>
        <a
          href="#main-content"
          className="sr-only fixed left-3 top-3 z-[100] rounded-md bg-neutral-950 px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900"
        >
          Skip to main content
        </a>
        <Navbar />
        <SmoothScrollProvider>
          <main id="main-content" tabIndex={-1} data-scroll-section>
            {children}
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
