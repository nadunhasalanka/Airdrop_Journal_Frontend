import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '@/components/Sidebar/Sidebar';
import Card from '@/components/Dashboard/Card';
import AirdropCard from '@/components/AirdropCard';
import airdropService from '@/services/airdropService';
import userTagService from '@/services/userTagService';
import { useAuth } from '@/contexts/AuthContext';

interface Airdrop {
  _id: string;
  name: string;
  description: string;
  ecosystem: 'Ethereum' | 'Solana' | 'Polygon' | 'Arbitrum' | 'Optimism' | 'BSC' | 'Avalanche' | 'Multi-chain';
  type: 'Testnet' | 'Mainnet' | 'Telegram' | 'Web3' | 'Social';
  status: 'Farming' | 'Claimable' | 'Completed' | 'Upcoming';
  deadline: string;
  estimatedValue: string;
  priority: 'High' | 'Medium' | 'Low';
  officialLink: string;
  referralLink?: string;
  logoUrl: string;
  bannerUrl: string;
  tags: string[];
  notes: string;
  isDailyTask: boolean;
  dailyTaskNote: string;
  tokenSymbol: string;
  startDate: string;
  socialMedia: {
    twitter: string;
    telegram: string;
    discord: string;
    medium: string;
    github: string;
    website: string;
  };
  user?: string;
  network?: string;
  category?: string;
  tasksCompleted?: number;
  totalTasks?: number;
  lastUpdated?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UserTag {
  _id: string;
  name: string;
  color: string;
  user: string;
  usageCount: number;
}

const Airdrops = () => {
  const { user } = useAuth();
  const [airdrops, setAirdrops] = useState<Airdrop[]>([]);
  const [userTags, setUserTags] = useState<UserTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [ecosystemFilter, setEcosystemFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const [airdropsResponse, tagsResponse] = await Promise.all([
          airdropService.getUserAirdrops(),
          userTagService.getTags()
        ]);
        
        setAirdrops(airdropsResponse.data || []);
        setUserTags(tagsResponse.data || []);
      } catch (error) {
        console.error('Error loading data:', error);
        setAirdrops([]);
        setUserTags([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Get all unique values for filters
  const allTags = Array.from(new Set((userTags || []).map(tag => tag.name)));
  const allEcosystems = Array.from(new Set((airdrops || []).map(airdrop => airdrop.ecosystem)));
  const allTypes = Array.from(new Set((airdrops || []).map(airdrop => airdrop.type)));

  // Filter airdrops based on selected filters
  const filteredAirdrops = (airdrops || []).filter(airdrop => {
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
            <Link to="/airdrops/add" className="btn-primary text-sm lg:text-base">
              Add New Airdrop
            </Link>
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
                    {(userTags || []).map(tag => (
                      <button
                        key={tag._id}
                        onClick={() => toggleTag(tag.name)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                          selectedTags.includes(tag.name)
                            ? 'tag-active'
                            : 'tag hover:bg-gray-700/50'
                        }`}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: tag.color }}
                        ></span>
                        {tag.name}
                        {tag.usageCount > 0 && (
                          <span className="text-xs opacity-60 ml-1">({tag.usageCount})</span>
                        )}
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
              Showing {filteredAirdrops.length} of {(airdrops || []).length} airdrops
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
              <span className="ml-3 text-gray-400">Loading airdrops...</span>
            </div>
          )}

          {/* Empty State */}
          {!loading && (airdrops || []).length === 0 && (
            <Card className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2h16a2 2 0 002-2v-5zM8 5V3a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
                <h3 className="text-lg font-medium text-gray-300 mb-2">No airdrops yet</h3>
                <p className="text-gray-500">Start by adding your first airdrop to track your progress</p>
              </div>
              <Link
                to="/add-airdrop"
                className="inline-flex items-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors"
              >
                Add Your First Airdrop
              </Link>
            </Card>
          )}

          {/* No Results State */}
          {!loading && (airdrops || []).length > 0 && filteredAirdrops.length === 0 && (
            <Card className="text-center py-12">
              <div className="text-gray-400">
                <h3 className="text-lg font-medium text-gray-300 mb-2">No matching airdrops</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            </Card>
          )}

          {/* Airdrops Grid */}
          {!loading && filteredAirdrops.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {filteredAirdrops.map(airdrop => (
              <Card key={airdrop._id} className="hover:border-violet-600/30 transition-all duration-200">
                <div className="p-4 lg:p-6">
                  {/* Header with Logo */}
                  <div className="flex items-start gap-4 mb-4">
                    {airdrop.logoUrl ? (
                      <img 
                        src={airdrop.logoUrl} 
                        alt={`${airdrop.name} logo`}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-400 text-xl font-bold">
                          {airdrop.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg lg:text-xl font-semibold text-gray-100 mb-1 truncate">{airdrop.name}</h3>
                      <p className="text-sm text-gray-400">{airdrop.ecosystem} • {airdrop.category || 'DeFi'}</p>
                      {airdrop.tokenSymbol && (
                        <p className="text-xs text-violet-400 font-medium">${airdrop.tokenSymbol}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`status-badge ${getStatusClass(airdrop.status)}`}>
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
                      <span key={tag} className="tag-badge">
                        {tag}
                      </span>
                    ))}
                    {airdrop.tags.length > 4 && (
                      <span className="tag-badge">
                        +{airdrop.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Progress */}
                  {airdrop.tasksCompleted !== undefined && airdrop.totalTasks !== undefined && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-gray-300">{airdrop.tasksCompleted}/{airdrop.totalTasks}</span>
                      </div>
                      <div className="w-full bg-gray-800/50 rounded-full h-2">
                        <div 
                          className="bg-violet-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((airdrop.tasksCompleted / airdrop.totalTasks) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Footer Info */}
                  <div className="flex justify-between items-center text-sm mb-4">
                    <div>
                      <p className="text-gray-400">Est. Value</p>
                      <p className="text-gray-200 font-medium">{airdrop.estimatedValue || 'TBA'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400">Deadline</p>
                      <p className="text-gray-200 font-medium">{airdrop.deadline || 'TBA'}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getPriorityClass(airdrop.priority)}`}>
                        {airdrop.priority}
                      </span>
                      {airdrop.isDailyTask && (
                        <div className="mt-1">
                          <span className="px-2 py-1 text-xs bg-orange-600/20 text-orange-400 rounded-lg">
                            Daily Task
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      <Link 
                        to={`/airdrops/${airdrop._id}`}
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
                      {airdrop.referralLink ? (
                        <button
                          onClick={() => copyToClipboard(airdrop.referralLink!, `${airdrop.name}-referral`)}
                          className="flex-1 btn-ghost text-xs flex items-center justify-center gap-1"
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
                              Copy Referral Link
                            </>
                          )}
                        </button>
                      ) : (
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
                              Copy Official Link
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div className="mt-4 pt-4 border-t border-gray-800/30">
                    <p className="text-xs text-gray-500">
                      Updated {airdrop.lastUpdated || 'recently'}
                      {airdrop.startDate && (
                        <span className="ml-3">
                          Started {new Date(airdrop.startDate).toLocaleDateString()}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Airdrops;