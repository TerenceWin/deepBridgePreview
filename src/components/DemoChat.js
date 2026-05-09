import React from 'react';

export function DemoChatShell({
  chatContainerRef,
  messages,
  emptyIcon,
  emptyText,
  renderUserBubble,
  renderAiContent,
  chatOverlay,
  inputBar,
}) {
  return (
    <>
      <style>{`
        @keyframes demoThinkingBounce { 0%,80%,100%{transform:scale(0.4);opacity:0.4}40%{transform:scale(1);opacity:1} }
        @keyframes demoSendPulse { 0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(8,37,63,0.5)}50%{transform:scale(1.05);box-shadow:0 0 0 6px rgba(8,37,63,0)} }
        @keyframes demoDropdownExpand { from{opacity:0;transform:scaleY(0)} to{opacity:1;transform:scaleY(1)} }
        @keyframes demoDropdownShrink { from{opacity:1;transform:scaleY(1)} to{opacity:0;transform:scaleY(0)} }
        @keyframes demoScrollUp { from{transform:translateY(100%);opacity:0} to{transform:translateY(0);opacity:1} }
      `}</style>
      <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 10, boxSizing: 'border-box' }}>
        <div style={{ width: '100%', backgroundColor: '#08253f', borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 5, overflow: 'hidden', fontFamily: 'inherit', padding: 10, boxSizing: 'border-box' }}>

          {/* Chat area */}
          <div style={{ width: '100%', height: 550, backgroundColor: 'white', border: '1px solid black', borderRadius: 10, position: 'relative' }}>
            <div ref={chatContainerRef} style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '30px 16px', display: 'flex', flexDirection: 'column', gap: 12, boxSizing: 'border-box' }}>
              {messages.length === 0 && (
                <div style={{ margin: 'auto', textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>
                  <i className={emptyIcon.className} style={{ fontSize: 28, marginBottom: 8, display: 'block', color: emptyIcon.color }} />
                  {emptyText}
                </div>
              )}
              {messages.map((msg, idx) => (
                <div key={msg.id ?? idx} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: 2 }}>
                  <div style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 8, width: '100%' }}>
                    {msg.role === 'user' ? (
                      renderUserBubble
                        ? renderUserBubble(msg)
                        : (
                          <div style={{ maxWidth: '70%', background: '#2563eb', color: 'white', borderRadius: '18px 18px 4px 18px', padding: '10px 14px', fontSize: 13, lineHeight: 1.5 }}>
                            {msg.text}
                          </div>
                        )
                    ) : (
                      <div style={{ width: '70%', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '18px 18px 18px 4px', padding: '10px 14px', fontSize: 13, display: 'flex', flexDirection: 'column' }}>
                        {msg.isThinking ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0' }}>
                            <span style={{ fontSize: 12, color: '#6b7280' }}>Thinking</span>
                            <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                              {[0, 1, 2].map(i => (
                                <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#9ca3af', animation: `demoThinkingBounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                              ))}
                            </div>
                          </div>
                        ) : (
                          <>
                            {msg.showThought && (
                              <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                                <i className="fas fa-clock" style={{ fontSize: 9 }} />
                                Thought for 1 second
                              </div>
                            )}
                            {renderAiContent(msg)}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {chatOverlay}
          </div>

          {inputBar}
        </div>
      </div>
    </>
  );
}

export function DemoChatInputBar({
  inputRef,
  typingText,
  onChange,
  onSend,
  isAiTyping,
  hideSend = false,
  pulsing,
  uploadSlot,
  stagedContent,
}) {
  const shouldPulse = pulsing ?? (!isAiTyping && !hideSend);
  return (
    <div style={{ width: '100%', backgroundColor: 'white', border: '1px solid #8e8e8e', borderRadius: 8, padding: 8 }}>
      <div style={{ width: '100%', border: '1px solid #8e8e8e', borderRadius: 8 }}>
        {stagedContent}
        <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          {uploadSlot}
          <input
            type="text"
            ref={inputRef}
            onChange={onChange}
            onKeyDown={e => { if (e.key === 'Enter' && !hideSend) onSend(); }}
            style={{ flex: 1, fontSize: 13, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, color: 'black', background: 'white', fontFamily: 'inherit' }}
            value={typingText}
          />
          {!hideSend && (
            <button
              onClick={onSend}
              style={{ fontSize: 14, fontWeight: 600, padding: '8px 14px', background: '#08253f', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit', animation: shouldPulse ? 'demoSendPulse 1.5s ease-in-out infinite' : 'none' }}
            >
              Send
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
