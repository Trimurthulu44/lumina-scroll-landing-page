import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navLinks } from '../../data/navLinks';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useActiveSection } from '../../hooks/useActiveSection';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Extract section IDs from links
  const sectionIds = navLinks.map((link) => link.href.replace('#', ''));
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavLinkClick = (e, href) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const targetElement = document.querySelector(href);
      if (targetElement && window.lenis) {
        e.preventDefault();
        window.lenis.scrollTo(targetElement, { offset: -80, duration: 1.2 });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-white/75 dark:bg-dark-bg/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/80 shadow-sm'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-lumina-500 rounded-lg p-1"
              aria-label="Lumina Home"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-lumina-600 via-accent-violet to-accent-cyan flex items-center justify-center text-white shadow-md shadow-lumina-600/30 group-hover:scale-105 transition-transform duration-200">
                <span className="font-extrabold text-base tracking-tighter">L</span>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                Lumina<span className="text-lumina-500">.</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100/60 dark:bg-dark-surface/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/50 dark:border-slate-800/60 shadow-sm" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavLinkClick(e, link.href)}
                    className={`relative px-4 py-1.5 text-xs font-semibold tracking-wide rounded-full transition-colors ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 bg-lumina-600 rounded-full shadow-sm"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </a>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <a
                href="#contact"
                onClick={(e) => handleNavLinkClick(e, '#contact')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-lumina-600 hover:bg-lumina-500 text-white shadow-md shadow-lumina-600/25 transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>Get Started</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Actions: ThemeToggle + Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation-drawer"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-dark-surface/80 text-slate-700 dark:text-slate-200 hover:text-lumina-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-lumina-500"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop & Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              id="mobile-navigation-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 sm:w-80 bg-white dark:bg-dark-surface p-6 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between lg:hidden overflow-y-auto"
              aria-label="Mobile Navigation Drawer"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-lumina-600 to-accent-cyan flex items-center justify-center text-white font-extrabold text-sm">
                      L
                    </div>
                    <span className="font-extrabold text-lg text-slate-900 dark:text-white">
                      Lumina
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close navigation"
                    className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="mt-6 flex flex-col gap-1.5" aria-label="Mobile Links">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href.replace('#', '');
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavLinkClick(e, link.href)}
                        className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                          isActive
                            ? 'bg-lumina-500/10 text-lumina-600 dark:text-lumina-400 font-bold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-lumina-500" />}
                      </a>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <a
                  href="#contact"
                  onClick={(e) => handleNavLinkClick(e, '#contact')}
                  className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold py-3 px-4 rounded-xl bg-lumina-600 hover:bg-lumina-500 text-white shadow-lg shadow-lumina-600/25 transition-all text-center"
                >
                  <span>Start A Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <p className="text-xs text-center text-slate-400">
                  Crafted for high-velocity software leaders.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
