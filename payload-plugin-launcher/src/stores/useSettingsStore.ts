import { create } from 'zustand';
import React from 'react';

type Tab = 'Profile' | 'Notifications';

interface SettingsStore {
    selectedTab: Tab;
    setSelectedTab: (tab: Tab) => void;
}



const useSettingsStore = create<SettingsStore>()(
    (set, get) => ({
        selectedTab: 'Profile',
        setSelectedTab: (tab) => set({ selectedTab: tab }),
    })
);

export default useSettingsStore;