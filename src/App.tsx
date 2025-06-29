import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Airdrops from './pages/Airdrops';
import AirdropDetails from './pages/AirdropDetails';
import Tasks from './pages/Tasks';
import News from './pages/News';
import Market from './pages/Market';

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
          <Route path="/airdrops/:id" element={<AirdropDetails />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/news" element={<News />} />
          <Route path="/market" element={<Market />} />
        </Routes>
      </BrowserRouter>
  </QueryClientProvider>
);

export default App;