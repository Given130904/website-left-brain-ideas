import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSiteReveal } from '../../contexts/SiteRevealContext';

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
  glowColor: string;
  size: number;
  speed: number;
  phase: number;
  pulseOffset: number;
}

// Keep particles count at the original values for identical visuals
const isMobile = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
const PARTICLE_COUNT = isMobile() ? 40 : 80;

const generateParticles = (count: number): Particle3D[] => {
  const particles: Particle3D[] = [];
  for (let i = 0; i < count; i++) {
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

    const s1 = {
      x: (Math.random() - 0.5) * 320,
      y: (Math.random() - 0.5) * 220,
      z: (Math.random() - 0.5) * 120
    };

    const channel = Math.floor(Math.random() * 10) - 5;
    const isHorizontal = Math.random() > 0.5;
    const s2 = {
      x: isHorizontal ? (Math.random() - 0.5) * 440 : channel * 40,
      y: isHorizontal ? channel * 35 : (Math.random() - 0.5) * 340,
      z: (Math.random() - 0.5) * 30
    };

    const cols = 12;
    const colIdx = i % cols;
    const rowIdx = Math.floor(i / cols);
    const s3 = {
      x: (colIdx - cols / 2) * 36,
      y: 75 + Math.sin(colIdx * 0.6) * 8,
      z: (rowIdx - 5) * 42
    };

    const s4 = {
      x: (Math.random() - 0.5) * 340,
      y: -180 + Math.random() * 320,
      z: (Math.random() - 0.5) * 140
    };

    const tHelix = (i / count) * Math.PI * 10;
    const rHelix = 24 + Math.sin(tHelix * 0.5) * 6;
    const s5 = {
      x: Math.cos(tHelix) * rHelix,
      y: (i / count - 0.5) * 110,
      z: Math.sin(tHelix) * rHelix
    };

    particles.push({
      x: s0.x,
      y: s0.y,
      z: s0.z,
      targets: [s0, s1, s2, s3, s4, s5],
      color: isLeftLobe ? 'rgba(34, 211, 238, 0.45)' : 'rgba(99, 102, 241, 0.4)',
      glowColor: isLeftLobe ? 'rgba(34, 211, 238, 0.06)' : 'rgba(99, 102, 241, 0.04)',
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

  // Use refs instead of state to avoid React re-renders on scroll/mouse
  const scrollProgressRef = useRef(0);
  const mousePosRef = useRef({ x: 0, y: 0 });

  const { isRevealed, isCinematic, isSettled } = useSiteReveal();
  const isSettledRef = useRef(isSettled);

  useEffect(() => {
    isSettledRef.current = isSettled;
  }, [isSettled]);

  useEffect(() => {
    // Scroll tracking via ref — no setState, no re-render
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        scrollProgressRef.current = window.scrollY / docHeight;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Mouse tracking via ref — no setState, no re-render
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = {
        x: (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2),
        y: (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2),
      };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Single draw loop — starts only when settled, never re-created unless settled changes
  useEffect(() => {
    if (!isSettled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let isLoopRunning = true;
    let lastDrawTime = performance.now();
    const fps = 30;
    const fpsInterval = 1000 / fps;

    const particles = generateParticles(PARTICLE_COUNT);

    // Preallocate projectedPoints to avoid frame-by-frame object creation
    const projectedPoints = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: 0,
      y: 0,
      z: 0,
      size: 0,
      color: '',
      glowColor: ''
    }));

    // Preallocate Spatial Hash Grid arrays
    const maxCells = 10000;
    const head = new Int32Array(maxCells);
    const next = new Int32Array(PARTICLE_COUNT);
    const cellSize = 55;

    // Cache Path2D circle shapes by rounded radius
    const pathCache: Record<number, Path2D> = {};
    const getCirclePath = (radius: number): Path2D => {
      const r = Math.round(radius * 10) / 10;
      let path = pathCache[r];
      if (!path) {
        path = new Path2D();
        path.arc(0, 0, r, 0, Math.PI * 2);
        pathCache[r] = path;
      }
      return path;
    };

    // Pre-render static orbit text labels into offscreen canvases to avoid fillText() in loop
    const createTextCanvas = (text: string) => {
      const offscreen = document.createElement('canvas');
      offscreen.width = 60;
      offscreen.height = 15;
      const oCtx = offscreen.getContext('2d');
      if (oCtx) {
        oCtx.font = '7px monospace';
        oCtx.fillStyle = 'rgba(255, 255, 255, 1)';
        oCtx.textBaseline = 'top';
        oCtx.fillText(text, 0, 0);
      }
      return offscreen;
    };

    const textCanvases = {
      React: createTextCanvas('React'),
      Secure: createTextCanvas('Secure'),
      Fast: createTextCanvas('Fast')
    };

    // Only show orbits on desktop
    const showOrbits = !isMobile();
    const orbits = [
      { radius: 100, speed: 0.0004, color: 'rgba(34, 211, 238, 0.15)', name: 'React' },
      { radius: 130, speed: -0.0003, color: 'rgba(99, 102, 241, 0.15)', name: 'Secure' },
      { radius: 160, speed: 0.0002, color: 'rgba(34, 211, 238, 0.12)', name: 'Fast' }
    ];

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Cap DPR at 1.5 for performance
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      if (!isLoopRunning) return;

      const now = performance.now();
      const elapsed = now - lastDrawTime;
      if (elapsed >= fpsInterval) {
        lastDrawTime = now - (elapsed % fpsInterval);

        const scrollProgress = scrollProgressRef.current;
        const mousePos = mousePosRef.current;
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);

        ctx.clearRect(0, 0, width, height);

        const morphProgress = scrollProgress * 5;
        const stateIdx = Math.floor(morphProgress);
        const nextStateIdx = Math.min(stateIdx + 1, 5);
        const interpolation = morphProgress - stateIdx;

        const time = Date.now();
        const rotY = time * 0.00015 + mousePos.x * 0.12;
        const rotX = 0.2 + time * 0.00005 + mousePos.y * 0.08;

        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const startVal = p.targets[stateIdx];
          const endVal = p.targets[nextStateIdx];

          let targetX = startVal.x + (endVal.x - startVal.x) * interpolation;
          let targetY = startVal.y + (endVal.y - startVal.y) * interpolation;
          let targetZ = startVal.z + (endVal.z - startVal.z) * interpolation;

          const waveTime = time * 0.0008 * p.speed + p.phase;
          targetX += Math.sin(waveTime) * 3;
          targetY += Math.cos(waveTime * 0.9) * 3;
          targetZ += Math.sin(waveTime * 1.1) * 3;

          p.x += (targetX - p.x) * 0.085;
          p.y += (targetY - p.y) * 0.085;
          p.z += (targetZ - p.z) * 0.085;

          const x1 = p.x * cosY - p.z * sinY;
          const z1 = p.x * sinY + p.z * cosY;
          const y2 = p.y * cosX - z1 * sinX;
          const z2 = p.y * sinX + z1 * cosX;

          const d = 360;
          const scaleVal = d / (d + z2);

          let centerX = width / 2;
          let centerY = height / 2;

          if (stateIdx === 0) {
            centerY -= 20 * (1 - interpolation);
          } else if (stateIdx === 4) {
            centerY += 10 * interpolation;
          }

          const screenX = centerX + x1 * scaleVal * 4.6;
          const screenY = centerY + y2 * scaleVal * 4.6;

          // Mutate properties in place (no allocation)
          const pp = projectedPoints[i];
          pp.x = screenX;
          pp.y = screenY;
          pp.z = z2;
          pp.size = p.size * scaleVal;
          pp.color = p.color;
          pp.glowColor = p.glowColor;
        }

        // Build Spatial Hash Grid (no allocations)
        const cols = Math.ceil(width / cellSize) + 1;
        const rows = Math.ceil(height / cellSize) + 1;
        const totalCells = Math.min(cols * rows, maxCells);

        head.fill(-1, 0, totalCells);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const pp = projectedPoints[i];
          const px = Math.max(0, Math.min(width - 1, pp.x));
          const py = Math.max(0, Math.min(height - 1, pp.y));
          const cx = Math.floor(px / cellSize);
          const cy = Math.floor(py / cellSize);
          const cellIdx = cy * cols + cx;
          if (cellIdx >= 0 && cellIdx < totalCells) {
            next[i] = head[cellIdx];
            head[cellIdx] = i;
          } else {
            next[i] = -1;
          }
        }

        // Connection lines — Spatial Hash Grid traversal (O(N) instead of O(N^2))
        ctx.lineWidth = 0.45;
        ctx.shadowBlur = 0; // No per-line glow for performance
        const maxDistance = stateIdx === 3 ? 55 : 46;
        const maxDistSq = maxDistance * maxDistance;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const p1 = projectedPoints[i];
          const px = Math.max(0, Math.min(width - 1, p1.x));
          const py = Math.max(0, Math.min(height - 1, p1.y));
          const cx = Math.floor(px / cellSize);
          const cy = Math.floor(py / cellSize);
          
          let connectionCount = 0;

          for (let dy = -1; dy <= 1; dy++) {
            const ny = cy + dy;
            if (ny < 0 || ny >= rows) continue;

            for (let dx = -1; dx <= 1; dx++) {
              const nx = cx + dx;
              if (nx < 0 || nx >= cols) continue;

              const cellIdx = ny * cols + nx;
              if (cellIdx >= totalCells) continue;

              let j = head[cellIdx];
              while (j !== -1) {
                if (j > i) {
                  const p2 = projectedPoints[j];
                  const dx2 = p1.x - p2.x;
                  const dy2 = p1.y - p2.y;
                  const distSq = dx2 * dx2 + dy2 * dy2;

                  if (distSq < maxDistSq) {
                    connectionCount++;
                    if (connectionCount > 3) break;

                    const dist = Math.sqrt(distSq);
                    const alphaFactor = (1 - dist / maxDistance) * 0.09;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(34, 211, 238, ${alphaFactor})`;
                    ctx.stroke();
                  }
                }
                j = next[j];
              }
              if (connectionCount > 3) break;
            }
            if (connectionCount > 3) break;
          }
        }

        // Orbit nodes — only in Hero state, only on desktop
        if (showOrbits && stateIdx === 0 && interpolation < 0.8) {
          const opacityHero = 1 - interpolation;

          orbits.forEach((orbit, oIdx) => {
            const orbitAngle = time * orbit.speed + oIdx * Math.PI * 0.6;
            const oX = Math.cos(orbitAngle) * orbit.radius;
            const oZ = Math.sin(orbitAngle) * orbit.radius * 0.4;
            const oY = Math.sin(orbitAngle * 0.8) * 15;

            const ox1 = oX * cosY - oZ * sinY;
            const oz1 = oX * sinY + oZ * cosY;
            const oy2 = oY * cosX - oz1 * sinX;
            const oz2 = oY * sinX + oz1 * cosX;

            const oScale = 360 / (360 + oz2);
            const osX = width / 2 + ox1 * oScale * 4.6;
            const osY = height / 2 - 20 + oy2 * oScale * 4.6;

            ctx.beginPath();
            ctx.ellipse(width / 2, height / 2 - 20, orbit.radius * 4.6, orbit.radius * 4.6 * 0.35, rotX, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.015 * opacityHero})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(osX, osY, 3.5 * oScale, 0, Math.PI * 2);
            ctx.fillStyle = orbit.color;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(osX, osY, 3.5 * oScale * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(34, 211, 238, ${0.05 * opacityHero})`;
            ctx.fill();

            // Cached offscreen canvas text draw
            ctx.globalAlpha = 0.25 * opacityHero;
            ctx.drawImage(textCanvases[orbit.name as 'React' | 'Secure' | 'Fast'], osX + 8, osY - 3);
            ctx.globalAlpha = 1.0;
          });
        }

        // Draw particles — manual translation matrix translations (no ctx.save/restore)
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const p = projectedPoints[i];

          // Ambient glow ring — skip on mobile for performance
          if (showOrbits) {
            const glowRadius = p.size * 2.8;
            ctx.translate(p.x, p.y);
            ctx.fillStyle = p.glowColor;
            ctx.fill(getCirclePath(glowRadius));
            ctx.translate(-p.x, -p.y);
          }

          ctx.translate(p.x, p.y);
          ctx.fillStyle = p.color;
          ctx.fill(getCirclePath(p.size));
          ctx.translate(-p.x, -p.y);
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isLoopRunning = false;
        cancelAnimationFrame(animationId);
      } else {
        if (!isLoopRunning) {
          isLoopRunning = true;
          lastDrawTime = performance.now();
          animationId = requestAnimationFrame(draw);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isLoopRunning = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isSettled]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isRevealed ? 0.28 : 0 }}
      transition={{
        duration: isCinematic ? 3.5 : 0.5,
        delay:    isCinematic ? 2.0 : 0.2,
        ease: 'easeOut',
      }}
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-30 bg-[#050505]"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </motion.div>
  );
}
