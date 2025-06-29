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
    <div className="bg-black min-h-screen overflow-x-hidden">
      <Sidebar />
      <main className="ml-64 text-slate-300 w-[calc(100vw-16rem)] overflow-hidden">
        <div className="relative p-4 sm:p-6 lg:p-8 max-w-full ml-10 mr-10">
          {/* Background Effects */}
          <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(99,102,241,0.2)_0%,rgba(168,85,247,0.1)_50%,rgba(10,10,10,0)_70%)] -z-10 filter blur-[80px]"></div>
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(99,102,241,0.2)_0%,rgba(168,85,247,0.1)_50%,rgba(10,10,10,0)_70%)] -z-10 filter blur-[80px]"></div>

          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-bold text-slate-50 truncate">Today's Tasks</h1>
              <p className="text-slate-400">Complete your daily airdrop activities</p>
            </div>
            <div className="flex items-center space-x-4 flex-shrink-0">
              <button className="cta-button text-sm bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-500 whitespace-nowrap">
                Add New Task
              </button>
            </div>
          </header>

          {/* Progress Overview */}
          <Card className="mb-8">
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-100 mb-2">Overall Progress</h2>
                  <p className="text-slate-400">You've completed {completedCount} out of {totalCount} tasks</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-indigo-400">{Math.round(completionPercentage)}%</p>
                    <p className="text-sm text-slate-400">Complete</p>
                  </div>
                  <div className="w-24 h-24">
                    <svg className="transform -rotate-90 w-24 h-24">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-slate-800"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - completionPercentage / 100)}`}
                        className="text-indigo-500 transition-all duration-300"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Filters */}
          <Card className="mb-8">
            <div className="p-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Status Filter</label>
                  <div className="flex space-x-2">
                    {[
                      { key: 'all', label: 'All Tasks' },
                      { key: 'pending', label: 'Pending' },
                      { key: 'completed', label: 'Completed' }
                    ].map(({ key, label }) => (
                      <button
                        key={key}
                        onClick={() => setFilter(key as any)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                          filter === key
                            ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-500/50'
                            : 'bg-slate-800/60 text-slate-400 border border-slate-700 hover:bg-slate-700/60'
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
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-100 mb-4">Daily Tasks ({dailyTasks.length})</h2>
              <div className="space-y-4">
                {dailyTasks.map(task => (
                  <Card key={task.id} className={`transition-all ${task.completed ? 'opacity-60' : 'hover:border-indigo-500/50'}`}>
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="h-5 w-5 rounded bg-slate-700 border-slate-600 text-indigo-500 focus:ring-indigo-600 cursor-pointer"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                              {task.title}
                            </h3>
                            <span className="text-sm text-slate-400 bg-slate-800/60 px-2 py-1 rounded">
                              {task.project}
                            </span>
                          </div>
                          <p className={`text-sm ${task.completed ? 'text-slate-500' : 'text-slate-300'}`}>
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
              <h2 className="text-xl font-bold text-slate-100 mb-4">Other Tasks ({otherTasks.length})</h2>
              <div className="space-y-4">
                {otherTasks.map(task => (
                  <Card key={task.id} className={`transition-all ${task.completed ? 'opacity-60' : 'hover:border-indigo-500/50'}`}>
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="h-5 w-5 rounded bg-slate-700 border-slate-600 text-indigo-500 focus:ring-indigo-600 cursor-pointer"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                              {task.title}
                            </h3>
                            <span className="text-sm text-slate-400 bg-slate-800/60 px-2 py-1 rounded">
                              {task.project}
                            </span>
                          </div>
                          <p className={`text-sm ${task.completed ? 'text-slate-500' : 'text-slate-300'}`}>
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
              <div className="text-slate-400">
                <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-slate-300 mb-2">No tasks found</h3>
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