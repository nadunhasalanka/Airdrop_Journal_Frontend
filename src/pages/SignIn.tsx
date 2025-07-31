import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface FormData {
  email: string;
  password: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const { signIn, isLoading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      clearError();
      
      await signIn(formData);
      
      // On success, navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Sign in error:', error);
      // Error is handled by the auth context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
    
    // Clear global error when user makes changes
    if (error) {
      clearError();
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background Glows */}
      <div className="background-blur top-0 right-1/4"></div>
      <div className="background-blur bottom-0 left-1/4"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-100">Welcome Back</h1>
            <p className="text-slate-400 mt-2">Sign in to continue to your Airdrop Journal.</p>
          </div>

          {/* Global Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-700/50 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-slate-800/60 border rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                  validationErrors.email ? 'border-red-500' : 'border-slate-700'
                }`}
                placeholder="you@example.com"
              />
              {validationErrors.email && (
                <p className="text-red-400 text-sm mt-1">{validationErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </a>
                </div>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`w-full bg-slate-800/60 border rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                  validationErrors.password ? 'border-red-500' : 'border-slate-700'
                }`}
                placeholder="••••••••"
              />
              {validationErrors.password && (
                <p className="text-red-400 text-sm mt-1">{validationErrors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full cta-button bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg text-lg shadow-indigo-500/30 shadow-xl hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting || isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>

          <div className="text-center mt-8">
            <p className="text-sm text-slate-400">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-indigo-400 hover:text-indigo-300">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;