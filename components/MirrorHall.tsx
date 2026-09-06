"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGsapRegister } from "@/lib/gsap";

/**
 * The signature "Mirror Hall" experience.
 *
 * A single pinned viewport is held in place for a long scroll distance.
 * Scroll position drives three things at once:
 *   1. The Mirror Hall video's playback position (scroll-scrubbed, not autoplaying)
 *   2. A slow simulated "dolly" move across the background (scale + horizontal drift)
 *   3. Two real product photographs, which rise into the scene at different
 *      points along the scroll, each staged at a different depth with its
 *      own parallax speed, rotation, focus-pull blur and caption reveal.
 *
 * There is no 3D model involved — the sense of depth comes entirely from
 * layering, scale, timing and clip-path reveals on the supplied 2D assets.
 */
export default function MirrorHall() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const p1ImgRef = useRef<HTMLDivElement>(null);
  const p1CapRef = useRef<HTMLDivElement>(null);
  const p2ImgRef = useRef<HTMLDivElement>(null);
  const p2CapRef = useRef<HTMLDivElement>(null);

  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) return; // static fallback layout handles this case instead
    useGsapRegister();

    const video = videoRef.current;
    let duration = 0;

    const onMeta = () => {
      duration = video?.duration || 0;
    };
    video?.addEventListener("loadedmetadata", onMeta);
    if (video && video.readyState >= 1) duration = video.duration;

    const clamp = gsap.utils.clamp(0, 1);
    const phase = (a: number, b: number, p: number) => clamp((p - a) / (b - a));
    const win = (p: number, a: number, b: number, c: number, d: number) =>
      clamp(phase(a, b, p) - phase(c, d, p));

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };
          const scrollLength = isMobile ? "+=280%" : "+=420%";

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: scrollLength,
            pin: stickyRef.current,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;

              // 1. Scroll-scrub the video instead of letting it autoplay.
              if (video && duration) {
                video.currentTime = p * duration;
              }

              // 2. Slow simulated dolly / camera drift across the hall.
              gsap.set(videoWrapRef.current, {
                scale: 1 + p * 0.22,
                xPercent: p * (isMobile ? -3 : -6),
              });

              // 3. Intro title — present briefly, then dissolves.
              const introP = win(p, 0, 0.05, 0.13, 0.19);
              gsap.set(introRef.current, {
                opacity: introP,
                y: (1 - introP) * -30,
                filter: `blur(${(1 - introP) * 6}px)`,
              });

              // 4. Product one — rises from below, holds, recedes left.
              const e1 = win(p, 0.16, 0.29, 0.42, 0.5);
              gsap.set(p1ImgRef.current, {
                opacity: e1,
                y: (1 - e1) * 120,
                x: -phase(0.42, 0.5, p) * (isMobile ? 40 : 90),
                rotate: -6 + e1 * 6,
                scale: 0.88 + e1 * 0.12,
                filter: `blur(${(1 - e1) * 10}px)`,
              });
              const c1 = win(p, 0.21, 0.31, 0.4, 0.48);
              gsap.set(p1CapRef.current, {
                opacity: c1,
                y: (1 - c1) * 24,
              });

              // 5. Product two — enters from the opposite side, deeper stage.
              const e2 = win(p, 0.52, 0.65, 0.82, 0.9);
              gsap.set(p2ImgRef.current, {
                opacity: e2,
                y: (1 - e2) * 120,
                x: phase(0.82, 0.9, p) * (isMobile ? -40 : -90),
                rotate: 6 - e2 * 6,
                scale: 0.88 + e2 * 0.12,
                filter: `blur(${(1 - e2) * 10}px)`,
              });
              const c2 = win(p, 0.57, 0.67, 0.8, 0.88);
              gsap.set(p2CapRef.current, {
                opacity: c2,
                y: (1 - c2) * 24,
              });

              // 6. Outro cue, guiding into the next section.
              const outroP = phase(0.87, 0.97, p);
              gsap.set(outroRef.current, { opacity: outroP, y: (1 - outroP) * 20 });

              // Whole scene dims as we exit toward The Collection.
              gsap.set(trackRef.current, {
                opacity: 1 - phase(0.95, 1, p) * 0.9,
              });
            },
          });
        }
      );
    }, sectionRef);

    return () => {
      video?.removeEventListener("loadedmetadata", onMeta);
      ctx.revert();
    };
  }, [reduced]);

  if (reduced) {
    return <StaticMirrorHall />;
  }

  return (
    <section id="mirror-hall" ref={sectionRef} className="relative bg-espresso">
      <div
        ref={stickyRef}
        className="relative h-[100svh] w-full overflow-hidden bg-espresso"
      >
        <div ref={trackRef} className="absolute inset-0">
          <div ref={videoWrapRef} className="absolute inset-0">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src="/video/mirror-hall.mp4"
              muted
              playsInline
              preload="auto"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-espresso/60 via-transparent to-espresso/80" />
          <div className="pointer-events-none absolute inset-0 bg-espresso/10 mix-blend-multiply" />

          {/* Intro caption */}
          <div
            ref={introRef}
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center"
          >
            <h2 className="max-w-xl font-display text-3xl text-ivory md:text-5xl">
              Step through the hall of mirrors.
            </h2>
          </div>

          {/* Product one — teal & gold cuff */}
          <div
            ref={p1ImgRef}
            className="absolute left-[6%] top-[16%] w-[62vw] max-w-[340px] md:left-[10%] md:top-[14%] md:w-[30vw]"
            style={{ opacity: 0 }}
          >
            <div
              className="overflow-hidden rounded-[2px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]"
              style={{ clipPath: "inset(0 round 2px)" }}
            >
              <img
                src="/images/product-teal-cuff.jpg"
                alt="Handwoven macramé cuff in moss green and gold thread, resting on a wood slice"
                className="h-[42vh] w-full object-cover md:h-[52vh]"
              />
            </div>
          </div>
          <div
            ref={p1CapRef}
            className="absolute bottom-[14%] left-[6%] max-w-[280px] text-ivory md:bottom-[18%] md:left-[10%]"
            style={{ opacity: 0 }}
          >
            <p className="font-body text-xs uppercase tracking-wide2 text-goldlight">
              Piece one
            </p>
            <h3 className="mt-2 font-display text-xl md:text-2xl">
              The Meadow Cuff
            </h3>
            <p className="mt-2 font-body text-sm text-ivory/70">
              Moss-green macramé knotted around threads of muted gold, finished
              by hand, knot by knot.
            </p>
          </div>

          {/* Product two — ivory geometric cuff */}
          <div
            ref={p2ImgRef}
            className="absolute right-[6%] top-[20%] w-[62vw] max-w-[340px] md:right-[10%] md:top-[18%] md:w-[30vw]"
            style={{ opacity: 0 }}
          >
            <div
              className="overflow-hidden rounded-[2px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]"
              style={{ clipPath: "inset(0 round 2px)" }}
            >
              <img
                src="/images/product-cream-cuff.jpg"
                alt="Handwoven ivory macramé cuff with geometric turquoise, brown and mustard detailing"
                className="h-[42vh] w-full object-cover md:h-[52vh]"
              />
            </div>
          </div>
          <div
            ref={p2CapRef}
            className="absolute bottom-[14%] right-[6%] max-w-[280px] text-right text-ivory md:bottom-[18%] md:right-[10%]"
            style={{ opacity: 0 }}
          >
            <p className="font-body text-xs uppercase tracking-wide2 text-goldlight">
              Piece two
            </p>
            <h3 className="mt-2 font-display text-xl md:text-2xl">
              The Mosaic Cuff
            </h3>
            <p className="mt-2 font-body text-sm text-ivory/70">
              A geometric pattern in ivory, turquoise and clay — every mark a
              deliberate, individual knot.
            </p>
          </div>

          {/* Outro cue */}
          <div
            ref={outroRef}
            className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center text-ivory/60"
            style={{ opacity: 0 }}
          >
            <p className="font-body text-xs uppercase tracking-wide2">
              Continue into the collection
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Fallback for prefers-reduced-motion: the same real assets, same content,
 * no pinning, no scroll-scrubbed video and no parallax — a calm, static
 * stacked layout that still feels intentional.
 */
function StaticMirrorHall() {
  return (
    <section id="mirror-hall" className="relative bg-espresso px-6 py-24 md:px-14">
      <h2 className="max-w-xl font-display text-3xl text-ivory md:text-5xl">
        Step through the hall of mirrors.
      </h2>
      <div className="mt-14 grid gap-14 md:grid-cols-2">
        <div>
          <img
            src="/images/product-teal-cuff.jpg"
            alt="Handwoven macramé cuff in moss green and gold thread"
            className="h-[50vh] w-full rounded-sm object-cover"
          />
          <p className="mt-4 font-body text-xs uppercase tracking-wide2 text-goldlight">
            Piece one
          </p>
          <h3 className="mt-2 font-display text-2xl text-ivory">
            The Meadow Cuff
          </h3>
        </div>
        <div>
          <img
            src="/images/product-cream-cuff.jpg"
            alt="Handwoven ivory macramé cuff with geometric detailing"
            className="h-[50vh] w-full rounded-sm object-cover"
          />
          <p className="mt-4 font-body text-xs uppercase tracking-wide2 text-goldlight">
            Piece two
          </p>
          <h3 className="mt-2 font-display text-2xl text-ivory">
            The Mosaic Cuff
          </h3>
        </div>
      </div>
    </section>
  );
}
