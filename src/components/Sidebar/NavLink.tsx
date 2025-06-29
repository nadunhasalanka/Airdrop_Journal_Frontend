import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = ({ 
    href, 
    icon, 
    children, 
    isActive = false 
}: { 
    href: string; 
    icon: React.ReactNode; 
    children: React.ReactNode; 
    isActive?: boolean; 
}) => (
    <li>
        <Link 
            to={href}
            className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                ? 'bg-violet-600/15 text-violet-300 border border-violet-600/25' 
                : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
            }`}
        >
            <div className={`mr-3 ${isActive ? 'text-violet-400' : 'text-gray-500 group-hover:text-gray-300'}`}>
                {icon}
            </div>
            <span className="font-medium">{children}</span>
        </Link>
    </li>
);

export default NavLink;