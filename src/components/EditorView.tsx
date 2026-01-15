'use client';

import { useApp } from '@/lib/AppContext';
import { motion } from 'framer-motion';

export function EditorView() {
    const { proposalContent, isGenerating } = useApp();

    return (
        <div className="flex-1 h-full bg-slate-100 flex flex-col items-center overflow-y-auto pt-8 pb-20">
            <div className="w-full max-w-[850px] bg-white shadow-lg min-h-[1100px] p-24 relative">
                {isGenerating ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
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
                    <div className="h-full flex items-center justify-center text-slate-300">
                        <div className="text-center">
                            <div className="text-6xl mb-4">📄</div>
                            <div>No document selected</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
