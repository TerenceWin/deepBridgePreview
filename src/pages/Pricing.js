import React, { useState } from 'react';

import PageHero from '../components/PageHero';
import ImpactCalculator from '../components/ImpactCalculator';
import DemoModal from '../components/DemoModal';
import { useMaxWidth, SECTION_PAD, SECTION_PAD_SM } from '../components/layout';

const sky = '#29ABE2';
const navy = '#0A2540';
const slate = '#5A6E85';
const border = '#E2DED6';
const surface = '#F2F0EB';
const BADGE_H = 36;

const plans = [
  { num: '01', title: 'Standard', tagline: 'Built-in workflows for day-to-day exporter operations.', price: 'From HKD 6,000 onwards', period: 'per enterprise / month', featured: false, bestFor: ['Teams with relatively clean workflows', 'Companies that want to get started quickly', 'Exporters looking for immediate efficiency gains'], includesLabel: 'Includes', includes: ['Quotation workflow tools', 'Risk and document flagging', 'Supplier memory and factory finder', 'Catalog and brochure generation', 'Standard onboarding', 'Monthly support'], cta: 'Book a demo', ctaStyle: 'outline' },
  { num: '02', title: 'Custom Onboarding', tagline: 'For teams with messy data and more complex workflows.', price: 'Custom', period: 'setup fee + monthly plan', featured: true, bestFor: ['Teams with messy email history', 'Businesses with inconsistent product and supplier data', 'Exporters using multiple channels and disconnected files'], includesLabel: 'Includes', includes: ['Everything in Standard', 'Workflow mapping', 'Inbox and file review', 'Data cleanup and structuring support', 'Tailored onboarding', 'Closer implementation support'], cta: 'Talk to us', ctaStyle: 'primary' },
  { num: '03', title: 'Custom Modules', tagline: 'New capabilities built around your specific workflow.', price: 'Custom', period: 'scope and pricing', featured: false, bestFor: ['Companies with highly specific requirements', 'Teams that want custom workflows', 'Businesses looking for a longer-term technology partner'], includesLabel: 'Examples', includes: ['Custom quotation logic', 'Document and certificate workflows', 'Supplier intelligence tools', 'Industry-specific dashboards', 'Trade finance and sourcing modules'], cta: 'Discuss a build', ctaStyle: 'dark' },
];

function Card({ plan, onDemo }) {
  const ctaBg = plan.ctaStyle === 'primary' ? sky : plan.ctaStyle === 'dark' ? navy : 'transparent';
  const ctaColor = plan.ctaStyle === 'outline' ? navy : 'white';
  const ctaBorder = plan.ctaStyle === 'outline' ? `1.5px solid ${navy}` : 'none';
  return (
    <div style={{ background: 'white', border: plan.featured ? `1.5px solid ${sky}` : `0.5px solid ${border}`, borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: BADGE_H, background: plan.featured ? sky : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {plan.featured && <span style={{ color: 'white', fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 500 }}>Recommended</span>}
      </div>
      <div style={{ padding: '20px 24px 16px', borderBottom: `0.5px solid ${border}` }}>
        <div style={{ fontSize: 10, letterSpacing: 2, color: sky, textTransform: 'uppercase', marginBottom: 8, fontWeight: 500 }}>{plan.num}</div>
        <div style={{ fontSize: 20, fontWeight: 500, color: navy, marginBottom: 6 }}>{plan.title}</div>
        <div style={{ fontSize: 13, color: slate, lineHeight: 1.6, marginBottom: 16 }}>{plan.tagline}</div>
        <div><span style={{ fontSize: 18, fontWeight: 500, color: navy }}>{plan.price}</span><span style={{ fontSize: 12, color: slate, marginLeft: 6, display: 'block', marginTop: 2 }}>{plan.period}</span></div>
      </div>
      <div style={{ padding: '18px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 10, letterSpacing: 2, color: slate, textTransform: 'uppercase', marginBottom: 10 }}>Best for</div>
        <ul style={{ listStyle: 'none', marginBottom: 18 }}>{plan.bestFor.map((item, i) => (<li key={i} style={{ fontSize: 13, color: slate, lineHeight: 1.7, padding: '4px 0 4px 16px', position: 'relative', borderBottom: '0.5px solid #f0f0ec' }}><span style={{ position: 'absolute', left: 0, top: 11, width: 5, height: 5, borderRadius: '50%', background: sky, opacity: 0.5, display: 'inline-block' }} />{item}</li>))}</ul>
        <div style={{ fontSize: 10, letterSpacing: 2, color: slate, textTransform: 'uppercase', marginBottom: 10 }}>{plan.includesLabel}</div>
        <ul style={{ listStyle: 'none', marginBottom: 18, flex: 1 }}>{plan.includes.map((item, i) => (<li key={i} style={{ fontSize: 13, color: slate, lineHeight: 1.7, padding: '4px 0 4px 16px', position: 'relative', borderBottom: '0.5px solid #f0f0ec' }}><span style={{ position: 'absolute', left: 0, top: 12, width: 4, height: 4, borderRadius: 1, background: navy, display: 'inline-block' }} />{item}</li>))}</ul>
        <button onClick={onDemo} style={{ display: 'block', width: '100%', padding: '12px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', background: ctaBg, color: ctaColor, border: ctaBorder }}>{plan.cta}</button>
      </div>
    </div>
  );
}

export default function Pricing() {
  const maxWidth = useMaxWidth();
  const [modal, setModal] = useState(false);
  return (
    <div style={{ background: '#F7F5F0' }}>
      <DemoModal isOpen={modal} onClose={() => setModal(false)} />
      <PageHero label="Pricing" title="Choose the setup that fits your workflow" subtitle="Whether you want to start with standard tools, need help with messy data, or want custom modules, Deep Bridge adapts to the way your business works." dark />
      <div style={{ background: surface }}>
        <div className="db-section" style={{ maxWidth: maxWidth, margin: '0 auto', padding: SECTION_PAD }}>
          <div className="db-pricing-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, alignItems: 'stretch' }}>
            {plans.map((plan, i) => <Card key={i} plan={plan} onDemo={() => setModal(true)} />)}
          </div>
        </div>
      </div>
      <div style={{ background: 'white', borderTop: `0.5px solid ${border}`, borderBottom: `0.5px solid ${border}` }}>
        <div className="db-section" style={{ maxWidth: maxWidth, margin: '0 auto', padding: SECTION_PAD }}>
          <ImpactCalculator onDemo={() => setModal(true)} />
        </div>
      </div>
      <div style={{ background: surface }}>
        <div className="db-section-sm" style={{ maxWidth: maxWidth, margin: '0 auto', padding: SECTION_PAD_SM }}>
          <div style={{ background: navy, borderRadius: 14, padding: '36px 44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 16, color: 'white', fontWeight: 400, marginBottom: 6 }}>Not sure which plan fits?</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>Most teams start with a 30-minute demo using their own data.</div>
            </div>
            <button onClick={() => setModal(true)} style={{ background: sky, color: 'white', border: 'none', borderRadius: 8, padding: '13px 28px', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>Book a demo</button>
          </div>
        </div>
      </div>
    </div>
  );
}
