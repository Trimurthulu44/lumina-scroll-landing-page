import React, { Suspense, lazy } from 'react';
import { useLenis } from './hooks/useLenis';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { BrandMarquee } from './components/sections/BrandMarquee';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { BackToTop } from './components/layout/BackToTop';
import { Preloader } from './components/layout/Preloader';

// Lazy-load below-the-fold sections for optimized performance & bundle splitting
const Features = lazy(() =>
  import('./components/sections/Features').then((m) => ({ default: m.Features }))
);
const ParallaxBanner = lazy(() =>
  import('./components/sections/ParallaxBanner').then((m) => ({ default: m.ParallaxBanner }))
);
const Stats = lazy(() =>
  import('./components/sections/Stats').then((m) => ({ default: m.Stats }))
);
const Services = lazy(() =>
  import('./components/sections/Services').then((m) => ({ default: m.Services }))
);
const Timeline = lazy(() =>
  import('./components/sections/Timeline').then((m) => ({ default: m.Timeline }))
);
const Testimonials = lazy(() =>
  import('./components/sections/Testimonials').then((m) => ({ default: m.Testimonials }))
);
const Pricing = lazy(() =>
  import('./components/sections/Pricing').then((m) => ({ default: m.Pricing }))
);
const FAQ = lazy(() =>
  import('./components/sections/FAQ').then((m) => ({ default: m.FAQ }))
);
const Contact = lazy(() =>
  import('./components/sections/Contact').then((m) => ({ default: m.Contact }))
);
const Footer = lazy(() =>
  import('./components/layout/Footer').then((m) => ({ default: m.Footer }))
);

const SectionFallback = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-lumina-500 border-t-transparent animate-spin" />
  </div>
);

function App() {
  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <div className="min-h-screen bg-lumina-50 text-slate-900 dark:bg-dark-bg dark:text-slate-100 transition-colors duration-300 selection:bg-lumina-500 selection:text-white relative">
      {/* Page Load Preloader */}
      <Preloader />

      {/* Top Scroll Spring Progress Bar */}
      <ScrollProgress />

      {/* Sticky Glassmorphism Header */}
      <Navbar />

      {/* Main Content Area in Exact Order */}
      <main id="main-content">
        {/* Above the fold (eager load for zero visual delay) */}
        <Hero />
        <BrandMarquee />

        {/* Below the fold (lazy-loaded with Suspense for performance 90+) */}
        <Suspense fallback={<SectionFallback />}>
          <Features />
          <ParallaxBanner />
          <Stats />
          <Services />
          <Timeline />
          <Testimonials />
          <Pricing />
          <FAQ />
          <Contact />
          <Footer />
        </Suspense>
      </main>

      {/* Floating Back To Top button */}
      <BackToTop />
    </div>
  );
}

export default App;
