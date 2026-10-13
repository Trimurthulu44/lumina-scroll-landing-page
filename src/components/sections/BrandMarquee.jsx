import React from 'react';
import { trustedBrands } from '../../data/data';

export const BrandMarquee = () => {
  // Duplicate array to create a seamless infinite loop
  const marqueeList = [...trustedBrands, ...trustedBrands, ...trustedBrands];

  return (
    <div className="relative w-full py-10 bg-slate-100/50 dark:bg-dark-surface/40 border-y border-slate-200/60 dark:border-slate-800/60 overflow-hidden select-none">
      {/* Edge gradient masks for smooth fade in/out */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-lumina-50 dark:from-dark-bg to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-lumina-50 dark:from-dark-bg to-transparent z-10" />

      <div className="flex w-max animate-marquee space-x-12 sm:space-x-16 items-center">
        {marqueeList.map((brand, index) => (
          <div
            key={`${brand.name}-${index}`}
            className="flex items-center gap-2 text-sm sm:text-base font-bold tracking-widest text-slate-400 dark:text-slate-500 hover:text-lumina-500 dark:hover:text-lumina-400 transition-colors cursor-pointer"
          >
            <span>{brand.logo}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
