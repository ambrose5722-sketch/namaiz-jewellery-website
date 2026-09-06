"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, useGsapRegister } from "@/lib/gsap";

const products = [
  {
    name: "The Meadow Cuff",
    image: "/images/product-teal-cuff.jpg",
    alt: "Handwoven macramé cuff in moss green and gold thread, resting on a wood slice",
    description:
      "Rows of moss-green cotton knotted tight around threads of muted gold, built up band by band until the piece holds its own shape on the wrist.",
    detail: "100% cotton macramé, hand-knotted over 6 hours",
  },
  {
    name: "The Mosaic Cuff",
    image: "/images/product-cream-cuff.jpg",
    alt: "Handwoven ivory macramé cuff with geometric turquoise, brown and mustard detailing",
    description:
      "An ivory ground carries a small geometric pattern in turquoise, walnut brown and mustard — no two repeats land quite the same way.",
    detail: "100% cotton macramé, adjustable sliding closure",
  },
];

export default function Collection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    useGsapRegister();
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".collection-row");
      rows.forEach((row) => {
        const image = row.querySelector(".collection-image");
        const text = row.querySelector(".collection-text");
        gsap.fromTo(
          image,
          { opacity: 0, y: 60, scale: 1.04 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 78%" },
          }
        );
        gsap.fromTo(
          text,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.15,
            scrollTrigger: { trigger: row, start: "top 78%" },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="collection" ref={rootRef} className="bg-ivory px-6 py-28 md:px-14 md:py-36">
      <div className="mb-20 max-w-2xl">
        <p className="font-body text-xs uppercase tracking-wide2 text-gold">
          The collection
        </p>
        <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
          Two pieces, one technique &mdash; every knot placed by hand.
        </h2>
      </div>

      <div className="flex flex-col gap-24 md:gap-36">
        {products.map((product, i) => (
          <div
            key={product.name}
            className={`collection-row flex flex-col gap-10 md:items-center md:gap-16 ${
              i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
            }`}
          >
            <div className="collection-image w-full md:w-7/12">
              <img
                src={product.image}
                alt={product.alt}
                className="h-[56vh] w-full rounded-sm object-cover shadow-[0_30px_60px_-20px_rgba(36,28,22,0.35)]"
              />
            </div>
            <div className="collection-text w-full md:w-5/12">
              <p className="font-body text-xs uppercase tracking-wide2 text-gold">
                {product.detail}
              </p>
              <h3 className="mt-3 font-display text-3xl md:text-4xl">
                {product.name}
              </h3>
              <p className="mt-5 max-w-md font-body text-base leading-relaxed text-espresso/75">
                {product.description}
              </p>
              <a
                href="#final"
                className="mt-8 inline-flex items-center gap-2 border-b border-espresso/30 pb-1 font-body text-sm transition-colors hover:border-espresso"
              >
                Enquire about this piece
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
