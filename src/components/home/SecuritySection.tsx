import { useState, useEffect } from 'react';
import { ShieldCheck, Terminal, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CodeTerminal from '../ui/CodeTerminal';
import Button from '../ui/Button';
import { motion } from 'framer-motion';

const CHECKLIST_KEYS = ['code', 'speed', 'data', 'scale', 'longterm'];

const getInitialLines = (lng: string) => {
  return lng === 'id' 
    ? [
        'leftbrain@ideas:~# ./cek-keamanan-website.sh',
        'Menyiapkan parameter pemeriksaan website...',
        'Klik tombol di atas untuk mulai memindai kualitas website.'
      ]
    : [
        'leftbrain@ideas:~# ./scan-storefront.sh',
        'Initializing storefront integrity scan parameters...',
        'Click the button above to begin auditing the system.'
      ];
};

export default function SecuritySection() {
  const { t, i18n } = useTranslation();
  
  const [terminalLines, setTerminalLines] = useState<string[]>(() => getInitialLines(i18n.language));
  const [isAuditing, setIsAuditing] = useState(false);

  // Sync initial lines when language switches and terminal is idle
  useEffect(() => {
    const handleLangChange = (lng: string) => {
      if (!isAuditing) {
        setTerminalLines(getInitialLines(lng));
      }
    };

    i18n.on('languageChanged', handleLangChange);
    return () => {
      i18n.off('languageChanged', handleLangChange);
    };
  }, [i18n, isAuditing]);

  const startTest = () => {
    if (isAuditing) return;
    setIsAuditing(true);

    const isId = i18n.language === 'id';
    
    setTerminalLines(
      isId
        ? [
            'leftbrain@ideas:~# ./cek-keamanan-website.sh',
            '[MEMULAI] Menganalisis kualitas & keamanan website...',
            '[MEMULAI] Menguji kecepatan akses halaman...'
          ]
        : [
            'leftbrain@ideas:~# ./scan-storefront.sh',
            '[RUNNING] Analyzing code structure & vulnerabilities...',
            '[RUNNING] Measuring viewport accessibility speed...'
          ]
    );

    const stepsId = [
      '✓ Struktur Kode: Sangat Rapi & Memenuhi Standar Modern',
      '[MEMULAI] Menguji kecepatan respon halaman...',
      '✓ Kecepatan Website: Optimal (< 1 Detik, Pengunjung Betah)',
      '[MEMULAI] Menganalisis proteksi formulir & database...',
      '✓ Perlindungan Data: Data Pelanggan Terenkripsi & Aman',
      '[MEMULAI] Memeriksa kesiapan pengembangan sistem...',
      '✓ Struktur Modular: Siap Ditambah Fitur Baru Kapan Saja',
      '[MEMULAI] Memeriksa pemakaian teknologi terbaru...',
      '✓ Teknologi Modern: Siap Digunakan Jangka Panjang',
      '[SELESAI] Hasil Audit: Website 100% Aman & Optimal Jangka Panjang!'
    ];

    const stepsEn = [
      '✓ Code Structure: Clean, Neat & Standardized',
      '[RUNNING] Testing viewport loading speed...',
      '✓ Access Speed: Optimal (< 1.0s, Low Bounce Rate)',
      '[RUNNING] Hardening user forms & database portals...',
      '✓ Data Shield: Fully Encrypted & Safe from Threats',
      '[RUNNING] Checking modular component structure...',
      '✓ Scalability: Ready for New Features Anytime',
      '[RUNNING] Evaluating long-term package compatibility...',
      '✓ Core Technology: Built for Long-Term Performance',
      '[FINISHED] Integrity Check: Storefront is Secure, Fast & Scalable!'
    ];

    const targetSteps = isId ? stepsId : stepsEn;

    targetSteps.forEach((step, index) => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, step]);
        if (index === targetSteps.length - 1) {
          setIsAuditing(false);
        }
      }, (index + 1) * 500);
    });
  };

  return (
    <section 
      id="security" 
      className="py-24 md:py-32 relative overflow-hidden bg-[#050505] border-t border-white/8"
    >
      {/* Background radial highlight */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.012)_0%,rgba(16,185,129,0.003)_40%,transparent_70%)] pointer-events-none -z-10" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Specifications Column */}
          <div className="lg:col-span-6 text-left flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#10b981]/5 border border-[#10b981]/15 rounded-full text-xs font-semibold uppercase tracking-wider text-[#10b981] mb-6 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#10b981]" />
              {t('security.badge')}
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white mb-6 leading-tight">
              {t('security.heading')}
            </h2>
            
            <p className="text-[#B5B5B5] text-sm sm:text-base leading-relaxed mb-8 font-sans max-w-[540px]">
              {t('security.sub')}
            </p>

            {/* Checklist */}
            <div className="flex flex-col gap-3.5 w-full max-w-[500px]">
              {CHECKLIST_KEYS.map((key, index) => (
                <motion.div 
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 items-start p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/10 transition-all duration-300 group"
                >
                  <div className="w-5 h-5 rounded-full bg-[#10b981]/10 border border-[#10b981]/25 flex items-center justify-center shrink-0 text-[#10b981] mt-0.5 shadow-[0_0_10px_rgba(16,185,129,0.1)] group-hover:bg-[#10b981]/20 group-hover:border-[#10b981]/40 transition-colors duration-300">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#B5B5B5] leading-relaxed text-left font-sans group-hover:text-white transition-colors duration-300">
                    {t(`security.checklist.${key}`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Terminal Showcase Column */}
          <div className="lg:col-span-6 flex flex-col gap-4 w-full">
            <div className="flex justify-end">
              <Button 
                onClick={startTest} 
                variant="outline" 
                className="text-xs px-5 py-2.5 hover:border-[#10b981]/30 hover:text-white" 
                disabled={isAuditing}
              >
                <Terminal className="w-3.5 h-3.5" />
                {isAuditing ? t('security.running_btn') : t('security.run_btn')}
              </Button>
            </div>

            <div className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-[#10b981]/20 transition-all duration-500 shadow-[0_0_30px_rgba(16,185,129,0.01)]">
              <CodeTerminal 
                title={i18n.language === 'id' ? 'audit_keamanan.sh' : 'security_audit.sh'}
                lines={terminalLines}
                statusText={isAuditing ? (i18n.language === 'id' ? 'MEMINDAI...' : 'RUNNING AUDIT...') : t('security.status')}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
