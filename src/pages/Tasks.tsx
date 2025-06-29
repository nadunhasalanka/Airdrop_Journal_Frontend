import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import Card from '@/components/Dashboard/Card';

interface Task {
  id: string;
  project: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  estimatedTime: string;
  category: string;
  deadline: string;
  completed: boolean;
  tags: string[];
  reward: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      project: 'ZkSync Era',
      title: 'Bridge ETH to ZkSync Era',
      description: 'Transfer ETH from Ethereum mainnet to ZkSync Era using the official bridge',
      priority: 'High',
      estimatedTime: '10 min',
      category: 'Bridge',
      deadline: 'Today',
      completed: false,
      tags: ['Bridge', 'ETH', 'Layer 2'],
      reward: '10-50 points',
      difficulty: 'Easy'
    },
    {
      id: '2',
      project: 'LayerZero',
      title: 'Swap on Stargate Finance',
      description: 'Perform a cross-chain swap using Stargate Finance protocol',
      priority: 'Medium',
      estimatedTime: '15 min',
      category: 'DeFi',
      deadline: 'Today',
      completed: true,
      tags: ['Swap', 'Cross-chain', 'DeFi'],
      reward: '20-100 points',
      difficulty: 'Medium'
    },
    {
      id: '3',
      project: 'Scroll',
      title: 'Deploy Smart Contract on Testnet',
      description: 'Deploy a simple smart contract on Scroll testnet using Remix or Hardhat',
      priority: 'Medium',
      estimatedTime: '30 min',
      category: 'Development',
      deadline: 'Today',
      completed: false,
      tags: ['Smart Contract', 'Testnet', 'Development'],
      reward: '50-200 points',
      difficulty: 'Hard'
    },
    {
      id: '4',
      project: 'Starknet',
      title: 'Claim STRK Airdrop',
      description: 'Visit the official Starknet website and claim your STRK tokens',
      priority: 'High',
      estimatedTime: '5 min',
      category: 'Claim',
      deadline: '13 days left',
      completed: false,
      tags: ['Claim', 'Airdrop', 'STRK'],
      reward: '$200-800',
      difficulty: 'Easy'
    },
    {
      id: '5',
      project: 'EigenLayer',
      title: 'Restake ETH',
      description: 'Restake your ETH through EigenLayer protocol to earn additional rewards',
      priority: 'Medium',
      estimatedTime: '20 min',
      category: 'Staking',
      deadline: 'Today',
      completed: false,
      tags: ['Restaking', 'ETH', 'Rewards'],
      reward: '30-150 points',
      difficulty: 'Medium'
    },
    {
      id: '6',
      project: 'Blast',
      title: 'Interact with Blast dApp',
      description: 'Use any dApp on Blast mainnet to generate yield and activity',
      priority: 'High',
      estimatedTime: '15 min',
      category: 'DeFi',
      deadline: 'Today',
      completed: true,
      tags: ['dApp', 'Yield', 'Blast'],
      reward: '25-120 points',
      difficulty: 'Easy'
    },
    {
      id: '7',
      project: 'Linea',
      title: 'Complete Linea Quest',
      description: 'Participate in the latest Linea Voyage quest and complete all steps',
      priority: 'Medium',
      estimatedTime: '45 min',
      category: 'Quest',
      deadline: 'Tomorrow',
      completed: false,
      tags: ['Quest', 'Voyage', 'NFT'],
      reward: '40-180 points',
      difficulty: 'Medium'
    },
    {
      id: '8',
      project: 'Arbitrum',
      title: 'Vote on Governance Proposal',
      description: 'Participate in Arbitrum DAO governance by voting on active proposals',
      priority: 'Low',
      estimatedTime: '10 min',
      category: 'Governance',
      deadline: 'This week',
      completed: false,
      tags: ['Governance', 'DAO', 'Voting'],
      reward: '15-60 points',
      difficulty: 'Easy'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filter === 'all' || 
                       (filter === 'pending' && !task.completed) || 
                       (filter === 'completed' && task.completed);
    const priorityMatch = priorityFilter === 'All' || task.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  const todayTasks = filteredTasks.filter(task => task.deadline === 'Today');
  const otherTasks = filteredTasks.filter(task => task.deadline !== 'Today');

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Low': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-slate-700/20 text-slate-300 border-slate-700/30';
    }
  };

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

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
              <div className="flex flex-col sm:flex-row gap-4">
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
                <div className="sm:w-48">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Priority</label>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="All">All Priorities</option>
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          {/* Today's Tasks */}
          {todayTasks.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-100 mb-4">Due Today ({todayTasks.length})</h2>
              <div className="space-y-4">
                {todayTasks.map(task => (
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
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                                  {task.title}
                                </h3>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityClass(task.priority)}`}>
                                  {task.priority}
                                </span>
                              </div>
                              <p className="text-sm text-slate-400 mb-2">{task.project}</p>
                              <p className={`text-sm mb-3 ${task.completed ? 'text-slate-500' : 'text-slate-300'}`}>
                                {task.description}
                              </p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {task.tags.map(tag => (
                                  <span key={tag} className="px-2 py-1 bg-slate-800/60 text-slate-400 text-xs rounded-md">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex-shrink-0 text-right space-y-2">
                              <div>
                                <p className="text-xs text-slate-400">Reward</p>
                                <p className="text-sm font-semibold text-green-400">{task.reward}</p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-400">Time</p>
                                <p className="text-sm text-slate-300">{task.estimatedTime}</p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-400">Difficulty</p>
                                <p className={`text-sm font-medium ${getDifficultyClass(task.difficulty)}`}>
                                  {task.difficulty}
                                </p>
                              </div>
                            </div>
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
              <h2 className="text-xl font-bold text-slate-100 mb-4">Upcoming Tasks ({otherTasks.length})</h2>
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
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                                  {task.title}
                                </h3>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityClass(task.priority)}`}>
                                  {task.priority}
                                </span>
                              </div>
                              <p className="text-sm text-slate-400 mb-2">{task.project} • Due {task.deadline}</p>
                              <p className={`text-sm mb-3 ${task.completed ? 'text-slate-500' : 'text-slate-300'}`}>
                                {task.description}
                              </p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {task.tags.map(tag => (
                                  <span key={tag} className="px-2 py-1 bg-slate-800/60 text-slate-400 text-xs rounded-md">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex-shrink-0 text-right space-y-2">
                              <div>
                                <p className="text-xs text-slate-400">Reward</p>
                                <p className="text-sm font-semibold text-green-400">{task.reward}</p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-400">Time</p>
                                <p className="text-sm text-slate-300">{task.estimatedTime}</p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-400">Difficulty</p>
                                <p className={`text-sm font-medium ${getDifficultyClass(task.difficulty)}`}>
                                  {task.difficulty}
                                </p>
                              </div>
                            </div>
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