import { create } from 'zustand';
import React from 'react';
import MainPage from '@/components/plugins/main-page';
import usePluginStore from './usePluginsStore';

export type Tab = {
    id: string;
    label: string;
    content: React.ReactNode;
    prevContent: React.ReactNode;
    isClosable: boolean;
    href: string;
}

export interface TabStore {
    tabs: Tab[];
    activeTab: string;
    addTab: () => void;
    removeTab: (tabId: string) => void;
    setActiveTab: (tabId: string) => void;
    setActiveContent: (tabId: string, content: React.ReactNode) => void;
    goToPrevContent: (tabId: string) => void;
    reorderTabs: (startIndex: number, endIndex: number) => void;
}

const MAX_TABS = 7;

const useTabStore = create<TabStore>()(
    (set, get) => ({
        tabs: [
            {
                id: "tab-1",
                label: "Tab 1",
                content: <MainPage plugins={usePluginStore.getState().plugins} />,
                prevContent: <MainPage plugins={usePluginStore.getState().plugins} />,
                isClosable: false,
                href: "/tab/tab-1",
            },
        ],
        activeTab: "tab-1",
        addTab: () => {
            const { tabs } = get();
            if (tabs.length >= MAX_TABS) {
                alert("Maximum number of tabs reached.");
                return;
            }

            const plugins = usePluginStore.getState().plugins;
            const initialContent = <MainPage plugins={plugins} />;

            const newTabId = `tab-${Date.now()}`;
            const newTab: Tab = {
                id: newTabId,
                label: `Tab ${tabs.length + 1}`,
                content: initialContent,
                prevContent: initialContent,
                isClosable: true,
                href: `/tab/${newTabId}`,
            };

            set({
                tabs: [...tabs, newTab],
                activeTab: newTabId,
            });
        },
        removeTab: (tabId: string) => {
            const { tabs, activeTab } = get();
            const filteredTabs = tabs.filter(tab => tab.id !== tabId);

            if (activeTab === tabId) {
                const tabIndex = tabs.findIndex(tab => tab.id === tabId);
                if (tabIndex > 0) {
                    set({ tabs: filteredTabs, activeTab: tabs[tabIndex - 1].id });
                } else if (filteredTabs.length > 0) {
                    set({ tabs: filteredTabs, activeTab: filteredTabs[0].id });
                } else {
                    set({ tabs: filteredTabs, activeTab: "" });
                }
            } else {
                set({ tabs: filteredTabs });
            }
        },
        setActiveTab: (tabId: string) => set({ activeTab: tabId }),
        setActiveContent: (tabId: string, content: React.ReactNode) => {
            set((state) => ({
                tabs: state.tabs.map(tab =>
                    tab.id === tabId
                        ? { ...tab, prevContent: tab.content, content }
                        : tab
                )
            }));
        },
        goToPrevContent: (tabId: string) => {
            set((state) => ({
                tabs: state.tabs.map(tab =>
                    tab.id === tabId
                        ? { ...tab, content: tab.prevContent, prevContent: tab.content }
                        : tab
                )
            }));
        },
        reorderTabs: (startIndex: number, endIndex: number) => {
            set((state) => {
                const newTabs = Array.from(state.tabs);
                const [reorderedItem] = newTabs.splice(startIndex, 1);
                newTabs.splice(endIndex, 0, reorderedItem);
                return { tabs: newTabs };
            });
        },
    })
);

export default useTabStore;