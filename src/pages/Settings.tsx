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
    <div className="bg-gray-950 min-h-screen">
      <Sidebar />
      <main className="lg:ml-64 text-gray-200">
        <div className="max-w-4xl mx-auto p-4 lg:p-8">
          {/* Background Effects */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(124,58,237,0.04)_0%,rgba(168,85,247,0.02)_50%,transparent_70%)] -z-10 filter blur-[100px]"></div>

          {/* Header */}
          <div className="mb-8 lg:mb-12 pt-16 lg:pt-0">
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-100 mb-2">Settings</h1>
            <p className="text-gray-400">Manage your profile and account preferences</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 lg:mb-8 bg-gray-900/30 p-1 rounded-xl w-fit">
            {[
              { id: 'profile', label: 'Profile' },
              { id: 'security', label: 'Security' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 lg:px-6 py-3 rounded-lg font-medium transition-all text-sm lg:text-base ${
                  activeTab === tab.id
                    ? 'bg-gray-800 text-gray-100 shadow-lg'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6 lg:space-y-8">
              {/* Profile Picture Section */}
              <Card>
                <div className="p-4 lg:p-8">
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-100 mb-4 lg:mb-6">Profile Picture</h2>
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
                    <div className="relative">
                      <img 
                        src={profile.avatar} 
                        alt="Profile"
                        className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 lg:w-6 lg:h-6 bg-emerald-500 rounded-full border-2 border-gray-900"></div>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <input
                        type="file"
                        id="avatar-upload"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="avatar-upload"
                        className="btn-secondary cursor-pointer inline-block text-sm lg:text-base"
                      >
                        Change Photo
                      </label>
                      <p className="text-sm text-gray-500 mt-2">JPG or PNG. Max size 5MB.</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Personal Information */}
              <Card>
                <div className="p-4 lg:p-8">
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-100 mb-4 lg:mb-6">Personal Information</h2>
                  <div className="space-y-4 lg:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                        <input
                          type="text"
                          value={profile.firstName}
                          onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                          className="form-input w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                        <input
                          type="text"
                          value={profile.lastName}
                          onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                          className="form-input w-full"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                        <input
                          type="text"
                          value={profile.username}
                          onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                          className="form-input w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                          className="form-input w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                        rows={4}
                        className="form-input w-full resize-none"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6 lg:mt-8">
                    <button 
                      onClick={() => saveSection('profile')}
                      className="btn-primary text-sm lg:text-base"
                    >
                      {savedSections.profile ? 'Saved!' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </Card>

              {/* Account Details */}
              <Card>
                <div className="p-4 lg:p-8">
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-100 mb-4 lg:mb-6">Account Details</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3">
                      <div>
                        <p className="text-gray-200 font-medium">Member Since</p>
                        <p className="text-sm text-gray-400">{profile.joinedDate}</p>
                      </div>
                      <span className="text-gray-400 text-sm">Read only</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t border-gray-800/40">
                      <div>
                        <p className="text-gray-200 font-medium">Account Status</p>
                        <p className="text-sm text-emerald-400">Active</p>
                      </div>
                      <span className="text-gray-400 text-sm">Read only</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6 lg:space-y-8">
              {/* Change Password */}
              <Card>
                <div className="p-4 lg:p-8">
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-100 mb-4 lg:mb-6">Change Password</h2>
                  <div className="space-y-4 lg:space-y-6 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="form-input w-full"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="form-input w-full"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="form-input w-full"
                        placeholder="Confirm new password"
                      />
                    </div>
                    {passwordData.newPassword && passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                      <p className="text-red-400 text-sm">Passwords do not match</p>
                    )}
                  </div>
                  
                  <div className="flex justify-end mt-6 lg:mt-8">
                    <button 
                      onClick={() => saveSection('password')}
                      disabled={!passwordData.currentPassword || !passwordData.newPassword || passwordData.newPassword !== passwordData.confirmPassword}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base"
                    >
                      {savedSections.password ? 'Password Updated!' : 'Update Password'}
                    </button>
                  </div>
                </div>
              </Card>

              {/* Security Overview */}
              <Card>
                <div className="p-4 lg:p-8">
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-100 mb-4 lg:mb-6">Security Overview</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <div>
                          <p className="text-gray-200 font-medium">Password Strength</p>
                          <p className="text-sm text-gray-400">Last changed 30 days ago</p>
                        </div>
                      </div>
                      <span className="text-emerald-400 text-sm font-medium">Strong</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-4 border-t border-gray-800/40">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <div>
                          <p className="text-gray-200 font-medium">Recent Activity</p>
                          <p className="text-sm text-gray-400">Last login: 2 hours ago</p>
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