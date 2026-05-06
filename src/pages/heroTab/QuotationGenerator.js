import React, { useState, useEffect } from 'react';
import TypingText, { DelayedVisible } from '../../components/TypingText';

const sendEmailPulse = `
  @keyframes sendEmailPulse {
    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37,99,235,0.5); }
    50% { transform: scale(1.05); box-shadow: 0 0 0 6px rgba(37,99,235,0); }
  }
`;

export function QuotationGeneratorUpload() {
  return (
    <p style={{ margin: '0 0 10px', fontSize: 11, color: '#6b7280', lineHeight: 1.5 }}>
      No file required — type your product ID, markup, and any notes directly in the input field.
    </p>
  );
}

function DelayedRow({ delay, animate, children, style }) {
  const [visible, setVisible] = useState(!animate || delay === 0);
  useEffect(() => {
    if (!animate) { setVisible(true); return; }
    setVisible(delay === 0);
    if (delay === 0) return;
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay, animate]); // eslint-disable-line
  return <tr style={{ ...style, opacity: visible ? 1 : 0, transition: 'opacity 0.15s ease' }}>{children}</tr>;
}

const thStyle = { padding: '6px 10px', fontSize: 10, fontWeight: 600, color: '#6b7280', textAlign: 'left', background: '#f3f4f6', borderBottom: '1px solid #e5e7eb' };
const tdStyle = { padding: '6px 10px', fontSize: 11, color: '#374151' };

