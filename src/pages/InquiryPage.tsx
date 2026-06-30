import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, BadgeDollarSign, CalendarDays } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function InquiryPage() {
  // Pricing state
  const [projectSize, setProjectSize] = useState<number>(1);
  const [features, setFeatures] = useState({
    cms: false,
    securityHardening: false,
    premiumMotion: false,
    customAPI: false,
  });

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'encrypting' | 'validating' | 'success'>('idle');

  const handleCheckboxChange = (key: keyof typeof features) => {
    setFeatures(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateOutput = () => {
    let basePrice = 2000;
    let baseWeeks = 3;
    let archRec = "Static Webpage (Vite / React) + Edge WAF";

    if (projectSize === 2) {
      basePrice = 4000;
      baseWeeks = 4;
      archRec = "React SPA + Serverless Backend + Edge Functions";
    } else if (projectSize === 3) {
      basePrice = 7500;
      baseWeeks = 6;
      archRec = "Next.js Framework + ISR (Incremental Static Regeneration)";
    } else if (projectSize === 4) {
      basePrice = 13500;
      baseWeeks = 10;
      archRec = "Next.js Stack + Node Microservices + PostgreSQL + Redis";
    }

    if (features.cms) { basePrice += 1800; baseWeeks += 1.5; }
    if (features.securityHardening) { basePrice += 1000; baseWeeks += 1; }
    if (features.premiumMotion) { basePrice += 1200; baseWeeks += 1; }
    if (features.customAPI) { basePrice += 2500; baseWeeks += 2; }

    return {
      price: basePrice.toLocaleString('en-US'),
      weeks: Math.ceil(baseWeeks),
      architecture: archRec
    };
  };

  const output = calculateOutput();

  const getScopeLabel = () => {
    switch (projectSize) {
      case 1: return "Landing Page / Product Visualizer";
      case 2: return "Multi-Page Company Profile / Core Portal";
      case 3: return "E-Commerce System or Custom Admin Panel";
      case 4: return "Full SaaS Platform & Web Application";
      default: return "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setSubmitStatus('encrypting');

    setTimeout(() => {
      setSubmitStatus('validating');
      setTimeout(() => {
        setSubmitStatus('success');
        setIsSubmitting(false);
        setName('');
        setEmail('');
        setMessage('');
      }, 1000);
    }, 1000);
  };

  return (
    <div className="pt-32 pb-24 relative overflow-hidden min-h-screen">
      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-[680px] mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/3 border border-white/5 rounded-full text-xs font-semibold uppercase tracking-wider text-text-secondary mb-4 shadow-sm">
            <BadgeDollarSign className="w-4 h-4 text-[#00f2fe]" />
            Scope Planner
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mb-6">
            Project Planner & Builder
          </h2>
          <p className="text-text-secondary text-sm sm:text-base">
            Adjust the slider and configure add-on checkboxes to compute project Blueprints. 
            Fill out your details to submit the briefing.
          </p>
        </div>

        {/* Planner grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            <Card glowColor="cyan" interactive={false} className="border-white/5 flex flex-col gap-8 text-left">
              {/* Slider */}
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-white">Project Scale</span>
                  <span className="text-xs font-bold text-[#00f2fe] uppercase bg-[#00f2fe]/5 border border-[#00f2fe]/10 px-2 py-0.5 rounded">Option 0{projectSize}</span>
                </div>
                
                <input 
                  type="range" 
                  min="1" 
                  max="4" 
                  value={projectSize} 
                  onChange={(e) => setProjectSize(parseInt(e.target.value))}
                  className="w-full accent-[#00f2fe] cursor-pointer mb-4"
                />

                <div className="p-4 bg-white/2 border border-white/5 rounded-xl">
                  <h4 className="text-sm font-heading font-bold text-white mb-1">{getScopeLabel()}</h4>
                  <p className="text-[11px] text-text-secondary leading-relaxed">
                    Designed from scratch using premium component models for optimized loading speed.
                  </p>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex flex-col">
                <h4 className="text-sm font-semibold text-white mb-4">Add-On Integrations</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <label className="flex items-start gap-3 p-3 rounded-xl bg-white/2 border border-white/5 cursor-pointer hover:border-white/15 select-none transition-colors">
                    <input 
                      type="checkbox" 
                      checked={features.cms} 
                      onChange={() => handleCheckboxChange('cms')} 
                      className="w-4.5 h-4.5 accent-[#e81cff] rounded cursor-pointer mt-0.5"
                    />
                    <div>
                      <span className="text-xs font-bold text-white">Custom CMS Panel</span>
                      <p className="text-[9px] text-text-muted mt-0.5">Easy dashboard to edit text/media contents.</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 rounded-xl bg-white/2 border border-white/5 cursor-pointer hover:border-white/15 select-none transition-colors">
                    <input 
                      type="checkbox" 
                      checked={features.securityHardening} 
                      onChange={() => handleCheckboxChange('securityHardening')} 
                      className="w-4.5 h-4.5 accent-[#00f2fe] rounded cursor-pointer mt-0.5"
                    />
                    <div>
                      <span className="text-xs font-bold text-white">Security Hardening</span>
                      <p className="text-[9px] text-text-muted mt-0.5">Strict parameter schemas & WAF integrations.</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 rounded-xl bg-white/2 border border-white/5 cursor-pointer hover:border-white/15 select-none transition-colors">
                    <input 
                      type="checkbox" 
                      checked={features.premiumMotion} 
                      onChange={() => handleCheckboxChange('premiumMotion')} 
                      className="w-4.5 h-4.5 accent-[#e81cff] rounded cursor-pointer mt-0.5"
                    />
                    <div>
                      <span className="text-xs font-bold text-white">Premium Spotlights</span>
                      <p className="text-[9px] text-text-muted mt-0.5">Interactive hover glows and timeline transitions.</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 rounded-xl bg-white/2 border border-white/5 cursor-pointer hover:border-white/15 select-none transition-colors">
                    <input 
                      type="checkbox" 
                      checked={features.customAPI} 
                      onChange={() => handleCheckboxChange('customAPI')} 
                      className="w-4.5 h-4.5 accent-[#00f2fe] rounded cursor-pointer mt-0.5"
                    />
                    <div>
                      <span className="text-xs font-bold text-white">Relational Database API</span>
                      <p className="text-[9px] text-text-muted mt-0.5">Custom SQL servers and secure data streaming.</p>
                    </div>
                  </label>

                </div>
              </div>
            </Card>
          </div>

          {/* Form Brief & Estimations */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Calculation details panel */}
            <Card glowColor="purple" interactive={false} className="border-white/5 flex flex-col justify-between min-h-[380px] text-left p-6 bg-black/40">
              {submitStatus !== 'success' ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="pb-4 border-b border-white/5 flex flex-col gap-4">
                    
                    {/* Estimates outputs layout */}
                    <div className="flex gap-8">
                      <div>
                        <span className="text-[10px] text-text-muted uppercase tracking-wider flex items-center gap-1"><BadgeDollarSign className="w-3.5 h-3.5" /> Est Investment</span>
                        <h4 className="text-2xl font-extrabold text-white mt-1">${output.price} <span className="text-xs font-medium text-text-muted">USD</span></h4>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted uppercase tracking-wider flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> Timeframe</span>
                        <h4 className="text-2xl font-extrabold text-white mt-1">~{output.weeks} Weeks</h4>
                      </div>
                    </div>

                    <div className="p-3 bg-[#00f2fe]/5 border border-[#00f2fe]/10 rounded-lg">
                      <span className="text-[9px] font-bold text-[#00f2fe] uppercase tracking-widest block mb-1">Architecture Recommendation</span>
                      <code className="text-[10px] text-text-secondary font-mono">{output.architecture}</code>
                    </div>
                  </div>

                  {/* Input fields form */}
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col items-start">
                      <label className="text-[10px] font-semibold text-text-secondary uppercase mb-1.5">[ ] Full Name</label>
                      <input 
                        type="text" 
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Linus Torvalds"
                        className="w-full text-xs px-4 py-3 rounded-lg bg-white/2 border border-white/8 text-white outline-none focus:border-[#00f2fe] focus:shadow-[0_0_10px_rgba(0,242,254,0.1)] transition-all"
                      />
                    </div>

                    <div className="flex flex-col items-start">
                      <label className="text-[10px] font-semibold text-text-secondary uppercase mb-1.5">[ ] Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. linus@kernel.org"
                        className="w-full text-xs px-4 py-3 rounded-lg bg-white/2 border border-white/8 text-white outline-none focus:border-[#00f2fe] focus:shadow-[0_0_10px_rgba(0,242,254,0.1)] transition-all"
                      />
                    </div>

                    <div className="flex flex-col items-start">
                      <label className="text-[10px] font-semibold text-text-secondary uppercase mb-1.5">[ ] Project Brief Details</label>
                      <textarea 
                        rows={3} 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Briefly describe database scale requirements or visual targets..."
                        className="w-full text-xs px-4 py-3 rounded-lg bg-white/2 border border-white/8 text-white outline-none resize-none focus:border-[#e81cff] focus:shadow-[0_0_10px_rgba(232,28,255,0.1)] transition-all"
                      />
                    </div>
                  </div>

                  <Button type="submit" variant="primary" className="w-full flex items-center justify-center gap-2" disabled={isSubmitting}>
                    {submitStatus === 'idle' && (
                      <>
                        <Send className="w-4 h-4" />
                        Secure-Transmit Proposal
                      </>
                    )}
                    {submitStatus === 'encrypting' && 'Encrypting variables package...'}
                    {submitStatus === 'validating' && 'Verifying digital signature...'}
                  </Button>
                </form>
              ) : (
                // Success screen
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="flex flex-col items-center justify-center gap-5 py-12 text-center h-full"
                >
                  <div className="w-14 h-14 rounded-full bg-[#10b981]/5 border border-[#10b981] flex items-center justify-center text-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white">Proposal Transmitted</h3>
                  <p className="text-xs text-text-secondary max-w-[280px] leading-relaxed">
                    Your project details have been cryptographically signed and edge-routed to our developer channels.
                  </p>
                  <Button onClick={() => setSubmitStatus('idle')} variant="secondary" className="mt-4 px-5 py-2 text-xs">
                    Send Another Proposal
                  </Button>
                </motion.div>
              )}
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
