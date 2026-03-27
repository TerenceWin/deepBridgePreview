import React from 'react';
import '../styles/theme.css';

const stats = [
  { num: '3×', label: 'Faster Quote Turnaround' },
  { num: '100%', label: 'Audit Trail on Every Action' },
  { num: '0', label: 'Missed Follow-ups' },
  { num: '1', label: 'System for the Full Trade Cycle' },
];

function ProofBar() {
  return (
    <div className="db-proof-bar">
      {stats.map((s, i) => (
        <React.Fragment key={i}>
          <div style={{ flexShrink: 0 }}>
            <div className="db-proof-num">{s.num}</div>
            <div className="db-proof-label">{s.label}</div>
          </div>
          {i < stats.length - 1 && <div className="db-proof-divider" />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default ProofBar;
