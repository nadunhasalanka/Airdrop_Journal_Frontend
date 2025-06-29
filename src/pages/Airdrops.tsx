import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  ecosystem: 'Ethereum' | 'Solana' | 'Polygon' | 'Arbitrum' | 'Optimism' | 'BSC' | 'Avalanche' | 'Multi-chain';
  type: 'Testnet' | 'Mainnet' | 'Telegram' | 'Web3' | 'Social';
  officialLink: string;
  referralLink?: string;
  logoUrl: string;
}

const Airdrops = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [ecosystemFilter, setEcosystemFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState<string>('');

  const airdrops: Airdrop[] = [
    {
      id: '1',
      name: 'ZkSync Era',
      description: 'Layer 2 scaling solution for Ethereum with zero-knowledge proofs. Complete transactions and interact with dApps to earn potential rewards.',
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
      logoUrl: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
    },
    {
      id: '2',
      name: 'LayerZero',
      description: 'Omnichain interoperability protocol enabling cross-chain applications. Bridge assets and use cross-chain dApps across multiple networks.',
      tags: ['Interoperability', 'Cross-chain', 'Bridge', 'Omnichain', 'DeFi'],
      status: 'Farming',
      tasksCompleted: 23,
      totalTasks: 30,
      deadline: 'Q2 2024',
      estimatedValue: '$1000-5000',
      network: 'Multi-chain',
      category: 'Infrastructure',
      priority: 'High',
      lastUpdated: '1 day ago',
      ecosystem: 'Multi-chain',
      type: 'Web3',
      officialLink: 'https://layerzero.network',
      referralLink: 'https://layerzero.network?ref=airdropjournal',
      logoUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
    },
    {
      id: '3',
      name: 'Starknet',
      description: 'Ethereum Layer 2 using STARK technology. Deploy contracts, interact with dApps, and participate in the growing ecosystem.',
      tags: ['Layer 2', 'STARK', 'Ethereum', 'Smart Contracts', 'Cairo'],
      status: 'Claimable',
      tasksCompleted: 12,
      totalTasks: 12,
      deadline: '14 days',
      estimatedValue: '$200-800',
      network: 'Ethereum',
      category: 'Infrastructure',
      priority: 'Medium',
      lastUpdated: '3 hours ago',
      ecosystem: 'Ethereum',
      type: 'Mainnet',
      officialLink: 'https://starknet.io',
      referralLink: 'https://starknet.io?ref=airdropjournal',
      logoUrl: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
    },
    {
      id: '4',
      name: 'Wormhole',
      description: 'Cross-chain bridge connecting multiple blockchains. Already distributed tokens to early users who bridged assets.',
      tags: ['Bridge', 'Cross-chain', 'Multi-chain', 'Completed', 'Solana'],
      status: 'Completed',
      tasksCompleted: 8,
      totalTasks: 8,
      deadline: 'Completed',
      estimatedValue: '$1200',
      network: 'Multi-chain',
      category: 'Infrastructure',
      priority: 'Low',
      lastUpdated: '1 week ago',
      ecosystem: 'Multi-chain',
      type: 'Mainnet',
      officialLink: 'https://wormhole.com',
      logoUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
    },
    {
      id: '5',
      name: 'Scroll',
      description: 'zkEVM Layer 2 solution for Ethereum. Participate in testnet and mainnet activities to earn potential rewards.',
      tags: ['zkEVM', 'Layer 2', 'Ethereum', 'Testnet', 'Mainnet'],
      status: 'Farming',
      tasksCompleted: 5,
      totalTasks: 20,
      deadline: 'TBA',
      estimatedValue: '$300-1500',
      network: 'Ethereum',
      category: 'Infrastructure',
      priority: 'Medium',
      lastUpdated: '5 hours ago',
      ecosystem: 'Ethereum',
      type: 'Testnet',
      officialLink: 'https://scroll.io',
      referralLink: 'https://scroll.io?ref=airdropjournal',
      logoUrl: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
    },
    {
      id: '6',
      name: 'Blast',
      description: 'Ethereum Layer 2 with native yield for ETH and stablecoins. Interact with yield-generating dApps and earn rewards.',
      tags: ['Layer 2', 'Yield', 'ETH', 'Stablecoins', 'DeFi'],
      status: 'Farming',
      tasksCompleted: 12,
      totalTasks: 18,
      deadline: 'TBA',
      estimatedValue: '$400-1200',
      network: 'Ethereum',
      category: 'DeFi',
      priority: 'High',
      lastUpdated: '1 hour ago',
      ecosystem: 'Ethereum',
      type: 'Mainnet',
      officialLink: 'https://blast.io',
      referralLink: 'https://blast.io/airdrop?ref=airdropjournal',
      logoUrl: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
    },
    {
      id: '7',
      name: 'Telegram Dogs',
      description: 'Play-to-earn game on Telegram. Complete daily tasks, invite friends, and earn DOGS tokens through gameplay.',
      tags: ['Telegram', 'Gaming', 'P2E', 'Social', 'TON'],
      status: 'Farming',
      tasksCompleted: 15,
      totalTasks: 25,
      deadline: 'Q3 2024',
      estimatedValue: '$50-300',
      network: 'TON',
      category: 'Gaming',
      priority: 'Medium',
      lastUpdated: '30 minutes ago',
      ecosystem: 'Multi-chain',
      type: 'Telegram',
      officialLink: 'https://t.me/dogshouse_bot',
      referralLink: 'https://t.me/dogshouse_bot?start=ref_airdropjournal',
      logoUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
    },
    {
      id: '8',
      name: 'Galxe Campaigns',
      description: 'Complete various Web3 quests and campaigns across different protocols. Earn credentials and potential rewards.',
      tags: ['Quests', 'Credentials', 'Multi-protocol', 'Social', 'NFT'],
      status: 'Farming',
      tasksCompleted: 8,
      totalTasks: 15,
      deadline: 'Ongoing',
      estimatedValue: '$100-500',
      network: 'Multi-chain',
      category: 'Social',
      priority: 'Low',
      lastUpdated: '2 days ago',
      ecosystem: 'Multi-chain',
      type: 'Web3',
      officialLink: 'https://galxe.com',
      referralLink: 'https://galxe.com?referral=airdropjournal',
      logoUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
    }
  ];

  // Get all unique values for filters
  const allTags = Array.from(new Set(airdrops.flatMap(airdrop => airdrop.tags)));
  const allEcosystems = Array.from(new Set(airdrops.map(airdrop => airdrop.ecosystem)));
  const allTypes = Array.from(new Set(airdrops.map(airdrop => airdrop.type)));

  // Filter airdrops based on selected filters
  const filteredAirdrops = airdrops.filter(airdrop => {
    const matchesSearch = airdrop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         airdrop.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || airdrop.status === statusFilter;
    const matchesEcosystem = ecosystemFilter === 'All' || airdrop.ecosystem === ecosystemFilter;
    const matchesType = typeFilter === 'All' || airdrop.type === typeFilter;
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => airdrop.tags.includes(tag));
    
    return matchesSearch && matchesStatus && matchesEcosystem && matchesType && matchesTags;
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Farming': return 'status-farming';
      case 'Claimable': return 'status-claimable animate-pulse';
      case 'Completed': return 'status-completed';
      case 'Upcoming': return 'status-upcoming';
      default: return 'status-upcoming';
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return 'priority-low';
    }
  };

  const getTypeClass = (type: string) => {
    switch (type) {
      case 'Testnet': return 'bg-purple-600/15 text-purple-300 border border-purple-600/30';
      case 'Mainnet': return 'bg-violet-600/15 text-violet-300 border border-violet-600/30';
      case 'Telegram': return 'bg-cyan-600/15 text-cyan-300 border border-cyan-600/30';
      case 'Web3': return 'bg-emerald-600/15 text-emerald-300 border border-emerald-600/30';
      case 'Social': return 'bg-pink-600/15 text-pink-300 border border-pink-600/30';
      default: return 'bg-gray-600/15 text-gray-300 border border-gray-600/30';
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLink(`${type}`);
      setTimeout(() => setCopiedLink(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="bg-gray-950 min-h-screen">
      <Sidebar />
      <main className="lg:ml-64 text-gray-200">
        <div className="relative p-4 lg:p-8 max-w-7xl mx-auto">
          {/* Background Effects */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(124,58,237,0.04)_0%,rgba(168,85,247,0.02)_50%,transparent_70%)] -z-10 filter blur-[100px]"></div>

          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 lg:mb-12 gap-6 pt-16 lg:pt-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold text-gray-100 mb-2">All Airdrops</h1>
              <p className="text-gray-400">Manage and track all your airdrop opportunities</p>
            </div>
            <button className="btn-primary text-sm lg:text-base">
              Add New Airdrop
            </button>
          </header>

          {/* Filters Section */}
          <Card className="mb-6 lg:mb-8">
            <div className="p-4 lg:p-6">
              <div className="flex flex-col gap-6">
                {/* Search and Main Filters */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Search Airdrops</label>
                    <input
                      type="text"
                      placeholder="Search by name or description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="form-input w-full"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:w-auto">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="form-input w-full"
                      >
                        <option value="All">All Status</option>
                        <option value="Farming">Farming</option>
                        <option value="Claimable">Claimable</option>
                        <option value="Completed">Completed</option>
                        <option value="Upcoming">Upcoming</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Ecosystem</label>
                      <select
                        value={ecosystemFilter}
                        onChange={(e) => setEcosystemFilter(e.target.value)}
                        className="form-input w-full"
                      >
                        <option value="All">All Ecosystems</option>
                        {allEcosystems.map(ecosystem => (
                          <option key={ecosystem} value={ecosystem}>{ecosystem}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                      <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="form-input w-full"
                      >
                        <option value="All">All Types</option>
                        {allTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Tags Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Filter by Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          selectedTags.includes(tag)
                            ? 'tag-active'
                            : 'tag hover:bg-gray-700/50'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  {selectedTags.length > 0 && (
                    <button
                      onClick={() => setSelectedTags([])}
                      className="mt-3 text-sm text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      Clear all tags
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-400">
              Showing {filteredAirdrops.length} of {airdrops.length} airdrops
            </p>
          </div>

          {/* Airdrops Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {filteredAirdrops.map(airdrop => (
              <Card key={airdrop.id} className="hover:border-violet-600/30 transition-all duration-200">
                <div className="p-4 lg:p-6">
                  {/* Header with Logo */}
                  <div className="flex items-start gap-4 mb-4">
                    <img 
                      src={airdrop.logoUrl} 
                      alt={`${airdrop.name} logo`}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg lg:text-xl font-semibold text-gray-100 mb-1 truncate">{airdrop.name}</h3>
                      <p className="text-sm text-gray-400">{airdrop.ecosystem} • {airdrop.category}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getStatusClass(airdrop.status)}`}>
                        {airdrop.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getTypeClass(airdrop.type)}`}>
                        {airdrop.type}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{airdrop.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {airdrop.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="tag text-xs">
                        {tag}
                      </span>
                    ))}
                    {airdrop.tags.length > 4 && (
                      <span className="tag text-xs">
                        +{airdrop.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-gray-300">{airdrop.tasksCompleted}/{airdrop.totalTasks}</span>
                    </div>
                    <div className="w-full bg-gray-800/50 rounded-full h-2">
                      <div 
                        className="bg-violet-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(airdrop.tasksCompleted / airdrop.totalTasks) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Footer Info */}
                  <div className="flex justify-between items-center text-sm mb-4">
                    <div>
                      <p className="text-gray-400">Est. Value</p>
                      <p className="text-gray-200 font-medium">{airdrop.estimatedValue}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400">Deadline</p>
                      <p className="text-gray-200 font-medium">{airdrop.deadline}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getPriorityClass(airdrop.priority)}`}>
                      {airdrop.priority}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      <Link 
                        to={`/airdrops/${airdrop.id}`}
                        className="flex-1 btn-primary text-center text-sm"
                      >
                        View Details
                      </Link>
                      <a 
                        href={airdrop.officialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 btn-secondary text-center text-sm"
                      >
                        Visit Site
                      </a>
                    </div>
                    
                    {/* Copy Links */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(airdrop.officialLink, `${airdrop.name}-official`)}
                        className="flex-1 btn-ghost text-xs flex items-center justify-center gap-1"
                      >
                        {copiedLink === `${airdrop.name}-official` ? (
                          <>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy Link
                          </>
                        )}
                      </button>
                      
                      {airdrop.referralLink && (
                        <button
                          onClick={() => copyToClipboard(airdrop.referralLink!, `${airdrop.name}-referral`)}
                          className="flex-1 bg-emerald-800/30 hover:bg-emerald-700/30 text-emerald-300 py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
                        >
                          {copiedLink === `${airdrop.name}-referral` ? (
                            <>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Copied!
                            </>
                          ) : (
                            <>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Copy Referral
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div className="mt-4 pt-4 border-t border-gray-800/30">
                    <p className="text-xs text-gray-500">Updated {airdrop.lastUpdated}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredAirdrops.length === 0 && (
            <Card className="text-center py-12">
              <div className="text-gray-400">
                <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-300 mb-2">No airdrops found</h3>
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