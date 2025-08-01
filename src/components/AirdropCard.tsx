import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Airdrop {
  _id: string;
  name: string;
  description: string;
  ecosystem: string;
  type: string;
  status: string;
  deadline: string;
  estimatedValue: string;
  priority: string;
  officialLink: string;
  referralLink?: string;
  logoUrl: string;
  bannerUrl?: string;
  tags: string[];
  tokenSymbol?: string;
  tasksCompleted?: number;
  totalTasks?: number;
  lastUpdated?: string;
  startDate?: string;
}

interface AirdropCardProps {
  airdrop: Airdrop;
  onCopy: (text: string, type: string) => void;
  copiedLink: string;
}

const AirdropCard: React.FC<AirdropCardProps> = ({ airdrop, onCopy, copiedLink }) => {
  const [imageError, setImageError] = useState(false);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Farming': return 'status-farming';
      case 'Claimable': return 'status-claimable';
      case 'Completed': return 'status-completed';
      case 'Upcoming': return 'status-upcoming';
      default: return 'status-upcoming';
    }
  };

  const getTypeClass = (type: string) => {
    switch (type) {
      case 'Mainnet': return 'bg-green-900/30 text-green-300 border border-green-600/30';
      case 'Testnet': return 'bg-blue-900/30 text-blue-300 border border-blue-600/30';
      case 'Telegram': return 'bg-cyan-900/30 text-cyan-300 border border-cyan-600/30';
      case 'Web3': return 'bg-purple-900/30 text-purple-300 border border-purple-600/30';
      case 'Social': return 'bg-pink-900/30 text-pink-300 border border-pink-600/30';
      default: return 'bg-gray-900/30 text-gray-300 border border-gray-600/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const progressPercentage = airdrop.tasksCompleted && airdrop.totalTasks 
    ? Math.min((airdrop.tasksCompleted / airdrop.totalTasks) * 100, 100) 
    : 0;

  return (
    <div className="group relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-xl border border-slate-700/50 hover:border-violet-600/30 transition-all duration-300 hover:shadow-lg hover:shadow-violet-900/20 overflow-hidden">
      {/* Banner Image (if available) */}
      {airdrop.bannerUrl && !imageError && (
        <div className="relative h-32 overflow-hidden">
          <img
            src={airdrop.bannerUrl}
            alt={`${airdrop.name} banner`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
          
          {/* Priority Badge on Banner */}
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-lg bg-black/60 backdrop-blur-sm ${getPriorityColor(airdrop.priority)}`}>
              {airdrop.priority} Priority
            </span>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Header with Logo and Info */}
        <div className="flex items-start gap-4 mb-4">
          {/* Logo */}
          <div className="relative">
            {airdrop.logoUrl ? (
              <img
                src={airdrop.logoUrl}
                alt={`${airdrop.name} logo`}
                className="w-14 h-14 rounded-xl object-cover shadow-lg ring-2 ring-slate-700/50 group-hover:ring-violet-600/30 transition-all duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg ring-2 ring-slate-700/50 group-hover:ring-violet-600/30 transition-all duration-300">
                <span className="text-white text-xl font-bold">
                  {airdrop.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            
            {/* Token Symbol Badge */}
            {airdrop.tokenSymbol && (
              <div className="absolute -bottom-1 -right-1 bg-violet-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-md">
                ${airdrop.tokenSymbol}
              </div>
            )}
          </div>

          {/* Title and Meta */}
          <div className="flex-1 min-w-0">
            <Link 
              to={`/airdrops/${airdrop._id}`}
              className="group-hover:text-violet-400 transition-colors"
            >
              <h3 className="text-lg font-bold text-gray-100 mb-1 truncate group-hover:text-violet-400 transition-colors">
                {airdrop.name}
              </h3>
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <span className="px-2 py-1 bg-slate-800/50 rounded-md">{airdrop.ecosystem}</span>
              <span className="text-gray-600">•</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-md ${getTypeClass(airdrop.type)}`}>
                {airdrop.type}
              </span>
            </div>
            
            {/* Status Badge */}
            <div className="flex items-center gap-2">
              <span className={`status-badge ${getStatusClass(airdrop.status)}`}>
                {airdrop.status}
              </span>
              {airdrop.deadline && (
                <span className="text-xs text-gray-500">
                  {airdrop.deadline}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
          {airdrop.description}
        </p>

        {/* Progress Bar (if available) */}
        {airdrop.tasksCompleted !== undefined && airdrop.totalTasks !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-gray-400 font-medium">Progress</span>
              <span className="text-violet-400 font-semibold">
                {airdrop.tasksCompleted}/{airdrop.totalTasks}
              </span>
            </div>
            <div className="relative w-full bg-slate-800/50 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-violet-600 to-purple-600 h-full rounded-full transition-all duration-500 relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
              </div>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {airdrop.tags.slice(0, 3).map(tag => (
            <span key={tag} className="tag-badge text-xs">
              {tag}
            </span>
          ))}
          {airdrop.tags.length > 3 && (
            <span className="tag-badge text-xs">
              +{airdrop.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Value and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <div>
            <p className="text-xs text-gray-500 mb-1">Estimated Value</p>
            <p className="text-sm font-bold text-gray-200">
              {airdrop.estimatedValue || 'TBA'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Visit Site Button */}
            <a
              href={airdrop.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Visit
            </a>

            {/* Copy Button */}
            <button
              onClick={() => onCopy(
                airdrop.referralLink || airdrop.officialLink,
                `${airdrop.name}-${airdrop.referralLink ? 'referral' : 'official'}`
              )}
              className="px-3 py-2 bg-violet-600/20 hover:bg-violet-600/30 text-violet-400 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 border border-violet-600/30"
            >
              {copiedLink === `${airdrop.name}-${airdrop.referralLink ? 'referral' : 'official'}` ? (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {airdrop.referralLink ? 'Referral' : 'Copy'}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Last Updated */}
        {airdrop.lastUpdated && (
          <div className="mt-3 text-xs text-gray-500 text-center">
            Updated {airdrop.lastUpdated}
          </div>
        )}
      </div>

      {/* Hover Overlay Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
    </div>
  );
};

export default AirdropCard;
