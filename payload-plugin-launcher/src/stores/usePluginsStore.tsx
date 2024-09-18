import { create } from 'zustand';
import React from 'react';

import { PluginProps } from '@/models/Plugin';

interface PluginStore {
    plugins: PluginProps[];
    addPlugin: (plugin: PluginProps) => void;
    removePlugin: (pluginId: string) => void;
    getPlugins: () => PluginProps[];
}

const usePluginStore = create<PluginStore>()(
    (set, get) => ({
        plugins: [
            {
                id: "plugin-1",
                name: "Plugin 1",
                description: "This is the first plugin",
                icon: "https://via.placeholder.com/150",
                route: "/plugin-1",
                component: <div>Plugin 1</div>,
                status: "active",
                type: "type-1",
            },
            {
                id: "plugin-2",
                name: "Plugin 2",
                description: "This is the second plugin",
                icon: "https://via.placeholder.com/150",
                route: "/plugin-2",
                component: <div>Plugin 2</div>,
                status: "active",
                type: "type-2",
            },
            {
                id: "plugin-3",
                name: "Plugin 3",
                description: "This is the third plugin",
                icon: "https://via.placeholder.com/150",
                route: "/plugin-3",
                component: <div>Plugin 3</div>,
                status: "active",
                type: "type-3",
            },
            {
                id: "plugin-4",
                name: "Plugin 4",
                description: "This is the fourth plugin",
                icon: "https://via.placeholder.com/150",
                route: "/plugin-4",
                component: <div>Plugin 4</div>,
                status: "active",
                type: "type-4",
            },
            {
                id: "plugin-5",
                name: "Plugin 5",
                description: "This is the fifth plugin",
                icon: "https://via.placeholder.com/150",
                route: "/plugin-5",
                component: <div>Plugin 5</div>,
                status: "active",
                type: "type-5",
            }

        ],
        addPlugin: (plugin: PluginProps) => {
            const { plugins } = get();

            set({
                plugins: [...plugins, plugin],
            });
        },
        getPlugins: () => {
            return get().plugins; // TODO: add business logic 
        },
        removePlugin: (pluginId: string) => {
            const { plugins } = get();
            const filteredPlugins = plugins.filter(plugin => plugin.id !== pluginId);
            set({ plugins: filteredPlugins });
        },

    })
);

export default usePluginStore;