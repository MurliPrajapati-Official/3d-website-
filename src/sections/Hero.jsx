import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FRAME_COUNT } from '../lib/frames';
import { scrollToId } from '../lib/lenis';
import useFitText from '../lib/useFitText';
import { BRAND, HERO_SCENES } from '../data/content';
import MagneticButton from '../components/MagneticButton';

const pad = (n) => String(n).padStart(3, '0');

// Scroll-driven film: the section is several viewports tall, the stage is
// sticky, and scroll progress picks which of the 278 frames is painted.
export default function Hero({ framesRef, ready }) {
  const root = useRef(null);
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const frameNumRef = useRef(null);
  const sceneRef = useRef(null);
  const barRef = useRef(null);

  useFitText(titleRef);

  useGSAP(
    () => {
      if (!ready) return undefined;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const images = framesRef.current;
      const state = { frame: 0 };
      let drawn = -1;
      let scene = -1;

      // Nearest frame that has actually arrived, so a slow network never
      // leaves the stage blank.
      const pick = (i) => {
        for (let d = 0; d < FRAME_COUNT; d++) {
          for (const img of [images[i - d], images[i + d]]) {
            if (img && img.complete && img.naturalWidth) return img;
          }
        }
        return null;
      };

      const draw = (force = false) => {
        const i = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(state.frame)));
        if (i === drawn && !force) return;
        const img = pick(i);
        if (!img) return;
        drawn = i;
        const { width: cw, height: ch } = canvas;
        const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
        const w = img.naturalWidth * s;
        const h = img.naturalHeight * s;
        ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
        frameNumRef.current.textContent = pad(i + 1);
      };

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(canvas.clientWidth * dpr);
        canvas.height = Math.round(canvas.clientHeight * dpr);
        draw(true);
      };
      resize();
      window.addEventListener('resize', resize);

      const setScene = (progress) => {
        let idx = 0;
        HERO_SCENES.forEach((s, i) => {
          if (progress >= s.at) idx = i;
        });
        if (idx === scene) return;
        scene = idx;
        const { numeral, name } = HERO_SCENES[idx];
        gsap.fromTo(
          sceneRef.current,
          { yPercent: 100, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: 'expo.out', overwrite: true },
        );
        sceneRef.current.textContent = `Scene ${numeral} — ${name}`;
      };
      setScene(0);

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          onUpdate: (self) => {
            barRef.current.style.transform = `scaleX(${self.progress})`;
            setScene(self.progress);
          },
        },
      });

      tl.to(state, { frame: FRAME_COUNT - 1, duration: 1, onUpdate: draw }, 0)
        // Act one: the title card lifts away and the film brightens.
        .to('.hero__intro', { yPercent: -18, autoAlpha: 0, duration: 0.14, ease: 'power2.in' }, 0.03)
        .to('.hero__scrim', { opacity: 0.18, duration: 0.14 }, 0.03)
        // Curtain call: dim the plate and bring on the closing line.
        .to('.hero__scrim', { opacity: 0.58, duration: 0.08 }, 0.86)
        .fromTo('.hero__outro', { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.08, ease: 'power2.out' }, 0.88)
        .to({}, { duration: 0.04 }, 0.96);

      // Entrance once the preloader lifts.
      gsap.from('.hero__title .mask__inner', { yPercent: 110, duration: 1.4, ease: 'expo.out', stagger: 0.08, delay: 0.35 });
      gsap.from('.hero__reveal', { autoAlpha: 0, y: 24, duration: 1.1, ease: 'power3.out', stagger: 0.08, delay: 0.7 });

      return () => window.removeEventListener('resize', resize);
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section id="top" className="hero" ref={root} aria-label="Daily Drama — opening film">
      <div className="hero__stage">
        <canvas
          ref={canvasRef}
          className="hero__canvas"
          role="img"
          aria-label="A chef cracks eggs, sears greens over flame, and plates soft scrambled eggs with toasted sourdough."
        />
        <div className="hero__scrim" />

        <div className="hero__intro">
          <div className="hero__meta hero__reveal">
            <span className="label">Multi-roaster coffee</span>
            <span className="label">Specialty matcha</span>
            <span className="label">All-day dining</span>
          </div>

          <div className="hero__bottom">
            <div className="hero__fit">
              <h1 className="hero__title" ref={titleRef}>
                <span className="mask">
                  <span className="mask__inner">Daily</span>
                </span>{' '}
                <span className="mask">
                  <span className="mask__inner">Drama</span>
                </span>
              </h1>
            </div>

            <div className="hero__copy">
              <p className="hero__lede hero__reveal">
                Multi-roaster coffee, matcha whisked to order and a kitchen that cooks all day, on two floors of
                Defence Colony Market.
              </p>
              <div className="hero__cue hero__reveal" aria-hidden="true">
                <span className="hero__cue-line" />
                <span className="label">Scroll to cook</span>
              </div>
              <div className="hero__ctas hero__reveal">
                <MagneticButton href={BRAND.phoneHref}>Reserve a table</MagneticButton>
                <MagneticButton href="#menu" variant="ghost" onClick={() => scrollToId('menu')}>
                  See the menu
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>

        <div className="hero__hud hero__reveal" aria-hidden="true">
          <span className="hero__scene-wrap">
            <span className="label hero__scene" ref={sceneRef}>
              Scene I — The Crack
            </span>
          </span>
          <span className="label hero__count">
            <span ref={frameNumRef}>001</span> / {FRAME_COUNT}
          </span>
        </div>

        <div className="hero__outro">
          <h2 className="hero__outro-title">
            <span>Every plate</span>
            <span>is a scene.</span>
          </h2>
          <div className="hero__outro-side">
            <p>Pull up a chair. The kitchen is open from eight in the morning until ten at night.</p>
            <MagneticButton href="#story" variant="ghost" onClick={() => scrollToId('story')}>
              Enter the story
            </MagneticButton>
          </div>
        </div>

        <div className="hero__progress" aria-hidden="true">
          <span ref={barRef} />
        </div>
      </div>
    </section>
  );
}
