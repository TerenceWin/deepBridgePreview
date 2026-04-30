import React from 'react';

export default function FactoryFinderOutput({ output }) {
  if (!output || output.length === 0)
    return <span style={{ color: '#6b7280', fontSize: 12 }}>No output available yet.</span>;

  const summary = typeof output[0] === 'string' ? output[0] : null;
  const suppliers = output.slice(summary ? 1 : 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {summary && <p style={{ margin: 0, fontSize: 12, color: '#374151' }}>{summary}</p>}
      {suppliers.map((s, idx) => {
        const name = s.find?.(x => x.name)?.name;
        const url = s.find?.(x => x.url)?.url;
        const desc = s.find?.(x => x.description)?.description;
        const images = s.find?.(x => x.productImages)?.productImages ?? [];
        return (
          <div key={idx} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: 10 }}>
            <p style={{ margin: '0 0 4px', fontWeight: 600, fontSize: 12, color: '#111827' }}>{name}</p>
            <p style={{ margin: '0 0 6px', fontSize: 11, color: '#6b7280', lineHeight: 1.4 }}>{desc}</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {images.map((img, i) => (
                <img key={i} src={img} alt="" style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 6, border: '1px solid #e5e7eb' }} />
              ))}
            </div>
            {url && (
              <a href={url} target="_blank" rel="noreferrer" style={{ fontSize: 10, color: '#2563eb', wordBreak: 'break-all' }}>{url}</a>
            )}
          </div>
        );
      })}
    </div>
  );
}
