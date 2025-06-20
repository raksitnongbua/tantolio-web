"use client";

import { useEffect, useState, useCallback } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDelay: number;
  vx: number;
  vy: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export function StarBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const generateStars = useCallback(() => {
    const starCount = 80;
    const newStars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.3,
        animationDelay: Math.random() * 5,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    setStars(newStars);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    setMousePosition({ x, y });

    // Create particles on mouse move
    if (Math.random() < 0.1) {
      const newParticle: Particle = {
        id: Date.now() + Math.random(),
        x,
        y,
        size: Math.random() * 2 + 1,
        opacity: 0.8,
        life: 0,
        maxLife: 60,
      };
      setParticles(prev => [...prev.slice(-20), newParticle]);
    }
  }, []);

  useEffect(() => {
    generateStars();
    
    // Add mouse move listener
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [generateStars, handleMouseMove]);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          life: particle.life + 1,
          opacity: Math.max(0, 0.8 * (1 - particle.life / particle.maxLife)),
        })).filter(particle => particle.life < particle.maxLife)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Animate stars
  useEffect(() => {
    const interval = setInterval(() => {
      setStars(prev => 
        prev.map(star => ({
          ...star,
          x: (star.x + star.vx + 100) % 100,
          y: (star.y + star.vy + 100) % 100,
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Moving Stars */}
      {stars.map((star) => {
        const distanceFromMouse = Math.sqrt(
          Math.pow(star.x - mousePosition.x, 2) + Math.pow(star.y - mousePosition.y, 2)
        );
        const isNearMouse = distanceFromMouse < 15;
        
        return (
          <div
            key={star.id}
            className="absolute transition-all duration-300"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              transform: isNearMouse ? 'scale(1.5)' : 'scale(1)',
            }}
          >
            <div
              className="bg-foreground/30 rounded-full animate-pulse"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: isNearMouse ? star.opacity * 1.5 : star.opacity,
                animationDelay: `${star.animationDelay}s`,
                animationDuration: isNearMouse ? "1s" : "3s",
                boxShadow: isNearMouse ? `0 0 ${star.size * 2}px rgba(255,255,255,0.3)` : 'none',
              }}
            />
          </div>
        );
      })}

      {/* Mouse Trail Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-foreground/40"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            transform: `scale(${1 - particle.life / particle.maxLife})`,
          }}
        />
      ))}

      {/* Floating Orbs */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-pulse"
          style={{ 
            left: '10%', 
            top: '20%',
            animationDuration: '6s',
            filter: 'blur(20px)',
          }}
        />
        <div 
          className="absolute w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse"
          style={{ 
            right: '15%', 
            bottom: '25%',
            animationDuration: '8s',
            animationDelay: '2s',
            filter: 'blur(15px)',
          }}
        />
        <div 
          className="absolute w-40 h-40 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 rounded-full animate-pulse"
          style={{ 
            left: '60%', 
            top: '60%',
            animationDuration: '10s',
            animationDelay: '4s',
            filter: 'blur(25px)',
          }}
        />
      </div>

      {/* Enhanced Twinkling Effect */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-foreground/60 rounded-full animate-ping" style={{ animationDelay: "0s", animationDuration: "4s" }} />
        <div className="absolute top-3/4 left-3/4 w-1 h-1 bg-foreground/60 rounded-full animate-ping" style={{ animationDelay: "1s", animationDuration: "4s" }} />
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-foreground/60 rounded-full animate-ping" style={{ animationDelay: "2s", animationDuration: "4s" }} />
        <div className="absolute top-1/6 left-5/6 w-1 h-1 bg-foreground/60 rounded-full animate-ping" style={{ animationDelay: "0.5s", animationDuration: "4s" }} />
        <div className="absolute top-5/6 left-1/3 w-1 h-1 bg-foreground/60 rounded-full animate-ping" style={{ animationDelay: "1.5s", animationDuration: "4s" }} />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-foreground/60 rounded-full animate-ping" style={{ animationDelay: "3s", animationDuration: "5s" }} />
      </div>
    </div>
  );
}