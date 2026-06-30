import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, ShieldCheck } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
  const admin1 = "6285718564560";
  const admin2 = "6285782336788";

  const getWhatsAppLink = (number: string) => {
    return `https://wa.me/${number}?text=Halo%20Left%20Brain%20Ideas,%20saya%20ingin%20berkonsultasi%20mengenai%20pembuatan%20website.`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050505]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#0B0B0B] border border-white/8 p-6 shadow-2xl z-10"
          >
            {/* Ambient subtle lighting effect inside the modal */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#22D3EE]/50 to-transparent blur-sm" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-xl bg-[#22D3EE]/10 flex items-center justify-center mb-3">
                <MessageSquare className="w-6 h-6 text-[#22D3EE]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Hubungi Admin</h3>
              <p className="text-sm text-[#B5B5B5]">
                Pilih salah satu admin kami untuk memulai konsultasi WhatsApp langsung.
              </p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-3">
              {/* Admin 1 Option */}
              <a
                href={getWhatsAppLink(admin1)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="group flex items-center justify-between p-4 rounded-xl bg-[#101010] border border-white/5 hover:border-[#22D3EE]/40 hover:bg-[#151515] transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/3 flex items-center justify-center text-sm font-semibold text-white group-hover:bg-[#22D3EE]/10 group-hover:text-[#22D3EE] transition-all">
                    A1
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white text-sm group-hover:text-[#22D3EE] transition-colors">Admin 1</div>
                    <div className="text-xs text-[#B5B5B5]">Respon Cepat</div>
                  </div>
                </div>
                <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#22D3EE]/5 border border-[#22D3EE]/10 text-[#22D3EE] group-hover:bg-[#22D3EE] group-hover:text-black transition-all">
                  Chat Now
                </div>
              </a>

              {/* Admin 2 Option */}
              <a
                href={getWhatsAppLink(admin2)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="group flex items-center justify-between p-4 rounded-xl bg-[#101010] border border-white/5 hover:border-[#22D3EE]/40 hover:bg-[#151515] transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/3 flex items-center justify-center text-sm font-semibold text-white group-hover:bg-[#22D3EE]/10 group-hover:text-[#22D3EE] transition-all">
                    A2
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white text-sm group-hover:text-[#22D3EE] transition-colors">Admin 2</div>
                    <div className="text-xs text-[#B5B5B5]">Konsultasi Detail</div>
                  </div>
                </div>
                <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#22D3EE]/5 border border-[#22D3EE]/10 text-[#22D3EE] group-hover:bg-[#22D3EE] group-hover:text-black transition-all">
                  Chat Now
                </div>
              </a>
            </div>

            {/* Footer Notice */}
            <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-[#6B7280]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#22D3EE]/60" />
              <span>Koneksi aman ke WhatsApp Resmi</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
