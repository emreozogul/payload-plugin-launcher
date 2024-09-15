import React from 'react';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import {
    PlayIcon,
    StopIcon,
    SettingsIcon,
    DeleteIcon,
} from '../icons';
interface PluginProps {
    plugin: {
        name: string;
        description: string;
        type: string;
        imageUrl: string;
    };
}

const PluginViewCard: React.FC<PluginProps> = ({ plugin }) => {
    return (
        <a href="#" className="group relative flex flex-col bg-mixed-300 w-48 h-48 rounded-md gap-4 p-4 hover:bg-mixed-300/70">
            <div className="h-full w-full  flex flex-1 ">
                <div className='w-full flex flex-col gap-1'>
                    <Label className="text-sm font-bold text-white sm:text-base">{plugin.name}</Label>

                    <Separator className="bg-slate-300" />
                    <Label className="text-xs font-medium uppercase tracking-widest text-pink-500">{plugin.type}</Label>


                </div>
            </div>
            <div className='flex flex-wrap w-full justify-end '>
                <div className='flex hover:bg-white/20 rounded-full h-9 w-9 items-center justify-center '>
                    <PlayIcon className=" w-6 h-6 text-white  " />
                </div>
                <div className='flex hover:bg-white/20 rounded-full h-9 w-9 items-center justify-center '>
                    <SettingsIcon className=" w-6 h-6 text-white  " />
                </div>
                <div className='flex hover:bg-white/20 rounded-full h-9 w-9 items-center justify-center '>
                    <DeleteIcon className=" w-6 h-6 text-red-600  " />
                </div>
            </div>
        </a>
    );
};

export default PluginViewCard;