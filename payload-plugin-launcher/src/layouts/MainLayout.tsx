import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';

const MainLayout = () => {
    return (
        <div className="flex min-h-screen w-full bg-mixed-100">
            <Sidebar />
            <div className="flex-grow ">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;