import React, { useState, useEffect } from 'react';
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
  socialMedia: {
    twitter?: string;
    telegram?: string;
    discord?: string;
    medium?: string;
    github?: string;
    website?: string;
  };
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  url: string;
  importance: 'High' | 'Medium' | 'Low';
}

interface SocialPlatform {
  name: string;
  icon: string;
  url: string;
}

const AirdropDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [copiedLink, setCopiedLink] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isDailyTask, setIsDailyTask] = useState(false);
  const [dailyTaskNote, setDailyTaskNote] = useState('');
  const [socialMedia, setSocialMedia] = useState({
    twitter: '',
    telegram: '',
    discord: '',
    medium: '',
    github: '',
    website: ''
  });
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [savedSections, setSavedSections] = useState<{[key: string]: boolean}>({});
  const [newSocialPlatform, setNewSocialPlatform] = useState({ name: '', icon: 'website', url: '' });
  const [showAddSocial, setShowAddSocial] = useState(false);

  // Available tag suggestions
  const availableTags = [
    'Layer 2', 'Ethereum', 'ZK-Proofs', 'DeFi', 'Bridge', 'Testnet', 'Mainnet',
    'Telegram', 'Gaming', 'P2E', 'Social', 'TON', 'Cross-chain', 'NFT', 'Staking',
    'Yield', 'DAO', 'Governance', 'High Priority', 'Medium Priority', 'Low Priority',
    'Daily Task', 'Weekly Task', 'One-time', 'Recurring'
  ];

  // Available social platform icons
  const socialPlatformOptions = [
    { value: 'twitter', label: 'Twitter' },
    { value: 'telegram', label: 'Telegram' },
    { value: 'discord', label: 'Discord' },
    { value: 'medium', label: 'Medium' },
    { value: 'github', label: 'GitHub' },
    { value: 'website', label: 'Website' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'reddit', label: 'Reddit' },
    { value: 'facebook', label: 'Facebook' }
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
    isDailyTask: false,
    socialMedia: {
      twitter: 'https://twitter.com/zksync',
      telegram: 'https://t.me/zksync',
      discord: 'https://discord.gg/zksync',
      medium: 'https://medium.com/@zksync',
      github: 'https://github.com/matter-labs/zksync',
      website: 'https://zksync.io'
    }
  };

  // Mock news data - in real app, this would be fetched from news APIs
  const mockNews: NewsItem[] = [
    {
      id: '1',
      title: 'ZkSync Era Mainnet Alpha Launch Announced',
      summary: 'Matter Labs announces the alpha launch of ZkSync Era mainnet with full EVM compatibility and significant gas savings.',
      source: 'CoinDesk',
      publishedAt: '2 hours ago',
      url: 'https://coindesk.com/zksync-era-mainnet-alpha',
      importance: 'High'
    },
    {
      id: '2',
      title: 'Major DeFi Protocols Integrating with ZkSync Era',
      summary: 'Leading DeFi protocols including Uniswap, Aave, and Curve announce plans to deploy on ZkSync Era.',
      source: 'The Defiant',
      publishedAt: '6 hours ago',
      url: 'https://thedefiant.io/zksync-defi-integrations',
      importance: 'High'
    },
    {
      id: '3',
      title: 'ZkSync Token Economics and Governance Model Revealed',
      summary: 'Matter Labs releases detailed tokenomics for the upcoming ZK token and outlines the governance structure.',
      source: 'Bankless',
      publishedAt: '1 day ago',
      url: 'https://bankless.com/zksync-tokenomics',
      importance: 'Medium'
    },
    {
      id: '4',
      title: 'ZkSync Era Achieves 10,000 TPS in Latest Tests',
      summary: 'Recent stress tests show ZkSync Era can handle over 10,000 transactions per second with minimal fees.',
      source: 'The Block',
      publishedAt: '2 days ago',
      url: 'https://theblock.co/zksync-era-performance',
      importance: 'Medium'
    },
    {
      id: '5',
      title: 'Security Audit Results for ZkSync Era Released',
      summary: 'Multiple security firms complete comprehensive audits of ZkSync Era smart contracts with positive results.',
      source: 'Decrypt',
      publishedAt: '3 days ago',
      url: 'https://decrypt.co/zksync-security-audit',
      importance: 'Low'
    }
  ];

  // Initialize state with airdrop data
  useEffect(() => {
    setNotes(airdropDetails.notes);
    setTags(airdropDetails.tags);
    setIsDailyTask(airdropDetails.isDailyTask);
    setDailyTaskNote(airdropDetails.dailyTaskNote || '');
    setSocialMedia(airdropDetails.socialMedia);
  }, []);

  // Simulate fetching news
  useEffect(() => {
    const fetchNews = async () => {
      setLoadingNews(true);
      // Simulate API delay
      setTimeout(() => {
        setNews(mockNews);
        setLoadingNews(false);
      }, 1000);
    };

    fetchNews();
  }, []);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLink(type);
      setTimeout(() => setCopiedLink(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const saveSection = (sectionName: string) => {
    // Here you would typically save to API/database
    setSavedSections(prev => ({ ...prev, [sectionName]: true }));
    setTimeout(() => {
      setSavedSections(prev => ({ ...prev, [sectionName]: false }));
    }, 2000);
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

  const getImportanceClass = (importance: string) => {
    switch (importance) {
      case 'High': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Low': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-slate-700/20 text-slate-300 border-slate-700/30';
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

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.46 6c-.67.3-1.39.5-2.14.58.77-.46 1.36-1.2 1.64-2.06-.72.43-1.51.74-2.35.9-.68-.72-1.64-1.17-2.7-1.17-2.05 0-3.71 1.66-3.71 3.71 0 .29.03.58.09.85-3.08-.16-5.81-1.63-7.64-3.87-.32.55-.5 1.18-.5 1.86 0 1.28.65 2.42 1.65 3.08-.6-.02-1.17-.18-1.66-.46v.05c0 1.79 1.27 3.28 2.97 3.62-.31.08-.64.13-.98.13-.24 0-.47-.02-.7-.07.47 1.47 1.83 2.54 3.45 2.57-1.27.99-2.86 1.58-4.6 1.58-.3 0-.59-.02-.88-.05 1.64 1.05 3.58 1.66 5.66 1.66 6.79 0 10.5-5.62 10.5-10.5v-.47c.72-.52 1.34-1.17 1.84-1.92z"/>
          </svg>
        );
      case 'telegram':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-1.61 7.59c-.12.54-.44.67-.89.42l-2.46-1.81-1.19 1.14c-.13.13-.24.24-.49.24l.17-2.43 4.47-4.03c.19-.17-.04-.27-.3-.1L9.85 13.72l-2.42-.76c-.53-.16-.54-.53.11-.78l9.46-3.64c.44-.16.83.1.68.78z"/>
          </svg>
        );
      case 'discord':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
        );
      case 'medium':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
          </svg>
        );
      case 'github':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      case 'reddit':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
          </svg>
        );
      case 'facebook':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      case 'website':
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
          </svg>
        );
    }
  };

  const addSocialPlatform = () => {
    if (newSocialPlatform.name && newSocialPlatform.url) {
      setSocialMedia(prev => ({
        ...prev,
        [newSocialPlatform.name.toLowerCase()]: newSocialPlatform.url
      }));
      setNewSocialPlatform({ name: '', icon: 'website', url: '' });
      setShowAddSocial(false);
    }
  };

  const removeSocialPlatform = (platform: string) => {
    setSocialMedia(prev => {
      const updated = { ...prev };
      delete updated[platform as keyof typeof updated];
      return updated;
    });
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

              {/* Social Media Section */}
              <Card>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-slate-100">Social Media & Links</h3>
                    <button
                      onClick={() => setShowAddSocial(!showAddSocial)}
                      className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-lg transition"
                    >
                      Add Platform
                    </button>
                  </div>
                  
                  {/* Add New Social Platform */}
                  {showAddSocial && (
                    <div className="mb-6 p-4 bg-slate-800/40 rounded-lg border border-slate-700">
                      <h4 className="text-sm font-medium text-slate-300 mb-3">Add New Social Platform</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          value={newSocialPlatform.name}
                          onChange={(e) => setNewSocialPlatform(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Platform name"
                          className="bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <select
                          value={newSocialPlatform.icon}
                          onChange={(e) => setNewSocialPlatform(prev => ({ ...prev, icon: e.target.value }))}
                          className="bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          {socialPlatformOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                        <input
                          type="url"
                          value={newSocialPlatform.url}
                          onChange={(e) => setNewSocialPlatform(prev => ({ ...prev, url: e.target.value }))}
                          placeholder="URL"
                          className="bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={addSocialPlatform}
                          className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm transition"
                        >
                          Add Platform
                        </button>
                        <button
                          onClick={() => setShowAddSocial(false)}
                          className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2 rounded-lg text-sm transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Social Media List */}
                  <div className="space-y-3">
                    {Object.entries(socialMedia).filter(([_, url]) => url).map(([platform, url]) => (
                      <div key={platform} className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg border border-slate-700">
                        <div className="flex items-center gap-3">
                          <div className="text-slate-400">
                            {getSocialIcon(platform)}
                          </div>
                          <span className="text-slate-200 font-medium capitalize">
                            {platform === 'website' ? 'Official Website' : platform}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-lg text-sm transition flex items-center gap-1"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Visit
                          </a>
                          <button
                            onClick={() => copyToClipboard(url, platform)}
                            className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1 rounded-lg text-sm transition flex items-center gap-1"
                          >
                            {copiedLink === platform ? (
                              <>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Copied
                              </>
                            ) : (
                              <>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => removeSocialPlatform(platform)}
                            className="bg-red-600/20 hover:bg-red-600/30 text-red-400 px-2 py-1 rounded-lg text-sm transition"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {Object.values(socialMedia).filter(url => url).length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      <p>No social media links added yet</p>
                    </div>
                  )}

                  {/* Save Button for Social Media */}
                  <div className="mt-6 pt-4 border-t border-slate-800">
                    <button 
                      onClick={() => saveSection('social')}
                      className="w-full bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg font-medium transition"
                    >
                      {savedSections.social ? 'Saved!' : 'Save Social Media'}
                    </button>
                  </div>
                </div>
              </Card>

              {/* Notes Section */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-100 mb-4">Notes</h3>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add your notes about this airdrop..."
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px] resize-vertical"
                  />
                  
                  {/* Save Button for Notes */}
                  <div className="mt-4">
                    <button 
                      onClick={() => saveSection('notes')}
                      className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg font-medium transition"
                    >
                      {savedSections.notes ? 'Saved!' : 'Save Notes'}
                    </button>
                  </div>
                </div>
              </Card>

              {/* News Section */}
              <Card>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-slate-100">Latest News & Updates</h3>
                    <button 
                      onClick={() => window.location.reload()}
                      className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-lg transition"
                    >
                      Refresh News
                    </button>
                  </div>
                  
                  {loadingNews ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-slate-800 rounded w-full mb-1"></div>
                          <div className="h-3 bg-slate-800 rounded w-2/3"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {news.map(item => (
                        <div key={item.id} className="border-b border-slate-800 pb-4 last:border-b-0 last:pb-0">
                          <div className="flex justify-between items-start gap-3 mb-2">
                            <h4 className="font-semibold text-slate-200 hover:text-indigo-400 transition cursor-pointer">
                              <a href={item.url} target="_blank" rel="noopener noreferrer">
                                {item.title}
                              </a>
                            </h4>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full border flex-shrink-0 ${getImportanceClass(item.importance)}`}>
                              {item.importance}
                            </span>
                          </div>
                          <p className="text-sm text-slate-400 mb-2 line-clamp-2">{item.summary}</p>
                          <div className="flex justify-between items-center text-xs text-slate-500">
                            <span>{item.source}</span>
                            <span>{item.publishedAt}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {!loadingNews && news.length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      <p>No recent news found for this airdrop</p>
                    </div>
                  )}
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
                    {tags.map(tag => (
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

                  {/* Save Button for Tags */}
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <button 
                      onClick={() => saveSection('tags')}
                      className="w-full bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg font-medium transition"
                    >
                      {savedSections.tags ? 'Saved!' : 'Save Tags'}
                    </button>
                  </div>
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

                  {/* Save Button for Daily Task */}
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <button 
                      onClick={() => saveSection('dailyTask')}
                      className="w-full bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg font-medium transition"
                    >
                      {savedSections.dailyTask ? 'Saved!' : 'Save Daily Task'}
                    </button>
                  </div>
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