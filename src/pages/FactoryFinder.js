import React from 'react';
import TypingText, { DelayedVisible } from '../components/TypingText';

export function FactoryFinderUpload({ uploadImages, selectedProductImage, setSelectedProductImage }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 10 }}>
      {uploadImages.map((src, i) => {
        const isSelected = selectedProductImage === i;
        return (
          <div key={i}
            onClick={() => setSelectedProductImage(isSelected ? null : i)}
            style={{ borderRadius: 6, overflow: 'hidden', aspectRatio: '1', cursor: 'pointer', boxSizing: 'border-box',
              border: isSelected ? '2px solid #1fc9ed' : '2px solid #e5e7eb',
              boxShadow: isSelected ? '0 0 0 3px rgba(31,201,237,0.2)' : 'none',
              transition: 'border 0.15s, box-shadow 0.15s',
            }}>
            <img src={src} alt={`product ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        );
      })}
    </div>
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
              {images.map((img, i) => (
                <img key={i} src={img} alt="" style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 6, border: '1px solid #e5e7eb' }} />
              ))}
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
