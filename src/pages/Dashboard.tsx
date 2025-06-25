import React from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import Card from '@/components/Dashboard/Card';
import AirdropNews from '@/components/Dashboard/AirdropNews';
import TasksToday from '@/components/Dashboard/TaskToday';

// === MAIN DASHBOARD PAGE COMPONENT ===
const Dashboard = () => {
    const airdrops = [
        { name: 'ZkSync', status: 'Farming', tasks: '5/12', deadline: 'TBA' },
        { name: 'LayerZero', status: 'Farming', tasks: '23/30', deadline: 'TBA' },
        { name: 'Starknet', status: 'Claimable', tasks: 'Done', deadline: '14 days' },
        { name: 'Wormhole', status: 'Completed', tasks: 'Done', deadline: '-' },
    ];

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Farming': return 'bg-blue-500/20 text-blue-300';
            case 'Claimable': return 'bg-green-500/20 text-green-300 animate-pulse';
            case 'Completed': return 'bg-slate-600/20 text-slate-400';
            default: return 'bg-slate-700/20 text-slate-300';
        }
    };

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <Sidebar />
      <main className="ml-64 text-slate-300 w-[calc(100vw-16rem)] overflow-hidden">
        <div className="relative p-4 sm:p-6 lg:p-8 max-w-full nadun ml-10 mr-10">
            <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(99,102,241,0.2)_0%,rgba(168,85,247,0.1)_50%,rgba(10,10,10,0)_70%)] -z-10 filter blur-[80px]"></div>
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(99,102,241,0.2)_0%,rgba(168,85,247,0.1)_50%,rgba(10,10,10,0)_70%)] -z-10 filter blur-[80px]"></div>

            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div className="min-w-0 flex-1">
                    <h1 className="text-3xl font-bold text-slate-50 truncate">Dashboard</h1>
                    <p className="text-slate-400">Welcome back, Airdrop Hunter!</p>
                </div>
                <div className="flex items-center space-x-4 flex-shrink-0">
                    <button className="cta-button text-sm bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-500 whitespace-nowrap">
                        Add New Airdrop
                    </button>
                    <button className="p-2 rounded-full bg-slate-800/70 hover:bg-slate-700 transition flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    </button>
                </div>
            </header>

            <div className="flex flex-col space-y-8 max-w-full">
                {/* Top Section */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 w-full">
                    <div className="xl:col-span-1 min-w-0">
                        <TasksToday />
                    </div>
                    <div className="xl:col-span-2 min-w-0">
                        <Card className="overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-lg font-bold text-slate-100">Your Tracked Airdrops</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left min-w-[600px]">
                                    <thead className="border-b border-slate-800">
                                        <tr>
                                            <th className="p-4 font-semibold text-sm text-slate-400">Project</th>
                                            <th className="p-4 font-semibold text-sm text-slate-400">Status</th>
                                            <th className="p-4 font-semibold text-sm text-slate-400">Tasks</th>
                                            <th className="p-4 font-semibold text-sm text-slate-400">Deadline</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {airdrops.map((airdrop, index) => (
                                            <tr key={index} className="border-b border-slate-800 hover:bg-slate-800/40 transition cursor-pointer last:border-b-0">
                                                <td className="p-4 font-bold text-slate-200 whitespace-nowrap">{airdrop.name}</td>
                                                <td className="p-4">
                                                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${getStatusClass(airdrop.status)}`}>
                                                        {airdrop.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-slate-300 whitespace-nowrap">{airdrop.tasks}</td>
                                                <td className="p-4 text-slate-300 whitespace-nowrap">{airdrop.deadline}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                </div>
                
                {/* Bottom Section */}
                <div className="w-full min-w-0">
                    <AirdropNews />
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;