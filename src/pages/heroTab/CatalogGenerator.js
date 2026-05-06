import React from 'react';
import TypingText, { DelayedVisible } from '../../components/TypingText';

export function CatalogGeneratorUpload({ uploadImages = [], selectedImages = [], setSelectedImages }) {
  const toggle = (i) => {
    setSelectedImages(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );
  };
  return (
    <div style={{ marginBottom: 10 }}>
      <p style={{ margin: '0 0 8px', fontSize: 10, color: '#6b7280', lineHeight: 1.5 }}>
        Select product images to include in the catalog.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
        {uploadImages.map((src, i) => {
          const isSelected = selectedImages.includes(i);
          return (
            <div key={i}
              onClick={() => toggle(i)}
              style={{
                borderRadius: 6, overflow: 'hidden', aspectRatio: '1', cursor: 'pointer', boxSizing: 'border-box',
                border: isSelected ? '2px solid #139568' : '2px solid #e5e7eb',
                boxShadow: isSelected ? '0 0 0 3px rgba(19,149,104,0.2)' : 'none',
                transition: 'border 0.15s, box-shadow 0.15s', position: 'relative',
              }}>
              <img src={src} alt={`product ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {isSelected && (
                <div style={{ position: 'absolute', top: 4, right: 4, width: 16, height: 16, borderRadius: '50%', background: '#139568', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-check" style={{ fontSize: 8, color: 'white' }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {selectedImages.length > 0 && (
        <p style={{ margin: '6px 0 0', fontSize: 10, color: '#139568', fontWeight: 600 }}>
          {selectedImages.length} image{selectedImages.length > 1 ? 's' : ''} selected
        </p>
      )}
    </div>
  );
}

export default function CatalogGeneratorOutput({ output, animate = false }) {
  if (!output || output.length === 0)
    return <span style={{ color: '#6b7280', fontSize: 12 }}>No output available yet.</span>;

  const description = output[0]?.description;
  const products = output[0]?.products ?? [];

  if (description && products.length === 0)
    return <p style={{ margin: 0, fontSize: 12, color: '#374151' }}><TypingText text={description} animate={animate} /></p>;

  const descDelay = animate ? (description?.length ?? 0) * 5 : 0;
  const fullItems  = products.filter(p => p.layout === 'full');
  const gridItems  = products.filter(p => p.layout !== 'full');

  let runningDelay = descDelay;
  const fullDelays = fullItems.map(() => { const d = runningDelay; runningDelay += 300; return d; });
  const gridDelays = gridItems.map(() => { const d = runningDelay; runningDelay += 300; return d; });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {description && <p style={{ margin: 0, fontSize: 12, color: '#374151' }}><TypingText text={description} animate={animate} delay={0} /></p>}
      {fullItems.map((product, i) => (
        <DelayedVisible key={`full-${i}`} delay={fullDelays[i]} animate={animate} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb', background: '#f3f4f6', padding: '10px'}}>
          <img src={product.image} alt="" style={{ width: '100%', height: 350, objectFit: 'contain', display: 'block' }} />
        </DelayedVisible>
      ))}
      {gridItems.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {gridItems.map((product, i) => (
            <DelayedVisible key={`grid-${i}`} delay={gridDelays[i]} animate={animate} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
              <img src={product.image} alt="" style={{ width: '100%', height: 350, objectFit: 'cover', display: 'block' }} />
            </DelayedVisible>
          ))}
        </div>
      )}
    </div>
  );
}
