import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import useSettingsStore from "@/stores/useSettingsStore";

export default function SettingsPage() {
    const { selectedTab, setSelectedTab } = useSettingsStore();

    const renderCurrentPage = () => {
        switch (selectedTab) {
            case 'Profile':
                return <ProfilePage />;
            case 'Notifications':
                return <NotificationsPage />;
            default:
                return null;
        }
    }

    return (
        <div className="w-full h-full flex ">
            <div className="h-full bg-mixed-300 flex flex-col">
                <div
                    className={`hover:bg-mixed-400 w-full flex items-center px-4 py-2 cursor-pointer ${selectedTab === 'Profile' ? 'bg-mixed-400 text-white' : ''}`}
                    onClick={() => setSelectedTab('Profile')}
                >
                    Profile
                </div>
                <div
                    className={`hover:bg-mixed-400 w-full flex items-center px-4 py-2 cursor-pointer ${selectedTab === 'Notifications' ? 'bg-mixed-400 text-white' : ''}`}
                    onClick={() => setSelectedTab('Notifications')}
                >
                    Notifications
                </div>
            </div>
            <div className="p-4 w-full">
                {renderCurrentPage()}
            </div>
        </div>
    );
}

const ProfilePage: React.FC = () => {
    return (
        <div>
            <Card className="p-4">
                <div className="mb-4">
                    <label className="block text-sm font-medium">Username</label>
                    <input title="username" type="text" className="mt-1 block text-black border border-gray-300 rounded-md p-2" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Email</label>
                    <input title="email" type="email" className="mt-1 block text-black  border border-gray-300 rounded-md p-2" />
                </div>
                <Button>Update Profile</Button>
            </Card>
        </div>
    );
}

const NotificationsPage: React.FC = () => {
    return (
        <div>
            <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <span>Email Notifications</span>
                    <Switch />
                </div>
                <div className="flex items-center justify-between">
                    <span>SMS Notifications</span>
                    <Switch />
                </div>
            </Card>
        </div>
    );
}
