import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SCENES } from '../data/content';

// Pinned horizontal reel: vertical scroll drives the track sideways.
export default function Process() {
  const root = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const distance = () => track.scrollWidth - window.innerWidth;

      const slide = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray('.scene__media img').forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              containerAnimation: slide,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section className="process" ref={root} aria-label="One dish, five scenes">
      <div className="process__track" ref={trackRef}>
        <div className="process__intro">
          <header className="sec-head sec-head--bare">
            <span className="label">(03)</span>
            <span className="label">Behind the pass</span>
          </header>
          <h2 className="h-2">
            One dish.
            <br />
            Five scenes.
          </h2>
          <p>
            The eggs from our film, start to finish. Every plate that leaves the kitchen gets the same attention.
          </p>
        </div>

        {SCENES.map((scene, i) => (
          <figure className="scene" key={scene.title}>
            <div className="scene__media">
              <img src={`/stills/${scene.img}.webp`} alt={`${scene.title}: ${scene.body}`} loading="lazy" />
            </div>
            <figcaption className="scene__cap">
              <span className="label">Scene 0{i + 1}</span>
              <h3 className="h-3">{scene.title}</h3>
              <p>{scene.body}</p>
            </figcaption>
          </figure>
        ))}

        <div className="process__end">
          <p>And then it&rsquo;s yours.</p>
        </div>
      </div>
    </section>
  );
}
