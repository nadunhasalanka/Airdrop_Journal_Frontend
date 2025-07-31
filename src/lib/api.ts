// API client configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

interface ApiResponse<T = any> {
  status: 'success' | 'fail' | 'error';
  message?: string;
  data?: T;
  token?: string;
  errors?: any[];
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Include cookies for JWT
      ...options,
    };

    // Add authorization header if token exists in localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw {
          status: data.status || 'error',
          message: data.message || 'Something went wrong',
          errors: data.errors,
          statusCode: response.status,
        };
      }

      return data;
    } catch (error: any) {
      if (error.statusCode) {
        throw error;
      }
      
      throw {
        status: 'error',
        message: 'Network error or server unavailable',
        statusCode: 500,
      };
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Specific API methods
export const authApi = {
  signup: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    username?: string;
  }) => apiClient.post('/api/auth/signup', data),

  login: (data: { email: string; password: string }) =>
    apiClient.post('/api/auth/login', data),

  logout: () => apiClient.post('/api/auth/logout'),

  getCurrentUser: () => apiClient.get('/api/auth/me'),

  forgotPassword: (data: { email: string }) =>
    apiClient.post('/api/auth/forgot-password', data),

  resetPassword: (token: string, data: { password: string; confirmPassword: string }) =>
    apiClient.patch(`/api/auth/reset-password/${token}`, data),

  updatePassword: (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => apiClient.patch('/api/auth/update-password', data),

  verifyEmail: (token: string) =>
    apiClient.post(`/api/auth/verify-email/${token}`),

  resendVerification: () =>
    apiClient.post('/api/auth/resend-verification'),
};

export const userApi = {
  getProfile: () => apiClient.get('/api/users/profile'),

  updateProfile: (data: {
    firstName?: string;
    lastName?: string;
    username?: string;
    avatar?: string;
    preferences?: any;
  }) => apiClient.put('/api/users/profile', data),

  getStats: () => apiClient.get('/api/users/stats'),

  deactivateAccount: (data: { confirmPassword: string }) =>
    apiClient.delete('/api/users/account'),
};

export const airdropApi = {
  getAll: (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
    sort?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, String(value));
        }
      });
    }
    const query = queryParams.toString();
    return apiClient.get(`/api/airdrops${query ? `?${query}` : ''}`);
  },

  getById: (id: string) => apiClient.get(`/api/airdrops/${id}`),

  create: (data: {
    name: string;
    description: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    tokenSymbol?: string;
    totalReward?: string;
    requirements?: string[];
    website?: string;
    twitter?: string;
    discord?: string;
    telegram?: string;
    priority?: number;
    tags?: string[];
  }) => apiClient.post('/api/airdrops', data),

  update: (id: string, data: any) => apiClient.put(`/api/airdrops/${id}`, data),

  delete: (id: string) => apiClient.delete(`/api/airdrops/${id}`),

  getUserAirdrops: () => apiClient.get('/api/airdrops/my'),
};

// Export types
export type { ApiResponse };
