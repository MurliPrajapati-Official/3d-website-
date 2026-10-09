import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { STORY } from '../data/content';
import RevealLines from '../components/RevealLines';
import ScrollWords from '../components/ScrollWords';

export default function Story() {
  const root = useRef(null);

  useGSAP(
    () => {
      // The photograph opens like a shutter, then drifts slower than the page.
      gsap.fromTo(
        '.story__media',
        { clipPath: 'inset(18% 12% 18% 12%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: { trigger: '.story__media', start: 'top 90%', end: 'top 30%', scrub: true },
        },
      );
      gsap.fromTo(
        '.story__media img',
        { scale: 1.25, yPercent: -6 },
        {
          scale: 1.05,
          yPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: '.story__media', start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section id="story" className="section story" ref={root}>
      <header className="sec-head">
        <span className="label">(01)</span>
        <span className="label">The Story</span>
      </header>

      <div className="story__grid">
        <figure className="story__media">
          <img src="/stills/greens.webp" alt="Greens, garlic and red chilli searing in a hot pan" loading="lazy" />
        </figure>

        <div className="story__text">
          <RevealLines className="h-2" lines={['A café with', 'a flair for the', 'theatrical.']} />
          <ScrollWords className="lead story__words" text={STORY} />
          <p className="story__sign">— Daily Drama, 1st &amp; 2nd Floor, Defence Colony Market</p>
        </div>
      </div>
    </section>
  );
}
