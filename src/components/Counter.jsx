import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

const format = (v, decimals, prefix) =>
  prefix + v.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export default function Counter({ value, decimals = 0, prefix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format(v, decimals, prefix);
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals, prefix]);

  return (
    <span ref={ref} aria-label={format(value, decimals, prefix)}>
      {format(0, decimals, prefix)}
    </span>
  );
}
