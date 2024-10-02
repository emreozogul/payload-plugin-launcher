import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SummaryDashboard from '../../../components/analytics/SummaryDashboard';
import ResourceUsageChart from '../../../components/analytics/ResourceUsageChart';
import PerformanceTrends from '../../../components/analytics/PerformanceTrends';
import ActiveUsersChart from '../../../components/analytics/ActiveUsersChart';
import PluginsLogsTable from '../../../components/analytics/PluginsLogsTable';
import { fetchAnalyticsData } from '../../../services/calls';

export default function AnalyticsPage() {
    const [analyticsData, setAnalyticsData] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchAnalyticsData();
                setAnalyticsData(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) return <div className="text-center p-8">Loading...</div>;
    if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;
    if (!analyticsData) return null;

    return (
        <div className="p-6 bg-mixed-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-white">Analytics Dashboard</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-mixed-300">
                    <CardHeader>
                        <CardTitle>Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <SummaryDashboard data={analyticsData.summary} />
                    </CardContent>
                </Card>
                <Card className="bg-mixed-300">
                    <CardHeader>
                        <CardTitle>Resource Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResourceUsageChart data={analyticsData.resourceUsage} />
                    </CardContent>
                </Card>
                <Card className="bg-mixed-300">
                    <CardHeader>
                        <CardTitle>Performance Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PerformanceTrends data={analyticsData.performanceTrends} />
                    </CardContent>
                </Card>
                <Card className="bg-mixed-300">
                    <CardHeader>
                        <CardTitle>Active Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ActiveUsersChart data={analyticsData.activeUsers} />
                    </CardContent>
                </Card>
            </div>
            <Card className="bg-mixed-300 mt-6">
                <CardHeader>
                    <CardTitle>Plugin Logs</CardTitle>
                </CardHeader>
                <CardContent>
                    <PluginsLogsTable logs={analyticsData.logs} />
                </CardContent>
            </Card>
        </div>
    );
}