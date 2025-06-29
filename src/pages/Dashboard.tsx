import React from 'react';
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
            <main className="ml-64 text-gray-200">
                <div className="relative p-8 max-w-7xl mx-auto">
                    {/* Subtle background effects */}
                    <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(124,58,237,0.04)_0%,rgba(168,85,247,0.02)_50%,transparent_70%)] -z-10 filter blur-[100px]"></div>

                    {/* Header */}
                    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
                        <div>
                            <h1 className="text-3xl font-semibold text-gray-100 mb-2">Dashboard</h1>
                            <p className="text-gray-400">Welcome back, Airdrop Hunter!</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="btn-primary">
                                Add New Airdrop
                            </button>
                            <button className="btn-ghost p-2.5">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </button>
                        </div>
                    </header>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
                        {/* Tasks Section */}
                        <div className="xl:col-span-1">
                            <TasksToday />
                        </div>
                        
                        {/* Airdrops Table */}
                        <div className="xl:col-span-2">
                            <Card>
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-100 mb-6">Your Tracked Airdrops</h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="border-b border-gray-800/40">
                                                <tr>
                                                    <th className="text-left p-4 font-medium text-gray-400">Project</th>
                                                    <th className="text-left p-4 font-medium text-gray-400">Status</th>
                                                    <th className="text-left p-4 font-medium text-gray-400">Tasks</th>
                                                    <th className="text-left p-4 font-medium text-gray-400">Deadline</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {airdrops.map((airdrop, index) => (
                                                    <tr key={index} className="table-row cursor-pointer">
                                                        <td className="p-4 font-medium text-gray-200">{airdrop.name}</td>
                                                        <td className="p-4">
                                                            <span className={`px-3 py-1.5 text-xs font-medium rounded-lg ${getStatusClass(airdrop.status)}`}>
                                                                {airdrop.status}
                                                            </span>
                                                        </td>
                                                        <td className="p-4 text-gray-300">{airdrop.tasks}</td>
                                                        <td className="p-4 text-gray-300">{airdrop.deadline}</td>
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