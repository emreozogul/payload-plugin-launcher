import React from 'react';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import {
    PlayIcon,
    StopIcon,
    DeleteIcon,
    RefreshIcon,
} from '../icons';
import { PluginProps } from '@/models/Plugin';
import useTabStore from '@/stores/useTabsStore';
import InfoPage from '../plugins/info-page';

type PluginAction = {
    icon: React.ReactNode;
    action: () => void;
    className?: string;
};

export default function PluginViewCard({ plugin }: { plugin: PluginProps }) {

    const handlePluginAction = (actionType: string) => {
        switch (actionType) {
            case 'play':
                console.log('Play action');
                // Implement play logic here
                break;
            case 'refresh':
                console.log('Refresh action');
                // Implement refresh logic here
                break;
            case 'stop':
                console.log('Stop action');
                // Implement stop logic here
                break;
            case 'delete':
                console.log('Delete action');
                // Implement delete logic here
                break;
            default:
                console.log('Unknown action');
        }
    };

    const pluginActions: PluginAction[] = [
        { icon: <PlayIcon className="w-6 h-6 text-white" />, action: () => handlePluginAction('play') },
        { icon: <RefreshIcon className="w-6 h-6 text-white" />, action: () => handlePluginAction('refresh') },
        { icon: <StopIcon className="w-6 h-6 text-white" />, action: () => handlePluginAction('stop') },
        { icon: <DeleteIcon className="w-6 h-6 text-red-600" />, action: () => handlePluginAction('delete') },
    ];

    const { setActiveContent } = useTabStore();

    return (
        <div className="group relative flex flex-col bg-mixed-300 min-w-48 min-h-48 rounded-md gap-4 p-4 hover:bg-mixed-300/70">
            <div onClick={() => {
                setActiveContent(<InfoPage plugin={plugin} />);
            }} className='h-full w-full  flex flex-1'>
                <div className="h-full w-full  flex flex-1 ">
                    <div className='w-full flex flex-col gap-1'>
                        <Label className=" font-bold text-white text-base">{plugin.name}</Label>
                        <Separator className="bg-slate-300" />
                        <Label className="text-xs font-medium uppercase tracking-widest text-pink-500">{plugin.type}</Label>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap w-full justify-end'>
                {pluginActions.map((action, index) => (
                    <div
                        key={index}
                        className='flex hover:bg-white/20 rounded-full h-9 w-9 items-center justify-center cursor-pointer'
                        onClick={action.action}
                    >
                        {action.icon}
                    </div>
                ))}
            </div>
        </div>
    );
};
