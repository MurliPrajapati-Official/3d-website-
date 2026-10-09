import { useLayoutEffect } from 'react';

// Sizes an element's font so its widest line fills its parent exactly.
// The element must be `width: max-content; white-space: nowrap`.
export default function useFitText(ref) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const fit = () => {
      const width = el.parentElement.clientWidth;
      el.style.fontSize = '100px';
      const natural = el.scrollWidth;
      if (natural) el.style.fontSize = `${(100 * width) / natural}px`;
    };

    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(el.parentElement);
    return () => ro.disconnect();
  }, [ref]);
}
