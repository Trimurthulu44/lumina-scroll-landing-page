import { useState, useEffect } from 'react';

export const useActiveSection = (sectionIds = [], options = { rootMargin: '-25% 0px -50% 0px' }) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionIds.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, options]);

  return activeSection;
};
