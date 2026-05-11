import React, { useState, useEffect, useMemo } from 'react';
import TypingText, { DelayedVisible } from '../../components/TypingText';
import handleFilesPicture1 from '../../images/heroSection/handleFiles/handleFilesPicture1.png';
import { EmailDraftCard } from './QuotationGenerator.js';

// ─────────────────────────────────────────
// Constants
// ─────────────────────────────────────────
const SPEED = 5; // ms per character

const NOTE_TEXT =
  'Save the document once to enable image controls (Display / Brochure / Packaging / AI Enhance).';

const fileImageMap = {
  'Product #12345.pptx': handleFilesPicture1,
};

// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────

/** Characters × SPEED for a label + value pair */
function fieldDur(label, value) {
  return (label.length + String(value ?? '—').length) * SPEED;
}

/**
 * Computes cumulative start-delays for every text element in the card.
 * Section 1 fields run sequentially.
 * Section 2 left + right columns run in parallel (each column sequential within itself).
 * Returns { d (delay map), s1End, totalDuration }.
 */
function computeDelays(fileData, usersCount = 0) {
  const containerStr = Object.entries(fileData.containerQty || {})
    .map(([, v]) => v.toLocaleString())
    .join('/');

  let t = 0;
  const d = {};

  // ── Section 1 (sequential) ──────────────────────────────
  d.fileName = t; t += fieldDur('File Name', fileData.fileName);
  d.summary  = t; t += fieldDur('Summary',   fileData.summary);
  d.remarks  = t; t += fieldDur('Remarks',   fileData.remarks);

  if (usersCount > 0) {
    d.sharedWith      = t; t += 'Shared with'.length * SPEED;
    d.sharedWithCount = t; t += `${usersCount} of ${usersCount} users have been shared`.length * SPEED;
    t += 100;
  }

  const s1End = t;

  // ── Section 2 — Left column (sequential, parallel with right) ──
  // Starts at t=0 in parallel with section 1 (no waiting for s1 to finish)
  let tL = 0;

  d.name          = tL; tL += fieldDur('Name', fileData.productName);
  d.featuresLabel = tL; tL += 'Features'.length * SPEED;
  d.features = [];
  (fileData.features || []).forEach(f => { d.features.push(tL); tL += f.length * SPEED; });

  d.specsLabel = tL; tL += 'Specifications'.length * SPEED;
  d.specs = [];
  (fileData.specificationsList || []).forEach(s => { d.specs.push(tL); tL += s.length * SPEED; });

  d.deliveryDays       = tL; tL += fieldDur('Delivery Days',         `${fileData.deliveryDays} Days`);
  d.unitSize           = tL; tL += fieldDur('Unit Size',             fileData.packaging?.unitSize);
  d.unitWeight         = tL; tL += fieldDur('Unit Weight',           fileData.packaging?.unitWeight);
  d.exportCartonSize   = tL; tL += fieldDur('Export Carton Size',    fileData.packaging?.exportCartonSize);
  d.exportCartonWeight = tL; tL += fieldDur('Export Carton Weight',  fileData.packaging?.exportCartonWeight);
  d.colourBoxSize      = tL; tL += fieldDur('Colour Box Size',       fileData.packaging?.colourBoxSize);
  d.qtyPerCarton       = tL; tL += fieldDur('Quantity Per Carton',   fileData.packaging?.qtyPerCarton);
  d.containerQty       = tL; tL += fieldDur('Quantity Per Container', containerStr);
  d.hscode             = tL; tL += fieldDur('HS Code',               fileData.hscode);
  d.certificates       = tL; tL += fieldDur('Certificates',         (fileData.certificates || []).join(' / '));

  // ── Section 2 — Right column (sequential, parallel with left) ──
  let tR = 0;

  d.supplierName  = tR; tR += fieldDur('Supplier Name',         fileData.supplierName);
  d.supplierCode  = tR; tR += fieldDur('Supplier Product Code', fileData.supplierProductCode);
  d.quotationDate = tR; tR += fieldDur('Quotation Date',        fileData.quotationDate);
  d.validFor      = tR; tR += fieldDur('Valid For (days)',       fileData.validForDays);
  d.productClass  = tR; tR += fieldDur('Product Class',         fileData.productClass);
  d.productStatus = tR; tR += fieldDur('Production Status',     fileData.productStatus);
  d.images        = tR; tR += ('Images'.length + NOTE_TEXT.length) * SPEED;
  d.fobPrice      = tR; tR += fieldDur('Fob Unit Price',        `USD ${fileData.unitPriceUSD}`);

  const totalDuration = Math.max(tL, tR, s1End) + 300;

  return { d, s1End, totalDuration };
}

