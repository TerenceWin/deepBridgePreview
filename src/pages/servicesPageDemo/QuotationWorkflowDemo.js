import React, { useState, useEffect, useRef } from 'react';
import data from '../../data/heroData.js';
import QuotationGeneratorOutput from '../heroTab/QuotationGenerator.js';
import { DemoChatShell, DemoChatInputBar } from '../../components/DemoChat.js';

const selectedUser = { name: 'Marcus Lin' };
const qData = data['Generate Quotation']['Marcus Lin'];

const IMAGE_KEYS = new Set(['image', 'productImages', 'src', 'fileData']);
function countOutputChars(output) {
  let n = 0;
  const walk = (v, key) => {
    if (IMAGE_KEYS.has(key)) return;
    if (typeof v === 'string') n += v.length;
    else if (Array.isArray(v)) v.forEach(item => walk(item, null));
    else if (v && typeof v === 'object') Object.entries(v).forEach(([k, val]) => walk(val, k));
  };
  walk(output, null);
  return n;
}

export default function QuotationWorkflowDemo({ handleModal }) {
  const [messages, setMessages] = useState([]);
  const [typingText, setTypingText] = useState('');
  const [stage, setStage] = useState(0);
  const [isAiTyping, setIsAiTyping] = useState(false);

  const typingIntervalRef = useRef(null);
  const aiTypingTimerRef = useRef(null);
  const messageIdCounter = useRef(0);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Typing animation for current stage input
  useEffect(() => {
    clearInterval(typingIntervalRef.current);
    setTypingText('');
    if (isAiTyping) return;
    const text = qData[stage]?.input;
    if (!text) return;
    let i = 0;
    typingIntervalRef.current = setInterval(() => {
      i++;
      setTypingText(text.slice(0, i));
      if (i === text.length) clearInterval(typingIntervalRef.current);
    }, 15);
    return () => clearInterval(typingIntervalRef.current);
  }, [stage, isAiTyping]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current)
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!isAiTyping) return;
    const id = setInterval(() => {
      if (chatContainerRef.current)
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, 100);
    return () => clearInterval(id);
  }, [isAiTyping]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.scrollLeft = inputRef.current.scrollWidth;
  }, [typingText]);

  const startAiTyping = (output, onDone) => {
    clearTimeout(aiTypingTimerRef.current);
    setIsAiTyping(true);
    const isEmailDraft = Array.isArray(output) && output[0]?.type === 'emailDraft';
    const duration = countOutputChars(output) * 5 + (isEmailDraft ? 200 : 200);
    aiTypingTimerRef.current = setTimeout(() => {
      setIsAiTyping(false);
      onDone?.();
    }, duration);
  };

  const handleSend = () => {
    if (!typingText.trim() || isAiTyping) return;
    const stageText = qData[stage]?.input ?? '';

    // If user edited the text, open demo modal and re-animate
    if (typingText.trim() !== stageText.trim()) {
      handleModal();
      let i = 0;
      clearInterval(typingIntervalRef.current);
      setTypingText('');
      typingIntervalRef.current = setInterval(() => {
        i++;
        setTypingText(stageText.slice(0, i));
        if (i >= stageText.length) clearInterval(typingIntervalRef.current);
      }, 15);
      return;
    }

    const output = qData[stage]?.output ?? [];
    const isLast = stage >= qData.length - 1;
    const isEmailDraft = output[0]?.type === 'emailDraft';
    const nextStage = stage + 1;

    const thinkingId = ++messageIdCounter.current;
    setMessages(prev => [...prev,
      { role: 'user', text: typingText, id: ++messageIdCounter.current },
      { role: 'ai', isThinking: true, id: thinkingId },
    ]);
    setTypingText('');
    setStage(nextStage);

    setTimeout(() => {
      setMessages(prev => prev.map(m =>
        m.id === thinkingId
          ? { role: 'ai', output, showThought: true, animate: true, id: thinkingId }
          : m
      ));
      // Email draft: modal fires when user clicks Send Email, not after AI typing
      startAiTyping(output, (!isEmailDraft && isLast) ? () => setTimeout(() => handleModal(), 1000) : undefined);
    }, 1000);
  };

  return (
    <DemoChatShell
      chatContainerRef={chatContainerRef}
      messages={messages}
      emptyIcon={{ className: 'fas fa-file-invoice', color: '#fcc10a' }}
      emptyText="Try sending a message."
      renderAiContent={msg => (
        <QuotationGeneratorOutput output={msg.output} animate={msg.animate} onEmailSent={() => handleModal()} />
      )}
      inputBar={
        <DemoChatInputBar
          inputRef={inputRef}
          typingText={typingText}
          onChange={e => setTypingText(e.target.value)}
          onSend={handleSend}
          isAiTyping={isAiTyping}
          pulsing={!isAiTyping}
        />
      }
    />
  );
}
