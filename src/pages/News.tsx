import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import Card from '@/components/Dashboard/Card';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  url: string;
  category: 'Airdrop' | 'DeFi' | 'Layer2' | 'NFT' | 'Gaming' | 'Infrastructure' | 'Regulation' | 'Market';
  importance: 'High' | 'Medium' | 'Low';
  trending: boolean;
}

interface TrendingAirdrop {
  id: string;
  name: string;
  description: string;
  estimatedValue: string;
  deadline: string;
  participants: string;
  logoUrl: string;
  trending: boolean;
  status: 'New' | 'Hot' | 'Ending Soon' | 'Live';
}

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [trendingAirdrops, setTrendingAirdrops] = useState<TrendingAirdrop[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [importanceFilter, setImportanceFilter] = useState<string>('All');

  // Mock news data - only trending/important news
  const mockNews: NewsItem[] = [
    {
      id: '1',
      title: 'LayerZero Announces Snapshot Date for Highly Anticipated Airdrop',
      summary: 'LayerZero protocol reveals snapshot will occur on March 31st, 2024, with distribution expected in Q2.',
      source: 'CoinDesk',
      publishedAt: '2 hours ago',
      url: 'https://coindesk.com/layerzero-snapshot-announcement',
      category: 'Airdrop',
      importance: 'High',
      trending: true
    },
    {
      id: '2',
      title: 'ZkSync Era Mainnet Reaches 1 Million Transactions Milestone',
      summary: 'The Ethereum Layer 2 solution celebrates a major adoption milestone just weeks after mainnet launch.',
      source: 'The Defiant',
      publishedAt: '4 hours ago',
      url: 'https://thedefiant.io/zksync-milestone',
      category: 'Layer2',
      importance: 'High',
      trending: true
    },
    {
      id: '3',
      title: 'Arbitrum DAO Approves $100M Gaming Fund for Ecosystem Growth',
      summary: 'The Arbitrum community votes to allocate significant funding towards gaming projects and infrastructure.',
      source: 'Bankless',
      publishedAt: '6 hours ago',
      url: 'https://bankless.com/arbitrum-gaming-fund',
      category: 'Gaming',
      importance: 'Medium',
      trending: false
    },
    {
      id: '4',
      title: 'Starknet Token Claims Exceed 50% as Deadline Approaches',
      summary: 'Over half of eligible STRK tokens have been claimed with just two weeks remaining in the claim period.',
      source: 'The Block',
      publishedAt: '8 hours ago',
      url: 'https://theblock.co/starknet-claims-update',
      category: 'Airdrop',
      importance: 'Medium',
      trending: false
    },
    {
      id: '5',
      title: 'Blast Mainnet Launch Attracts $2.3B in Total Value Locked',
      summary: 'The Ethereum Layer 2 with native yield sees massive adoption within hours of mainnet deployment.',
      source: 'CoinTelegraph',
      publishedAt: '1 day ago',
      url: 'https://cointelegraph.com/blast-mainnet-tvl',
      category: 'Layer2',
      importance: 'High',
      trending: true
    },
    {
      id: '6',
      title: 'New Telegram Bot Airdrops Gain Massive Traction',
      summary: 'Multiple Telegram-based gaming bots see explosive user growth with potential token distributions.',
      source: 'Decrypt',
      publishedAt: '1 day ago',
      url: 'https://decrypt.co/telegram-bot-airdrops',
      category: 'Airdrop',
      importance: 'Medium',
      trending: true
    }
  ];

  // Mock trending airdrops data
  const mockTrendingAirdrops: TrendingAirdrop[] = [
    {
      id: '1',
      name: 'Berachain Testnet',
      description: 'Proof-of-Liquidity blockchain with innovative consensus mechanism',
      estimatedValue: '$1000-5000',
      deadline: 'TBA',
      participants: '500K+',
      logoUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      trending: true,
      status: 'Hot'
    },
    {
      id: '2',
      name: 'Monad Testnet',
      description: 'High-performance EVM-compatible blockchain with parallel execution',
      estimatedValue: '$2000-8000',
      deadline: 'Q3 2024',
      participants: '300K+',
      logoUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      trending: true,
      status: 'New'
    },
    {
      id: '3',
      name: 'Fuel Network',
      description: 'Modular execution layer for Ethereum with UTXO model',
      estimatedValue: '$500-3000',
      deadline: 'Q2 2024',
      participants: '200K+',
      logoUrl: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      trending: true,
      status: 'Live'
    },
    {
      id: '4',
      name: 'Linea Voyage',
      description: 'ConsenSys zkEVM with comprehensive quest program',
      estimatedValue: '$300-1500',
      deadline: '30 days',
      participants: '800K+',
      logoUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      trending: true,
      status: 'Ending Soon'
    }
  ];

  useEffect(() => {
    // Simulate API loading
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNews(mockNews);
      setTrendingAirdrops(mockTrendingAirdrops);
      setLoading(false);
    };

    loadData();
  }, []);

  const categories = ['All', 'Airdrop', 'DeFi', 'Layer2', 'NFT', 'Gaming', 'Infrastructure', 'Regulation', 'Market'];
  const importanceLevels = ['All', 'High', 'Medium', 'Low'];

  const filteredNews = news.filter(item => {
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesImportance = importanceFilter === 'All' || item.importance === importanceFilter;
    return matchesCategory && matchesImportance;
  });

  const getImportanceClass = (importance: string) => {
    switch (importance) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return 'tag';
    }
  };

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'Airdrop': return 'bg-violet-600/15 text-violet-300 border border-violet-600/30';
      case 'DeFi': return 'bg-emerald-600/15 text-emerald-300 border border-emerald-600/30';
      case 'Layer2': return 'bg-blue-600/15 text-blue-300 border border-blue-600/30';
      case 'NFT': return 'bg-purple-600/15 text-purple-300 border border-purple-600/30';
      case 'Gaming': return 'bg-pink-600/15 text-pink-300 border border-pink-600/30';
      case 'Infrastructure': return 'bg-cyan-600/15 text-cyan-300 border border-cyan-600/30';
      case 'Regulation': return 'bg-orange-600/15 text-orange-300 border border-orange-600/30';
      case 'Market': return 'bg-green-600/15 text-green-300 border border-green-600/30';
      default: return 'tag';
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'New': return 'bg-emerald-600/15 text-emerald-300 border border-emerald-600/30';
      case 'Hot': return 'bg-red-600/15 text-red-300 border border-red-600/30';
      case 'Ending Soon': return 'bg-orange-600/15 text-orange-300 border border-orange-600/30';
      case 'Live': return 'bg-blue-600/15 text-blue-300 border border-blue-600/30';
      default: return 'tag';
    }
  };

  return (
    <div className="bg-gray-950 min-h-screen">
      <Sidebar />
      <main className="ml-64 text-gray-200">
        <div className="relative p-8 max-w-7xl mx-auto">
          {/* Background Effects */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(124,58,237,0.04)_0%,rgba(168,85,247,0.02)_50%,transparent_70%)] -z-10 filter blur-[100px]"></div>

          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
            <div>
              <h1 className="text-3xl font-semibold text-gray-100 mb-2">Airdrop News</h1>
              <p className="text-gray-400">Stay updated with trending airdrop announcements and crypto news</p>
            </div>
            <button className="btn-primary">
              Refresh News
            </button>
          </header>

          {/* Trending Airdrops Section */}
          <Card className="mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10H3c-.552 0-1 .449-1 1 0 .551.448 1 1 1h.025C3.289 19.557 7.879 24 13.5 24 19.299 24 24 19.299 24 13.5S19.299 2 13.5 2zM13.5 22C8.813 22 5 18.187 5 13.5S8.813 5 13.5 5 22 8.813 22 13.5 18.187 22 13.5 22z"/>
                </svg>
                Trending Airdrops
              </h2>
              
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="animate-pulse bg-gray-800/40 rounded-lg p-4">
                      <div className="h-12 w-12 bg-gray-700 rounded-lg mb-3"></div>
                      <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-800 rounded w-full mb-1"></div>
                      <div className="h-3 bg-gray-800 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {trendingAirdrops.map(airdrop => (
                    <div key={airdrop.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50 hover:border-violet-600/30 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <img 
                          src={airdrop.logoUrl} 
                          alt={`${airdrop.name} logo`}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getStatusClass(airdrop.status)}`}>
                          {airdrop.status}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-100 mb-2">{airdrop.name}</h3>
                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">{airdrop.description}</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Est. Value:</span>
                          <span className="text-emerald-400 font-medium">{airdrop.estimatedValue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Participants:</span>
                          <span className="text-gray-300">{airdrop.participants}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Deadline:</span>
                          <span className="text-gray-300">{airdrop.deadline}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Simple Filters */}
          <Card className="mb-8">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="form-input w-full"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Importance</label>
                  <select
                    value={importanceFilter}
                    onChange={(e) => setImportanceFilter(e.target.value)}
                    className="form-input w-full"
                  >
                    {importanceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </Card>

          {/* News List - Simple Format */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-6">Latest News</h2>
              
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="animate-pulse border-b border-gray-800/30 pb-4">
                      <div className="h-5 bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
                      <div className="flex gap-2">
                        <div className="h-6 w-16 bg-gray-700 rounded"></div>
                        <div className="h-6 w-20 bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredNews.map(article => (
                    <div key={article.id} className="border-b border-gray-800/30 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start gap-3 mb-2">
                        <h3 className="font-medium text-gray-200 hover:text-violet-400 transition-colors cursor-pointer">
                          <a href={article.url} target="_blank" rel="noopener noreferrer">
                            {article.title}
                          </a>
                        </h3>
                        <div className="flex gap-2 flex-shrink-0">
                          <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getCategoryClass(article.category)}`}>
                            {article.category}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getImportanceClass(article.importance)}`}>
                            {article.importance}
                          </span>
                          {article.trending && (
                            <span className="px-2 py-1 text-xs font-medium rounded-lg bg-orange-600/15 text-orange-300 border border-orange-600/30">
                              🔥 Trending
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-300 mb-3">{article.summary}</p>
                      <div className="flex justify-between items-center text-sm text-gray-400">
                        <span>{article.source}</span>
                        <span>{article.publishedAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {!loading && filteredNews.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p>No news found for the selected filters</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default News;