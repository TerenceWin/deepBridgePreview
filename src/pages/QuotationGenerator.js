import React from 'react';

export default function QuotationGeneratorOutput({ output }) {
  if (!output || output.length === 0)
    return <span style={{ color: '#6b7280', fontSize: 12 }}>No output available yet.</span>;

  const description = output[0]?.description;
  const lineItems = output[0]?.lineItems ?? [];
  const total = output[0]?.total;

  if (description && lineItems.length === 0)
    return <p style={{ margin: 0, fontSize: 12, color: '#374151' }}>{description}</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {description && <p style={{ margin: 0, fontSize: 12, color: '#374151' }}>{description}</p>}
      {lineItems.length > 0 && (
        <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', padding: '6px 10px', background: '#f3f4f6', borderBottom: '1px solid #e5e7eb', fontSize: 11, fontWeight: 600, color: '#6b7280', gap: 12 }}>
            <span>Item</span><span>Qty</span><span>Price</span>
          </div>
          {lineItems.map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', padding: '6px 10px', fontSize: 11, color: '#374151', borderBottom: i < lineItems.length - 1 ? '1px solid #f3f4f6' : 'none', gap: 12 }}>
              <span>{item.name}</span>
              <span>{item.qty}</span>
              <span>{item.price}</span>
            </div>
          ))}
          {total && (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', borderTop: '1px solid #e5e7eb', fontSize: 12, fontWeight: 600, color: '#111827' }}>
              <span>Total</span><span>{total}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
