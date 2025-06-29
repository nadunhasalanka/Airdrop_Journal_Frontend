import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Airdrops from './pages/Airdrops';
import Tasks from './pages/Tasks';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<SignIn/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/airdrops" element={<Airdrops />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </BrowserRouter>
  </QueryClientProvider>
);

export default App;