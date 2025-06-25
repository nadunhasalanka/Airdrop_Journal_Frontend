// components/Features.tsx
import React from 'react';

interface FeatureProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const FeatureCard: React.FC<FeatureProps> = ({ title, description, icon }) => {
  return (
    <div className="feature-card bg-slate-900/50 p-8 rounded-xl">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-slate-100 mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      title: "Comprehensive Tracking",
      description: "Log every airdrop you're farming. Add notes, track task completion, and monitor deadlines effortlessly.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      ),
    },
    {
      title: "Deadline Alerts",
      description: "Never miss a snapshot or claim period again. Get timely notifications so you can take action when it matters most.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
        </svg>
      ),
    },
    {
      title: "Portfolio Analytics",
      description: "Visualize your potential and claimed airdrop values. Understand your ROI and optimize your farming strategy.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className="py-20 bg-black/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Why You'll Love Airdrop Journal</h2>
          <p className="text-lg text-slate-400 mt-2">Everything you need to stay ahead in the airdrop game.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;