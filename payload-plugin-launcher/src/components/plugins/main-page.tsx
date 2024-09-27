import React, { useState, useMemo } from 'react';
import PluginViewCard from "../cards/PluginViewCard"
import UploadViewCard from "../cards/UploadViewCard"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function MainPage({ plugins }: { plugins: any[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAttribute, setFilterAttribute] = useState('all');

    const filteredPlugins = useMemo(() => {
        return plugins.filter(plugin =>
            (filterAttribute === 'all' || plugin.type === filterAttribute) &&
            (plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                plugin.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [plugins, searchTerm, filterAttribute]);

    const uniqueAttributes = useMemo(() => {
        const attributes = new Set(plugins.map(plugin => plugin.type));
        return ['all', ...Array.from(attributes)];
    }, [plugins]);

    return (
        <div className="flex flex-col w-full gap-4 p-4">
            <div className="flex items-center justify-center w-full">
                <div className="flex flex-col w-full gap-1">
                    <div className="flex w-full justify-between items-center">
                        <Label className="text-2xl font-bold text-white">Plugins</Label>
                        <div className="flex items-center justify-end gap-4">
                            <Input
                                type="text"
                                placeholder="Search plugins..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64"
                            />
                            <Select onValueChange={setFilterAttribute} defaultValue="all">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {uniqueAttributes.map((attr) => (
                                        <SelectItem key={attr} value={attr}>
                                            {attr.charAt(0).toUpperCase() + attr.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Separator className="bg-slate-300 mt-2" />
                </div>
            </div>
            <div className="flex items-center justify-center w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                    <UploadViewCard />
                    {filteredPlugins.map((plugin) => (
                        <PluginViewCard key={plugin.id} plugin={plugin} />
                    ))}
                </div>
            </div>
        </div>
    )
}