'use client';

import { MOCK_CRM_DEAL, MOCK_EMAILS } from '@/lib/mockDB';
import { useApp } from '@/lib/AppContext';
import { DollarSign, Clock, ArrowRight, Mail } from 'lucide-react';

export function DashboardView() {
    const { setCurrentDeal, setViewMode } = useApp();

    const handleOpenDeal = () => {
        setCurrentDeal(MOCK_CRM_DEAL);
        // In a real app complexity, this might just open a deal detail view.
        // Here we implicitly start thinking about proposals.
    };

    return (
        <div className="p-8 h-full overflow-y-auto">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Sales Dashboard</h1>
                <p className="text-slate-500">Welcome back, Sarah. You have 3 opportunities requiring attention.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Pipeline Value" value="$1.2M" icon={<DollarSign className="text-green-500" />} />
                <StatCard title="Proposals Due" value="3" icon={<Clock className="text-orange-500" />} />
                <StatCard title="New Leads" value="12" icon={<ArrowRight className="text-blue-500" />} />
            </div>

            <h2 className="text-lg font-semibold text-slate-800 mb-4">Priority Opportunities</h2>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="flex items-center p-4 border-b border-slate-100 bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                    <div className="flex-1">Company</div>
                    <div className="w-32">Stage</div>
                    <div className="w-32">Value</div>
                    <div className="w-24">Action</div>
                </div>

                {/* Mock Row 1 (The target) */}
                <div className="flex items-center p-4 border-b border-slate-100 hover:bg-blue-50 transition-colors cursor-pointer group" onClick={handleOpenDeal}>
                    <div className="flex-1">
                        <div className="font-medium text-slate-800">{MOCK_CRM_DEAL.companyName}</div>
                        <div className="text-xs text-slate-500">Contact: {MOCK_CRM_DEAL.contactName}</div>
                    </div>
                    <div className="w-32">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                            {MOCK_CRM_DEAL.stage}
                        </span>
                    </div>
                    <div className="w-32 text-slate-700 font-medium">
                        ${MOCK_CRM_DEAL.value.toLocaleString()}
                    </div>
                    <div className="w-24">
                        <button className="text-blue-600 font-medium text-sm group-hover:underline">Open</button>
                    </div>
                </div>

                {/* Filler Rows */}
                <div className="flex items-center p-4 border-b border-slate-100 opacity-60">
                    <div className="flex-1">
                        <div className="font-medium text-slate-800">Globex Corp</div>
                        <div className="text-xs text-slate-500">Contact: Hank Scorpio</div>
                    </div>
                    <div className="w-32">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Closed Won</span>
                    </div>
                    <div className="w-32 text-slate-700 font-medium">$45,000</div>
                    <div className="w-24"></div>
                </div>
            </div>

            <h2 className="text-lg font-semibold text-slate-800 mt-8 mb-4">Recent Signals</h2>
            <div className="space-y-3">
                {MOCK_EMAILS.map(email => (
                    <div key={email.id} className="bg-white p-4 rounded-lg border border-slate-200 flex gap-4 items-start">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                            <Mail size={16} />
                        </div>
                        <div>
                            <div className="font-medium text-slate-800 text-sm">{email.subject}</div>
                            <div className="text-xs text-slate-500 mt-1">{email.sender} • {email.date}</div>
                            <div className="text-sm text-slate-600 mt-2 line-clamp-2">{email.body}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
                <div className="text-slate-500 text-sm font-medium">{title}</div>
                <div className="text-2xl font-bold text-slate-800 mt-1">{value}</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">{icon}</div>
        </div>
    );
}
