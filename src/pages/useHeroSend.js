import data, { handleFilesFollowUps } from '../data/heroData.js';
import { computeFileDetailsDuration } from './heroTab/HandleFiles.js';
import { fileDataMap, users } from './heroSectionConfig.js';

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

export function useHeroSend({
  typingText, userStages, selectedUser, currentTab, tabs,
  catalogProcessed, stagedHandleFile, processedFile, stagedPackageImage,
  handleModal, typingIntervalRef, tabIntervalRef, aiTypingTimerRef,
  messageIdCounter, setIsAiTyping, setMessages, setTypingText, setUserTyped,
  setStagedCatalogImages, setProcessedFile, setStagedHandleFile,
  setUserStages, setCatalogProcessed, chatContainerRef, setDemoTriggered,
  setStagedPackageImage,
}) {
  function startAiTyping(output, onDone, overrideDuration) {
    clearTimeout(aiTypingTimerRef.current);
    setIsAiTyping(true);
    const hasFileDetails = Array.isArray(output) && output.some(o => o?.type === 'fileDetails');
    const duration = overrideDuration ?? (countOutputChars(output) * 5 + (hasFileDetails ? 8000 : 200));
    aiTypingTimerRef.current = setTimeout(() => { setIsAiTyping(false); onDone?.(); }, duration);
  }

  function handleSend() {
    if (!typingText.trim()) return;
    const stage = userStages[selectedUser.name] ?? 0;

    let stageText;
    if (currentTab === tabs[3] && catalogProcessed) {
      stageText = data[currentTab]?.[selectedUser.name]?.[1]?.input;
    } else if (currentTab === tabs[2] && stagedHandleFile) {
      stageText = 'Generate a Document Detail file for this file';
    } else if (currentTab === 'Handle Files' && stage > 0 && processedFile) {
      stageText = handleFilesFollowUps[processedFile]?.[selectedUser.name]?.[stage - 1]?.input;
    } else {
      stageText = data[currentTab]?.[selectedUser.name]?.[stage]?.input;
    }

    if (typingText.trim() !== (stageText ?? '').trim()) {
      handleModal();
      setDemoTriggered(true);
      const textToRetype = stageText ?? '';
      let i = 0;
      clearInterval(typingIntervalRef.current);
      setTypingText('');
      typingIntervalRef.current = setInterval(() => {
        i++;
        setTypingText(textToRetype.slice(0, i));
        if (i >= textToRetype.length) clearInterval(typingIntervalRef.current);
      }, 15);
      return;
    }

    clearInterval(tabIntervalRef.current);
    clearInterval(typingIntervalRef.current);
    setIsAiTyping(true);

    if (currentTab === tabs[2] && stagedHandleFile) {
      const fileNameToProcess = stagedHandleFile;
      const fileData = fileDataMap[fileNameToProcess];
      const thinkingId = ++messageIdCounter.current;
      setMessages(prev => [...prev,
        { role: 'user', text: typingText, user: selectedUser, fileUpload: fileNameToProcess, id: ++messageIdCounter.current },
        { role: 'ai', isThinking: true, id: thinkingId },
      ]);
      setTypingText('');
      setUserTyped(true);
      setProcessedFile(fileNameToProcess);
      setStagedHandleFile(null);
      const resetStages = {};
      users.forEach(u => { resetStages[u.name] = 1; });
      setUserStages(resetStages);
      setTimeout(() => { if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; }, 50);
      setTimeout(() => {
        const fileSuccessOutput = [{ type: 'fileSuccess', fileName: fileNameToProcess }];
        const fileFollowUpOutput = [{ type: 'fileFollowUp' }];
        setMessages(prev => {
          const idx = prev.findIndex(m => m.id === thinkingId);
          if (idx === -1) return prev;
          const next = [...prev];
          next.splice(idx, 1,
            { role: 'ai', output: fileSuccessOutput, tab: currentTab, showThought: true, animate: true, id: ++messageIdCounter.current },
            { role: 'ai', output: [{ type: 'fileDetails', fileData }], tab: currentTab, showThought: false, animate: true, id: ++messageIdCounter.current },
          );
          return next;
        });
        const followUpText = 'You can now ask follow-up questions about these files or reference their document IDs.';
        startAiTyping([...fileSuccessOutput, { type: 'fileDetails', fileData }], () => {
          setIsAiTyping(true);
          setMessages(prev => [...prev,
            { role: 'ai', output: fileFollowUpOutput, tab: currentTab, showThought: false, animate: true, id: ++messageIdCounter.current },
          ]);
          clearTimeout(aiTypingTimerRef.current);
          aiTypingTimerRef.current = setTimeout(() => setIsAiTyping(false), followUpText.length * 5 + 400);
        }, computeFileDetailsDuration(fileData, users.length));
        setTimeout(() => { if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; }, 50);
      }, 1000);
      return;
    }

    let output, isLast, nextStage;
    if (currentTab === tabs[3] && catalogProcessed) {
      output = data[currentTab]?.[selectedUser.name]?.[1]?.output ?? [];
      isLast = 1 >= (data[currentTab]?.[selectedUser.name]?.length ?? 0) - 1;
      nextStage = 2;
      setCatalogProcessed(false);
    } else if (currentTab === 'Handle Files' && stage > 0 && processedFile) {
      const followUps = handleFilesFollowUps[processedFile]?.[selectedUser.name] ?? [];
      output = followUps[stage - 1]?.output ?? [];
      isLast = stage >= followUps.length;
      nextStage = stage + 1;
    } else {
      output = data[currentTab]?.[selectedUser.name]?.[stage]?.output ?? [];
      isLast = stage >= (data[currentTab]?.[selectedUser.name]?.length ?? 0) - 1;
      nextStage = stage + 1;
    }

    const thinkingId = ++messageIdCounter.current;
    const userMsg = { role: 'user', text: typingText, user: selectedUser, id: ++messageIdCounter.current };
    if (stagedPackageImage) userMsg.imageUpload = stagedPackageImage;
    setMessages(prev => [...prev, userMsg, { role: 'ai', isThinking: true, id: thinkingId }]);
    setTypingText('');
    setUserTyped(true);
    setStagedCatalogImages([]);
    setStagedPackageImage?.(null);
    setUserStages(prev => ({ ...prev, [selectedUser.name]: nextStage }));
    setTimeout(() => { if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; }, 50);
    setTimeout(() => {
      setMessages(prev => prev.map(m =>
        m.id === thinkingId ? { role: 'ai', output, tab: currentTab, showThought: true, animate: true, id: thinkingId } : m
      ));
      const isEmailDraft = output[0]?.type === 'emailDraft';
      startAiTyping(output, (isLast && !isEmailDraft) ? () => setTimeout(() => { handleModal(); setDemoTriggered(true); }, 1000) : undefined);
      setTimeout(() => { if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; }, 50);
    }, 1000);
  }

  return handleSend;
}
