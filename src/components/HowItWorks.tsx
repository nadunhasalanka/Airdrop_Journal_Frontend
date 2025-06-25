// components/HowItWorks.tsx
import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: "Create Your Account",
      description: "Sign up for free. No wallet connection required to get started.",
    },
    {
      title: "Add Airdrops",
      description: "Start logging the airdrops you're tracking. Use our templates or create custom entries.",
    },
    {
      title: "Stay Organized",
      description: "Update your progress, check off tasks, and watch your potential earnings grow.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Get Started in 3 Simple Steps</h2>
          <p className="text-lg text-slate-400 mt-2">From zero to organized in minutes.</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="text-center max-w-xs">
                <div className="relative mb-4">
                  <div className="w-24 h-24 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-3xl font-bold text-indigo-400">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">{step.title}</h3>
                <p className="text-slate-400">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="h-1 w-16 bg-slate-700 hidden md:block"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;