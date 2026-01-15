'use client';

import { AppProvider, useApp } from '@/lib/AppContext';
import { DashboardView } from '@/components/DashboardView';
import { EditorView } from '@/components/EditorView';

function AppContent() {
    const { viewMode } = useApp();

    return (
        <div className="flex-1 h-full relative">
            {viewMode === 'dashboard' ? <DashboardView /> : <EditorView />}
        </div>
    );
}

export default function Home() {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
}