function ProductFoundCard({ item, animate }) {
  const p = item.product;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{ margin: 0, fontSize: 14, color: '#374151' }}>
        <TypingText text={item.description} animate={animate} delay={0} />
      </p>
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', background: 'white' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr' }}>
          <DelayedVisible delay={item.description.length * 5} animate={animate} style={{ overflow: 'hidden', borderRight: '1px solid #e5e7eb' }}>
            <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </DelayedVisible>
          <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 12, color: '#111827' }}>
              <TypingText text={p.name} animate={animate} delay={item.description.length * 5} />
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              <div>
                <span style={{ fontSize: 9, fontWeight: 600, color: '#6b7280', display: 'block' }}>PRICE</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#049669' }}>
                  <TypingText text={p.price} animate={animate} delay={item.description.length * 5} />
                </span>
              </div>
              <div>
                <span style={{ fontSize: 9, fontWeight: 600, color: '#6b7280', display: 'block' }}>MOQ</span>
                <span style={{ fontSize: 11, color: '#374151' }}>
                  <TypingText text={p.moq} animate={animate} delay={item.description.length * 5} />
                </span>
              </div>
            </div>
            <div>
              <span style={{ fontSize: 9, fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: 2 }}>SPECIFICATIONS</span>
              {p.specifications.map((s, i) => (
                <div key={i} style={{ fontSize: 10, color: '#374151', lineHeight: 1.6 }}>
                  — <TypingText text={s} animate={animate} delay={(item.description.length + p.name.length + p.price.length + p.moq.length + p.specifications.slice(0, i).join('').length) * 5} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 2 }}>
              {p.certificates.map((c, i) => (
                <span key={i} style={{ fontSize: 9, fontWeight: 600, padding: '2px 6px', borderRadius: 4, background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' }}>
                  <TypingText text={c} animate={animate} delay={(item.description.length + p.name.length + p.price.length + p.moq.length + p.specifications.join('').length) * 5} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomerListCard({ item, animate }) {
  const descDelay = 0;
  let runningDelay = animate ? item.description.length * 5 : 0;
  const rowDelays = item.customers.map(c => {
    const d = runningDelay;
    runningDelay += (c.company.length + c.contact.length + c.markup.length) * 5;
    return d;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{ margin: 0, fontSize: 12, color: '#374151' }}>
        <TypingText text={item.description} animate={animate} delay={descDelay} />
      </p>
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Company Name</th>
              <th style={thStyle}>Contact Person</th>
              <th style={thStyle}>Markup</th>
            </tr>
          </thead>
          <tbody>
            {item.customers.map((c, i) => (
              <DelayedRow key={i} delay={rowDelays[i]} animate={animate} style={{ borderBottom: i < item.customers.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                <td style={tdStyle}><TypingText text={c.company} animate={animate} delay={rowDelays[i]} /></td>
                <td style={tdStyle}><TypingText text={c.contact} animate={animate} delay={rowDelays[i]} /></td>
                <td style={{ ...tdStyle, fontWeight: 600, color: '#1fc9ed' }}><TypingText text={c.markup} animate={animate} delay={rowDelays[i]} /></td>
              </DelayedRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const previewEmails = ['julia.bauer@cleanhome.de'];
const checks = ['Recipient added', 'Subject is present', 'Message body is present', 'Sender account selected'];

function EmailDraftCard({ item, animate, onSend }) {
  const [sent, setSent] = useState(false);

  const handleSendEmail = () => {
    setSent(true);
    if (onSend) {
      const summaryDuration = item.summary.reduce(
        (acc, r) => acc + (r.company.length + r.contact.length + r.markup.length) * 5, 0
      ) + 400;
      setTimeout(onSend, summaryDuration);
    }
  };

  if (sent) {
    let runningDelay = 0;
    const rowDelays = item.summary.map(r => {
      const d = runningDelay;
      runningDelay += (r.company.length + r.contact.length + r.markup.length) * 5;
      return d;
    });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <i className="fas fa-check-circle" style={{ color: '#22c55e', fontSize: 13 }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>
            <TypingText text={`Emails sent to ${item.sentTo} customers.`} animate={animate} delay={0} />
          </span>
        </div>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Company</th>
                <th style={thStyle}>Contact</th>
                <th style={thStyle}>Markup</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {item.summary.map((r, i) => (
                <DelayedRow key={i} delay={rowDelays[i]} animate={animate} style={{ borderBottom: i < item.summary.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                  <td style={tdStyle}><TypingText text={r.company} animate={animate} delay={rowDelays[i]} /></td>
                  <td style={tdStyle}><TypingText text={r.contact} animate={animate} delay={rowDelays[i]} /></td>
                  <td style={{ ...tdStyle, fontWeight: 600, color: '#1fc9ed' }}><TypingText text={r.markup} animate={animate} delay={rowDelays[i]} /></td>
                  <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 600 }}><TypingText text={r.status} animate={animate} delay={rowDelays[i]} /></td>
                </DelayedRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const extraCount = item.sentTo - previewEmails.length;
  const subjectDelay = 0;
  const bodyDelay = item.subject.length * 5;

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', background: 'white', fontSize: 11 }}>

      {/* Header */}
      <div style={{ background: '#2563eb', color: 'white', padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <i className="fas fa-envelope" style={{ fontSize: 11 }} />
            <span style={{ fontWeight: 700, fontSize: 12, letterSpacing: '0.1px' }}>Drafted Email</span>
          </div>
        </div>
      </div>

      {/* To field */}
      <div style={{ padding: '8px 14px', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
          <i className="fas fa-envelope" style={{ fontSize: 9, color: '#6b7280' }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#374151' }}>To</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center' }}>
          {previewEmails.map((email, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 20, padding: '2px 8px', fontSize: 10, color: '#1d4ed8' }}>
              {email}
              <i className="fas fa-times-circle" style={{ fontSize: 9, color: '#93c5fd', cursor: 'pointer' }} />
            </span>
          ))}
          {extraCount > 0 && (
            <span style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic' }}>+{extraCount} more</span>
          )}
        </div>
      </div>

      {/* Add CC row */}
      <div style={{ padding: '5px 14px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button style={{ fontSize: 10, color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
          <i className="fas fa-plus" style={{ fontSize: 9 }} /> Add CC
        </button>
        <span style={{ fontSize: 9, color: '#9ca3af' }}>Optional recipient fields</span>
      </div>

      {/* From + Subject */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ padding: '7px 14px', borderRight: '1px solid #f3f4f6' }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: '#6b7280', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 4 }}>
            <i className="fas fa-user" /> From
          </div>
          <span style={{ fontSize: 10, color: '#374151' }}>sourcing@deepbridge.com (Private) — Primary</span>
        </div>
        <div style={{ padding: '7px 14px' }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: '#6b7280', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 4 }}>
            <i className="fas fa-tag" /> Subject
          </div>
          <span style={{ fontSize: 10, color: '#374151' }}>
            <TypingText text={item.subject} animate={animate} delay={subjectDelay} />
          </span>
        </div>
      </div>

      {/* Message header */}
      <div style={{ padding: '6px 14px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <i className="fas fa-file-alt" style={{ fontSize: 10, color: '#6b7280' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#111827' }}>Message</span>
        </div>
        <button style={{ fontSize: 10, color: '#374151', background: 'white', border: '1px solid #d1d5db', borderRadius: 5, padding: '2px 9px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
          <i className="fas fa-eye" style={{ fontSize: 9 }} /> Preview
        </button>
      </div>

      {/* Toolbar */}
      <div style={{ padding: '5px 14px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: 5, background: '#f9fafb', flexWrap: 'wrap' }}>
        {[['B', 700, false, false], ['I', 400, true, false], ['U', 400, false, true]].map(([lbl, fw, italic, underline]) => (
          <button key={lbl} style={{ width: 22, height: 22, fontSize: 11, fontWeight: fw, fontStyle: italic ? 'italic' : 'normal', textDecoration: underline ? 'underline' : 'none', background: 'white', border: '1px solid #e5e7eb', borderRadius: 3, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#374151' }}>{lbl}</button>
        ))}
        <div style={{ height: 14, width: 1, background: '#e5e7eb' }} />
        <span style={{ fontSize: 9, color: '#6b7280' }}>Size</span>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 3, padding: '1px 7px', fontSize: 10, background: 'white', color: '#374151' }}>14</div>
        <div style={{ height: 14, width: 1, background: '#e5e7eb' }} />
        <span style={{ fontSize: 9, color: '#6b7280' }}>Color</span>
        <div style={{ width: 14, height: 14, background: '#111827', borderRadius: 3, border: '1px solid #d1d5db', cursor: 'pointer' }} />
        <div style={{ height: 14, width: 1, background: '#e5e7eb' }} />
        <i className="fas fa-image" style={{ fontSize: 12, color: '#6b7280', cursor: 'pointer' }} />
        <div style={{ height: 14, width: 1, background: '#e5e7eb' }} />
        <button style={{ fontSize: 9, color: '#2563eb', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 4, padding: '2px 7px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}>
          <i className="fas fa-link" style={{ fontSize: 8 }} /> Link
        </button>
        <button style={{ fontSize: 9, color: '#2563eb', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 4, padding: '2px 7px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}>
          <i className="fas fa-image" style={{ fontSize: 8 }} /> Image
        </button>
      </div>

      {/* Message body */}
      <div style={{ padding: '10px 14px' }}>
        <p style={{ margin: 0, fontSize: 11, color: '#374151', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
          <TypingText text={item.preview} animate={animate} delay={bodyDelay} />
        </p>
      </div>

      {/* Loaded saved draft status */}
      <div style={{ padding: '4px 14px', background: '#f9fafb', borderTop: '1px solid #f3f4f6' }}>
        <span style={{ fontSize: 9, color: '#16a34a', display: 'flex', alignItems: 'center', gap: 4 }}>
          <i className="fas fa-circle" style={{ fontSize: 6 }} /> Loaded saved draft
        </span>
      </div>

      {/* Checklist */}
      <div style={{ padding: '8px 14px', borderTop: '1px solid #f3f4f6', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 8px' }}>
        {checks.map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: '#374151' }}>
            <i className="fas fa-check-circle" style={{ color: '#22c55e', fontSize: 11 }} />
            {c}
          </div>
        ))}
      </div>

      {/* Bottom actions */}
      <style>{sendEmailPulse}</style>
    <div style={{ padding: '8px 14px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button style={{ fontSize: 11, fontWeight: 600, color: '#dc2626', background: 'white', border: '1px solid #fca5a5', borderRadius: 6, padding: '5px 13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
          <i className="fas fa-trash-alt" style={{ fontSize: 9 }} /> Discard
        </button>
        <div style={{ display: 'flex', gap: 16 }}>
          <button style={{ fontSize: 11, fontWeight: 600, color: '#374151', background: 'white', border: '1px solid #d1d5db', borderRadius: 6, padding: '5px 13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
            <i className="fas fa-save" style={{ fontSize: 9 }} /> Save to Draft
          </button>
          <button
            onClick={handleSendEmail}
            style={{ fontSize: 11, fontWeight: 700, color: 'white', background: '#2563eb', border: 'none', borderRadius: 6, padding: '5px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, animation: 'sendEmailPulse 1.4s ease-in-out infinite' }}>
            <i className="fas fa-paper-plane" style={{ fontSize: 9 }} /> Send Email
          </button>
        </div>
      </div>

    </div>
  );
}

export default function QuotationGeneratorOutput({ output, animate = false, onEmailSent }) {
  if (!output || output.length === 0)
    return <span style={{ color: '#6b7280', fontSize: 12 }}>No output available yet.</span>;

  const item = output[0];

  if (item?.type === 'productFound')
    return <ProductFoundCard item={item} animate={animate} />;

  if (item?.type === 'customerList')
    return <CustomerListCard item={item} animate={animate} />;

  if (item?.type === 'markupSaved')
    return (
      <p style={{ margin: 0, fontSize: 12, color: '#374151', display: 'flex', alignItems: 'center', gap: 6 }}>
        <i className="fas fa-check-circle" style={{ color: '#22c55e', fontSize: 13 }} />
        <TypingText text={item.description} animate={animate} delay={0} />
      </p>
    );

  if (item?.type === 'emailDraft')
    return <EmailDraftCard item={item} animate={animate} onSend={onEmailSent} />;

  // existing description + lineItems flow (used by Priya, Ethan, Chloe)
  const description = item?.description;
  const lineItems = item?.lineItems ?? [];
  const total = item?.total;

  let runningDelay = animate ? (description?.length ?? 0) * 5 : 0;
  const itemDelays = lineItems.map(it => {
    const d = runningDelay;
    runningDelay += (String(it.name).length + String(it.qty).length + String(it.price).length) * 5;
    return d;
  });
  const totalDelay = runningDelay;

  if (description && lineItems.length === 0)
    return <p style={{ margin: 0, fontSize: 12, color: '#374151' }}><TypingText text={description} animate={animate} delay={0} /></p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {description && <p style={{ margin: 0, fontSize: 12, color: '#374151' }}><TypingText text={description} animate={animate} delay={0} /></p>}
      {lineItems.length > 0 && (
        <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', padding: '6px 10px', background: '#f3f4f6', borderBottom: '1px solid #e5e7eb', fontSize: 11, fontWeight: 600, color: '#6b7280', gap: 12 }}>
            <span>Item</span><span>Qty</span><span>Price</span>
          </div>
          {lineItems.map((it, i) => (
            <DelayedVisible key={i} delay={itemDelays[i]} animate={animate} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', padding: '6px 10px', fontSize: 11, color: '#374151', borderBottom: i < lineItems.length - 1 ? '1px solid #f3f4f6' : 'none', gap: 12 }}>
              <span><TypingText text={it.name} animate={animate} delay={itemDelays[i]} /></span>
              <span><TypingText text={String(it.qty)} animate={animate} delay={itemDelays[i]} /></span>
              <span><TypingText text={it.price} animate={animate} delay={itemDelays[i]} /></span>
            </DelayedVisible>
          ))}
          {total && (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', borderTop: '1px solid #e5e7eb', fontSize: 12, fontWeight: 600, color: '#111827' }}>
              <span>Total</span><span><TypingText text={total} animate={animate} delay={totalDelay} /></span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
