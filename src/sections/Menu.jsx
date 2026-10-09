import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BRAND, MENU } from '../data/content';
import RevealLines from '../components/RevealLines';
import MagneticButton from '../components/MagneticButton';

const ease = [0.16, 1, 0.3, 1];

export default function Menu() {
  const [active, setActive] = useState(0);
  const category = MENU[active];

  const onKey = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (active + (e.key === 'ArrowRight' ? 1 : -1) + MENU.length) % MENU.length;
    setActive(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  return (
    <section id="menu" className="section menu">
      <header className="sec-head">
        <span className="label">(04)</span>
        <span className="label">The Menu</span>
      </header>

      <div className="menu__head">
        <RevealLines className="h-1" lines={['Tonight’s', 'billing.']} />
        <div className="menu__tabs" role="tablist" aria-label="Menu categories" onKeyDown={onKey}>
          {MENU.map((c, i) => (
            <button
              key={c.name}
              id={`tab-${i}`}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-controls="menu-panel"
              tabIndex={active === i ? 0 : -1}
              className={`menu__tab ${active === i ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="menu__tab-num">0{i + 1}</span>
              {c.name}
              {active === i && (
                <motion.span className="menu__tab-line" layoutId="menu-tab-line" transition={{ duration: 0.6, ease }} />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="menu__body" id="menu-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={category.name}
            className="menu__grid"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06 } },
              exit: { opacity: 0, transition: { duration: 0.25 } },
            }}
          >
            <div className="menu__aside">
              <span className="mask">
                <motion.span
                  className="mask__inner menu__cat"
                  variants={{ hidden: { y: '110%' }, show: { y: '0%', transition: { duration: 0.9, ease } } }}
                >
                  {category.name}
                </motion.span>
              </span>
              <motion.p variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.8 } } }}>
                {category.blurb}
              </motion.p>
            </div>

            <ul className="menu__list">
              {category.items.map((item) => (
                <motion.li
                  key={item.name}
                  className="dish"
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
                  }}
                >
                  <div className="dish__row">
                    <h3 className="dish__name">{item.name}</h3>
                    {item.tag && <span className="label dish__tag">{item.tag}</span>}
                  </div>
                  <p className="dish__body">{item.body}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="menu__foot">
        <p>Our menu changes with the roasters and the seasons. Ask us what&rsquo;s pouring today.</p>
        <MagneticButton href={BRAND.districtHref} variant="ghost" external>
          Full menu on District
        </MagneticButton>
      </div>
    </section>
  );
}
