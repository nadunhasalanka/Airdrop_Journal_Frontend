const API_BASE_URL = 'http://localhost:3001/api';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

// Helper function to create headers with auth token
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(errorData.message || errorData.error || `HTTP ${response.status}`);
  }
  return response.json();
};

export const userService = {
  // Get current user profile
  getProfile: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData)
      });

      return await handleResponse(response);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(passwordData)
      });

      return await handleResponse(response);
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  },

  // Upload avatar
  uploadAvatar: async (avatarData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/avatar`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ avatar: avatarData })
      });

      return await handleResponse(response);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
  },

  // Delete account
  deleteAccount: async (password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        body: JSON.stringify({ password })
      });

      return await handleResponse(response);
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  }
};

export default userService;
