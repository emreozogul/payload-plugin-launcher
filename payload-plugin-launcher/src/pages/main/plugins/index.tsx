import PluginViewCard from "@/components/cards/PluginViewCard";
import UploadViewCard from "@/components/cards/UploadViewCard";
import { PlayIcon } from "@/components/icons";
import { FileUpload } from "@/components/ui/file-upload";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function PluginsPage() {
    const plugins = [
        { name: 'Plugin 1', type: 'Developer Tool', description: 'A great plugin', imageUrl: 'https://image-url' },
        { name: 'Plugin 2', type: 'Utility', description: 'A helpful utility', imageUrl: 'https://image-url' },
        { name: 'Plugin 1', type: 'Developer Tool', description: 'A great plugin', imageUrl: 'https://image-url' },
        { name: 'Plugin 2', type: 'Utility', description: 'A helpful utility', imageUrl: 'https://image-url' },
        { name: 'Plugin 1', type: 'Developer Tool', description: 'A great plugin', imageUrl: 'https://image-url' },
        { name: 'Plugin 2', type: 'Utility', description: 'A helpful utility A helpful utility A helpful utility A helpful utility A helpfulasadasdasdasdsaasdasdasdsa utility A helpful utility hover:opacity-50 hover:opacity-50 hover:opacity-50 hover:opacity-50 hover:opacity-50', imageUrl: 'https://image-url' },
    ];

    return (
        <div className="flex flex-col w-full gap-4 p-4">
            <div className="flex items-center justify-center w-full ">
                <div className="flex flex-col w-full">
                    <div className="flex w-full justify-between">
                        <Label className="text-2xl font-bold text-white">Plugins</Label>
                        <div className="flex w-full items-center justify-end">
                            <div className=" px-2 h-6 rounded-full bg-mixed-400">
                                Settins

                            </div>


                        </div>
                    </div>
                    <Separator className="bg-slate-300" />


                </div>

            </div>
            <div className="flex items-center justify-center w-full">
                <div className="flex flex-wrap w-full gap-4">
                    <UploadViewCard />
                    {plugins.map((plugin, index) => (
                        <PluginViewCard key={index} plugin={plugin} />
                    ))}
                </div>
            </div>
        </div>
    );
}