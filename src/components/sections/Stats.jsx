import React from 'react';
import { stats } from '../../data/data';
import { Counter } from '../ui/Counter';
import { Reveal } from '../ui/Reveal';

export const Stats = () => {
  return (
    <section id="stats" className="py-20 bg-white/40 dark:bg-dark-surface/30 border-y border-slate-200/60 dark:border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
          {stats.map((item, index) => (
            <Reveal
              key={item.label}
              variant="fade-up"
              delay={index * 0.1}
              className="flex flex-col items-center p-4"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
                <Counter
                  target={item.value}
                  suffix={item.suffix}
                  duration={2.2}
                  className="bg-gradient-to-r from-lumina-600 via-accent-violet to-accent-cyan bg-clip-text text-transparent"
                />
              </div>

              <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
                {item.label}
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 max-w-[180px]">
                {item.description}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
