
import React, { useState } from "react";
import PluginViewCard from "@/components/cards/PluginViewCard";
import UploadViewCard from "@/components/cards/UploadViewCard";
import { AddIcon, CloseIcon } from "@/components/icons"; // Ensure you have a CloseIcon
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Custom Tabs components


const plugins = [
    {
        id: '1',
        name: 'Plugin 1',
        description: 'Plugin 1 Description',
        version: '1.0.0',
        type: 'Type 1',
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: '2',
        name: 'Plugin 2',
        description: 'Plugin 2 Description',
        version: '1.0.0',
        type: 'Type 2',
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: '3',
        name: 'Plugin 3',
        description: 'Plugin 3 Description',
        version: '1.0.0',
        type: 'Type 3',
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: '4',
        name: 'Plugin 4',
        description: 'Plugin 4 Description',
        version: '1.0.0',
        type: 'Type 4',
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: '5',
        name: 'Plugin 5',
        description: 'Plugin 5 Description',
        version: '1.0.0',
        type: 'Type 5',
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: '6',
        name: 'Plugin 6',
        description: 'Plugin 6 Description',
        version: '1.0.0',
        type: 'Type 6',
        imageUrl: 'https://via.placeholder.com/150',
    },
];

const SettingsPage = () => (
    <div className="p-4 text-white">
        <h2 className="text-xl font-bold">Settings</h2>
        {/* Add your settings content here */}
    </div>
);

// Example NewTabContent Component with TypeScript
const NewTabContent: React.FC<{ tabId: string }> = ({ tabId }) => (
    <div className="p-4 text-white">
        <h2 className="text-xl font-bold">New Tab: {tabId}</h2>
        {/* Add content specific to the new tab here */}
    </div>
);

const MainPage = () => (
    <div className="flex flex-col w-full gap-4 p-4">
        <div className="flex items-center justify-center w-full">
            <div className="flex flex-col w-full">
                <div className="flex w-full justify-between">
                    <Label className="text-2xl font-bold text-white">Plugins</Label>
                    <div className="flex items-center justify-end">
                        <div className="px-2 py-1 rounded-full bg-mixed-400 cursor-pointer">
                            Settings
                        </div>
                    </div>
                </div>
                <Separator className="bg-slate-300" />
            </div>
        </div>
        <div className="flex items-center justify-center w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                <UploadViewCard />
                {plugins.map((plugin) => (
                    <PluginViewCard key={plugin.id} plugin={plugin} />
                ))}
            </div>
        </div>
    </div>
);

// Initial tabs setup
const initialTabs = [
    {
        id: "tab-1",
        label: "Main",
        content: <MainPage />,
        isClosable: false, // Main tab is not closable
    },
];

export default function PluginsPage() {
    const MAX_TABS = 6; // Define the maximum number of tabs allowed

    const [tabs, setTabs] = useState(initialTabs);
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    // Function to add a new tab
    const addTab = () => {
        if (tabs.length >= MAX_TABS) {
            // Optional: Provide feedback to the user
            alert("Maximum number of tabs reached.");
            return;
        }

        const newTabId = `tab-${Date.now()}`; // Unique ID based on timestamp
        const newTab = {
            id: newTabId,
            label: `Tab ${tabs.length + 1}`,
            content: <NewTabContent tabId={newTabId} />,
            isClosable: true, // New tabs are closable
        };
        setTabs([...tabs, newTab]);
        setActiveTab(newTabId);
    };

    // Function to remove a tab
    const removeTab = (tabId: string) => {
        const filteredTabs = tabs.filter((tab) => tab.id !== tabId);
        setTabs(filteredTabs);

        // If the removed tab was active, set the active tab to the previous one or the first tab
        if (activeTab === tabId) {
            const tabIndex = tabs.findIndex((tab) => tab.id === tabId);
            if (tabIndex > 0) {
                setActiveTab(tabs[tabIndex - 1].id);
            } else if (filteredTabs.length > 0) {
                setActiveTab(filteredTabs[0].id);
            } else {
                setActiveTab(""); // No tabs left
            }
        }
    };

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full flex items-center  bg-mixed-200">
                {tabs.map((tab) => (
                    <div key={tab.id} className="flex items-center w-full max-w-24">
                        <TabsTrigger
                            key={tab.id}
                            value={tab.id}
                            className={` border-mixed-300 flex w-full justify-between items-center py-2 text-sm font-medium text-white/70 border-b-2 transition-colors duration-200 hover:text-white hover:border-white focus:outline-none ${activeTab === tab.id
                                    ? " bg-mixed-400  "
                                    : ""
                                }`}
                        >
                            <span className="ml-1">
                                {tab.label}
                            </span>
                            {tab.isClosable && tab.id === activeTab ? (
                                <button
                                    type="button"
                                    onClick={() => removeTab(tab.id)}
                                    className="flex items-center justify-center w-4 h-4 focus:outline-none"
                                    aria-label={`Close ${tab.label}`}
                                >
                                    <CloseIcon size={16} className="text-gray-300 hover:text-gray-100 " />
                                </button>
                            ) : (
                                <div className="h-4 w-4"></div>
                            )}
                        </TabsTrigger>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addTab}
                    disabled={tabs.length >= MAX_TABS} // Disable the button when limit is reached
                    className={`ml-2 flex items-center justify-center w-7 h-7 rounded-full hover:bg-mixed-300 ${tabs.length >= MAX_TABS ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    aria-label="Add Tab"
                >
                    <AddIcon size={16} className="text-slate-300" />
                </button>
            </TabsList>
            {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id}>
                    {tab.content}
                </TabsContent>
            ))}
        </Tabs>
    );
}