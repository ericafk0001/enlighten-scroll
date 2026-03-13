import type { Metadata } from "next";
import { Chivo } from "next/font/google";
import Navbar from "@/components/Navbar";
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
