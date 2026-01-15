import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { CopilotPanel } from '@/components/CopilotPanel';

export const metadata: Metadata = {
    title: 'Northstar Sales Agent',
    description: 'AI Agent for Sales Proposal Generation',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <div className="flex h-screen w-full bg-slate-50">
                    <Sidebar />
                    <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                        {children}
                    </main>
                    <CopilotPanel />
                </div>
            </body>
        </html>
    );
}
