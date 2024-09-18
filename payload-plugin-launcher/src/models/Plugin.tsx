import React from 'react';
export type PluginProps = {
    id: string;
    name: string;
    description: string;
    icon: string;
    route: string;
    component: React.ReactNode;
    status: string;
    type: string;
}