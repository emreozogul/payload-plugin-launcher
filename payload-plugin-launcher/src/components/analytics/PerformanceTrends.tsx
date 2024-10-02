import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PerformanceTrendsProps {
    data: Array<{
        date: string;
        avgResponseTime: number;
        errorRate: number;
    }>;
}

const PerformanceTrends: React.FC<PerformanceTrendsProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                <XAxis dataKey="date" stroke="#e2e8f0" />
                <YAxis yAxisId="left" stroke="#e2e8f0" />
                <YAxis yAxisId="right" orientation="right" stroke="#e2e8f0" />
                <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: 'none' }} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="avgResponseTime" stroke="#8884d8" name="Avg Response Time (ms)" />
                <Line yAxisId="right" type="monotone" dataKey="errorRate" stroke="#82ca9d" name="Error Rate (%)" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default PerformanceTrends;
