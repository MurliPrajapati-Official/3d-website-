export const FRAME_COUNT = 278;

const base = import.meta.env.BASE_URL;

export const frameSrc = (index, size) =>
  `${base}frames/${size}/f_${String(index + 1).padStart(3, '0')}.webp`;

// Starts loading every frame of the hero sequence. Returns the image array
// immediately (so the canvas can draw whatever has arrived) and a promise
// that settles once every request has finished.
export function preloadFrames(size, onProgress) {
  const images = new Array(FRAME_COUNT);
  let settled = 0;

  const done = new Promise((resolve) => {
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = 'async';
      img.onload = img.onerror = () => {
        settled += 1;
        onProgress(settled / FRAME_COUNT);
        if (settled === FRAME_COUNT) resolve();
      };
      img.src = frameSrc(i, size);
      images[i] = img;
    }
  });

  return { images, done };
}
