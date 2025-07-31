import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAuth = true }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Redirect to login page with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated but trying to access auth pages (login/signup)
  if (!requireAuth && isAuthenticated) {
    // Redirect to dashboard if already logged in
    return <Navigate to="/dashboard" replace />;
  }

  // Allow access to the route
  return <>{children}</>;
};

export default ProtectedRoute;
