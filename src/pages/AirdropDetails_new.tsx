import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Sidebar from '@/components/Sidebar/Sidebar';
import Card from '@/components/Dashboard/Card';
import airdropService from '@/services/airdropService';
import userTagService from '@/services/userTagService';
import { useAuth } from '@/contexts/AuthContext';

interface Airdrop {
  _id: string;
  name: string;
  description: string;
  ecosystem: string;
  type: string;
  status: string;
  deadline: string;
  estimatedValue: string;
  priority: string;
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

const AirdropDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Main state
  const [airdrop, setAirdrop] = useState<Airdrop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string>('');
  
  // Edit form state
  const [editForm, setEditForm] = useState<Airdrop | null>(null);
  const [userTags, setUserTags] = useState<UserTag[]>([]);
  const [newTag, setNewTag] = useState('');
  
  // Available options
  const ecosystemOptions = ['Ethereum', 'Solana', 'Polygon', 'Arbitrum', 'Optimism', 'BSC', 'Avalanche', 'Multi-chain'];
  const typeOptions = ['Testnet', 'Mainnet', 'Telegram', 'Web3', 'Social'];
  const statusOptions = ['Farming', 'Claimable', 'Completed', 'Upcoming'];
  const priorityOptions = ['High', 'Medium', 'Low'];

  // Load airdrop details and user tags
  useEffect(() => {
    const loadAirdropDetails = async () => {
      if (!id || !user) return;
      
      try {
        setLoading(true);
        const [airdropResponse, tagsResponse] = await Promise.all([
          airdropService.getAirdrop(id),
          userTagService.getTags()
        ]);
        
        if (airdropResponse.success) {
          setAirdrop(airdropResponse.data);
          setEditForm(airdropResponse.data);
        } else {
          setError('Airdrop not found');
        }
        
        if (tagsResponse.success) {
          setUserTags(tagsResponse.data);
        }
      } catch (error: any) {
        console.error('Error loading airdrop:', error);
        setError(error.message || 'Failed to load airdrop details');
      } finally {
        setLoading(false);
      }
    };

    loadAirdropDetails();
  }, [id, user]);