/** Exported so HeroSection can pass the correct duration to startAiTyping */
export function computeFileDetailsDuration(fileData, usersCount = 4) {
  return computeDelays(fileData, usersCount).totalDuration;
}

// ─────────────────────────────────────────
// Hook — mount a component after `delay` ms
// ─────────────────────────────────────────
function useDelayedMount(animate, delay) {
  const [mounted, setMounted] = useState(!animate);
  useEffect(() => {
    if (!animate) { setMounted(true); return; }
    setMounted(false);
    const t = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(t);
  }, [animate, delay]); // eslint-disable-line
  return mounted;
}

// ─────────────────────────────────────────
// FieldRow
// Mounts at `delay`, then types label → value sequentially.
// Returns null until mounted so the parent's height grows naturally.
// ─────────────────────────────────────────
function FieldRow({ label, value, animate = false, delay = 0 }) {
  const mounted = useDelayedMount(animate, delay);
  if (!mounted) return null;

  const displayValue = value ?? '—';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 6 }}>
      <span style={{ fontSize: 10, fontWeight: 600, color: '#6b7280' }}>
        {animate
          ? <TypingText text={label} animate speed={SPEED} />
          : label}
      </span>
      <span style={{ fontSize: 11, color: '#374151', lineHeight: 1.4 }}>
        {animate
          ? <TypingText text={String(displayValue)} animate delay={label.length * SPEED} speed={SPEED} />
          : displayValue}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────
// AnimatedLabel  (section headings like "Features")
// ─────────────────────────────────────────
function AnimatedLabel({ text, animate = false, delay = 0 }) {
  const mounted = useDelayedMount(animate, delay);
  if (!mounted) return null;
  return (
    <span style={{ fontSize: 10, fontWeight: 600, color: '#6b7280' }}>
      {animate ? <TypingText text={text} animate speed={SPEED} /> : text}
    </span>
  );
}

// ─────────────────────────────────────────
// AnimatedListItem  ("— feature text")
// ─────────────────────────────────────────
function AnimatedListItem({ text, animate = false, delay = 0 }) {
  const mounted = useDelayedMount(animate, delay);
  if (!mounted) return null;
  return (
    <div style={{ fontSize: 11, color: '#374151', lineHeight: 1.5 }}>
      {'— '}
      {animate ? <TypingText text={text} animate speed={SPEED} /> : text}
    </div>
  );
}

