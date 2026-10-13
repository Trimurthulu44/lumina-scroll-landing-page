import React, { useState } from 'react';
import { ArrowUpRight, Send, Check } from 'lucide-react';
import { navLinks } from '../../data/navLinks';
import { validateEmail } from '../../utils/validators';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please provide an email address.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid work email.');
      return;
    }
    setError('');
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer className="relative bg-slate-100 dark:bg-dark-surface/90 border-t border-slate-200 dark:border-slate-800/80 pt-20 pb-12 overflow-hidden">
      {/* Ambient gradient */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-t from-lumina-500/10 to-transparent blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-lumina-600 via-accent-violet to-accent-cyan flex items-center justify-center text-white shadow-md shadow-lumina-600/30">
                <span className="font-extrabold text-sm tracking-tighter">L</span>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                Lumina<span className="text-lumina-500">.</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Award-winning digital product studio. We engineer ultra-fluid web applications, bespoke design systems, and scalable digital architectures for market innovators.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Lumina on GitHub"
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-lumina-500 hover:border-lumina-500 transition-colors font-mono text-xs font-bold"
              >
                GH
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Lumina on X (Twitter)"
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-lumina-500 hover:border-lumina-500 transition-colors font-mono text-xs font-bold"
              >
                𝕏
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Lumina on LinkedIn"
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-lumina-500 hover:border-lumina-500 transition-colors font-mono text-xs font-bold"
              >
                IN
              </a>
            </div>
          </div>

          {/* Quick navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-lumina-600 dark:hover:text-lumina-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.slice(4).map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-lumina-600 dark:hover:text-lumina-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#pricing"
                  className="text-slate-600 dark:text-slate-400 hover:text-lumina-600 dark:hover:text-lumina-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Terms & Privacy</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Quarterly Dispatch
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
              Curated architectural insights, frontend benchmarks, and case studies. Zero spam.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="name@company.com"
                  aria-label="Work email for newsletter"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-dark-card border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lumina-500"
                />
                <button
                  type="submit"
                  disabled={subscribed}
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1 top-1 bottom-1 px-3 rounded-lg bg-lumina-600 hover:bg-lumina-500 text-white flex items-center justify-center transition-colors"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
              {error && <p className="text-xs text-rose-500">{error}</p>}
              {subscribed && (
                <p className="text-xs text-emerald-500 font-medium">
                  Welcome to our private dispatch circle!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Lumina Product Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>WCAG 2.1 AA Compliant</span>
            <span>60fps Hardware Accelerated</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
