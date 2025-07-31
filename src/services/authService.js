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
  withCredentials: true, // Enable cookies for JWT
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Clear invalid token
      clearStoredAuth();
      
      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Token management utilities
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

const getStoredToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error reading token from localStorage:', error);
    return null;
  }
};

const getStoredUser = () => {
  try {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error reading user from localStorage:', error);
    return null;
  }
};

const setStoredAuth = (token, user) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error storing auth data:', error);
  }
};

const clearStoredAuth = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
};

// Validation utilities
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
  return password.length >= 8 && passwordRegex.test(password);
};

const validateName = (name) => {
  return name && name.trim().length >= 1 && name.trim().length <= 50;
};

// Authentication API functions
const authService = {
  // Sign up new user
  signUp: async (userData) => {
    try {
      // Validate input
      const { firstName, lastName, email, password, confirmPassword } = userData;
      
      if (!validateName(firstName)) {
        throw new Error('First name must be between 1 and 50 characters');
      }
      
      if (!validateName(lastName)) {
        throw new Error('Last name must be between 1 and 50 characters');
      }
      
      if (!validateEmail(email)) {
        throw new Error('Please provide a valid email address');
      }
      
      if (!validatePassword(password)) {
        throw new Error('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
      }
      
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const response = await apiClient.post('/auth/signup', {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        password,
        confirmPassword
      });

      if (response.data.status === 'success') {
        const { token, data } = response.data;
        
        // Store authentication data
        setStoredAuth(token, data.user);
        
        return {
          success: true,
          user: data.user,
          token,
          message: response.data.message || 'Account created successfully!'
        };
      }
      
      throw new Error(response.data.message || 'Registration failed');
    } catch (error) {
      console.error('SignUp error:', error);
      
      // Handle different error types
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.data?.errors) {
        // Handle validation errors from backend
        const firstError = error.response.data.errors[0];
        throw new Error(firstError.msg || firstError.message || 'Validation failed');
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Network error. Please check your connection and try again.');
      }
    }
  },

  // Sign in existing user
  signIn: async (credentials) => {
    try {
      const { email, password } = credentials;
      
      if (!validateEmail(email)) {
        throw new Error('Please provide a valid email address');
      }
      
      if (!password || password.length < 1) {
        throw new Error('Password is required');
      }

      const response = await apiClient.post('/auth/login', {
        email: email.toLowerCase().trim(),
        password
      });

      if (response.data.status === 'success') {
        const { token, data } = response.data;
        
        // Store authentication data
        setStoredAuth(token, data.user);
        
        return {
          success: true,
          user: data.user,
          token,
          message: response.data.message || 'Logged in successfully!'
        };
      }
      
      throw new Error(response.data.message || 'Login failed');
    } catch (error) {
      console.error('SignIn error:', error);
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.status === 429) {
        throw new Error('Too many login attempts. Please try again later.');
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Network error. Please check your connection and try again.');
      }
    }
  },

  // Sign out user
  signOut: async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('SignOut error:', error);
      // Continue with local logout even if API call fails
    } finally {
      // Always clear local storage
      clearStoredAuth();
    }
  },

  // Get current user profile
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      
      if (response.data.status === 'success') {
        const user = response.data.data.user;
        
        // Update stored user data
        setStoredAuth(getStoredToken(), user);
        
        return {
          success: true,
          user
        };
      }
      
      throw new Error('Failed to get user profile');
    } catch (error) {
      console.error('GetCurrentUser error:', error);
      
      if (error.response?.status === 401) {
        clearStoredAuth();
        throw new Error('Session expired. Please log in again.');
      }
      
      throw new Error(error.response?.data?.message || 'Failed to get user profile');
    }
  },

  // Update user password
  updatePassword: async (passwordData) => {
    try {
      const { currentPassword, newPassword, confirmPassword } = passwordData;
      
      if (!currentPassword) {
        throw new Error('Current password is required');
      }
      
      if (!validatePassword(newPassword)) {
        throw new Error('New password must be at least 8 characters with uppercase, lowercase, number, and special character');
      }
      
      if (newPassword !== confirmPassword) {
        throw new Error('New passwords do not match');
      }

      const response = await apiClient.patch('/auth/update-password', {
        currentPassword,
        newPassword,
        confirmPassword
      });

      if (response.data.status === 'success') {
        return {
          success: true,
          message: response.data.message || 'Password updated successfully!'
        };
      }
      
      throw new Error(response.data.message || 'Password update failed');
    } catch (error) {
      console.error('UpdatePassword error:', error);
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Failed to update password');
      }
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = getStoredToken();
    const user = getStoredUser();
    return !!(token && user);
  },

  // Get stored user data
  getUser: () => {
    return getStoredUser();
  },

  // Get stored token
  getToken: () => {
    return getStoredToken();
  },

  // Clear authentication data
  clearAuth: () => {
    clearStoredAuth();
  },

  // Refresh user data without re-authentication
  refreshUser: async () => {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error('Not authenticated');
      }
      
      return await authService.getCurrentUser();
    } catch (error) {
      console.error('RefreshUser error:', error);
      throw error;
    }
  }
};

export default authService;
