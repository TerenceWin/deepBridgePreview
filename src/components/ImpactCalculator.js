import React, { useMemo, useState } from 'react';

const sky = '#29ABE2'; const navy = '#0A2540'; const slate = '#5A6E85'; const mist = '#E3F4FC'; const border = '#E2DED6'; const green = '#0F7B55'; const greenLight = '#E6F5EF'; const amber = '#92600A'; const amberLight = '#FEF3DC';
const HOURS_PER_MONTH = 160, CATALOG_HOURS = 2, QUOTATION_HOURS = 0.5, SUPPLIER_OFFER_HOURS = 0.5, DOCUMENT_CHECK_HOURS = 0.5, API_COST = 7.8, CURRENT_QUOTE_MINS = 30, NEW_QUOTE_MINS = 10;
const currency = (v) => new Intl.NumberFormat('en-HK', { style: 'currency', currency: 'HKD', maximumFractionDigits: 0 }).format(v);
const fmt = (v, d = 1) => new Intl.NumberFormat('en-HK', { maximumFractionDigits: d }).format(v);

function Slider({ label, value, min, max, step = 1, suffix = '', onChange }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (<div style={{ marginBottom: 20 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}><label style={{ fontSize: 13, color: slate, fontWeight: 400, paddingRight: 8 }}>{label}</label><span style={{ fontSize: 13, fontWeight: 500, color: navy, background: mist, borderRadius: 6, padding: '3px 10px', minWidth: 64, textAlign: 'right', flexShrink: 0 }}>{fmt(value)}{suffix}</span></div><input type="range" min={min} max={max} step={step} value={value} onChange={onChange} style={{ width: '100%', height: 4, cursor: 'pointer', appearance: 'none', background: `linear-gradient(to right, ${sky} 0%, ${sky} ${pct}%, #E2DED6 ${pct}%, #E2DED6 100%)`, borderRadius: 4, outline: 'none', border: 'none' }} /></div>);
}

function ResultCard({ label, value, sub, highlight = false, accent = false }) {
  const bg = highlight ? greenLight : accent ? amberLight : 'white';
  const borderCol = highlight ? `1px solid ${green}` : accent ? `1px solid #E9B84A` : `0.5px solid ${border}`;
  const textCol = highlight ? green : accent ? amber : navy;
  const labelCol = highlight ? green : accent ? amber : slate;
  return (<div style={{ background: bg, border: borderCol, borderRadius: 12, padding: '18px 20px' }}><div style={{ fontSize: 11, letterSpacing: '1.5px', color: labelCol, textTransform: 'uppercase', marginBottom: 8 }}>{label}</div><div style={{ fontSize: 26, fontWeight: 500, color: textCol, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</div>{sub && <div style={{ fontSize: 12, color: labelCol, marginTop: 6, lineHeight: 1.5, opacity: 0.8 }}>{sub}</div>}</div>);
}

function AssumptionNote({ children }) {
  return (<div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '9px 12px', background: mist, borderRadius: 8, marginBottom: 8 }}><span style={{ fontSize: 11, color: sky, fontWeight: 500, marginTop: 1, flexShrink: 0 }}>NOTE</span><span style={{ fontSize: 12, color: navy, lineHeight: 1.6 }}>{children}</span></div>);
}

function CapIndicator({ current, theoretical, demand }) {
  const isConstrained = theoretical > demand;
  const projected = Math.min(theoretical, demand);
  const maxVal = Math.max(theoretical, demand, current) * 1.1;
  const barStyle = (val, color) => ({ height: 8, borderRadius: 4, width: `${Math.min(100, (val / maxVal) * 100)}%`, background: color, transition: 'width 0.3s' });
  return (
    <div style={{ background: 'white', border: `0.5px solid ${border}`, borderRadius: 12, padding: '18px 20px' }}>
      <div style={{ fontSize: 11, letterSpacing: '1.5px', color: slate, textTransform: 'uppercase', marginBottom: 14 }}>Quotation capacity vs demand</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[{ label: 'Current quotations', val: current, color: '#B0C4D8' }, { label: 'Theoretical new capacity (3×)', val: theoretical, color: sky }, { label: 'Quoteable opportunities', val: demand, color: isConstrained ? '#E9B84A' : green }, { label: 'Projected (demand-capped)', val: projected, color: green }].map((row, i) => (
          <div key={i}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span style={{ fontSize: 12, color: slate }}>{row.label}</span><span style={{ fontSize: 12, fontWeight: 500, color: navy }}>{fmt(row.val, 0)}</span></div><div style={{ background: '#F2F0EB', borderRadius: 4, height: 8 }}><div style={barStyle(row.val, row.color)} /></div></div>
        ))}
      </div>
      <div style={{ marginTop: 14, padding: '9px 12px', background: isConstrained ? amberLight : greenLight, borderRadius: 8, fontSize: 12, color: isConstrained ? amber : green, lineHeight: 1.6 }}>
        {isConstrained ? `Demand is the binding constraint. Projected output is capped at ${fmt(demand, 0)} quotations.` : 'Capacity is the binding constraint. Efficiency gains translate directly to higher output.'}
      </div>
    </div>
  );
}

