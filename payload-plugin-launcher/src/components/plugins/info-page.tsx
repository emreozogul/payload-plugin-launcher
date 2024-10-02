import { PluginProps } from '@/models/Plugin';
import { Button } from '../ui/button';
import useTabStore from '@/stores/useTabsStore';


export default function InfoPage({ plugin }: { plugin: PluginProps }) {
    const { goToPrevContent, activeTab } = useTabStore();

    return (
        <div className="p-4">
            <Button onClick={() => {
                goToPrevContent(activeTab);
            }} className="mb-4">Back to Main</Button>
            <h1 className="text-2xl font-bold mb-2">{plugin.name}</h1>
            <p className="text-lg mb-4">{plugin.description}</p>
            {/* Add more plugin information here */}
        </div>
    );
}