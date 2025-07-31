import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, isLoading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length > 50) {
      errors.firstName = 'First name must be less than 50 characters';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length > 50) {
      errors.lastName = 'Last name must be less than 50 characters';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
      errors.password = 'Password must contain uppercase, lowercase, number, and special character';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
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
      
      await signUp(formData);
      
      // On success, navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Sign up error:', error);
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
      <div className="background-blur top-0 left-1/4"></div>
      <div className="background-blur bottom-0 right-1/4"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-100">Create Your Account</h1>
            <p className="text-slate-400 mt-2">Start tracking airdrops in minutes.</p>
          </div>

          {/* Global Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-700/50 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-2">
                First Name *
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full bg-slate-800/60 border rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                  validationErrors.firstName ? 'border-red-500' : 'border-slate-700'
                }`}
                placeholder="John"
              />
              {validationErrors.firstName && (
                <p className="text-red-400 text-sm mt-1">{validationErrors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-2">
                Last Name *
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full bg-slate-800/60 border rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                  validationErrors.lastName ? 'border-red-500' : 'border-slate-700'
                }`}
                placeholder="Doe"
              />
              {validationErrors.lastName && (
                <p className="text-red-400 text-sm mt-1">{validationErrors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address *
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
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
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
              {!validationErrors.password && formData.password && (
                <p className="text-slate-500 text-xs mt-1">
                  Must contain uppercase, lowercase, number, and special character
                </p>
              )}
            </div>
            
            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                Confirm Password *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full bg-slate-800/60 border rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                  validationErrors.confirmPassword ? 'border-red-500' : 'border-slate-700'
                }`}
                placeholder="••••••••"
              />
              {validationErrors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">{validationErrors.confirmPassword}</p>
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
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>

          <div className="text-center mt-8">
            <p className="text-sm text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;