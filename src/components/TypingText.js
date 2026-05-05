import React, { useState, useEffect } from 'react';

export function DelayedVisible({ delay = 0, animate = true, style, children }) {
  const [visible, setVisible] = useState(!animate || delay === 0);

  useEffect(() => {
    if (!animate) { setVisible(true); return; }
    setVisible(delay === 0);
    if (delay === 0) return;
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay, animate]);

  return (
    <div style={{ ...style, opacity: visible ? 1 : 0, transition: 'opacity 0.15s ease' }}>
      {children}
    </div>
  );
}

export default function TypingText({ text, style, animate = true, delay = 0 }) {
  const chars = text ?? '';
  const [count, setCount] = useState(animate ? 0 : chars.length);

  useEffect(() => {
    if (!animate) { setCount(chars.length); return; }
    setCount(0);
    let intervalId;
    const timerId = setTimeout(() => {
      let i = 0;
      intervalId = setInterval(() => {
        i++;
        setCount(i);
        if (i >= chars.length) clearInterval(intervalId);
      }, 5);
    }, delay);
    return () => { clearTimeout(timerId); clearInterval(intervalId); };
  }, [text, animate, delay]); // eslint-disable-line

  return <span style={style}>{chars.slice(0, count)}</span>;
}
