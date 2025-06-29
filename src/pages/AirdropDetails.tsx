import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '@/components/Sidebar/Sidebar';
import Card from '@/components/Dashboard/Card';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  estimatedTime: string;
  reward: string;
  category: string;
}

interface AirdropDetails {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  tags: string[];
  status: 'Farming' | 'Claimable' | 'Completed' | 'Upcoming';
  tasksCompleted: number;
  totalTasks: number;
  deadline: string;
  estimatedValue: string;
  network: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  lastUpdated: string;
  ecosystem: string;
  type: string;
  officialLink: string;
  referralLink?: string;
  logoUrl: string;
  bannerUrl: string;
  socialLinks: {
    twitter?: string;
    discord?: string;
    telegram?: string;
    website?: string;
  };
  requirements: string[];
  tasks: Task[];
  notes: string;
  totalInvested: string;
  potentialROI: string;
}

const AirdropDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [copiedLink, setCopiedLink] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  // Mock data - in real app, this would come from API/database
  const airdropDetails: AirdropDetails = {
    id: id || '1',
    name: 'ZkSync Era',
    description: 'Layer 2 scaling solution for Ethereum with zero-knowledge proofs.',
    longDescription: 'ZkSync Era is a Layer 2 scaling solution that uses zero-knowledge rollups to scale Ethereum. It offers fast, secure, and low-cost transactions while maintaining full compatibility with Ethereum. The platform supports smart contracts and provides a seamless experience for both developers and users. ZkSync Era has been one of the most anticipated airdrops in the crypto space, with significant potential rewards for early adopters and active users.',
    tags: ['Layer 2', 'Ethereum', 'ZK-Proofs', 'DeFi', 'Bridge'],
    status: 'Farming',
    tasksCompleted: 8,
    totalTasks: 15,
    deadline: 'TBA',
    estimatedValue: '$500-2000',
    network: 'Ethereum',
    category: 'Infrastructure',
    priority: 'High',
    lastUpdated: '2 hours ago',
    ecosystem: 'Ethereum',
    type: 'Mainnet',
    officialLink: 'https://zksync.io',
    referralLink: 'https://zksync.io?ref=airdropjournal',
    logoUrl: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop',
    bannerUrl: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
    socialLinks: {
      twitter: 'https://twitter.com/zksync',
      discord: 'https://discord.gg/zksync',
      telegram: 'https://t.me/zksync',
      website: 'https://zksync.io'
    },
    requirements: [
      'Have at least 0.1 ETH for gas fees',
      'Complete at least 10 transactions on ZkSync Era',
      'Bridge assets from Ethereum mainnet',
      'Interact with at least 3 different dApps',
      'Hold funds for at least 30 days',
      'Use different transaction types (transfers, swaps, etc.)'
    ],
    tasks: [
      {
        id: '1',
        title: 'Bridge ETH to ZkSync Era',
        description: 'Transfer ETH from Ethereum mainnet to ZkSync Era using the official bridge',
        completed: true,
        priority: 'High',
        estimatedTime: '10 min',
        reward: '10-50 points',
        category: 'Bridge'
      },
      {
        id: '2',
        title: 'Swap tokens on SyncSwap',
        description: 'Perform a token swap on SyncSwap DEX to show DeFi activity',
        completed: true,
        priority: 'High',
        estimatedTime: '5 min',
        reward: '15-40 points',
        category: 'DeFi'
      },
      {
        id: '3',
        title: 'Provide liquidity on Mute.io',
        description: 'Add liquidity to a pool on Mute.io to earn fees and show LP activity',
        completed: false,
        priority: 'Medium',
        estimatedTime: '15 min',
        reward: '20-60 points',
        category: 'DeFi'
      },
      {
        id: '4',
        title: 'Mint NFT on Mintsquare',
        description: 'Mint an NFT on the Mintsquare marketplace',
        completed: false,
        priority: 'Low',
        estimatedTime: '10 min',
        reward: '10-30 points',
        category: 'NFT'
      },
      {
        id: '5',
        title: 'Use Orbiter Finance',
        description: 'Bridge assets using Orbiter Finance cross-chain bridge',
        completed: true,
        priority: 'Medium',
        estimatedTime: '10 min',
        reward: '15-45 points',
        category: 'Bridge'
      }
    ],
    notes: 'Focus on maintaining consistent activity over time. ZkSync values long-term users over one-time interactions. Consider using multiple wallets for different strategies.',
    totalInvested: '$250',
    potentialROI: '400-800%'
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLink(type);
      setTimeout(() => setCopiedLink(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Farming': return 'bg-blue-500/20 text-blue-300';
      case 'Claimable': return 'bg-green-500/20 text-green-300 animate-pulse';
      case 'Completed': return 'bg-slate-600/20 text-slate-400';
      case 'Upcoming': return 'bg-yellow-500/20 text-yellow-300';
      default: return 'bg-slate-700/20 text-slate-300';
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500/20 text-red-300';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'Low': return 'bg-green-500/20 text-green-300';
      default: return 'bg-slate-700/20 text-slate-300';
    }
  };

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
              <Link to="/airdrops" className="text-indigo-400 hover:text-indigo-300 text-sm mb-2 inline-block">
                ← Back to All Airdrops
              </Link>
              <h1 className="text-3xl font-bold text-slate-50 truncate">{airdropDetails.name}</h1>
              <p className="text-slate-400">{airdropDetails.ecosystem} • {airdropDetails.category}</p>
            </div>
            <div className="flex items-center space-x-4 flex-shrink-0">
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusClass(airdropDetails.status)}`}>
                {airdropDetails.status}
              </span>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getPriorityClass(airdropDetails.priority)}`}>
                {airdropDetails.priority} Priority
              </span>
            </div>
          </header>

          {/* Banner and Overview */}
          <Card className="mb-8">
            <div className="relative">
              <img 
                src={airdropDetails.bannerUrl} 
                alt={`${airdropDetails.name} banner`}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="absolute top-4 left-4">
                <img 
                  src={airdropDetails.logoUrl} 
                  alt={`${airdropDetails.name} logo`}
                  className="w-16 h-16 rounded-xl border-4 border-slate-900 bg-slate-900"
                />
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-slate-400 text-sm">Estimated Value</p>
                  <p className="text-2xl font-bold text-green-400">{airdropDetails.estimatedValue}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Progress</p>
                  <p className="text-2xl font-bold text-indigo-400">{airdropDetails.tasksCompleted}/{airdropDetails.totalTasks}</p>
                  <div className="w-full bg-slate-800 rounded-full h-2 mt-2">
                    <div 
                      className="bg-indigo-500 h-2 rounded-full transition-all"
                      style={{ width: `${(airdropDetails.tasksCompleted / airdropDetails.totalTasks) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Deadline</p>
                  <p className="text-2xl font-bold text-slate-200">{airdropDetails.deadline}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-100 mb-2">Description</h3>
                <p className="text-slate-300 leading-relaxed">{airdropDetails.longDescription}</p>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-100 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {airdropDetails.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-800/60 text-slate-300 text-sm rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <a 
                    href={airdropDetails.officialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-center py-3 px-4 rounded-lg font-medium transition block"
                  >
                    Visit Official Site
                  </a>
                  <button
                    onClick={() => copyToClipboard(airdropDetails.officialLink, 'official')}
                    className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 py-2 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2"
                  >
                    {copiedLink === 'official' ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied Official Link!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy Official Link
                      </>
                    )}
                  </button>
                </div>
                
                {airdropDetails.referralLink && (
                  <div className="space-y-2">
                    <a 
                      href={airdropDetails.referralLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-600 hover:bg-green-500 text-white text-center py-3 px-4 rounded-lg font-medium transition block"
                    >
                      Use Referral Link
                    </a>
                    <button
                      onClick={() => copyToClipboard(airdropDetails.referralLink!, 'referral')}
                      className="w-full bg-green-800/60 hover:bg-green-700/60 text-green-300 py-2 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2"
                    >
                      {copiedLink === 'referral' ? (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied Referral Link!
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy Referral Link
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tasks Section */}
            <div className="lg:col-span-2">
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-slate-100 mb-4">Tasks & Activities</h2>
                  <div className="space-y-4">
                    {airdropDetails.tasks.map(task => (
                      <div key={task.id} className="flex items-start space-x-4 p-4 bg-slate-800/50 rounded-lg">
                        <div className="flex-shrink-0 mt-1">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="h-5 w-5 rounded bg-slate-700 border-slate-600 text-indigo-500 focus:ring-indigo-600 cursor-pointer"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className={`font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                              {task.title}
                            </h3>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityClass(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>
                          <p className={`text-sm mb-2 ${task.completed ? 'text-slate-500' : 'text-slate-300'}`}>
                            {task.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-slate-400">
                            <span>⏱️ {task.estimatedTime}</span>
                            <span>🎁 {task.reward}</span>
                            <span>📂 {task.category}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Requirements */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-100 mb-4">Requirements</h3>
                  <ul className="space-y-2">
                    {airdropDetails.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-indigo-400 mt-1">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              {/* Social Links */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-100 mb-4">Social Links</h3>
                  <div className="space-y-2">
                    {Object.entries(airdropDetails.socialLinks).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50 transition text-slate-300 hover:text-indigo-400"
                      >
                        <span className="capitalize">{platform}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Investment Tracking */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-100 mb-4">Investment Tracking</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-slate-400 text-sm">Total Invested</p>
                      <p className="text-lg font-semibold text-red-400">{airdropDetails.totalInvested}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Potential ROI</p>
                      <p className="text-lg font-semibold text-green-400">{airdropDetails.potentialROI}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Notes */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-100 mb-4">Notes</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{airdropDetails.notes}</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AirdropDetails;