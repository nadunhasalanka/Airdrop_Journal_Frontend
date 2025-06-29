import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import Card from '@/components/Dashboard/Card';

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  logoUrl: string;
  category: 'Bitcoin' | 'Ethereum' | 'Layer1' | 'Layer2' | 'DeFi' | 'Meme' | 'AI' | 'Gaming';
  description: string;
}

interface MarketNews {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  url: string;
  impact: 'Bullish' | 'Bearish' | 'Neutral';
  coins: string[];
}

interface TrendingTopic {
  id: string;
  name: string;
  description: string;
  trendingScore: number;
  relatedCoins: string[];
  category: string;
}

const Market = () => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [marketNews, setMarketNews] = useState<MarketNews[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'marketCap' | 'price' | 'change24h' | 'volume24h'>('marketCap');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Mock cryptocurrency data
  const mockCoins: CoinData[] = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 67420.50,
      change24h: 2.45,
      marketCap: 1320000000000,
      volume24h: 28500000000,
      logoUrl: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      category: 'Bitcoin',
      description: 'The first and largest cryptocurrency by market capitalization'
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price: 3245.80,
      change24h: -1.23,
      marketCap: 390000000000,
      volume24h: 15200000000,
      logoUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      category: 'Ethereum',
      description: 'Smart contract platform and second-largest cryptocurrency'
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      price: 178.90,
      change24h: 5.67,
      marketCap: 79000000000,
      volume24h: 3400000000,
      logoUrl: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      category: 'Layer1',
      description: 'High-performance blockchain supporting decentralized applications'
    },
    {
      id: 'arbitrum',
      name: 'Arbitrum',
      symbol: 'ARB',
      price: 1.85,
      change24h: 8.34,
      marketCap: 6200000000,
      volume24h: 890000000,
      logoUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      category: 'Layer2',
      description: 'Ethereum Layer 2 scaling solution using optimistic rollups'
    },
    {
      id: 'polygon',
      name: 'Polygon',
      symbol: 'MATIC',
      price: 0.89,
      change24h: -3.45,
      marketCap: 8900000000,
      volume24h: 450000000,
      logoUrl: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      category: 'Layer2',
      description: 'Ethereum scaling and infrastructure development platform'
    },
    {
      id: 'uniswap',
      name: 'Uniswap',
      symbol: 'UNI',
      price: 12.45,
      change24h: 4.12,
      marketCap: 7400000000,
      volume24h: 320000000,
      logoUrl: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      category: 'DeFi',
      description: 'Leading decentralized exchange protocol on Ethereum'
    },
    {
      id: 'dogecoin',
      name: 'Dogecoin',
      symbol: 'DOGE',
      price: 0.165,
      change24h: 12.78,
      marketCap: 24000000000,
      volume24h: 2100000000,
      logoUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      category: 'Meme',
      description: 'Popular meme cryptocurrency with strong community support'
    },
    {
      id: 'chainlink',
      name: 'Chainlink',
      symbol: 'LINK',
      price: 18.90,
      change24h: -2.15,
      marketCap: 11000000000,
      volume24h: 680000000,
      logoUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      category: 'DeFi',
      description: 'Decentralized oracle network connecting blockchains to real-world data'
    }
  ];

  // Mock market news data
  const mockMarketNews: MarketNews[] = [
    {
      id: '1',
      title: 'Bitcoin ETF Sees Record $2.1B Inflows This Week',
      summary: 'Institutional adoption continues to drive Bitcoin demand as spot ETFs attract massive capital.',
      source: 'Bloomberg',
      publishedAt: '1 hour ago',
      url: 'https://bloomberg.com/bitcoin-etf-inflows',
      impact: 'Bullish',
      coins: ['BTC']
    },
    {
      id: '2',
      title: 'Ethereum Dencun Upgrade Successfully Reduces L2 Fees by 90%',
      summary: 'The latest Ethereum upgrade significantly improves Layer 2 scalability and reduces transaction costs.',
      source: 'CoinDesk',
      publishedAt: '3 hours ago',
      url: 'https://coindesk.com/ethereum-dencun-upgrade',
      impact: 'Bullish',
      coins: ['ETH', 'ARB', 'MATIC']
    },
    {
      id: '3',
      title: 'SEC Delays Decision on Solana ETF Applications',
      summary: 'Regulatory uncertainty continues as the SEC postpones ruling on multiple Solana ETF proposals.',
      source: 'The Block',
      publishedAt: '5 hours ago',
      url: 'https://theblock.co/solana-etf-delay',
      impact: 'Bearish',
      coins: ['SOL']
    },
    {
      id: '4',
      title: 'DeFi TVL Surpasses $100B as Yield Farming Returns',
      summary: 'Total value locked in DeFi protocols reaches new highs driven by improved yields and new protocols.',
      source: 'DeFi Pulse',
      publishedAt: '8 hours ago',
      url: 'https://defipulse.com/tvl-milestone',
      impact: 'Bullish',
      coins: ['UNI', 'LINK']
    }
  ];

  // Mock trending topics
  const mockTrendingTopics: TrendingTopic[] = [
    {
      id: '1',
      name: 'Layer 2 Scaling',
      description: 'Ethereum Layer 2 solutions gaining massive adoption',
      trendingScore: 95,
      relatedCoins: ['ARB', 'MATIC', 'OP'],
      category: 'Technology'
    },
    {
      id: '2',
      name: 'Bitcoin ETFs',
      description: 'Institutional adoption through spot Bitcoin ETFs',
      trendingScore: 88,
      relatedCoins: ['BTC'],
      category: 'Institutional'
    },
    {
      id: '3',
      name: 'AI Tokens',
      description: 'Artificial intelligence-focused cryptocurrencies trending',
      trendingScore: 76,
      relatedCoins: ['FET', 'AGIX', 'OCEAN'],
      category: 'AI'
    },
    {
      id: '4',
      name: 'Meme Coin Season',
      description: 'Community-driven tokens seeing renewed interest',
      trendingScore: 72,
      relatedCoins: ['DOGE', 'SHIB', 'PEPE'],
      category: 'Meme'
    }
  ];

  useEffect(() => {
    // Simulate API loading
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCoins(mockCoins);
      setMarketNews(mockMarketNews);
      setTrendingTopics(mockTrendingTopics);
      setLoading(false);
    };

    loadData();
  }, []);

  const categories = ['All', 'Bitcoin', 'Ethereum', 'Layer1', 'Layer2', 'DeFi', 'Meme', 'AI', 'Gaming'];

  const filteredCoins = coins
    .filter(coin => selectedCategory === 'All' || coin.category === selectedCategory)
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });

  const formatPrice = (price: number) => {
    if (price >= 1) {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    }
    return `$${marketCap.toLocaleString()}`;
  };

  const getChangeClass = (change: number) => {
    return change >= 0 ? 'text-green-400' : 'text-red-400';
  };

  const getImpactClass = (impact: string) => {
    switch (impact) {
      case 'Bullish': return 'bg-green-500/20 text-green-300 border border-green-500/30';
      case 'Bearish': return 'bg-red-500/20 text-red-300 border border-red-500/30';
      case 'Neutral': return 'bg-slate-500/20 text-slate-300 border border-slate-500/30';
      default: return 'bg-slate-700/20 text-slate-300 border border-slate-700/30';
    }
  };

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'Bitcoin': return 'bg-orange-500/20 text-orange-300 border border-orange-500/30';
      case 'Ethereum': return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
      case 'Layer1': return 'bg-purple-500/20 text-purple-300 border border-purple-500/30';
      case 'Layer2': return 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30';
      case 'DeFi': return 'bg-green-500/20 text-green-300 border border-green-500/30';
      case 'Meme': return 'bg-pink-500/20 text-pink-300 border border-pink-500/30';
      case 'AI': return 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30';
      case 'Gaming': return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
      default: return 'bg-slate-700/20 text-slate-300 border border-slate-700/30';
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Sidebar />
      <main className="ml-64 text-slate-300">
        <div className="relative p-8 max-w-7xl mx-auto">
          {/* Background Effects */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(99,102,241,0.06)_0%,rgba(139,92,246,0.03)_50%,transparent_70%)] -z-10 filter blur-[100px]"></div>

          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
            <div>
              <h1 className="text-3xl font-semibold text-slate-50 mb-2">Market & Analysis</h1>
              <p className="text-slate-400">Track Bitcoin, altcoins, and market trends</p>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2.5 rounded-lg transition-colors">
              Refresh Data
            </button>
          </header>

          {/* Trending Topics */}
          <Card className="mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-slate-100 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10H3c-.552 0-1 .449-1 1 0 .551.448 1 1 1h.025C3.289 19.557 7.879 24 13.5 24 19.299 24 24 19.299 24 13.5S19.299 2 13.5 2zM13.5 22C8.813 22 5 18.187 5 13.5S8.813 5 13.5 5 22 8.813 22 13.5 18.187 22 13.5 22z"/>
                </svg>
                Trending Topics
              </h2>
              
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="animate-pulse bg-slate-800/40 rounded-lg p-4">
                      <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-slate-800 rounded w-full mb-3"></div>
                      <div className="h-6 w-12 bg-slate-700 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {trendingTopics.map(topic => (
                    <div key={topic.id} className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50 hover:border-indigo-500/30 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium text-slate-100">{topic.name}</h3>
                        <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full border border-orange-500/30">
                          {topic.trendingScore}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 mb-3">{topic.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {topic.relatedCoins.slice(0, 3).map(coin => (
                          <span key={coin} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                            {coin}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Market Data Filters */}
          <Card className="mb-8">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2.5 text-slate-100 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-colors"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2.5 text-slate-100 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-colors"
                  >
                    <option value="marketCap">Market Cap</option>
                    <option value="price">Price</option>
                    <option value="change24h">24h Change</option>
                    <option value="volume24h">24h Volume</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Order</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as any)}
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2.5 text-slate-100 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-colors"
                  >
                    <option value="desc">Highest First</option>
                    <option value="asc">Lowest First</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          {/* Cryptocurrency Table */}
          <Card className="mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-slate-100 mb-6">Cryptocurrency Prices</h2>
              
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="animate-pulse flex items-center gap-4 p-4 bg-slate-800/40 rounded-lg">
                      <div className="w-10 h-10 bg-slate-700 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-slate-700 rounded w-1/4 mb-2"></div>
                        <div className="h-3 bg-slate-800 rounded w-1/6"></div>
                      </div>
                      <div className="text-right">
                        <div className="h-4 bg-slate-700 rounded w-20 mb-2"></div>
                        <div className="h-3 bg-slate-800 rounded w-16"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-slate-800/50">
                      <tr>
                        <th className="text-left p-4 font-medium text-slate-400">Coin</th>
                        <th className="text-right p-4 font-medium text-slate-400">Price</th>
                        <th className="text-right p-4 font-medium text-slate-400">24h Change</th>
                        <th className="text-right p-4 font-medium text-slate-400">Market Cap</th>
                        <th className="text-right p-4 font-medium text-slate-400">Volume</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCoins.map(coin => (
                        <tr key={coin.id} className="border-b border-slate-800/30 hover:bg-slate-800/20 transition-colors cursor-pointer">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img 
                                src={coin.logoUrl} 
                                alt={`${coin.name} logo`}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-slate-100">{coin.name}</span>
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryClass(coin.category)}`}>
                                    {coin.category}
                                  </span>
                                </div>
                                <span className="text-slate-400 text-sm">{coin.symbol}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-right font-medium text-slate-100">
                            {formatPrice(coin.price)}
                          </td>
                          <td className={`p-4 text-right font-medium ${getChangeClass(coin.change24h)}`}>
                            {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                          </td>
                          <td className="p-4 text-right text-slate-300">
                            {formatMarketCap(coin.marketCap)}
                          </td>
                          <td className="p-4 text-right text-slate-300">
                            {formatMarketCap(coin.volume24h)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Card>

          {/* Market News */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-slate-100 mb-6">Market News</h2>
              
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="animate-pulse border-b border-slate-800/30 pb-4">
                      <div className="h-5 bg-slate-700 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-slate-800 rounded w-full mb-2"></div>
                      <div className="flex gap-2">
                        <div className="h-6 w-16 bg-slate-700 rounded"></div>
                        <div className="h-6 w-20 bg-slate-700 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {marketNews.map(article => (
                    <div key={article.id} className="border-b border-slate-800/30 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start gap-3 mb-2">
                        <h3 className="font-medium text-slate-200 hover:text-indigo-400 transition-colors cursor-pointer">
                          <a href={article.url} target="_blank" rel="noopener noreferrer">
                            {article.title}
                          </a>
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${getImpactClass(article.impact)}`}>
                          {article.impact}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 mb-3">{article.summary}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>{article.source}</span>
                          <span>{article.publishedAt}</span>
                          <div className="flex gap-1">
                            {article.coins.map(coin => (
                              <span key={coin} className="bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                                {coin}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Market;