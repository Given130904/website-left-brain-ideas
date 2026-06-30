import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { MessageSquare, Palette, Code2, ShieldCheck, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Badge from '../ui/Badge';

export default function ProcessSection() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the container to animate the timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const steps = [
    {
      key: 'step1',
      icon: <MessageSquare className="w-5 h-5" />,
      fileName: 'konsultasi.json',
      code: `{
  "tujuan": "Memahami Visi Bisnis Anda",
  "biaya": "Gratis 100%",
  "output": "Strategi & Rekomendasi Fitur"
}`
    },
    {
      key: 'step2',
      icon: <Palette className="w-5 h-5" />,
      fileName: 'desain_visual.css',
      code: `.website-anda {
  gaya-visual: "Premium & Modern";
  warna-utama: "Cyan & Deep Black";
  responsif-hp: true;
}`
    },
    {
      key: 'step3',
      icon: <Code2 className="w-5 h-5" />,
      fileName: 'pengembangan.tsx',
      code: `function BangunWebsite() {
  return (
    <Website speed="sub-second" SEO="optimum">
      <TampilanElegan />
    </Website>
  );
}`
    },
    {
      key: 'step4',
      icon: <ShieldCheck className="w-5 h-5" />,
      fileName: 'uji_keamanan.sh',
      code: `$ cek-keamanan --tahap4
✔ Kode Bersih & Rapi
✔ Proteksi Celah Keamanan Aktif
✔ Bebas Risiko Kebocoran Data`
    },
    {
      key: 'step5',
      icon: <Rocket className="w-5 h-5" />,
      fileName: 'peluncuran.yml',
      code: `website:
  status: "ONLINE 🚀"
  server: "Edge CDN Cepat"
  garansi: "Pendampingan Penuh"
`
    }
  ];

  return (
    <section 
      id="process" 
      className="py-24 md:py-32 relative overflow-hidden bg-[#050505] border-t border-white/8"
    >
      <div className="container relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-[680px] mx-auto mb-20 px-4">
          <div className="mb-4 inline-block">
            <Badge variant="muted">{t('process.badge')}</Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white mb-6">
            {t('process.heading')}
          </h2>
          <p className="text-[#B5B5B5] text-sm sm:text-base leading-relaxed">
            {t('process.sub')}
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-[960px] mx-auto">
          
          {/* Central Line (Desktop) / Left Line (Mobile) */}
          <div className="absolute top-4 bottom-4 left-[20px] md:left-1/2 -translate-x-1/2 w-[2px] bg-white/5 pointer-events-none" />
          
          {/* Growing Progress Line */}
          <motion.div 
            className="absolute top-4 bottom-4 left-[20px] md:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#22D3EE] to-[#06B6D4] origin-top pointer-events-none shadow-[0_0_8px_rgba(34,211,238,0.5)]"
            style={{ scaleY }}
          />

          {/* Timeline Items */}
          <div className="relative flex flex-col gap-16 md:gap-24">
            {steps.map((step, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div 
                  key={step.key} 
                  className={`relative flex flex-col w-full md:flex-row ${
                    isLeft ? 'md:justify-start' : 'md:justify-end'
                  }`}
                >
                  {/* Timeline Dot (glowing active index marker) */}
                  <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 top-6 z-20">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      className="w-10 h-10 rounded-full bg-[#050505] border-2 border-white/10 flex items-center justify-center font-heading font-extrabold text-sm text-[#B5B5B5] hover:border-[#22D3EE] hover:text-[#22D3EE] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                      whileHover={{ 
                        scale: 1.15,
                        borderColor: '#22D3EE',
                        color: '#22D3EE',
                        boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)'
                      }}
                    >
                      {idx + 1}
                    </motion.div>
                  </div>

                  {/* Card Container */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-full md:w-[45%] pl-12 md:pl-0 ${
                      isLeft ? 'md:pr-10' : 'md:pl-10'
                    }`}
                  >
                    <motion.div
                      whileHover={{ 
                        y: -6,
                        borderColor: 'rgba(34, 211, 238, 0.25)',
                        boxShadow: '0 12px 32px rgba(34,211,238,0.05)'
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      className="relative group rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] p-6 flex flex-col gap-4 transition-colors duration-500 overflow-hidden"
                      style={{ willChange: 'transform' }}
                    >
                      
                      {/* Top border highlight */}
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#22D3EE]/0 to-transparent group-hover:via-[#22D3EE]/25 transition-all duration-700" />
                      
                      {/* Title + Icon */}
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white/3 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#22D3EE]/10 group-hover:border-[#22D3EE]/30 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] text-[#22D3EE] transition-all duration-500">
                          {step.icon}
                        </div>
                        <h3 className="text-base font-heading font-extrabold text-white group-hover:text-[#22D3EE] transition-colors duration-300">
                          {t(`process.steps.${step.key}.title`)}
                        </h3>
                      </div>
 
                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#B5B5B5] leading-relaxed font-sans text-left">
                        {t(`process.steps.${step.key}.desc`)}
                      </p>
 
                      {/* Code Snippet Box */}
                      <div className="rounded-xl overflow-hidden bg-black/40 border border-white/5 p-4 font-mono text-[11px] leading-relaxed text-left text-gray-400 select-none transition-colors duration-500 group-hover:border-[#22D3EE]/10">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-[9px] text-gray-500 font-sans uppercase tracking-widest font-semibold">
                          <span>{step.fileName}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
                        </div>
                        <pre className="text-[#22D3EE]/80 overflow-x-auto">
                           <code>{step.code}</code>
                        </pre>
                      </div>
 
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
