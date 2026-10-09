import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const spring = { stiffness: 220, damping: 16, mass: 0.4 };

// Magnetic CTA with a rolling label: the button leans toward the cursor,
// a fill wipes up from below, and the label rolls to a duplicate line.
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'solid',
  strength = 0.3,
  external = false,
  className = '',
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={handleClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`btn btn--${variant} ${className}`}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <span className="btn__fill" aria-hidden="true" />
      <span className="btn__roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </motion.a>
  );
}
