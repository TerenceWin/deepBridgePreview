import React from 'react';
import TypingText, { DelayedVisible } from '../../components/TypingText';

export function FactoryFinderUpload() {
  return (
    <p style={{ margin: '0 0 10px', fontSize: 11, color: '#6b7280', lineHeight: 1.5 }}>
      No file required — describe the product you're sourcing and our AI will find matching factories and suppliers for you.
    </p>
  );
}

export default function FactoryFinderOutput({ output, animate = false }) {
  if (!output || output.length === 0)
    return <span style={{ color: '#6b7280', fontSize: 12 }}>No output available yet.</span>;

  const summary = typeof output[0] === 'string' ? output[0] : null;
  const suppliers = output.slice(summary ? 1 : 0);

  // Build per-card delays so each card starts only after the previous one finishes
  const parsed = suppliers.map(s => ({
    name: s.find?.(x => x.name)?.name ?? '',
    url:  s.find?.(x => x.url)?.url   ?? '',
    desc: s.find?.(x => x.description)?.description ?? '',
    images: s.find?.(x => x.productImages)?.productImages ?? [],
  }));

  let runningDelay = animate ? (summary?.length ?? 0) * 5 : 0;
  const cardDelays = parsed.map(({ name, url, desc }) => {
    const d = runningDelay;
    runningDelay += (name.length + desc.length + url.length) * 5;
    return d;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {summary && <p style={{ margin: 0, fontSize: 12, color: '#374151' }}><TypingText text={summary} animate={animate} delay={0} /></p>}
      {parsed.map(({ name, url, desc, images }, idx) => {
        const d = cardDelays[idx];
        return (
          <DelayedVisible key={idx} delay={d} animate={animate} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: 10 }}>
            <p style={{ margin: '0 0 4px', fontWeight: 600, fontSize: 12, color: '#111827' }}>
              <TypingText text={name} animate={animate} delay={d} />
            </p>
            <p style={{ margin: '0 0 6px', fontSize: 11, color: '#6b7280', lineHeight: 1.4 }}>
              <TypingText text={desc} animate={animate} delay={d} />
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {images.map((img, i) => {
                const imgDelay = d + (name.length + desc.length + url.length) * 5 + i * 100;
                return (
                  <DelayedVisible key={i} delay={imgDelay} animate={animate} style={{ borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
                    <img src={img} alt="" style={{ width: 104, height: 104, objectFit: 'cover', display: 'block' }} />
                  </DelayedVisible>
                );
              })}
            </div>
            {url && (
              <a href={url} target="_blank" rel="noreferrer" style={{ fontSize: 10, color: '#2563eb', wordBreak: 'break-all' }}>
                <TypingText text={url} animate={animate} delay={d} />
              </a>
            )}
          </DelayedVisible>
        );
      })}
    </div>
  );
}
