import React from 'react';

export default function CatalogGeneratorOutput({ output }) {
  if (!output || output.length === 0)
    return <span style={{ color: '#6b7280', fontSize: 12 }}>No output available yet.</span>;

  const description = output[0]?.description;
  const products = output[0]?.products ?? [];

  if (description && products.length === 0)
    return <p style={{ margin: 0, fontSize: 12, color: '#374151' }}>{description}</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {description && <p style={{ margin: 0, fontSize: 12, color: '#374151' }}>{description}</p>}
      {products.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {products.map((product, i) => (
            <div key={i} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: 8 }}>
              {product.image && (
                <img src={product.image} alt={product.name} style={{ width: '100%', height: 60, objectFit: 'cover', borderRadius: 4, marginBottom: 6, border: '1px solid #e5e7eb' }} />
              )}
              <p style={{ margin: '0 0 2px', fontWeight: 600, fontSize: 11, color: '#111827' }}>{product.name}</p>
              {product.sku && <p style={{ margin: '0 0 2px', fontSize: 10, color: '#9ca3af' }}>SKU: {product.sku}</p>}
              {product.price && <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: '#049669' }}>{product.price}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
