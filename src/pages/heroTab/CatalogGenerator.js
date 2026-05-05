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
                border: isSelected ? '2px solid #1fc9ed' : '2px solid #e5e7eb',
                boxShadow: isSelected ? '0 0 0 3px rgba(31,201,237,0.2)' : 'none',
                transition: 'border 0.15s, box-shadow 0.15s', position: 'relative',
              }}>
              <img src={src} alt={`product ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {isSelected && (
                <div style={{ position: 'absolute', top: 4, right: 4, width: 16, height: 16, borderRadius: '50%', background: '#1fc9ed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-check" style={{ fontSize: 8, color: 'white' }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {selectedImages.length > 0 && (
        <p style={{ margin: '6px 0 0', fontSize: 10, color: '#1fc9ed', fontWeight: 600 }}>
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

  const productDelays = products.map((_, i) => animate ? (description?.length ?? 0) * 5 + i * 300 : 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {description && <p style={{ margin: 0, fontSize: 12, color: '#374151' }}><TypingText text={description} animate={animate} delay={0} /></p>}
      {products.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {products.map((product, i) => (
            <DelayedVisible key={i} delay={productDelays[i]} animate={animate} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
              {product.image && (
                <img src={product.image} alt="" style={{ width: '100%', height: 700, objectFit: 'cover', display: 'block' }} />
              )}
            </DelayedVisible>
          ))}
        </div>
      )}
    </div>
  );
}
