import { useState, useEffect, useRef } from 'react';

interface CursorObject {
  id: number;
  type: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  depth: number; // 0.5 (far) to 1.5 (close)
  rotation: number;
  rotSpeed: number;
  opacity: number;
  targetOpacity: number;
  age: number;
  maxAge: number;
  pulsePhase: number;
  sparkProgress: number;
}

interface HoverState {
  type: 'none' | 'button' | 'portfolio' | 'service';
  x: number;
  y: number;
  width: number;
  height: number;
}

const OBJECT_TYPES = [
  'keyboard_corner', 'wasd', 'esc_key', 'code_brackets',
  'binary', 'shield', 'cpu_chip', 'neural_nodes', 'light_bulb'
];

function CursorExperienceCanvasContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 });
  const hoverRef = useRef<HoverState>({ type: 'none', x: 0, y: 0, width: 0, height: 0 });
  const lastMoveTimeRef = useRef(Date.now());

  // Single merged useEffect for pointer tracking and canvas draw loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let isLoopRunning = false; // Start paused, will resume on first mouse move!
    let lastDrawTime = Date.now();
    const fps = 30;
    const fpsInterval = 1000 / fps;

    let objectIdCounter = 0;
    let dpr = 1;

    // Object pool to avoid dynamic memory allocation during rendering
    const MAX_OBJECTS = 30;
    const pool: (CursorObject & { active: boolean })[] = Array.from({ length: MAX_OBJECTS }, () => ({
      id: -1,
      type: '',
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      size: 0,
      depth: 0,
      rotation: 0,
      rotSpeed: 0,
      opacity: 0,
      targetOpacity: 0,
      age: 0,
      maxAge: 0,
      pulsePhase: 0,
      sparkProgress: 0,
      active: false
    }));

    // Cache Path2D shapes to avoid recreating them in loop
    const shapes: Record<string, Path2D> = {};

    const pKeyboard = new Path2D();
    pKeyboard.rect(-10, -10, 20, 20);
    pKeyboard.rect(-6, -6, 12, 12);
    shapes['keyboard_corner'] = pKeyboard;

    const pWasd = new Path2D();
    const ks = 8;
    pWasd.rect(-ks/2, -ks*1.2, ks, ks);
    pWasd.rect(-ks*1.1, 0, ks, ks);
    pWasd.rect(-ks/2, 0, ks, ks);
    pWasd.rect(ks*0.1, 0, ks, ks);
    shapes['wasd'] = pWasd;

    const pEsc = new Path2D();
    pEsc.rect(-12, -10, 24, 20);
    shapes['esc_key'] = pEsc;

    const pShield = new Path2D();
    pShield.moveTo(0, -11);
    pShield.lineTo(10, -7);
    pShield.lineTo(10, 2);
    pShield.quadraticCurveTo(10, 10, 0, 12);
    pShield.quadraticCurveTo(-10, 10, -10, 2);
    pShield.lineTo(-10, -7);
    pShield.closePath();
    shapes['shield'] = pShield;

    const pCpu = new Path2D();
    pCpu.rect(-11, -11, 22, 22);
    pCpu.rect(-7, -7, 14, 14);
    for (let i = -8; i <= 8; i += 4) {
      pCpu.rect(i - 1, -14, 2, 3);
      pCpu.rect(i - 1, 11, 2, 3);
      pCpu.rect(-14, i - 1, 3, 2);
      pCpu.rect(11, i - 1, 3, 2);
    }
    shapes['cpu_chip'] = pCpu;

    const pNeural = new Path2D();
    pNeural.moveTo(-8, 6);
    pNeural.lineTo(8, 6);
    pNeural.lineTo(0, -8);
    pNeural.closePath();
    pNeural.moveTo(-8 + 2, 6);
    pNeural.arc(-8, 6, 2, 0, Math.PI * 2);
    pNeural.moveTo(8 + 2, 6);
    pNeural.arc(8, 6, 2, 0, Math.PI * 2);
    pNeural.moveTo(0 + 2, -8);
    pNeural.arc(0, -8, 2, 0, Math.PI * 2);
    shapes['neural_nodes'] = pNeural;

    const pBulb = new Path2D();
    pBulb.arc(0, -4, 8, 0, Math.PI * 2);
    pBulb.rect(-4, 4, 8, 4);
    pBulb.moveTo(-3, -3);
    pBulb.lineTo(0, -7);
    pBulb.lineTo(3, -3);
    shapes['light_bulb'] = pBulb;

    // Cache static text into offscreen canvases to avoid fillText() calls
    const createTextCanvas = (text: string, font: string, style: string) => {
      const offscreen = document.createElement('canvas');
      offscreen.width = 40;
      offscreen.height = 15;
      const oCtx = offscreen.getContext('2d');
      if (oCtx) {
        oCtx.font = font;
        oCtx.fillStyle = style;
        oCtx.textBaseline = 'top';
        oCtx.fillText(text, 0, 0);
      }
      return offscreen;
    };

    const escText = createTextCanvas('ESC', '6px monospace', 'rgba(255, 255, 255, 0.7)');
    const bracketsText = createTextCanvas('</>', 'bold 11px monospace', 'rgba(34, 211, 238, 0.8)');
    const binary010Text = createTextCanvas('010', '8px monospace', 'rgba(99, 102, 241, 0.75)');
    const binary101Text = createTextCanvas('101', '8px monospace', 'rgba(99, 102, 241, 0.75)');

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resize);
    resize();

    const spawnObject = (mx: number, my: number) => {
      let obj = null;
      for (let i = 0; i < MAX_OBJECTS; i++) {
        if (!pool[i].active) {
          obj = pool[i];
          break;
        }
      }
      if (!obj) return;

      const type = OBJECT_TYPES[Math.floor(Math.random() * OBJECT_TYPES.length)];
      const angle = Math.random() * Math.PI * 2;
      const distance = 60 + Math.random() * 80;

      obj.id = objectIdCounter++;
      obj.type = type;
      obj.x = mx + Math.cos(angle) * distance;
      obj.y = my + Math.sin(angle) * distance;
      obj.vx = (Math.random() - 0.5) * 0.8;
      obj.vy = (Math.random() - 0.5) * 0.8;
      obj.size = 12 + Math.random() * 10;
      obj.depth = 0.6 + Math.random() * 0.9;
      obj.rotation = Math.random() * Math.PI;
      obj.rotSpeed = (Math.random() - 0.5) * 0.015;
      obj.opacity = 0;
      obj.targetOpacity = 1;
      obj.age = 0;
      obj.maxAge = 280 + Math.random() * 160;
      obj.pulsePhase = Math.random() * Math.PI * 2;
      obj.sparkProgress = 0;
      obj.active = true;
    };

    const drawObject = (c: CanvasRenderingContext2D, o: CursorObject) => {
      // Avoid c.save() / c.restore() using direct setTransform matrix
      const cos = Math.cos(o.rotation);
      const sin = Math.sin(o.rotation);
      const s = o.depth * dpr;

      c.setTransform(
        cos * s,
        sin * s,
        -sin * s,
        cos * s,
        o.x * dpr,
        o.y * dpr
      );
      
      c.strokeStyle = `rgba(34, 211, 238, ${o.opacity})`;
      c.fillStyle = `rgba(34, 211, 238, ${o.opacity * 0.05})`;
      c.lineWidth = 1;

      const path = shapes[o.type];
      if (path) {
        c.stroke(path);
        if (o.type === 'shield' || o.type === 'cpu_chip' || o.type === 'neural_nodes') {
          c.fill(path);
        }
      }

      // Handle offscreen label texts drawing
      if (o.type === 'esc_key') {
        c.globalAlpha = o.opacity;
        c.drawImage(escText, -6, -4);
        c.globalAlpha = 1.0;
      } else if (o.type === 'code_brackets') {
        c.globalAlpha = o.opacity;
        c.drawImage(bracketsText, -10, -5);
        c.globalAlpha = 1.0;
      } else if (o.type === 'binary') {
        c.globalAlpha = o.opacity;
        c.drawImage(Math.random() > 0.5 ? binary101Text : binary010Text, -10, -4);
        c.globalAlpha = 1.0;
      }

      // Reset transform back to standard scaled coordinates
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const tick = () => {
      if (!isLoopRunning) return;

      const now = Date.now();
      const mouse = mouseRef.current;
      const hover = hoverRef.current;

      const isInactive = now - lastMoveTimeRef.current > 2000;
      
      // Determine if there are active objects left
      let activeCount = 0;
      for (let i = 0; i < MAX_OBJECTS; i++) {
        if (pool[i].active) activeCount++;
      }

      // If inactive and no active objects, stop loop completely!
      if (isInactive && activeCount === 0) {
        isLoopRunning = false;
        const w = window.innerWidth;
        const h = window.innerHeight;
        ctx.clearRect(0, 0, w, h);
        return;
      }

      const elapsed = now - lastDrawTime;
      if (elapsed >= fpsInterval) {
        lastDrawTime = now - (elapsed % fpsInterval);

        const w = window.innerWidth;
        const h = window.innerHeight;
        ctx.clearRect(0, 0, w, h);

        if (mouse.x > -500 && !isInactive && activeCount < 5 && Math.random() < 0.04) {
          spawnObject(mouse.x, mouse.y);
        }

        for (let i = 0; i < MAX_OBJECTS; i++) {
          const o = pool[i];
          if (!o.active) continue;

          o.age++;

          if (o.age > o.maxAge || isInactive) {
            o.targetOpacity = 0;
          }

          o.opacity += (o.targetOpacity - o.opacity) * 0.06;

          if (o.opacity <= 0.01 && o.targetOpacity === 0) {
            o.active = false;
            continue;
          }

          const dx = mouse.x - o.x;
          const dy = mouse.y - o.y;
          // Squared-distance comparison instead of Math.sqrt
          const distSq = dx * dx + dy * dy;

          if (distSq > 16900) { // 130 * 130
            const force = 0.0004 * o.depth;
            o.vx += dx * force;
            o.vy += dy * force;
          } else if (distSq < 3025) { // 55 * 55
            const force = 0.008 / o.depth;
            o.vx -= dx * force;
            o.vy -= dy * force;
          }

          o.vx *= 0.94;
          o.vy *= 0.94;

          o.x += o.vx;
          o.y += o.vy;
          o.rotation += o.rotSpeed;

          if (hover.type !== 'none') {
            o.opacity = Math.min(o.opacity * 1.1, 1);
          }

          for (let j = i + 1; j < MAX_OBJECTS; j++) {
            const o2 = pool[j];
            if (!o2.active) continue;

            const odx = o.x - o2.x;
            const ody = o.y - o2.y;
            // Squared-distance check
            const odistSq = odx * odx + ody * ody;

            if (odistSq < 7225) { // 85 * 85
              const odist = Math.sqrt(odistSq);
              ctx.shadowBlur = 0;
              ctx.beginPath();
              ctx.moveTo(o.x, o.y);
              ctx.lineTo(o2.x, o2.y);
              const lineOpacity = (1 - odist / 85) * 0.08 * o.opacity * o2.opacity;
              ctx.strokeStyle = `rgba(34, 211, 238, ${lineOpacity})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }

          ctx.shadowColor = 'rgba(34, 211, 238, 0.6)';
          ctx.shadowBlur = 6;
          drawObject(ctx, o);
          ctx.shadowBlur = 0;
        }

        if (hover.type === 'portfolio' && mouse.x > -500) {
          ctx.strokeStyle = `rgba(34, 211, 238, 0.15)`;
          ctx.strokeRect(mouse.x + 20, mouse.y - 30, 45, 30);
          ctx.beginPath();
          ctx.moveTo(mouse.x + 20, mouse.y - 23);
          ctx.lineTo(mouse.x + 65, mouse.y - 23);
          ctx.stroke();
        } else if (hover.type === 'service' && mouse.x > -500) {
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(hover.x + hover.width / 2, hover.y + hover.height / 2);
          ctx.strokeStyle = `rgba(34, 211, 238, 0.08)`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else if (hover.type === 'button' && mouse.x > -500) {
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 25, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(34, 211, 238, 0.05)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(tick);
    };

    const resumeLoop = () => {
      if (!isLoopRunning) {
        isLoopRunning = true;
        lastDrawTime = Date.now();
        animationId = requestAnimationFrame(tick);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.vx = e.clientX - mouse.lastX;
      mouse.vy = e.clientY - mouse.lastY;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;
      
      lastMoveTimeRef.current = Date.now();
      resumeLoop();
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const closestButton = target.closest('button, a, .cursor-pointer, [role="button"]');
      const closestPortfolio = target.closest('.browser-mockup');
      const closestService = target.closest('#services .group');

      if (closestPortfolio) {
        const rect = closestPortfolio.getBoundingClientRect();
        hoverRef.current = { type: 'portfolio', x: rect.left, y: rect.top, width: rect.width, height: rect.height };
      } else if (closestService) {
        const rect = closestService.getBoundingClientRect();
        hoverRef.current = { type: 'service', x: rect.left, y: rect.top, width: rect.width, height: rect.height };
      } else if (closestButton) {
        const rect = closestButton.getBoundingClientRect();
        hoverRef.current = { type: 'button', x: rect.left, y: rect.top, width: rect.width, height: rect.height };
      } else {
        hoverRef.current = { type: 'none', x: 0, y: 0, width: 0, height: 0 };
      }
      resumeLoop();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isLoopRunning = false;
        cancelAnimationFrame(animationId);
      } else {
        const isInactive = Date.now() - lastMoveTimeRef.current > 2000;
        let activeCount = 0;
        for (let i = 0; i < MAX_OBJECTS; i++) {
          if (pool[i].active) activeCount++;
        }
        if (!isInactive || activeCount > 0) {
          resumeLoop();
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initial check
    if (mouseRef.current.x > -500) {
      resumeLoop();
    }

    return () => {
      isLoopRunning = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-10"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

export default function CursorExperienceCanvas() {
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      setIsDisabled(isTouch || isMobile);
    };
    checkDevice();
  }, []);

  if (isDisabled) return null;
  return <CursorExperienceCanvasContent />;
}
