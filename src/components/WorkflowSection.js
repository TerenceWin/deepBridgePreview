import React from 'react';
import '../styles/theme.css';

const steps = [
  { state: 'done',    label: 'Email parsed & requirements extracted',    badge: 'Done',    badgeClass: 'db-badge-blue',  desc: 'Agent read inbound inquiry. Extracted: 3 SKUs, MOQ 500 units, delivery window Q2, CIF Singapore. Source: email thread 14 Mar 2026.' },
  { state: 'done',    label: 'Quotation generated & sent',               badge: 'Done',    badgeClass: 'db-badge-blue',  desc: 'Draft generated from product database. Reviewed and approved by Sarah K. Sent 15 Mar 09:41 HKT. PDF attached to deal record.' },
  { state: 'active',  label: 'Follow-up scheduled',                      badge: 'Running', badgeClass: 'db-badge-green', desc: 'Auto follow-up queued for 19 Mar if no response. Draft ready for review. Agent flagged buyer as high-intent based on 2 prior orders.' },
  { state: 'pending', label: 'Sample request & QC document collection',  badge: 'Pending', badgeClass: 'db-badge-slate', desc: 'Pending buyer confirmation. Will trigger factory document checklist automatically.' },
  { state: 'pending', label: 'Order confirmation & execution handoff',    badge: 'Pending', badgeClass: 'db-badge-slate', desc: 'Structured handoff to ops with full deal context, spec history, and approval log.' },
];

const icon = { done: '✓', active: '→', pending: '◦' };

function WorkflowSection() {
  return (
    <section style={{ background: '#EFF0F2', padding: '88px 48px', borderTop: '1px solid rgba(30,58,95,0.08)', borderBottom: '1px solid rgba(30,58,95,0.08)' }}>
      <div className="db-section-tag">Agentic Workflows</div>
      <h2 style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 400, color: '#0D1F35', marginBottom: '12px' }}>
        The system works. <em style={{ color: '#2A5298' }}>You stay in control.</em>
      </h2>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '15px', color: '#6B7A8A', fontWeight: 300, lineHeight: 1.8, maxWidth: '480px', marginBottom: '44px' }}>
        Deep Bridge agents read, extract, generate, and follow up — with humans approving at every critical step. Full audit trail. Nothing moves without a record.
      </p>
      <div className="db-workflow-card">
        <div className="db-workflow-header">
          <div className="db-wf-dot active" /><div className="db-wf-dot" /><div className="db-wf-dot" />
          <span className="db-wf-title">DEAL · DB-2026-0391 · BUYER: PRIMA DISTRIBUCIÓN SG</span>
        </div>
        {steps.map((s, i) => (
          <div key={i} className="db-wf-step">
            <div className={`db-wf-icon ${s.state}`}>{icon[s.state]}</div>
            <div style={{ flex: 1 }}>
              <div className={`db-wf-label ${s.state}`}>{s.label}</div>
              <div className="db-wf-desc" style={{ opacity: s.state === 'pending' ? 0.55 : 1 }}>{s.desc}</div>
            </div>
            <span className={`db-badge ${s.badgeClass}`}>{s.badge}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WorkflowSection;