  // Copy to clipboard
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLink(type);
      setTimeout(() => setCopiedLink(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Handle edit form changes
  const handleInputChange = (field: string, value: any) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value });
    }
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    if (editForm) {
      setEditForm({
        ...editForm,
        socialMedia: { ...editForm.socialMedia, [platform]: value }
      });
    }
  };

  // Add tag to edit form
  const addTag = async (tagName: string) => {
    if (!editForm || !tagName.trim()) return;
    
    const lowerCaseTag = tagName.toLowerCase();
    if (editForm.tags.includes(lowerCaseTag)) return;

    // Check if tag exists in user's tags, if not create it
    const existingTag = userTags.find(t => t.name === lowerCaseTag);
    if (!existingTag) {
      try {
        const result = await userTagService.createTag({ name: tagName });
        if (result.success) {
          setUserTags(prev => [...prev, result.data]);
        }
      } catch (error) {
        console.error('Error creating tag:', error);
      }
    }
    
    setEditForm({
      ...editForm,
      tags: [...editForm.tags, lowerCaseTag]
    });
    setNewTag('');
  };

  // Remove tag from edit form
  const removeTag = (tagToRemove: string) => {
    if (editForm) {
      setEditForm({
        ...editForm,
        tags: editForm.tags.filter(tag => tag !== tagToRemove)
      });
    }
  };

  // Save changes
  const saveChanges = async () => {
    if (!editForm || !id) return;
    
    try {
      setSaving(true);
      const result = await airdropService.updateAirdrop(id, editForm);
      
      if (result.success) {
        setAirdrop(result.data);
        setIsEditing(false);
        // Show success message or toast here
      }
    } catch (error: any) {
      console.error('Error saving airdrop:', error);
      setError(error.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditForm(airdrop);
    setIsEditing(false);
  };

  // Delete airdrop
  const deleteAirdrop = async () => {
    if (!id || !confirm('Are you sure you want to delete this airdrop?')) return;
    
    try {
      const result = await airdropService.deleteAirdrop(id);
      if (result.success) {
        navigate('/airdrops');
      }
    } catch (error: any) {
      console.error('Error deleting airdrop:', error);
      setError(error.message || 'Failed to delete airdrop');
    }
  };

  // Status styling
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

  if (loading) {
    return (
      <div className="bg-gray-950 min-h-screen">
        <Sidebar />
        <main className="lg:ml-64 text-gray-200">
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
            <span className="ml-3 text-gray-400">Loading airdrop details...</span>
          </div>
        </main>
      </div>
    );
  }

  if (error || !airdrop) {
    return (
      <div className="bg-gray-950 min-h-screen">
        <Sidebar />
        <main className="lg:ml-64 text-gray-200">
          <div className="p-8 text-center">
            <h1 className="text-2xl font-semibold text-red-400 mb-4">Error</h1>
            <p className="text-gray-400 mb-6">{error || 'Airdrop not found'}</p>
            <Link to="/airdrops" className="btn-primary">
              Back to All Airdrops
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const displayData = isEditing ? editForm : airdrop;
  if (!displayData) return null;

  return (
    <div className="bg-gray-950 min-h-screen">
      <Sidebar />
      <main className="lg:ml-64 text-gray-200">
        <div className="p-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <Link to="/airdrops" className="text-violet-400 hover:text-violet-300 transition-colors">
                ← Back to All Airdrops
              </Link>
            </div>
            
            <div className="flex space-x-3">
              {!isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-secondary"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={deleteAirdrop}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    🗑️ Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={saveChanges}
                    disabled={isSaving}
                    className="btn-primary disabled:opacity-50"
                  >
                    {isSaving ? '💾 Saving...' : '💾 Save Changes'}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="btn-secondary"
                  >
                    ❌ Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Details Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header Card */}
              <Card className="p-6">
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                  {/* Logo */}
                  <div className="w-24 h-24 flex-shrink-0">
                    {isEditing ? (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Logo URL</label>
                        <input
                          type="url"
                          value={displayData.logoUrl}
                          onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                          className="input-primary text-xs"
                          placeholder="Logo URL"
                        />
                      </div>
                    ) : (
                      <img
                        src={displayData.logoUrl}
                        alt={displayData.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div>

                  {/* Basic Info */}
                  <div className="flex-1">
                    <div className="space-y-3">
                      {/* Name */}
                      {isEditing ? (
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                          <input
                            type="text"
                            value={displayData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="input-primary text-xl font-bold"
                          />
                        </div>
                      ) : (
                        <h1 className="text-3xl font-bold text-white">{displayData.name}</h1>
                      )}

                      {/* Status and Priority */}
                      <div className="flex flex-wrap items-center gap-3">
                        {isEditing ? (
                          <div className="flex space-x-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                              <select
                                value={displayData.status}
                                onChange={(e) => handleInputChange('status', e.target.value)}
                                className="input-primary"
                              >
                                {statusOptions.map(option => (
                                  <option key={option} value={option}>{option}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
                              <select
                                value={displayData.priority}
                                onChange={(e) => handleInputChange('priority', e.target.value)}
                                className="input-primary"
                              >
                                {priorityOptions.map(option => (
                                  <option key={option} value={option}>{option}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        ) : (
                          <>
                            <span className={`status-badge ${getStatusClass(displayData.status)}`}>
                              {displayData.status}
                            </span>
                            <span className={`priority-badge ${getPriorityClass(displayData.priority)}`}>
                              {displayData.priority} Priority
                            </span>
                          </>
                        )}
                      </div>

                      {/* Description */}
                      {isEditing ? (
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                          <textarea
                            value={displayData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="input-primary h-20"
                            rows={3}
                          />
                        </div>
                      ) : (
                        <p className="text-gray-300 leading-relaxed">{displayData.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Banner */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Banner</h3>
                {isEditing ? (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-300">Banner URL</label>
                    <input
                      type="url"
                      value={displayData.bannerUrl}
                      onChange={(e) => handleInputChange('bannerUrl', e.target.value)}
                      className="input-primary"
                      placeholder="Banner URL"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 rounded-lg overflow-hidden">
                    <img
                      src={displayData.bannerUrl}
                      alt={`${displayData.name} banner`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </Card>

              {/* Project Details */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Project Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Ecosystem */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Ecosystem</label>
                    {isEditing ? (
                      <select
                        value={displayData.ecosystem}
                        onChange={(e) => handleInputChange('ecosystem', e.target.value)}
                        className="input-primary"
                      >
                        {ecosystemOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-gray-200">{displayData.ecosystem}</p>
                    )}
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                    {isEditing ? (
                      <select
                        value={displayData.type}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="input-primary"
                      >
                        {typeOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-gray-200">{displayData.type}</p>
                    )}
                  </div>

                  {/* Token Symbol */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Token Symbol</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={displayData.tokenSymbol}
                        onChange={(e) => handleInputChange('tokenSymbol', e.target.value)}
                        className="input-primary"
                        placeholder="e.g., ZK"
                      />
                    ) : (
                      <p className="text-gray-200">{displayData.tokenSymbol || 'TBA'}</p>
                    )}
                  </div>

                  {/* Estimated Value */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Estimated Value</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={displayData.estimatedValue}
                        onChange={(e) => handleInputChange('estimatedValue', e.target.value)}
                        className="input-primary"
                        placeholder="e.g., $500-2000"
                      />
                    ) : (
                      <p className="text-gray-200">{displayData.estimatedValue}</p>
                    )}
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={displayData.startDate ? displayData.startDate.split('T')[0] : ''}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                        className="input-primary"
                      />
                    ) : (
                      <p className="text-gray-200">
                        {displayData.startDate ? new Date(displayData.startDate).toLocaleDateString() : 'TBA'}
                      </p>
                    )}
                  </div>

                  {/* Deadline */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Deadline</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={displayData.deadline}
                        onChange={(e) => handleInputChange('deadline', e.target.value)}
                        className="input-primary"
                        placeholder="e.g., TBA or specific date"
                      />
                    ) : (
                      <p className="text-gray-200">{displayData.deadline}</p>
                    )}
                  </div>
                </div>
              </Card>

              {/* Links */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Important Links</h3>
                <div className="space-y-4">
                  {/* Official Link */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Official Link</label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={displayData.officialLink}
                        onChange={(e) => handleInputChange('officialLink', e.target.value)}
                        className="input-primary"
                        placeholder="https://..."
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <a
                          href={displayData.officialLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-400 hover:text-violet-300 transition-colors"
                        >
                          {displayData.officialLink}
                        </a>
                        <button
                          onClick={() => copyToClipboard(displayData.officialLink, 'official')}
                          className="copy-btn"
                        >
                          {copiedLink === 'official' ? '✓' : '📋'}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Referral Link */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Referral Link</label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={displayData.referralLink || ''}
                        onChange={(e) => handleInputChange('referralLink', e.target.value)}
                        className="input-primary"
                        placeholder="https://... (optional)"
                      />
                    ) : displayData.referralLink ? (
                      <div className="flex items-center space-x-2">
                        <a
                          href={displayData.referralLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-400 hover:text-violet-300 transition-colors"
                        >
                          {displayData.referralLink}
                        </a>
                        <button
                          onClick={() => copyToClipboard(displayData.referralLink!, 'referral')}
                          className="copy-btn"
                        >
                          {copiedLink === 'referral' ? '✓' : '📋'}
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-400">No referral link</p>
                    )}
                  </div>
                </div>
              </Card>

              {/* Social Media */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Social Media</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(displayData.socialMedia).map(([platform, url]) => (
                    <div key={platform}>
                      <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">{platform}</label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => handleSocialMediaChange(platform, e.target.value)}
                          className="input-primary"
                          placeholder={`${platform} URL (optional)`}
                        />
                      ) : url ? (
                        <div className="flex items-center space-x-2">
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-violet-400 hover:text-violet-300 transition-colors"
                          >
                            {url}
                          </a>
                          <button
                            onClick={() => copyToClipboard(url, platform)}
                            className="copy-btn"
                          >
                            {copiedLink === platform ? '✓' : '📋'}
                          </button>
                        </div>
                      ) : (
                        <p className="text-gray-400">Not provided</p>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Tags */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {displayData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="tag-badge group relative"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-2 text-red-400 hover:text-red-300"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTag(newTag)}
                        className="input-primary flex-1"
                        placeholder="Add a new tag..."
                      />
                      <button
                        onClick={() => addTag(newTag)}
                        className="btn-primary"
                      >
                        Add
                      </button>
                    </div>
                    
                    {/* Suggested tags */}
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">Your existing tags:</p>
                      <div className="flex flex-wrap gap-2">
                        {userTags.filter(tag => !displayData.tags.includes(tag.name)).map((tag) => (
                          <button
                            key={tag._id}
                            onClick={() => addTag(tag.name)}
                            className="text-sm px-2 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
                          >
                            + {tag.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {displayData.tags.map((tag, index) => (
                      <span key={index} className="tag-badge">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Card>

              {/* Notes */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Notes</h3>
                {isEditing ? (
                  <textarea
                    value={displayData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="input-primary h-32"
                    placeholder="Add your notes about this airdrop..."
                    rows={6}
                  />
                ) : (
                  <p className="text-gray-300 whitespace-pre-wrap">
                    {displayData.notes || 'No notes added yet.'}
                  </p>
                )}
              </Card>

              {/* Daily Task */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Daily Task</h3>
                  {isEditing && (
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={displayData.isDailyTask}
                        onChange={(e) => handleInputChange('isDailyTask', e.target.checked)}
                        className="form-checkbox"
                      />
                      <span className="text-sm text-gray-300">Is daily task</span>
                    </label>
                  )}
                </div>
                
                {displayData.isDailyTask ? (
                  isEditing ? (
                    <textarea
                      value={displayData.dailyTaskNote}
                      onChange={(e) => handleInputChange('dailyTaskNote', e.target.value)}
                      className="input-primary h-20"
                      placeholder="Describe the daily task requirements..."
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-300 whitespace-pre-wrap">
                      {displayData.dailyTaskNote || 'No daily task details provided.'}
                    </p>
                  )
                ) : (
                  <p className="text-gray-400">This is not a daily task.</p>
                )}
              </Card>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`${getStatusClass(displayData.status)} font-medium`}>
                      {displayData.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Priority:</span>
                    <span className={`${getPriorityClass(displayData.priority)} font-medium`}>
                      {displayData.priority}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-gray-200">{displayData.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Ecosystem:</span>
                    <span className="text-gray-200">{displayData.ecosystem}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Est. Value:</span>
                    <span className="text-gray-200">{displayData.estimatedValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Deadline:</span>
                    <span className="text-gray-200">{displayData.deadline}</span>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a
                    href={displayData.officialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full text-center"
                  >
                    🌐 Visit Official Site
                  </a>
                  {displayData.referralLink && (
                    <a
                      href={displayData.referralLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary w-full text-center"
                    >
                      🔗 Use Referral Link
                    </a>
                  )}
                  <button
                    onClick={() => copyToClipboard(displayData.officialLink, 'quick')}
                    className="btn-secondary w-full"
                  >
                    {copiedLink === 'quick' ? '✓ Copied!' : '📋 Copy Official Link'}
                  </button>
                </div>
              </Card>

              {/* Timestamps */}
              {displayData.createdAt && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Timeline</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-400">Created:</span>
                      <p className="text-gray-200">
                        {new Date(displayData.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {displayData.updatedAt && (
                      <div>
                        <span className="text-gray-400">Last Updated:</span>
                        <p className="text-gray-200">
                          {new Date(displayData.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AirdropDetails;
