import React, { useState, useEffect, useRef } from 'react';
import HandleFilesOutput from '../heroTab/HandleFiles.js';
import TypingText, { DelayedVisible } from '../../components/TypingText';
import { DemoChatShell, DemoChatInputBar } from '../../components/DemoChat.js';

function DelayedRow({ delay, animate, style, children }) {
  const [visible, setVisible] = useState(!animate);
  useEffect(() => {
    if (!animate) { setVisible(true); return; }
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [animate, delay]);
  return <tr style={{ ...style, opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease' }}>{children}</tr>;
}

// ─── Stage data ───────────────────────────────────────────────────────────────

const STAGES = [
  {
    input: "Supplier: Guangdong Metalworks Co. — review their quotation package for #12345",
    output: [{
      type: 'riskFlags',
      summary: { critical: 2, warning: 1, clear: 2 },
      flags: [
        {
          severity: 'critical',
          category: 'CERTIFICATE',
          title: 'CE certificate expired',
          description: 'Provided CE cert expired Mar 2024. EU buyer orders will be blocked at customs without a valid certificate.',
          action: 'Ask supplier to resubmit',
        },
        {
          severity: 'critical',
          category: 'DOCUMENTATION',
          title: 'No test report attached',
          description: 'Quotation references ASTM F963 compliance but no third-party test report was included in the package.',
          action: 'Request test report',
        },
        {
          severity: 'warning',
          category: 'COMPLIANCE',
          title: 'MOQ inconsistency',
          description: 'Email states MOQ 300 units but quotation PDF shows 500 units. Confirm before sharing with buyer.',
          action: 'Clarify with supplier',
        },
      ],
    }],
  },
  {
    input: "Review the shipping documents for order #12345",
    // handled with two bubbles — invoice + explanation
  },
  {
    input: "Run EU packaging compliance checks for order #12345",
    // handled with one bubble — packaging card only
  },
  {
    input: "Summarise the packaging issues to resolve before production is confirmed",
    // handled with one bubble — packaging errors summary
  },
];

// ─── Shipping Invoice Component ───────────────────────────────────────────────

const ERR = {
  consignee: { background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: 4 },
  blDate:    { background: '#fffbeb', border: '1.5px solid #fcd34d', borderRadius: 4 },
  packing:   { background: '#fff7ed', border: '1.5px solid #fdba74', borderRadius: 4 },
};

const cell  = { border: '1px solid #d1d5db', padding: '4px 8px', fontSize: 10, color: '#374151' };
const hCell = { ...cell, background: '#f3f4f6', fontWeight: 700, fontSize: 9, letterSpacing: '0.3px', color: '#111827' };

function ShippingInvoiceCard({ animate }) {
  const D = (i) => animate ? i * 150 : 0;
  return (
    <div style={{ border: '1px solid #d1d5db', borderRadius: 10, overflow: 'hidden', background: 'white', fontSize: 10 }}>

      {/* Header bar */}
      <div style={{ background: '#1a2e44', padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 700, fontSize: 12, color: 'white', letterSpacing: '0.3px' }}>SHIPPING INVOICE</span>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>Order #12345</span>
      </div>

      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* Company + Invoice meta */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <DelayedVisible delay={D(0)} animate={animate} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontWeight: 700, fontSize: 11, color: '#111827' }}><TypingText text="Deep Bridge Sourcing Ltd." animate={animate} delay={D(0)} speed={5} /></span>
            <span style={{ color: '#6b7280' }}><TypingText text="Unit 12, Harbour View Centre" animate={animate} delay={D(0)} speed={5} /></span>
            <span style={{ color: '#6b7280' }}><TypingText text="Hong Kong SAR" animate={animate} delay={D(0)} speed={5} /></span>
            <span style={{ color: '#6b7280' }}><TypingText text="+852 3900 1122" animate={animate} delay={D(0)} speed={5} /></span>
            <span style={{ color: '#6b7280' }}><TypingText text="sourcing@deepbridge.com" animate={animate} delay={D(0)} speed={5} /></span>
          </DelayedVisible>
          <DelayedVisible delay={D(1)} animate={animate} style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', gap: 8 }}><span style={{ fontWeight: 700, color: '#111827' }}>DATE</span><span><TypingText text="01/03/2025" animate={animate} delay={D(1)} speed={5} /></span></div>
            <div style={{ display: 'flex', gap: 8 }}><span style={{ fontWeight: 700, color: '#111827' }}>INVOICE NO.</span><span><TypingText text="INV-2025-0312" animate={animate} delay={D(1)} speed={5} /></span></div>
            <div style={{ display: 'flex', gap: 8 }}><span style={{ fontWeight: 700, color: '#111827' }}>CUSTOMER NO.</span><span><TypingText text="C-0892" animate={animate} delay={D(1)} speed={5} /></span></div>
          </DelayedVisible>
        </div>

        {/* Bill To / Ship To */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <DelayedVisible delay={D(2)} animate={animate} style={{ border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 10px' }}>
            <div style={{ fontWeight: 700, fontSize: 9, color: '#6b7280', marginBottom: 5, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Bill To</div>
            <div style={{ color: '#374151', lineHeight: 1.6 }}>
              <div><TypingText text="Marcus Lin / Sourcing" animate={animate} delay={D(2)} speed={5} /></div>
              <div><TypingText text="Deep Bridge Sourcing Ltd." animate={animate} delay={D(2)} speed={5} /></div>
              <div><TypingText text="Unit 12, Harbour View Centre" animate={animate} delay={D(2)} speed={5} /></div>
              <div><TypingText text="Hong Kong SAR" animate={animate} delay={D(2)} speed={5} /></div>
              <div><TypingText text="+852 3900 1122" animate={animate} delay={D(2)} speed={5} /></div>
            </div>
          </DelayedVisible>
          {/* ERROR 1 — wrong consignee */}
          <DelayedVisible delay={D(3)} animate={animate} style={{ border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 10px', position: 'relative' }}>
            <div style={{ fontWeight: 700, fontSize: 9, color: '#6b7280', marginBottom: 5, letterSpacing: '0.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 5 }}>
              Ship To
              <span style={{ background: '#fef2f2', color: '#e02f3e', fontSize: 8, fontWeight: 700, padding: '1px 5px', borderRadius: 3, border: '1px solid #fca5a5' }}>ERROR</span>
            </div>
            <div style={{ ...ERR.consignee, padding: '4px 6px', lineHeight: 1.6 }}>
              <div style={{ color: '#e02f3e', fontWeight: 700 }}><TypingText text="CleanHome GmbH" animate={animate} delay={D(3)} speed={5} /></div>
              <div style={{ color: '#374151' }}><TypingText text="Industriestraße 45" animate={animate} delay={D(3)} speed={5} /></div>
              <div style={{ color: '#374151' }}><TypingText text="80339 München, Germany" animate={animate} delay={D(3)} speed={5} /></div>
              <div style={{ color: '#374151' }}><TypingText text="+49 89 4521 8800" animate={animate} delay={D(3)} speed={5} /></div>
            </div>
          </DelayedVisible>
        </div>

        {/* Shipping meta table */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={hCell}>P.O. NO.</th>
              <th style={hCell}>SALES PERSON</th>
              <th style={hCell}>SHIP VIA</th>
              <th style={hCell}>SHIPPING DATE</th>
            </tr>
          </thead>
          <tbody>
            <DelayedRow delay={D(4)} animate={animate}>
              <td style={cell}><TypingText text="PO-NCA-2025-089" animate={animate} delay={D(4)} speed={5} /></td>
              <td style={cell}><TypingText text="Marcus Lin" animate={animate} delay={D(4)} speed={5} /></td>
              <td style={cell}><TypingText text="Sea Freight (FOB Ningbo)" animate={animate} delay={D(4)} speed={5} /></td>
              <td style={cell}><TypingText text="01/03/2025" animate={animate} delay={D(4)} speed={5} /></td>
            </DelayedRow>
          </tbody>
          <thead>
            <tr>
              <th style={hCell}>SHIPPING METHOD</th>
              <th style={hCell}>PACKING LIST</th>
              <th style={hCell}>PAYMENT TERMS</th>
              <th style={hCell}>BL DATE</th>
            </tr>
          </thead>
          <tbody>
            <DelayedRow delay={D(5)} animate={animate}>
              <td style={cell}><TypingText text="FCL — 40HQ" animate={animate} delay={D(5)} speed={5} /></td>
              {/* ERROR 3 — missing packing list */}
              <td style={{ ...cell, ...ERR.packing }}>
                <span style={{ color: '#c2410c', fontWeight: 700 }}><TypingText text="NOT ATTACHED" animate={animate} delay={D(5)} speed={5} /></span>
                <span style={{ marginLeft: 4, fontSize: 8, color: '#c2410c' }}>⚠</span>
              </td>
              <td style={cell}><TypingText text="30% Deposit, Balance B/L" animate={animate} delay={D(5)} speed={5} /></td>
              {/* ERROR 2 — BL date mismatch */}
              <td style={{ ...cell, ...ERR.blDate }}>
                <span style={{ color: '#b45309', fontWeight: 700 }}><TypingText text="15/02/2025" animate={animate} delay={D(5)} speed={5} /></span>
                <span style={{ marginLeft: 4, fontSize: 8, color: '#b45309' }}>⚠</span>
              </td>
            </DelayedRow>
          </tbody>
        </table>

        {/* Line items */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={hCell}>ITEM NO.</th>
              <th style={{ ...hCell, width: '40%' }}>DESCRIPTION</th>
              <th style={hCell}>QTY</th>
              <th style={hCell}>UNIT PRICE</th>
              <th style={hCell}>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: '#12345', desc: 'BLDC ResQVac w/ Safety Hammer & Blade', qty: '3,000', price: '$9.80', total: '$29,400.00' },
              { id: 'PKG-001',  desc: 'Export Carton (20 units/carton × 150)',  qty: '150',   price: '$2.10', total: '$315.00'    },
            ].map((r, i) => (
              <DelayedRow key={i} delay={D(6 + i)} animate={animate} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={cell}><TypingText text={r.id} animate={animate} delay={D(6 + i)} speed={5} /></td>
                <td style={cell}><TypingText text={r.desc} animate={animate} delay={D(6 + i)} speed={5} /></td>
                <td style={cell}><TypingText text={r.qty} animate={animate} delay={D(6 + i)} speed={5} /></td>
                <td style={cell}><TypingText text={r.price} animate={animate} delay={D(6 + i)} speed={5} /></td>
                <td style={cell}><TypingText text={r.total} animate={animate} delay={D(6 + i)} speed={5} /></td>
              </DelayedRow>
            ))}
            {[...Array(3)].map((_, i) => (
              <tr key={`empty-${i}`} style={{ borderBottom: '1px solid #f3f4f6' }}>
                {[...Array(5)].map((__, j) => <td key={j} style={{ ...cell, color: '#d1d5db' }}>—</td>)}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <DelayedVisible delay={D(8)} animate={animate} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: 220, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {[
              { label: 'SUBTOTAL',          value: '$29,715.00' },
              { label: 'SHIPPING/HANDLING', value: '$1,200.00'  },
              { label: 'OTHER',             value: '$0.00'      },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#374151', padding: '2px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ fontWeight: 600 }}>{r.label}</span>
                <span><TypingText text={r.value} animate={animate} delay={D(8)} speed={5} /></span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, color: '#111827', padding: '4px 0', borderTop: '2px solid #1a2e44', marginTop: 2 }}>
              <span>TOTAL</span>
              <span><TypingText text="$30,915.00" animate={animate} delay={D(8)} speed={5} /></span>
            </div>
          </div>
        </DelayedVisible>

        {/* Legend */}
        <DelayedVisible delay={D(9)} animate={animate} style={{ display: 'flex', gap: 12, paddingTop: 6, borderTop: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: '#fef2f2', border: '1px solid #fca5a5' }} />
            <span style={{ fontSize: 9, color: '#6b7280' }}>Wrong consignee</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: '#fffbeb', border: '1px solid #fcd34d' }} />
            <span style={{ fontSize: 9, color: '#6b7280' }}>BL date mismatch</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: '#fff7ed', border: '1px solid #fdba74' }} />
            <span style={{ fontSize: 9, color: '#6b7280' }}>Missing packing list</span>
          </div>
        </DelayedVisible>

      </div>
    </div>
  );
}

// ─── Error explanation output ─────────────────────────────────────────────────

const ERRORS = [
  {
    severity: 'critical',
    label: 'Wrong Consignee Name',
    description: 'Ship To shows "CleanHome GmbH" but PO-NCA-2025-089 is issued to "Nordic Clean AB". Courier and customs will reject or misdirect the shipment.',
    color: '#e02f3e', icon: 'fas fa-exclamation-circle',
  },
  {
    severity: 'critical',
    label: 'BL Date Precedes Shipping Date',
    description: 'Bill of Lading is dated 15/02/2025 — 14 days before vessel departure on 01/03/2025. A pre-dated BL is flagged as fraudulent by customs and the buyer\'s bank under LC terms.',
    color: '#d97706', icon: 'fas fa-exclamation-triangle',
  },
  {
    severity: 'warning',
    label: 'Missing Packing List',
    description: 'No packing list is attached to the document set. Required for customs clearance in Germany and most EU ports — shipment will be held pending inspection.',
    color: '#c2410c', icon: 'fas fa-minus-circle',
  },
];

function ShippingErrorsOutput({ animate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{ margin: '0 0 4px', fontSize: 12, color: '#374151' }}>
        <TypingText text="3 issues found in the shipping documents for #12345. These must be resolved before the shipment proceeds:" animate={animate} delay={0} />
      </p>
      {ERRORS.map((e, i) => {
        const delay = animate ? 80 * i + 200 : 0;
        return (
          <DelayedVisible key={i} delay={delay} animate={animate} style={{ borderRadius: 6, background: 'white', borderTop: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', borderLeft: `3px solid ${e.color}`, padding: '8px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
              <i className={e.icon} style={{ fontSize: 10, color: e.color }} />
              <span style={{ fontSize: 9, fontWeight: 700, color: e.color, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{e.severity}</span>
            </div>
            <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, color: '#111827' }}>
              <TypingText text={e.label} animate={animate} delay={delay} />
            </p>
            <p style={{ margin: '0 0 8px', fontSize: 11, color: '#6b7280', lineHeight: 1.4 }}>
              <TypingText text={e.description} animate={animate} delay={delay} />
            </p>
            <span style={{ fontSize: 10, color: '#2563eb', cursor: 'pointer' }}>
              <TypingText text="View Shipping Document ↗" animate={animate} delay={delay} />
            </span>
          </DelayedVisible>
        );
      })}
    </div>
  );
}

// ─── Packaging Compliance + Spec Conflict Card ───────────────────────────────

const PKG_MATERIALS = [
  { material: 'Corrugated Cardboard', component: 'Export Carton',  perUnit: '450g',  total: '1,350kg', limit: 'No limit', status: 'clear' },
  { material: 'Coated Paperboard',    component: 'Colour Box',     perUnit: '120g',  total: '360kg',   limit: 'No limit', status: 'clear' },
  { material: 'PVC Shrink Wrap',      component: 'Unit Wrap',      perUnit: '8.2g',  total: '24.6kg',  limit: '5g / unit', status: 'error' },
];

const PKG_SPECS = [
  { spec: 'Packaging Type',  po: 'Full-colour retail box with foam insert', supplier: 'Plain brown export carton',     match: false },
  { spec: 'Box Material',    po: '350gsm coated art board',                 supplier: '150gsm corrugated kraft',       match: false },
  { spec: 'Insert',          po: 'Custom foam with product cutout',         supplier: 'None',                          match: false },
  { spec: 'Outer Wrap',      po: 'Biodegradable film',                      supplier: 'PVC shrink wrap',               match: false },
  { spec: 'Tier',            po: 'Premium retail',                          supplier: 'Standard export',               match: false },
];

function PackagingCard({ animate }) {
  const th = { padding: '5px 8px', fontSize: 9, fontWeight: 700, color: '#6b7280', background: '#f3f4f6', borderBottom: '1px solid #e5e7eb', letterSpacing: '0.3px' };
  const td = { padding: '5px 8px', fontSize: 10, color: '#374151', borderBottom: '1px solid #f3f4f6' };
  const D = (i) => animate ? i * 150 : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

      {/* Section 1 — Plastic compliance */}
      <div style={{ border: '1px solid #d1d5db', borderRadius: 8, overflow: 'hidden', background: 'white' }}>
        <div style={{ background: '#1a2e44', padding: '6px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: 11, color: 'white' }}>Packaging Material Breakdown</span>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)' }}>EU SUP Directive check — Order #12345</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Material', 'Component', 'Per Unit', 'Total (3,000 units)', 'EU Limit', 'Status'].map(h => (
                <th key={h} style={th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PKG_MATERIALS.map((r, i) => (
              <DelayedRow key={i} delay={D(i)} animate={animate} style={{ background: r.status === 'error' ? '#fff7ed' : 'white' }}>
                <td style={{ ...td, fontWeight: r.status === 'error' ? 700 : 400, color: r.status === 'error' ? '#c2410c' : '#374151' }}>
                  <TypingText text={r.material} animate={animate} delay={D(i)} speed={5} />
                </td>
                <td style={td}><TypingText text={r.component} animate={animate} delay={D(i)} speed={5} /></td>
                <td style={{ ...td, fontWeight: r.status === 'error' ? 700 : 400, color: r.status === 'error' ? '#c2410c' : '#374151' }}>
                  <TypingText text={r.perUnit} animate={animate} delay={D(i)} speed={5} />
                </td>
                <td style={td}><TypingText text={r.total} animate={animate} delay={D(i)} speed={5} /></td>
                <td style={{ ...td, color: r.status === 'error' ? '#c2410c' : '#6b7280' }}>
                  <TypingText text={r.limit} animate={animate} delay={D(i)} speed={5} />
                </td>
                <td style={td}>
                  {r.status === 'clear'
                    ? <span style={{ fontSize: 9, fontWeight: 700, color: '#049669', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 3, padding: '2px 6px' }}>✓ Clear</span>
                    : <span style={{ fontSize: 9, fontWeight: 700, color: '#c2410c', background: '#fff7ed', border: '1px solid #fdba74', borderRadius: 3, padding: '2px 6px' }}>⚠ Exceeds</span>
                  }
                </td>
              </DelayedRow>
            ))}
          </tbody>
        </table>
        <DelayedVisible delay={D(3)} animate={animate} style={{ padding: '6px 12px', background: '#fff7ed', borderTop: '1px solid #fdba74', fontSize: 9, color: '#c2410c', fontWeight: 600 }}>
          ⚠ PVC shrink wrap exceeds EU SUP Directive limit by 3.2g per unit — 9,600g excess across full order. Shipment to Germany will be held at customs.
        </DelayedVisible>
      </div>

      {/* Section 2 — Spec conflict */}
      <div style={{ border: '1px solid #d1d5db', borderRadius: 8, overflow: 'hidden', background: 'white' }}>
        <div style={{ background: '#1a2e44', padding: '6px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: 11, color: 'white' }}>Packaging Specification Comparison</span>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)' }}>PO-NCA-2025-089 vs Supplier Quote</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Specification</th>
              <th style={{ ...th, color: '#1d4ed8' }}>Buyer PO Requirement</th>
              <th style={{ ...th, color: '#c2410c' }}>Supplier Quote</th>
            </tr>
          </thead>
          <tbody>
            {PKG_SPECS.map((r, i) => (
              <DelayedRow key={i} delay={D(4 + i)} animate={animate} style={{ background: '#fef2f2' }}>
                <td style={{ ...td, fontWeight: 600, color: '#374151' }}>
                  <TypingText text={r.spec} animate={animate} delay={D(4 + i)} speed={5} />
                </td>
                <td style={{ ...td, color: '#1d4ed8' }}>
                  <TypingText text={r.po} animate={animate} delay={D(4 + i)} speed={5} />
                </td>
                <td style={{ ...td, color: '#e02f3e', fontWeight: 600 }}>
                  <TypingText text={r.supplier} animate={animate} delay={D(4 + i)} speed={5} />
                </td>
              </DelayedRow>
            ))}
          </tbody>
        </table>
        <DelayedVisible delay={D(9)} animate={animate} style={{ padding: '6px 12px', background: '#fef2f2', borderTop: '1px solid #fca5a5', fontSize: 9, color: '#e02f3e', fontWeight: 600 }}>
          ⚠ No written confirmation from buyer accepting downgrade. All 5 specifications are mismatched — penalty liability risk if buyer disputes on delivery.
        </DelayedVisible>
      </div>

    </div>
  );
}

// ─── Packaging error explanation ──────────────────────────────────────────────

const PKG_ERRORS = [
  {
    severity: 'critical',
    label: 'EU Plastics Regulation Breach',
    description: 'PVC shrink wrap at 8.2g per unit exceeds the EU Single-Use Plastics Directive limit of 5g per unit. The full order of 3,000 units carries 9,600g of excess plastic. Customs in Germany will hold the shipment until compliant packaging is provided.',
    color: '#c2410c', icon: 'fas fa-exclamation-circle',
  },
  {
    severity: 'critical',
    label: 'Packaging Specification Conflict — Penalty Risk',
    description: 'All 5 packaging specifications in PO-NCA-2025-089 differ from what the supplier has quoted. The buyer ordered premium retail packaging with foam inserts; the supplier quoted a plain export carton. No written acceptance of the downgrade is on file. If the buyer disputes on delivery, the sourcing company bears the penalty.',
    color: '#e02f3e', icon: 'fas fa-exclamation-triangle',
  },
];

function PackagingErrorsOutput({ animate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{ margin: '0 0 4px', fontSize: 12, color: '#374151' }}>
        <TypingText text="2 packaging issues flagged for order #12345. Both require resolution before production is confirmed:" animate={animate} delay={0} />
      </p>
      {PKG_ERRORS.map((e, i) => {
        const delay = animate ? 80 * i + 200 : 0;
        return (
          <DelayedVisible key={i} delay={delay} animate={animate} style={{ borderRadius: 6, background: 'white', borderTop: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', borderLeft: `3px solid ${e.color}`, padding: '8px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
              <i className={e.icon} style={{ fontSize: 10, color: e.color }} />
              <span style={{ fontSize: 9, fontWeight: 700, color: e.color, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{e.severity}</span>
            </div>
            <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, color: '#111827' }}>
              <TypingText text={e.label} animate={animate} delay={delay} />
            </p>
            <p style={{ margin: '0 0 8px', fontSize: 11, color: '#6b7280', lineHeight: 1.4 }}>
              <TypingText text={e.description} animate={animate} delay={delay} />
            </p>
            <span style={{ fontSize: 10, color: '#2563eb', cursor: 'pointer' }}>
              <TypingText text="View Packaging Specification ↗" animate={animate} delay={delay} />
            </span>
          </DelayedVisible>
        );
      })}
    </div>
  );
}

// ─── AI output router ─────────────────────────────────────────────────────────

function RenderOutput({ output, animate }) {
  if (!output || output.length === 0) return null;
  const item = output[0];
  if (item?.type === 'shippingInvoice')  return <ShippingInvoiceCard animate={animate} />;
  if (item?.type === 'shippingErrors')   return <ShippingErrorsOutput animate={animate} />;
  if (item?.type === 'packagingCard')    return <PackagingCard animate={animate} />;
  if (item?.type === 'packagingErrors')  return <PackagingErrorsOutput animate={animate} />;
  // fall through to HandleFilesOutput for riskFlags
  return <HandleFilesOutput output={output} users={[]} userStages={{}} animate={animate} />;
}

// ─── Demo component ───────────────────────────────────────────────────────────

export default function RiskFlagsDemo({ handleModal }) {
  const [messages, setMessages] = useState([]);
  const [typingText, setTypingText] = useState('');
  const [stage, setStage] = useState(0);
  const [isAiTyping, setIsAiTyping] = useState(false);

  const typingIntervalRef = useRef(null);
  const aiTypingTimerRef = useRef(null);
  const messageIdCounter = useRef(0);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Typing animation
  useEffect(() => {
    if (stage >= STAGES.length || isAiTyping) return;
    clearInterval(typingIntervalRef.current);
    setTypingText('');
    const text = STAGES[stage].input;
    let i = 0;
    typingIntervalRef.current = setInterval(() => {
      i++;
      setTypingText(text.slice(0, i));
      if (i === text.length) clearInterval(typingIntervalRef.current);
    }, 15);
    return () => clearInterval(typingIntervalRef.current);
  }, [stage, isAiTyping]);

  // Auto-scroll
  useEffect(() => {
    if (chatContainerRef.current)
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!isAiTyping) return;
    const id = setInterval(() => {
      if (chatContainerRef.current)
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, 100);
    return () => clearInterval(id);
  }, [isAiTyping]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.scrollLeft = inputRef.current.scrollWidth;
  }, [typingText]);

  const startAiTyping = (duration, onDone) => {
    clearTimeout(aiTypingTimerRef.current);
    setIsAiTyping(true);
    aiTypingTimerRef.current = setTimeout(() => {
      setIsAiTyping(false);
      onDone?.();
    }, duration);
  };

  const handleSend = () => {
    if (!typingText.trim() || isAiTyping || stage >= STAGES.length) return;

    const stageText = STAGES[stage].input;

    // User edited — open modal and re-animate
    if (typingText.trim() !== stageText.trim()) {
      handleModal();
      let i = 0;
      clearInterval(typingIntervalRef.current);
      setTypingText('');
      typingIntervalRef.current = setInterval(() => {
        i++;
        setTypingText(stageText.slice(0, i));
        if (i >= stageText.length) clearInterval(typingIntervalRef.current);
      }, 15);
      return;
    }

    const nextStage = stage + 1;
    const isLast = nextStage >= STAGES.length;
    const thinkingId = ++messageIdCounter.current;

    setMessages(prev => [...prev,
      { role: 'user', text: typingText, id: ++messageIdCounter.current },
      { role: 'ai', isThinking: true, id: thinkingId },
    ]);
    setTypingText('');
    setIsAiTyping(true);
    setStage(nextStage);

    // ── Stage 0: risk flags ──
    if (stage === 0) {
      const output = STAGES[0].output;
      const charCount = output[0].flags.reduce((n, f) => n + f.title.length + f.description.length + f.action.length, 0);
      setTimeout(() => {
        setMessages(prev => prev.map(m =>
          m.id === thinkingId
            ? { role: 'ai', output, showThought: true, animate: true, id: thinkingId }
            : m
        ));
        startAiTyping(charCount * 5 + 400, undefined);
      }, 1000);
      return;
    }

    // ── Stage 1: shipping invoice + error explanation ──
    if (stage === 1) {
      setTimeout(() => {
        setMessages(prev => prev.map(m =>
          m.id === thinkingId
            ? { role: 'ai', output: [{ type: 'shippingInvoice' }], showThought: true, animate: true, id: thinkingId }
            : m
        ));
        startAiTyping(2800, () => {
          setMessages(prev => [...prev,
            { role: 'ai', output: [{ type: 'shippingErrors' }], showThought: false, animate: true, id: ++messageIdCounter.current },
          ]);
          const errCharCount = ERRORS.reduce((n, e) => n + e.label.length + e.description.length, 0);
          startAiTyping(errCharCount * 5 + 600, isLast ? () => setTimeout(() => handleModal(), 1000) : undefined);
        });
      }, 1000);
    }

    // ── Stage 2: packaging compliance tables ──
    if (stage === 2) {
      setTimeout(() => {
        setMessages(prev => prev.map(m =>
          m.id === thinkingId
            ? { role: 'ai', output: [{ type: 'packagingCard' }], showThought: true, animate: true, id: thinkingId }
            : m
        ));
        startAiTyping(3000, undefined);
      }, 1000);
    }

    // ── Stage 3: packaging issues summary ──
    if (stage === 3) {
      setTimeout(() => {
        setMessages(prev => prev.map(m =>
          m.id === thinkingId
            ? { role: 'ai', output: [{ type: 'packagingErrors' }], showThought: true, animate: true, id: thinkingId }
            : m
        ));
        const pkgCharCount = PKG_ERRORS.reduce((n, e) => n + e.label.length + e.description.length, 0);
        startAiTyping(pkgCharCount * 5 + 600, isLast ? () => setTimeout(() => handleModal(), 1000) : undefined);
      }, 1000);
    }
  };

  const isDone = stage >= STAGES.length;

  return (
    <DemoChatShell
      chatContainerRef={chatContainerRef}
      messages={messages}
      emptyIcon={{ className: 'fa-solid fa-triangle-exclamation', color: '#f3693f' }}
      emptyText="Try sending a message."
      renderAiContent={msg => <RenderOutput output={msg.output} animate={msg.animate} />}
      inputBar={
        <DemoChatInputBar
          inputRef={inputRef}
          typingText={typingText}
          onChange={e => setTypingText(e.target.value)}
          onSend={handleSend}
          isAiTyping={isAiTyping}
          pulsing={!isAiTyping && !isDone}
        />
      }
    />
  );
}
