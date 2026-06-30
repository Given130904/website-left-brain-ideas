import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import BackgroundGrid from '../components/ui/BackgroundGrid';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from '../components/ui/FloatingWhatsApp';
import Brand3DBackground from '../components/ui/Brand3DBackground';
import CursorExperienceCanvas from '../components/ui/CursorExperienceCanvas';

export default function RootLayout() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {/* Brand 3D Neural Constellation Background */}
      <Brand3DBackground />

      {/* Dynamic Background Grid and Ambient Glows */}
      <BackgroundGrid />

      {/* Interactive Cursor Experience Canvas */}
      <CursorExperienceCanvas />

      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#00f2fe] to-[#e81cff] z-[100] transition-all duration-75 shadow-[0_0_10px_rgba(0,242,254,0.5)]"
        style={{ width: `${scrollProgress}%` }}
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
