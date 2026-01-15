'use client';

import { Sparkles, Send, Paperclip } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/lib/AppContext';

export function CopilotPanel() {
    const { currentDeal, setViewMode, setIsGenerating, setProposalContent } = useApp();
    const [messages, setMessages] = useState<{ role: 'user' | 'agent' | 'system', text: string }[]>([
        { role: 'agent', text: "Hi Sarah! I'm ready to help you with your sales proposals. Open an opportunity to get started." }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Effect: When deal opens, Agent reacts
    useEffect(() => {
        if (currentDeal) {
            setMessages(prev => [
                ...prev,
                {
                    role: 'agent',
                    text: `I see you're looking at **${currentDeal.companyName}**. I've found 2 recent emails and a pricing update regarding this deal. Would you like me to draft a proposal?`
                }
            ]);
        }
    }, [currentDeal]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        // User Message
        const userText = input;
        setMessages(prev => [...prev, { role: 'user', text: userText }]);
        setInput('');
        setIsTyping(true);

        // Simple Intent Matching Logic (Mock Agent)
        setTimeout(() => {
            let responseText = "I'm not sure how to help with that yet.";

            const lowerInput = userText.toLowerCase();

            if (lowerInput.includes('draft') || lowerInput.includes('create') || lowerInput.includes('proposal')) {
                handleDrafting();
                return;
            }

            if (lowerInput.includes('security') || lowerInput.includes('add')) {
                handleRefinement();
                return;
            }

            setIsTyping(false);
            setMessages(prev => [...prev, { role: 'agent', text: responseText }]);
        }, 1000);
    };

    const handleDrafting = () => {
        // 1. Acknowledge
        setMessages(prev => [...prev, { role: 'agent', text: "Sure, let me gather the context..." }]);

        // 2. Show "Reasoning" steps (System messages)
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'system', text: "Scanning Outlook for 'Acme Corp'..." }]);
        }, 1500);

        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'system', text: "Found constraint: 'Enterprise Security Module' required." }]);
        }, 3000);

        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'system', text: "Retrieving 'SaaS Proposal Template' from SharePoint..." }]);
        }, 4500);

        // 3. Switch View and Generate
        setTimeout(() => {
            setIsTyping(false);
            setViewMode('editor');
            setIsGenerating(true);

            // Simulate generation time
            setTimeout(() => {
                setIsGenerating(false);
                setProposalContent(`
                <h1>Project Proposal for Acme Corp</h1>
                <p><strong>Date:</strong> January 15, 2026</p>
                <hr />
                <h2>Executive Summary</h2>
                <p>Northstar Enterprises is pleased to submit this proposal to help Acme Corp modernize its infrastructure. Based on our recent conversations with <em>${currentDeal?.contactName || 'the team'}</em>, we understand that data sovereignty and security are top priorities.</p>
                
                <h2>Proposed Solution</h2>
                <ul>
                    <li><strong>Cloud Storage Tier 1</strong>: Scalable storage for 500 users.</li>
                    <li><strong>Enterprise Security Module</strong>: Advanced thread protection and data residency controls.</li>
                </ul>

                <h2>Investment</h2>
                <p>Total Annual Investment: <strong>$${currentDeal?.value.toLocaleString() || '150,000'}</strong></p>
                
                <p><em>Prices valid until Q4 2026.</em></p>
            `);
                setMessages(prev => [...prev, { role: 'agent', text: "I've drafted the proposal. I included the Enterprise Security Module as discussed in your email thread with Sarah Jenkins. How does it look?" }]);
            }, 2000);
        }, 6000);
    };

    const handleRefinement = () => {
        setIsTyping(false);
        setMessages(prev => [...prev, { role: 'agent', text: "Updated. I've emphasized the ISO 27001 compliance in the Security section." }]);
        setProposalContent((prev: string) => prev + `
        <div style="background: #f0f9ff; padding: 10px; border-left: 4px solid #0ea5e9; margin-top: 20px;">
            <h3>Security & Compliance Addendum</h3>
            <p>Our solution is fully ISO 27001 certified and GDPR compliant. All data is encrypted at rest and in transit.</p>
        </div>
      `);
    };

    return (
        <div className="w-[400px] flex flex-col bg-white border-l border-slate-200 h-full shadow-xl z-20 flex-shrink-0">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-white">
                <Sparkles className="text-indigo-600 fill-indigo-100" size={20} />
                <h2 className="font-semibold text-slate-800">Sales Copilot</h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                {messages.map((msg, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {msg.role === 'system' ? (
                            <div className="flex items-center gap-2 text-xs text-slate-400 w-full mb-1">
                                <div className="h-[1px] bg-slate-200 flex-1"></div>
                                <span>{msg.text}</span>
                                <div className="h-[1px] bg-slate-200 flex-1"></div>
                            </div>
                        ) : (
                            <div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === 'user'
                                ? 'bg-blue-600 text-white rounded-tr-none shadow-md'
                                : 'bg-white border border-slate-200 shadow-sm text-slate-700 rounded-tl-none'
                                }`}>
                                <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                            </div>
                        )}
                    </motion.div>
                ))}
                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1 ml-2 items-center text-xs text-slate-400">
                        <Sparkles size={12} className="animate-pulse" />
                        <span>Thinking...</span>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100">
                <div className="flex items-center gap-2 bg-slate-100 rounded-2xl px-4 py-2 border border-transparent focus-within:border-indigo-500 focus-within:bg-white focus-within:shadow-sm transition-all">
                    <input
                        className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400 py-1"
                        placeholder="Ask Copilot regarding this deal..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        autoFocus
                    />
                    <button className="text-slate-400 hover:text-slate-600">
                        <Paperclip size={18} />
                    </button>
                    <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className={`p-2 rounded-full transition-all ${input.trim() ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700' : 'bg-slate-200 text-slate-400'}`}
                    >
                        <Send size={14} />
                    </button>
                </div>
                <div className="text-[10px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
                    <Sparkles size={10} /> AI-generated content may be incorrect.
                </div>
            </div>
        </div>
    );
}
