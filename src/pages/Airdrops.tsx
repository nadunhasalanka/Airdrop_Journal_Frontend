import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import Card from '@/components/Dashboard/Card';

interface Airdrop {
  id: string;
  name: string;
  description: string;
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
}

const Airdrops = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const airdrops: Airdrop[] = [
    {
      id: '1',
      name: 'ZkSync Era',
      description: 'Layer 2 scaling solution for Ethereum with zero-knowledge proofs. Complete transactions and interact with dApps.',
      tags: ['Layer 2', 'Ethereum', 'ZK-Proofs', 'DeFi'],
      status: 'Farming',
      tasksCompleted: 8,
      totalTasks: 15,
      deadline: 'TBA',
      estimatedValue: '$500-2000',
      network: 'Ethereum',
      category: 'Infrastructure',
      priority: 'High',
      lastUpdated: '2 hours ago'
    },
    {
      id: '2',
      name: 'LayerZero',
      description: 'Omnichain interoperability protocol enabling cross-chain applications. Bridge assets and use cross-chain dApps.',
      tags: ['Interoperability', 'Cross-chain', 'Bridge', 'Omnichain'],
      status: 'Farming',
      tasksCompleted: 23,
      totalTasks: 30,
      deadline: 'Q2 2024',
      estimatedValue: '$1000-5000',
      network: 'Multi-chain',
      category: 'Infrastructure',
      priority: 'High',
      lastUpdated: '1 day ago'
    },
    {
      id: '3',
      name: 'Starknet',
      description: 'Ethereum Layer 2 using STARK technology. Deploy contracts and interact with the ecosystem.',
      tags: ['Layer 2', 'STARK', 'Ethereum', 'Smart Contracts'],
      status: 'Claimable',
      tasksCompleted: 12,
      totalTasks: 12,
      deadline: '14 days',
      estimatedValue: '$200-800',
      network: 'Ethereum',
      category: 'Infrastructure',
      priority: 'Medium',
      lastUpdated: '3 hours ago'
    },
    {
      id: '4',
      name: 'Wormhole',
      description: 'Cross-chain bridge connecting multiple blockchains. Already distributed tokens to early users.',
      tags: ['Bridge', 'Cross-chain', 'Multi-chain', 'Completed'],
      status: 'Completed',
      tasksCompleted: 8,
      totalTasks: 8,
      deadline: 'Completed',
      estimatedValue: '$1200',
      network: 'Multi-chain',
      category: 'Infrastructure',
      priority: 'Low',
      lastUpdated: '1 week ago'
    },
    {
      id: '5',
      name: 'Scroll',
      description: 'zkEVM Layer 2 solution for Ethereum. Participate in testnet and mainnet activities.',
      tags: ['zkEVM', 'Layer 2', 'Ethereum', 'Testnet'],
      status: 'Farming',
      tasksCompleted: 5,
      totalTasks: 20,
      deadline: 'TBA',
      estimatedValue: '$300-1500',
      network: 'Ethereum',
      category: 'Infrastructure',
      priority: 'Medium',
      lastUpdated: '5 hours ago'
    },
    {
      id: '6',
      name: 'Blast',
      description: 'Ethereum Layer 2 with native yield for ETH and stablecoins. Interact with yield-generating dApps.',
      tags: ['Layer 2', 'Yield', 'ETH', 'Stablecoins'],
      status: 'Farming',
      tasksCompleted: 12,
      totalTasks: 18,
      deadline: 'TBA',
      estimatedValue: '$400-1200',
      network: 'Ethereum',
      category: 'DeFi',
      priority: 'High',
      lastUpdated: '1 hour ago'
    },
    {
      id: '7',
      name: 'Linea',
      description: 'ConsenSys zkEVM Layer 2 network. Complete quests and interact with ecosystem dApps.',
      tags: ['zkEVM', 'ConsenSys', 'Layer 2', 'Quests'],
      status: 'Upcoming',
      tasksCompleted: 0,
      totalTasks: 10,
      deadline: 'Q3 2024',
      estimatedValue: '$200-600',
      network: 'Ethereum',
      category: 'Infrastructure',
      priority: 'Medium',
      lastUpdated: '2 days ago'
    },
    {
      id: '8',
      name: 'Arbitrum Orbit',
      description: 'Build and deploy custom chains using Arbitrum technology. Participate in governance and ecosystem.',
      tags: ['Arbitrum', 'Custom Chains', 'Governance', 'Ecosystem'],
      status: 'Farming',
      tasksCompleted: 3,
      totalTasks: 12,
      deadline: 'TBA',
      estimatedValue: '$100-500',
      network: 'Arbitrum',
      category: 'Infrastructure',
      priority: 'Low',
      lastUpdated: '6 hours ago'
    }
  ];

  // Get all unique tags
  const allTags = Array.from(new Set(airdrops.flatMap(airdrop => airdrop.tags)));

  // Filter airdrops based on selected filters
  const filteredAirdrops = airdrops.filter(airdrop => {
    const matchesSearch = airdrop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         airdrop.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || airdrop.status === statusFilter;
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => airdrop.tags.includes(tag));
    
    return matchesSearch && matchesStatus && matchesTags;
  });

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

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
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
              <h1 className="text-3xl font-bold text-slate-50 truncate">All Airdrops</h1>
              <p className="text-slate-400">Manage and track all your airdrop opportunities</p>
            </div>
            <div className="flex items-center space-x-4 flex-shrink-0">
              <button className="cta-button text-sm bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-500 whitespace-nowrap">
                Add New Airdrop
              </button>
            </div>
          </header>

          {/* Filters Section */}
          <Card className="mb-8">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Search */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Search Airdrops</label>
                  <input
                    type="text"
                    placeholder="Search by name or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Status Filter */}
                <div className="lg:w-48">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="All">All Status</option>
                    <option value="Farming">Farming</option>
                    <option value="Claimable">Claimable</option>
                    <option value="Completed">Completed</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>
              </div>

              {/* Tags Filter */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-300 mb-3">Filter by Tags</label>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                        selectedTags.includes(tag)
                          ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-500/50'
                          : 'bg-slate-800/60 text-slate-400 border border-slate-700 hover:bg-slate-700/60'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                {selectedTags.length > 0 && (
                  <button
                    onClick={() => setSelectedTags([])}
                    className="mt-2 text-sm text-indigo-400 hover:text-indigo-300"
                  >
                    Clear all tags
                  </button>
                )}
              </div>
            </div>
          </Card>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-slate-400">
              Showing {filteredAirdrops.length} of {airdrops.length} airdrops
            </p>
          </div>

          {/* Airdrops Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAirdrops.map(airdrop => (
              <Card key={airdrop.id} className="hover:border-indigo-500/50 transition-colors cursor-pointer">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-100 mb-1">{airdrop.name}</h3>
                      <p className="text-sm text-slate-400">{airdrop.network} • {airdrop.category}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(airdrop.status)}`}>
                        {airdrop.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityClass(airdrop.priority)}`}>
                        {airdrop.priority}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-sm mb-4 line-clamp-3">{airdrop.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {airdrop.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-slate-800/60 text-slate-400 text-xs rounded-md">
                        {tag}
                      </span>
                    ))}
                    {airdrop.tags.length > 3 && (
                      <span className="px-2 py-1 bg-slate-800/60 text-slate-400 text-xs rounded-md">
                        +{airdrop.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-slate-300">{airdrop.tasksCompleted}/{airdrop.totalTasks}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div 
                        className="bg-indigo-500 h-2 rounded-full transition-all"
                        style={{ width: `${(airdrop.tasksCompleted / airdrop.totalTasks) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Footer Info */}
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <p className="text-slate-400">Est. Value</p>
                      <p className="text-slate-200 font-semibold">{airdrop.estimatedValue}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400">Deadline</p>
                      <p className="text-slate-200 font-semibold">{airdrop.deadline}</p>
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <p className="text-xs text-slate-500">Updated {airdrop.lastUpdated}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredAirdrops.length === 0 && (
            <Card className="text-center py-12">
              <div className="text-slate-400">
                <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-slate-300 mb-2">No airdrops found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Airdrops;