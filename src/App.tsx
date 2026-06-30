import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import LoadingScreen from './components/ui/LoadingScreen';
import WhatsAppModal from './components/ui/WhatsAppModal';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setIsWhatsAppOpen(true);
    window.addEventListener('open-whatsapp-modal', handleOpenModal);
    return () => {
      window.removeEventListener('open-whatsapp-modal', handleOpenModal);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}
      
      {/* Renders Router routes underneath after compilation */}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>

      <WhatsAppModal isOpen={isWhatsAppOpen} onClose={() => setIsWhatsAppOpen(false)} />
    </>
  );
}

export default App;