export default function ImpactCalculator({ onDemo }) {
  const [tab, setTab] = useState('cost');
  const [costInputs, setCostInputs] = useState({ avgMonthlySalary: 28000, catalogsPerMonth: 20, quotationsPerMonth: 150, supplierOffersPerMonth: 200, documentsCheckedPerMonth: 100 });
  const [revenueInputs, setRevenueInputs] = useState({ currentQuotationsPerMonth: 150, quoteableOpportunities: 220, conversionRate: 12, averageOrderValue: 35000 });

  const cost = useMemo(() => {
    const catH = costInputs.catalogsPerMonth * CATALOG_HOURS, quoteH = costInputs.quotationsPerMonth * QUOTATION_HOURS, supH = costInputs.supplierOffersPerMonth * SUPPLIER_OFFER_HOURS, docH = costInputs.documentsCheckedPerMonth * DOCUMENT_CHECK_HOURS;
    const totalH = catH + quoteH + supH + docH, people = totalH / HOURS_PER_MONTH, monthlyStaff = people * costInputs.avgMonthlySalary;
    const catUsage = costInputs.catalogsPerMonth * 8 * API_COST, docUsage = costInputs.documentsCheckedPerMonth * 1 * API_COST, dbCost = 6000 + catUsage + docUsage;
    return { catH, quoteH, supH, docH, totalH, people, monthlyStaff, annualStaff: monthlyStaff * 12, catUsage, docUsage, dbCost, netMonthly: monthlyStaff - dbCost, netAnnual: (monthlyStaff - dbCost) * 12 };
  }, [costInputs]);

  const revenue = useMemo(() => {
    const rate = revenueInputs.conversionRate / 100, cur = revenueInputs.currentQuotationsPerMonth, demand = revenueInputs.quoteableOpportunities;
    const theoreticalCapacity = cur * (CURRENT_QUOTE_MINS / NEW_QUOTE_MINS), projectedQuotations = Math.min(theoreticalCapacity, demand);
    const curRev = cur * rate * revenueInputs.averageOrderValue, projRev = projectedQuotations * rate * revenueInputs.averageOrderValue;
    return { curRev, projRev, addedRev: projRev - curRev, theoreticalCapacity, projectedQuotations, curOrders: cur * rate, projOrders: projectedQuotations * rate, isCapConstrained: theoreticalCapacity <= demand };
  }, [revenueInputs]);

  const tabStyle = (active) => ({ padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', border: 'none', background: active ? navy : 'white', color: active ? 'white' : slate, boxShadow: active ? 'none' : `inset 0 0 0 0.5px ${border}`, transition: 'all 0.15s' });

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 10, letterSpacing: '2.5px', color: sky, textTransform: 'uppercase', marginBottom: 12 }}>Impact calculator</div>
        <h2 style={{ fontSize: 28, fontWeight: 500, color: navy, letterSpacing: '-0.03em', marginBottom: 12, lineHeight: 1.1 }}>Estimate what Deep Bridge is worth to your team</h2>
        <p style={{ fontSize: 14, color: slate, lineHeight: 1.8, maxWidth: 560 }}>The cost model estimates staffing savings based on your workload. The revenue model is demand-capped: efficiency gains only translate to more revenue if enough real opportunities exist.</p>
      </div>
      <div className="db-tabs" style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
        <button style={tabStyle(tab === 'cost')} onClick={() => setTab('cost')}>Cost savings</button>
        <button style={tabStyle(tab === 'revenue')} onClick={() => setTab('revenue')}>Revenue uplift</button>
      </div>
      {tab === 'cost' ? (
        <div className="db-calc-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
          <div style={{ background: 'white', border: `0.5px solid ${border}`, borderRadius: 14, padding: '28px 24px' }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: navy, marginBottom: 4 }}>Your team’s workload</div>
            <div style={{ fontSize: 12, color: slate, marginBottom: 24, lineHeight: 1.6 }}>Adjust to reflect your monthly activity.</div>
            <Slider label="Average monthly salary per person (HKD)" value={costInputs.avgMonthlySalary} min={15000} max={80000} step={1000} onChange={e => setCostInputs({ ...costInputs, avgMonthlySalary: Number(e.target.value) })} />
            <Slider label="Catalogs / brochures prepared / month" value={costInputs.catalogsPerMonth} min={0} max={200} step={5} onChange={e => setCostInputs({ ...costInputs, catalogsPerMonth: Number(e.target.value) })} />
            <Slider label="Quotations prepared / month" value={costInputs.quotationsPerMonth} min={0} max={1000} step={10} onChange={e => setCostInputs({ ...costInputs, quotationsPerMonth: Number(e.target.value) })} />
            <Slider label="Supplier offers parsed / month" value={costInputs.supplierOffersPerMonth} min={0} max={1500} step={10} onChange={e => setCostInputs({ ...costInputs, supplierOffersPerMonth: Number(e.target.value) })} />
            <Slider label="Documents checked / month" value={costInputs.documentsCheckedPerMonth} min={0} max={1000} step={10} onChange={e => setCostInputs({ ...costInputs, documentsCheckedPerMonth: Number(e.target.value) })} />
            <div style={{ borderTop: `0.5px solid ${border}`, paddingTop: 16, marginTop: 4 }}>
              <div style={{ fontSize: 10, letterSpacing: '2px', color: slate, textTransform: 'uppercase', marginBottom: 10 }}>Assumptions</div>
              <AssumptionNote>Catalogs take 2 hours each. Quotations, supplier offer parsing, and document checks take 30 minutes each.</AssumptionNote>
              <AssumptionNote>Each person works 160 hours per month.</AssumptionNote>
              <AssumptionNote>Deep Bridge cost = HKD 6,000 base + HKD 7.80 per API call.</AssumptionNote>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <ResultCard label="Total manual hours / month" value={`${fmt(cost.totalH)}h`} sub={`Catalogs ${fmt(cost.catH)}h · Quotes ${fmt(cost.quoteH)}h · Supplier ${fmt(cost.supH)}h · Docs ${fmt(cost.docH)}h`} />
            <div className="db-result-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <ResultCard label="Headcount equivalent" value={`${fmt(cost.people)} FTE`} sub="At 160h/person/month" />
              <ResultCard label="Monthly staffing cost" value={currency(cost.monthlyStaff)} sub={`${currency(cost.annualStaff)} / year`} />
            </div>
            <ResultCard label="Deep Bridge monthly cost" value={currency(cost.dbCost)} sub={`Base ${currency(6000)} + catalogs ${currency(cost.catUsage)} + docs ${currency(cost.docUsage)}`} />
            <ResultCard label="Estimated net monthly savings" value={currency(cost.netMonthly)} sub={`${currency(cost.netAnnual)} annualised`} highlight />
          </div>
        </div>
      ) : (
        <div className="db-calc-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
          <div style={{ background: 'white', border: `0.5px solid ${border}`, borderRadius: 14, padding: '28px 24px' }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: navy, marginBottom: 4 }}>Your quotation pipeline</div>
            <div style={{ fontSize: 12, color: slate, marginBottom: 24, lineHeight: 1.6 }}>Deep Bridge reduces quotation prep from 30 to 10 minutes. Projected revenue is capped by available opportunities.</div>
            <Slider label="Quotations sent per month (current)" value={revenueInputs.currentQuotationsPerMonth} min={10} max={500} step={5} onChange={e => setRevenueInputs({ ...revenueInputs, currentQuotationsPerMonth: Number(e.target.value) })} />
            <Slider label="Quoteable opportunities per month" value={revenueInputs.quoteableOpportunities} min={10} max={600} step={5} onChange={e => setRevenueInputs({ ...revenueInputs, quoteableOpportunities: Number(e.target.value) })} />
            <Slider label="Conversion rate" value={revenueInputs.conversionRate} min={1} max={60} step={1} suffix="%" onChange={e => setRevenueInputs({ ...revenueInputs, conversionRate: Number(e.target.value) })} />
            <Slider label="Average order value (HKD)" value={revenueInputs.averageOrderValue} min={20000} max={300000} step={5000} onChange={e => setRevenueInputs({ ...revenueInputs, averageOrderValue: Number(e.target.value) })} />
            <div style={{ borderTop: `0.5px solid ${border}`, paddingTop: 16, marginTop: 4 }}>
              <div style={{ fontSize: 10, letterSpacing: '2px', color: slate, textTransform: 'uppercase', marginBottom: 10 }}>Assumptions</div>
              <AssumptionNote>Quote prep drops from 30 to 10 minutes — 3× capacity for the same team.</AssumptionNote>
              <AssumptionNote>Projected quotations = lower of theoretical capacity or quoteable opportunities.</AssumptionNote>
              <AssumptionNote>Conversion rate and order value stay constant. Scenario model only.</AssumptionNote>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <CapIndicator current={revenueInputs.currentQuotationsPerMonth} theoretical={revenue.theoreticalCapacity} demand={revenueInputs.quoteableOpportunities} />
            <div className="db-result-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <ResultCard label="Current monthly revenue" value={currency(revenue.curRev)} sub={`${fmt(revenueInputs.currentQuotationsPerMonth, 0)} quotations`} />
              <ResultCard label="Projected monthly revenue" value={currency(revenue.projRev)} sub={`${fmt(revenue.projectedQuotations, 0)} quotations`} accent={!revenue.isCapConstrained} />
            </div>
            <ResultCard label="Additional monthly revenue" value={currency(revenue.addedRev)} sub={revenue.isCapConstrained ? `3× capacity vs ${fmt(revenueInputs.quoteableOpportunities, 0)} opportunities` : `Capped at ${fmt(revenueInputs.quoteableOpportunities, 0)} opportunities`} highlight />
          </div>
        </div>
      )}
    </div>
  );
}
