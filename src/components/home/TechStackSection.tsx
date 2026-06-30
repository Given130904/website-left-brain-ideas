import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Badge from '../ui/Badge';

export default function TechStackSection() {
  const { t } = useTranslation();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const scrollProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any }
  };

  const techStack = [
    // Frontend
    {
      name: 'HTML5', category: 'Frontend',
      color: '#E34F26',
      svg: (
        <svg viewBox="0 0 32 32" width="100%" height="100%">
          <path fill="#E34F26" d="M5.902 27.201L4 5.001h24l-1.903 22.197L15.985 30z"/>
          <path fill="#EF652A" d="M16 27.854l8.17-2.66 1.626-18.193H16z"/>
          <path fill="#fff" d="M16 13.001h-4.09l-.282-3.244H16V6.548H8.357l.074.828.754 8.625H16zm0 8.872l-.014.004-3.442-.929-.22-2.465H9.114l.434 4.874 6.436 1.788.016-.005z"/>
          <path fill="#fff" d="M15.989 13.001v3.208H19.9l-.372 4.141-3.539.956v3.324l6.44-1.785.047-.528.738-8.26.077-.856H15.99z"/>
        </svg>
      )
    },
    {
      name: 'CSS3', category: 'Frontend',
      color: '#1572B6',
      svg: (
        <svg viewBox="0 0 32 32" width="100%" height="100%">
          <path fill="#1572B6" d="M5.902 27.201L4 5.001h24l-1.903 22.197L15.985 30z"/>
          <path fill="#33A9DC" d="M16 27.854l8.17-2.66 1.626-18.193H16z"/>
          <path fill="#fff" d="M16 13.001H9.817l.21 2.21H16V13.001zm0-4.453H9.397l.21 2.212H16V8.548zm0 8.891h-5.786l.303 3.17 5.483 1.53V17.44z"/>
          <path fill="#fff" d="M16 17.439v2.684l-.014.004-3.442-.929-.22-2.465h-2.21l.434 4.874 5.452 1.513V17.44z"/>
        </svg>
      )
    },
    {
      name: 'Tailwind CSS', category: 'Frontend',
      color: '#06B6D4',
      svg: (
        <svg viewBox="0 0 32 32" width="100%" height="100%">
          <path fill="#06B6D4" d="M16 7C9.5 7 8.3 10 8.3 10s-1.3 3.3 2.7 4.3c1.3.3 2.3.6 3 .7.7.1 1 .7 1 1.3s-1 2-3 2C9 18.3 8 16 8 16l-2 1.3S7.3 21 12 21c2.7 0 5.3-1.3 5.3-4 0-2.3-1.7-3.3-4-4-1.3-.3-2-.7-2-1.3s.7-1 2-1c2 0 3 1.3 3 1.3l2-1.3S17.3 7 16 7zm6.7 4c-2.7 0-5.3 1.3-5.3 4 0 2.3 1.7 3.3 4 4 1.3.3 2 .7 2 1.3s-.7 1-2 1c-2 0-3-1.3-3-1.3L16.3 21s1.7 4 5.7 4 5.3-3 5.3-4c0-2.3-1.7-3.3-4-4-1.3-.3-2-.7-2-1.3s.7-1 2-1c2 0 3 1.3 3 1.3l2-1.3S24 11 22.7 11z"/>
        </svg>
      )
    },
    {
      name: 'JavaScript', category: 'Frontend',
      color: '#F7DF1E',
      svg: (
        <svg viewBox="0 0 32 32" width="100%" height="100%">
          <rect width="32" height="32" fill="#F7DF1E" rx="2"/>
          <path fill="#000" d="M9.5 24.5l1.7-1.04c.33.59.63 1.09 1.34 1.09.69 0 1.13-.27 1.13-1.33V17h2.1v6.26c0 2.19-1.28 3.19-3.15 3.19-1.69 0-2.67-.88-3.12-1.95zm7.87-.31l1.7-1.02c.44.72 1.02 1.25 2.04 1.25.86 0 1.4-.43 1.4-1.02 0-.71-.56-.96-1.51-1.37l-.52-.22c-1.5-.64-2.49-1.44-2.49-3.13 0-1.56 1.19-2.74 3.05-2.74 1.32 0 2.27.46 2.95 1.66l-1.62 1.04c-.36-.64-.74-.89-1.33-.89-.6 0-.98.38-.98.89 0 .62.38.87 1.27 1.25l.52.22c1.77.76 2.76 1.53 2.76 3.27 0 1.87-1.47 2.89-3.44 2.89-1.93 0-3.18-.92-3.8-2.08z"/>
        </svg>
      )
    },
    {
      name: 'React', category: 'Frontend',
      color: '#61DAFB',
      svg: (
        <svg viewBox="0 0 32 32" width="100%" height="100%">
          <circle cx="16" cy="16" r="3" fill="#61DAFB"/>
          <ellipse cx="16" cy="16" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1.3"/>
          <ellipse cx="16" cy="16" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1.3" transform="rotate(60 16 16)"/>
          <ellipse cx="16" cy="16" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1.3" transform="rotate(120 16 16)"/>
        </svg>
      )
    },
    {
      name: 'Next.js', category: 'Frontend',
      color: '#FFFFFF',
      svg: (
        <svg viewBox="0 0 32 32" width="100%" height="100%">
          <circle cx="16" cy="16" r="14" fill="#000"/>
          <path fill="#fff" d="M19.5 21.5L12.5 12h-2v8h1.5v-6l6.5 9H20V12h-1.5v9.5z"/>
        </svg>
      )
    },
    // Backend
    {
      name: 'Laravel', category: 'Backend',
      color: '#FF2D20',
      svg: (
        <svg viewBox="0 0 32 32" width="100%" height="100%">
          <path fill="#FF2D20" d="M29 8.3L16.5 3.2c-.3-.1-.7-.1-1 0L3 8.3c-.6.2-1 .8-1 1.4v12.5c0 .6.4 1.2 1 1.4l12.5 5.1c.3.1.7.1 1 0L29 23.6c.6-.2 1-.8 1-1.4V9.7c0-.6-.4-1.2-1-1.4zM16 6.2l9.5 3.9-9.5 3.9-9.5-3.9 9.5-3.9zm-10 7.2l9 3.7v9.1l-9-3.7v-9.1zm11 12.8v-9.1l9-3.7v9.1l-9 3.7z"/>
        </svg>
      )
    },
    {
      name: 'PHP', category: 'Backend',
      color: '#8993BE',
      svg: (
        <svg viewBox="0 0 32 32" width="100%" height="100%">
          <ellipse cx="16" cy="16" rx="14" ry="9" fill="#8993BE"/>
          <path fill="#fff" d="M8.5 12.5h2.8c1.7 0 2.7.8 2.7 2.3S13 17 11.3 17H10v2.5H8.5v-7zm1.5 3.3h1.2c.9 0 1.3-.4 1.3-1s-.4-1-1.3-1H10v2zm5.5-3.3h1l.6 4 .6-4h1l.6 4 .6-4h1l-.9 7h-1.1l-.7-4.2-.7 4.2h-1.1l-.9-7zm8.5 0h2.8c1.7 0 2.7.8 2.7 2.3S25.8 17 24.1 17h-1.3v2.5h-1.5v-7zm1.5 3.3h1.2c.9 0 1.3-.4 1.3-1s-.4-1-1.3-1h-1.2v2z"/>
        </svg>
      )
    },
    {
      name: 'Python', category: 'Backend',
      color: '#3776AB',
      svg: (
        <svg viewBox="0 0 32 32" width="100%" height="100%">
          <defs><linearGradient id="pyg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#5A9FD4"/><stop offset="100%" stopColor="#3776AB"/></linearGradient></defs>
          <path fill="url(#pyg)" d="M16 4c-6.4 0-6 2.8-6 2.8v3h6.2v1H7.6S4 10.4 4 16.2s3.2 5.8 3.2 5.8H9v-2.8s-.1-3.2 3.2-3.2h5.5s3.1.1 3.1-3V7.8S21.4 4 16 4zm-2 2.3c.6 0 1 .5 1 1s-.4 1-1 1-.9-.5-.9-1 .3-1 .9-1z"/>
          <path fill="#FFD43B" d="M16 28c6.4 0 6-2.8 6-2.8v-3h-6.2v-1h8.6S28 21.6 28 15.8s-3.2-5.8-3.2-5.8H23v2.8s.1 3.2-3.2 3.2h-5.5s-3.1-.1-3.1 3v4.2S10.6 28 16 28zm2-2.3c-.6 0-1-.5-1-1s.4-1 1-1 .9.5.9 1-.3 1-.9 1z"/>
        </svg>
      )
    },
    {
      name: 'MySQL', category: 'Backend',
      color: '#00758F',
      svg: (
        <svg viewBox="0 0 32 32" width="100%" height="100%">
          <path fill="#00758F" d="M5 8.5C5 7.1 9.9 6 16 6s11 1.1 11 2.5v3c0 1.4-4.9 2.5-11 2.5S5 12.9 5 11.5v-3z"/>
          <path fill="#00758F" d="M5 11.5v3c0 1.4 4.9 2.5 11 2.5s11-1.1 11-2.5v-3c0 1.4-4.9 2.5-11 2.5S5 12.9 5 11.5z"/>
          <path fill="#00758F" d="M5 14.5v3c0 1.4 4.9 2.5 11 2.5s11-1.1 11-2.5v-3c0 1.4-4.9 2.5-11 2.5S5 15.9 5 14.5z"/>
          <path fill="#00758F" d="M5 17.5v3c0 1.4 4.9 2.5 11 2.5s11-1.1 11-2.5v-3c0 1.4-4.9 2.5-11 2.5S5 18.9 5 17.5z"/>
          <path fill="#00758F" d="M5 20.5v3c0 1.4 4.9 2.5 11 2.5s11-1.1 11-2.5v-3c0 1.4-4.9 2.5-11 2.5S5 21.9 5 20.5z"/>
          <ellipse cx="16" cy="8.5" rx="11" ry="2.5" fill="#2BAAFF" opacity="0.7"/>
        </svg>
      )
    },
    {
      name: 'Kotlin', category: 'Mobile',
      color: '#7F52FF',
      svg: (
        <svg viewBox="0 0 32 32" width="100%" height="100%">
          <defs><linearGradient id="ktg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#E44857"/><stop offset="50%" stopColor="#C711E1"/><stop offset="100%" stopColor="#7F52FF"/></linearGradient></defs>
          <path fill="url(#ktg)" d="M4 4h12L4 16zM4 16l12-12 12 12L16 28z"/>
        </svg>
      )
    },
    // Design
    {
      name: 'Figma', category: 'Design',
      color: '#F24E1E',
      svg: (
        <svg viewBox="0 0 32 32" width="100%" height="100%">
          <path fill="#F24E1E" d="M11 4h5v10h-5a5 5 0 0 1 0-10z"/>
          <path fill="#FF7262" d="M11 14h5v10a5 5 0 0 1-5-10z"/>
          <path fill="#A259FF" d="M16 4h5a5 5 0 0 1 0 10h-5z"/>
          <circle cx="21" cy="19" r="5" fill="#1ABCFE"/>
        </svg>
      )
    },
    {
      name: 'Photoshop', category: 'Design',
      color: '#31A8FF',
      svg: (
        <svg viewBox="0 0 32 32" width="100%" height="100%">
          <rect width="32" height="32" rx="5" fill="#001E36"/>
          <path fill="#31A8FF" d="M7 8.5v15h3.5v-5.5H13c2.5 0 4.5-1.5 4.5-4.5S15.5 9 13 9H7zm3.5 3H13c1.1 0 1.5.7 1.5 1.5S14.1 15.5 13 15.5h-2.5v-4zm8-2.5h3c4 0 6.5 2 6.5 6.5s-2.5 6.5-6.5 6.5h-3v-13zm3.5 10.5h-.5V12h.5c2.2 0 3 1.5 3 3.5s-.8 3.5-3 3.5z"/>
        </svg>
      )
    },
    {
      name: 'Illustrator', category: 'Design',
      color: '#FF9A00',
      svg: (
        <svg viewBox="0 0 32 32" width="100%" height="100%">
          <rect width="32" height="32" rx="5" fill="#330000"/>
          <path fill="#FF9A00" d="M8 23l2.5-6.5h7L20 23h2.5L15.5 8h-2.5L6 23H8zm4-9.5l2.5 6h-5l2.5-6zm11.5-5.5h-2v14h2z"/>
        </svg>
      )
    },
    {
      name: 'Premiere Pro', category: 'Video',
      color: '#EA77FF',
      svg: (
        <svg viewBox="0 0 32 32" width="100%" height="100%">
          <rect width="32" height="32" rx="5" fill="#00005B"/>
          <path fill="#EA77FF" d="M7 9.5v13h3.5v-3.5H13c2.5 0 4.5-1.5 4.5-4.5S15.5 10 13 10H7zm3.5 3H13c1 0 1.5.6 1.5 1.5S14 16 13 16h-2.5v-3.5zm9.5-3h-3v13h3c4 0 6-2 6-6.5s-2-6.5-6-6.5zm.5 10h-.5V12h.5c2 0 3 1.4 3 4s-1 4-3 4z"/>
        </svg>
      )
    },
    {
      name: 'After Effects', category: 'Video',
      color: '#9999FF',
      svg: (
        <svg viewBox="0 0 32 32" width="100%" height="100%">
          <rect width="32" height="32" rx="5" fill="#00005B"/>
          <path fill="#9999FF" d="M7 22.5h2.5L10.5 20h5l1 2.5H19L14.5 9.5h-3zm5-10l1.8 5H10.2zm9.5-3.5h-2v12h2v-5h4v-2h-4z"/>
        </svg>
      )
    },
    {
      name: 'CapCut', category: 'Video',
      color: '#FFFFFF',
      svg: (
        <svg viewBox="0 0 32 32" width="100%" height="100%">
          <rect width="32" height="32" rx="6" fill="#000"/>
          <circle cx="16" cy="16" r="10" fill="none" stroke="#fff" strokeWidth="2"/>
          <path fill="#fff" d="M14 11.5l8 4.5-8 4.5z"/>
        </svg>
      )
    },
    {
      name: 'Canva', category: 'Design',
      color: '#00C4CC',
      svg: (
        <svg viewBox="0 0 32 32" width="100%" height="100%">
          <circle cx="16" cy="16" r="14" fill="#00C4CC"/>
          <path fill="#fff" d="M20.5 10.5c-1.5 0-2.5.7-3 1.5-.5-.8-1.5-1.5-3-1.5-2 0-3.5 1.5-3.5 3.5 0 3 6.5 8 6.5 8s6.5-5 6.5-8c0-2-1.5-3.5-3.5-3.5z"/>
        </svg>
      )
    },
  ];

  const categories = ['Frontend', 'Backend', 'Mobile', 'Design', 'Video'];

  const getCategoryColor = (cat: string) => {
    const map: Record<string, string> = {
      'Frontend': '#22D3EE',
      'Backend': '#A78BFA',
      'Mobile': '#34D399',
      'Design': '#F472B6',
      'Video': '#FB923C',
    };
    return map[cat] || '#B5B5B5';
  };

  return (
    <section
      id="tech-stack"
      className="py-28 relative overflow-hidden bg-[#050505] border-t border-white/8"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.02)_0%,transparent_100%)] filter blur-[100px] pointer-events-none" />

      <div className="container relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-[680px] mx-auto mb-16">
          <motion.div {...scrollProps} className="mb-4">
            <Badge variant="muted">{t('techstack.badge')}</Badge>
          </motion.div>

          <motion.h2
            {...scrollProps}
            transition={{ ...scrollProps.transition, delay: 0.1 } as any}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight mb-4"
          >
            {t('techstack.heading')}
          </motion.h2>
        </div>

        {/* Tech Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {techStack.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] as any }}
              onHoverStart={() => setHoveredCard(tech.name)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative group cursor-default"
            >
              <motion.div
                className="flex flex-col items-center gap-3 p-4 rounded-2xl border bg-[#0B0B0B]"
                animate={{
                  borderColor: hoveredCard === tech.name
                    ? `${tech.color}55`
                    : 'rgba(255,255,255,0.06)',
                  boxShadow: hoveredCard === tech.name
                    ? `0 0 20px ${tech.color}20, 0 8px 32px rgba(0,0,0,0.4)`
                    : '0 2px 8px rgba(0,0,0,0.2)',
                  y: hoveredCard === tech.name ? -4 : 0,
                  scale: hoveredCard === tech.name ? 1.03 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-xl p-2 transition-all duration-300"
                  style={{
                    background: hoveredCard === tech.name
                      ? `${tech.color}12`
                      : 'rgba(255,255,255,0.03)',
                  }}
                >
                  {tech.svg}
                </div>

                {/* Name */}
                <span className="text-xs font-semibold text-white text-center leading-tight">
                  {tech.name}
                </span>

                {/* Category badge */}
                <span
                  className="text-[9px] font-medium px-2 py-0.5 rounded-full"
                  style={{
                    color: getCategoryColor(tech.category),
                    background: `${getCategoryColor(tech.category)}12`,
                    border: `1px solid ${getCategoryColor(tech.category)}22`,
                  }}
                >
                  {tech.category}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Category legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          {categories.map((cat) => (
            <div key={cat} className="flex items-center gap-1.5 text-xs text-[#B5B5B5]">
              <span className="w-2 h-2 rounded-full" style={{ background: getCategoryColor(cat) }} />
              {cat}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
