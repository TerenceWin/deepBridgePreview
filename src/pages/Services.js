import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { MAX_WIDTH, SECTION_PAD, SECTION_PAD_SM } from '../components/layout';

const sky = '#29ABE2';
const navy = '#0A2540';
const slate = '#5A6E85';
const border = '#E2DED6';
const surface = '#F2F0EB';

const services = [
  { num: '01', title: 'Quotation Workflow', problem: 'Quotation prep is slow and fragmented across inboxes and spreadsheets.', text: 'Move from buyer enquiry to supplier coordination to customer-ready quotation with less manual work. Deep Bridge helps structure requests, gather supplier inputs, and make preparation faster.' },
  { num: '02', title: 'Risk Flags', problem: 'Certificate and compliance gaps show up too late and cost deals.', text: 'Catch certificate, compliance, and documentation gaps early. Deep Bridge surfaces missing information and inconsistencies before they slow down deals or create problems with customers.' },
  { num: '03', title: 'Supplier Memory', problem: 'Useful supplier information is buried in old emails and attachments.', text: 'Search past supplier emails, attachments, and product offers instantly. If a factory has shared something similar before, Deep Bridge helps you find it without digging through inboxes.' },
  { num: '04', title: 'Factory Finder', problem: 'Sourcing knowledge sits in peoples heads, not in systems.', text: 'Identify relevant factories from old emails, product descriptions, or images. Deep Bridge helps teams reuse past sourcing knowledge and uncover which suppliers may already provide similar products.' },
  { num: '05', title: 'Catalog and Brochure Generation', problem: 'Creating customer-facing materials takes too long and too much back and forth.', text: 'Turn existing product information into customer-facing materials faster. Deep Bridge helps create catalogs, brochures, and product summaries with less manual formatting.' },
  { num: '06', title: 'Opportunity Visibility', problem: 'Important enquiries get lost in the noise of daily operations.', text: 'See which enquiries, offers, and accounts deserve attention first. Deep Bridge helps teams spot stronger opportunities and focus on higher value work.' },
];

const coming = [
  { title: 'Trade Finance Support', text: 'Tools to help teams think through payment terms, financing options, and commercial risk more clearly.' },
  { title: 'Supplier Information Network', text: 'A growing layer of supplier knowledge to help teams find relevant factories, compare past activity, and make sourcing decisions with more context.' },
];

export default function Services() {
  return (
    <div style={{ background: '#F7F5F0' }}>
      <PageHero label="Services" title="Core workflows for export teams" subtitle="Six tools built around how export teams actually work, from first enquiry to final follow-up." dark />
      <div style={{ background: 'white' }}>
        <div style={{ maxWidth: MAX_WIDTH, margin: '0 auto', padding: SECTION_PAD }}>
          <div style={{ fontSize: 10, letterSpacing: '2.5px', color: sky, textTransform: 'uppercase', marginBottom: 32 }}>Core workflows</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: border, borderRadius: 12, overflow: 'hidden' }}>
            {services.map((s, i) => (
              <div key={i} className="db-svc-row" style={{ background: 'white', padding: '28px 32px', display: 'grid', gridTemplateColumns: '72px 1fr 1fr', gap: 32, alignItems: 'start' }}>
                <div style={{ fontSize: 11, letterSpacing: 2, color: sky, textTransform: 'uppercase', fontWeight: 500, paddingTop: 3 }}>{s.num}</div>
                <div><div style={{ fontSize: 16, fontWeight: 500, color: navy, marginBottom: 8, letterSpacing: '-0.02em' }}>{s.title}</div><div style={{ fontSize: 13, color: sky, lineHeight: 1.6, fontStyle: 'italic' }}>{s.problem}</div></div>
                <div style={{ fontSize: 14, color: slate, lineHeight: 1.8 }}>{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ background: surface }}>
        <div style={{ maxWidth: MAX_WIDTH, margin: '0 auto', padding: SECTION_PAD_SM }}>
          <div style={{ fontSize: 10, letterSpacing: '2.5px', color: '#8A9BB0', textTransform: 'uppercase', marginBottom: 28 }}>Coming soon</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {coming.map((c, i) => (
              <div key={i} style={{ background: 'white', border: `0.5px dashed ${border}`, borderRadius: 12, padding: '28px' }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: navy, marginBottom: 10 }}>{c.title}</div>
                <div style={{ fontSize: 14, color: slate, lineHeight: 1.8 }}>{c.text}</div>
                <div style={{ marginTop: 14, fontSize: 10, color: '#8A9BB0', letterSpacing: '1.5px', textTransform: 'uppercase' }}>In development</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ background: navy, padding: '72px 72px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, fontWeight: 500, color: 'white', marginBottom: 14, letterSpacing: '-0.03em' }}>See these tools with your own data</h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', maxWidth: 380, margin: '0 auto 32px', lineHeight: 1.7 }}>A 30-minute demo using real examples from your workflow.</p>
        <Link to="/pricing" style={{ display: 'inline-block', background: sky, color: 'white', borderRadius: 8, padding: '13px 28px', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>View pricing</Link>
      </div>
    </div>
  );
}
