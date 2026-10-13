import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { pricingPlans } from '../../data/pricing';
import { SectionHeading } from '../ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Investment Model"
          title="Predictable, high-yield collaboration tiers."
          subtitle="Transparent pricing without hidden overheads. Scale engineering velocity up or down as your roadmap evolves."
        />

        {/* Monthly / Yearly Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`text-sm font-semibold ${!isYearly ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
            Billed Monthly
          </span>

          <button
            type="button"
            role="switch"
            aria-checked={isYearly}
            aria-label="Toggle annual billing discount"
            onClick={() => setIsYearly(!isYearly)}
            className="w-16 h-8 rounded-full bg-slate-200 dark:bg-dark-surface p-1 border border-slate-300 dark:border-slate-700 relative transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lumina-500"
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={`w-6 h-6 rounded-full shadow-md ${
                isYearly ? 'bg-lumina-600 ml-auto' : 'bg-white ml-0'
              }`}
            />
          </button>

          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${isYearly ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
              Billed Annually
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 animate-pulse">
              Save 20%
            </span>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, index) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <Reveal
                key={plan.id}
                variant="fade-up"
                delay={index * 0.12}
                className="h-full flex"
              >
                <TiltCard
                  className={`p-8 sm:p-10 w-full flex flex-col justify-between relative ${
                    plan.highlighted
                      ? 'border-2 border-lumina-500 shadow-2xl shadow-lumina-500/20 bg-lumina-500/[0.03] dark:bg-lumina-950/20'
                      : ''
                  }`}
                >
                  {/* Highlighted Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-lumina-600 to-accent-violet text-white shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{plan.badge}</span>
                    </div>
                  )}

                  <div>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed min-h-[40px]">
                        {plan.description}
                      </p>
                    </div>

                    {/* Animated Price display */}
                    <div className="mb-8 flex items-baseline gap-1">
                      <span className="text-2xl font-semibold text-slate-500 dark:text-slate-400">$</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={price}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.25 }}
                          className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
                        >
                          {price.toLocaleString()}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium ml-1">
                        / month {isYearly && '(billed annually)'}
                      </span>
                    </div>

                    {/* Feature list */}
                    <div className="space-y-3 mb-8 border-t border-slate-100 dark:border-slate-800/80 pt-6">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Included In Sprints
                      </div>
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                          <div className="w-4 h-4 rounded-full bg-lumina-500/10 text-lumina-600 dark:text-lumina-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <a href="#contact" className="w-full">
                    <Button
                      variant={plan.highlighted ? 'gradient' : 'outline'}
                      size="md"
                      className="w-full py-3.5 text-sm font-semibold"
                    >
                      {plan.ctaText}
                    </Button>
                  </a>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
