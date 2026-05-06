import React, { useMemo, useState } from 'react';

// ─── site design tokens (matches theme.css) ───────────────────────────────
const navy       = '#0D1F35';
const navyMid    = '#1E3A5F';
const blue       = '#2A5298';
const slate      = '#6B7A8A';
const slateLight = '#9AABB8';
const cream      = '#F8F7F3';
const bg2        = '#EFF0F2';
const rule       = 'rgba(30,58,95,0.10)';
const ruleStrong = 'rgba(30,58,95,0.18)';
const green      = '#1E8C64';
const greenBg    = 'rgba(30,140,100,0.08)';
const greenBorder= 'rgba(30,140,100,0.20)';
const blueBg     = 'rgba(42,82,152,0.08)';
const blueBorder = 'rgba(42,82,152,0.18)';
const amber      = '#92600A';
const amberBg    = '#FEF3DC';
const amberBorder= '#E9B84A';
const red        = '#B92B27';
const redBg      = '#FEF0EE';

// ─── fonts ───────────────────────────────────────────────────────────────
const fontDisplay = "'EB Garamond', Georgia, serif";
const fontMono    = "'JetBrains Mono', monospace";
const fontBody    = "'Inter', -apple-system, sans-serif";

// ─── constants (matching HTML spec) ─────────────────────────────────────────
const HOURS_PER_MONTH      = 160;
const QUOTATION_HOURS      = 0.4;   // 24 min
const SUPPLIER_HOURS       = 0.4;   // 24 min
const DOCUMENT_HOURS       = 0.5;   // 30 min
// catalogs use designerSalary ÷ 8  (not hours × wage)

const BASE_COST            = 6000;
const QUOTE_RATE           = 3.50;
const SUPPLIER_RATE        = 1.20;
const CATALOG_RATE         = 20;
const DOC_RATE             = 0.80;
const STORAGE_THRESHOLD    = 10000;
const STORAGE_RATE         = 1;     // HK$1 per file over limit

// revenue tab only
const CURRENT_QUOTE_MINS   = 30;
const NEW_QUOTE_MINS       = 10;

// ─── helpers ─────────────────────────────────────────────────────────────────
const currency = (v) =>
  new Intl.NumberFormat('en-HK', { style: 'currency', currency: 'HKD', maximumFractionDigits: 0 }).format(v);
const fmt = (v, d = 1) =>
  new Intl.NumberFormat('en-HK', { maximumFractionDigits: d }).format(v);

// ─── shared components ────────────────────────────────────────────────────────
function Slider({ label, value, min, max, step = 1, suffix = '', onChange }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <label style={{ fontFamily: fontBody, fontSize: 13, color: slate, fontWeight: 300, paddingRight: 8 }}>{label}</label>
        <span style={{ fontFamily: fontBody, fontSize: 12, fontWeight: 500, color: navy, background: blueBg, border: `1px solid ${blueBorder}`, borderRadius: 2, padding: '2px 10px', minWidth: 72, textAlign: 'right', flexShrink: 0 }}>
          {fmt(value)}{suffix}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value} onChange={onChange}
        style={{ width: '100%', height: 3, cursor: 'pointer', appearance: 'none', background: `linear-gradient(to right,${blue} 0%,${blue} ${pct}%,${ruleStrong} ${pct}%,${ruleStrong} 100%)`, borderRadius: 2, outline: 'none', border: 'none' }}
      />
    </div>
  );
}

