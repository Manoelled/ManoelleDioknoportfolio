import React, { useState, useRef, useEffect } from 'react';
import { AdSize } from './adTypes';

interface ChatboxAdProps {
  size: AdSize;
  accentColor?: string;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

interface ChatOption {
  label: string;
  nextStepId: string;
}

interface ChatStepNode {
  botMessage: string;
  options?: ChatOption[];
  isFinal?: boolean;
  ctaText?: string;
}

const CHAT_TREE: Record<string, ChatStepNode> = {
  start: {
    botMessage: "Hello! What solution are you looking to build today?",
    options: [
      { label: "Interactive Prototype", nextStepId: "proto" },
      { label: "Custom Component Kit", nextStepId: "kit" },
      { label: "Ad Campaign System", nextStepId: "ads" },
    ],
  },
  proto: {
    botMessage: "Great! Our prototypes offer zero-latency UI interactions and refined typography.",
    options: [
      { label: "What is the turnaround?", nextStepId: "turnaround" },
      { label: "Are they fully responsive?", nextStepId: "responsive" },
    ],
  },
  kit: {
    botMessage: "Our component kit includes zero-radius cards, clean typography, and Tailwind utilities.",
    options: [
      { label: "How do I install it?", nextStepId: "install" },
      { label: "Is dark mode supported?", nextStepId: "darkmode" },
    ],
  },
  ads: {
    botMessage: "We deliver dynamic ad formats like Flipbooks, 3D Cylinders, and Quiz Funnels.",
    options: [
      { label: "See all ad formats", nextStepId: "formats" },
      { label: "Schedule a live demo", nextStepId: "demo" },
    ],
  },
  turnaround: {
    botMessage: "Standard prototypes compile in 48 hours with full TypeScript source code.",
    isFinal: true,
    ctaText: "START PROJECT →",
  },
  responsive: {
    botMessage: "Yes, every component fits IAB standards from 320x50 banners to 300x600 half-pages.",
    isFinal: true,
    ctaText: "VIEW ALL SIZES →",
  },
  install: {
    botMessage: "Zero dependencies required—just import single self-contained React wrappers.",
    isFinal: true,
    ctaText: "GET COMPONENT KIT →",
  },
  darkmode: {
    botMessage: "Built on clean off-white (#FFF) base with high-contrast (#171717) typography.",
    isFinal: true,
    ctaText: "EXPLORE DESIGN TOKEN →",
  },
  formats: {
    botMessage: "Includes Color-Swap, Hover Multi-Panel, Chatbox, Quiz Funnel, Flipbook & 3D Drum.",
    isFinal: true,
    ctaText: "TRY ALL FORMATS →",
  },
  demo: {
    botMessage: "Our team can walk you through custom integration into your current codebase.",
    isFinal: true,
    ctaText: "BOOK A LIVE DEMO →",
  },
};

export default function ChatboxAd({ size, accentColor = '#10B981' }: ChatboxAdProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'bot', text: CHAT_TREE['start'].botMessage },
  ]);
  const [currentStepNodeId, setCurrentStepNodeId] = useState<string>('start');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fontStyle = { fontFamily: '"Manrope", "Inter", system-ui, sans-serif' };

  // Auto-scroll chat thread to bottom on new message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSelectOption = (option: ChatOption) => {
    if (isTyping) return;

    // 1. Add User Message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: option.label,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const nextNode = CHAT_TREE[option.nextStepId] || CHAT_TREE['start'];

    // 2. Simulate Bot Response after delay
    setTimeout(() => {
      setIsTyping(false);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: nextNode.botMessage,
      };
      setMessages((prev) => [...prev, botMsg]);
      setCurrentStepNodeId(option.nextStepId);
    }, 400);
  };

  const handleResetChat = () => {
    setMessages([{ id: '1', sender: 'bot', text: CHAT_TREE['start'].botMessage }]);
    setCurrentStepNodeId('start');
    setIsTyping(false);
  };

  const currentNode = CHAT_TREE[currentStepNodeId] || CHAT_TREE['start'];

  // COMPACT SIZES: 320x50
  if (size === '320x50') {
    const lastBotMsg = [...messages].reverse().find((m) => m.sender === 'bot')?.text || '';
    const lastUserMsg = [...messages].reverse().find((m) => m.sender === 'user')?.text || '';

    return (
      <div
        data-size="320x50"
        className="w-[320px] h-[50px] bg-white text-neutral-900 flex items-center justify-between px-3 border border-neutral-200 select-none relative overflow-hidden"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        <div className="flex items-center gap-2 overflow-hidden flex-1 pr-2">
          <span className="w-1.5 h-1.5 flex-shrink-0" style={{ backgroundColor: accentColor }} />
          {isTyping ? (
            <span className="text-[10px] font-bold text-neutral-500 animate-pulse uppercase tracking-wider">
              ASSISTANT TYPING...
            </span>
          ) : (
            <div className="flex flex-col overflow-hidden text-[11px] leading-tight">
              {lastUserMsg && <span className="text-neutral-500 truncate font-semibold uppercase text-[9px]">YOU: {lastUserMsg}</span>}
              <span className="text-neutral-900 truncate font-extrabold uppercase tracking-tight">{lastBotMsg}</span>
            </div>
          )}
        </div>

        {currentNode.options && !isTyping ? (
          <button
            onClick={() => handleSelectOption(currentNode.options![0])}
            className="px-2 py-1 text-[9px] font-extrabold uppercase border border-neutral-300 hover:border-black text-neutral-900 flex-shrink-0 cursor-pointer tracking-wider"
            style={{ borderRadius: 0, ...fontStyle }}
          >
            {currentNode.options[0].label} →
          </button>
        ) : (
          <button
            onClick={handleResetChat}
            className="text-[9px] font-extrabold uppercase text-neutral-500 hover:text-black flex-shrink-0 cursor-pointer tracking-wider"
            style={fontStyle}
          >
            RESET ↺
          </button>
        )}
      </div>
    );
  }

  // COMPACT SIZE: 320x100
  if (size === '320x100') {
    return (
      <div
        data-size="320x100"
        className="w-[320px] h-[100px] bg-white text-neutral-900 flex flex-col justify-between p-2.5 border border-neutral-200 select-none relative overflow-hidden"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        {/* Chat Thread Viewport */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto flex flex-col gap-1.5 pr-1 no-scrollbar mb-1">
          {messages.slice(-3).map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[85%] p-1.5 text-[10px] font-semibold leading-snug border ${
                msg.sender === 'user'
                  ? 'self-end bg-neutral-900 text-white border-neutral-900'
                  : 'self-start bg-neutral-100 text-neutral-900 border-neutral-200'
              }`}
              style={{ borderRadius: 0 }}
            >
              {msg.text}
            </div>
          ))}

          {isTyping && (
            <div className="self-start bg-neutral-100 border border-neutral-200 p-1.5 text-[9px] font-bold text-neutral-500 uppercase tracking-wider animate-pulse">
              TYPING...
            </div>
          )}
        </div>

        {/* Options Bar */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-1 border-t border-neutral-200">
          {!currentNode.isFinal && currentNode.options ? (
            currentNode.options.map((opt) => (
              <button
                key={opt.nextStepId}
                onClick={() => handleSelectOption(opt)}
                className="px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider border border-neutral-200 hover:border-neutral-400 bg-neutral-50 text-neutral-800 cursor-pointer whitespace-nowrap flex-shrink-0"
                style={{ borderRadius: 0, ...fontStyle }}
              >
                {opt.label}
              </button>
            ))
          ) : (
            <div className="flex items-center justify-between w-full">
              <button
                className="px-2 py-1 text-[9px] font-extrabold uppercase tracking-widest border cursor-pointer"
                style={{
                  borderRadius: 0,
                  borderColor: accentColor,
                  backgroundColor: accentColor,
                  color: '#FFFFFF',
                  ...fontStyle,
                }}
              >
                {currentNode.ctaText || 'CONTINUE →'}
              </button>
              <button
                onClick={handleResetChat}
                className="text-[9px] font-extrabold uppercase tracking-wider text-neutral-500 hover:text-neutral-900 underline cursor-pointer"
                style={fontStyle}
              >
                RESTART ↺
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // LEADERBOARD SIZE: 728x90
  if (size === '728x90') {
    const lastBotMsg = [...messages].reverse().find((m) => m.sender === 'bot')?.text || '';

    return (
      <div
        data-size="728x90"
        className="w-[728px] h-[90px] bg-white text-neutral-900 flex items-center justify-between px-6 border border-neutral-200 select-none relative overflow-hidden gap-4"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        <div className="flex-1 flex flex-col justify-center overflow-hidden">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5" style={{ backgroundColor: accentColor }} />
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">CHAT ASSISTANT</span>
          </div>

          <div className="bg-neutral-100 p-2 border border-neutral-200 max-w-[420px]">
            {isTyping ? (
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 animate-pulse">GENERATING REPLY...</span>
            ) : (
              <p className="text-xs font-semibold text-neutral-900 truncate">{lastBotMsg}</p>
            )}
          </div>
        </div>

        {/* Options / CTA Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {!currentNode.isFinal && currentNode.options ? (
            currentNode.options.map((opt) => (
              <button
                key={opt.nextStepId}
                onClick={() => handleSelectOption(opt)}
                className="px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider border border-neutral-200 hover:border-black bg-neutral-50 text-neutral-900 transition-colors cursor-pointer whitespace-nowrap"
                style={{ borderRadius: 0, ...fontStyle }}
              >
                {opt.label}
              </button>
            ))
          ) : (
            <button
              className="px-4 py-2 text-xs font-extrabold uppercase tracking-widest border cursor-pointer"
              style={{
                borderRadius: 0,
                borderColor: accentColor,
                backgroundColor: accentColor,
                color: '#FFFFFF',
                ...fontStyle,
              }}
            >
              {currentNode.ctaText || 'CLAIM SOLUTION →'}
            </button>
          )}

          <button
            onClick={handleResetChat}
            className="p-1.5 text-[10px] font-extrabold uppercase text-neutral-500 hover:text-black border border-neutral-200 cursor-pointer ml-1"
            style={fontStyle}
          >
            ↺
          </button>
        </div>
      </div>
    );
  }

  // STANDARD RECTANGLE & TALL SIZES: 300x250, 336x280, 300x600
  const isTall = size === '300x600';
  const width = size === '336x280' ? 336 : 300;
  const height = size === '336x280' ? 280 : isTall ? 600 : 250;

  return (
    <div
      data-size={size}
      className="bg-white text-neutral-900 flex flex-col justify-between p-4 border border-neutral-200 select-none relative overflow-hidden"
      style={{ width: `${width}px`, height: `${height}px`, borderRadius: 0, ...fontStyle }}
    >
      <style>{`
        @keyframes bubbleFadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Top Bar Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-2 mb-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2" style={{ backgroundColor: accentColor }} />
          <span className="text-xs font-extrabold uppercase tracking-tight text-neutral-900">
            INTERACTIVE CHAT
          </span>
        </div>

        <button
          onClick={handleResetChat}
          className="text-[10px] font-bold text-neutral-500 hover:text-neutral-900 uppercase tracking-wider underline cursor-pointer"
          style={fontStyle}
        >
          RESTART ↺
        </button>
      </div>

      {/* Scrollable Chat Message Exchange Thread */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto flex flex-col gap-2.5 my-1 pr-1"
      >
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`max-w-[88%] p-2.5 text-xs leading-relaxed border transition-all duration-200 ${
                isUser
                  ? 'self-end bg-neutral-900 text-white border-neutral-900 font-medium'
                  : 'self-start bg-neutral-100 text-neutral-900 border-neutral-200'
              }`}
              style={{
                borderRadius: 0,
                borderLeftWidth: isUser ? '1px' : '3px',
                borderLeftColor: isUser ? '#171717' : accentColor,
                animation: 'bubbleFadeUp 250ms ease-out forwards',
              }}
            >
              <div className="text-[9px] font-extrabold uppercase mb-0.5 opacity-60 tracking-wider">
                {isUser ? 'YOU' : 'ASSISTANT'}
              </div>
              <p className="font-semibold">{msg.text}</p>
            </div>
          );
        })}

        {/* Bot Typing Indicator Bubble */}
        {isTyping && (
          <div
            className="self-start bg-neutral-100 border border-neutral-200 p-2.5 text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-2"
            style={{ borderRadius: 0, borderLeftWidth: '3px', borderLeftColor: accentColor }}
          >
            <span className="w-1.5 h-1.5 animate-ping" style={{ backgroundColor: accentColor }} />
            <span>Assistant typing...</span>
          </div>
        )}
      </div>

      {/* Quick Reply Prompts or Final CTA Section */}
      <div className="pt-2 border-t border-neutral-200 mt-2 flex-shrink-0">
        {!currentNode.isFinal && currentNode.options ? (
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider">
              SELECT PROMPT TO REPLY:
            </span>
            <div className="flex flex-col gap-1.5">
              {currentNode.options.map((opt) => (
                <button
                  key={opt.nextStepId}
                  onClick={() => handleSelectOption(opt)}
                  className="w-full text-left p-2 text-xs font-extrabold border border-neutral-200 hover:border-neutral-400 bg-neutral-50 hover:bg-neutral-100 text-neutral-900 transition-all duration-150 cursor-pointer flex items-center justify-between uppercase tracking-wider"
                  style={{ borderRadius: 0, ...fontStyle }}
                >
                  <span>{opt.label}</span>
                  <span className="text-[10px] text-neutral-400">→</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <button
              className="w-full py-2.5 px-3 text-xs font-extrabold tracking-widest uppercase border transition-all duration-200 cursor-pointer"
              style={{
                borderRadius: 0,
                borderColor: accentColor,
                backgroundColor: accentColor,
                color: '#FFFFFF',
                ...fontStyle,
              }}
            >
              {currentNode.ctaText || 'CLAIM SOLUTION →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
