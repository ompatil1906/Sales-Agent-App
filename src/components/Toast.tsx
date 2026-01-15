'use client';

import { useApp } from '@/lib/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Info } from 'lucide-react';

export function Toast() {
    const { toast } = useApp();

    return (
        <AnimatePresence>
            {toast && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    className="fixed bottom-8 right-8 z-50 bg-white border border-slate-200 shadow-2xl rounded-xl p-4 flex items-center gap-3 min-w-[300px]"
                >
                    <div className={`p-2 rounded-full ${toast.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                        {toast.type === 'success' ? <CheckCircle size={20} /> : <Info size={20} />}
                    </div>
                    <div>
                        <div className="font-semibold text-slate-800">
                            {toast.type === 'success' ? 'Success' : 'New Update'}
                        </div>
                        <div className="text-sm text-slate-500">{toast.message}</div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
