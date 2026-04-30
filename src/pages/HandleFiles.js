import React, { useState } from 'react';
import handleFilesPicture1 from '../images/heroSection/handleFiles/handleFilesPicture1.png';
import handleFilesPicture2 from '../images/heroSection/handleFiles/handleFilesPicture2.png';
import handleFilesPicture3 from '../images/heroSection/handleFiles/handleFilesPicture3.png';

const fileImageMap = {
  'DS_TS_50378_Quotation.pptx': handleFilesPicture1,
  'DS_TS_51011_Quotation.pptx': handleFilesPicture2,
  'DS_TS_51016_Quotation.pptx': handleFilesPicture3,
};

function FieldRow({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 6 }}>
      <span style={{ fontSize: 10, fontWeight: 600, color: '#6b7280' }}>{label}</span>
      <span style={{ fontSize: 11, color: '#374151', lineHeight: 1.4 }}>{value ?? '—'}</span>
    </div>
  );
}

function FileDetailCard({ fileData, onSave, users = [], userStages = {} }) {
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
          <FieldRow label="File Name" value={fileData.fileName} />
          <FieldRow label="Summary" value={fileData.summary} />
          <FieldRow label="Remarks" value={fileData.remarks} />
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
            <FieldRow label="Name" value={fileData.productName} />
            <div style={{ marginBottom: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: '#6b7280' }}>Features</span>
              <div style={{ marginTop: 2 }}>
                {(fileData.features || []).map((f, i) => (
                  <div key={i} style={{ fontSize: 11, color: '#374151', lineHeight: 1.5 }}>— {f}</div>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: '#6b7280' }}>Specifications</span>
              <div style={{ marginTop: 2 }}>
                {(fileData.specificationsList || []).map((s, i) => (
                  <div key={i} style={{ fontSize: 11, color: '#374151', lineHeight: 1.5 }}>— {s}</div>
                ))}
              </div>
            </div>
            <FieldRow label="Product Category" value={fileData.productCategory} />
            <FieldRow label="Delivery Days" value={`${fileData.deliveryDays} Days`} />
            <FieldRow label="Unit Size" value={fileData.packaging?.unitSize} />
            <FieldRow label="Unit Weight" value={fileData.packaging?.unitWeight} />
            <FieldRow label="Export Carton Size" value={fileData.packaging?.exportCartonSize} />
            <FieldRow label="Export Carton Weight" value={fileData.packaging?.exportCartonWeight} />
            <FieldRow label="Colour Box Size" value={fileData.packaging?.colourBoxSize} />
            <FieldRow label="Quantity Per Carton" value={fileData.packaging?.qtyPerCarton} />
            <FieldRow label="Quantity Per Container" value={containerStr} />
            <FieldRow label="HS Code" value={fileData.hscode} />
            <FieldRow label="Certificates" value={(fileData.certificates || []).join(' / ')} />
          </div>

          {/* Right column */}
          <div style={{ padding: '10px 12px', minWidth: 0 }}>
            <FieldRow label="Supplier Name" value={fileData.supplierName} />
            <FieldRow label="Supplier Product Code" value={fileData.supplierProductCode} />
            <FieldRow label="Quotation Date" value={fileData.quotationDate} />
            <FieldRow label="Valid For (days)" value={fileData.validForDays} />
            <FieldRow label="Product Class" value={fileData.productClass} />
            <FieldRow label="Production Status" value={fileData.productStatus} />
            <div style={{ marginBottom: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: '#6b7280' }}>Images</span>
              <div style={{ marginTop: 4, width: '100%', borderRadius: 6, overflow: 'hidden', border: '1px solid #e5e7eb', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src={fileImageMap[fileData.fileName]} alt={fileData.productName} style={{ maxWidth: 420, height: 300, objectFit: 'cover' }} />
              </div>
              <div style={{ fontSize: 9, color: '#9ca3af', marginTop: 4, lineHeight: 1.4 }}>
                Save the document once to enable image controls (Display / Brochure / Packaging / AI Enhance).
              </div>
            </div>
            <FieldRow label="Linked Product Ts Id" value="—" />
            <FieldRow label="Pending Images" value="true" />
            <FieldRow label="Fob Unit Price" value={`USD ${fileData.unitPriceUSD}`} />
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

export default function HandleFilesOutput({ output, onSave, users, userStages }) {
  if (!output || output.length === 0)
    return <span style={{ color: '#6b7280', fontSize: 12 }}>No output available yet.</span>;

  const item = output[0];

  if (item?.type === 'fileSuccess')
    return (
      <p style={{ margin: 0, fontSize: 12, color: '#374151' }}>
        Document uploaded successfully: <strong>/{item.fileName}</strong>
      </p>
    );

  if (item?.type === 'fileDetails')
    return <FileDetailCard fileData={item.fileData} onSave={onSave} users={users} userStages={userStages} />;

  if (item?.type === 'fileFollowUp')
    return <p style={{ margin: 0, fontSize: 12, color: '#374151' }}>You can now ask follow-up questions about these files or reference their document IDs.</p>;

  const description = item?.description;
  if (description) return <p style={{ margin: 0, fontSize: 12, color: '#374151' }}>{description}</p>;
  return <p style={{ margin: 0, fontSize: 12, color: '#374151' }}>{JSON.stringify(output)}</p>;
}
