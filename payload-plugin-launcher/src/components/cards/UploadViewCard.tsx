import { Upload } from "lucide-react"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"

export default function UploadViewCard() {
    return (

        <div className="group relative flex flex-col bg-mixed-300 min-w-48 h-48 rounded-md gap-4 p-4 hover:bg-mixed-300/70">
            <div className="absolute inset-0 h-full w-full  flex flex-col flex-1 overflow-y-hidden">
                <div className='w-full p-4 flex flex-col gap-1'>

                    <Label className="text-md font-bold text-white">Upload Plugin</Label>
                    <Separator className="bg-slate-300" />
                </div>
                <div className="group-hover:-translate-y-1 flex flex-1 h-full w-full items-center justify-center">
                    <Upload size={40} className="text-white mb-4" />
                </div>
            </div>
        </div>

    )

}