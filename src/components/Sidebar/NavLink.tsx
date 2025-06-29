import React from 'react';

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
        <a 
            href={href}
            className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
        >
            <div className={`mr-3 ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                {icon}
            </div>
            <span className="font-medium">{children}</span>
        </a>
    </li>
);

export default NavLink;