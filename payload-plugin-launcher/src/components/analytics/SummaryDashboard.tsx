import React from 'react';

interface SummaryDashboardProps {
    data: {
        totalPlugins: number;
        activePlugins: number;
        totalUsers: number;
        averageUptime: string;
    };
}

const SummaryDashboard: React.FC<SummaryDashboardProps> = ({ data }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-mixed-400 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white">Total Plugins</h3>
                <p className="text-2xl font-bold text-chart-1">{data.totalPlugins}</p>
            </div>
            <div className="bg-mixed-400 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white">Active Plugins</h3>
                <p className="text-2xl font-bold text-chart-2">{data.activePlugins}</p>
            </div>
            <div className="bg-mixed-400 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white">Total Users</h3>
                <p className="text-2xl font-bold text-chart-3">{data.totalUsers}</p>
            </div>
            <div className="bg-mixed-400 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white">Average Uptime</h3>
                <p className="text-2xl font-bold text-chart-4">{data.averageUptime}</p>
            </div>
        </div>
    );
};

export default SummaryDashboard;