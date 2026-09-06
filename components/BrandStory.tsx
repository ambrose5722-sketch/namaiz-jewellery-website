"use client";

import { useEffect, useRef } from "react";
import { gsap, useGsapRegister } from "@/lib/gsap";

export default function BrandStory() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    useGsapRegister();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".story-line",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={rootRef} className="bg-ivory px-6 py-28 md:px-14 md:py-40">
      <div className="mx-auto max-w-3xl text-center">
        <p className="story-line font-body text-xs uppercase tracking-wide2 text-gold">
          Why we make things this way
        </p>
        <h2 className="story-line mt-6 font-display text-3xl leading-relaxed md:text-4xl">
          Namaiz began with a simple frustration: most jewellery is made to be
          replaced.
        </h2>
        <p className="story-line mt-8 font-body text-lg leading-relaxed text-espresso/75 md:text-xl">
          We wanted to make the opposite kind of piece &mdash; something knotted
          by a real person, from natural cotton and honest materials, meant to
          be worn for years rather than a season.
        </p>
        <p className="story-line mt-6 font-body text-lg leading-relaxed text-espresso/75 md:text-xl">
          No two pieces leave our hands identical. That&rsquo;s not a flaw in
          the process &mdash; it&rsquo;s the whole reason we still do this by
          hand.
        </p>
      </div>
    </section>
  );
}
