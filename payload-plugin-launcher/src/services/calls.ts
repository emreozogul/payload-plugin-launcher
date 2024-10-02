// This is a mock API file. Replace with actual API calls in your implementation.

export const fetchAnalyticsData = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        summary: {
            totalPlugins: 10,
            activePlugins: 7,
            totalUsers: 1000,
            averageUptime: "99.9%"
        },
        resourceUsage: [
            { name: 'Plugin A', ram: 400, gpu: 200 },
            { name: 'Plugin B', ram: 300, gpu: 400 },
            { name: 'Plugin C', ram: 200, gpu: 300 },
            { name: 'Plugin D', ram: 500, gpu: 100 },
        ],
        performanceTrends: [
            { date: '2023-04-01', avgResponseTime: 100, errorRate: 0.5 },
            { date: '2023-04-02', avgResponseTime: 120, errorRate: 0.7 },
            { date: '2023-04-03', avgResponseTime: 90, errorRate: 0.3 },
            { date: '2023-04-04', avgResponseTime: 110, errorRate: 0.6 },
        ],
        activeUsers: [
            { date: '2023-04-01', activeUsers: 500 },
            { date: '2023-04-02', activeUsers: 550 },
            { date: '2023-04-03', activeUsers: 600 },
            { date: '2023-04-04', activeUsers: 580 },
        ],
        logs: [
            { timestamp: '2023-04-10 10:30:00', plugin: 'Plugin A', message: 'Started successfully' },
            { timestamp: '2023-04-10 10:31:15', plugin: 'Plugin B', message: 'Error: Unable to load resource' },
            { timestamp: '2023-04-10 10:32:30', plugin: 'Plugin C', message: 'Processing data...' },
        ],
    };
};

export const fetchStorePlugins = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    return [
        { id: '1', name: 'Plugin A', description: 'A useful plugin', likes: 10, comments: [] },
        { id: '2', name: 'Plugin B', description: 'Another great plugin', likes: 15, comments: [] },
        { id: '3', name: 'Plugin C', description: 'An amazing plugin', likes: 20, comments: [] },
    ];
};

export const fetchRecommendedPlugins = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    return [
        { id: '4', name: 'Recommended Plugin 1', description: 'You might like this plugin' },
        { id: '5', name: 'Recommended Plugin 2', description: 'This plugin is popular' },
        { id: '6', name: 'Recommended Plugin 3', description: 'Try this new plugin' },
    ];
};