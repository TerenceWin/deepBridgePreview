import React, { useState } from 'react';
import TypingText from '../components/TypingText';
import handleFilesPicture1 from '../images/heroSection/handleFiles/handleFilesPicture1.png';
import handleFilesPicture2 from '../images/heroSection/handleFiles/handleFilesPicture2.png';
import handleFilesPicture3 from '../images/heroSection/handleFiles/handleFilesPicture3.png';

export function HandleFilesUpload({ items, selectedFile, setSelectedFile, processedSet }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 10 }}>
      {items.map((item, i) => {
        const isSelected = selectedFile === item.name;
        const isProcessed = processedSet.has(item.name);
        return (
          <div key={i}
            onClick={() => !isProcessed && setSelectedFile(isSelected ? null : item.name)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '10px 6px', borderRadius: 6,
              cursor: isProcessed ? 'not-allowed' : 'pointer', opacity: isProcessed ? 0.4 : 1,
              border: isSelected ? '2px solid #e02f3e' : '2px solid #e5e7eb', boxSizing: 'border-box',
              background: isSelected ? '#fff5f5' : '#f9fafb',
              boxShadow: isSelected ? '0 0 0 3px rgba(224,47,62,0.15)' : 'none',
              transition: 'border 0.15s, background 0.15s, box-shadow 0.15s',
            }}>
            <i className="fas fa-file-powerpoint" style={{ fontSize: 22, color: '#e02f3e' }} />
            <span style={{ fontSize: 9, color: isSelected ? '#e02f3e' : '#6b7280', fontWeight: isSelected ? 600 : 400, textAlign: 'center', wordBreak: 'break-all' }}>{item.name}</span>
          </div>
        );
      })}
    </div>
  );
}


const fileImageMap = {
  'DS_TS_50378_Quotation.pptx': handleFilesPicture1,
  'DS_TS_51011_Quotation.pptx': handleFilesPicture2,
  'DS_TS_51016_Quotation.pptx': handleFilesPicture3,
};

function FieldRow({ label, value, animate = false }) {
  const displayValue = value ?? '—';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 6 }}>
      <span style={{ fontSize: 10, fontWeight: 600, color: '#6b7280' }}>{label}</span>
      <span style={{ fontSize: 11, color: '#374151', lineHeight: 1.4 }}>
        {animate ? <TypingText text={String(displayValue)} animate={animate} /> : displayValue}
      </span>
    </div>
  );
}

