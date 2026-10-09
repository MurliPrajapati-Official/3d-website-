import { BRAND } from '../data/content';
import RevealLines, { FadeUp } from '../components/RevealLines';
import MagneticButton from '../components/MagneticButton';

export default function Visit() {
  return (
    <section id="visit" className="section visit">
      <header className="sec-head">
        <span className="label">(06)</span>
        <span className="label">Visit</span>
      </header>

      <RevealLines className="h-display visit__title" lines={['Come for coffee.', 'Stay for', 'the drama.']} />

      <div className="visit__grid">
        <FadeUp className="visit__ctas">
          <MagneticButton href={BRAND.phoneHref}>Call to reserve</MagneticButton>
          <MagneticButton href={BRAND.mapsHref} variant="ghost" external>
            Get directions
          </MagneticButton>
        </FadeUp>

        <dl className="visit__info">
          <FadeUp className="info" delay={0.05}>
            <dt className="label">Find us</dt>
            <dd>
              {BRAND.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </dd>
          </FadeUp>
          <FadeUp className="info" delay={0.1}>
            <dt className="label">Hours</dt>
            <dd>
              <span>{BRAND.hours}</span>
              <span>Breakfast to dinner</span>
            </dd>
          </FadeUp>
          <FadeUp className="info" delay={0.15}>
            <dt className="label">Reservations</dt>
            <dd>
              <a className="link" href={BRAND.phoneHref}>
                {BRAND.phone}
              </a>
            </dd>
          </FadeUp>
          <FadeUp className="info" delay={0.2}>
            <dt className="label">Follow</dt>
            <dd>
              <a className="link" href={BRAND.instagramHref} target="_blank" rel="noreferrer">
                {BRAND.instagram}
              </a>
            </dd>
          </FadeUp>
        </dl>
      </div>
    </section>
  );
}
