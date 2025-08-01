import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '@/components/Sidebar/Sidebar';
import Card from '@/components/Dashboard/Card';
import AirdropNews from '@/components/Dashboard/AirdropNews';
import TasksToday from '@/components/Dashboard/TaskToday';
import airdropService from '@/services/airdropService';
import { taskService } from '@/services/taskService';

interface DashboardStats {
    totalAirdrops: number;
    farmingAirdrops: number;
    completedAirdrops: number;
    claimableAirdrops: number;
    totalTasks: number;
    completedTasks: number;
}

interface Airdrop {
    _id: string;
    name: string;
    status: string;
    deadline: string;
    type: string;
    ecosystem: string;
    isDailyTask: boolean;
}

const Dashboard = () => {
    const [airdrops, setAirdrops] = useState<Airdrop[]>([]);
    const [stats, setStats] = useState<DashboardStats>({
        totalAirdrops: 0,
        farmingAirdrops: 0,
        completedAirdrops: 0,
        claimableAirdrops: 0,
        totalTasks: 0,
        completedTasks: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch airdrops and task stats in parallel
            const [airdropResponse, taskStatsResponse] = await Promise.all([
                airdropService.getAirdrops({ limit: 10, sortBy: 'updatedAt', sortOrder: 'desc' }),
                taskService.getTaskStats()
            ]);

            if (airdropResponse.success) {
                const airdropData = airdropResponse.data || [];
                setAirdrops(airdropData);

                // Calculate airdrop stats
                const totalAirdrops = airdropData.length;
                const farmingAirdrops = airdropData.filter((a: Airdrop) => a.status === 'Farming').length;
                const completedAirdrops = airdropData.filter((a: Airdrop) => a.status === 'Completed').length;
                const claimableAirdrops = airdropData.filter((a: Airdrop) => a.status === 'Claimable').length;

                setStats(prev => ({
                    ...prev,
                    totalAirdrops,
                    farmingAirdrops,
                    completedAirdrops,
                    claimableAirdrops,
                    totalTasks: taskStatsResponse.total || 0,
                    completedTasks: taskStatsResponse.completed || 0
                }));
            }
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Farming': 
                return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
            case 'Claimable': 
                return 'bg-amber-500/20 text-amber-300 border-amber-500/30 animate-pulse';
            case 'Completed': 
                return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
            default: 
                return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
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
                        {/* Stats Overview */}
                        <div className="xl:col-span-3 mb-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                <Card>
                                    <div className="p-4 text-center">
                                        <div className="text-2xl font-bold text-blue-400">{stats.totalAirdrops}</div>
                                        <div className="text-sm text-gray-400">Total Airdrops</div>
                                    </div>
                                </Card>
                                <Card>
                                    <div className="p-4 text-center">
                                        <div className="text-2xl font-bold text-green-400">{stats.farmingAirdrops}</div>
                                        <div className="text-sm text-gray-400">Farming</div>
                                    </div>
                                </Card>
                                <Card>
                                    <div className="p-4 text-center">
                                        <div className="text-2xl font-bold text-yellow-400">{stats.claimableAirdrops}</div>
                                        <div className="text-sm text-gray-400">Claimable</div>
                                    </div>
                                </Card>
                                <Card>
                                    <div className="p-4 text-center">
                                        <div className="text-2xl font-bold text-purple-400">{stats.completedAirdrops}</div>
                                        <div className="text-sm text-gray-400">Completed</div>
                                    </div>
                                </Card>
                                <Card>
                                    <div className="p-4 text-center">
                                        <div className="text-2xl font-bold text-orange-400">{stats.totalTasks}</div>
                                        <div className="text-sm text-gray-400">Total Tasks</div>
                                    </div>
                                </Card>
                                <Card>
                                    <div className="p-4 text-center">
                                        <div className="text-2xl font-bold text-emerald-400">{stats.completedTasks}</div>
                                        <div className="text-sm text-gray-400">Tasks Done</div>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        {/* Tasks Section */}
                        <div className="xl:col-span-1">
                            <TasksToday />
                        </div>
                        
                        {/* Airdrops Table */}
                        <div className="xl:col-span-2">
                            <Card>
                                <div className="p-4 lg:p-6">
                                    <h2 className="text-lg lg:text-xl font-semibold text-gray-100 mb-4 lg:mb-6">Active Airdrops</h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="border-b border-gray-800/40">
                                                <tr>
                                                    <th className="text-left p-2 lg:p-4 font-medium text-gray-400 text-sm lg:text-base">Project</th>
                                                    <th className="text-left p-2 lg:p-4 font-medium text-gray-400 text-sm lg:text-base">Status</th>
                                                    <th className="text-left p-2 lg:p-4 font-medium text-gray-400 text-sm lg:text-base">Tasks</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loading ? (
                                                    <tr>
                                                        <td colSpan={3} className="p-4 text-center text-gray-400">
                                                            Loading airdrops...
                                                        </td>
                                                    </tr>
                                                ) : airdrops.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={3} className="p-4 text-center text-gray-400">
                                                            No airdrops found. <Link to="/airdrops/add" className="text-purple-400 hover:text-purple-300">Add your first airdrop</Link>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    airdrops.map((airdrop) => (
                                                        <tr key={airdrop._id} className="table-row cursor-pointer">
                                                            <td className="p-2 lg:p-4 font-medium text-gray-200 text-sm lg:text-base">{airdrop.name}</td>
                                                            <td className="p-2 lg:p-4">
                                                                <span className={`status-badge ${getStatusClass(airdrop.status)}`}>
                                                                    {airdrop.status}
                                                                </span>
                                                            </td>
                                                            <td className="p-2 lg:p-4 text-gray-300 text-sm lg:text-base">
                                                                {airdrop.isDailyTask ? 'Daily Task' : airdrop.type || 'One-time'}
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
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