import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export const Textarea = ({
  label,
  id,
  name,
  rows = 4,
  placeholder = '',
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  className = '',
  ...props
}) => {
  const hasError = Boolean(error && touched);

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id || name}
          className="text-xs font-semibold tracking-wide uppercase text-slate-700 dark:text-slate-300"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative">
        <textarea
          id={id || name}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
          className={`w-full px-4 py-3 rounded-xl text-sm bg-white dark:bg-dark-surface/90 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 border transition-all duration-200 outline-none focus:ring-2 resize-none ${
            hasError
              ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20'
              : 'border-slate-200 dark:border-slate-800 focus:border-lumina-500 focus:ring-lumina-500/20'
          }`}
          {...props}
        />

        {hasError && (
          <div className="pointer-events-none absolute top-3.5 right-3.5 text-rose-500">
            <AlertCircle className="w-4 h-4" />
          </div>
        )}
      </div>

      <AnimatePresence>
        {hasError && (
          <motion.p
            id={`${name}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs font-medium text-rose-500 mt-0.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
