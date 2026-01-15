'use client';

import { Sidebar } from '@/components/Sidebar';
import { CopilotPanel } from '@/components/CopilotPanel';
import { AppProvider } from '@/lib/AppContext';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AppProvider>
            <div className="flex h-screen w-full bg-slate-50">
                <Sidebar />
                <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                    {children}
                </main>
                <CopilotPanel />
            </div>
        </AppProvider>
    );
}