function FileDetailCard({ fileData, onSave, users = [], userStages = {}, animate = false }) {
  const [minimized, setMinimized] = useState(false);

  const containerStr = Object.entries(fileData.containerQty || {})
    .map(([, v]) => v.toLocaleString()).join('/');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 11, width: '100%' }}>

      {/* Section 1: Header + Top meta fields */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', background: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: '#111827', fontSize: 12 }}>
            <i className="fas fa-file-alt" style={{ color: '#6b7280' }} />
            Document Details
          </div>
          <span onClick={() => setMinimized(v => !v)}
            style={{ cursor: 'pointer', color: '#5f6877', fontSize: 16, lineHeight: 1, width: 20, height: 20, padding: '5px', 
              boxSizing: 'border-box', borderRadius: '50%', transition: 'background 0.2s, color 0.2s', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c7c7c7'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#5f6877'; }}>
            {minimized ? '+' : '-'}
          </span>
        </div>
        <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FieldRow label="File Name" value={fileData.fileName} animate={animate} />
          <FieldRow label="Summary" value={fileData.summary} animate={animate} />
          <FieldRow label="Remarks" value={fileData.remarks} animate={animate} />
          {users.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4, paddingTop: 8, borderTop: '1px solid #f3f4f6' }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: '#6b7280' }}>Shared with</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {users.map((u, i) => {
                  const initials = u.name.split(' ').map(w => w[0]).join('');
                  const stage = userStages[u.name] ?? 1;
                  const hasEngaged = stage > 1;
                  return (
                    <div key={i} title={`${u.name} — ${hasEngaged ? 'sent follow-up' : 'no activity yet'}`}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                      <div style={{ position: 'relative', width: 28, height: 28 }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: hasEngaged ? u.color + '22' : '#f3f4f6', border: `2px solid ${hasEngaged ? u.color : '#d1d5db'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: 9, fontWeight: 700, color: hasEngaged ? u.color : '#9ca3af' }}>{initials}</span>
                        </div>
                        {hasEngaged && (
                          <div style={{ position: 'absolute', bottom: -2, right: -2, width: 10, height: 10, borderRadius: '50%', background: '#22c55e', border: '1.5px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="fas fa-check" style={{ fontSize: 5, color: 'white' }} />
                          </div>
                        )}
                      </div>
                      <span style={{ fontSize: 8, color: hasEngaged ? u.color : '#9ca3af', fontWeight: hasEngaged ? 600 : 400 }}>{initials}</span>
                    </div>
                  );
                })}
              </div>
              <span style={{ fontSize: 9, color: '#9ca3af' }}>
                {users.filter(u => (userStages[u.name] ?? 1) > 1).length} of {users.length} users have engaged
              </span>
            </div>
          )}
        </div>
      </div>

      {!minimized && <>
      {/* Section 2: Two-column body */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', background: 'white' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '40% 60%' }}>

          {/* Left column */}
          <div style={{ padding: '10px 12px', borderRight: '1px solid #e5e7eb' }}>
            <FieldRow label="Name" value={fileData.productName} animate={animate} />
            <div style={{ marginBottom: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: '#6b7280' }}>Features</span>
              <div style={{ marginTop: 2 }}>
                {(fileData.features || []).map((f, i) => (
                  <div key={i} style={{ fontSize: 11, color: '#374151', lineHeight: 1.5 }}>— <TypingText text={f} animate={animate} /></div>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: '#6b7280' }}>Specifications</span>
              <div style={{ marginTop: 2 }}>
                {(fileData.specificationsList || []).map((s, i) => (
                  <div key={i} style={{ fontSize: 11, color: '#374151', lineHeight: 1.5 }}>— <TypingText text={s} animate={animate} /></div>
                ))}
              </div>
            </div>
            <FieldRow label="Product Category" value={fileData.productCategory} animate={animate} />
            <FieldRow label="Delivery Days" value={`${fileData.deliveryDays} Days`} animate={animate} />
            <FieldRow label="Unit Size" value={fileData.packaging?.unitSize} animate={animate} />
            <FieldRow label="Unit Weight" value={fileData.packaging?.unitWeight} animate={animate} />
            <FieldRow label="Export Carton Size" value={fileData.packaging?.exportCartonSize} animate={animate} />
            <FieldRow label="Export Carton Weight" value={fileData.packaging?.exportCartonWeight} animate={animate} />
            <FieldRow label="Colour Box Size" value={fileData.packaging?.colourBoxSize} animate={animate} />
            <FieldRow label="Quantity Per Carton" value={fileData.packaging?.qtyPerCarton} animate={animate} />
            <FieldRow label="Quantity Per Container" value={containerStr} animate={animate} />
            <FieldRow label="HS Code" value={fileData.hscode} animate={animate} />
            <FieldRow label="Certificates" value={(fileData.certificates || []).join(' / ')} animate={animate} />
          </div>

          {/* Right column */}
          <div style={{ padding: '10px 12px', minWidth: 0 }}>
            <FieldRow label="Supplier Name" value={fileData.supplierName} animate={animate} />
            <FieldRow label="Supplier Product Code" value={fileData.supplierProductCode} animate={animate} />
            <FieldRow label="Quotation Date" value={fileData.quotationDate} animate={animate} />
            <FieldRow label="Valid For (days)" value={fileData.validForDays} animate={animate} />
            <FieldRow label="Product Class" value={fileData.productClass} animate={animate} />
            <FieldRow label="Production Status" value={fileData.productStatus} animate={animate} />
            <div style={{ marginBottom: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: '#6b7280' }}>Images</span>
              <div style={{ marginTop: 4, width: '100%', borderRadius: 6, overflow: 'hidden', border: '1px solid #e5e7eb', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src={fileImageMap[fileData.fileName]} alt={fileData.productName} style={{ maxWidth: 420, height: 300, objectFit: 'cover' }} />
              </div>
              <div style={{ fontSize: 9, color: '#9ca3af', marginTop: 4, lineHeight: 1.4 }}>
                Save the document once to enable image controls (Display / Brochure / Packaging / AI Enhance).
              </div>
            </div>
            <FieldRow label="Linked Product Ts Id" value="—" animate={animate} />
            <FieldRow label="Pending Images" value="true" animate={animate} />
            <FieldRow label="Fob Unit Price" value={`USD ${fileData.unitPriceUSD}`} animate={animate} />
          </div>
        </div>
      </div>

      {/* Section 3: Footer */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 10, background: 'white', display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '8px 12px' }}>
        <button onClick={() => setMinimized(true)} style={{ padding: '4px 14px', fontSize: 11, border: '1px solid #d1d5db', borderRadius: 4, cursor: 'pointer', background: 'white', color: '#374151' }}>
          Close
        </button>
        <button onClick={() => onSave?.(`${fileData.productName} (${fileData.supplierProductCode}) is saved within your database.`)}
        style={{ padding: '4px 14px', fontSize: 11, border: 'none', borderRadius: 4, cursor: 'pointer', background: '#1a2e44', color: 'white', display: 'flex', alignItems: 'center', gap: 4 }}>
          <i className="fas fa-save" style={{ fontSize: 10 }} /> Save Changes
        </button>
      </div>
      </>}
    </div>
  );
}

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
    return <FileDetailCard fileData={item.fileData} onSave={onSave} users={users} userStages={userStages} animate={animate} />;

  if (item?.type === 'fileFollowUp')
    return <p style={{ margin: 0, fontSize: 12, color: '#374151' }}><TypingText text="You can now ask follow-up questions about these files or reference their document IDs." animate={animate} /></p>;

  const description = item?.description;
  if (description) return <p style={{ margin: 0, fontSize: 12, color: '#374151' }}><TypingText text={description} animate={animate} /></p>;
  return <p style={{ margin: 0, fontSize: 12, color: '#374151' }}>{JSON.stringify(output)}</p>;
}
