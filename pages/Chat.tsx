import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../App';
import { generateResponse } from '../services/geminiService';
import { Send, User as UserIcon, Bot, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { motion } from 'framer-motion';

const Chat: React.FC = () => {
  const { t, language } = useTranslation();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'model',
          text: t.chat.welcome,
          timestamp: Date.now()
        }
      ]);
    }
  }, [t.chat.welcome]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await generateResponse(userMsg.text, language);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] relative overflow-hidden">
      {/* Header Area */}
      <div className="px-4 py-2 bg-brand-bg1/95 z-10 flex-shrink-0">
        <h2 className="text-xl font-bold text-brand-primary mb-2">{t.chat.title}</h2>
        {/* Suggestions */}
        {messages.length < 3 && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            <button 
                onClick={() => handleSuggestion(t.chat.suggestion1)}
                className="whitespace-nowrap bg-brand-white border border-brand-primary/10 px-3 py-1.5 rounded-full text-xs text-brand-primary/80"
            >
                {t.chat.suggestion1}
            </button>
            <button 
                onClick={() => handleSuggestion(t.chat.suggestion2)}
                className="whitespace-nowrap bg-brand-white border border-brand-primary/10 px-3 py-1.5 rounded-full text-xs text-brand-primary/80"
            >
                {t.chat.suggestion2}
            </button>
            </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-4 no-scrollbar">
        {messages.map((msg) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === 'user' ? 'bg-brand-sec2 text-white' : 'bg-brand-primary text-white'
            }`}>
              {msg.role === 'user' ? <UserIcon size={16} /> : <Bot size={16} />}
            </div>
            
            <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-brand-sec2 text-white rounded-br-none' 
                : 'bg-white text-brand-primary rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-brand-primary/50 text-xs ml-10">
            <Loader2 size={12} className="animate-spin" />
            <span>Thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Floating */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <div className="bg-white rounded-full shadow-xl border border-brand-sec4/20 flex items-center p-2 pl-4 pr-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.chat.placeholder}
            className="flex-1 bg-transparent border-none outline-none text-brand-primary placeholder:text-brand-primary/30 text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95"
          >
            <Send size={18} className={language === 'ar' ? "rotate-180" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;