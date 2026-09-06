"use client";

import { useEffect, useRef } from "react";
import { gsap, useGsapRegister } from "@/lib/gsap";

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    useGsapRegister();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "cinematic" } });

      tl.set(".hero-video", { opacity: 0, scale: 1.12 })
        .set(".hero-line", { yPercent: 110, opacity: 0 })
        .set(".hero-sub", { opacity: 0, y: 12 })
        .set(".hero-cta", { opacity: 0, y: 12 })
        .to(".hero-video", { opacity: 0.35, scale: 1, duration: 2.2, ease: "power3.out" }, 0.1)
        .to(".hero-line", { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12 }, 0.5)
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.9 }, "-=0.5")
        .to(".hero-cta", { opacity: 1, y: 0, duration: 0.9 }, "-=0.6");

      // Gentle continuous drift on the background video for a living,
      // non-static feel — the only ambient (non-scroll) motion on the page.
      gsap.to(".hero-video", {
        scale: 1.06,
        duration: 14,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2.2,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative h-[100svh] w-full overflow-hidden bg-espresso"
    >
      <video
        ref={videoRef}
        className="hero-video absolute inset-0 h-full w-full object-cover"
        src="/video/mirror-hall.mp4"
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 via-espresso/40 to-espresso/90" />

      <div className="relative z-10 flex h-full flex-col items-start justify-end px-6 pb-20 md:px-14 md:pb-24">
        <p className="hero-sub mb-4 font-body text-sm text-ivory/70 md:text-base">
          Namaiz &mdash; handcrafted macram&eacute; jewellery
        </p>
        <h1 className="max-w-3xl font-display text-4xl leading-[1.05] text-ivory md:text-6xl lg:text-7xl">
          <span className="block overflow-hidden">
            <span className="hero-line block">Handcrafted pieces.</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block italic text-goldlight">
              Made to be remembered.
            </span>
          </span>
        </h1>

        <a
          href="#mirror-hall"
          className="hero-cta group mt-10 inline-flex items-center gap-3 font-body text-sm text-ivory md:text-base"
        >
          <span className="border-b border-ivory/50 pb-0.5 transition-colors group-hover:border-ivory">
            Explore the collection
          </span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-y-1">
            &darr;
          </span>
        </a>
      </div>
    </section>
  );
}
