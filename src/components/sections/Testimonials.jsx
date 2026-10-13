import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import { SectionHeading } from '../ui/SectionHeading';

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide every 5 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      className="py-24 sm:py-32 bg-slate-100/40 dark:bg-dark-surface/40 border-y border-slate-200/60 dark:border-slate-800/60 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Client Endorsements"
          title="Loved by teams creating the future."
          subtitle="Listen to founders, engineering leads, and product officers sharing their transformation after collaborating with Lumina."
        />

        <div className="relative mt-12">
          {/* Main Slider Carousel Card */}
          <div className="min-h-[290px] sm:min-h-[260px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset }) => {
                  if (offset.x > 50) {
                    handlePrev();
                  } else if (offset.x < -50) {
                    handleNext();
                  }
                }}
                className="w-full cursor-grab active:cursor-grabbing p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-dark-card shadow-2xl relative"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-lumina-500/30 shadow-md"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                        {currentTestimonial.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        {currentTestimonial.role} · <span className="font-semibold text-lumina-600 dark:text-lumina-400">{currentTestimonial.company}</span>
                      </p>
                    </div>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-lumina-500/10 text-lumina-500 flex items-center justify-center shrink-0">
                    <Quote className="w-6 h-6" />
                  </div>
                </div>

                <p className="text-base sm:text-xl text-slate-700 dark:text-slate-200 leading-relaxed italic">
                  "{currentTestimonial.content}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls: Prev/Next & Dots */}
          <div className="flex items-center justify-between mt-8 pt-4">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  type="button"
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8 bg-lumina-600'
                      : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            {/* Prev/Next Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-card text-slate-700 dark:text-slate-200 hover:text-lumina-600 hover:border-lumina-500/50 shadow-sm transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-card text-slate-700 dark:text-slate-200 hover:text-lumina-600 hover:border-lumina-500/50 shadow-sm transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
