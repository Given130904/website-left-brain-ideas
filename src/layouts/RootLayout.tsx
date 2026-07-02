import { useEffect, useRef, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import BackgroundGrid from '../components/ui/BackgroundGrid';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from '../components/ui/FloatingWhatsApp';
import Brand3DBackground from '../components/ui/Brand3DBackground';
import CursorExperienceCanvas from '../components/ui/CursorExperienceCanvas';
import { useSiteReveal } from '../contexts/SiteRevealContext';

export default function RootLayout() {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const { isSettled } = useSiteReveal();

  const updateScrollProgress = useCallback(() => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll > 0) {
      const value = window.scrollY / totalScroll;
      // Directly mutate the DOM style — avoids React render cycle entirely
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${value})`;
      }
    }
    rafRef.current = null;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // RAF-throttle: only one frame update per paint cycle
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updateScrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [updateScrollProgress]);

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.1, smoothWheel: true }}>
      {/* Brand 3D Neural Constellation Background */}
      <Brand3DBackground />

      {/* Dynamic Background Grid and Ambient Glows */}
      <BackgroundGrid />

      {/* Interactive Cursor Experience Canvas — mounted after site is fully settled */}
      {isSettled && <CursorExperienceCanvas />}

      {/* Scroll Progress Indicator
          Uses transform: scaleX instead of width to stay on the compositor thread.
          Direct DOM mutation via ref avoids all React re-renders on scroll. */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 h-[2px] w-full z-[100] pointer-events-none origin-left"
        style={{
          background: 'linear-gradient(90deg, #00f2fe, #e81cff)',
          transform: 'scaleX(0)',
          willChange: 'transform',
        }}
      />

      {/* Header Navigation Bar */}
      <Navbar />

      {/* Page Contents */}
      <main className="w-full min-h-screen">
        <Outlet />
      </main>

      {/* Footer Bar */}
      <Footer />

      {/* Global Floating WhatsApp button */}
      <FloatingWhatsApp />
    </ReactLenis>
  );
}
