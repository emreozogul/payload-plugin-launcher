import PluginViewCard from "../cards/PluginViewCard"
import UploadViewCard from "../cards/UploadViewCard"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"


export default function MainPage({ plugins }: { plugins: any[] }) {

    return (
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
    )
}