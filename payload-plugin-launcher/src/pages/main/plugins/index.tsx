import { AddIcon, CloseIcon } from "@/components/icons"; // Ensure you have a CloseIcon
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Custom Tabs components
import usePluginStore from "@/stores/usePluginsStore";
import useTabStore from "@/stores/useTabsStore";

export default function PluginsPage() {
    const { tabs, activeTab, addTab, removeTab, setActiveTab } = useTabStore();
    const { plugins } = usePluginStore();

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full flex items-center bg-mixed-200">
                {tabs.map((tab) => (
                    <div key={tab.id} className="flex items-center w-full max-w-24">
                        <TabsTrigger
                            value={tab.id}
                            className={`border-mixed-300 flex w-full justify-between items-center py-2 text-sm font-medium text-white/70 border-b-2 transition-colors duration-200 hover:text-white hover:border-white focus:outline-none ${activeTab === tab.id ? "bg-mixed-400" : ""
                                }`}
                        >
                            <span className="ml-1">
                                {tab.label}
                            </span>
                            {tab.isClosable && tab.id === activeTab ? (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering tab activation
                                        removeTab(tab.id);
                                    }}
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
                    onClick={() => addTab(plugins)}
                    disabled={tabs.length >= 6} // MAX_TABS is 6
                    className={`ml-2 flex items-center justify-center w-7 h-7 rounded-full hover:bg-mixed-300 ${tabs.length >= 6 ? "opacity-50 cursor-not-allowed" : ""
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