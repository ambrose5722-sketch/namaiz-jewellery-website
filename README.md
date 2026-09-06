# Namaiz — Handcrafted Macramé Jewellery

A cinematic, scroll-driven homepage built with Next.js (App Router), Tailwind CSS
and GSAP ScrollTrigger. The centerpiece is the "Mirror Hall" section: a pinned,
full-screen scene where scrolling scrubs the supplied video and stages two real
product photographs at different depths — no 3D models involved.

## 1. Install

Requires Node.js 18.17+.

```bash
npm install
```

## 2. Run locally

```bash
npm run dev
```

Open http://localhost:3000. First build needs internet access once, to fetch
the Fraunces/Inter fonts from Google Fonts via `next/font/google` — after that
they're self-hosted from `.next/` like any other Next.js font.

## 3. Production build

```bash
npm run build
npm run start
```

## Where the supplied assets live

Already placed for you:

```
public/
  video/
    mirror-hall.mp4          ← the Mirror Hall display video (scroll-scrubbed)
  images/
    product-teal-cuff.jpg    ← "The Meadow Cuff" (moss/gold macramé cuff)
    product-cream-cuff.jpg   ← "The Mosaic Cuff" (ivory geometric macramé cuff)
    craft-infographic.jpg    ← your original Spanish craftsmanship infographic,
                                kept in the project for reference only — its
                                content was rewritten into the "Made By Hand"
                                section rather than displayed as an image
```

If you get higher-resolution versions of the two product photos or additional
angles, drop them in at the same filenames (or update the `src` paths in
`components/MirrorHall.tsx` and `components/Collection.tsx`).

No placeholder assets were needed — every image and video on the page is one
of your real supplied files.

## File structure

```
app/
  layout.tsx        Root layout, fonts, metadata
  page.tsx           Assembles all sections in order
  globals.css        Base styles, reduced-motion handling, selection color
components/
  Nav.tsx             Fixed nav, becomes solid after the hero
  Hero.tsx            01 — Cinematic hero
  MirrorHall.tsx       02 — The signature scroll-scrubbed experience
  Collection.tsx       03 — The Collection (editorial product layout)
  CraftSection.tsx     04 — Made By Hand (rebuilt from your infographic)
  ArtOfMacrame.tsx     05 — The Art of Macramé (brand storytelling)
  BrandStory.tsx       06 — Brand Story
  FinalCTA.tsx         07 — Final CTA + contact/social
  SmoothScroll.tsx     Lenis smooth-scroll wired into GSAP's ticker
lib/
  gsap.ts             Registers GSAP + ScrollTrigger once, exported for reuse
```

## How the Mirror Hall section works

`components/MirrorHall.tsx` pins a full-viewport `<div>` for a long scroll
distance (420% of the viewport height on desktop, 280% on mobile) using a
single `ScrollTrigger`. On every scroll update it:

1. Sets `video.currentTime = scrollProgress * video.duration` — the video
   plays only as fast as you scroll, never on its own.
2. Slowly scales and horizontally drifts the video layer to fake a camera
   dolly move through the hall.
3. Fades, lifts, rotates and focus-pulls (blur → sharp) each real product
   photo into place at its own point in the scroll range, then lets it
   recede off to one side as the next piece arrives.
4. Fades an intro line in/out at the very start and an outro cue near the end,
   to hand off cleanly into "The Collection" section below.

Everything is driven by one `onUpdate` callback and a small `win()` helper
that maps scroll progress into an enter/hold/exit window per element — there
is no separate timeline to keep in sync with the video.

## Performance & accessibility notes

- The video is `muted`, `playsInline`, and `preload="auto"` — no autoplay
  fighting the browser, since playback position is driven entirely by scroll.
- `prefers-reduced-motion: reduce` is respected in two places: `SmoothScroll`
  skips Lenis entirely, and `MirrorHall` swaps to a static, unpinned layout
  with the same real content and no scroll-scrubbing.
- `gsap.matchMedia()` is used inside `MirrorHall` to shorten the pinned
  scroll distance and soften horizontal movement on mobile.
- All sections use `overflow-x: clip` to guard against horizontal scroll
  from the parallax transforms.

## Known follow-ups before shipping to a client domain

- Swap `hello@namaiz.com` and the Instagram link in `FinalCTA.tsx` for the
  real contact details.
- The two product photos are used both inside Mirror Hall and in The
  Collection section — if you get clean, background-separated cutouts of
  each piece, the Mirror Hall layer transforms (rotation/scale/shadow) will
  read even more like objects floating in the scene rather than framed
  photos.
- `next.config.mjs` and `tailwind.config.ts` are intentionally minimal —
  add `images.domains` / a CDN loader if products end up served from a CMS
  instead of `/public`.
