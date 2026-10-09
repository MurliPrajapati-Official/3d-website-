import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { BRAND, NAV } from '../data/content';
import { getLenis, scrollToId } from '../lib/lenis';
import MagneticButton from './MagneticButton';

const ease = [0.16, 1, 0.3, 1];

export default function Nav({ ready }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const hero = document.getElementById('top');
    const heroEnd = hero ? hero.offsetHeight - window.innerHeight : 0;
    setHidden(y > prev && y > 240);
    setSolid(y > heroEnd - 10);
  });

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else if (ready) lenis?.start();
  }, [open, ready]);

  const go = (id) => {
    setOpen(false);
    // Let the overlay start closing before the page moves.
    setTimeout(() => scrollToId(id), open ? 350 : 0);
  };

  return (
    <>
      <motion.header
        className={`nav ${solid ? 'nav--solid' : ''}`}
        initial={{ y: -120 }}
        animate={{ y: !ready || (hidden && !open) ? -120 : 0 }}
        transition={{ duration: 0.7, ease }}
      >
        <a
          href="#top"
          className="nav__mark"
          onClick={(e) => {
            e.preventDefault();
            go('top');
          }}
        >
          Daily Drama
        </a>

        <nav className="nav__links" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav__link"
              onClick={(e) => {
                e.preventDefault();
                go(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav__end">
          <MagneticButton href={BRAND.phoneHref} variant="solid" className="btn--sm nav__cta">
            Reserve
          </MagneticButton>
          <button
            type="button"
            className={`nav__burger ${open ? 'is-open' : ''}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="sheet"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="sheet__links" aria-label="Mobile">
              {NAV.map((item, i) => (
                <span className="mask" key={item.id}>
                  <motion.a
                    href={`#${item.id}`}
                    className="sheet__link"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.8, ease, delay: 0.25 + i * 0.06 }}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.id);
                    }}
                  >
                    <span className="sheet__index">0{i + 1}</span>
                    {item.label}
                  </motion.a>
                </span>
              ))}
            </nav>
            <motion.div
              className="sheet__foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              exit={{ opacity: 0 }}
            >
              <p>{BRAND.address.join(', ')}</p>
              <a className="link" href={BRAND.phoneHref}>
                {BRAND.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
