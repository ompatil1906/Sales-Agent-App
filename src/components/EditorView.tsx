'use client';

import { useApp } from '@/lib/AppContext';
import { motion } from 'framer-motion';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Share, Download, Send } from 'lucide-react';

export function EditorView() {
    const { proposalContent, isGenerating, showToast } = useApp();

    const handleSend = () => {
        showToast("Proposal sent to Sarah Jenkins for review.", 'success');
    };

    return (
        <div className="flex-1 h-full bg-slate-100 flex flex-col items-center overflow-hidden">
            {/* Toolbar */}
            <div className="w-full bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-1 text-slate-600">
                    <ToolbarButton icon={<Bold size={18} />} />
                    <ToolbarButton icon={<Italic size={18} />} />
                    <ToolbarButton icon={<Underline size={18} />} />
                    <div className="w-px h-6 bg-slate-200 mx-2" />
                    <ToolbarButton icon={<AlignLeft size={18} />} />
                    <ToolbarButton icon={<AlignCenter size={18} />} />
                    <ToolbarButton icon={<AlignRight size={18} />} />
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 text-slate-600 font-medium text-sm hover:bg-slate-50 rounded-lg flex items-center gap-2">
                        <Download size={16} /> Export PDF
                    </button>
                    <button
                        onClick={handleSend}
                        disabled={!proposalContent}
                        className="px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={16} /> Send to Client
                    </button>
                </div>
            </div>

            <div className="flex-1 w-full overflow-y-auto pt-8 pb-20 flex justify-center">
                <div className="w-full max-w-[850px] bg-white shadow-lg min-h-[1100px] p-24 relative outline-none focus:ring-2 ring-blue-500/10 transition-shadow" contentEditable suppressContentEditableWarning>
                    {isGenerating ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10 w-full h-full">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                <div className="text-blue-600 font-medium animate-pulse">Drafting Proposal...</div>
                            </div>
                        </div>
                    ) : null}

                    {proposalContent ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="prose prose-slate max-w-none"
                            dangerouslySetInnerHTML={{ __html: proposalContent }}
                        />
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-300 pointer-events-none select-none">
                            <div className="text-center">
                                <div className="text-6xl mb-4 opacity-20">📄</div>
                                <div>No document selected</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ToolbarButton({ icon }: { icon: React.ReactNode }) {
    return (
        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            {icon}
        </button>
    )
}
