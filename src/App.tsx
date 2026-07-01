import { useState, useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import GatewayEntrance from './components/ui/LoadingScreen';
import WhatsAppModal from './components/ui/WhatsAppModal';

const SESSION_KEY = 'lbi_gateway_entered';

function App() {
  const alreadyEntered = sessionStorage.getItem(SESSION_KEY) === 'true';

  // Show gateway only once per session
  const [showGateway, setShowGateway] = useState(!alreadyEntered);
  // Site is always mounted; gateway controls visibility via inline style
  const [siteRevealed, setSiteRevealed] = useState(alreadyEntered);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const siteRef = useRef<HTMLDivElement>(null);

  // Called by gateway when the dissolve begins (t=0)
  // We immediately start revealing the site so it fades in in parallel
  const handleGatewayReveal = () => {
    sessionStorage.setItem(SESSION_KEY, 'true');
    setSiteRevealed(true);
    // Remove the gateway overlay after the full animation plays out
    setTimeout(() => setShowGateway(false), 2400);
  };

  // Keyboard shortcut: Enter / Space
  useEffect(() => {
    if (!showGateway) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleGatewayReveal();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showGateway]);

  useEffect(() => {
    const handleOpenModal = () => setIsWhatsAppOpen(true);
    window.addEventListener('open-whatsapp-modal', handleOpenModal);
    return () => window.removeEventListener('open-whatsapp-modal', handleOpenModal);
  }, []);

  return (
    <>
      {/* ── Site – always mounted, revealed in parallel with gateway dissolve ── */}
      <div
        ref={siteRef}
        style={{
          opacity: siteRevealed ? 1 : 0,
          filter: siteRevealed ? 'blur(0px)' : 'blur(12px)',
          transition: 'opacity 1.8s cubic-bezier(0.25,0.46,0.45,0.94), filter 1.8s cubic-bezier(0.25,0.46,0.45,0.94)',
          pointerEvents: siteRevealed ? 'auto' : 'none',
          willChange: 'opacity, filter',
        }}
      >
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>

      {/* ── Gateway overlay ─────────────────────────────────────────────── */}
      {showGateway && (
        <GatewayEntrance
          onEnter={handleGatewayReveal}
          isDissolving={siteRevealed}
        />
      )}

      <WhatsAppModal isOpen={isWhatsAppOpen} onClose={() => setIsWhatsAppOpen(false)} />
    </>
  );
}

export default App;
