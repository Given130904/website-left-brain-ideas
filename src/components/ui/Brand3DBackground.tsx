import { useEffect, useRef, useState } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Particle3D {
  x: number;
  y: number;
  z: number;
  targets: Point3D[];
  color: string;
  size: number;
  speed: number;
  phase: number;
  pulseOffset: number;
}

const PARTICLE_COUNT = 150;

// Generate 3D target coordinates for the 6 scroll states
const generateParticles = (): Particle3D[] => {
  const particles: Particle3D[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // State 0 (Hero): Brain shape (two hemispheres)
    const isLeftLobe = Math.random() > 0.5;
    const lobeX = isLeftLobe ? -35 : 35;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    const r = 35 + Math.random() * 22;
    const s0 = {
      x: lobeX + Math.sin(phi) * Math.cos(theta) * r * 0.75,
      y: Math.sin(phi) * Math.sin(theta) * r * 1.1,
      z: Math.cos(phi) * r * 0.75
    };

    // State 1 (About): Expanded network nodes
    const s1 = {
      x: (Math.random() - 0.5) * 320,
      y: (Math.random() - 0.5) * 220,
      z: (Math.random() - 0.5) * 120
    };

    // State 2 (Services): Branching circuit lines
    const channel = Math.floor(Math.random() * 10) - 5;
    const isHorizontal = Math.random() > 0.5;
    const s2 = {
      x: isHorizontal ? (Math.random() - 0.5) * 440 : channel * 40,
      y: isHorizontal ? channel * 35 : (Math.random() - 0.5) * 340,
      z: (Math.random() - 0.5) * 30
    };

    // State 3 (Portfolio): Flat perspective grid plane
    const cols = 15;
    const colIdx = i % cols;
    const rowIdx = Math.floor(i / cols);
    const s3 = {
      x: (colIdx - cols / 2) * 36,
      y: 75 + Math.sin(colIdx * 0.6) * 8, // subtle floor wave
      z: (rowIdx - 5) * 42
    };

    // State 4 (Testimonial): Drifting stardust nodes
    const s4 = {
      x: (Math.random() - 0.5) * 340,
      y: -180 + Math.random() * 320,
      z: (Math.random() - 0.5) * 140
    };

    // State 5 (Footer): Central spiral core logo helix
    const tHelix = (i / PARTICLE_COUNT) * Math.PI * 10;
    const rHelix = 24 + Math.sin(tHelix * 0.5) * 6;
    const s5 = {
      x: Math.cos(tHelix) * rHelix,
      y: (i / PARTICLE_COUNT - 0.5) * 110,
      z: Math.sin(tHelix) * rHelix
    };

    particles.push({
      x: s0.x,
      y: s0.y,
      z: s0.z,
      targets: [s0, s1, s2, s3, s4, s5],
      color: isLeftLobe ? 'rgba(34, 211, 238, 0.45)' : 'rgba(99, 102, 241, 0.4)',
      size: Math.random() * 1.6 + 0.8,
      speed: 0.15 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2,
      pulseOffset: Math.random()
    });
  }
  return particles;
};

