import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import Card from '@/components/Dashboard/Card';
import { taskService } from '../services/taskService';

interface Task {
  _id: string;
  title: string;
  description?: string;
  project: string;
  completed: boolean;
  isDaily: boolean;
  priority: 'Low' | 'Medium' | 'High';
  category: string;
  estimatedTime?: number;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  createdAt: string;
  completedAt?: string;
  airdrop?: {
    _id: string;
    name: string;
    logoUrl?: string;
  };
}

interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  completionPercentage: number;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<TaskStats>({
    total: 0,
    completed: 0,
    pending: 0,
    completionPercentage: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [filter]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const options: any = {};
      if (filter === 'pending') options.completed = false;
      if (filter === 'completed') options.completed = true;
      
      const response = await taskService.getTasks(options);
      setTasks(response.tasks || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await taskService.getTaskStats();
      setStats({
        total: response.total || 0,
        completed: response.completed || 0,
        pending: response.pending || 0,
        completionPercentage: response.completionPercentage || 0
      });
    } catch (err) {
      console.error('Error fetching task stats:', err);
    }
  };

  const toggleTask = async (taskId: string) => {
    try {
      await taskService.toggleTask(taskId);
      // Update local state
      setTasks(prev => prev.map(task => 
        task._id === taskId ? { ...task, completed: !task.completed } : task
      ));
      // Refresh stats
      fetchStats();
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filter === 'all' || 
                       (filter === 'pending' && !task.completed) || 
                       (filter === 'completed' && task.completed);
    return statusMatch;
  });

  const todayTasks = filteredTasks.filter(task => {
    const today = new Date().toDateString();
    const taskDate = new Date(task.createdAt).toDateString();
    return taskDate === today || task.isDaily;
  });
  
  const dailyTasks = todayTasks.filter(task => task.isDaily);
  const otherTasks = todayTasks.filter(task => !task.isDaily);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-gray-950 min-h-screen">
      <Sidebar />
      <main className="lg:ml-64 text-gray-200">
        <div className="relative p-4 lg:p-8 max-w-6xl mx-auto">
          {/* Background Effects */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(124,58,237,0.04)_0%,rgba(168,85,247,0.02)_50%,transparent_70%)] -z-10 filter blur-[100px]"></div>

          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 lg:mb-12 gap-6 pt-16 lg:pt-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold text-gray-100 mb-2">Today's Tasks</h1>
              <p className="text-gray-400">Complete your daily airdrop activities</p>
            </div>
            <button className="btn-primary text-sm lg:text-base">
              Add New Task
            </button>
          </header>

          {/* Loading State */}
          {loading && (
            <div className="space-y-6">
              <Card className="mb-6 lg:mb-8">
                <div className="p-4 lg:p-6 animate-pulse">
                  <div className="h-6 bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
              </Card>
              {[...Array(3)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <div className="p-4 lg:p-6">
                    <div className="flex items-start space-x-4">
                      <div className="h-4 w-4 bg-gray-700 rounded"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-700 rounded mb-2"></div>
                        <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <Card className="text-center py-12">
              <div className="text-red-400">
                <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-red-300 mb-2">Error Loading Tasks</h3>
                <p className="mb-4">{error}</p>
                <button 
                  onClick={fetchTasks}
                  className="btn-primary"
                >
                  Try Again
                </button>
              </div>
            </Card>
          )}

          {/* Main Content - Only show when not loading and no error */}
          {!loading && !error && (
            <>
              {/* Progress Overview */}
              <Card className="mb-6 lg:mb-8">
                <div className="p-4 lg:p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                      <h2 className="text-lg lg:text-xl font-semibold text-gray-100 mb-2">Overall Progress</h2>
                      <p className="text-gray-400">You've completed {stats.completed} out of {stats.total} tasks</p>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-2xl lg:text-3xl font-semibold text-violet-400">{Math.round(stats.completionPercentage)}%</p>
                        <p className="text-sm text-gray-400">Complete</p>
                      </div>
                      <div className="w-16 h-16 lg:w-20 lg:h-20">
                        <svg className="transform -rotate-90 w-16 h-16 lg:w-20 lg:h-20">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="transparent"
                            className="text-gray-800"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="transparent"
                            strokeDasharray={`${2 * Math.PI * 28}`}
                            strokeDashoffset={`${2 * Math.PI * 28 * (1 - stats.completionPercentage / 100)}`}
                            className="text-violet-500 transition-all duration-500"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

          {/* Filters */}
          <Card className="mb-6 lg:mb-8">
            <div className="p-4 lg:p-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-3">Status Filter</label>
                  <div className="flex space-x-2">
                    {[
                      { key: 'all', label: 'All Tasks' },
                      { key: 'pending', label: 'Pending' },
                      { key: 'completed', label: 'Completed' }
                    ].map(({ key, label }) => (
                      <button
                        key={key}
                        onClick={() => setFilter(key as any)}
                        className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          filter === key
                            ? 'tag-active'
                            : 'tag hover:bg-gray-700/50'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Daily Tasks */}
          {dailyTasks.length > 0 && (
            <div className="mb-6 lg:mb-8">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-100 mb-4 lg:mb-6">Daily Tasks ({dailyTasks.length})</h2>
              <div className="space-y-4">
                {dailyTasks.map(task => (
                  <Card key={task._id} className={`transition-all ${task.completed ? 'opacity-60' : 'hover:border-violet-600/30'}`}>
                    <div className="p-4 lg:p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task._id)}
                            className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-violet-500 focus:ring-violet-600 cursor-pointer"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                            <h3 className={`text-base lg:text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}>
                              {task.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="tag text-xs lg:text-sm">
                                {task.project}
                              </span>
                              {task.priority && (
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  task.priority === 'High' ? 'bg-red-600/20 text-red-400' :
                                  task.priority === 'Medium' ? 'bg-yellow-600/20 text-yellow-400' :
                                  'bg-green-600/20 text-green-400'
                                }`}>
                                  {task.priority}
                                </span>
                              )}
                            </div>
                          </div>
                          <p className={`text-sm ${task.completed ? 'text-gray-500' : 'text-gray-300'}`}>
                            {task.description || 'No description provided'}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                            <span>Category: {task.category}</span>
                            {task.estimatedTime && <span>~{task.estimatedTime}min</span>}
                            {task.difficulty && <span>Difficulty: {task.difficulty}</span>}
                            <span>{formatDate(task.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Other Tasks */}
          {otherTasks.length > 0 && (
            <div>
              <h2 className="text-lg lg:text-xl font-semibold text-gray-100 mb-4 lg:mb-6">Other Tasks ({otherTasks.length})</h2>
              <div className="space-y-4">
                {otherTasks.map(task => (
                  <Card key={task._id} className={`transition-all ${task.completed ? 'opacity-60' : 'hover:border-violet-600/30'}`}>
                    <div className="p-4 lg:p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task._id)}
                            className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-violet-500 focus:ring-violet-600 cursor-pointer"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                            <h3 className={`text-base lg:text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}>
                              {task.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="tag text-xs lg:text-sm">
                                {task.project}
                              </span>
                              {task.priority && (
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  task.priority === 'High' ? 'bg-red-600/20 text-red-400' :
                                  task.priority === 'Medium' ? 'bg-yellow-600/20 text-yellow-400' :
                                  'bg-green-600/20 text-green-400'
                                }`}>
                                  {task.priority}
                                </span>
                              )}
                            </div>
                          </div>
                          <p className={`text-sm ${task.completed ? 'text-gray-500' : 'text-gray-300'}`}>
                            {task.description || 'No description provided'}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                            <span>Category: {task.category}</span>
                            {task.estimatedTime && <span>~{task.estimatedTime}min</span>}
                            {task.difficulty && <span>Difficulty: {task.difficulty}</span>}
                            <span>{formatDate(task.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

              {/* Empty State */}
              {filteredTasks.length === 0 && (
                <Card className="text-center py-12">
                  <div className="text-gray-400">
                    <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-300 mb-2">No tasks found</h3>
                    <p>Try adjusting your filter criteria or add some new tasks</p>
                  </div>
                </Card>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Tasks;