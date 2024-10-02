import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';

interface RecommendedPluginProps {
    id: string;
    name: string;
    description: string;
}

interface RecommendedPluginsProps {
    plugins: RecommendedPluginProps[];
}

const RecommendedPlugins: React.FC<RecommendedPluginsProps> = ({ plugins }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plugins.map(plugin => (
                <Card key={plugin.id} className="bg-mixed-400">
                    <CardHeader>
                        <CardTitle>{plugin.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm mb-4">{plugin.description}</p>
                        <Button variant="default">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default RecommendedPlugins;