import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar/Sidebar';
import Card from '@/components/Dashboard/Card';

interface AirdropFormData {
  name: string;
  description: string;
  ecosystem: string;
  type: string;
  status: string;
  deadline: string;
  estimatedValue: string;
  priority: string;
  officialLink: string;
  referralLink: string;
  logoUrl: string;
  bannerUrl: string;
  tags: string[];
  notes: string;
  isDailyTask: boolean;
  dailyTaskNote: string;
  socialMedia: {
    twitter: string;
    telegram: string;
    discord: string;
    medium: string;
    github: string;
    website: string;
  };
}

const AddAirdrop = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AirdropFormData>({
    name: '',
    description: '',
    ecosystem: 'Ethereum',
    type: 'Mainnet',
    status: 'Farming',
    deadline: '',
    estimatedValue: '',
    priority: 'Medium',
    officialLink: '',
    referralLink: '',
    logoUrl: '',
    bannerUrl: '',
    tags: [],
    notes: '',
    isDailyTask: false,
    dailyTaskNote: '',
    socialMedia: {
      twitter: '',
      telegram: '',
      discord: '',
      medium: '',
      github: '',
      website: ''
    }
  });

  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available options
  const ecosystemOptions = ['Ethereum', 'Solana', 'Polygon', 'Arbitrum', 'Optimism', 'BSC', 'Avalanche', 'Multi-chain'];
  const typeOptions = ['Testnet', 'Mainnet', 'Telegram', 'Web3', 'Social'];
  const statusOptions = ['Farming', 'Claimable', 'Completed', 'Upcoming'];
  const priorityOptions = ['High', 'Medium', 'Low'];

  const availableTags = [
    'Layer 2', 'Ethereum', 'ZK-Proofs', 'DeFi', 'Bridge', 'Testnet', 'Mainnet',
    'Telegram', 'Gaming', 'P2E', 'Social', 'TON', 'Cross-chain', 'NFT', 'Staking',
    'Yield', 'DAO', 'Governance', 'High Priority', 'Medium Priority', 'Low Priority',
    'Daily Task', 'Weekly Task', 'One-time', 'Recurring'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
    setNewTag('');
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(newTag);
    }
  };

  const filteredSuggestions = availableTags.filter(tag => 
    tag.toLowerCase().includes(newTag.toLowerCase()) && !formData.tags.includes(tag)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, you would send the data to your backend
    console.log('Airdrop data:', formData);

    setIsSubmitting(false);
    navigate('/airdrops');
  };

  const isFormValid = formData.name && formData.description && formData.officialLink;

  return (
    <div className="bg-gray-950 min-h-screen">
      <Sidebar />
      <main className="lg:ml-64 text-gray-200">
        <div className="relative p-4 lg:p-8 max-w-4xl mx-auto">
          {/* Background Effects */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(124,58,237,0.04)_0%,rgba(168,85,247,0.02)_50%,transparent_70%)] -z-10 filter blur-[100px]"></div>

          {/* Header */}
          <header className="mb-8 lg:mb-12 pt-16 lg:pt-0">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => navigate('/airdrops')}
                className="text-violet-400 hover:text-violet-300 text-sm transition-colors"
              >
                ← Back to All Airdrops
              </button>
            </div>
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-100 mb-2">Add New Airdrop</h1>
            <p className="text-gray-400">Fill in the details to track a new airdrop opportunity</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
            {/* Basic Information */}
            <Card>
              <div className="p-4 lg:p-6">
                <h2 className="text-lg font-semibold text-gray-100 mb-4 lg:mb-6">Basic Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="e.g., ZkSync Era"
                      className="form-input w-full"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Brief description of the project and airdrop..."
                      className="form-input w-full min-h-[100px] resize-vertical"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Ecosystem
                    </label>
                    <select
                      value={formData.ecosystem}
                      onChange={(e) => handleInputChange('ecosystem', e.target.value)}
                      className="form-input w-full"
                    >
                      {ecosystemOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="form-input w-full"
                    >
                      {typeOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="form-input w-full"
                    >
                      {statusOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      className="form-input w-full"
                    >
                      {priorityOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Deadline
                    </label>
                    <input
                      type="text"
                      value={formData.deadline}
                      onChange={(e) => handleInputChange('deadline', e.target.value)}
                      placeholder="e.g., Q2 2024, TBA, 30 days"
                      className="form-input w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Estimated Value
                    </label>
                    <input
                      type="text"
                      value={formData.estimatedValue}
                      onChange={(e) => handleInputChange('estimatedValue', e.target.value)}
                      placeholder="e.g., $500-2000"
                      className="form-input w-full"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Links */}
            <Card>
              <div className="p-4 lg:p-6">
                <h2 className="text-lg font-semibold text-gray-100 mb-4 lg:mb-6">Links</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Official Website *
                    </label>
                    <input
                      type="url"
                      value={formData.officialLink}
                      onChange={(e) => handleInputChange('officialLink', e.target.value)}
                      placeholder="https://example.com"
                      className="form-input w-full"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Referral Link
                    </label>
                    <input
                      type="url"
                      value={formData.referralLink}
                      onChange={(e) => handleInputChange('referralLink', e.target.value)}
                      placeholder="https://example.com?ref=yourcode"
                      className="form-input w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Logo URL
                    </label>
                    <input
                      type="url"
                      value={formData.logoUrl}
                      onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                      placeholder="https://example.com/logo.png"
                      className="form-input w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Banner URL
                    </label>
                    <input
                      type="url"
                      value={formData.bannerUrl}
                      onChange={(e) => handleInputChange('bannerUrl', e.target.value)}
                      placeholder="https://example.com/banner.png"
                      className="form-input w-full"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Social Media */}
            <Card>
              <div className="p-4 lg:p-6">
                <h2 className="text-lg font-semibold text-gray-100 mb-4 lg:mb-6">Social Media</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  {Object.entries(formData.socialMedia).map(([platform, url]) => (
                    <div key={platform}>
                      <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                        {platform}
                      </label>
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => handleSocialMediaChange(platform, e.target.value)}
                        placeholder={`https://${platform}.com/project`}
                        className="form-input w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Tags */}
            <Card>
              <div className="p-4 lg:p-6">
                <h2 className="text-lg font-semibold text-gray-100 mb-4 lg:mb-6">Tags</h2>
                
                {/* Current Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.tags.map(tag => (
                    <span key={tag} className="tag-active px-3 py-1.5 text-sm rounded-lg flex items-center gap-2">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-current hover:text-red-400 transition-colors"
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
                    className="form-input w-full"
                  />
                  
                  {/* Tag Suggestions */}
                  {newTag && filteredSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700/50 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
                      {filteredSuggestions.slice(0, 8).map(suggestion => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => addTag(suggestion)}
                          className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700/50 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => addTag(newTag)}
                  disabled={!newTag}
                  className="mt-3 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Add Tag
                </button>
              </div>
            </Card>

            {/* Daily Task */}
            <Card>
              <div className="p-4 lg:p-6">
                <h2 className="text-lg font-semibold text-gray-100 mb-4 lg:mb-6">Daily Task Configuration</h2>
                
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    id="isDailyTask"
                    checked={formData.isDailyTask}
                    onChange={(e) => setFormData(prev => ({ ...prev, isDailyTask: e.target.checked }))}
                    className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-violet-500 focus:ring-violet-600"
                  />
                  <label htmlFor="isDailyTask" className="text-gray-300 font-medium">
                    Mark as Daily Task
                  </label>
                </div>

                {formData.isDailyTask && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Daily Task Description
                    </label>
                    <textarea
                      value={formData.dailyTaskNote}
                      onChange={(e) => setFormData(prev => ({ ...prev, dailyTaskNote: e.target.value }))}
                      placeholder="What needs to be done daily for this airdrop?"
                      className="form-input w-full min-h-[80px] resize-vertical"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      This will appear in your daily tasks section
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Notes */}
            <Card>
              <div className="p-4 lg:p-6">
                <h2 className="text-lg font-semibold text-gray-100 mb-4 lg:mb-6">Notes</h2>
                
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Add any additional notes about this airdrop..."
                  className="form-input w-full min-h-[120px] resize-vertical"
                />
              </div>
            </Card>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={() => navigate('/airdrops')}
                className="btn-ghost text-sm lg:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base"
              >
                {isSubmitting ? 'Adding Airdrop...' : 'Add Airdrop'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddAirdrop;