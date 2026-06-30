import { motion } from 'framer-motion';

interface CodeTerminalProps {
  title: string;
  lines: string[];
  statusText?: string;
  className?: string;
}

export default function CodeTerminal({
  title,
  lines,
  statusText = "SYSTEM CONFIGURATION: COMPLIANCE OK",
  className = ""
}: CodeTerminalProps) {
  return (
    <div 
      className={`
        font-mono text-xs leading-relaxed bg-[#020204]/90 
        border border-white/7 rounded-xl p-5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]
        flex flex-col gap-4 text-[#a7f3d0] ${className}
      `}
    >
      {/* Header bar */}
      <div className="flex justify-between items-center pb-3 border-b border-white/5 select-none">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
        </div>
        <span className="text-[10px] text-gray-500 uppercase tracking-widest">{title}</span>
      </div>

      {/* Terminal lines log */}
      <div className="flex flex-col gap-2 overflow-x-auto min-h-[140px] justify-start items-start">
        {lines.map((line, idx) => {
          let lineStyle = "text-left font-mono";
          if (line.includes('leftbrain@ideas') || line.includes('$')) {
            lineStyle = "text-gray-400 text-left font-mono";
          } else if (line.includes('[OK]') || line.includes('✔') || line.includes('SECURE') || line.includes('READY')) {
            lineStyle = "text-[#10b981] text-left font-mono";
          } else if (line.includes('[INIT]') || line.includes('Scanning')) {
            lineStyle = "text-[#e81cff] text-left font-mono";
          } else if (line.includes('[COMPLETED]') || line.includes('Result:')) {
            lineStyle = "text-[#00f2fe] text-left font-mono";
          }

          return (
            <motion.div 
              key={idx} 
              className={lineStyle}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {line}
            </motion.div>
          );
        })}
      </div>

      {/* Status Footer bar */}
      <div className="border-t border-white/5 pt-3 text-[10px] text-gray-500 text-left tracking-wide uppercase select-none">
        STATUS: {statusText}
      </div>
    </div>
  );
}
