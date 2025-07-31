import React, { createContext, useContext, useReducer, useEffect } from 'react';
import authService from '../services/authService';

// Authentication state structure
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

// Action types
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_USER: 'UPDATE_USER'
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
        error: null
      };
      
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
      
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
      
    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
      
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
      
    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null
      };
      
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize authentication state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
        
        if (authService.isAuthenticated()) {
          // Try to refresh user data
          const result = await authService.getCurrentUser();
          
          dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: {
              user: result.user,
              token: authService.getToken()
            }
          });
        } else {
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear invalid auth data
        authService.clearAuth();
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
      }
    };

    initializeAuth();
  }, []);

  // Sign up function
  const signUp = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
      
      const result = await authService.signUp(userData);
      
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: {
          user: result.user,
          token: result.token
        }
      });
      
      return result;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: error.message
      });
      throw error;
    }
  };

  // Sign in function
  const signIn = async (credentials) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
      
      const result = await authService.signIn(credentials);
      
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: {
          user: result.user,
          token: result.token
        }
      });
      
      return result;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: error.message
      });
      throw error;
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      
      await authService.signOut();
      
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    } catch (error) {
      console.error('Sign out error:', error);
      // Still logout locally even if API call fails
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };

  // Update password function
  const updatePassword = async (passwordData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
      
      const result = await authService.updatePassword(passwordData);
      
      return result;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: error.message
      });
      throw error;
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    try {
      const result = await authService.refreshUser();
      
      dispatch({
        type: AUTH_ACTIONS.UPDATE_USER,
        payload: result.user
      });
      
      return result;
    } catch (error) {
      console.error('Refresh user error:', error);
      // If refresh fails due to auth issues, logout
      if (error.message.includes('Session expired') || error.message.includes('Not authenticated')) {
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
      }
      throw error;
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Context value
  const value = {
    // State
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    
    // Actions
    signUp,
    signIn,
    signOut,
    updatePassword,
    refreshUser,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
