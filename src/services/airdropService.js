import axios from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
const API_TIMEOUT = 10000; // 10 seconds

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Clear invalid token and redirect to login
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      
      if (typeof window !== 'undefined') {
        window.location.href = '/signin';
      }
    }
    
    return Promise.reject(error);
  }
);

// Airdrop Service
const airdropService = {
  // Get all airdrops with optional filtering
  getAirdrops: async (params = {}) => {
    try {
      const response = await apiClient.get('/airdrops', { params });
      
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
          pagination: response.data.pagination
        };
      }
      
      throw new Error(response.data.message || 'Failed to fetch airdrops');
    } catch (error) {
      console.error('GetAirdrops error:', error);
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Network error. Please check your connection and try again.');
      }
    }
  },

  // Get single airdrop by ID
  getAirdrop: async (id) => {
    try {
      const response = await apiClient.get(`/airdrops/${id}`);
      
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data
        };
      }
      
      throw new Error(response.data.message || 'Failed to fetch airdrop');
    } catch (error) {
      console.error('GetAirdrop error:', error);
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Failed to fetch airdrop');
      }
    }
  },

  // Create new airdrop
  createAirdrop: async (airdropData, userId) => {
    try {
      // Transform frontend form data to match backend schema
      const backendData = {
        name: airdropData.name.trim(),
        description: airdropData.description.trim(),
        ecosystem: airdropData.ecosystem || 'Ethereum',
        type: airdropData.type || 'Mainnet',
        status: mapFrontendStatusToBackend(airdropData.status),
        deadline: airdropData.deadline || 'TBA',
        estimatedValue: airdropData.estimatedValue || '',
        priority: mapPriorityToNumber(airdropData.priority),
        officialLink: airdropData.officialLink || '',
        referralLink: airdropData.referralLink || '',
        logoUrl: airdropData.logoUrl || '',
        bannerUrl: airdropData.bannerUrl || '',
        tags: airdropData.tags.map(tag => tag.toLowerCase()),
        notes: airdropData.notes || '',
        isDailyTask: airdropData.isDailyTask || false,
        dailyTaskNote: airdropData.dailyTaskNote ? airdropData.dailyTaskNote.trim() : '',
        tokenSymbol: airdropData.tokenSymbol || '',
        user: userId, // Add user field for backend validation
        socialMedia: {
          twitter: airdropData.socialMedia?.twitter || '',
          telegram: airdropData.socialMedia?.telegram || '',
          discord: airdropData.socialMedia?.discord || '',
          medium: airdropData.socialMedia?.medium || '',
          github: airdropData.socialMedia?.github || '',
          website: airdropData.socialMedia?.website || ''
        }
      };

      // Add dates if provided
      if (airdropData.startDate) {
        backendData.startDate = new Date(airdropData.startDate).toISOString();
      }
      if (airdropData.endDate) {
        backendData.endDate = new Date(airdropData.endDate).toISOString();
      }
      if (airdropData.startDate) {
        backendData.startDate = new Date(airdropData.startDate).toISOString();
      }
      if (airdropData.endDate) {
        backendData.endDate = new Date(airdropData.endDate).toISOString();
      }

      // Debug: Log the data being sent
      console.log('Frontend form data:', airdropData);
      console.log('Backend data being sent:', backendData);

      const response = await apiClient.post('/airdrops', backendData);
      
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || 'Airdrop created successfully!'
        };
      }
      
      throw new Error(response.data.message || 'Failed to create airdrop');
    } catch (error) {
      console.error('CreateAirdrop error:', error);
      console.error('Error response:', error.response?.data);
      
      // Log the specific validation errors
      if (error.response?.data?.errors) {
        console.error('Validation errors:', error.response.data.errors);
        error.response.data.errors.forEach((err, index) => {
          console.error(`Validation error ${index + 1}:`, err);
        });
      }
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.data?.errors) {
        // Handle detailed validation errors
        const errors = error.response.data.errors;
        const errorMessages = errors.map(err => err.msg || err.message || err).join(', ');
        console.error('Detailed validation errors:', errorMessages);
        throw new Error(`Validation failed: ${errorMessages}`);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Network error. Please check your connection and try again.');
      }
    }
  },

  // Update existing airdrop
  updateAirdrop: async (id, airdropData) => {
    try {
      // Transform frontend form data to match backend schema exactly
      const backendData = {
        name: airdropData.name?.trim() || '',
        description: airdropData.description?.trim() || '',
        ecosystem: airdropData.ecosystem || 'Ethereum',
        type: airdropData.type || 'Mainnet',
        status: airdropData.status || 'Farming',
        deadline: airdropData.deadline || 'TBA',
        estimatedValue: airdropData.estimatedValue || '',
        priority: airdropData.priority || 'Medium',
        officialLink: airdropData.officialLink || '',
        referralLink: airdropData.referralLink || '',
        logoUrl: airdropData.logoUrl || '',
        bannerUrl: airdropData.bannerUrl || '',
        tags: (airdropData.tags || []).map(tag => tag.toLowerCase()),
        notes: airdropData.notes || '',
        isDailyTask: Boolean(airdropData.isDailyTask),
        dailyTaskNote: airdropData.dailyTaskNote || '',
        tokenSymbol: airdropData.tokenSymbol || '',
        socialMedia: {
          twitter: airdropData.socialMedia?.twitter || '',
          telegram: airdropData.socialMedia?.telegram || '',
          discord: airdropData.socialMedia?.discord || '',
          medium: airdropData.socialMedia?.medium || '',
          github: airdropData.socialMedia?.github || '',
          website: airdropData.socialMedia?.website || ''
        }
      };

      // Add dates if provided
      if (airdropData.startDate) {
        backendData.startDate = new Date(airdropData.startDate).toISOString();
      }

      const response = await apiClient.put(`/airdrops/${id}`, backendData);
      
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || 'Airdrop updated successfully!'
        };
      }
      
      throw new Error(response.data.message || 'Failed to update airdrop');
    } catch (error) {
      console.error('UpdateAirdrop error:', error);
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.data?.errors) {
        const firstError = error.response.data.errors[0];
        throw new Error(firstError.msg || firstError.message || 'Validation failed');
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Failed to update airdrop');
      }
    }
  },

  // Delete airdrop
  deleteAirdrop: async (id) => {
    try {
      const response = await apiClient.delete(`/airdrops/${id}`);
      
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Airdrop deleted successfully!'
        };
      }
      
      throw new Error(response.data.message || 'Failed to delete airdrop');
    } catch (error) {
      console.error('DeleteAirdrop error:', error);
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Failed to delete airdrop');
      }
    }
  },

  // Get airdrop statistics
  getStats: async () => {
    try {
      const response = await apiClient.get('/airdrops/stats');
      
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data
        };
      }
      
      throw new Error(response.data.message || 'Failed to fetch statistics');
    } catch (error) {
      console.error('GetStats error:', error);
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Failed to fetch statistics');
      }
    }
  },

  // Mark airdrop as completed
  markCompleted: async (id) => {
    try {
      const response = await apiClient.patch(`/airdrops/${id}/complete`);
      
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || 'Airdrop marked as completed!'
        };
      }
      
      throw new Error(response.data.message || 'Failed to mark airdrop as completed');
    } catch (error) {
      console.error('MarkCompleted error:', error);
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Failed to mark airdrop as completed');
      }
    }
  },

  // Alias for getAirdrops for consistency with user-specific methods
  getUserAirdrops: async (params = {}) => {
    return airdropService.getAirdrops(params);
  }
};

// Helper functions to map frontend data to backend format

// Map frontend status to backend status  
const mapFrontendStatusToBackend = (frontendStatus) => {
  // No backend validation, pass frontend values directly
  return frontendStatus;
};

// Map frontend priority to backend value
const mapPriorityToNumber = (priority) => {
  // No backend validation, pass frontend values directly  
  return priority;
};

// Map backend status to frontend status
export const mapBackendStatusToFrontend = (backendStatus) => {
  // No backend validation, values stored as-is from frontend
  return backendStatus || 'Farming';
};

// Map backend priority to frontend priority
export const mapBackendPriorityToFrontend = (priority) => {
  // No backend validation, values stored as-is from frontend
  return priority || 'Medium';
};

export default airdropService;
