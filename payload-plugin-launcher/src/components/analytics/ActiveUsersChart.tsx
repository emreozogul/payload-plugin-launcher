import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface ActiveUsersChartProps {
    data: Array<{
        date: string;
        activeUsers: number;
    }>;
}

const ActiveUsersChart: React.FC<ActiveUsersChartProps> = ({ data }) => {
    return (
        <div>
            <h2>Active Users</h2>
            <AreaChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="activeUsers" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </div>
    );
};

export default ActiveUsersChart;