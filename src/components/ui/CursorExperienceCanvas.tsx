import { useEffect, useRef } from 'react';

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

export default function CursorExperienceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 });
  const hoverRef = useRef<HoverState>({ type: 'none', x: 0, y: 0, width: 0, height: 0 });
  const lastMoveTimeRef = useRef(Date.now());
  const logoTimerRef = useRef({ lastTrigger: Date.now(), state: 'idle', progress: 0 });

  // Handle pointer tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.vx = e.clientX - mouse.lastX;
      mouse.vy = e.clientY - mouse.lastY;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;
      
      lastMoveTimeRef.current = Date.now();
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
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Main canvas draw loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let objects: CursorObject[] = [];
    let objectIdCounter = 0;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resize);
    resize();

    // Spawn helper
    const spawnObject = (mx: number, my: number) => {
      const type = OBJECT_TYPES[Math.floor(Math.random() * OBJECT_TYPES.length)];
      const angle = Math.random() * Math.PI * 2;
      const distance = 60 + Math.random() * 90;
      
      objects.push({
        id: objectIdCounter++,
        type,
        x: mx + Math.cos(angle) * distance,
        y: my + Math.sin(angle) * distance,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: 14 + Math.random() * 12,
        depth: 0.6 + Math.random() * 0.9, // 3D depth scale multiplier
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        opacity: 0,
        targetOpacity: 1,
        age: 0,
        maxAge: 320 + Math.random() * 180,
        pulsePhase: Math.random() * Math.PI * 2,
        sparkProgress: 0
      });
    };

    // Vector drawing functions for cyber-objects
    const drawObject = (c: CanvasRenderingContext2D, o: CursorObject) => {
      c.save();
      c.translate(o.x, o.y);
      c.rotate(o.rotation);
      c.scale(o.depth, o.depth);
      
      c.strokeStyle = `rgba(34, 211, 238, ${o.opacity})`;
      c.fillStyle = `rgba(34, 211, 238, ${o.opacity * 0.05})`;
      c.lineWidth = 1;
      
      // Glow drop shadow effect
      c.shadowColor = 'rgb(34, 211, 238)';
      c.shadowBlur = 8 * o.depth;

      switch (o.type) {
        case 'keyboard_corner': {
          c.beginPath();
          c.rect(-10, -10, 20, 20);
          c.stroke();
          // Draw inner key segment
          c.strokeRect(-6, -6, 12, 12);
          break;
        }
        case 'wasd': {
          // Draw 4 layout keys
          const ks = 8;
          c.strokeRect(-ks/2, -ks*1.2, ks, ks); // W
          c.strokeRect(-ks*1.1, 0, ks, ks);    // A
          c.strokeRect(-ks/2, 0, ks, ks);      // S
          c.strokeRect(ks*0.1, 0, ks, ks);     // D
          break;
        }
        case 'esc_key': {
          c.strokeRect(-12, -10, 24, 20);
          c.font = '6px monospace';
          c.fillStyle = `rgba(255, 255, 255, ${o.opacity * 0.7})`;
          c.fillText('ESC', -5, 3);
          break;
        }
        case 'code_brackets': {
          c.font = 'bold 11px monospace';
          c.fillStyle = `rgba(34, 211, 238, ${o.opacity * 0.8})`;
          c.fillText('</>', -10, 4);
          break;
        }
        case 'binary': {
          c.font = '8px monospace';
          c.fillStyle = `rgba(99, 102, 241, ${o.opacity * 0.75})`;
          c.fillText(Math.random() > 0.5 ? '101' : '010', -8, 3);
          break;
        }
        case 'shield': {
          c.beginPath();
          c.moveTo(0, -11);
          c.lineTo(10, -7);
          c.lineTo(10, 2);
          c.quadraticCurveTo(10, 10, 0, 12);
          c.quadraticCurveTo(-10, 10, -10, 2);
          c.lineTo(-10, -7);
          c.closePath();
          c.stroke();
          c.fill();
          break;
        }
        case 'cpu_chip': {
          c.strokeRect(-11, -11, 22, 22);
          c.fillStyle = `rgba(34, 211, 238, ${o.opacity * 0.1})`;
          c.fillRect(-7, -7, 14, 14);
          c.strokeRect(-7, -7, 14, 14);
          // Connector pins
          for (let i = -8; i <= 8; i += 4) {
            c.strokeRect(i - 1, -14, 2, 3);
            c.strokeRect(i - 1, 11, 2, 3);
            c.strokeRect(-14, i - 1, 3, 2);
            c.strokeRect(11, i - 1, 3, 2);
          }
          break;
        }
        case 'neural_nodes': {
          // 3 nodes connected
          const n1 = { x: -8, y: 6 };
          const n2 = { x: 8, y: 6 };
          const n3 = { x: 0, y: -8 };
          c.beginPath();
          c.moveTo(n1.x, n1.y);
          c.lineTo(n2.x, n2.y);
          c.lineTo(n3.x, n3.y);
          c.closePath();
          c.stroke();
          
          c.beginPath();
          c.arc(n1.x, n1.y, 2, 0, Math.PI * 2);
          c.arc(n2.x, n2.y, 2, 0, Math.PI * 2);
          c.arc(n3.x, n3.y, 2, 0, Math.PI * 2);
          c.fillStyle = 'rgb(34, 211, 238)';
          c.fill();
          break;
        }
        case 'light_bulb': {
          c.beginPath();
          c.arc(0, -4, 8, 0, Math.PI * 2);
          c.stroke();
          c.strokeRect(-4, 4, 8, 4);
          // Filament
          c.beginPath();
          c.moveTo(-3, -3);
          c.lineTo(0, -7);
          c.lineTo(3, -3);
          c.stroke();
          break;
        }
      }
      
      c.restore();
    };

    // Draw the faint logo overlay
    const drawFaintLogo = (c: CanvasRenderingContext2D, opacity: number, progress: number) => {
      const midX = window.innerWidth / 2;
      const midY = window.innerHeight / 2;
      
      c.save();
      c.translate(midX, midY);
      
      c.shadowColor = 'rgb(34, 211, 238)';
      c.shadowBlur = 15;
      
      c.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
      c.lineWidth = 1;
      
      // Stylized Brain contour lines representing the logo
      c.beginPath();
      // Left hemisphere lobe
      c.arc(-40, 0, 70, Math.PI * 0.5, Math.PI * 1.5);
      c.bezierCurveTo(-40, -110, 20, -110, 20, -50);
      c.bezierCurveTo(20, -20, -40, -20, -40, 0);
      // Right hemisphere lobe
      c.arc(40, 0, 70, Math.PI * 1.5, Math.PI * 0.5);
      c.bezierCurveTo(40, 110, -20, 110, -20, 50);
      c.bezierCurveTo(-20, 20, 40, 20, 40, 0);
      c.stroke();

      // Interconnecting center helix points (dissolving on transition progress)
      const count = 12;
      for (let i = 0; i < count; i++) {
        const theta = (i / count) * Math.PI * 4 + progress * Math.PI * 2;
        const helixR = 15 + Math.sin(theta * 0.5) * 5;
        const hx = Math.cos(theta) * helixR;
        const hy = (i / count - 0.5) * 90;
        
        c.beginPath();
        c.arc(hx, hy, 1.8, 0, Math.PI * 2);
        c.fillStyle = `rgba(34, 211, 238, ${opacity * 1.8})`;
        c.fill();

        // Connect adjacent points
        if (i < count - 1) {
          const nextTheta = ((i + 1) / count) * Math.PI * 4 + progress * Math.PI * 2;
          const nextHelixR = 15 + Math.sin(nextTheta * 0.5) * 5;
          const nhx = Math.cos(nextTheta) * nextHelixR;
          const nhy = ((i + 1) / count - 0.5) * 90;
          c.beginPath();
          c.moveTo(hx, hy);
          c.lineTo(nhx, nhy);
          c.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.5})`;
          c.stroke();
        }
      }

      c.restore();
    };

    const tick = () => {
      if (document.hidden) {
        animationId = requestAnimationFrame(tick);
        return;
      }

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const now = Date.now();
      const mouse = mouseRef.current;
      const hover = hoverRef.current;

      // Determine activity state: disappear if mouse inactive for 2s
      const isInactive = now - lastMoveTimeRef.current > 2000;
      
      // Spawn new objects if moving and below limit (max 10)
      if (mouse.x > -500 && !isInactive && objects.length < 8 && Math.random() < 0.05) {
        spawnObject(mouse.x, mouse.y);
      }

      // Physics, connection drawing, and object render loops
      for (let i = objects.length - 1; i >= 0; i--) {
        const o = objects[i];
        o.age++;

        // Age limit or inactive fade out
        if (o.age > o.maxAge || isInactive) {
          o.targetOpacity = 0;
        }

        // Lerp opacity
        o.opacity += (o.targetOpacity - o.opacity) * 0.06;

        // Recycle logic
        if (o.opacity <= 0.01 && o.targetOpacity === 0) {
          objects.splice(i, 1);
          continue;
        }

        // Magnet attraction & repulsion physics
        const dx = mouse.x - o.x;
        const dy = mouse.y - o.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 130) {
          // Attract towards cursor
          const force = 0.0004 * o.depth;
          o.vx += dx * force;
          o.vy += dy * force;
        } else if (dist < 55) {
          // Repel from cursor
          const force = 0.008 / o.depth;
          o.vx -= dx * force;
          o.vy -= dy * force;
        }

        // Apply friction
        o.vx *= 0.94;
        o.vy *= 0.94;

        o.x += o.vx;
        o.y += o.vy;
        o.rotation += o.rotSpeed;

        // Interactive states: extra glow when hovering buttons
        if (hover.type !== 'none') {
          // Increase size/glow
          o.opacity = Math.min(o.opacity * 1.1, 1);
        }

        // Draw connections between objects that are close
        for (let j = i + 1; j < objects.length; j++) {
          const o2 = objects[j];
          const odx = o.x - o2.x;
          const ody = o.y - o2.y;
          const odist = Math.sqrt(odx * odx + ody * ody);

          if (odist < 85) {
            ctx.beginPath();
            ctx.moveTo(o.x, o.y);
            ctx.lineTo(o2.x, o2.y);
            const lineOpacity = (1 - odist / 85) * 0.08 * o.opacity * o2.opacity;
            ctx.strokeStyle = `rgba(34, 211, 238, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw vector object
        drawObject(ctx, o);
      }

      // Draw active hover interactive overlays
      if (hover.type === 'portfolio' && mouse.x > -500) {
        // Draw tiny floating browser frame lines near cursor
        ctx.strokeStyle = `rgba(34, 211, 238, 0.15)`;
        ctx.strokeRect(mouse.x + 20, mouse.y - 30, 45, 30);
        ctx.beginPath();
        ctx.moveTo(mouse.x + 20, mouse.y - 23);
        ctx.lineTo(mouse.x + 65, mouse.y - 23);
        ctx.stroke();
      } else if (hover.type === 'service' && mouse.x > -500) {
        // Draw circuit connections lines reaching towards the hovered element boundary coordinates
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(hover.x + hover.width / 2, hover.y + hover.height / 2);
        ctx.strokeStyle = `rgba(34, 211, 238, 0.08)`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      } else if (hover.type === 'button' && mouse.x > -500) {
        // Spark loops
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 25, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.05)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Handle the faint wireframe logo overlay timer loop (every 18 seconds)
      const logoTimer = logoTimerRef.current;
      const logoElapsed = now - logoTimer.lastTrigger;
      
      if (logoTimer.state === 'idle' && logoElapsed > 18000) {
        logoTimer.state = 'fadein';
        logoTimer.lastTrigger = now;
      }

      if (logoTimer.state !== 'idle') {
        const duration = 2000; // 2 seconds total logo duration
        const cycleProgress = now - logoTimer.lastTrigger;
        
        logoTimer.progress = cycleProgress / duration;
        
        let logoOpacity = 0;
        if (logoTimer.progress < 0.25) {
          // fade in
          logoOpacity = (logoTimer.progress / 0.25) * 0.04;
        } else if (logoTimer.progress < 0.75) {
          // sustain
          logoOpacity = 0.04;
        } else if (logoTimer.progress < 1.0) {
          // dissolve fade out
          logoOpacity = (1 - (logoTimer.progress - 0.75) / 0.25) * 0.04;
        } else {
          // loop completed
          logoTimer.state = 'idle';
          logoTimer.lastTrigger = now;
        }

        if (logoOpacity > 0.001) {
          drawFaintLogo(ctx, logoOpacity, logoTimer.progress);
        }
      }

      animationId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
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
