import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import Card from '@/components/Dashboard/Card';
import userService from '@/services/userService';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  bio: string;
  avatar: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [profile, setProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    bio: '',
    avatar: 'https://via.placeholder.com/150'
  });
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getProfile();
      
      if (response.success) {
        setProfile({
          firstName: response.data.firstName || '',
          lastName: response.data.lastName || '',
          email: response.data.email || '',
          username: response.data.username || '',
          bio: response.data.bio || '',
          avatar: response.data.avatar || 'https://via.placeholder.com/150'
        });
      }
    } catch (err: any) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const response = await userService.updateProfile(profile);
      
      if (response.success) {
        setSuccess('Profile updated successfully!');
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const response = await userService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      if (response.success) {
        setSuccess('Password changed successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const avatarData = event.target?.result as string;
        try {
          setSaving(true);
          const response = await userService.uploadAvatar(avatarData);
          if (response.success) {
            setProfile(prev => ({ ...prev, avatar: avatarData }));
            setSuccess('Avatar updated successfully!');
            setTimeout(() => setSuccess(null), 3000);
          }
        } catch (err: any) {
          setError(err.message || 'Failed to upload avatar');
        } finally {
          setSaving(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-950 min-h-screen">
        <Sidebar />
        <main className="lg:ml-64 text-gray-200">
          <div className="flex items-center justify-center h-96 pt-16">
            <div className="text-white text-lg">Loading settings...</div>
          </div>
        </main>
      </div>
    );
  }

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

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-500/50 rounded-lg text-red-200">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-900/50 border border-green-500/50 rounded-lg text-green-200">
              {success}
            </div>
          )}

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
                        className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover ring-4 ring-purple-500/20"
                      />
                    </div>
                    <div className="flex-1 space-y-4 text-center sm:text-left">
                      <div>
                        <h3 className="text-lg font-medium text-gray-100">{profile.firstName} {profile.lastName}</h3>
                        <p className="text-sm text-gray-400">@{profile.username}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <label className="btn-secondary cursor-pointer">
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleAvatarUpload}
                            className="hidden"
                            disabled={saving}
                          />
                          {saving ? 'Uploading...' : 'Change Photo'}
                        </label>
                        <button className="btn-ghost text-red-400 hover:text-red-300">
                          Remove Photo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Personal Information */}
              <Card>
                <form onSubmit={handleProfileSubmit}>
                  <div className="p-4 lg:p-8">
                    <div className="flex justify-between items-center mb-4 lg:mb-6">
                      <h2 className="text-lg lg:text-xl font-semibold text-gray-100">Personal Information</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                        <input
                          type="text"
                          value={profile.firstName}
                          onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                          className="form-input"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                        <input
                          type="text"
                          value={profile.lastName}
                          onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                          className="form-input"
                          placeholder="Enter your last name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                        <input
                          type="text"
                          value={profile.username}
                          onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                          className="form-input"
                          placeholder="Enter your username"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                          className="form-input"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                        rows={4}
                        className="form-input resize-none"
                        placeholder="Tell us a bit about yourself..."
                      />
                    </div>

                    <div className="flex justify-end">
                      <button 
                        type="submit" 
                        className="btn-primary"
                        disabled={saving}
                      >
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                </form>
              </Card>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6 lg:space-y-8">
              {/* Change Password */}
              <Card>
                <form onSubmit={handlePasswordSubmit}>
                  <div className="p-4 lg:p-8">
                    <h2 className="text-lg lg:text-xl font-semibold text-gray-100 mb-4 lg:mb-6">Change Password</h2>
                    
                    <div className="space-y-4 lg:space-y-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                        <input
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="form-input"
                          placeholder="Enter your current password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                        <input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="form-input"
                          placeholder="Enter your new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="form-input"
                          placeholder="Confirm your new password"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button 
                        type="submit" 
                        className="btn-primary"
                        disabled={saving}
                      >
                        {saving ? 'Updating...' : 'Update Password'}
                      </button>
                    </div>
                  </div>
                </form>
              </Card>

              {/* Account Security */}
              <Card>
                <div className="p-4 lg:p-8">
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-100 mb-4 lg:mb-6">Account Security</h2>
                  
                  <div className="space-y-4 lg:space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-900/30 rounded-lg border border-gray-800/40">
                      <div className="mb-3 sm:mb-0">
                        <h3 className="font-medium text-gray-200">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                      </div>
                      <button className="btn-secondary w-full sm:w-auto">
                        Enable 2FA
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-900/30 rounded-lg border border-gray-800/40">
                      <div className="mb-3 sm:mb-0">
                        <h3 className="font-medium text-gray-200">Login Alerts</h3>
                        <p className="text-sm text-gray-400">Get notified of new sign-ins to your account</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                      <div className="mb-3 sm:mb-0">
                        <h3 className="font-medium text-red-300">Delete Account</h3>
                        <p className="text-sm text-gray-400">Permanently delete your account and all data</p>
                      </div>
                      <button className="btn-ghost text-red-400 hover:text-red-300 w-full sm:w-auto">
                        Delete Account
                      </button>
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