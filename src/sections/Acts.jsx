import { motion } from 'framer-motion';
import { ACTS } from '../data/content';
import RevealLines from '../components/RevealLines';

const ease = [0.16, 1, 0.3, 1];

export default function Acts() {
  return (
    <section id="acts" className="section acts">
      <header className="sec-head">
        <span className="label">(02)</span>
        <span className="label">The Programme</span>
      </header>

      <div className="acts__intro">
        <RevealLines className="h-2" lines={['Three acts,', 'played daily.']} />
        <p className="acts__aside">
          One room, three obsessions. Order one, or stay long enough for all three.
        </p>
      </div>

      <ol className="acts__list">
        {ACTS.map((act, i) => (
          <motion.li
            key={act.title}
            className="act"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 1, ease, delay: i * 0.05 }}
          >
            <motion.span
              className="act__rule"
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease }}
            />
            <span className="act__num label">Act {act.numeral}</span>
            <h3 className="act__title">{act.title}</h3>
            <div className="act__body">
              <p>{act.body}</p>
              <ul className="act__notes">
                {act.notes.map((n) => (
                  <li key={n} className="label">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
