import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Copy,
  CheckCircle2,
  RotateCcw,
  Zap,
  Info,
  HelpCircle
} from 'lucide-react';
import { CreatorProfile } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface AICreatorAssistantViewProps {
  profile: CreatorProfile;
}

export const AICreatorAssistantView: React.FC<AICreatorAssistantViewProps> = ({ profile }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: `Hello ${profile.name}! I'm your AI Creator Coach for TikTok Booster. I specialize in algorithm literacy, 3-second retention hooks, TikTok SEO captions, and sustainable community growth for your niche (${profile.niche}). How can I assist your content today?`,
      timestamp: 'Just now'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const promptShortcuts = [
    'Why might my viewers be leaving in the first 3 seconds?',
    'Give me 3 curiosity-gap hook ideas for my niche',
    'Audit this caption for TikTok search SEO',
    'How do I turn casual viewers into permanent followers?',
    'Help me create a 5-day consistent content plan',
    'What are the Creator Rewards Program requirements?'
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          creatorContext: {
            name: profile.name,
            niche: profile.niche,
            creatorType: profile.creatorType,
            goal: profile.mainGoal,
            audienceSize: profile.audienceSize
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiMsg: Message = {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: data.response,
          timestamp: 'Just now'
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      console.warn('Chat request failed, providing local assistant guidance');
      const fallbackMsg: Message = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: `### Strategy Recommendation for ${profile.niche}:
1. **Focus on the 3-Second Rule**: The algorithm rewards completion rate and replays above raw likes. 
2. **Engage in the Comments**: Reply to your top 3 questions with a video reply. This creates a multi-video binge loop.
3. **Stay Consistent**: Post when your target audience is active, and maintain thematic consistency so the algorithm knows who to recommend your profile to.`,
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-semibold border border-cyan-500/20">
            <Bot className="w-3.5 h-3.5" />
            AI Growth Engine
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            AI Creator Assistant
          </h2>
        </div>

        <div className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-2 self-start sm:self-center">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Calibrated for {profile.niche}</span>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        <span className="text-[11px] text-slate-400 uppercase font-bold shrink-0">
          Try asking:
        </span>
        {promptShortcuts.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(chip)}
            className="text-[11px] px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all whitespace-nowrap shrink-0"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 scrollbar-thin">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isCopied = copiedId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-white'
                    : 'bg-slate-800 border border-slate-700 text-cyan-400'
                }`}
              >
                {isUser ? 'You' : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed space-y-2 relative group ${
                  isUser
                    ? 'bg-cyan-600 text-white rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                <div className="flex items-center justify-between text-[10px] opacity-70 pt-1 border-t border-white/10">
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => handleCopyMessage(msg.text, msg.id)}
                      className="hover:text-white flex items-center gap-1 transition-colors"
                      title="Copy response"
                    >
                      {isCopied ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3.5 rounded-2xl rounded-tl-none bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Analyzing algorithmic best practices & drafting tailored advice...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-2"
      >
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder="Ask for hook ideas, caption optimization, script audit, or retention strategies..."
          className="flex-1 bg-transparent px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputPrompt.trim() || loading}
          className="p-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:pointer-events-none text-white transition-all shadow-md shadow-cyan-500/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
