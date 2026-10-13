import React from 'react';
import { Layers, Zap, ShieldCheck, Sparkles, Smartphone, Cpu } from 'lucide-react';
import { features } from '../../data/features';
import { SectionHeading } from '../ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';
import { Reveal } from '../ui/Reveal';

const iconMap = {
  Layers,
  Zap,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Cpu,
};

export const Features = () => {
  return (
    <section id="features" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Product Capabilities"
          title="Engineered for demanding interfaces."
          subtitle="Explore the foundational architectural pillars behind our front-end builds, delivering unprecedented fluid dynamics and enterprise resilience."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Sparkles;

            return (
              <Reveal
                key={feature.title}
                variant="fade-up"
                delay={index * 0.08}
                className="h-full"
              >
                <TiltCard className="p-7 sm:p-8 h-full flex flex-col justify-between">
                  <div>
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-lumina-500/10 text-lumina-600 dark:text-lumina-400 flex items-center justify-center border border-lumina-500/20 shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-100 dark:bg-dark-surface text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                        {feature.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Interactive card bottom accent */}
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center text-xs font-semibold text-lumina-600 dark:text-lumina-400">
                    <span>Explore Component Spec</span>
                    <span className="ml-1 text-base leading-none">→</span>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
