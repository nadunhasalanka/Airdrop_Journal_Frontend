import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-black/30 backdrop-blur-lg border-b border-slate-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1V4m0 12v1m0 1v1m0 1v1M4 12H3m1 0h1m16 0h-1m-1 0h-1M12 4c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" />
          </svg>
          <span className="text-xl font-bold text-slate-100">Airdrop Journal</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="nav-link text-slate-300">Features</a>
          <a href="#how-it-works" className="nav-link text-slate-300">How It Works</a>
          <a href="#testimonials" className="nav-link text-slate-300">Testimonials</a>
        </nav>
        <a href="#cta" className="cta-button bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg shadow-lg hover:bg-indigo-500">
          Get Started
        </a>
      </div>
    </header>
  );
};

export default Header;