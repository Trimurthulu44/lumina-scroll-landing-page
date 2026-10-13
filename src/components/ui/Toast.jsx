import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

export const Toast = ({
  show,
  onClose,
  title = 'Success!',
  message = 'Your message has been dispatched successfully.',
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 rounded-2xl bg-white/95 dark:bg-dark-surface/95 backdrop-blur-xl border border-emerald-500/30 text-slate-900 dark:text-white shadow-2xl shadow-emerald-500/10 max-w-md"
          role="status"
          aria-live="polite"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <div className="flex-1 pr-2">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">{message}</p>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
