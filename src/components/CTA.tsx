// components/CTA.tsx
import React from 'react';

const CTA: React.FC = () => {
  return (
    <section id="cta" className="py-24">
      <div className="container mx-auto px-6 text-center">
        <div className="bg-slate-900 rounded-2xl p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-30 z-0"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Take Control of Your Airdrops?</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
              Stop the chaos. Start your journey to organized, efficient airdrop farming today.
              It's free to get started.
            </p>
            <a href="#" className="cta-button bg-indigo-600 text-white font-bold px-8 py-4 rounded-lg text-lg inline-block shadow-lg hover:bg-indigo-500">
              Sign Up Now & Track Your First Airdrop
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;