function ResultCard({ label, value, sub, highlight = false, accent = false }) {
  const bg        = highlight ? greenBg   : accent ? amberBg   : '#fff';
  const borderCol = highlight ? `1px solid ${greenBorder}` : accent ? `1px solid ${amberBorder}` : `1px solid ${rule}`;
  const textCol   = highlight ? green     : accent ? amber     : navy;
  const labelCol  = highlight ? green     : accent ? amber     : slate;
  const vLen      = String(value).length;
  const vSize     = vLen > 13 ? 16 : vLen > 11 ? 20 : vLen > 9 ? 24 : 28;
  return (
    <div style={{ background: bg, border: borderCol, borderRadius: 3, padding: '18px 20px' }}>
      <div style={{ fontFamily: fontBody, fontSize: 9, letterSpacing: '2px', color: labelCol, textTransform: 'uppercase', marginBottom: 10 }}>{label}</div>
      <div style={{ fontFamily: fontBody, fontSize: vSize, fontWeight: 400, color: textCol, lineHeight: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</div>
      {sub && <div style={{ fontFamily: fontBody, fontSize: 12, color: labelCol, fontWeight: 300, marginTop: 6, lineHeight: 1.5, opacity: 0.85 }}>{sub}</div>}
    </div>
  );
}

function AssumptionNote({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '9px 12px', background: blueBg, border: `1px solid ${blueBorder}`, borderRadius: 2, marginBottom: 8 }}>
      <span style={{ fontFamily: fontBody, fontSize: 8, letterSpacing: '1px', color: blue, fontWeight: 500, marginTop: 2, flexShrink: 0, textTransform: 'uppercase' }}>Note</span>
      <span style={{ fontFamily: fontBody, fontSize: 12, color: navy, fontWeight: 300, lineHeight: 1.6 }}>{children}</span>
    </div>
  );
}

// ─── savings breakdown row ───────────────────────────────────────────────────
function SavingsRow({ name, formula, hoursLabel, fteLabel, amount }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '11px 14px', border: `1px solid ${rule}`, borderRadius: 3, background: '#fff' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: fontBody, fontSize: 13, fontWeight: 400, color: navy, marginBottom: 3 }}>{name}</div>
        <div style={{ fontFamily: fontBody, fontSize: 10, color: slateLight, lineHeight: 1.5, marginBottom: 4 }}>{formula}</div>
        <div style={{ fontFamily: fontBody, fontSize: 9, letterSpacing: '0.5px', color: slateLight }}>{fteLabel}</div>
      </div>
      <div style={{ textAlign: 'right', minWidth: 90, flexShrink: 0 }}>
        <div style={{ fontFamily: fontBody, fontSize: 13, fontWeight: 500, color: navy }}>{amount}</div>
        <div style={{ fontFamily: fontBody, fontSize: 11, fontWeight: 300, color: slate, marginTop: 2 }}>{hoursLabel}</div>
      </div>
    </div>
  );
}

// ─── DB cost block ────────────────────────────────────────────────────────────
function CostRow({ name, value, warn = false, total = false }) {
  const bg        = total ? amberBg : warn ? redBg : 'transparent';
  const nameColor = warn ? red : total ? navy : slate;
  const valColor  = total ? amber : warn ? red : navy;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 14px', borderBottom: `1px solid ${rule}`, background: bg }}>
      <span style={{ fontFamily: fontBody, fontSize: 12, fontWeight: warn || total ? 500 : 300, color: nameColor }}>{name}</span>
      <span style={{ fontFamily: fontBody, fontSize: 11, fontWeight: 500, color: valColor }}>{value}</span>
    </div>
  );
}

// ─── storage bar ─────────────────────────────────────────────────────────────
function StorageBar({ cumFiles, overage }) {
  const pct      = Math.min((cumFiles / STORAGE_THRESHOLD) * 100, 100);
  const barColor = overage > 0 ? red : green;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ height: 3, background: ruleStrong, borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: barColor, borderRadius: 2, transition: 'width 0.3s, background 0.3s' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: fontBody, fontSize: 9, letterSpacing: '0.5px', color: slateLight, marginTop: 5 }}>
        <span style={{ color: overage > 0 ? red : slateLight }}>
          {cumFiles.toLocaleString()} files stored{overage > 0 ? ` — ${overage.toLocaleString()} over limit` : ''}
        </span>
        <span>10,000 file threshold</span>
      </div>
    </div>
  );
}

