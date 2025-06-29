import React from 'react';

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-xl shadow-lg hover:border-slate-700/50 transition-all duration-200 ${className}`}>
        {children}
    </div>
);

export default Card;