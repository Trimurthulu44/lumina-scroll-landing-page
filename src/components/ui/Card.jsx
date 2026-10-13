import React from 'react';

export const Card = ({
  children,
  className = '',
  hover = true,
  ...props
}) => {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-dark-card/60 backdrop-blur-md p-6 sm:p-8 transition-all duration-300 ${
        hover ? 'hover:shadow-xl hover:border-lumina-500/40 hover:-translate-y-1' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
