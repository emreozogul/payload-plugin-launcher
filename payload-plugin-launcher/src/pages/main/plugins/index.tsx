import { AddIcon, CloseIcon } from "@/components/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import usePluginStore from "@/stores/usePluginsStore";
import useTabStore, { Tab } from "@/stores/useTabsStore";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

interface SortableTabProps {
    tab: Tab;
    activeTab: string;
    removeTab: (tabId: string) => void;
}

function SortableTab({ tab, activeTab, removeTab }: SortableTabProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: tab.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        removeTab(tab.id);
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} className="flex items-center w-full max-w-24">
            <div className={`border-mixed-300 flex  w-full flex-grow flex items-center px-1 text-sm font-medium text-white/70 border-b-2 transition-colors duration-200 focus:outline-none ${activeTab === tab.id ? "bg-mixed-400 border-white" : "hover:text-white/80 hover:border-white/50 "}`}>
                <TabsTrigger
                    value={tab.id}
                    {...listeners}
                    className="flex-grow flex"
                >
                    <span className="ml-1">{tab.label}</span>
                </TabsTrigger>
                {tab.isClosable && tab.id === activeTab ? (
                    <div
                        onClick={handleRemove}
                        className="ml-2 flex items-center justify-center w-4 h-4 focus:outline-none cursor-pointer"
                        aria-label={`Close ${tab.label}`}
                    >
                        <CloseIcon size={16} className="text-gray-300 hover:text-gray-100" />
                    </div>
                ) : (
                    <div className="h-4 w-4"></div>
                )}
            </div>
        </div>
    );
}

export default function PluginsPage() {
    const { tabs, activeTab, addTab, removeTab, setActiveTab, reorderTabs } = useTabStore();
    const { plugins } = usePluginStore();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = tabs.findIndex((tab) => tab.id === active.id);
            const newIndex = tabs.findIndex((tab) => tab.id === over?.id);
            reorderTabs(oldIndex, newIndex);
        }
    }

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={tabs.map(tab => tab.id)} strategy={horizontalListSortingStrategy}>
                    <TabsList className="sticky top-0 w-full flex items-center bg-mixed-200">
                        {tabs.map((tab) => (
                            <SortableTab key={tab.id} tab={tab} activeTab={activeTab} removeTab={removeTab} />
                        ))}
                        <button
                            type="button"
                            onClick={() => addTab()}
                            disabled={tabs.length >= 6}
                            className={`ml-2 flex items-center justify-center w-7 h-7 rounded-full hover:bg-mixed-300 ${tabs.length >= 6 ? "opacity-50 cursor-not-allowed" : ""}`}
                            aria-label="Add Tab"
                        >
                            <AddIcon size={16} className="text-slate-300" />
                        </button>
                    </TabsList>
                </SortableContext>
            </DndContext>
            {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id}>
                    {tab.content}
                </TabsContent>
            ))}
        </Tabs>
    );
}