export default function Brand3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(window.scrollY / docHeight);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mouse displacement parallax tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Main Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles = generateParticles();
    
    // Rotate orbits for Hero stack logo
    const orbits = [
      { radius: 100, speed: 0.0004, color: 'rgba(34, 211, 238, 0.15)', name: 'React' },
      { radius: 130, speed: -0.0003, color: 'rgba(99, 102, 241, 0.15)', name: 'Secure' },
      { radius: 160, speed: 0.0002, color: 'rgba(34, 211, 238, 0.12)', name: 'Fast' }
    ];

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      if (document.hidden) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      ctx.clearRect(0, 0, width, height);

      // Determine active morph indexes based on scrollFraction
      const morphProgress = scrollProgress * 5; // 5 intervals for 6 states
      const stateIdx = Math.floor(morphProgress);
      const nextStateIdx = Math.min(stateIdx + 1, 5);
      const interpolation = morphProgress - stateIdx;

      // Base 3D rotation angles (time-based + mouse displacement parallax)
      const time = Date.now();
      const rotY = time * 0.00015 + mousePos.x * 0.12;
      const rotX = 0.2 + time * 0.00005 + mousePos.y * 0.08;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const projectedPoints: { x: number; y: number; z: number; size: number; color: string }[] = [];

      // Update and project particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const startVal = p.targets[stateIdx];
        const endVal = p.targets[nextStateIdx];

        // Linear interpolation between targets
        let targetX = startVal.x + (endVal.x - startVal.x) * interpolation;
        let targetY = startVal.y + (endVal.y - startVal.y) * interpolation;
        let targetZ = startVal.z + (endVal.z - startVal.z) * interpolation;

        // Add subtle organic floating waves
        const waveTime = time * 0.0008 * p.speed + p.phase;
        targetX += Math.sin(waveTime) * 3;
        targetY += Math.cos(waveTime * 0.9) * 3;
        targetZ += Math.sin(waveTime * 1.1) * 3;

        // Smooth spring adjustment
        p.x += (targetX - p.x) * 0.085;
        p.y += (targetY - p.y) * 0.085;
        p.z += (targetZ - p.z) * 0.085;

        // Apply 3D matrix rotations
        // Rotate Y
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        // Rotate X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // Perspective projection
        const d = 360;
        const scaleVal = d / (d + z2);
        
        // Scale dimensions based on scroll state: centers brain higher in hero, shifts to right in about, etc.
        let centerX = width / 2;
        let centerY = height / 2;

        if (stateIdx === 0) {
          // Hero & About adjustments: shift slightly up
          centerY -= 20 * (1 - interpolation);
        } else if (stateIdx === 4) {
          // Footer center placement
          centerY += 10 * interpolation;
        }

        const screenX = centerX + x1 * scaleVal * 4.6;
        const screenY = centerY + y2 * scaleVal * 4.6;

        projectedPoints.push({
          x: screenX,
          y: screenY,
          z: z2,
          size: p.size * scaleVal,
          color: p.color
        });
      }

      // Draw connection lines (Neural network wireframe)
      // To guarantee 60fps, we enforce a distance filter and restrict line count
      ctx.lineWidth = 0.45;
      const maxDistance = stateIdx === 3 ? 55 : 46; // wider grids for portfolio state

      for (let i = 0; i < projectedPoints.length; i++) {
        const p1 = projectedPoints[i];
        let connectionCount = 0;

        for (let j = i + 1; j < projectedPoints.length; j++) {
          if (connectionCount > 3) break; // cap connections per node

          const p2 = projectedPoints[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            connectionCount++;
            // Line opacity scales inverse to Z-depth (closer lines are brighter)
            const alphaFactor = (1 - dist / maxDistance) * 0.09;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${alphaFactor})`;
            ctx.stroke();
          }
        }
      }

      // Draw Orbit Tech Nodes (Active during Hero, State 0)
      if (stateIdx === 0 && interpolation < 0.8) {
        const opacityHero = 1 - interpolation;
        
        orbits.forEach((orbit, oIdx) => {
          const orbitAngle = time * orbit.speed + oIdx * Math.PI * 0.6;
          const oX = Math.cos(orbitAngle) * orbit.radius;
          const oZ = Math.sin(orbitAngle) * orbit.radius * 0.4;
          const oY = Math.sin(orbitAngle * 0.8) * 15;

          // Rotate coordinate space
          const ox1 = oX * cosY - oZ * sinY;
          const oz1 = oX * sinY + oZ * cosY;
          const oy2 = oY * cosX - oz1 * sinX;
          const oz2 = oY * sinX + oz1 * cosX;

          const oScale = 360 / (360 + oz2);
          const osX = width / 2 + ox1 * oScale * 4.6;
          const osY = height / 2 - 20 + oy2 * oScale * 4.6;

          // Draw orbit ring line
          ctx.beginPath();
          ctx.ellipse(width / 2, height / 2 - 20, orbit.radius * 4.6, orbit.radius * 4.6 * 0.35, rotX, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.015 * opacityHero})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();

          // Draw floating label sphere
          ctx.beginPath();
          ctx.arc(osX, osY, 3.5 * oScale, 0, Math.PI * 2);
          ctx.fillStyle = orbit.color;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(osX, osY, 3.5 * oScale * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34, 211, 238, ${0.05 * opacityHero})`;
          ctx.fill();

          // Text label
          ctx.font = '7px monospace';
          ctx.fillStyle = `rgba(255, 255, 255, ${0.25 * opacityHero})`;
          ctx.fillText(orbit.name, osX + 8, osY + 2);
        });
      }

      // Draw all nodes (particles)
      for (let i = 0; i < projectedPoints.length; i++) {
        const p = projectedPoints[i];
        
        // Node core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Node soft ambient glow ring
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace('0.4', '0.06').replace('0.3', '0.04');
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [scrollProgress, mousePos]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-30 bg-[#050505]"
      style={{ opacity: 0.28 }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
