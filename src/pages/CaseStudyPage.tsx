import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import CodeTerminal from '../components/ui/CodeTerminal';
import Badge from '../components/ui/Badge';

export default function CaseStudyPage() {
  const { id } = useParams<{ id: string }>();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Dashboard Chart State
  const [dbFilter, setDbFilter] = useState<'7d' | '30d' | '90d'>('7d');
  const chartPaths = {
    '7d': 'M 20 180 Q 70 140 120 160 T 220 90 T 320 110 T 420 50 T 520 80 T 620 40',
    '30d': 'M 20 120 Q 70 160 120 110 T 220 140 T 320 80 T 420 110 T 520 60 T 620 90',
    '90d': 'M 20 160 Q 70 110 120 140 T 220 70 T 320 120 T 420 90 T 520 40 T 620 50'
  };

  // Vault Security Log State
  const [auditLogs, setAuditLogs] = useState<string[]>([
    'SYSTEM: Active & listening on port 443...',
    'SUITE: TLS_AES_256_GCM_SHA384 handshake confirmed.',
    'READY: Waiting for trigger.'
  ]);
  const [isAuditing, setIsAuditing] = useState(false);

  // Creative Studio Canvas State
  const [hue, setHue] = useState(280);
  const [scale, setScale] = useState(1);

  const handleAudit = () => {
    if (isAuditing) return;
    setIsAuditing(true);
    setAuditLogs([
      'INITIATED: Starting logical validation scanner...',
      'SCANNING: checking route protection modules...',
      'HASHING: verifying signature verification integrity...'
    ]);

    setTimeout(() => {
      setAuditLogs(prev => [
        ...prev,
        'OK: No exposed routes found.',
        'OK: Strict CORS origin configuration verified.',
        'SECURE: System rating A+.'
      ]);
      setIsAuditing(false);
    }, 1500);
  };

  // Return to homepage if project not found
  const validIds = ['weather-analytics', 'apex-dashboard', 'sentinel-vault', 'aura-studio'];
  if (!id || !validIds.includes(id)) {
    return (
      <div className="pt-32 pb-24 text-center container">
        <h2 className="text-2xl text-white mb-6">Case Study Not Found</h2>
        <Button to="/" variant="primary">Return Home</Button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 relative overflow-hidden min-h-screen">
      <div className="container relative z-10">
        
        {/* Back navigation */}
        <Link to="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-12 group text-xs font-semibold uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to landing
        </Link>

        {/* Dynamic content rendering based on URL Param */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Details column */}
          <div className="lg:col-span-5 text-left">
            {id === 'weather-analytics' && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <span className="text-[10px] font-bold text-[#00D4FF] tracking-widest uppercase">CASE STUDY 01 / DATA INGESTION</span>
                <h2 className="text-3xl font-heading font-extrabold text-white mt-4 mb-6">Skyline Weather Analytics</h2>
                <p className="text-text-secondary text-sm leading-relaxed mb-8">
                  A high-performance weather metrics dashboard querying climate API endpoints. 
                  Leverages coordinates logic and responsive wind vector animations to track real-time climate changes.
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8 border-y border-white/5 py-6">
                  <div>
                    <span className="text-2xl font-extrabold text-white">&lt; 100ms</span>
                    <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">API Cache Latency</p>
                  </div>
                  <div>
                    <span className="text-2xl font-extrabold text-white">99.8%</span>
                    <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">Uptime Reliability</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Badge variant="cyan">React SPA</Badge>
                  <Badge variant="purple">Tailwind v4</Badge>
                  <Badge variant="cyan">OpenWeather</Badge>
                </div>
              </motion.div>
            )}

            {id === 'apex-dashboard' && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <span className="text-[10px] font-bold text-[#00f2fe] tracking-widest uppercase">CASE STUDY 01 / FINTECH</span>
                <h2 className="text-3xl font-heading font-extrabold text-white mt-4 mb-6">Apex SaaS Analytics Dashboard</h2>
                <p className="text-text-secondary text-sm leading-relaxed mb-8">
                  A high-frequency dashboard designed with optimized state managers. 
                  Renders dynamic SVG data path changes instantly, tracking complex analytics charts 
                  at 60 frames per second.
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8 border-y border-white/5 py-6">
                  <div>
                    <span className="text-2xl font-extrabold text-white">99.99%</span>
                    <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">Render Accuracy</p>
                  </div>
                  <div>
                    <span className="text-2xl font-extrabold text-white">&lt; 16ms</span>
                    <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">Interactive Frame Time</p>
                  </div>
                </div>

                {/* State selector buttons */}
                <div className="flex gap-2">
                  {(['7d', '30d', '90d'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setDbFilter(filter)}
                      className={`
                        px-4 py-2 text-xs font-semibold rounded-lg border cursor-pointer transition-all duration-300
                        ${dbFilter === filter 
                          ? 'bg-[#00f2fe] border-[#00f2fe] text-[#030303] shadow-lg shadow-[#00f2fe]/20' 
                          : 'bg-white/2 border-white/5 text-text-secondary hover:text-white'}
                      `}
                    >
                      {filter === '7d' ? '7 Days' : filter === '30d' ? '30 Days' : '90 Days'}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {id === 'sentinel-vault' && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <span className="text-[10px] font-bold text-[#00f2fe] tracking-widest uppercase">CASE STUDY 02 / SECURITY</span>
                <h2 className="text-3xl font-heading font-extrabold text-white mt-4 mb-6">Sentinel Credentials Vault</h2>
                <p className="text-text-secondary text-sm leading-relaxed mb-8">
                  A hardened infrastructure database engineered to store microservice credentials. 
                  Protects database tables using encrypted parameter variables, strict input schema controls, 
                  and rate-limit blocks.
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8 border-y border-white/5 py-6">
                  <div>
                    <span className="text-2xl font-extrabold text-white">AES-256</span>
                    <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">Encryption Standard</p>
                  </div>
                  <div>
                    <span className="text-2xl font-extrabold text-white">Zero</span>
                    <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">Exposed Ports</p>
                  </div>
                </div>

                <Button onClick={handleAudit} variant="primary" disabled={isAuditing}>
                  {isAuditing ? 'Testing Integrity...' : 'Simulate Vault Audit'}
                </Button>
              </motion.div>
            )}

            {id === 'aura-studio' && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <span className="text-[10px] font-bold text-[#e81cff] tracking-widest uppercase">CASE STUDY 03 / AESTHETICS</span>
                <h2 className="text-3xl font-heading font-extrabold text-white mt-4 mb-6">Aura Interactive Web Showcase</h2>
                <p className="text-text-secondary text-sm leading-relaxed mb-8">
                  A graphic visualizer canvas compiling liquid animations. responding dynamically 
                  to scale factors and color variations, delivering rich responsive feedback to user interactions.
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8 border-y border-white/5 py-6">
                  <div>
                    <span className="text-2xl font-extrabold text-white">60 FPS</span>
                    <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">Interaction Framerate</p>
                  </div>
                  <div>
                    <span className="text-2xl font-extrabold text-white">WebGL</span>
                    <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">Render Pipeline</p>
                  </div>
                </div>

                {/* Adjustments sliders */}
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col items-start">
                    <label className="flex justify-between w-full text-xs font-semibold text-text-secondary mb-2">
                      <span>Color Hue Adjustment</span>
                      <span className="text-[#e81cff]">{hue}°</span>
                    </label>
                    <input 
                      type="range" 
                      min="0" 
                      max="360" 
                      value={hue} 
                      onChange={(e) => setHue(parseInt(e.target.value))} 
                      className="w-full accent-[#e81cff] cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-col items-start">
                    <label className="flex justify-between w-full text-xs font-semibold text-text-secondary mb-2">
                      <span>Shape Scale</span>
                      <span className="text-[#e81cff]">{scale.toFixed(1)}x</span>
                    </label>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="1.5" 
                      step="0.1" 
                      value={scale} 
                      onChange={(e) => setScale(parseFloat(e.target.value))} 
                      className="w-full accent-[#e81cff] cursor-pointer"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Visual interactive column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Card glowColor={id === 'aura-studio' ? 'purple' : 'cyan'} interactive={false} className="min-h-[440px] flex items-center justify-center p-8 bg-black/40 border-white/5">
              
              {id === 'weather-analytics' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-[500px]">
                  <div className="flex justify-between items-center pb-3 border-b border-white/5 mb-6 text-xs text-text-muted">
                    <span className="text-[#00D4FF] font-bold">● METEO DATA SIMULATOR</span>
                    <span>COORDS: 40.7128° N, 74.0060° W</span>
                  </div>

                  {/* Wind / Temp gauges indicators */}
                  <div className="grid grid-cols-2 gap-4 mb-6 text-left">
                    <div className="p-4 bg-white/2 border border-white/5 rounded-xl">
                      <span className="text-[10px] text-[#94a3b8] block">TEMPERATURE</span>
                      <span className="text-2xl font-bold text-white mt-1 block">22.4°C</span>
                    </div>
                    <div className="p-4 bg-white/2 border border-white/5 rounded-xl">
                      <span className="text-[10px] text-[#94a3b8] block">WIND SPEED</span>
                      <span className="text-2xl font-bold text-[#00D4FF] mt-1 block">14.8 km/h</span>
                    </div>
                  </div>

                  {/* Dynamic wind vector ring visualizer */}
                  <div className="flex items-center justify-center p-6 bg-white/2 border border-white/5 rounded-2xl relative overflow-hidden h-[160px]">
                    <div className="absolute w-24 h-24 rounded-full border border-white/10 flex items-center justify-center">
                      <motion.div 
                        className="w-1.5 h-12 bg-gradient-to-t from-transparent to-[#00D4FF] rounded-full origin-bottom"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                        style={{ y: -24 }}
                      />
                    </div>
                    <span className="text-[10px] text-text-muted absolute bottom-4">VECTOR ANGLE INTERACTIVE SPEED</span>
                  </div>
                </motion.div>
              )}

              {id === 'apex-dashboard' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-[500px]">
                  <div className="flex justify-between items-center pb-3 border-b border-white/5 mb-6 text-xs text-text-muted">
                    <span className="text-[#00f2fe] font-bold">● LIVE APEX TRANSACTION CHART</span>
                    <span>INTERVAL: {dbFilter.toUpperCase()}</span>
                  </div>

                  {/* SVG Chart */}
                  <svg width="100%" height="220" viewBox="0 0 640 220" className="overflow-visible">
                    <line x1="20" y1="50" x2="620" y2="50" stroke="rgba(255,255,255,0.04)" />
                    <line x1="20" y1="100" x2="620" y2="100" stroke="rgba(255,255,255,0.04)" />
                    <line x1="20" y1="150" x2="620" y2="150" stroke="rgba(255,255,255,0.04)" />

                    <path 
                      d={chartPaths[dbFilter]}
                      fill="none"
                      stroke="url(#svgGlow)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />

                    <defs>
                      <linearGradient id="svgGlow" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#00f2fe" />
                        <stop offset="100%" stopColor="#e81cff" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="flex justify-between text-[10px] text-text-muted mt-4">
                    <span>MON</span>
                    <span>TUE</span>
                    <span>WED</span>
                    <span>THU</span>
                    <span>FRI</span>
                    <span>SAT</span>
                    <span>SUN</span>
                  </div>
                </motion.div>
              )}

              {id === 'sentinel-vault' && (
                <div className="w-full max-w-[500px]">
                  <CodeTerminal 
                    title="sentinel_database_audit.sh"
                    lines={auditLogs}
                    statusText="INTEGRITY SHIELD: CODES COMPLIANCE LOCKED"
                  />
                </div>
              )}

              {id === 'aura-studio' && (
                <div className="flex items-center justify-center relative w-full h-[300px]">
                  {/* Dynamic Glowing Sphere */}
                  <div 
                    className="w-48 h-48 rounded-full filter blur-[6px] transition-all duration-300 shadow-2xl"
                    style={{
                      background: `radial-gradient(circle, hsl(${hue}, 85%, 50%) 0%, transparent 70%)`,
                      transform: `scale(${scale})`,
                      boxShadow: `0 0 60px hsl(${hue}, 80%, 40%)`
                    }}
                  />
                  {/* Floating abstract outline */}
                  <motion.div 
                    className="absolute w-24 h-24 border border-white/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    style={{ transform: `scale(${scale * 1.2})` }}
                  />
                </div>
              )}

            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
