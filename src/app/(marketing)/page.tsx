'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Navbar */}
            <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
                    <div className="bg-blue-600 p-1.5 rounded-lg">
                        <Sparkles className="text-white" size={18} />
                    </div>
                    Northstar Copilot
                </div>
                <div className="flex gap-4">
                    <Link href="/login" className="px-5 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors">
                        Login
                    </Link>
                    <Link href="/dashboard" className="px-5 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-5xl mx-auto mt-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold border border-blue-100 inline-flex items-center gap-2"
                >
                    <Sparkles size={14} />
                    <span>New: Native Enterprise Graph Connectors</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8"
                >
                    Close deals faster with <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Intelligent Proposals</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-slate-500 max-w-2xl mb-12 leading-relaxed"
                >
                    Northstar connects your CRM, Email, and Docs to generate premium, context-aware sales proposals in seconds. Built seamlessly into your M365 workflow.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-4"
                >
                    <Link href="/dashboard" className="px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all flex items-center gap-2">
                        Launch Agent <ArrowRight size={18} />
                    </Link>
                    <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-all">
                        View Documentation
                    </button>
                </motion.div>

                {/* Feature Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left"
                >
                    <FeatureCard
                        icon={<Zap className="text-amber-500" />}
                        title="Instant Context"
                        desc="Automatically scans recent emails and CRM notes to pre-fill proposal requirements."
                    />
                    <FeatureCard
                        icon={<Shield className="text-blue-500" />}
                        title="Enterprise Secure"
                        desc="Runs entirely within your tenant boundary. Zero data training retention."
                    />
                    <FeatureCard
                        icon={<Sparkles className="text-purple-500" />}
                        title="Adaptive Tone"
                        desc="Matches your brand voice precisely. Learned from your best historical deals."
                    />
                </motion.div>
            </main>

            <footer className="py-8 text-center text-slate-400 text-sm">
                © 2026 Northstar Enterprises. All rights reserved.
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 p-3 bg-slate-50 rounded-xl inline-block">{icon}</div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
            <p className="text-slate-500 leading-relaxed">{desc}</p>
        </div>
    )
}
