import React from 'react';
import '../styles/theme.css';

const points = [
  { title: 'Extracted, not typed',              desc: 'Requirements are pulled directly from buyer emails and documents by the agent. The source email is always one click away.' },
  { title: 'Discrepancies flagged automatically', desc: "If a buyer's spec doesn't match your product database, or a certificate conflicts with factory capability, the system flags it before the quote goes out." },
  { title: 'Version history preserved',         desc: 'Every change to a specification, price, or delivery date is logged with who approved it and when. Complete audit trail from inquiry to shipment.' },
  { title: 'Defensible in disputes',            desc: 'When a customer disputes a specification or shipment detail, you can pull the exact source in seconds — not trawl through 200 emails.' },
];

function EvidenceSection() {
  return (
    <section style={{ background: '#F8F7F3', padding: '88px 48px' }}>
      <div className="db-section-tag">Evidence-First Design</div>
      <h2 style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 400, color: '#0D1F35', marginBottom: '12px' }}>
        Every number has <em style={{ color: '#2A5298' }}>a source.</em>
      </h2>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '15px', color: '#6B7A8A', fontWeight: 300, lineHeight: 1.8, maxWidth: '480px', marginBottom: '52px' }}>
        In trade, a wrong specification or a missed certificate costs real money. Deep Bridge traces every data point back to where it came from.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'start' }}>
        <div className="db-doc">
          <div className="db-doc-header">
            <span className="db-doc-title">Extracted · Quotation Data</span>
            <span className="db-doc-ref">REF: DB-2026-0391</span>
          </div>
          {[['Product','SS Vacuum Flask 500ml'],['Unit Price (CIF SG)','USD 4.85',true],['MOQ','500 pcs'],['Delivery Window','Q2 2026'],['Required Cert','SGS + FDA',true],['Buyer Confirmed','Pending']].map(([k,v,hl],i) => (
            <div key={i} className="db-doc-row">
              <span className="db-doc-key">{k}</span>
              <span className={`db-doc-val${hl?' hl':''}`}>{v}</span>
            </div>
          ))}
          <div className="db-doc-source">↗ Source: Email · prima@distribución.sg · 14 Mar 2026 · 11:32 HKT</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {points.map((p, i) => (
            <div key={i} style={{ paddingLeft: '18px', borderLeft: '2px solid rgba(30,58,95,0.12)' }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#2A5298', marginBottom: '6px' }}>{p.title}</div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: '14px', color: '#6B7A8A', lineHeight: 1.75, fontWeight: 300 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EvidenceSection;
