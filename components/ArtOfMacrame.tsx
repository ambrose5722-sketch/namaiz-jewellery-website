"use client";

import { useEffect, useRef } from "react";
import { gsap, useGsapRegister } from "@/lib/gsap";

export default function ArtOfMacrame() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    useGsapRegister();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".macrame-img-large",
        { opacity: 0, scale: 1.06 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
        }
      );
      gsap.fromTo(
        ".macrame-img-small",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay: 0.25,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
        }
      );
      gsap.fromTo(
        ".macrame-copy",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-moss px-6 py-28 text-ivory md:px-14 md:py-36">
      <div className="grid gap-16 md:grid-cols-12 md:gap-10">
        <div className="relative md:col-span-7">
          <img
            src="/images/product-cream-cuff.jpg"
            alt="Close view of an ivory macramé cuff mid-weave, threads and knots visible"
            className="macrame-img-large h-[60vh] w-full rounded-sm object-cover"
          />
          <img
            src="/images/product-teal-cuff.jpg"
            alt="Moss-green macramé cuff resting on a raw wood slice among spools of thread"
            className="macrame-img-small absolute -bottom-10 -right-6 hidden h-52 w-40 rounded-sm object-cover shadow-2xl ring-4 ring-moss md:block md:h-64 md:w-48"
          />
        </div>

        <div className="md:col-span-5 md:pl-6">
          <p className="macrame-copy font-body text-xs uppercase tracking-wide2 text-goldlight">
            The art of macram&eacute;
          </p>
          <h2 className="macrame-copy mt-4 font-display text-4xl leading-tight md:text-5xl">
            No two knots fall exactly the same way.
          </h2>
          <p className="macrame-copy mt-6 max-w-md font-body text-base leading-relaxed text-ivory/75">
            Macram&eacute; doesn&rsquo;t move fast. Each cord is measured,
            crossed, and pulled tight by hand, one knot after another, until a
            pattern only truly appears near the end.
          </p>
          <p className="macrame-copy mt-4 max-w-md font-body text-base leading-relaxed text-ivory/75">
            That patience is the point. A machine could repeat a pattern
            perfectly. A pair of hands can&rsquo;t &mdash; and that&rsquo;s
            what makes every finished piece slightly, quietly its own.
          </p>
        </div>
      </div>
    </section>
  );
}
