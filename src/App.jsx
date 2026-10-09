import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { preloadFrames } from './lib/frames';
import { getLenis, setLenis } from './lib/lenis';
import Preloader from './components/Preloader';
import Nav from './components/Nav';
import VelocityMarquee from './components/VelocityMarquee';
import Hero from './sections/Hero';
import Story from './sections/Story';
import Acts from './sections/Acts';
import Process from './sections/Process';
import Menu from './sections/Menu';
import Room from './sections/Room';
import Visit from './sections/Visit';
import Footer from './sections/Footer';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export default function App() {
  const framesRef = useRef([]);
  const progressRef = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis = null;
    const tick = (time) => lenis.raf(time * 1000);

    if (!reduceMotion) {
      lenis = new Lenis({ lerp: 0.085 });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      lenis.stop();
      setLenis(lenis);
    }

    const size = window.innerWidth < 768 ? 'sm' : 'lg';
    const { images, done } = preloadFrames(size, (p) => {
      progressRef.current = p;
    });
    framesRef.current = images;

    let cancelled = false;
    // Hold the curtain for a beat, wait for frames (capped so a slow
    // connection still gets in) and for the fonts that size the headlines.
    Promise.all([wait(1500), Promise.race([done, wait(9000)]), document.fonts.ready]).then(() => {
      if (cancelled) return;
      progressRef.current = 1;
      setReady(true);
    });

    return () => {
      cancelled = true;
      if (lenis) {
        gsap.ticker.remove(tick);
        lenis.destroy();
        setLenis(null);
      }
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.remove('is-loading');
    getLenis()?.start();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [ready]);

  return (
    <>
      <Preloader progressRef={progressRef} ready={ready} />
      <Nav ready={ready} />
      <main>
        <Hero framesRef={framesRef} ready={ready} />
        <Story />
        <VelocityMarquee items={['Multi-roaster coffee', 'Specialty matcha', 'All-day dining']} />
        <Acts />
        <Process />
        <VelocityMarquee items={['Built over flames', 'Finished with intention']} baseVelocity={3} variant="outline" />
        <Menu />
        <Room />
        <Visit />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
