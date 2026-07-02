import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import WhatsAppModal from './components/ui/WhatsAppModal';
import { SiteRevealContext } from './contexts/SiteRevealContext';

function App() {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setIsWhatsAppOpen(true);
    window.addEventListener('open-whatsapp-modal', handleOpenModal);
    return () => window.removeEventListener('open-whatsapp-modal', handleOpenModal);
  }, []);

  return (
    <>
      {/* Site loads immediately as revealed and settled */}
      <SiteRevealContext.Provider value={{ isRevealed: true, isCinematic: false, isSettled: true }}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </SiteRevealContext.Provider>

      <WhatsAppModal isOpen={isWhatsAppOpen} onClose={() => setIsWhatsAppOpen(false)} />
    </>
  );
}

export default App;
