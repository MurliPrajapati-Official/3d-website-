import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

// Heading whose lines rise out of a mask when scrolled into view.
export default function RevealLines({ lines, as = 'h2', className = '', delay = 0 }) {
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: delay } } }}
    >
      {lines.map((line) => (
        <span className="mask" key={line}>
          <motion.span
            className="mask__inner"
            variants={{
              hidden: { y: '108%' },
              show: { y: '0%', transition: { duration: 1.15, ease } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function FadeUp({ children, className = '', delay = 0, as = 'div' }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </Tag>
  );
}
