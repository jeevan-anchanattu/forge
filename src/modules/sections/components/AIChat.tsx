import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { Card } from '@/shared/components/Card';
import { PanelCollapseToggle } from './PanelCollapseToggle';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    isStreaming?: boolean;
}

interface AIChatProps {
    sectionName: string;
    specItems: any[];
}

export const AIChat: React.FC<AIChatProps> = ({ sectionName, specItems }) => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: `Hello! I've analyzed **${sectionName}**. I found ${specItems.length} specifications. How can I help you today?` }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const simulateStreaming = (fullText: string) => {
        setIsTyping(false);
        const words = fullText.split(' ');
        let currentText = '';
        let index = 0;

        setMessages(prev => [...prev, { role: 'assistant', content: '', isStreaming: true }]);

        const interval = setInterval(() => {
            if (index < words.length) {
                currentText += (index === 0 ? '' : ' ') + words[index];
                setMessages(prev => {
                    const last = prev[prev.length - 1];
                    return [...prev.slice(0, -1), { ...last, content: currentText }];
                });
                index++;
            } else {
                clearInterval(interval);
                setMessages(prev => {
                    const last = prev[prev.length - 1];
                    return [...prev.slice(0, -1), { ...last, isStreaming: false }];
                });
            }
        }, 60);
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput('');
        setIsTyping(true);

        // Mock logic
        setTimeout(() => {
            let response = '';
            const lower = userMsg.toLowerCase();

            if (lower.includes('weld')) {
                const welds = specItems.filter(s => s.parameter.toLowerCase().includes('weld'));
                if (welds.length > 0) {
                    response = `I found ${welds.length} weld specifications in this section:\n\n` +
                        welds.map(w => `• **${w.parameter}**: ${w.extractedValue} ${w.unit} (Confidence: ${w.confidence})`).join('\n');
                } else {
                    response = "I couldn't find any specific weld parameters in this section, but I can re-scan if you'd like.";
                }
            } else if (lower.includes('bom') || lower.includes('material')) {
                response = `Based on the drawing for **${sectionName}**, the bill of materials includes several key components. Would you like me to export the top 5 items to the BOM tab?`;
            } else {
                response = `Based on the current section context for **${sectionName}**, I've extracted ${specItems.length} key parameters including dimensions and tolerances. The overall confidence score is high. Is there a specific value you'd like me to verify?`;
            }

            simulateStreaming(response);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-full bg-bg-secondary border-l border-border-subtle overflow-hidden">
            {/* Header */}
            <div className="p-2 border-b border-border-subtle bg-bg-card flex items-center justify-between shrink-0 h-12 overflow-hidden">
                <div className="flex items-center gap-1.5 min-w-0">
                    <div className="p-1 bg-accent-primary/10 rounded-lg shrink-0">
                        <Sparkles className="h-3.5 w-3.5 text-accent-primary" />
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-[11px] font-bold text-text-primary truncate">Forge AI</h3>
                        <p className="text-[8px] text-success flex items-center shrink-0">
                            <span className="w-1 h-1 bg-success rounded-full mr-1 animate-pulse" />
                            Active
                        </p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar" ref={scrollRef}>
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${m.role === 'user' ? 'bg-bg-card border border-border-subtle text-text-secondary' : 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20'}`}>
                                {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                            </div>
                            <div className={`p-3 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-accent-primary text-white font-medium' : 'bg-bg-card border border-border-subtle text-text-primary shadow-sm'}`}>
                                <div className="whitespace-pre-wrap">
                                    {m.content}
                                    {m.isStreaming && <span className="inline-block w-2 h-4 bg-accent-primary ml-1 animate-pulse" />}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="max-w-[85%] flex gap-3">
                            <div className="shrink-0 w-8 h-8 rounded-full bg-accent-primary text-white flex items-center justify-center">
                                <Bot className="h-4 w-4" />
                            </div>
                            <div className="p-3 bg-bg-card border border-border-subtle rounded-2xl flex items-center gap-2">
                                <Loader2 className="h-3 w-3 animate-spin text-text-tertiary" />
                                <span className="text-xs text-text-tertiary">Thinking...</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-2 bg-bg-card border-t border-border-subtle">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Ask AI..."
                        className="w-full bg-surface border border-border-subtle rounded-lg pl-3 pr-10 py-2 text-xs focus:outline-none focus:ring-1 ring-accent-primary transition-all shadow-inner"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="absolute right-1.5 top-1.5 p-1.5 bg-accent-primary text-white rounded-md hover:bg-accent-secondary disabled:opacity-50 disabled:hover:bg-accent-primary transition-colors shadow-sm"
                    >
                        <Send className="h-3.5 w-3.5" />
                    </button>
                </div>
                <p className="mt-2 text-[9px] text-text-tertiary text-center">
                    Forge AI can make mistakes. Verify important specs against the PDF.
                </p>
            </div>
        </div>
    );
};
