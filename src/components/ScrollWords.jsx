import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Paragraph whose words light up one by one, scrubbed to scroll position.
export default function ScrollWords({ text, className = '' }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.word',
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.06,
          scrollTrigger: { trigger: ref.current, start: 'top 82%', end: 'bottom 55%', scrub: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(' ').map((word, i) => (
          <span className="word" key={i}>
            {word}{' '}
          </span>
        ))}
      </span>
    </p>
  );
}
