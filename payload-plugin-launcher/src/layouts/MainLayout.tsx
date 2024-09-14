import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';

const MainLayout = () => {
    return (
        <div className="flex max-h-screen w-full bg-mixed-100 text-white text-md p-0 m-0">
            <Sidebar />
            <div className="overflow-y-scroll w-full h-screen p-2">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;