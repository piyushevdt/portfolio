"use client";
import { useCallback, useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  originalX: number;
  originalY: number;
  color: string;
}

interface Mouse {
  x: number | null;
  y: number | null;
  radius: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef<Mouse>({ x: null, y: null, radius: 150 });
  const animationFrameId = useRef<number | null>(null);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Adjust particle count based on screen size
    const particleCount = Math.floor((canvas.width * canvas.height) / 5000);
    particles.current = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 3 + 1;
      const speedX = (Math.random() - 0.5) * 1.5;
      const speedY = (Math.random() - 0.5) * 1.5;
      const opacity = Math.random() * 0.8 + 0.2;

      particles.current.push({
        x,
        y,
        size,
        speedX,
        speedY,
        opacity,
        originalX: x,
        originalY: y,
        color: `hsla(${Math.random() * 60 + 180}, 100%, 70%, ${opacity})`,
      });
    }
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear with semi-transparent black for motion trails
    ctx.fillStyle = "rgba(10, 10, 20, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw connecting lines and particles
    for (let i = 0; i < particles.current.length; i++) {
      const p = particles.current[i];

      // Update position with more dynamic movement
      p.x += p.speedX + (Math.random() - 0.5) * 0.5;
      p.y += p.speedY + (Math.random() - 0.5) * 0.5;

      // Bounce off edges
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

      // Draw particle with glow effect
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

      const gradient = ctx.createRadialGradient(
        p.x,
        p.y,
        0,
        p.x,
        p.y,
        p.size * 2
      );
      gradient.addColorStop(0, p.color);
      gradient.addColorStop(1, "hsla(180, 100%, 50%, 0)");

      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw connections
      for (let j = i + 1; j < particles.current.length; j++) {
        const p2 = particles.current[j];
        const distance = Math.sqrt(
          Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2)
        );

        if (distance < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `hsla(190, 100%, 70%, ${1 - distance / 120})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // Mouse interaction - stronger repulsion
      if (mouse.current.x !== null && mouse.current.y !== null) {
        const distance = Math.sqrt(
          Math.pow(p.x - mouse.current.x, 2) +
            Math.pow(p.y - mouse.current.y, 2)
        );
        if (distance < mouse.current.radius) {
          const angle = Math.atan2(
            p.y - mouse.current.y,
            p.x - mouse.current.x
          );
          const force =
            ((mouse.current.radius - distance) / mouse.current.radius) * 10;
          p.x += Math.cos(angle) * force;
          p.y += Math.sin(angle) * force;
        }
      }
    }

    animationFrameId.current = requestAnimationFrame(animate);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    }
  };

  const handleMouseLeave = () => {
    mouse.current.x = null;
    mouse.current.y = null;
  };

  useEffect(() => {
    init();
    animationFrameId.current = requestAnimationFrame(animate);

    const handleResize = () => {
      init();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [init, animate]);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        background: "linear-gradient(to bottom, #0a0a1a, #121230)",
      }}
    />
  );
};

export default ParticleBackground;
