import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '@/components/Sidebar/Sidebar';
import Card from '@/components/Dashboard/Card';

interface AirdropDetails {
  id: string;
  name: string;
  description: string;
  tags: string[];
  status: 'Farming' | 'Claimable' | 'Completed' | 'Upcoming';
  deadline: string;
  estimatedValue: string;
  ecosystem: string;
  type: string;
  officialLink: string;
  referralLink?: string;
  logoUrl: string;
  bannerUrl: string;
  notes: string;
  dailyTaskNote?: string;
  isDailyTask: boolean;
}

const AirdropDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [copiedLink, setCopiedLink] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isDailyTask, setIsDailyTask] = useState(false);
  const [dailyTaskNote, setDailyTaskNote] = useState('');

  // Available tag suggestions
  const availableTags = [
    'Layer 2', 'Ethereum', 'ZK-Proofs', 'DeFi', 'Bridge', 'Testnet', 'Mainnet',
    'Telegram', 'Gaming', 'P2E', 'Social', 'TON', 'Cross-chain', 'NFT', 'Staking',
    'Yield', 'DAO', 'Governance', 'High Priority', 'Medium Priority', 'Low Priority',
    'Daily Task', 'Weekly Task', 'One-time', 'Recurring'
  ];

  // Mock data - in real app, this would come from API/database
  const airdropDetails: AirdropDetails = {
    id: id || '1',
    name: 'ZkSync Era',
    description: 'Layer 2 scaling solution for Ethereum with zero-knowledge proofs.',
    tags: ['Layer 2', 'Ethereum', 'ZK-Proofs', 'DeFi', 'Bridge'],
    status: 'Farming',
    deadline: 'TBA',
    estimatedValue: '$500-2000',
    ecosystem: 'Ethereum',
    type: 'Mainnet',
    officialLink: 'https://zksync.io',
    referralLink: 'https://zksync.io?ref=airdropjournal',
    logoUrl: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop',
    bannerUrl: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
    notes: 'Focus on maintaining consistent activity over time. ZkSync values long-term users over one-time interactions.',
    dailyTaskNote: 'Complete daily bridge transaction of at least 0.01 ETH',
    isDailyTask: false
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

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setNewTag('');
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(newTag);
    }
  };

  const filteredSuggestions = availableTags.filter(tag => 
    tag.toLowerCase().includes(newTag.toLowerCase()) && !tags.includes(tag)
  );

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
              <p className="text-slate-400">{airdropDetails.ecosystem} • {airdropDetails.type}</p>
            </div>
            <div className="flex items-center space-x-4 flex-shrink-0">
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusClass(airdropDetails.status)}`}>
                {airdropDetails.status}
              </span>
            </div>
          </header>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Banner and Overview */}
              <Card>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-slate-400 text-sm">Estimated Value</p>
                      <p className="text-2xl font-bold text-green-400">{airdropDetails.estimatedValue}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Deadline</p>
                      <p className="text-2xl font-bold text-slate-200">{airdropDetails.deadline}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-100 mb-2">Description</h3>
                    <p className="text-slate-300 leading-relaxed">{airdropDetails.description}</p>
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

              {/* Notes Section */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-100 mb-4">Notes</h3>
                  <textarea
                    value={notes || airdropDetails.notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add your notes about this airdrop..."
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px] resize-vertical"
                  />
                </div>
              </Card>
            </div>

            {/* Right Column - Tags and Daily Task */}
            <div className="space-y-6">
              {/* Tag Management */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-100 mb-4">Tags</h3>
                  
                  {/* Current Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(tags.length > 0 ? tags : airdropDetails.tags).map(tag => (
                      <span key={tag} className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-sm rounded-lg flex items-center gap-2">
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-indigo-400 hover:text-indigo-200"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Add New Tag */}
                  <div className="relative">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={handleTagInput}
                      placeholder="Type to add or search tags..."
                      className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    
                    {/* Tag Suggestions */}
                    {newTag && filteredSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
                        {filteredSuggestions.slice(0, 8).map(suggestion => (
                          <button
                            key={suggestion}
                            onClick={() => addTag(suggestion)}
                            className="w-full text-left px-3 py-2 text-slate-300 hover:bg-slate-700 transition"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => addTag(newTag)}
                    disabled={!newTag}
                    className="mt-2 w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white py-2 px-4 rounded-lg font-medium transition"
                  >
                    Add Tag
                  </button>
                </div>
              </Card>

              {/* Daily Task Configuration */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-100 mb-4">Daily Task</h3>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <input
                      type="checkbox"
                      id="dailyTask"
                      checked={isDailyTask}
                      onChange={(e) => setIsDailyTask(e.target.checked)}
                      className="h-5 w-5 rounded bg-slate-700 border-slate-600 text-indigo-500 focus:ring-indigo-600"
                    />
                    <label htmlFor="dailyTask" className="text-slate-300 font-medium">
                      Mark as Daily Task
                    </label>
                  </div>

                  {isDailyTask && (
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Daily Task Description
                      </label>
                      <textarea
                        value={dailyTaskNote}
                        onChange={(e) => setDailyTaskNote(e.target.value)}
                        placeholder="What needs to be done daily for this airdrop?"
                        className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[80px] resize-vertical"
                      />
                      <p className="text-xs text-slate-400 mt-2">
                        This will appear in your daily tasks section
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Save Button */}
              <button className="w-full bg-green-600 hover:bg-green-500 text-white py-3 px-4 rounded-lg font-medium transition">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AirdropDetails;