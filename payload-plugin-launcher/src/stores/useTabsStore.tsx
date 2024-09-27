import { create } from 'zustand';
import React from 'react';
import MainPage from '@/components/plugins/main-page';
import usePluginStore from './usePluginsStore';

export type Tab = {
    id: string;
    label: string;
    content: React.ReactNode;
    isClosable: boolean;
    href: string;
}

export interface TabStore {
    tabs: Tab[];
    activeTab: string;
    addTab: (plugins: any[]) => void;
    removeTab: (tabId: string) => void;
    setActiveTab: (tabId: string) => void;
    setActiveContent: (content: React.ReactNode) => void;
    reorderTabs: (startIndex: number, endIndex: number) => void;
}

const MAX_TABS = 6; // Define the maximum number of tabs allowed


const useTabStore = create<TabStore>()(
    (set, get) => ({
        tabs: [
            {
                id: "tab-1",
                label: "Tab 1",
                content: <MainPage plugins={usePluginStore.getState().plugins} />,
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

            const newTabId = `tab-${Date.now()}`;
            const newTab: Tab = {
                id: newTabId,
                label: `Tab ${tabs.length + 1}`,
                content: <MainPage plugins={plugins} />,
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
            console.log("Before removal - tabs:", tabs, "activeTab:", activeTab);
            const filteredTabs = tabs.filter(tab => tab.id !== tabId);
            console.log("After removal - filteredTabs:", filteredTabs);

            if (activeTab === tabId) {
                const tabIndex = tabs.findIndex(tab => tab.id === tabId);
                console.log("Removing active tab, index:", tabIndex);
                if (tabIndex > 0) {
                    set({ tabs: filteredTabs, activeTab: tabs[tabIndex - 1].id });
                } else if (filteredTabs.length > 0) {
                    set({ tabs: filteredTabs, activeTab: filteredTabs[0].id });
                } else {
                    set({ tabs: filteredTabs, activeTab: "" }); // No tabs left
                }
            } else {
                set({ tabs: filteredTabs });
            }
            console.log("After state update - tabs:", get().tabs, "activeTab:", get().activeTab);
        },
        setActiveTab: (tabId: string) => set({ activeTab: tabId }),
        setActiveContent: (content: React.ReactNode) => {
            const { tabs, activeTab } = get();
            const activeTabIndex = tabs.findIndex(tab => tab.id === activeTab);
            const updatedTabs = [...tabs];
            updatedTabs[activeTabIndex].content = content;
            set({ tabs: updatedTabs });
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