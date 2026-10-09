import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ease = [0.76, 0, 0.24, 1];

// Full-screen curtain that counts up while the hero frames download.
export default function Preloader({ progressRef, ready }) {
  const numRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    let shown = 0;
    let raf;
    const loop = () => {
      shown += (progressRef.current - shown) * 0.07;
      if (numRef.current) numRef.current.textContent = String(Math.round(shown * 100)).padStart(3, '0');
      if (barRef.current) barRef.current.style.transform = `scaleX(${shown})`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [progressRef]);

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          className="preloader"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 1.1, ease }}
          role="status"
          aria-label="Loading Daily Drama"
        >
          <div className="preloader__top">
            <span className="label">Daily Drama</span>
            <span className="label">Defence Colony — New Delhi</span>
          </div>
          <p className="preloader__line">Setting the stage…</p>
          <div className="preloader__bottom">
            <span className="preloader__num" ref={numRef}>000</span>
            <span className="preloader__bar">
              <span ref={barRef} />
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
