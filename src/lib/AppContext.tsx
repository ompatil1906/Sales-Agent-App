'use client';

import React, { createContext, useContext, useState } from 'react';
import { MOCK_CRM_DEAL, CRMDeal } from '@/lib/mockDB';

type ViewMode = 'dashboard' | 'editor';

interface AppState {
    viewMode: ViewMode;
    setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
    currentDeal: CRMDeal | null;
    setCurrentDeal: React.Dispatch<React.SetStateAction<CRMDeal | null>>;
    proposalContent: string;
    setProposalContent: React.Dispatch<React.SetStateAction<string>>;
    isGenerating: boolean;
    setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
    toast: { message: string; type: 'success' | 'info' } | null;
    showToast: (message: string, type?: 'success' | 'info') => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
    const [currentDeal, setCurrentDeal] = useState<CRMDeal | null>(null);
    const [proposalContent, setProposalContent] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

    const showToast = (message: string, type: 'success' | 'info' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <AppContext.Provider value={{
            viewMode, setViewMode,
            currentDeal, setCurrentDeal,
            proposalContent, setProposalContent,
            isGenerating, setIsGenerating,
            toast, showToast
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within AppProvider');
    return context;
}
