import React, { useEffect, useRef } from 'react';

// Thread physics simulation
class Thread {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
  thickness: number;
  type: 'normal' | 'fractal' | 'void';
  history: {x: number, y: number}[];

  constructor(x: number, y: number, vx: number, vy: number, type: 'normal' | 'fractal' | 'void' = 'normal') {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.type = type;
    this.color = type === 'void' ? '#000000' : type === 'fractal' ? `hsl(${Math.random() * 360}, 100%, 50%)` : `hsl(${Math.random() * 60 + 280}, 100%, 60%)`; // Pinks and purples
    this.history = [];
    this.life = 0;
    this.maxLife = Math.random() * 100 + 50;
    this.thickness = Math.random() * 3 + 1;
  }

  update(looms: {x: number, y: number, pull: number}[]) {
    this.history.push({x: this.x, y: this.y});
    if (this.history.length > 20) this.history.shift();

    // Gravity / Weaving towards looms
    looms.forEach(l => {
      const dx = l.x - this.x;
      const dy = l.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 5) {
        this.vx += (dx / dist) * l.pull;
        this.vy += (dy / dist) * l.pull;
      }
    });

    // Chaos random walk
    this.vx += (Math.random() - 0.5) * 2;
    this.vy += (Math.random() - 0.5) * 2;
    
    // Friction
    this.vx *= 0.98;
    this.vy *= 0.98;

    this.x += this.vx;
    this.y += this.vy;
    this.life++;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.history.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(this.history[0].x, this.history[0].y);
    for (let i = 1; i < this.history.length; i++) {
      ctx.lineTo(this.history[i].x, this.history[i].y);
    }
    
    ctx.strokeStyle = this.type === 'void' ? 'rgba(0,0,0,0.8)' : this.color;
    ctx.lineWidth = this.thickness;
    if (this.type === 'fractal') {
      ctx.shadowBlur = 15;
      ctx.shadowColor = this.color;
    } else {
      ctx.shadowBlur = 5;
      ctx.shadowColor = this.color;
    }
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
  }
}

export default function CanvasGame({ setScore }: { setScore: React.Dispatch<React.SetStateAction<number>> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let threads: Thread[] = [];
    let looms = [
      { x: width / 2, y: height / 2, pull: 0.5 }
    ];
    
    let isDrawing = false;
    let lastMouse = {x: 0, y: 0};

    // Event listeners for window resize
    const resizeObj = new ResizeObserver(() => {
       width = window.innerWidth;
       height = window.innerHeight;
       canvas.width = width;
       canvas.height = height;
       looms[0].x = width / 2;
       looms[0].y = height / 2;
    });
    resizeObj.observe(document.body);

    const handlePointerDown = (e: PointerEvent) => {
      isDrawing = true;
      lastMouse = {x: e.clientX, y: e.clientY};
      for(let i=0; i<5; i++){
        threads.push(new Thread(e.clientX, e.clientY, (Math.random()-0.5)*10, (Math.random()-0.5)*10));
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDrawing) return;
      const dx = e.clientX - lastMouse.x;
      const dy = e.clientY - lastMouse.y;
      
      for(let i=0; i<3; i++){
         const type = Math.random() > 0.9 ? 'fractal' : (Math.random() > 0.95 ? 'void' : 'normal');
         threads.push(new Thread(e.clientX, e.clientY, dx * 0.1 + (Math.random()-0.5)*5, dy * 0.1 + (Math.random()-0.5)*5, type));
      }
      lastMouse = {x: e.clientX, y: e.clientY};
    };

    const handlePointerUp = () => {
      isDrawing = false;
    };

    const handleSurge = () => {
       // Explode chaotic threads
       for(let i=0; i<50; i++){
         threads.push(new Thread(width/2, height/2, (Math.random()-0.5)*30, (Math.random()-0.5)*30, 'fractal'));
       }
       looms.push({
         x: Math.random() * width,
         y: Math.random() * height,
         pull: Math.random() * 2
       });
       if(looms.length > 4) looms.shift(); // Max 4 looms
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('trigger-surge', handleSurge);

    let animationId: number;

    const render = () => {
      // Fade trail effect
      ctx.fillStyle = 'rgba(10, 5, 20, 0.2)'; // Dark space background
      ctx.fillRect(0, 0, width, height);

      // Draw looms
      looms.forEach((l, i) => {
         ctx.beginPath();
         ctx.arc(l.x, l.y, 20 + Math.sin(Date.now()/200)*10, 0, Math.PI * 2);
         ctx.fillStyle = i === 0 ? 'rgba(255, 0, 255, 0.5)' : 'rgba(0, 255, 255, 0.5)';
         ctx.fill();
         
         ctx.shadowColor = i === 0 ? '#ff00ff' : '#00ffff';
         ctx.shadowBlur = 30;
         ctx.fill();
         ctx.shadowBlur = 0;
      });

      // Update and draw threads
      let scoreGained = 0;
      for (let i = threads.length - 1; i >= 0; i--) {
        let t = threads[i];
        t.update(looms);
        t.draw(ctx);
        scoreGained += 0.5;
        if (t.life > t.maxLife) {
          threads.splice(i, 1);
        }
      }
      
      if (scoreGained > 0) {
        setScore(prev => prev + scoreGained);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObj.disconnect();
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('trigger-surge', handleSurge);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
    />
  );
}
