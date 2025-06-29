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
    { id: 'security', label: 'Security', icon: '🔒' }
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
              <p className="text-slate-400">Manage your profile and account security</p>
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
                      <div className="mt-6">
                        <button 
                          onClick={() => saveSection('avatar')}
                          className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg font-medium transition"
                        >
                          {savedSections.avatar ? 'Saved!' : 'Save Picture'}
                        </button>
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
                          placeholder="Tell us about yourself..."
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

                  {/* Account Information */}
                  <Card>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-100 mb-4">Account Information</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg">
                          <div>
                            <p className="text-slate-200 font-medium">Member Since</p>
                            <p className="text-sm text-slate-400">{profile.joinedDate}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg">
                          <div>
                            <p className="text-slate-200 font-medium">Account Status</p>
                            <p className="text-sm text-green-400">Active</p>
                          </div>
                        </div>
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
                            placeholder="Enter your current password"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                          <input
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                            className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your new password"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Confirm your new password"
                          />
                        </div>
                        {passwordData.newPassword && passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                          <p className="text-red-400 text-sm">Passwords do not match</p>
                        )}
                      </div>
                      <div className="mt-6">
                        <button 
                          onClick={() => saveSection('password')}
                          disabled={!passwordData.currentPassword || !passwordData.newPassword || passwordData.newPassword !== passwordData.confirmPassword}
                          className="bg-green-600 hover:bg-green-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg font-medium transition"
                        >
                          {savedSections.password ? 'Password Updated!' : 'Update Password'}
                        </button>
                      </div>
                    </div>
                  </Card>

                  {/* Security Status */}
                  <Card>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-100 mb-4">Security Status</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg">
                          <div>
                            <p className="text-slate-200 font-medium">Password Strength</p>
                            <p className="text-sm text-slate-400">Last changed 30 days ago</p>
                          </div>
                          <span className="text-green-400 text-sm">Strong</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg">
                          <div>
                            <p className="text-slate-200 font-medium">Login Activity</p>
                            <p className="text-sm text-slate-400">Last login: 2 hours ago</p>
                          </div>
                          <span className="text-green-400 text-sm">Normal</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;