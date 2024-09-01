import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
    return (
        <div className="flex min-h-screen w-full bg-black">
            <Sidebar />
            <div className="flex-grow ">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;