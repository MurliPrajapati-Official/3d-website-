let instance = null;

export const setLenis = (lenis) => {
  instance = lenis;
};

export const getLenis = () => instance;

export function scrollToId(id) {
  const target = id === 'top' ? 0 : document.getElementById(id);
  if (target === null) return;
  if (instance) {
    instance.scrollTo(target, { duration: 1.6 });
  } else if (target === 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}
