import { ROOM_COPY, STATS } from '../data/content';
import RevealLines, { FadeUp } from '../components/RevealLines';
import Counter from '../components/Counter';

export default function Room() {
  return (
    <section id="room" className="section room">
      <header className="sec-head">
        <span className="label">(05)</span>
        <span className="label">The Room</span>
      </header>

      <div className="room__grid">
        <RevealLines className="h-1" lines={['Two floors', 'of slow', 'mornings.']} />
        <FadeUp className="room__copy" delay={0.2}>
          <p className="lead">{ROOM_COPY}</p>
        </FadeUp>
      </div>

      <dl className="stats">
        {STATS.map((s, i) => (
          <FadeUp className="stat" key={s.label} delay={i * 0.08}>
            <dt className="label">{s.label}</dt>
            <dd className="stat__value">
              <Counter value={s.value} decimals={s.decimals} prefix={s.prefix} />
            </dd>
          </FadeUp>
        ))}
      </dl>
    </section>
  );
}
