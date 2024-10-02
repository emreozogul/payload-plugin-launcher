import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchStorePlugins, fetchRecommendedPlugins } from '../../../services/calls';
import StorePluginCard from '../../../components/store/StorePluginCard';
import RecommendedPlugins from '../../../components/store/RecommendedPlugins';




export default function StorePage() {
    const [storePlugins, setStorePlugins] = useState<any>([]);
    const [recommendedPlugins, setRecommendedPlugins] = useState<any>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        const loadData = async () => {
            const plugins = await fetchStorePlugins();
            const recommended = await fetchRecommendedPlugins();
            setStorePlugins(plugins as any);
            setRecommendedPlugins(recommended as any);
        };
        loadData();
    }, []);

    const filteredPlugins = storePlugins.filter((plugin: any) =>
        plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plugin.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 bg-mixed-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-white">Plugin Store</h1>
            <div className="mb-6">
                <Input
                    type="text"
                    placeholder="Search plugins..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md"
                />
            </div>
            <Card className="bg-mixed-300 mb-6">
                <CardHeader>
                    <CardTitle>Recommended Plugins</CardTitle>
                </CardHeader>
                <CardContent>
                    <RecommendedPlugins plugins={recommendedPlugins} />
                </CardContent>
            </Card>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="all">All Plugins</TabsTrigger>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                    <TabsTrigger value="new">New</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPlugins.map((plugin: any) => (
                            <StorePluginCard key={plugin.id} {...plugin} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="popular">
                    {/* Add popular plugins content */}
                </TabsContent>
                <TabsContent value="new">
                    {/* Add new plugins content */}
                </TabsContent>
            </Tabs>
        </div>
    );
}