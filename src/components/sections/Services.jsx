import React from 'react';
import { services } from '../../data/services';
import { SectionHeading } from '../ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';
import { Reveal } from '../ui/Reveal';
import { CheckCircle2 } from 'lucide-react';

export const Services = () => {
  return (
    <section id="services" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Tailored Offerings"
          title="From initial concept to hyper-scale production."
          subtitle="We partner closely with ambitious product founders and scale-ups to craft world-class software that elevates brands."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Reveal
              key={service.step}
              variant={index % 2 === 0 ? 'fade-left' : 'fade-right'}
              delay={0.1 * index}
              className="h-full"
            >
              <TiltCard className="p-8 sm:p-10 h-full flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-extrabold text-slate-300 dark:text-slate-700 group-hover:text-lumina-500 transition-colors">
                      {service.step}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${service.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>

                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                    Technologies & Disciplines
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-dark-surface/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-lumina-500" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
