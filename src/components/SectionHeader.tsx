import React from 'react';

interface SectionHeaderProps {
  badge?: string;
  badgeColor?: 'amber' | 'blue' | 'green' | 'slate' | string;
  title: string;
  description?: string;
  centered?: boolean;
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  centered = false,
  action,
  className = '',
}) => {
  return (
    <div
      className={`mb-8 ${
        centered ? 'text-center mx-auto max-w-3xl' : 'flex flex-col md:flex-row md:items-end md:justify-between gap-4'
      } ${className}`}
    >
      <div className={centered ? '' : 'max-w-2xl'}>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          {title}
        </h2>
        {description && (
          <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && !centered && (
        <div className="flex-shrink-0 mt-3 md:mt-0">{action}</div>
      )}
    </div>
  );
};
