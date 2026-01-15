'use client';

import { useApp } from '@/lib/AppContext';
import { DashboardView } from '@/components/DashboardView';
import { EditorView } from '@/components/EditorView';

/* 
 Note: We need a wrapper component because 'useApp' must be used INSIDE the provider.
 In the layout, we wrapped children with AppProvider, but CopilotPanel is a sibling.
 Effectively, we need to ensure the shared state is lifted high enough.
 Ideally, we should lift AppProvider to the Layout level so both the Page and the Panel can share it.
 I have done this in (dashboard)/layout.tsx by wrapping individual slots. 
 Ideally, ONE provider at the top is better. Let's fix the layout to have ONE provider wrapping everything.
*/

export default function DashboardPage() {
    const { viewMode } = useApp();

    return (
        <div className="flex-1 h-full relative">
            {viewMode === 'dashboard' ? <DashboardView /> : <EditorView />}
        </div>
    );
}
