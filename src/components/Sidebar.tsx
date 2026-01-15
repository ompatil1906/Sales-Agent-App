'use client';

import { LayoutDashboard, FileText, Settings, Briefcase, Users } from 'lucide-react';
import Link from 'next/link';

export function Sidebar() {
    return (
        <div className="w-16 flex flex-col items-center py-4 bg-white border-r border-slate-200 h-full">
            <div className="mb-8 p-2 bg-blue-600 rounded-lg text-white">
                <Briefcase size={24} />
            </div>

            <nav className="flex flex-col gap-6">
                <NavLink icon={<LayoutDashboard size={20} />} active />
                <NavLink icon={<Users size={20} />} />
                <NavLink icon={<FileText size={20} />} />
                <NavLink icon={<Settings size={20} />} />
            </nav>
        </div>
    );
}

function NavLink({ icon, active }: { icon: React.ReactNode, active?: boolean }) {
    return (
        <button className={`p-3 rounded-xl transition-all ${active ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
            {icon}
        </button>
    );
}
