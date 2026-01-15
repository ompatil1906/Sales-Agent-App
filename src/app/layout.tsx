import type { Metadata } from 'next';
import './globals.css';

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
            <body className="h-screen w-full bg-slate-50 overflow-hidden">
                {children}
            </body>
        </html>
    );
}
