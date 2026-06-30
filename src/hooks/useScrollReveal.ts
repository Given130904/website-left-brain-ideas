import { useEffect } from 'react';

/**
 * Custom hook to initialize IntersectionObserver for elements with className "reveal".
 * Automatically adds the "visible" class when elements enter the viewport.
 */
export function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve to keep the visible state permanent once triggered
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px', // Triggers when element is 60px inside the window
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}
