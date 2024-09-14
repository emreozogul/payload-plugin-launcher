import React from 'react';
import { Button } from './ui/button';

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
        <a href="#" className="group relative block bg-mixed-200/70 w-48 h-64 rounded-md">


            <div className="relative p-2 sm:p-4">
                <p className="text-xs font-medium uppercase tracking-widest text-pink-500">{plugin.type}</p>
                <p className="text-sm font-bold text-white sm:text-base">{plugin.name}</p>
                <p className="text-xs text-white">{plugin.description}</p>

                <div className="mt-16 sm:mt-24">
                    <div className="translate-y-4 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                        <Button variant="default" size="sm">Install</Button>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default PluginViewCard;