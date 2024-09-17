import React from 'react';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import {
    PlayIcon,
    StopIcon,
    SettingsIcon,
    DeleteIcon,
} from '../icons';
import { Link } from 'react-router-dom';
import PluginProps from '@/models/Plugin';

export default function PluginViewCard({ plugin }: { plugin: PluginProps }) {

    return (
        <div className="group relative flex flex-col bg-mixed-300 min-w-48 min-h-48 rounded-md gap-4 p-4 hover:bg-mixed-300/70">
            <Link to={`/main/plugins/${plugin.id}`} className='h-full w-full  flex flex-1'>
                <div className="h-full w-full  flex flex-1 ">
                    <div className='w-full flex flex-col gap-1'>
                        <Label className=" font-bold text-white text-base">{plugin.name}</Label>
                        <Separator className="bg-slate-300" />
                        <Label className="text-xs font-medium uppercase tracking-widest text-pink-500">{plugin.type}</Label>
                    </div>
                </div>
            </Link>
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
        </div>
    );
};
