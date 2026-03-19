import type { ReactNode } from "react";
import GalleryNavbar from "@/components/GalleryNavbar";

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GalleryNavbar />
      {children}
    </>
  );
}
