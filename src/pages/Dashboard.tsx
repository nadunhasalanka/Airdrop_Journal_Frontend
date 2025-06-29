import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '@/components/Sidebar/Sidebar';
import Card from '@/components/Dashboard/Card';
import AirdropNews from '@/components/Dashboard/AirdropNews';
import TasksToday from '@/components/Dashboard/TaskToday';

const Dashboard = () => {
    const airdrops = [
        { name: 'ZkSync', status: 'Farming', tasks: '5/12', deadline: 'TBA' },
        { name: 'LayerZero', status: 'Farming', tasks: '23/30', deadline: 'TBA' },
        { name: 'Starknet', status: 'Claimable', tasks: 'Done', deadline: '14 days' },
        { name: 'Wormhole', status: 'Completed', tasks: 'Done', deadline: '-' },
    ];

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Farming': return 'status-farming';
            case 'Claimable': return 'status-claimable animate-pulse';
            case 'Completed': return 'status-completed';
            default: return 'status-upcoming';
        }
    };

    return (
        <div className="bg-gray-950 min-h-screen">
            <Sidebar />
            <main className="lg:ml-64 text-gray-200">
                <div className="relative p-4 lg:p-8 max-w-7xl mx-auto">
                    {/* Subtle background effects */}
                    <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(124,58,237,0.04)_0%,rgba(168,85,247,0.02)_50%,transparent_70%)] -z-10 filter blur-[100px]"></div>

                    {/* Header */}
                    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 lg:mb-12 gap-6 pt-16 lg:pt-0">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-100 mb-2">Dashboard</h1>
                            <p className="text-gray-400">Welcome back, Airdrop Hunter!</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/airdrops/add" className="btn-primary text-sm lg:text-base">
                                Add New Airdrop
                            </Link>
                            <button className="btn-ghost p-2.5">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </button>
                        </div>
                    </header>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">
                        {/* Tasks Section */}
                        <div className="xl:col-span-1">
                            <TasksToday />
                        </div>
                        
                        {/* Airdrops Table */}
                        <div className="xl:col-span-2">
                            <Card>
                                <div className="p-4 lg:p-6">
                                    <h2 className="text-lg lg:text-xl font-semibold text-gray-100 mb-4 lg:mb-6">Your Tracked Airdrops</h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="border-b border-gray-800/40">
                                                <tr>
                                                    <th className="text-left p-2 lg:p-4 font-medium text-gray-400 text-sm lg:text-base">Project</th>
                                                    <th className="text-left p-2 lg:p-4 font-medium text-gray-400 text-sm lg:text-base">Status</th>
                                                    <th className="text-left p-2 lg:p-4 font-medium text-gray-400 text-sm lg:text-base">Tasks</th>
                                                    <th className="text-left p-2 lg:p-4 font-medium text-gray-400 text-sm lg:text-base">Deadline</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {airdrops.map((airdrop, index) => (
                                                    <tr key={index} className="table-row cursor-pointer">
                                                        <td className="p-2 lg:p-4 font-medium text-gray-200 text-sm lg:text-base">{airdrop.name}</td>
                                                        <td className="p-2 lg:p-4">
                                                            <span className={`px-2 lg:px-3 py-1 lg:py-1.5 text-xs font-medium rounded-lg ${getStatusClass(airdrop.status)}`}>
                                                                {airdrop.status}
                                                            </span>
                                                        </td>
                                                        <td className="p-2 lg:p-4 text-gray-300 text-sm lg:text-base">{airdrop.tasks}</td>
                                                        <td className="p-2 lg:p-4 text-gray-300 text-sm lg:text-base">{airdrop.deadline}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                    
                    {/* News Section */}
                    <div>
                        <AirdropNews />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;