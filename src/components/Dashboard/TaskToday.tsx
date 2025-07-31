import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import { taskService } from "../../services/taskService";

interface Task {
    _id: string;
    title: string;
    description?: string;
    project: string;
    completed: boolean;
    isDaily: boolean;
    airdrop?: {
        _id: string;
        name: string;
        logoUrl?: string;
    };
}

const TasksToday = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTodaysTasks();
    }, []);

    const fetchTodaysTasks = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await taskService.getTodaysTasks();
            setTasks(response.tasks || []);
        } catch (err) {
            console.error('Error fetching today\'s tasks:', err);
            setError('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleTask = async (taskId: string) => {
        try {
            await taskService.toggleTask(taskId);
            // Update local state
            setTasks(prev => prev.map(task => 
                task._id === taskId ? { ...task, completed: !task.completed } : task
            ));
        } catch (err) {
            console.error('Error toggling task:', err);
            // You could add a toast notification here
        }
    };

    if (loading) {
        return (
            <Card>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-100">Today's Tasks</h2>
                        <Link to="/tasks" className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors">
                            View All
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="flex items-center p-3 bg-gray-800/30 rounded-lg animate-pulse">
                                <div className="h-4 w-4 bg-gray-700 rounded"></div>
                                <div className="ml-3 flex-1">
                                    <div className="h-4 bg-gray-700 rounded mb-2"></div>
                                    <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-100">Today's Tasks</h2>
                        <Link to="/tasks" className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors">
                            View All
                        </Link>
                    </div>
                    <div className="text-center py-8">
                        <p className="text-red-400 mb-4">{error}</p>
                        <button 
                            onClick={fetchTodaysTasks}
                            className="btn-primary text-sm"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Card>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-100">Today's Tasks</h2>
                    <Link to="/tasks" className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors">
                        View All
                    </Link>
                </div>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                    {tasks.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="text-gray-400">
                                <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <h3 className="text-lg font-medium text-gray-300 mb-2">No tasks for today</h3>
                                <p className="text-sm">Add some airdrops to get started with daily tasks!</p>
                            </div>
                        </div>
                    ) : (
                        tasks.slice(0, 6).map((task) => (
                            <div key={task._id} className="flex items-center p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors">
                                <input 
                                    type="checkbox" 
                                    checked={task.completed}
                                    onChange={() => handleToggleTask(task._id)}
                                    className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-violet-500 focus:ring-violet-600 cursor-pointer"
                                />
                                <div className="ml-3 flex-1">
                                    <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                                        {task.title}
                                    </p>
                                    <p className="text-xs text-gray-400">{task.project}</p>
                                </div>
                                {task.isDaily && (
                                    <span className="text-xs bg-violet-600/20 text-violet-400 px-2 py-1 rounded-full mr-2">
                                        Daily
                                    </span>
                                )}
                                <Link to="/tasks" className="text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors">
                                    Go →
                                </Link>
                            </div>
                        ))
                    )}
                </div>
                {tasks.length > 6 && (
                    <div className="mt-4 text-center">
                        <Link to="/tasks" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                            View {tasks.length - 6} more tasks
                        </Link>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default TasksToday;