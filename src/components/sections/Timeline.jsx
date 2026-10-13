import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { timeline } from '../../data/timeline';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Calendar } from 'lucide-react';

export const Timeline = () => {
  const containerRef = useRef(null);

  // Scroll progress through the entire timeline component
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  // Smooth spring for the center line draw
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="timeline" ref={containerRef} className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Our Journey"
          title="From humble beginnings to global benchmark."
          subtitle="A continuous chronicle of engineering breakthroughs, design iterations, and collaborative partnerships."
        />

        <div className="relative mt-16 sm:mt-24">
          {/* Timeline Center Line Background Guide */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-slate-200 dark:bg-slate-800" />

          {/* Animated Center Line Scaled with Scroll */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-lumina-500 via-accent-violet to-accent-cyan origin-top"
          />

          {/* Timeline Milestones */}
          <div className="space-y-12 sm:space-y-16">
            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.year}
                  className={`relative flex items-center md:justify-between flex-col md:flex-row ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card (Desktop: Alternating, Mobile: Offset right of line) */}
                  <div className="w-full md:w-[45%] pl-14 md:pl-0">
                    <Reveal
                      variant={isEven ? 'fade-left' : 'fade-right'}
                      delay={0.1}
                    >
                      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-dark-card/60 backdrop-blur-md shadow-lg hover:shadow-xl hover:border-lumina-500/30 transition-all duration-300">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-lumina-500/10 text-lumina-600 dark:text-lumina-400 border border-lumina-500/20 mb-3">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.year}</span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                          {item.title}
                        </h3>

                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </Reveal>
                  </div>

                  {/* Center Node Marker */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-white dark:bg-dark-bg border-4 border-lumina-500 shadow-md shadow-lumina-500/40 z-20" />
                  </div>

                  {/* Empty Spacer on opposite side for desktop grid balance */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