// ─── formula pill ────────────────────────────────────────────────────────────
function Pill({ children, color = blue }) {
  return (
    <div style={{ display: 'inline-block', fontFamily: fontBody, fontSize: 10, color, background: `${color}12`, border: `0.5px solid ${color}30`, borderRadius: 2, padding: '3px 8px', marginBottom: 4, lineHeight: 1.6 }}>
      {children}
    </div>
  );
}

// ─── revenue tab components (unchanged) ──────────────────────────────────────
function CapIndicator({ current, theoretical, demand }) {
  const isConstrained = theoretical > demand;
  const projected     = Math.min(theoretical, demand);
  const maxVal        = Math.max(theoretical, demand, current) * 1.1;
  const barStyle      = (val, color) => ({ height: 8, borderRadius: 4, width: `${Math.min(100, (val / maxVal) * 100)}%`, background: color, transition: 'width 0.3s' });
  return (
    <div style={{ background: '#fff', border: `1px solid ${rule}`, borderRadius: 3, padding: '18px 20px' }}>
      <div style={{ fontFamily: fontBody, fontSize: 9, letterSpacing: '2px', color: slate, textTransform: 'uppercase', marginBottom: 14 }}>Quotation capacity vs demand</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { label: 'Current quotations',            val: current,     color: ruleStrong },
          { label: 'Theoretical new capacity (3×)', val: theoretical, color: blue       },
          { label: 'Quoteable opportunities',       val: demand,      color: isConstrained ? amberBorder : green },
          { label: 'Projected (demand-capped)',     val: projected,   color: green },
        ].map((row, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontFamily: fontBody, fontSize: 12, fontWeight: 300, color: slate }}>{row.label}</span>
              <span style={{ fontFamily: fontBody, fontSize: 11, fontWeight: 500, color: navy }}>{fmt(row.val, 0)}</span>
            </div>
            <div style={{ background: bg2, borderRadius: 2, height: 6 }}>
              <div style={barStyle(row.val, row.color)} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, padding: '9px 12px', background: isConstrained ? amberBg : greenBg, border: `1px solid ${isConstrained ? amberBorder : greenBorder}`, borderRadius: 2, fontFamily: fontBody, fontSize: 12, fontWeight: 300, color: isConstrained ? amber : green, lineHeight: 1.6 }}>
        {isConstrained
          ? `Demand is the binding constraint. Projected output is capped at ${fmt(demand, 0)} quotations.`
          : 'Capacity is the binding constraint. Efficiency gains translate directly to higher output.'}
      </div>
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────
export default function ImpactCalculator({ onDemo }) {
  const [tab, setTab] = useState('cost');
  const [showFormulas, setShowFormulas] = useState(true);

  const [costInputs, setCostInputs] = useState({
    avgMonthlySalary:        28000,
    designerMonthlySalary:   35000,
    quotationsPerMonth:        150,
    supplierOffersPerMonth:    200,
    catalogsPerMonth:           20,
    documentsCheckedPerMonth:  100,
    monthsUsingDB:               6,
  });

  const [revenueInputs, setRevenueInputs] = useState({
    currentQuotationsPerMonth: 150,
    quoteableOpportunities:    220,
    conversionRate:             12,
    averageOrderValue:       35000,
  });

  // ── cost model (HTML algorithm) ────────────────────────────────────────────
  const cost = useMemo(() => {
    const { avgMonthlySalary: sal, designerMonthlySalary: dsal,
            quotationsPerMonth: q, supplierOffersPerMonth: sp,
            catalogsPerMonth: c, documentsCheckedPerMonth: d,
            monthsUsingDB: mo } = costInputs;

    // hourly wage
    const hw = sal / HOURS_PER_MONTH;

    // savings
    const qSav  = q  * QUOTATION_HOURS * hw;   // q × 0.4h × hourly wage
    const sSav  = sp * SUPPLIER_HOURS  * hw;   // sp × 0.4h × hourly wage
    const cSav  = c  * (dsal / 8);             // c × (designer salary ÷ 8)
    const dSav  = d  * DOCUMENT_HOURS  * hw;   // d × 0.5h × hourly wage
    const gross = qSav + sSav + cSav + dSav;

    // hours saved
    const qHrs = q  * QUOTATION_HOURS;
    const sHrs = sp * SUPPLIER_HOURS;
    const dHrs = d  * DOCUMENT_HOURS;
    const cDesignerMonths = c / 8;

    // FTE equivalents
    const qFTE = qHrs / HOURS_PER_MONTH;
    const sFTE = sHrs / HOURS_PER_MONTH;
    const dFTE = dHrs / HOURS_PER_MONTH;

    // compute costs
    const compute = q * QUOTE_RATE + sp * SUPPLIER_RATE + c * CATALOG_RATE + d * DOC_RATE;

    // storage
    const filesPerMonth = q + sp + c + d;
    const cumFiles      = filesPerMonth * mo;
    const overage       = Math.max(0, cumFiles - STORAGE_THRESHOLD);
    const storageCost   = overage * STORAGE_RATE;

    // totals
    const dbTotal = BASE_COST + compute + storageCost;
    const net     = Math.max(0, gross - dbTotal);
    const roi     = dbTotal > 0 ? net / dbTotal : 0;

    return {
      hw, qSav, sSav, cSav, dSav, gross,
      qHrs, sHrs, dHrs, cDesignerMonths,
      qFTE, sFTE, dFTE,
      compute, filesPerMonth, cumFiles, overage, storageCost,
      dbTotal, net, roi,
    };
  }, [costInputs]);

  // ── revenue model (unchanged) ──────────────────────────────────────────────
  const revenue = useMemo(() => {
    const rate  = revenueInputs.conversionRate / 100;
    const cur   = revenueInputs.currentQuotationsPerMonth;
    const demand = revenueInputs.quoteableOpportunities;
    const theoreticalCapacity  = cur * (CURRENT_QUOTE_MINS / NEW_QUOTE_MINS);
    const projectedQuotations  = Math.min(theoreticalCapacity, demand);
    const curRev  = cur               * rate * revenueInputs.averageOrderValue;
    const projRev = projectedQuotations * rate * revenueInputs.averageOrderValue;
    return {
      curRev, projRev, addedRev: projRev - curRev,
      theoreticalCapacity, projectedQuotations,
      curOrders: cur * rate, projOrders: projectedQuotations * rate,
      isCapConstrained: theoreticalCapacity <= demand,
    };
  }, [revenueInputs]);

  const tabStyle = (active) => ({
    fontFamily: fontBody, fontSize: 10, fontWeight: 500,
    letterSpacing: '1px', textTransform: 'uppercase',
    padding: '10px 22px', borderRadius: 2, cursor: 'pointer',
    border: active ? 'none' : `1px solid ${ruleStrong}`,
    background: active ? navy : 'transparent',
    color: active ? cream : slate,
    transition: 'all 0.15s',
  });

  const c = costInputs;   // shorthand for render

  return (
    <div style={{ minWidth: 860 }}>
      {/* header */}
      <div style={{ marginBottom: 28 }}>
        <div className="db-section-tag">Impact Calculator</div>
        <h2 style={{ fontFamily: fontBody, fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 400, color: navy, marginBottom: 12, lineHeight: 1.15 }}>
          Estimate what Deep Bridge saves your team
        </h2>
        <p style={{ fontFamily: fontBody, fontSize: 15, fontWeight: 300, color: slate, lineHeight: 1.8, maxWidth: 520, marginBottom: 0 }}>
          Hard cost savings only — based on your actual workload and months on platform. Every number traces back to a real formula.
        </p>
      </div>

      {/* tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
        <button style={tabStyle(tab === 'cost')}    onClick={() => setTab('cost')}>Cost savings</button>
        <button style={tabStyle(tab === 'revenue')} onClick={() => setTab('revenue')}>Revenue uplift</button>
      </div>

      {/* ── COST TAB ── */}
      {tab === 'cost' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>

          {/* left — inputs */}
          <div style={{ background: '#fff', border: `1px solid ${rule}`, borderRadius: 3, padding: '28px 24px' }}>
            <div style={{ fontFamily: fontBody, fontSize: 18, fontWeight: 400, color: navy, marginBottom: 4 }}>Your team</div>
            <div style={{ fontFamily: fontBody, fontSize: 13, fontWeight: 300, color: slate, marginBottom: 24, lineHeight: 1.7 }}>Adjust to reflect your monthly activity.</div>

            <Slider label="Monthly salary per person (HKD)"    value={c.avgMonthlySalary}        min={10000} max={80000} step={500}  onChange={e => setCostInputs({ ...c, avgMonthlySalary:        +e.target.value })} />
            <Slider label="Designer monthly salary (HKD)"      value={c.designerMonthlySalary}   min={10000} max={80000} step={500}  onChange={e => setCostInputs({ ...c, designerMonthlySalary:   +e.target.value })} />

            <div style={{ fontFamily: fontBody, fontSize: 9, letterSpacing: '2px', color: slateLight, textTransform: 'uppercase', margin: '4px 0 14px' }}>Monthly volume</div>

            <Slider label="Quotations prepared"     value={c.quotationsPerMonth}        min={5}  max={500} step={5}   onChange={e => setCostInputs({ ...c, quotationsPerMonth:        +e.target.value })} />
            <Slider label="Supplier offers parsed"  value={c.supplierOffersPerMonth}    min={5}  max={600} step={5}   onChange={e => setCostInputs({ ...c, supplierOffersPerMonth:    +e.target.value })} />
            <Slider label="Catalogs / brochures"    value={c.catalogsPerMonth}          min={1}  max={80}  step={1}   onChange={e => setCostInputs({ ...c, catalogsPerMonth:          +e.target.value })} />
            <Slider label="Documents checked"       value={c.documentsCheckedPerMonth}  min={10} max={400} step={10}  onChange={e => setCostInputs({ ...c, documentsCheckedPerMonth:  +e.target.value })} />

            <div style={{ fontFamily: fontBody, fontSize: 9, letterSpacing: '2px', color: slateLight, textTransform: 'uppercase', margin: '4px 0 14px' }}>Platform tenure</div>

            <div style={{ marginBottom: 8 }}>
              <Slider label="Months using Deep Bridge" value={c.monthsUsingDB} min={1} max={36} step={1} onChange={e => setCostInputs({ ...c, monthsUsingDB: +e.target.value })} />
              <StorageBar cumFiles={cost.cumFiles} overage={cost.overage} />
            </div>

            {/* formula pills */}
            <div style={{ borderTop: `1px solid ${rule}`, paddingTop: 14, marginTop: 4 }}>
              <button
                onClick={() => setShowFormulas(v => !v)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: fontBody, fontSize: 10, fontWeight: 500, letterSpacing: '0.5px', color: blue, background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: showFormulas ? 12 : 0 }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: showFormulas ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
                  <path d="M3 1l4 4-4 4" stroke={blue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                How is this calculated?
              </button>
              {showFormulas && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <div><Pill>hourly wage = salary ÷ 160h</Pill></div>
                  <div><Pill>quotation saving = n × 0.4h × hourly wage</Pill></div>
                  <div><Pill>supplier saving = n × 0.4h × hourly wage</Pill></div>
                  <div><Pill>catalog saving = n × (designer salary ÷ 8)</Pill></div>
                  <div><Pill>document saving = n × 0.5h × hourly wage</Pill></div>
                  <div style={{ margin: '4px 0' }}><hr style={{ border: 'none', borderTop: `1px solid ${rule}` }} /></div>
                  <div><Pill color={amber}>DB cost = HK$6,000 base</Pill></div>
                  <div><Pill color={amber}>+ quotations × HK$3.50</Pill></div>
                  <div><Pill color={amber}>+ supplier offers × HK$1.20</Pill></div>
                  <div><Pill color={amber}>+ catalogs × HK$20</Pill></div>
                  <div><Pill color={amber}>+ documents × HK$0.80</Pill></div>
                  <div style={{ margin: '4px 0' }}><hr style={{ border: 'none', borderTop: `1px solid ${rule}` }} /></div>
                  <div><Pill color={red}>files/month = quotations + offers + catalogs + docs</Pill></div>
                  <div><Pill color={red}>cumulative files = files/month × months</Pill></div>
                  <div><Pill color={red}>storage overage = max(0, cumulative − 10,000) × HK$1</Pill></div>
                </div>
              )}
            </div>
          </div>

          {/* right — outputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* savings breakdown */}
            <div style={{ background: '#fff', border: `1px solid ${rule}`, borderRadius: 3, padding: '20px 24px' }}>
              <div style={{ fontFamily: fontBody, fontSize: 9, letterSpacing: '2px', color: slateLight, textTransform: 'uppercase', marginBottom: 14 }}>Savings breakdown</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                <SavingsRow
                  name="Quotation prep"
                  formula={`${c.quotationsPerMonth} × 0.4h × HK$${Math.round(cost.hw)}/h`}
                  hoursLabel={`${fmt(cost.qHrs, 0)}h saved`}
                  fteLabel={`${cost.qFTE.toFixed(2)} FTE`}
                  amount={currency(cost.qSav)}
                />
                <SavingsRow
                  name="Supplier parsing"
                  formula={`${c.supplierOffersPerMonth} × 0.4h × HK$${Math.round(cost.hw)}/h`}
                  hoursLabel={`${fmt(cost.sHrs, 0)}h saved`}
                  fteLabel={`${cost.sFTE.toFixed(2)} FTE`}
                  amount={currency(cost.sSav)}
                />
                <SavingsRow
                  name="Catalog creation"
                  formula={`${c.catalogsPerMonth} × (HK$${c.designerMonthlySalary.toLocaleString()} ÷ 8)`}
                  hoursLabel={`${cost.cDesignerMonths.toFixed(1)} designer-months`}
                  fteLabel={`${cost.cDesignerMonths.toFixed(1)} designer-months`}
                  amount={currency(cost.cSav)}
                />
                <SavingsRow
                  name="Document coordination"
                  formula={`${c.documentsCheckedPerMonth} × 0.5h × HK$${Math.round(cost.hw)}/h`}
                  hoursLabel={`${fmt(cost.dHrs, 0)}h saved`}
                  fteLabel={`${cost.dFTE.toFixed(2)} FTE`}
                  amount={currency(cost.dSav)}
                />
              </div>

              {/* DB cost block */}
              <div style={{ fontFamily: fontBody, fontSize: 9, letterSpacing: '2px', color: slateLight, textTransform: 'uppercase', marginBottom: 10 }}>Deep Bridge cost</div>
              <div style={{ border: `1px solid ${rule}`, borderRadius: 3, overflow: 'hidden', marginBottom: 14 }}>
                <CostRow name="Base subscription"   value="HK$6,000" />
                <CostRow name="Compute (API calls)" value={currency(cost.compute)} />
                <CostRow
                  name={cost.overage > 0 ? `Storage (${cost.overage.toLocaleString()} files over limit)` : 'Storage (within limit)'}
                  value={cost.overage > 0 ? currency(cost.storageCost) : 'Included'}
                  warn={cost.overage > 0}
                />
                <CostRow name="Total monthly cost" value={currency(cost.dbTotal)} total />
              </div>

              {/* net card */}
              <div style={{ background: navy, borderRadius: 3, padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: fontBody, fontSize: 9, fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: slateLight, marginBottom: 6 }}>Net monthly savings</div>
                  <div style={{ fontFamily: fontBody, fontSize: 30, fontWeight: 400, color: '#fff', lineHeight: 1 }}>{currency(cost.net)}</div>
                  <div style={{ fontFamily: fontBody, fontSize: 12, fontWeight: 300, color: slateLight, marginTop: 5 }}>{currency(cost.net * 12)} / year</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: fontBody, fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', color: slateLight, marginBottom: 6 }}>ROI</div>
                  <div style={{ fontFamily: fontBody, fontSize: 22, fontWeight: 500, color: green }}>{cost.roi.toFixed(1)}×</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── REVENUE TAB ── */}
      {tab === 'revenue' && (
        <div style={{ display: 'grid', gridTemplateColumns: '420px 420px', gap: 20, alignItems: 'start' }}>
          <div style={{ background: '#fff', border: `1px solid ${rule}`, borderRadius: 3, padding: '28px 24px' }}>
            <div style={{ fontFamily: fontBody, fontSize: 18, fontWeight: 400, color: navy, marginBottom: 4 }}>Your quotation pipeline</div>
            <div style={{ fontFamily: fontBody, fontSize: 13, fontWeight: 300, color: slate, marginBottom: 24, lineHeight: 1.7 }}>Deep Bridge reduces quotation prep from 30 to 10 minutes. Projected revenue is capped by available opportunities.</div>
            <Slider label="Quotations sent per month (current)"  value={revenueInputs.currentQuotationsPerMonth} min={10}    max={500}    step={5}     onChange={e => setRevenueInputs({ ...revenueInputs, currentQuotationsPerMonth: +e.target.value })} />
            <Slider label="Quoteable opportunities per month"    value={revenueInputs.quoteableOpportunities}   min={10}    max={600}    step={5}     onChange={e => setRevenueInputs({ ...revenueInputs, quoteableOpportunities:   +e.target.value })} />
            <Slider label="Conversion rate"                      value={revenueInputs.conversionRate}           min={1}     max={60}     step={1} suffix="%" onChange={e => setRevenueInputs({ ...revenueInputs, conversionRate:           +e.target.value })} />
            <Slider label="Average order value (HKD)"            value={revenueInputs.averageOrderValue}        min={20000} max={300000} step={5000}  onChange={e => setRevenueInputs({ ...revenueInputs, averageOrderValue:         +e.target.value })} />
            <div style={{ borderTop: `1px solid ${rule}`, paddingTop: 16, marginTop: 4 }}>
              <div style={{ fontFamily: fontBody, fontSize: 9, letterSpacing: '2px', color: slateLight, textTransform: 'uppercase', marginBottom: 10 }}>Assumptions</div>
              <AssumptionNote>Quote prep drops from 30 to 10 minutes — 3× capacity for the same team.</AssumptionNote>
              <AssumptionNote>Projected quotations = lower of theoretical capacity or quoteable opportunities.</AssumptionNote>
              <AssumptionNote>Conversion rate and order value stay constant. Scenario model only.</AssumptionNote>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <CapIndicator current={revenueInputs.currentQuotationsPerMonth} theoretical={revenue.theoreticalCapacity} demand={revenueInputs.quoteableOpportunities} />
            <div style={{ display: 'grid', gridTemplateColumns: '205px 205px', gap: 10 }}>
              <ResultCard label="Current monthly revenue"   value={currency(revenue.curRev)}  sub={`${fmt(revenueInputs.currentQuotationsPerMonth, 0)} quotations`} />
              <ResultCard label="Projected monthly revenue" value={currency(revenue.projRev)} sub={`${fmt(revenue.projectedQuotations, 0)} quotations`} accent={!revenue.isCapConstrained} />
            </div>
            <ResultCard
              label="Additional monthly revenue"
              value={currency(revenue.addedRev)}
              sub={revenue.isCapConstrained ? `3× capacity vs ${fmt(revenueInputs.quoteableOpportunities, 0)} opportunities` : `Capped at ${fmt(revenueInputs.quoteableOpportunities, 0)} opportunities`}
              highlight
            />
          </div>
        </div>
      )}
    </div>
  );
}
