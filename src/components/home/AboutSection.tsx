import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 120,
      damping: 22
    } 
  },
};

const cards = [
  { emoji: "🚀", title: "Website Cepat", description: "Website selesai sesuai target dengan kecepatan loading tinggi." },
  { emoji: "🎨", title: "Website Profesional", description: "Tampilan elegan, modern, dan nyaman dilihat pengunjung." },
  { emoji: "📱", title: "Mudah Digunakan", description: "Sangat nyaman dibuka baik di HP maupun di komputer." },
  { emoji: "🔒", title: "Website Aman", description: "Keamanan terjamin untuk melindungi data penting bisnis Anda." },
  { emoji: "🤝", title: "Membantu Promosi", description: "Membantu promosi usaha Anda agar lebih dikenal luas di internet." },
  { emoji: "💡", title: "Meningkatkan Kepercayaan", description: "Membuat calon pelanggan Anda lebih yakin dan percaya dengan bisnis Anda." },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#050505] text-white overflow-hidden border-t border-white/8">
      <div className="container mx-auto px-6" >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Heading */}
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 font-heading">
            Kenapa Memilih Left Brain Ideas?
          </motion.h2>
 
          {/* Description */}
          <motion.p variants={itemVariants} className="text-[#B5B5B5] text-center max-w-2xl mx-auto mb-16 text-sm sm:text-base leading-relaxed font-sans">
            Kami membantu UMKM, perusahaan, sekolah, organisasi, hingga personal branding memiliki website yang modern, cepat, aman, dan mempermudah promosi online agar pelanggan lebih percaya.
          </motion.p>
 
          {/* Cards Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                className="p-6 bg-[#0B0B0B] border text-center relative overflow-hidden group cursor-pointer transition-colors duration-500"
                style={{
                  borderRadius: '24px',
                  borderColor: 'rgba(255, 255, 255, 0.08)',
                  willChange: 'transform'
                }}
                whileHover={{ 
                  y: -6,
                  scale: 1.015,
                  borderColor: 'rgba(34, 211, 238, 0.3)',
                  boxShadow: '0 12px 32px rgba(34,211,238,0.06)'
                }}
                whileTap={{ scale: 0.985 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 22
                }}
              >
                <div className="text-4xl mb-4 transform transition-transform duration-500 group-hover:scale-110">{card.emoji}</div>
                <h3 className="text-lg font-bold text-white mb-2.5 font-heading transition-colors duration-300 group-hover:text-[#22D3EE]">{card.title}</h3>
                <p className="text-[#B5B5B5] text-xs leading-relaxed font-sans">{card.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
