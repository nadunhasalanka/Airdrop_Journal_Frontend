import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Airdrops from './pages/Airdrops';
import AirdropDetails from './pages/AirdropDetails';
import AddAirdrop from './pages/AddAirdrop';
import Tasks from './pages/Tasks';
import News from './pages/News';
import Market from './pages/Market';
import Settings from './pages/Settings';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          
          {/* Auth routes - redirect to dashboard if already logged in */}
          <Route 
            path="/signup" 
            element={
              <ProtectedRoute requireAuth={false}>
                <SignUp />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/login" 
            element={
              <ProtectedRoute requireAuth={false}>
                <SignIn />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/signin" 
            element={
              <ProtectedRoute requireAuth={false}>
                <SignIn />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected routes - require authentication */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/airdrops" 
            element={
              <ProtectedRoute>
                <Airdrops />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/airdrops/add" 
            element={
              <ProtectedRoute>
                <AddAirdrop />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/airdrops/:id" 
            element={
              <ProtectedRoute>
                <AirdropDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tasks" 
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/news" 
            element={
              <ProtectedRoute>
                <News />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/market" 
            element={
              <ProtectedRoute>
                <Market />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;