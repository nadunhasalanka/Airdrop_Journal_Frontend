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

export const taskService = {
  // Get all tasks for the authenticated user
  getTasks: async (options = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (options.completed !== undefined) queryParams.append('completed', options.completed);
      if (options.isDaily !== undefined) queryParams.append('isDaily', options.isDaily);
      if (options.project) queryParams.append('project', options.project);
      if (options.category) queryParams.append('category', options.category);
      if (options.page) queryParams.append('page', options.page);
      if (options.limit) queryParams.append('limit', options.limit);
      if (options.sortBy) queryParams.append('sortBy', options.sortBy);
      if (options.sortOrder) queryParams.append('sortOrder', options.sortOrder);

      const url = `${API_BASE_URL}/tasks${queryParams.toString() ? `?${queryParams}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Get today's tasks
  getTodaysTasks: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/today`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching today\'s tasks:', error);
      throw error;
    }
  },

  // Get daily tasks
  getDailyTasks: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/daily`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching daily tasks:', error);
      throw error;
    }
  },

  // Get task statistics
  getTaskStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/stats`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching task stats:', error);
      throw error;
    }
  },

  // Get a specific task
  getTask: async (taskId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching task:', error);
      throw error;
    }
  },

  // Create a new task
  createTask: async (taskData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(taskData)
      });

      return await handleResponse(response);
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Update a task
  updateTask: async (taskId, taskData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(taskData)
      });

      return await handleResponse(response);
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Toggle task completion status
  toggleTask: async (taskId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/toggle`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      });

      return await handleResponse(response);
    } catch (error) {
      console.error('Error toggling task:', error);
      throw error;
    }
  },

  // Delete a task
  deleteTask: async (taskId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      return await handleResponse(response);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  // Create multiple tasks at once
  createBulkTasks: async (tasksData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/bulk`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ tasks: tasksData })
      });

      return await handleResponse(response);
    } catch (error) {
      console.error('Error creating bulk tasks:', error);
      throw error;
    }
  },

  // Mark task as completed
  completeTask: async (taskId) => {
    try {
      const task = await taskService.getTask(taskId);
      if (task.task.completed) {
        return task; // Already completed
      }
      
      return await taskService.toggleTask(taskId);
    } catch (error) {
      console.error('Error completing task:', error);
      throw error;
    }
  },

  // Mark task as pending
  uncompleteTask: async (taskId) => {
    try {
      const task = await taskService.getTask(taskId);
      if (!task.task.completed) {
        return task; // Already pending
      }
      
      return await taskService.toggleTask(taskId);
    } catch (error) {
      console.error('Error uncompleting task:', error);
      throw error;
    }
  }
};

export default taskService;
