import React from 'react';

interface PluginLog {
    timestamp: string;
    plugin: string;
    message: string;
}

interface PluginLogsTableProps {
    logs: PluginLog[];
}

const PluginsLogsTable: React.FC<PluginLogsTableProps> = ({ logs }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-white">
                <thead className="text-xs uppercase bg-mixed-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Timestamp</th>
                        <th scope="col" className="px-6 py-3">Plugin</th>
                        <th scope="col" className="px-6 py-3">Message</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => (
                        <tr key={index} className="bg-mixed-300 border-b border-mixed-400">
                            <td className="px-6 py-4">{log.timestamp}</td>
                            <td className="px-6 py-4">{log.plugin}</td>
                            <td className="px-6 py-4">{log.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PluginsLogsTable;