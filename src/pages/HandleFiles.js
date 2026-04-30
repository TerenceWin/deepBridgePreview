import React from 'react';

export default function HandleFilesOutput({ output }) {
  if (!output || output.length === 0)
    return <span style={{ color: '#6b7280', fontSize: 12 }}>No output available yet.</span>;

  const description = output[0]?.description;
  const files = output[0]?.files ?? [];

  if (description && files.length === 0)
    return <p style={{ margin: 0, fontSize: 12, color: '#374151' }}>{description}</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {description && <p style={{ margin: 0, fontSize: 12, color: '#374151' }}>{description}</p>}
      {files.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {files.map((file, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 6 }}>
              <i className="fa fa-file" style={{ fontSize: 12, color: '#e02f3e', flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: '#374151', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
              {file.size && <span style={{ fontSize: 10, color: '#9ca3af', flexShrink: 0 }}>{file.size}</span>}
              {file.status && (
                <span style={{ fontSize: 10, fontWeight: 600, color: file.status === 'done' ? '#049669' : '#fcc10a', flexShrink: 0 }}>{file.status}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
