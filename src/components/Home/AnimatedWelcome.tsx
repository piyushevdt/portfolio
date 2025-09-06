'use client';

import React, { useEffect, useRef } from 'react';
import { Box, Container } from '@mui/material';
import { gsap } from 'gsap';

interface AnimatedWelcomeProps {
  text?: string;
  delay?: number;
  duration?: number;
  isExiting?: boolean;
}

const AnimatedWelcome: React.FC<AnimatedWelcomeProps> = ({
  text = "Hi, I'm Piyush.\nWelcome to My Portfolio",
  delay = 0.08,
  duration = 0.4,
  isExiting = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Split text into lines
  const lines = text.split('\n');

  useEffect(() => {
    if (!textRef.current) return;

    // Clear any existing content
    textRef.current.innerHTML = '';

    // Create spans for each character
    lines.forEach((line, lineIndex) => {
      const lineDiv = document.createElement('div');
      lineDiv.style.display = 'flex';
      lineDiv.style.justifyContent = 'center';
      lineDiv.style.marginBottom = lineIndex < lines.length - 1 ? '16px' : '0';
      
      line.split('').forEach((letter) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.display = 'inline-block';
        lineDiv.appendChild(span);
      });
      
      textRef.current?.appendChild(lineDiv);
    });

    // Create GSAP animation timeline
    timelineRef.current = gsap.timeline();
    
    // Animate each character
    const allSpans = textRef.current.querySelectorAll('span');
    allSpans.forEach((span, index) => {
      timelineRef.current?.to(span, {
        opacity: 1,
        y: 0,
        duration: duration,
        delay: index * delay,
        ease: "power2.out"
      }, 0);
    });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [text, delay, duration, lines]);

  // Handle exit animation
  useEffect(() => {
    if (isExiting && timelineRef.current && textRef.current) {
      // Create exit animation
      const exitTimeline = gsap.timeline();
      
      // Animate all characters out
      const allSpans = textRef.current.querySelectorAll('span');
      exitTimeline.to(allSpans, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        stagger: 0.01,
        ease: "power2.in"
      });
    }
  }, [isExiting]);

  return (
    <Container maxWidth="lg" ref={containerRef}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: 2,
          color: 'primary.main',
        }}
      >
        <div
          ref={textRef}
          style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            lineHeight: 1.2,
            whiteSpace: 'pre-wrap',
            userSelect: 'none',
            fontWeight: 700,
          }}
        />
      </Box>
    </Container>
  );
};

export default AnimatedWelcome;