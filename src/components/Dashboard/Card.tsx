// === REUSABLE CARD COMPONENT ===
import React from 'react';


const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-slate-900/50 border border-slate-800 rounded-2xl shadow-lg ${className}`}>
        {children}
    </div>
);

export default Card;