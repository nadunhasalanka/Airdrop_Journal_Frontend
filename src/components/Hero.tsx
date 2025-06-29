import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="py-24 md:py-32 text-center">
      <div className="container mx-auto px-6 relative">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-50 tracking-tight leading-tight mb-4">
          Never Miss Another Airdrop.
          <br/>
          <span className="gradient-text">Track Everything in One Place.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-8">
          Airdrop Journal is the ultimate tool for serious airdrop hunters. Stop juggling spreadsheets and start tracking your eligibility, tasks, and potential rewards with our streamlined platform.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/signup" className="cta-button bg-indigo-600 text-white font-bold px-8 py-4 rounded-lg text-lg shadow-indigo-500/30 shadow-xl">
            Start Tracking for Free
          </Link>
          <a href="#features" className="cta-button bg-slate-800 text-slate-200 font-bold px-8 py-4 rounded-lg text-lg hover:bg-slate-700">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;