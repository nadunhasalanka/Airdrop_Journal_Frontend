import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would create the account here
    // For demo purposes, we'll just navigate to dashboard
    if (formData.password === formData.confirmPassword) {
      navigate('/dashboard');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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

          <form className="space-y-6" onSubmit={handleSubmit}>
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
                className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="••••••••"
              />
              {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">Passwords do not match</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={formData.password !== formData.confirmPassword}
                className="w-full cta-button bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg text-lg shadow-indigo-500/30 shadow-xl hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900 text-slate-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center w-full py-2.5 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800 transition"
            >
              {/* SVG for Google Icon */}
              <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M47.532 24.555c0-1.559-.142-3.065-.402-4.52H24.31v8.52h13.06c-.563 2.76-2.223 5.12-4.68 6.69v5.52h7.109c4.162-3.83 6.533-9.57 6.533-16.21z" fill="#4285F4"></path><path d="M24.31 48c6.48 0 11.93-2.13 15.908-5.78l-7.11-5.52c-2.15 1.45-4.92 2.3-8.798 2.3-6.76 0-12.48-4.56-14.52-10.68H2.47v5.7C6.48 42.45 14.63 48 24.31 48z" fill="#34A853"></path><path d="M9.79 28.17a15.23 15.23 0 0 1 0-8.34v-5.7H2.47a24.06 24.06 0 0 0 0 19.74l7.32-5.7z" fill="#FBBC05"></path><path d="M24.31 9.48c3.52 0 6.7 1.22 9.21 3.63l6.309-6.26C36.23 2.22 30.79 0 24.31 0 14.63 0 6.48 5.55 2.47 14.13l7.32 5.7c2.04-6.12 7.76-10.68 14.52-10.68z" fill="#EA4335"></path></svg>
              Google
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center w-full py-2.5 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800 transition"
            >
              {/* SVG for Twitter Icon */}
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.67.3-1.39.5-2.14.58.77-.46 1.36-1.2 1.64-2.06-.72.43-1.51.74-2.35.9-.68-.72-1.64-1.17-2.7-1.17-2.05 0-3.71 1.66-3.71 3.71 0 .29.03.58.09.85-3.08-.16-5.81-1.63-7.64-3.87-.32.55-.5 1.18-.5 1.86 0 1.28.65 2.42 1.65 3.08-.6-.02-1.17-.18-1.66-.46v.05c0 1.79 1.27 3.28 2.97 3.62-.31.08-.64.13-.98.13-.24 0-.47-.02-.7-.07.47 1.47 1.83 2.54 3.45 2.57-1.27.99-2.86 1.58-4.6 1.58-.3 0-.59-.02-.88-.05 1.64 1.05 3.58 1.66 5.66 1.66 6.79 0 10.5-5.62 10.5-10.5v-.47c.72-.52 1.34-1.17 1.84-1.92z"></path></svg>
              Twitter
            </button>
          </div>

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