import React from 'react';
import '../styles/theme.css';

const features = [
  { tag: 'Extract · Verify · Log',       title: 'AI Document Processing',      desc: 'Reads inbound emails, extracts requirements, cross-references product databases, and flags discrepancies — before a human touches it.' },
  { tag: 'Automate · Approve · Audit',   title: 'Agentic Deal Workflows',      desc: 'Automated pipelines that follow up, remind, escalate, and route — with human approval gates at every critical decision point.' },
  { tag: 'Analyse · Improve · Predict',  title: 'Trade Intelligence',          desc: 'Observes deal patterns across the pipeline. Identifies where cycles stall, which customers convert, and which product categories lose margin.' },
  { tag: 'Source · Trace · Defend',      title: 'Evidence-First Audit Trail',  desc: 'Every extracted data point, decision, and approval links back to its source — email, document, website, or upload. Nothing without provenance.' },
  { tag: 'HKD · USD · RMB · SGD',        title: 'Multi-Market Execution',      desc: 'Handles multi-currency, multi-language, and multi-brand operations from a single system. Built for HK, SEA, and China-origin trade flows.' },
  { tag: 'Generate · Version · Link',    title: 'Quotation & Order Engine',    desc: 'Generates structured quotations from extracted requirements, tracks versions, and links to the final order so spec changes are never lost.' },
];

function Features() {
  return (
    <section style={{ background: '#F8F7F3', padding: '88px 48px' }}>
      <div className="db-section-tag">Core Capabilities</div>
      <h2 style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 400, color: '#0D1F35', marginBottom: '12px' }}>
        Built for the <em style={{ color: '#2A5298' }}>full trade cycle.</em>
      </h2>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '15px', color: '#6B7A8A', fontWeight: 300, lineHeight: 1.8, maxWidth: '480px', marginBottom: '48px' }}>
        Every stage of the deal — from first inquiry to final shipment — tracked, structured, and auditable in one system.
      </p>
      <div className="db-feature-grid">
        {features.map((f, i) => (
          <div key={i} className="db-feature-card">
            <div className="db-feature-title">{f.title}</div>
            <div className="db-feature-desc">{f.desc}</div>
            <div className="db-feature-tag">{f.tag}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
