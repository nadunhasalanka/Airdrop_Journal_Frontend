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

// User Tags Service
const userTagService = {
  // Get all user tags
  getTags: async (params = {}) => {
    try {
      const response = await apiClient.get('/tags', { params });
      
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
          count: response.data.count
        };
      }
      
      throw new Error(response.data.message || 'Failed to fetch tags');
    } catch (error) {
      console.error('GetTags error:', error);
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Network error. Please check your connection and try again.');
      }
    }
  },

  // Get tag suggestions
  getSuggestions: async (query = '', limit = 10) => {
    try {
      const response = await apiClient.get('/tags/suggestions', {
        params: { q: query, limit }
      });
      
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data
        };
      }
      
      throw new Error(response.data.message || 'Failed to fetch tag suggestions');
    } catch (error) {
      console.error('GetSuggestions error:', error);
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Failed to fetch tag suggestions');
      }
    }
  },

  // Create new tag
  createTag: async (tagData) => {
    try {
      const response = await apiClient.post('/tags', tagData);
      
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || 'Tag created successfully!'
        };
      }
      
      throw new Error(response.data.message || 'Failed to create tag');
    } catch (error) {
      console.error('CreateTag error:', error);
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.data?.errors) {
        const firstError = error.response.data.errors[0];
        throw new Error(firstError.msg || firstError.message || 'Validation failed');
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Network error. Please check your connection and try again.');
      }
    }
  },

  // Update existing tag
  updateTag: async (id, tagData) => {
    try {
      const response = await apiClient.put(`/tags/${id}`, tagData);
      
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || 'Tag updated successfully!'
        };
      }
      
      throw new Error(response.data.message || 'Failed to update tag');
    } catch (error) {
      console.error('UpdateTag error:', error);
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.data?.errors) {
        const firstError = error.response.data.errors[0];
        throw new Error(firstError.msg || firstError.message || 'Validation failed');
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Failed to update tag');
      }
    }
  },

  // Delete tag
  deleteTag: async (id) => {
    try {
      const response = await apiClient.delete(`/tags/${id}`);
      
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Tag deleted successfully!'
        };
      }
      
      throw new Error(response.data.message || 'Failed to delete tag');
    } catch (error) {
      console.error('DeleteTag error:', error);
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Failed to delete tag');
      }
    }
  },

  // Create multiple tags
  bulkCreate: async (tags) => {
    try {
      const response = await apiClient.post('/tags/bulk-create', { tags });
      
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message,
          errors: response.data.errors
        };
      }
      
      throw new Error(response.data.message || 'Failed to create tags');
    } catch (error) {
      console.error('BulkCreate error:', error);
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.data?.errors) {
        const firstError = error.response.data.errors[0];
        throw new Error(firstError.msg || firstError.message || 'Validation failed');
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Network error. Please check your connection and try again.');
      }
    }
  }
};

export default userTagService;
