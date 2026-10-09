import { useRef } from 'react';
import { BRAND } from '../data/content';
import { scrollToId } from '../lib/lenis';
import useFitText from '../lib/useFitText';

export default function Footer() {
  const markRef = useRef(null);
  useFitText(markRef);

  return (
    <footer className="footer">
      <div className="footer__fit">
        <span className="footer__mark" ref={markRef} aria-hidden="true">
          Daily Drama
        </span>
      </div>
      <div className="footer__row">
        <span className="label">© {new Date().getFullYear()} Daily Drama</span>
        <span className="label footer__tagline">Multi-roaster coffee · Specialty matcha · All-day dining</span>
        <a className="label link" href={BRAND.instagramHref} target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a
          className="label link"
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToId('top');
          }}
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
