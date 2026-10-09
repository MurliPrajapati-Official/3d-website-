# Daily Drama — website

React + Vite (JSX), GSAP ScrollTrigger, Framer Motion, Lenis smooth scroll.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Hero scroll film

`video.mp4` is split into 278 WebP frames (`public/frames/lg` for desktop,
`public/frames/sm` for phones). The hero is 460vh tall with a sticky stage;
scroll position picks the frame painted onto a `<canvas>`.

To rebuild the frames (e.g. after swapping the video), with ffmpeg installed:

```bash
npm run frames
```

The film's 3x3 grid is part of its design (each tile is a slightly shifted
view and the lines hide the joins), so it is kept. The script paints the
burned-in captions out of the section stills; those caption coordinates are
specific to this clip.

## Deploy

Hosted on Cloudflare Pages (project `daily-drama`):

```bash
npm run deploy
```

## Where things live

- `src/data/content.js` — all copy, menu items, address, hours, links
- `src/sections/` — page sections in scroll order
- `src/components/` — magnetic button, line reveal, scroll-lit words,
  velocity marquee, counter, preloader, nav
- `src/styles/global.css` — design tokens (colors, type scale) at the top

## Fonts

Headings ask for Druk Wide / Monument Extended / Integral CF first and fall
back to Archivo at its widest, heaviest cut (Google Fonts). Paragraphs use
Yellowtail (Google Fonts), the free match from `font.md`. To use a licensed
font, self-host it with `@font-face` in `global.css` and put it first in
`--f-head` / `--f-body`.
