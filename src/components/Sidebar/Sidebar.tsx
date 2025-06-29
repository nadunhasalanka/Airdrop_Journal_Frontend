import React from 'react';
import { useLocation } from 'react-router-dom';
import NavLink from './NavLink';

// Simplified, modern icons
const DashboardIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
    </svg>
);

const AirdropsIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const TasksIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const NewsIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
);

const MarketIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

const SettingsIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const LogoutIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

const Sidebar = () => {
    const location = useLocation();
    
    return (
        <aside className="fixed top-0 left-0 h-full w-64 bg-gray-950/90 backdrop-blur-xl border-r border-gray-800/40 flex flex-col z-30">
            {/* Logo Section */}
            <div className="flex items-center justify-center h-20 border-b border-gray-800/40 flex-shrink-0">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                    </div>
                    <span className="text-xl font-semibold text-gray-100">Airdrop Journal</span>
                </div>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex-grow p-6">
                <ul className="space-y-2">
                    <NavLink href="/dashboard" icon={<DashboardIcon />} isActive={location.pathname === '/dashboard'}>
                        Dashboard
                    </NavLink>
                    <NavLink href="/airdrops" icon={<AirdropsIcon />} isActive={location.pathname === '/airdrops'}>
                        All Airdrops
                    </NavLink>
                    <NavLink href="/tasks" icon={<TasksIcon />} isActive={location.pathname === '/tasks'}>
                        Today's Tasks
                    </NavLink>
                    <NavLink href="/news" icon={<NewsIcon />} isActive={location.pathname === '/news'}>
                        Airdrop News
                    </NavLink>
                    <NavLink href="/market" icon={<MarketIcon />} isActive={location.pathname === '/market'}>
                        Market & Analysis
                    </NavLink>
                    <NavLink href="/settings" icon={<SettingsIcon />} isActive={location.pathname === '/settings'}>
                        Settings
                    </NavLink>
                </ul>
            </nav>

            {/* User Profile */}
            <div className="p-6 border-t border-gray-800/40 flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <img 
                            src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop" 
                            alt="User Avatar" 
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <p className="text-sm font-medium text-gray-100">A. Hunter</p>
                            <p className="text-xs text-gray-400">Pro Member</p>
                        </div>
                    </div>
                    <button className="text-gray-500 hover:text-violet-400 transition-colors p-1 rounded-md">
                        <LogoutIcon />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;