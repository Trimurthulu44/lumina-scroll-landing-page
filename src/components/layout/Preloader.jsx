import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white select-none"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-lumina-500 via-accent-violet to-accent-cyan flex items-center justify-center shadow-lg shadow-lumina-500/30">
              <span className="text-white font-extrabold text-xl tracking-tighter">L</span>
            </div>
            <span className="text-2xl font-black tracking-wider text-white">LUMINA</span>
          </motion.div>

          {/* Minimalist animated progress track */}
          <div className="w-44 h-1 bg-slate-800 rounded-full mt-6 overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
              className="w-1/2 h-full bg-gradient-to-r from-lumina-500 to-accent-cyan rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
