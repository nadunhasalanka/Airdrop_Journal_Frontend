import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar/Sidebar';
import Card from '@/components/Dashboard/Card';
import airdropService from '@/services/airdropService';
import userTagService from '@/services/userTagService';
import { useAuth } from '@/contexts/AuthContext';

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
}

const AddAirdrop = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
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
    tokenSymbol: '',
    startDate: '',
    socialMedia: {
      twitter: '',
      telegram: '',
      discord: '',
      medium: '',
      github: '',
      website: ''
    }
  });

  // Image upload handlers
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        setFormData(prev => ({ ...prev, logoUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setBannerPreview(result);
        setFormData(prev => ({ ...prev, bannerUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogoImage = () => {
    setLogoFile(null);
    setLogoPreview('');
    setFormData(prev => ({ ...prev, logoUrl: '' }));
  };

  const removeBannerImage = () => {
    setBannerFile(null);
    setBannerPreview('');
    setFormData(prev => ({ ...prev, bannerUrl: '' }));
  };

  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userTags, setUserTags] = useState<any[]>([]);
  const [loadingTags, setLoadingTags] = useState(true);
  const [tagSuggestions, setTagSuggestions] = useState<any[]>([]);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [bannerPreview, setBannerPreview] = useState('');

  // Available options
  const ecosystemOptions = ['Ethereum', 'Solana', 'Polygon', 'Arbitrum', 'Optimism', 'BSC', 'Avalanche', 'Multi-chain'];
  const typeOptions = ['Testnet', 'Mainnet', 'Telegram', 'Web3', 'Social'];
  const statusOptions = ['Farming', 'Claimable', 'Completed', 'Upcoming'];
  const priorityOptions = ['High', 'Medium', 'Low'];

  // Load user tags on component mount
  useEffect(() => {
    const loadUserTags = async () => {
      try {
        setLoadingTags(true);
        const result = await userTagService.getTags();
        if (result.success) {
          setUserTags(result.data);
        }
      } catch (error) {
        console.error('Error loading user tags:', error);
      } finally {
        setLoadingTags(false);
      }
    };

    if (user) {
      loadUserTags();
    }
  }, [user]);

  // Get tag suggestions when typing
  useEffect(() => {
    const getSuggestions = async () => {
      if (newTag.length > 0) {
        try {
          const result = await userTagService.getSuggestions(newTag, 8);
          if (result.success) {
            // Filter out already selected tags
            const filtered = result.data.filter(
              (tag: any) => !formData.tags.includes(tag.name)
            );
            setTagSuggestions(filtered);
          }
        } catch (error) {
          console.error('Error getting tag suggestions:', error);
        }
      } else {
        setTagSuggestions([]);
      }
    };

    const debounceTimer = setTimeout(getSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [newTag, formData.tags]);

  const availableTags = userTags.map(tag => tag.name);

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

  const addTag = async (tag: string) => {
    if (tag && !formData.tags.includes(tag.toLowerCase())) {
      // Check if tag exists in user's tags
      const existingTag = userTags.find(t => t.name === tag.toLowerCase());
      
      if (!existingTag) {
        // Create new tag if it doesn't exist
        try {
          const result = await userTagService.createTag({ name: tag });
          if (result.success) {
            setUserTags(prev => [...prev, result.data]);
          }
        } catch (error) {
          console.error('Error creating tag:', error);
          // Still add the tag to the form even if creation fails
        }
      }
      
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag.toLowerCase()]
      }));
    }
    setNewTag('');
    setTagSuggestions([]);
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

  const filteredSuggestions = tagSuggestions.length > 0 
    ? tagSuggestions 
    : availableTags
        .filter(tag => 
          tag.toLowerCase().includes(newTag.toLowerCase()) && 
          !formData.tags.includes(tag.toLowerCase())
        )
        .slice(0, 8)
        .map(name => ({ name, color: '#8B5CF6' }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      // Check if user is authenticated
      if (!user) {
        throw new Error('You must be logged in to create an airdrop');
      }

      // Create the airdrop using the service
      const result = await airdropService.createAirdrop(formData, user.id);

      if (result.success) {
        setSuccess(result.message || 'Airdrop created successfully!');
        
        // Wait a moment to show success message, then navigate
        setTimeout(() => {
          navigate('/airdrops');
        }, 1500);
      } else {
        throw new Error('Failed to create airdrop');
      }
    } catch (error: any) {
      console.error('Error creating airdrop:', error);
      setError(error.message || 'Failed to create airdrop. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name.trim() && formData.description.trim() && formData.officialLink.trim();

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
            {/* Error/Success Messages */}
            {error && (
              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <p className="text-green-400 text-sm">{success}</p>
              </div>
            )}

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

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Token Symbol
                    </label>
                    <input
                      type="text"
                      value={formData.tokenSymbol}
                      onChange={(e) => handleInputChange('tokenSymbol', e.target.value.toUpperCase())}
                      placeholder="e.g., ZKS, ARB"
                      className="form-input w-full"
                      maxLength={10}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="form-input w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">When did you start farming this airdrop?</p>
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
                      Logo Image
                    </label>
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="form-input w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-violet-600 file:text-white hover:file:bg-violet-700"
                      />
                      {logoPreview && (
                        <div className="relative inline-block">
                          <img 
                            src={logoPreview} 
                            alt="Logo preview" 
                            className="w-16 h-16 rounded-lg object-cover border border-gray-700"
                          />
                          <button
                            type="button"
                            onClick={removeLogoImage}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Banner Image
                    </label>
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBannerUpload}
                        className="form-input w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-violet-600 file:text-white hover:file:bg-violet-700"
                      />
                      {bannerPreview && (
                        <div className="relative inline-block">
                          <img 
                            src={bannerPreview} 
                            alt="Banner preview" 
                            className="w-32 h-16 rounded-lg object-cover border border-gray-700"
                          />
                          <button
                            type="button"
                            onClick={removeBannerImage}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
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
                      {filteredSuggestions.slice(0, 8).map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => addTag(suggestion.name)}
                          className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700/50 transition-colors flex items-center gap-2"
                        >
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: suggestion.color }}
                          ></span>
                          {suggestion.name}
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
                disabled={isSubmitting}
                className="btn-ghost text-sm lg:text-base disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base flex items-center gap-2"
              >
                {isSubmitting && (
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {isSubmitting ? 'Creating Airdrop...' : 'Add Airdrop'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddAirdrop;