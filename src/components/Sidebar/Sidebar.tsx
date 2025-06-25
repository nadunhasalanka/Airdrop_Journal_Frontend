import React from 'react';
import NavLink from './NavLink';

// --- ICONS (can be moved to a separate file) ---
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const AirdropsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const WalletIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;

const Sidebar = () => {
    return (
        <aside className="fixed top-0 left-0 h-full w-64 bg-slate-900/70 backdrop-blur-lg border-r border-slate-800 flex flex-col z-30">
            {/* Logo Section */}
            <div className="flex items-center justify-center h-20 border-b border-slate-800 flex-shrink-0">
                 <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1V4m0 12v1m0 1v1m0 1v1M4 12H3m1 0h1m16 0h-1m-1 0h-1M12 4c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" />
                    </svg>
                    <span className="text-xl font-bold text-slate-100">Airdrop Journal</span>
                </div>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex-grow p-4">
                <ul>
                    <NavLink href="/dashboard" icon={<DashboardIcon />} isActive={true}>
                        Dashboard
                    </NavLink>
                    <NavLink href="/airdrops" icon={<AirdropsIcon />}>
                        All Airdrops
                    </NavLink>
                    <NavLink href="/wallets" icon={<WalletIcon />}>
                        Wallets
                    </NavLink>
                    <NavLink href="/settings" icon={<SettingsIcon />}>
                        Settings
                    </NavLink>
                </ul>
            </nav>

            {/* User Profile / Logout */}
            <div className="p-4 border-t border-slate-800 flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img src="https://placehold.co/40x40/6366F1/FFFFFF?text=A" alt="User Avatar" className="w-10 h-10 rounded-full" />
                        <div className="ml-3">
                            <p className="text-sm font-semibold text-slate-100">A. Hunter</p>
                            <p className="text-xs text-slate-400">Pro Member</p>
                        </div>
                    </div>
                     <a href="/logout" className="text-slate-500 hover:text-indigo-400 transition">
                        <LogoutIcon />
                    </a>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
