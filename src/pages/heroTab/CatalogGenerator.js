import React, { useState, useRef } from 'react';
import TypingText, { DelayedVisible } from '../../components/TypingText';

export function CatalogGeneratorUpload({ uploadImages = [], selectedImages = [], setSelectedImages }) {
  const toggle = (i) => {
    setSelectedImages(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );
  };
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ margin: '0 0 8px', fontSize: 10, color: '#6b7280', lineHeight: 1.5 }}>
        Select product images to include in the catalog.
      </div>
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
        <div style={{ margin: '6px 0 0', fontSize: 10, color: '#139568', fontWeight: 600 }}>
          {selectedImages.length} image{selectedImages.length > 1 ? 's' : ''} selected
        </div>
      )}
    </div>
  );
}

function ImageCarousel({ products, animate, firstDelay, isMobile }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);

  const total = products.length;

  const prev = () => setIndex(i => (i - 1 + total) % total);
  const next = () => setIndex(i => (i + 1) % total);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) next();
    else if (diff < -40) prev();
    touchStartX.current = null;
  };

  return (
    <DelayedVisible delay={firstDelay} animate={animate} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, color: '#6b7280', fontWeight: 600 }}>{index + 1}/{total}</span>
        {total > 1 && (
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={prev} style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: 4, width: 22, height: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#6b7280' }}>‹</button>
            <button onClick={next} style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: 4, width: 22, height: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#6b7280' }}>›</button>
          </div>
        )}
      </div>
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb', background: '#f3f4f6', padding: 10, userSelect: 'none' }}
      >
        <img src={products[index].image} alt="" style={{ width: '100%', height: isMobile ? 200 : 350, objectFit: 'contain', display: 'block' }} />
      </div>
      {total > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
          {products.map((_, i) => (
            <div key={i} onClick={() => setIndex(i)} style={{ width: 6, height: 6, borderRadius: '50%', background: i === index ? '#374151' : '#d1d5db', cursor: 'pointer', transition: 'background 0.2s' }} />
          ))}
        </div>
      )}
    </DelayedVisible>
  );
}

export default function CatalogGeneratorOutput({ output, animate = false, isMobile = false }) {
  if (!output || output.length === 0)
    return <span style={{ color: '#6b7280', fontSize: 12 }}>No output available yet.</span>;

  const description = output[0]?.description;
  const products = output[0]?.products ?? [];

  if (description && products.length === 0)
    return <div style={{ margin: 0, fontSize: 12, color: '#374151' }}><TypingText text={description} animate={animate} /></div>;

  const descDelay = animate ? (description?.length ?? 0) * 5 : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {description && <div style={{ margin: 0, fontSize: 12, color: '#374151' }}><TypingText text={description} animate={animate} delay={0} /></div>}
      {products.length > 0 && (
        <ImageCarousel products={products} animate={animate} firstDelay={descDelay} isMobile={isMobile} />
      )}
    </div>
  );
}
