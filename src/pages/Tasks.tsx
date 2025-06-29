import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import Card from '@/components/Dashboard/Card';

interface Task {
  id: string;
  project: string;
  title: string;
  note: string;
  completed: boolean;
  isDaily: boolean;
  createdAt: string;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      project: 'ZkSync Era',
      title: 'Bridge ETH to ZkSync Era',
      note: 'Complete daily bridge transaction of at least 0.01 ETH',
      completed: false,
      isDaily: true,
      createdAt: 'Today'
    },
    {
      id: '2',
      project: 'LayerZero',
      title: 'Cross-chain Swap',
      note: 'Use Stargate Finance for cross-chain swap',
      completed: true,
      isDaily: true,
      createdAt: 'Today'
    },
    {
      id: '3',
      project: 'Starknet',
      title: 'Claim STRK Tokens',
      note: 'Visit official site and claim available tokens',
      completed: false,
      isDaily: false,
      createdAt: 'Today'
    },
    {
      id: '4',
      project: 'Blast',
      title: 'Yield Farming',
      note: 'Interact with yield-generating dApps',
      completed: true,
      isDaily: true,
      createdAt: 'Today'
    },
    {
      id: '5',
      project: 'Scroll',
      title: 'Testnet Activity',
      note: 'Complete transactions on Scroll testnet',
      completed: false,
      isDaily: true,
      createdAt: 'Today'
    },
    {
      id: '6',
      project: 'Telegram Dogs',
      title: 'Daily Check-in',
      note: 'Complete daily tasks and claim rewards',
      completed: false,
      isDaily: true,
      createdAt: 'Today'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filter === 'all' || 
                       (filter === 'pending' && !task.completed) || 
                       (filter === 'completed' && task.completed);
    return statusMatch;
  });

  const todayTasks = filteredTasks.filter(task => task.createdAt === 'Today');
  const dailyTasks = todayTasks.filter(task => task.isDaily);
  const otherTasks = todayTasks.filter(task => !task.isDaily);

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  const completionPercentage = (completedCount / totalCount) * 100;

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

          {/* Progress Overview */}
          <Card className="mb-6 lg:mb-8">
            <div className="p-4 lg:p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-100 mb-2">Overall Progress</h2>
                  <p className="text-gray-400">You've completed {completedCount} out of {totalCount} tasks</p>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-2xl lg:text-3xl font-semibold text-violet-400">{Math.round(completionPercentage)}%</p>
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
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - completionPercentage / 100)}`}
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
                  <Card key={task.id} className={`transition-all ${task.completed ? 'opacity-60' : 'hover:border-violet-600/30'}`}>
                    <div className="p-4 lg:p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-violet-500 focus:ring-violet-600 cursor-pointer"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                            <h3 className={`text-base lg:text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}>
                              {task.title}
                            </h3>
                            <span className="tag text-xs lg:text-sm">
                              {task.project}
                            </span>
                          </div>
                          <p className={`text-sm ${task.completed ? 'text-gray-500' : 'text-gray-300'}`}>
                            {task.note}
                          </p>
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
                  <Card key={task.id} className={`transition-all ${task.completed ? 'opacity-60' : 'hover:border-violet-600/30'}`}>
                    <div className="p-4 lg:p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-violet-500 focus:ring-violet-600 cursor-pointer"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                            <h3 className={`text-base lg:text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}>
                              {task.title}
                            </h3>
                            <span className="tag text-xs lg:text-sm">
                              {task.project}
                            </span>
                          </div>
                          <p className={`text-sm ${task.completed ? 'text-gray-500' : 'text-gray-300'}`}>
                            {task.note}
                          </p>
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
        </div>
      </main>
    </div>
  );
};

export default Tasks;