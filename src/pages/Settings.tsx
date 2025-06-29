import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import Card from '@/components/Dashboard/Card';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  bio: string;
  location: string;
  website: string;
  twitter: string;
  telegram: string;
  avatar: string;
  joinedDate: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  airdropAlerts: boolean;
  deadlineReminders: boolean;
  newsUpdates: boolean;
  marketingEmails: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  showEmail: boolean;
  showLocation: boolean;
  allowMessages: boolean;
  dataCollection: boolean;
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'privacy' | 'preferences'>('profile');
  const [savedSections, setSavedSections] = useState<{[key: string]: boolean}>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // User profile state
  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'Alex',
    lastName: 'Hunter',
    email: 'alex.hunter@example.com',
    username: 'airdrop_hunter',
    bio: 'Passionate about DeFi and airdrop farming. Always looking for the next big opportunity in crypto.',
    location: 'San Francisco, CA',
    website: 'https://alexhunter.dev',
    twitter: '@alex_hunter_crypto',
    telegram: '@alexhunter',
    avatar: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop',
    joinedDate: 'January 2024'
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notification settings
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    airdropAlerts: true,
    deadlineReminders: true,
    newsUpdates: false,
    marketingEmails: false
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'public',
    showEmail: false,
    showLocation: true,
    allowMessages: true,
    dataCollection: true
  });

  // App preferences
  const [preferences, setPreferences] = useState({
    theme: 'dark',
    language: 'en',
    timezone: 'UTC-8',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    defaultView: 'dashboard'
  });

  const saveSection = (sectionName: string) => {
    // Here you would typically save to API/database
    setSavedSections(prev => ({ ...prev, [sectionName]: true }));
    setTimeout(() => {
      setSavedSections(prev => ({ ...prev, [sectionName]: false }));
    }, 2000);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a service like Cloudinary
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({ ...prev, avatar: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'privacy', label: 'Privacy', icon: '🛡️' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' }
  ];

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
              <h1 className="text-3xl font-bold text-slate-50 truncate">Settings</h1>
              <p className="text-slate-400">Manage your account settings and preferences</p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card>
                <div className="p-6">
                  <nav className="space-y-2">
                    {tabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${
                          activeTab === tab.id
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50'
                            : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                        }`}
                      >
                        <span className="text-lg">{tab.icon}</span>
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  {/* Profile Picture */}
                  <Card>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-100 mb-4">Profile Picture</h3>
                      <div className="flex items-center gap-6">
                        <img 
                          src={profile.avatar} 
                          alt="Profile"
                          className="w-24 h-24 rounded-full object-cover border-4 border-slate-700"
                        />
                        <div>
                          <input
                            type="file"
                            id="avatar-upload"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                          />
                          <label
                            htmlFor="avatar-upload"
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg cursor-pointer transition inline-block"
                          >
                            Change Picture
                          </label>
                          <p className="text-sm text-slate-400 mt-2">JPG, PNG or GIF. Max size 5MB.</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Basic Information */}
                  <Card>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-100 mb-4">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
                          <input
                            type="text"
                            value={profile.firstName}
                            onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                            className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                          <input
                            type="text"
                            value={profile.lastName}
                            onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                            className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
                          <input
                            type="text"
                            value={profile.username}
                            onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                            className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                          <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
                        <textarea
                          value={profile.bio}
                          onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                          rows={3}
                          className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div className="mt-6">
                        <button 
                          onClick={() => saveSection('profile')}
                          className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg font-medium transition"
                        >
                          {savedSections.profile ? 'Saved!' : 'Save Profile'}
                        </button>
                      </div>
                    </div>
                  </Card>

                  {/* Social Links */}
                  <Card>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-100 mb-4">Social Links</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Website</label>
                          <input
                            type="url"
                            value={profile.website}
                            onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                            className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                          <input
                            type="text"
                            value={profile.location}
                            onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                            className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Twitter</label>
                          <input
                            type="text"
                            value={profile.twitter}
                            onChange={(e) => setProfile(prev => ({ ...prev, twitter: e.target.value }))}
                            className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Telegram</label>
                          <input
                            type="text"
                            value={profile.telegram}
                            onChange={(e) => setProfile(prev => ({ ...prev, telegram: e.target.value }))}
                            className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                      <div className="mt-6">
                        <button 
                          onClick={() => saveSection('social')}
                          className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg font-medium transition"
                        >
                          {savedSections.social ? 'Saved!' : 'Save Social Links'}
                        </button>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  {/* Change Password */}
                  <Card>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-100 mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Current Password</label>
                          <input
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                          <input
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                            className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                      <div className="mt-6">
                        <button 
                          onClick={() => saveSection('password')}
                          className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg font-medium transition"
                        >
                          {savedSections.password ? 'Password Updated!' : 'Update Password'}
                        </button>
                      </div>
                    </div>
                  </Card>

                  {/* Two-Factor Authentication */}
                  <Card>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-100 mb-4">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between p-4 bg-slate-800/40 rounded-lg">
                        <div>
                          <p className="text-slate-200 font-medium">2FA Status</p>
                          <p className="text-sm text-slate-400">Add an extra layer of security to your account</p>
                        </div>
                        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition">
                          Enable 2FA
                        </button>
                      </div>
                    </div>
                  </Card>

                  {/* Login Sessions */}
                  <Card>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-100 mb-4">Active Sessions</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg">
                          <div>
                            <p className="text-slate-200 font-medium">Current Session</p>
                            <p className="text-sm text-slate-400">Chrome on macOS • San Francisco, CA</p>
                          </div>
                          <span className="text-green-400 text-sm">Active</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg">
                          <div>
                            <p className="text-slate-200 font-medium">Mobile App</p>
                            <p className="text-sm text-slate-400">iPhone • Last seen 2 hours ago</p>
                          </div>
                          <button className="text-red-400 hover:text-red-300 text-sm">Revoke</button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <Card>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-100 mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      {Object.entries(notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg">
                          <div>
                            <p className="text-slate-200 font-medium">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </p>
                            <p className="text-sm text-slate-400">
                              {key === 'emailNotifications' && 'Receive notifications via email'}
                              {key === 'pushNotifications' && 'Receive push notifications in browser'}
                              {key === 'airdropAlerts' && 'Get notified about new airdrop opportunities'}
                              {key === 'deadlineReminders' && 'Reminders for upcoming deadlines'}
                              {key === 'newsUpdates' && 'Latest news and market updates'}
                              {key === 'marketingEmails' && 'Promotional emails and newsletters'}
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                            className="h-5 w-5 rounded bg-slate-700 border-slate-600 text-indigo-500 focus:ring-indigo-600"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <button 
                        onClick={() => saveSection('notifications')}
                        className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg font-medium transition"
                      >
                        {savedSections.notifications ? 'Saved!' : 'Save Notifications'}
                      </button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <Card>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-100 mb-4">Privacy Settings</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-800/40 rounded-lg">
                        <label className="block text-slate-200 font-medium mb-2">Profile Visibility</label>
                        <select
                          value={privacy.profileVisibility}
                          onChange={(e) => setPrivacy(prev => ({ ...prev, profileVisibility: e.target.value as any }))}
                          className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="public">Public</option>
                          <option value="private">Private</option>
                          <option value="friends">Friends Only</option>
                        </select>
                      </div>
                      
                      {Object.entries(privacy).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg">
                          <div>
                            <p className="text-slate-200 font-medium">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </p>
                            <p className="text-sm text-slate-400">
                              {key === 'showEmail' && 'Display email address on your profile'}
                              {key === 'showLocation' && 'Display location on your profile'}
                              {key === 'allowMessages' && 'Allow other users to send you messages'}
                              {key === 'dataCollection' && 'Allow data collection for analytics'}
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={value as boolean}
                            onChange={(e) => setPrivacy(prev => ({ ...prev, [key]: e.target.checked }))}
                            className="h-5 w-5 rounded bg-slate-700 border-slate-600 text-indigo-500 focus:ring-indigo-600"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <button 
                        onClick={() => saveSection('privacy')}
                        className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg font-medium transition"
                      >
                        {savedSections.privacy ? 'Saved!' : 'Save Privacy Settings'}
                      </button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <Card>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-100 mb-4">App Preferences</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Theme</label>
                          <select
                            value={preferences.theme}
                            onChange={(e) => setPreferences(prev => ({ ...prev, theme: e.target.value }))}
                            className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="dark">Dark</option>
                            <option value="light">Light</option>
                            <option value="auto">Auto</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Language</label>
                          <select
                            value={preferences.language}
                            onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                            className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Timezone</label>
                          <select
                            value={preferences.timezone}
                            onChange={(e) => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
                            className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="UTC-8">Pacific Time (UTC-8)</option>
                            <option value="UTC-5">Eastern Time (UTC-5)</option>
                            <option value="UTC+0">UTC</option>
                            <option value="UTC+1">Central European Time (UTC+1)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Currency</label>
                          <select
                            value={preferences.currency}
                            onChange={(e) => setPreferences(prev => ({ ...prev, currency: e.target.value }))}
                            className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="BTC">BTC</option>
                            <option value="ETH">ETH</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-6">
                        <button 
                          onClick={() => saveSection('preferences')}
                          className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg font-medium transition"
                        >
                          {savedSections.preferences ? 'Saved!' : 'Save Preferences'}
                        </button>
                      </div>
                    </div>
                  </Card>

                  {/* Danger Zone */}
                  <Card>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-red-400 mb-4">Danger Zone</h3>
                      <div className="space-y-4">
                        <div className="p-4 border border-red-500/30 rounded-lg bg-red-500/10">
                          <h4 className="text-red-300 font-medium mb-2">Export Data</h4>
                          <p className="text-sm text-slate-400 mb-3">Download all your data including airdrops, tasks, and settings.</p>
                          <button className="bg-red-600/20 hover:bg-red-600/30 text-red-300 px-4 py-2 rounded-lg transition border border-red-500/30">
                            Export Data
                          </button>
                        </div>
                        
                        <div className="p-4 border border-red-500/30 rounded-lg bg-red-500/10">
                          <h4 className="text-red-300 font-medium mb-2">Delete Account</h4>
                          <p className="text-sm text-slate-400 mb-3">Permanently delete your account and all associated data. This action cannot be undone.</p>
                          <button 
                            onClick={() => setShowDeleteConfirm(true)}
                            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition"
                          >
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-bold text-red-400 mb-4">Confirm Account Deletion</h3>
                <p className="text-slate-300 mb-6">
                  Are you sure you want to delete your account? This will permanently remove all your data including airdrops, tasks, and settings. This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 py-2 px-4 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Handle account deletion
                      setShowDeleteConfirm(false);
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-lg transition"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Settings;