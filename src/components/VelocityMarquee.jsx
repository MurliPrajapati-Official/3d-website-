import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

// Endless band of type that speeds up, and flips direction, with scroll velocity.
export default function VelocityMarquee({ items, baseVelocity = -3, variant = 'solid' }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, -25, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) direction.current = -1;
    else if (factor.get() > 0) direction.current = 1;
    move += direction.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });

  const run = (
    <span className="marquee__run">
      {items.map((item) => (
        <span key={item} className="marquee__item">
          {item}
          <span className="marquee__sep" aria-hidden="true" />
        </span>
      ))}
    </span>
  );

  return (
    <div className={`marquee marquee--${variant}`}>
      <span className="sr-only">{items.join(', ')}</span>
      <motion.div className="marquee__track" style={{ x }} aria-hidden="true">
        {run}
        {run}
        {run}
        {run}
      </motion.div>
    </div>
  );
}
