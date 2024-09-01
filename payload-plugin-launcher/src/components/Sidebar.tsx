import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <aside className="flex flex-col p-2">
            <div className="sidebar-header">
                {// logo here
                }
            </div>
            <div className="sidebar-content">
                <ul>
                    {
                        // Sidebar items here
                    }
                </ul>
            </div>
        </aside>
    );
}