"use client";

import { useEffect, useRef } from "react";
import { Instagram, Mail } from "lucide-react";
import { gsap, useGsapRegister } from "@/lib/gsap";

export default function FinalCTA() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    useGsapRegister();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".final-line",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="final"
      ref={rootRef}
      className="relative flex min-h-[80vh] flex-col justify-between bg-espresso px-6 py-20 text-ivory md:px-14"
    >
      <div className="flex flex-1 flex-col items-start justify-center">
        <h2 className="final-line max-w-2xl font-display text-4xl leading-tight md:text-6xl">
          Some things are made.
          <br />
          <span className="italic text-goldlight">Others are crafted.</span>
        </h2>
        <a
          href="mailto:hello@namaiz.com"
          className="final-line group mt-10 inline-flex items-center gap-3 font-body text-lg md:text-xl"
        >
          <span className="border-b border-ivory/50 pb-1 transition-colors group-hover:border-ivory">
            Discover the collection
          </span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </a>
      </div>

      <div className="final-line mt-20 flex flex-col gap-6 border-t border-ivory/15 pt-8 text-sm text-ivory/60 md:flex-row md:items-center md:justify-between">
        <p className="font-display text-lg text-ivory">Namaiz</p>
        <div className="flex items-center gap-6">
          <a
            href="mailto:hello@namaiz.com"
            className="flex items-center gap-2 hover:text-ivory"
          >
            <Mail size={16} /> hello@namaiz.com
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-ivory"
          >
            <Instagram size={16} /> @namaiz
          </a>
        </div>
        <p className="text-xs text-ivory/40">
          &copy; {new Date().getFullYear()} Namaiz. Handcrafted in small
          batches.
        </p>
      </div>
    </section>
  );
}
