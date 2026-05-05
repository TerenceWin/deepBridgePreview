import React from 'react';
import TypingText, { DelayedVisible } from '../components/TypingText';

export function CatalogGeneratorUpload() {
  return (
    <p style={{ margin: '0 0 10px', fontSize: 11, color: '#6b7280', lineHeight: 1.5 }}>
      Upload your brand logo and product images via the input, then describe the catalog layout you need.
    </p>
  );
}

export default function CatalogGeneratorOutput({ output, animate = false }) {
  if (!output || output.length === 0)
    return <span style={{ color: '#6b7280', fontSize: 12 }}>No output available yet.</span>;

  const description = output[0]?.description;
  const products = output[0]?.products ?? [];

  if (description && products.length === 0)
    return <p style={{ margin: 0, fontSize: 12, color: '#374151' }}><TypingText text={description} animate={animate} /></p>;

  let runningDelay = animate ? (description?.length ?? 0) * 5 : 0;
  const productDelays = products.map(product => {
    const d = runningDelay;
    runningDelay += ((product.name?.length ?? 0) + (product.sku?.length ?? 0) + (product.price?.length ?? 0)) * 5;
    return d;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {description && <p style={{ margin: 0, fontSize: 12, color: '#374151' }}><TypingText text={description} animate={animate} delay={0} /></p>}
      {products.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {products.map((product, i) => (
            <DelayedVisible key={i} delay={productDelays[i]} animate={animate} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: 8 }}>
              {product.image && (
                <img src={product.image} alt={product.name} style={{ width: '100%', height: 60, objectFit: 'cover', borderRadius: 4, marginBottom: 6, border: '1px solid #e5e7eb' }} />
              )}
              <p style={{ margin: '0 0 2px', fontWeight: 600, fontSize: 11, color: '#111827' }}>
                <TypingText text={product.name} animate={animate} delay={productDelays[i]} />
              </p>
              {product.sku && (
                <p style={{ margin: '0 0 2px', fontSize: 10, color: '#9ca3af' }}>
                  SKU: <TypingText text={product.sku} animate={animate} delay={productDelays[i]} />
                </p>
              )}
              {product.price && (
                <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: '#049669' }}>
                  <TypingText text={product.price} animate={animate} delay={productDelays[i]} />
                </p>
              )}
            </DelayedVisible>
          ))}
        </div>
      )}
    </div>
  );
}
