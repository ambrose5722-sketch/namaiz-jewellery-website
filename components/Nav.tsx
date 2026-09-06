"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 transition-colors duration-500 ${
        solid ? "bg-ivory/90 backdrop-blur-sm text-espresso" : "text-ivory"
      }`}
    >
      <a href="#top" className="font-display text-lg md:text-xl tracking-wide">
        Namaiz
      </a>
      <nav className="hidden md:flex items-center gap-8 text-sm">
        <a href="#collection" className="hover:opacity-60 transition-opacity">
          Collection
        </a>
        <a href="#craft" className="hover:opacity-60 transition-opacity">
          The Craft
        </a>
        <a href="#story" className="hover:opacity-60 transition-opacity">
          Story
        </a>
      </nav>
      <a
        href="#final"
        className={`text-sm border-b transition-colors ${
          solid ? "border-espresso/40 hover:border-espresso" : "border-ivory/50 hover:border-ivory"
        }`}
      >
        Enquire
      </a>
    </header>
  );
}
