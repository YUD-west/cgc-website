import React from 'react';

interface SectionHeaderProps {
  badge?: string;
  badgeColor?: 'blue' | 'green' | 'slate';
  title: string;
  description?: string;
  centered?: boolean;
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeColor = 'blue',
  title,
  description,
  centered = false,
  action,
  className = '',
}) => {
  const badgeStyles = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    slate: 'bg-slate-800 text-slate-300 border-slate-700',
  };

  return (
    <div
      className={`mb-12 ${
        centered ? 'text-center mx-auto max-w-3xl' : 'flex flex-col md:flex-row md:items-end md:justify-between gap-4'
      } ${className}`}
    >
      <div className={centered ? '' : 'max-w-2xl'}>
        {badge && (
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border mb-3 ${badgeStyles[badgeColor]}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            <span>{badge}</span>
          </div>
        )}
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && !centered && (
        <div className="flex-shrink-0 mt-4 md:mt-0">{action}</div>
      )}
    </div>
  );
};
