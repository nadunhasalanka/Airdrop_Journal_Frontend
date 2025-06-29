import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import Card from '@/components/Dashboard/Card';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  author: string;
  publishedAt: string;
  url: string;
  imageUrl: string;
  category: 'Airdrop' | 'DeFi' | 'Layer2' | 'NFT' | 'Gaming' | 'Infrastructure' | 'Regulation' | 'Market';
  importance: 'High' | 'Medium' | 'Low';
  tags: string[];
  readTime: string;
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
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedImportance, setSelectedImportance] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock news data
  const mockNews: NewsItem[] = [
    {
      id: '1',
      title: 'LayerZero Announces Snapshot Date for Highly Anticipated Airdrop',
      summary: 'LayerZero protocol reveals snapshot will occur on March 31st, 2024, with distribution expected in Q2.',
      content: 'The omnichain interoperability protocol LayerZero has finally announced the snapshot date for their long-awaited airdrop...',
      source: 'CoinDesk',
      author: 'Sarah Chen',
      publishedAt: '2 hours ago',
      url: 'https://coindesk.com/layerzero-snapshot-announcement',
      imageUrl: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      category: 'Airdrop',
      importance: 'High',
      tags: ['LayerZero', 'Airdrop', 'Snapshot', 'Omnichain'],
      readTime: '3 min read',
      trending: true
    },
    {
      id: '2',
      title: 'ZkSync Era Mainnet Reaches 1 Million Transactions Milestone',
      summary: 'The Ethereum Layer 2 solution celebrates a major adoption milestone just weeks after mainnet launch.',
      content: 'ZkSync Era has processed over 1 million transactions since its mainnet alpha launch, demonstrating strong adoption...',
      source: 'The Defiant',
      author: 'Mike Rodriguez',
      publishedAt: '4 hours ago',
      url: 'https://thedefiant.io/zksync-milestone',
      imageUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      category: 'Layer2',
      importance: 'High',
      tags: ['ZkSync', 'Layer2', 'Ethereum', 'Milestone'],
      readTime: '4 min read',
      trending: true
    },
    {
      id: '3',
      title: 'Arbitrum DAO Approves $100M Gaming Fund for Ecosystem Growth',
      summary: 'The Arbitrum community votes to allocate significant funding towards gaming projects and infrastructure.',
      content: 'In a landmark governance decision, the Arbitrum DAO has approved a $100 million fund dedicated to gaming...',
      source: 'Bankless',
      author: 'Alex Thompson',
      publishedAt: '6 hours ago',
      url: 'https://bankless.com/arbitrum-gaming-fund',
      imageUrl: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      category: 'Gaming',
      importance: 'Medium',
      tags: ['Arbitrum', 'Gaming', 'DAO', 'Funding'],
      readTime: '5 min read',
      trending: false
    },
    {
      id: '4',
      title: 'Starknet Token Claims Exceed 50% as Deadline Approaches',
      summary: 'Over half of eligible STRK tokens have been claimed with just two weeks remaining in the claim period.',
      content: 'The Starknet airdrop has seen strong participation with over 50% of allocated tokens claimed by eligible users...',
      source: 'The Block',
      author: 'Jennifer Liu',
      publishedAt: '8 hours ago',
      url: 'https://theblock.co/starknet-claims-update',
      imageUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      category: 'Airdrop',
      importance: 'Medium',
      tags: ['Starknet', 'STRK', 'Claims', 'Deadline'],
      readTime: '3 min read',
      trending: false
    },
    {
      id: '5',
      title: 'Polygon zkEVM Launches Incentive Program for Early Adopters',
      summary: 'Polygon announces a comprehensive rewards program for users bridging assets and using zkEVM applications.',
      content: 'Polygon has unveiled an extensive incentive program designed to bootstrap adoption of their zkEVM solution...',
      source: 'Decrypt',
      author: 'David Park',
      publishedAt: '12 hours ago',
      url: 'https://decrypt.co/polygon-zkevm-incentives',
      imageUrl: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      category: 'DeFi',
      importance: 'Medium',
      tags: ['Polygon', 'zkEVM', 'Incentives', 'Bridge'],
      readTime: '4 min read',
      trending: false
    },
    {
      id: '6',
      title: 'Blast Mainnet Launch Attracts $2.3B in Total Value Locked',
      summary: 'The Ethereum Layer 2 with native yield sees massive adoption within hours of mainnet deployment.',
      content: 'Blast has achieved remarkable traction with over $2.3 billion in total value locked just 24 hours after mainnet launch...',
      source: 'CoinTelegraph',
      author: 'Maria Santos',
      publishedAt: '1 day ago',
      url: 'https://cointelegraph.com/blast-mainnet-tvl',
      imageUrl: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      category: 'Layer2',
      importance: 'High',
      tags: ['Blast', 'Mainnet', 'TVL', 'Yield'],
      readTime: '5 min read',
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
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesImportance = selectedImportance === 'All' || item.importance === selectedImportance;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesImportance && matchesSearch;
  });

  const getImportanceClass = (importance: string) => {
    switch (importance) {
      case 'High': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Low': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-slate-700/20 text-slate-300 border-slate-700/30';
    }
  };

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'Airdrop': return 'bg-indigo-500/20 text-indigo-300';
      case 'DeFi': return 'bg-green-500/20 text-green-300';
      case 'Layer2': return 'bg-blue-500/20 text-blue-300';
      case 'NFT': return 'bg-purple-500/20 text-purple-300';
      case 'Gaming': return 'bg-pink-500/20 text-pink-300';
      case 'Infrastructure': return 'bg-cyan-500/20 text-cyan-300';
      case 'Regulation': return 'bg-orange-500/20 text-orange-300';
      case 'Market': return 'bg-emerald-500/20 text-emerald-300';
      default: return 'bg-slate-700/20 text-slate-300';
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'New': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Hot': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Ending Soon': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'Live': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-slate-700/20 text-slate-300 border-slate-700/30';
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
              <h1 className="text-3xl font-bold text-slate-50 truncate">Airdrop News</h1>
              <p className="text-slate-400">Stay updated with the latest airdrop announcements and crypto news</p>
            </div>
            <div className="flex items-center space-x-4 flex-shrink-0">
              <button className="cta-button text-sm bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-500 whitespace-nowrap">
                Refresh News
              </button>
            </div>
          </header>

          {/* Trending Airdrops Section */}
          <Card className="mb-8">
            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10H3c-.552 0-1 .449-1 1 0 .551.448 1 1 1h.025C3.289 19.557 7.879 24 13.5 24 19.299 24 24 19.299 24 13.5S19.299 2 13.5 2zM13.5 22C8.813 22 5 18.187 5 13.5S8.813 5 13.5 5 22 8.813 22 13.5 18.187 22 13.5 22z"/>
                  <path d="M15.5 6.5c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zM16 10h-5c-.552 0-1 .448-1 1s.448 1 1 1h1v5h-1c-.552 0-1 .448-1 1s.448 1 1 1h5c.552 0 1-.448 1-1s-.448-1-1-1h-1v-6c0-.552-.448-1-1-1z"/>
                </svg>
                Trending Airdrops
              </h2>
              
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="animate-pulse bg-slate-800/40 rounded-lg p-4">
                      <div className="h-12 w-12 bg-slate-700 rounded-lg mb-3"></div>
                      <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-slate-800 rounded w-full mb-1"></div>
                      <div className="h-3 bg-slate-800 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {trendingAirdrops.map(airdrop => (
                    <div key={airdrop.id} className="bg-slate-800/40 rounded-lg p-4 border border-slate-700 hover:border-indigo-500/50 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <img 
                          src={airdrop.logoUrl} 
                          alt={`${airdrop.name} logo`}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusClass(airdrop.status)}`}>
                          {airdrop.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-100 mb-2">{airdrop.name}</h3>
                      <p className="text-sm text-slate-400 mb-3 line-clamp-2">{airdrop.description}</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Est. Value:</span>
                          <span className="text-green-400 font-medium">{airdrop.estimatedValue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Participants:</span>
                          <span className="text-slate-300">{airdrop.participants}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Deadline:</span>
                          <span className="text-slate-300">{airdrop.deadline}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Filters Section */}
          <Card className="mb-8">
            <div className="p-6">
              <div className="flex flex-col gap-4">
                {/* Search */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Search News</label>
                  <input
                    type="text"
                    placeholder="Search by title, content, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Category and Importance Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Importance</label>
                    <select
                      value={selectedImportance}
                      onChange={(e) => setSelectedImportance(e.target.value)}
                      className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {importanceLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-slate-400">
              Showing {filteredNews.length} of {news.length} articles
            </p>
          </div>

          {/* News Articles */}
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3, 4].map(i => (
                <Card key={i} className="animate-pulse">
                  <div className="p-6">
                    <div className="flex gap-6">
                      <div className="w-48 h-32 bg-slate-700 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="h-6 bg-slate-700 rounded w-3/4 mb-3"></div>
                        <div className="h-4 bg-slate-800 rounded w-full mb-2"></div>
                        <div className="h-4 bg-slate-800 rounded w-2/3 mb-4"></div>
                        <div className="flex gap-2">
                          <div className="h-6 w-16 bg-slate-700 rounded"></div>
                          <div className="h-6 w-20 bg-slate-700 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredNews.map(article => (
                <Card key={article.id} className="hover:border-indigo-500/50 transition-colors cursor-pointer">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Article Image */}
                      <div className="lg:w-48 lg:flex-shrink-0">
                        <img 
                          src={article.imageUrl} 
                          alt={article.title}
                          className="w-full h-48 lg:h-32 object-cover rounded-lg"
                        />
                      </div>

                      {/* Article Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryClass(article.category)}`}>
                            {article.category}
                          </span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getImportanceClass(article.importance)}`}>
                            {article.importance}
                          </span>
                          {article.trending && (
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                              🔥 Trending
                            </span>
                          )}
                        </div>

                        <h2 className="text-xl font-bold text-slate-100 mb-2 hover:text-indigo-400 transition">
                          <a href={article.url} target="_blank" rel="noopener noreferrer">
                            {article.title}
                          </a>
                        </h2>

                        <p className="text-slate-300 mb-4 line-clamp-2">{article.summary}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {article.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-slate-800/60 text-slate-400 text-xs rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Article Meta */}
                        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-400">
                          <div className="flex items-center gap-4">
                            <span>{article.source}</span>
                            <span>•</span>
                            <span>By {article.author}</span>
                            <span>•</span>
                            <span>{article.readTime}</span>
                          </div>
                          <span>{article.publishedAt}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredNews.length === 0 && (
            <Card className="text-center py-12">
              <div className="text-slate-400">
                <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h3 className="text-lg font-medium text-slate-300 mb-2">No articles found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default News;