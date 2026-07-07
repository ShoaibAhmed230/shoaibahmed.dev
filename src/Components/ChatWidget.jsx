import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: "Hi! I'm Shoaib's AI assistant. Ask me anything about his skills, projects, or experience with React, Next.js, WordPress, or Magento 2.",
};

const SUGGESTIONS = [
  'What are your skills?',
  'Show me a project',
  'How can I contact you?',
];

const STORAGE_KEY = 'shoaib-chat-history';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : [WELCOME_MESSAGE];
    } catch {
      return [WELCOME_MESSAGE];
    }
  });
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking, isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // storage unavailable (private browsing, quota, etc.) - safe to ignore
    }
  }, [messages]);

  const sendMessage = async (text) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed || isThinking) return;

    const nextMessages = [...messages, { role: 'user', content: trimmed }];
    setMessages([...nextMessages, { role: 'assistant', content: '' }]);
    setInput('');
    setError(null);
    setIsThinking(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok || !res.body) {
        let errMessage = 'Something went wrong';
        try {
          const data = await res.json();
          errMessage = data?.error || errMessage;
        } catch {
          // ignore non-JSON error body
        }
        throw new Error(errMessage);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: assistantText };
          return updated;
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to reach the assistant');
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClear = () => {
    setMessages([WELCOME_MESSAGE]);
    setError(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const showSuggestions = messages.length === 1 && !isThinking;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      <div
        className={`mb-4 w-[90vw] max-w-sm origin-bottom-right rounded-2xl border border-gray-800 bg-[#0b1121] shadow-2xl shadow-black/50 transition-all duration-300 ease-out ${
          isOpen
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-4 scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-[#f1660a] to-[#d9550a] px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-white">Ask about Shoaib</p>
            <p className="text-xs text-orange-100">Frontend Developer · React & Next.js</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleClear}
              aria-label="Clear chat"
              title="Clear chat"
              className="cursor-pointer rounded-full p-1.5 text-orange-100 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Trash2 size={16} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="cursor-pointer rounded-full p-1.5 text-orange-100 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex h-96 flex-col gap-3 overflow-y-auto px-4 py-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'rounded-br-sm bg-[#f1660a] text-white'
                    : 'rounded-bl-sm bg-gray-800 text-gray-100'
                }`}
              >
                {msg.role === 'assistant' ? (
                  msg.content ? (
                    <div className="prose-chat">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <Loader2 size={14} className="animate-spin" />
                  )
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {error}
            </div>
          )}

          {showSuggestions && (
            <div className="flex flex-wrap gap-2 pt-1">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="cursor-pointer rounded-full border border-[#f1660a]/40 bg-[#f1660a]/10 px-3 py-1.5 text-xs text-orange-200 transition-colors hover:bg-[#f1660a]/20"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-end gap-2 border-t border-gray-800 p-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message…"
            rows={1}
            maxLength={500}
            className="max-h-24 flex-1 resize-none rounded-xl bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none ring-1 ring-transparent transition focus:ring-[#f1660a]"
          />
          <button
            onClick={() => sendMessage()}
            disabled={isThinking || !input.trim()}
            aria-label="Send message"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#f1660a] text-white transition-colors hover:bg-[#ff7e29] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`block whitespace-nowrap rounded-full border border-[#f1660a]/30 bg-[#0b1121] px-3 py-1.5 text-xs font-medium text-gray-300 shadow-lg shadow-black/30 transition-all duration-300 ${
            isOpen ? 'pointer-events-none translate-x-2 opacity-0' : 'translate-x-0 opacity-100'
          }`}
        >
          Chat with AI Assistant
        </span>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
          className="relative flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#f1660a] text-white shadow-lg shadow-[#f1660a]/40 transition-transform duration-300 hover:scale-105 hover:bg-[#ff7e29] active:scale-95"
        >
          <span
            className={`absolute transition-all duration-300 ${
              isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
            }`}
          >
            <MessageCircle size={24} />
          </span>
          <span
            className={`absolute transition-all duration-300 ${
              isOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
            }`}
          >
            <X size={24} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;
