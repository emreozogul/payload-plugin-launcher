import { PluginProps } from '@/models/Plugin';

export default function InfoPage({ plugin }: { plugin: PluginProps }) {
    return (
        <div>
            <h1>Info</h1>
            <p>{plugin.description}</p>
        </div>
    );
}