import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ResourceUsageChartProps {
    data: Array<{
        name: string;
        ram: number;
        gpu: number;
    }>;
}

const ResourceUsageChart: React.FC<ResourceUsageChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                <XAxis dataKey="name" stroke="#e2e8f0" />
                <YAxis stroke="#e2e8f0" />
                <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: 'none' }} />
                <Legend />
                <Bar dataKey="ram" fill="#8884d8" name="RAM Usage (MB)" />
                <Bar dataKey="gpu" fill="#82ca9d" name="GPU Usage (MB)" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ResourceUsageChart;
