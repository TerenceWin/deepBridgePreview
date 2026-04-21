import React, { useState, useEffect, useRef } from 'react';

const sky = '#29ABE2';
const navy = '#0A2540';
const slate = '#5A6E85';
const border = '#E2DED6';
const mist = '#E3F4FC';
const APPS_SCRIPT_URL = process.env.REACT_APP_SHEETS_URL || '';

export default function DemoModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', role: '', message: '' });
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState('idle');
  const dropRef = useRef();
  const fileInputRef = useRef();

  useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden'; }
    else {
      document.body.style.overflow = '';
      setTimeout(() => { setStatus('idle'); setFiles([]); setForm({ name: '', email: '', company: '', role: '', message: '' }); }, 400);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const addFiles = (incoming) => {
    const valid = Array.from(incoming).filter(f => f.size < 20 * 1024 * 1024);
    setFiles(prev => { const names = new Set(prev.map(f => f.name)); return [...prev, ...valid.filter(f => !names.has(f.name))]; });
  };
  const handleDrop = (e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); };
  const removeFile = (name) => setFiles(prev => prev.filter(f => f.name !== name));
  const formatBytes = (b) => b < 1024 * 1024 ? `${(b / 1024).toFixed(0)} KB` : `${(b / (1024 * 1024)).toFixed(1)} MB`;

  const handleSubmit = async (e) => {
    e.preventDefault(); setStatus('submitting');
    try {
      if (APPS_SCRIPT_URL) {
        await fetch(APPS_SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ timestamp: new Date().toISOString(), name: form.name, email: form.email, company: form.company, role: form.role, message: form.message, files: files.map(f => f.name).join(', '), source: window.location.pathname }) });
      }
      setStatus('success');
    } catch { setStatus('success'); }
  };

  const inputStyle = { width: '100%', padding: '10px 12px', fontSize: 14, border: `0.5px solid ${border}`, borderRadius: 8, outline: 'none', fontFamily: 'inherit', color: navy, background: 'white', boxSizing: 'border-box' };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(10,37,64,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: 16, width: '100%', maxWidth: 500, overflow: 'hidden', position: 'relative', maxHeight: '92vh', overflowY: 'auto' }}>
        <div style={{ background: navy, padding: '24px 28px 20px', position: 'sticky', top: 0, zIndex: 1 }}>
          <div style={{ fontSize: 10, letterSpacing: '2.5px', color: sky, textTransform: 'uppercase', marginBottom: 10 }}>Book a demo</div>
          <div style={{ fontSize: 20, fontWeight: 500, color: 'white', lineHeight: 1.2, letterSpacing: '-0.02em' }}>See it with your workflow</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 6, lineHeight: 1.5 }}>30 minutes using real examples from your business. Upload a file to show us your data.</div>
          <button onClick={onClose} style={{ position: 'absolute', top: 18, right: 20, background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 22, cursor: 'pointer', lineHeight: 1, padding: 4 }}>×</button>
        </div>
        {status === 'success' ? (
          <div style={{ padding: '48px 28px', textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: mist, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 11l5 5 9-9" stroke={sky} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div style={{ fontSize: 18, fontWeight: 500, color: navy, marginBottom: 8 }}>We’ll be in touch soon</div>
            <div style={{ fontSize: 14, color: slate, lineHeight: 1.7 }}>Thanks for reaching out. Someone from the Deep Bridge team will contact you within one business day.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: '20px 28px 28px' }}>
            <div className="db-modal-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div><label style={{ fontSize: 11, color: slate, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Name</label><input required type="text" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} /></div>
              <div><label style={{ fontSize: 11, color: slate, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Email</label><input required type="email" placeholder="Work email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} /></div>
            </div>
            <div className="db-modal-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div><label style={{ fontSize: 11, color: slate, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Company</label><input required type="text" placeholder="Company name" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} style={inputStyle} /></div>
              <div><label style={{ fontSize: 11, color: slate, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Your role</label><input type="text" placeholder="e.g. Operations Manager" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={inputStyle} /></div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, color: slate, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>What would you like to see? (optional)</label>
              <textarea rows={2} placeholder="e.g. quotation workflow, supplier search, document checks..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: 'none' }} />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 11, color: slate, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Upload a file (optional)</label>
              <div ref={dropRef} onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={handleDrop} onClick={() => fileInputRef.current.click()}
                style={{ border: `1.5px dashed ${dragging ? sky : border}`, borderRadius: 10, padding: '18px 14px', textAlign: 'center', cursor: 'pointer', background: dragging ? mist : '#FAFAF8', transition: 'all 0.15s' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto 8px', display: 'block' }}>
                  <path d="M12 16V8M12 8l-3 3M12 8l3 3" stroke={dragging ? sky : slate} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20 16.5A4.5 4.5 0 0016.5 12H15a5 5 0 10-9.9 1H4a3 3 0 000 6h1" stroke={dragging ? sky : slate} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div style={{ fontSize: 13, color: dragging ? sky : slate, fontWeight: 500 }}>Drop files here or tap to browse</div>
                <div style={{ fontSize: 11, color: '#8A9BB0', marginTop: 3 }}>Quotation templates, product lists, supplier data — up to 20 MB</div>
                <input ref={fileInputRef} type="file" multiple style={{ display: 'none' }} onChange={e => addFiles(e.target.files)} />
              </div>
              {files.length > 0 && (
                <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {files.map(f => (
                    <div key={f.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: mist, borderRadius: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}><rect x="2" y="1" width="10" height="12" rx="1.5" stroke={sky} strokeWidth="1.2" /><path d="M4.5 4.5h5M4.5 7h5M4.5 9.5h3" stroke={sky} strokeWidth="1" strokeLinecap="round" /></svg>
                        <span style={{ fontSize: 12, color: navy, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
                        <span style={{ fontSize: 11, color: slate, flexShrink: 0 }}>{formatBytes(f.size)}</span>
                      </div>
                      <button type="button" onClick={() => removeFile(f.name)} style={{ background: 'none', border: 'none', color: slate, cursor: 'pointer', fontSize: 16, lineHeight: 1, padding: '0 2px', flexShrink: 0 }}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button type="submit" disabled={status === 'submitting'} style={{ width: '100%', background: status === 'submitting' ? '#8BCDE8' : sky, color: 'white', border: 'none', borderRadius: 8, padding: '13px', fontSize: 14, fontWeight: 500, cursor: status === 'submitting' ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'background 0.2s' }}>{status === 'submitting' ? 'Sending...' : 'Request a demo'}</button>
            <div style={{ marginTop: 10, fontSize: 11, color: slate, textAlign: 'center', lineHeight: 1.6 }}>We will respond within one business day.</div>
          </form>
        )}
      </div>
    </div>
  );
}
