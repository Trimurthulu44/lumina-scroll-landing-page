import React from 'react';
import { Reveal } from './Reveal';

export const SectionHeading = ({
  badge,
  title,
  subtitle,
  centered = true,
  className = '',
}) => {
  return (
    <div className={`max-w-3xl mb-16 ${centered ? 'mx-auto text-center' : 'text-left'} ${className}`}>
      {badge && (
        <Reveal variant="fade-up" delay={0.05}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-lumina-500/10 text-lumina-600 dark:text-lumina-400 border border-lumina-500/20 mb-4 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-lumina-500 animate-pulse" />
            {badge}
          </div>
        </Reveal>
      )}

      <Reveal variant="fade-up" delay={0.1}>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          {title}
        </h2>
      </Reveal>

      {subtitle && (
        <Reveal variant="fade-up" delay={0.18}>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
};