// ─────────────────────────────────────────
// AnimatedImagesSection
// ─────────────────────────────────────────
function AnimatedImagesSection({ src, alt, animate = false, delay = 0 }) {
  const mounted = useDelayedMount(animate, delay);
  if (!mounted) return null;

  const LABEL = 'Images';
  return (
    <div style={{ marginBottom: 6 }}>
      <span style={{ fontSize: 10, fontWeight: 600, color: '#6b7280' }}>
        {animate ? <TypingText text={LABEL} animate speed={SPEED} /> : LABEL}
      </span>
      <div style={{
        marginTop: 4, width: '100%', borderRadius: 6, overflow: 'hidden',
        border: '1px solid #e5e7eb', display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}>
        <img src={src} alt={alt} style={{ maxWidth: 420, height: 300, objectFit: 'cover' }} />
      </div>
      <div style={{ fontSize: 9, color: '#9ca3af', marginTop: 4, lineHeight: 1.4 }}>
        {animate
          ? <TypingText text={NOTE_TEXT} animate delay={LABEL.length * SPEED} speed={SPEED} />
          : NOTE_TEXT}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// AnimatedSharedWith
// ─────────────────────────────────────────
function AnimatedSharedWith({ users, animate = false, delay = 0, countDelay = 0 }) {
  const mounted = useDelayedMount(animate, delay);
  if (!mounted) return null;

  const countText = `${users.length} of ${users.length} users have been shared`;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4, paddingTop: 8, borderTop: '1px solid #f3f4f6' }}>
      <span style={{ fontSize: 10, fontWeight: 600, color: '#6b7280' }}>
        {animate ? <TypingText text="Shared with" animate speed={SPEED} /> : 'Shared with'}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {users.map((u, i) => {
          const initials = u.name.split(' ').map(w => w[0]).join('');
          return (
            <div key={i} title={u.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div style={{ position: 'relative', width: 28, height: 28 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: u.color + '22', border: `2px solid ${u.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: u.color }}>{initials}</span>
                </div>
                <div style={{ position: 'absolute', bottom: -2, right: -2, width: 10, height: 10, borderRadius: '50%', background: '#22c55e', border: '1.5px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-check" style={{ fontSize: 5, color: 'white' }} />
                </div>
              </div>
              <span style={{ fontSize: 8, color: u.color, fontWeight: 600 }}>{initials}</span>
            </div>
          );
        })}
      </div>
      <span style={{ fontSize: 9, color: '#9ca3af' }}>
        {animate
          ? <TypingText text={countText} animate delay={countDelay} speed={SPEED} />
          : countText}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────
// SEVERITY map (for RiskFlags, unchanged)
// ─────────────────────────────────────────
const SEVERITY = {
  critical: { color: '#e02f3e', bg: '#fff5f5', icon: 'fas fa-exclamation-circle' },
  warning:  { color: '#d97706', bg: '#fffbeb', icon: 'fas fa-exclamation-triangle' },
  clear:    { color: '#049669', bg: '#f0fdf4', icon: 'fas fa-check-circle' },
};

// ─────────────────────────────────────────
// FileDetailCard
// ─────────────────────────────────────────
function FileDetailCard({ fileData, onSave, users = [], userStages = {}, animate = false }) {
  const [minimized, setMinimized] = useState(false);

  const containerStr = Object.entries(fileData.containerQty || {})
    .map(([, v]) => v.toLocaleString())
    .join('/');

  // Compute all delays once (stable as long as fileData/users don't change)
  const { d, s1End } = useMemo(
    () => computeDelays(fileData, users.length),
    [fileData, users.length], // eslint-disable-line
  );

  // Section 2 renders immediately; fields inside mount at their own delays

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 11, width: '100%' }}>

      {/* ── Section 1: Header card ───────────────────────────── */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', background: 'white' }}>
        {/* Title bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 12px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: '#111827', fontSize: 12 }}>
            <i className="fas fa-file-alt" style={{ color: '#6b7280' }} />
            Document Details
          </div>
          <span
            onClick={() => setMinimized(v => !v)}
            style={{
              cursor: 'pointer', color: '#5f6877', fontSize: 16, lineHeight: 1,
              width: 20, height: 20, padding: '5px', boxSizing: 'border-box',
              borderRadius: '50%', transition: 'background 0.2s, color 0.2s',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c7c7c7'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#5f6877'; }}
          >
            {minimized ? '+' : '-'}
          </span>
        </div>

        {/* Sequential fields in header */}
        <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FieldRow label="File Name" value={fileData.fileName} animate={animate} delay={d.fileName} />
          <FieldRow label="Summary"   value={fileData.summary}  animate={animate} delay={d.summary}  />
          <FieldRow label="Remarks"   value={fileData.remarks}  animate={animate} delay={d.remarks}  />

          {users.length > 0 && (
            <AnimatedSharedWith
              users={users}
              animate={animate}
              delay={d.sharedWith ?? 0}
              countDelay={'Shared with'.length * SPEED}
            />
          )}
        </div>
      </div>

      {/* ── Section 2: Two-column body ───────────────────────── */}
      {!minimized && (
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', background: 'white' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '40% 60%' }}>

            {/* Left column */}
            <div style={{ padding: '10px 12px', borderRight: '1px solid #e5e7eb' }}>
              <FieldRow label="Name" value={fileData.productName} animate={animate} delay={d.name} />

              <div style={{ marginBottom: 6 }}>
                <AnimatedLabel text="Features" animate={animate} delay={d.featuresLabel} />
                <div style={{ marginTop: 2 }}>
                  {(fileData.features || []).map((f, i) => (
                    <AnimatedListItem key={i} text={f} animate={animate} delay={d.features[i]} />
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 6 }}>
                <AnimatedLabel text="Specifications" animate={animate} delay={d.specsLabel} />
                <div style={{ marginTop: 2 }}>
                  {(fileData.specificationsList || []).map((s, i) => (
                    <AnimatedListItem key={i} text={s} animate={animate} delay={d.specs[i]} />
                  ))}
                </div>
              </div>

              <FieldRow label="Delivery Days"          value={`${fileData.deliveryDays} Days`}           animate={animate} delay={d.deliveryDays}        />
              <FieldRow label="Unit Size"              value={fileData.packaging?.unitSize}              animate={animate} delay={d.unitSize}            />
              <FieldRow label="Unit Weight"            value={fileData.packaging?.unitWeight}            animate={animate} delay={d.unitWeight}          />
              <FieldRow label="Export Carton Size"     value={fileData.packaging?.exportCartonSize}      animate={animate} delay={d.exportCartonSize}    />
              <FieldRow label="Export Carton Weight"   value={fileData.packaging?.exportCartonWeight}    animate={animate} delay={d.exportCartonWeight}  />
              <FieldRow label="Colour Box Size"        value={fileData.packaging?.colourBoxSize}         animate={animate} delay={d.colourBoxSize}       />
              <FieldRow label="Quantity Per Carton"    value={fileData.packaging?.qtyPerCarton}          animate={animate} delay={d.qtyPerCarton}        />
              <FieldRow label="Quantity Per Container" value={containerStr}                              animate={animate} delay={d.containerQty}        />
              <FieldRow label="HS Code"                value={fileData.hscode}                           animate={animate} delay={d.hscode}              />
              <FieldRow label="Certificates"           value={(fileData.certificates || []).join(' / ')} animate={animate} delay={d.certificates}        />
            </div>

            {/* Right column */}
            <div style={{ padding: '10px 12px', minWidth: 0 }}>
              <FieldRow label="Supplier Name"         value={fileData.supplierName}          animate={animate} delay={d.supplierName}  />
              <FieldRow label="Supplier Product Code" value={fileData.supplierProductCode}   animate={animate} delay={d.supplierCode}  />
              <FieldRow label="Quotation Date"        value={fileData.quotationDate}         animate={animate} delay={d.quotationDate} />
              <FieldRow label="Valid For (days)"      value={fileData.validForDays}          animate={animate} delay={d.validFor}      />
              <FieldRow label="Product Class"         value={fileData.productClass}          animate={animate} delay={d.productClass}  />
              <FieldRow label="Production Status"     value={fileData.productStatus}         animate={animate} delay={d.productStatus} />
              <AnimatedImagesSection
                src={fileImageMap[fileData.fileName]}
                alt={fileData.productName}
                animate={animate}
                delay={d.images}
              />
              <FieldRow label="Fob Unit Price"        value={`USD ${fileData.unitPriceUSD}`} animate={animate} delay={d.fobPrice}      />
            </div>
          </div>
        </div>
      )}

      {/* ── Section 3: Footer ────────────────────────────────── */}
      {!minimized && (
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 10, background: 'white', display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '8px 12px' }}>
          <button
            onClick={() => setMinimized(true)}
            style={{ padding: '4px 14px', fontSize: 11, border: '1px solid #d1d5db', borderRadius: 4, cursor: 'pointer', background: 'white', color: '#374151' }}
          >
            Close
          </button>
          <button
            onClick={() => onSave?.(`${fileData.productName} (${fileData.supplierProductCode}) is saved within your database.`)}
            style={{ padding: '4px 14px', fontSize: 11, border: 'none', borderRadius: 4, cursor: 'pointer', background: '#1a2e44', color: 'white', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <i className="fas fa-save" style={{ fontSize: 10 }} /> Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────
// RiskFlagsOutput (unchanged)
// ─────────────────────────────────────────
function RiskFlagsOutput({ data, animate = false }) {
  const { summary, flags } = data;
  let runningDelay = 0;
  const itemDelays = flags.map(flag => {
    const d = runningDelay;
    runningDelay += (flag.title.length + flag.description.length + flag.action.length) * 5 + 300;
    return d;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 9, color: '#e02f3e' }}>●</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>Risk Flags</span>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {summary.critical > 0 && <span style={{ fontSize: 10, padding: '3px 10px', borderRadius: 12, background: '#fef2f2', color: '#e02f3e', fontWeight: 600, border: '1px solid #fecaca' }}>{summary.critical} critical</span>}
        {summary.warning  > 0 && <span style={{ fontSize: 10, padding: '3px 10px', borderRadius: 12, background: '#fffbeb', color: '#d97706', fontWeight: 600, border: '1px solid #fde68a' }}>{summary.warning} warning</span>}
        {summary.clear    > 0 && <span style={{ fontSize: 10, padding: '3px 10px', borderRadius: 12, background: '#f0fdf4', color: '#049669', fontWeight: 600, border: '1px solid #bbf7d0' }}>{summary.clear} clear</span>}
      </div>
      {flags.map((flag, i) => {
        const { color, icon } = SEVERITY[flag.severity] ?? SEVERITY.clear;
        const delay = itemDelays[i];
        return (
          <DelayedVisible key={i} delay={delay} animate={animate} style={{
            borderRadius: 6, background: 'white',
            borderTop: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb',
            borderBottom: '1px solid #e5e7eb', borderLeft: `3px solid ${color}`,
            padding: '8px 12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
              <i className={icon} style={{ fontSize: 10, color }} />
              <span style={{ fontSize: 9, fontWeight: 700, color, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{flag.category}</span>
            </div>
            <p style={{ margin: '0 0 3px', fontSize: 11, fontWeight: 600, color: '#111827' }}>
              <TypingText text={flag.title} animate={animate} delay={delay} speed={5} />
            </p>
            <p style={{ margin: '0 0 6px', fontSize: 11, color: '#6b7280', lineHeight: 1.4 }}>
              <TypingText text={flag.description} animate={animate} delay={delay} speed={5} />
            </p>
            <span style={{ fontSize: 10, color: '#2563eb', cursor: 'pointer' }}>
              <TypingText text={flag.action + ' ↗'} animate={animate} delay={delay} speed={5} />
            </span>
          </DelayedVisible>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────
// HandleFilesUpload (unchanged)
// ─────────────────────────────────────────
export function HandleFilesUpload({ items, selectedFile, setSelectedFile, processedSet }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 10 }}>
      {items.map((item, i) => {
        const isSelected = selectedFile === item.name;
        const isProcessed = processedSet.has(item.name);
        return (
          <div
            key={i}
            onClick={() => !isProcessed && setSelectedFile(isSelected ? null : item.name)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 4, padding: '10px 6px', borderRadius: 6,
              cursor: isProcessed ? 'not-allowed' : 'pointer', opacity: isProcessed ? 0.4 : 1,
              border: isSelected ? '2px solid #e02f3e' : '2px solid #e5e7eb', boxSizing: 'border-box',
              background: isSelected ? '#fff5f5' : '#f9fafb',
              boxShadow: isSelected ? '0 0 0 3px rgba(224,47,62,0.15)' : 'none',
              transition: 'border 0.15s, background 0.15s, box-shadow 0.15s',
            }}
          >
            <i className="fas fa-file-powerpoint" style={{ fontSize: 22, color: '#e02f3e' }} />
            <span style={{
              fontSize: 9, color: isSelected ? '#e02f3e' : '#6b7280',
              fontWeight: isSelected ? 600 : 400, textAlign: 'center', wordBreak: 'break-all',
            }}>{item.name}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────
// HandleFilesOutput (default export, unchanged interface)
// ─────────────────────────────────────────
export default function HandleFilesOutput({ output, onSave, users, userStages, animate = false }) {
  if (!output || output.length === 0)
    return <span style={{ color: '#6b7280', fontSize: 12 }}>No output available yet.</span>;

  const item = output[0];

  if (item?.type === 'fileSuccess')
    return (
      <p style={{ margin: 0, fontSize: 12, color: '#374151' }}>
        <TypingText text={`Document uploaded successfully: /${item.fileName}`} animate={animate} />
      </p>
    );

  if (item?.type === 'fileDetails')
    return (
      <FileDetailCard
        fileData={item.fileData}
        onSave={onSave}
        users={users}
        userStages={userStages}
        animate={animate}
      />
    );

  if (item?.type === 'fileFollowUp')
    return (
      <p style={{ margin: 0, fontSize: 12, color: '#374151' }}>
        <TypingText
          text="You can now ask follow-up questions about these files or reference their document IDs."
          animate={animate}
        />
      </p>
    );

  if (item?.type === 'riskFlags')
    return <RiskFlagsOutput data={item} animate={animate} />;

  if (item?.type === 'emailDraft')
    return <EmailDraftCard item={item} animate={animate} />;

  const description = item?.description;
  if (description)
    return <p style={{ margin: 0, fontSize: 12, color: '#374151' }}><TypingText text={description} animate={animate} /></p>;

  return <p style={{ margin: 0, fontSize: 12, color: '#374151' }}>{JSON.stringify(output)}</p>;
}
