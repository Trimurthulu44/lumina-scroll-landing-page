import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const ParallaxBanner = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax transform layers
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['25%', '-25%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 0.3]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[460px] sm:min-h-[540px] flex items-center justify-center overflow-hidden my-16 select-none"
    >
      {/* Background Graphic Parallax Plane */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-x-0 -top-24 -bottom-24 bg-gradient-to-tr from-slate-950 via-lumina-950 to-slate-900 pointer-events-none"
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.25) 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />

        {/* Dynamic luminous glow rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-lumina-500/30 via-accent-violet/30 to-accent-cyan/20 blur-[130px]" />
      </motion.div>

      {/* Dim overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black/40 pointer-events-none"
      />

      {/* Foreground Content Moving at different rate */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent-cyan mb-4 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md">
          Continuous Velocity
        </span>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-6">
          Ready to leave generic templates behind?
        </h2>

        <p className="max-w-xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8">
          We combine cutting-edge interaction design with clean, scalable codebases to build products that command attention and drive retention.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact">
            <Button variant="gradient" size="lg" icon={ArrowUpRight}>
              Schedule Project Discussion
            </Button>
          </a>
        </div>
      </motion.div>
    </section>
  );
};
