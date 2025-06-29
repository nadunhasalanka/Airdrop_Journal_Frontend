import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import Card from '@/components/Dashboard/Card';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  bio: string;
  avatar: string;
  joinedDate: string;
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [savedSections, setSavedSections] = useState<{[key: string]: boolean}>({});

  // User profile state
  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'Alex',
    lastName: 'Hunter',
    email: 'alex.hunter@example.com',
    username: 'airdrop_hunter',
    bio: 'Passionate about DeFi and airdrop farming. Always looking for the next big opportunity in crypto.',
    avatar: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop',
    joinedDate: 'January 2024'
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const saveSection = (sectionName: string) => {
    setSavedSections(prev => ({ ...prev, [sectionName]: true }));
    setTimeout(() => {
      setSavedSections(prev => ({ ...prev, [sectionName]: false }));
    }, 2000);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({ ...prev, avatar: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Sidebar />
      <main className="ml-64 text-slate-300">
        <div className="max-w-4xl mx-auto p-8">
          {/* Background Effects */}
          <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,rgba(168,85,247,0.08)_50%,rgba(10,10,10,0)_70%)] -z-10 filter blur-[80px]"></div>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-slate-50 mb-2">Settings</h1>
            <p className="text-slate-400">Manage your profile and account preferences</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8 bg-slate-900/30 p-1 rounded-xl w-fit">
            {[
              { id: 'profile', label: 'Profile' },
              { id: 'security', label: 'Security' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-slate-800 text-slate-100 shadow-lg'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-8">
              {/* Profile Picture Section */}
              <Card>
                <div className="p-8">
                  <h2 className="text-xl font-semibold text-slate-100 mb-6">Profile Picture</h2>
                  <div className="flex items-center space-x-8">
                    <div className="relative">
                      <img 
                        src={profile.avatar} 
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-900"></div>
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        id="avatar-upload"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="avatar-upload"
                        className="inline-block bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2 rounded-lg cursor-pointer transition-colors text-sm font-medium"
                      >
                        Change Photo
                      </label>
                      <p className="text-sm text-slate-500 mt-2">JPG or PNG. Max size 5MB.</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Personal Information */}
              <Card>
                <div className="p-8">
                  <h2 className="text-xl font-semibold text-slate-100 mb-6">Personal Information</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
                        <input
                          type="text"
                          value={profile.firstName}
                          onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                          className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                        <input
                          type="text"
                          value={profile.lastName}
                          onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                          className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-colors"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
                        <input
                          type="text"
                          value={profile.username}
                          onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                          className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                        rows={4}
                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-colors resize-none"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-8">
                    <button 
                      onClick={() => saveSection('profile')}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                    >
                      {savedSections.profile ? 'Saved!' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </Card>

              {/* Account Details */}
              <Card>
                <div className="p-8">
                  <h2 className="text-xl font-semibold text-slate-100 mb-6">Account Details</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3">
                      <div>
                        <p className="text-slate-200 font-medium">Member Since</p>
                        <p className="text-sm text-slate-400">{profile.joinedDate}</p>
                      </div>
                      <span className="text-slate-400 text-sm">Read only</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t border-slate-800/50">
                      <div>
                        <p className="text-slate-200 font-medium">Account Status</p>
                        <p className="text-sm text-green-400">Active</p>
                      </div>
                      <span className="text-slate-400 text-sm">Read only</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-8">
              {/* Change Password */}
              <Card>
                <div className="p-8">
                  <h2 className="text-xl font-semibold text-slate-100 mb-6">Change Password</h2>
                  <div className="space-y-6 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Current Password</label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-colors"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-colors"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-colors"
                        placeholder="Confirm new password"
                      />
                    </div>
                    {passwordData.newPassword && passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                      <p className="text-red-400 text-sm">Passwords do not match</p>
                    )}
                  </div>
                  
                  <div className="flex justify-end mt-8">
                    <button 
                      onClick={() => saveSection('password')}
                      disabled={!passwordData.currentPassword || !passwordData.newPassword || passwordData.newPassword !== passwordData.confirmPassword}
                      className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                    >
                      {savedSections.password ? 'Password Updated!' : 'Update Password'}
                    </button>
                  </div>
                </div>
              </Card>

              {/* Security Overview */}
              <Card>
                <div className="p-8">
                  <h2 className="text-xl font-semibold text-slate-100 mb-6">Security Overview</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <div>
                          <p className="text-slate-200 font-medium">Password Strength</p>
                          <p className="text-sm text-slate-400">Last changed 30 days ago</p>
                        </div>
                      </div>
                      <span className="text-green-400 text-sm font-medium">Strong</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-4 border-t border-slate-800/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <div>
                          <p className="text-slate-200 font-medium">Recent Activity</p>
                          <p className="text-sm text-slate-400">Last login: 2 hours ago</p>
                        </div>
                      </div>
                      <span className="text-blue-400 text-sm font-medium">Normal</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Settings;