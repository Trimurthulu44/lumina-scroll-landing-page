import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, MoveRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero = () => {
  const containerRef = useRef(null);

  // Parallax multi-layer scroll hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const blobY1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.1]);

  const headlineWords = "Engineering sensory, high-performance web products for modern scale.".split(" ");

  const handleScrollDown = (e) => {
    e.preventDefault();
    const featuresEl = document.getElementById('features');
    if (featuresEl && window.lenis) {
      window.lenis.scrollTo(featuresEl, { offset: -80, duration: 1.2 });
    } else if (featuresEl) {
      featuresEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden"
    >
      {/* Floating Animated Gradient Orbs (Background Parallax Layers) */}
      <motion.div
        style={{ y: blobY1 }}
        className="pointer-events-none absolute -top-24 left-1/4 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-gradient-to-tr from-lumina-500/25 to-accent-violet/20 blur-[120px] dark:opacity-40 animate-pulse-glow"
      />
      <motion.div
        style={{ y: blobY2 }}
        className="pointer-events-none absolute top-1/3 -right-24 w-80 sm:w-[480px] h-80 sm:h-[480px] rounded-full bg-gradient-to-br from-accent-cyan/20 to-lumina-600/20 blur-[130px] dark:opacity-40 animate-float-slow"
      />
      <div className="pointer-events-none absolute -bottom-10 left-10 w-72 h-72 rounded-full bg-accent-fuchsia/10 blur-[100px] dark:opacity-30" />

      {/* Hero Content Container */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        {/* Floating Top Pill Badge */}
        <motion.div
          style={{ y: badgeY }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-lumina-500/10 text-lumina-600 dark:text-lumina-300 border border-lumina-500/20 shadow-sm backdrop-blur-md mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-lumina-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Now Booking Q3 / Q4 Architecture Sprints</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </motion.div>

        {/* Word-by-Word Staggered Animated Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] sm:leading-[1.1] mb-8">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.55,
                delay: 0.15 + i * 0.045,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={
                word.toLowerCase().includes('sensory') || word.toLowerCase().includes('scale')
                  ? 'bg-gradient-to-r from-lumina-600 via-accent-violet to-accent-cyan bg-clip-text text-transparent inline-block mr-2.5 sm:mr-3.5'
                  : 'inline-block mr-2.5 sm:mr-3.5'
              }
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-10"
        >
          We unite radical visual craftsmanship with strict front-end performance. From fluid scroll-orchestrated web applications to resilient enterprise design systems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#contact" className="w-full sm:w-auto">
            <Button variant="gradient" size="lg" icon={MoveRight} className="w-full sm:w-auto px-8 py-4 text-base shadow-xl shadow-lumina-500/25">
              Explore Collaborative Sprints
            </Button>
          </a>
          <a href="#features" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4 text-base backdrop-blur-md">
              Discover Architecture
            </Button>
          </a>
        </motion.div>

        {/* Floating Scroll-Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 sm:mt-24 flex flex-col items-center justify-center"
        >
          <a
            href="#features"
            onClick={handleScrollDown}
            aria-label="Scroll down to features"
            className="group flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-lumina-600 dark:hover:text-lumina-400 transition-colors"
          >
            <span>Scroll To Experience</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-8 h-12 rounded-full border-2 border-slate-300 dark:border-slate-700 flex items-start justify-center p-1.5 group-hover:border-lumina-500 transition-colors"
            >
              <div className="w-1.5 h-2.5 rounded-full bg-lumina-500" />
            </motion.div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
