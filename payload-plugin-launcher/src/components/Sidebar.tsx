import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    AnalyticsIcon,
    PluginIcon,
    SettingsIcon,
    StoreIcon,
    UserProfileIcon,
    LogoIcon
} from './icons';

const MENU_ITEMS = [

    {
        label: 'Plugins',
        href: '/main/plugins',
        icon: PluginIcon
    },
    {
        label: 'Analytics',
        href: '/main/analytics',
        icon: AnalyticsIcon
    },
    {
        label: 'Store',
        href: '/main/store',
        icon: StoreIcon
    },
    {
        label: 'Settings',
        href: '/main/settings',
        icon: SettingsIcon
    },

];

export default function Sidebar() {
    const [expanded, setExpanded] = useState(false);
    const location = useLocation(); // Hook to get the current location

    return (
        <aside className=" h-screen text-white font-bold"
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
        >
            <nav className="h-full flex flex-col bg-mixed-300 border-r shadow-sm">
                <div className="flex items-center px-4 py-3 w-full">
                    <Link to="/main" className="flex items-center gap-4  ">
                        <LogoIcon className="text-blue-200 w-12 h-12" />
                        {expanded && <span className='text-3xl'>PPL</span>}
                    </Link>
                </div>

                <ul className="flex-1">
                    {MENU_ITEMS.map((item, index) => {
                        const isActive = location.pathname === item.href;

                        return (
                            <Link to={item.href} className="flex items-center ">
                                <li
                                    key={index}
                                    className={`flex items-center gap-6 py-3 px-7 w-full   ${isActive ? 'bg-mixed-600' : 'hover:bg-mixed-400'}`}
                                >

                                    <item.icon className="" />
                                    {expanded && <span>{item.label}</span>}

                                </li>
                            </Link>
                        );
                    })}
                </ul>
                <Link to="/main/profile" className=" border-t flex items-center">
                    <div className="flex p-3 px-6">
                        <UserProfileIcon className="w-8 h-8" />
                        <div className={`flex gap-4 items-center overflow-hidden transition-all ${expanded ? "w-24 ml-3" : "w-0"} `}>
                            <div className="leading-4">
                                <h4 className="font-semibold">username</h4>
                                <span className="text-xs text-gray-600">email</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </nav>
        </aside>
    );
}