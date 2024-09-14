import PluginViewCard from "@/components/PluginViewCard";
import { Label } from "@/components/ui/label";

export default function PluginsPage() {
    const plugins = [
        { name: 'Plugin 1', type: 'Developer Tool', description: 'A great plugin', imageUrl: 'https://image-url' },
        { name: 'Plugin 2', type: 'Utility', description: 'A helpful utility', imageUrl: 'https://image-url' },
    ];

    return (
        <div className="flex flex-col w-full gap-4">
            <Label className="text-xl font-bold">Available Plugins</Label>
            <div className="flex items-center justify-center w-full">
                <div className="flex flex-wrap w-full p-4 gap-4">
                    {plugins.map((plugin, index) => (
                        <PluginViewCard key={index} plugin={plugin} />
                    ))}
                </div>
            </div>
        </div>
    );
}