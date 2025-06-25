// components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-400">&copy; 2024 Airdrop Journal. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-slate-400 hover:text-indigo-400 transition">Twitter</a>
            <a href="#" className="text-slate-400 hover:text-indigo-400 transition">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-indigo-400 transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;