"use client";

import { useEffect, useRef } from "react";
import { gsap, useGsapRegister } from "@/lib/gsap";

const steps = [
  {
    n: "01",
    title: "Stainless steel closure",
    body: "Hypoallergenic, resistant, and built to be worn every day without wearing out.",
  },
  {
    n: "02",
    title: "Textured centerpiece",
    body: "A small detail in muted gold, catching light and giving each piece its character.",
  },
  {
    n: "03",
    title: "Connecting ring",
    body: "Joins every element with the same care given to the knots themselves — firm, quiet, exact.",
  },
  {
    n: "04",
    title: "100% cotton macramé",
    body: "Woven knot by knot, entirely by hand. Light, flexible, and never quite the same twice.",
  },
];

export default function CraftSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    useGsapRegister();
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".craft-row");
      rows.forEach((row) => {
        const rule = row.querySelector(".craft-rule");
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: "power2.out",
            transformOrigin: "left center",
            scrollTrigger: { trigger: row, start: "top 80%" },
          }
        );
        gsap.fromTo(
          row.querySelectorAll(".craft-fade"),
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 80%" },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="craft" ref={rootRef} className="bg-cream px-6 py-28 md:px-14 md:py-36">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-body text-xs uppercase tracking-wide2 text-gold">
            Made by hand
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
            Every piece breaks down into four honest parts.
          </h2>
          <p className="mt-6 max-w-sm font-body text-base leading-relaxed text-espresso/70">
            Macram&eacute; is the art of making with knots &mdash; a technique
            that asks for time, patience, and hands that pay attention.
          </p>
        </div>

        <div className="md:col-span-8">
          {steps.map((step) => (
            <div key={step.n} className="craft-row border-t border-espresso/15 py-8 first:border-t-0 md:first:border-t md:py-10">
              <div className="craft-rule h-px w-full bg-espresso/15" />
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-8">
                <span className="craft-fade font-display text-2xl text-gold/80 sm:w-14 sm:shrink-0">
                  {step.n}
                </span>
                <h3 className="craft-fade font-display text-2xl sm:w-1/3 sm:shrink-0 md:text-3xl">
                  {step.title}
                </h3>
                <p className="craft-fade max-w-md font-body text-base leading-relaxed text-espresso/70">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
