import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import CustomButton from '../ui/CustomButton';
import "@/styles/hero.css"

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const theme = useTheme();
    const heroRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const bubblesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        if (mounted && heroRef.current && textRef.current) {
            gsap.from(heroRef.current, {
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });
    
            gsap.from(textRef.current.children, {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out',
            });
    
            // Parallax effect
            gsap.to(heroRef.current, {
                y: -50,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
    
            // Create bubbles
            const bubblesContainer = bubblesRef.current; // Capture current value
            if (bubblesContainer) {
                const bubblesCount = 15;
                const bubbles: HTMLElement[] = [];
                
                for (let i = 0; i < bubblesCount; i++) {
                    const bubble = document.createElement('div');
                    bubble.style.position = 'absolute';
                    bubble.style.borderRadius = '50%';
                    bubble.style.background = `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.05})`;
                    bubble.style.width = `${Math.random() * 20 + 10}px`;
                    bubble.style.height = bubble.style.width;
                    
                    // Random position
                    bubble.style.left = `${Math.random() * 100}%`;
                    bubble.style.top = `${Math.random() * 100}%`;
                    
                    bubblesContainer.appendChild(bubble);
                    bubbles.push(bubble);
                }
    
                // Animate bubbles
                bubbles.forEach(bubble => {
                    const duration = Math.random() * 15 + 10;
                    const delay = Math.random() * 5;
                    const xMovement = (Math.random() - 0.5) * 100;
                    
                    gsap.to(bubble, {
                        y: -150,
                        x: xMovement,
                        opacity: 0,
                        duration: duration,
                        delay: delay,
                        ease: 'none',
                        onComplete: () => {
                            // Reset position and restart animation
                            bubble.style.left = `${Math.random() * 100}%`;
                            bubble.style.top = '100%';
                            bubble.style.opacity = '0.5';
                            gsap.to(bubble, {
                                y: -150,
                                x: (Math.random() - 0.5) * 100,
                                opacity: 0,
                                duration: duration,
                                ease: 'none',
                                repeat: -1,
                                repeatDelay: 0
                            });
                        }
                    });
                });
            }
    
            return () => {
                // Use the captured value in cleanup
                if (bubblesContainer) {
                    bubblesContainer.innerHTML = '';
                }
                // Clean up GSAP animations
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
                gsap.killTweensOf('*');
            };
        }
    }, [mounted]);

    return (
        <Box
            ref={heroRef}
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                background: `
                    linear-gradient(
                        135deg,
                        ${theme.palette.primary.main} 0%,
                        ${theme.palette.secondary.main} 25%,
                        ${theme.palette.primary.dark} 50%,
                        ${theme.palette.secondary.dark} 75%,
                        ${theme.palette.primary.main} 100%
                    )`,
                backgroundSize: '400% 400%',
                animation: 'gradientWave 12s ease infinite',
                '@keyframes gradientWave': {
                    '0%': {
                        backgroundPosition: '0% 50%',
                    },
                    '50%': {
                        backgroundPosition: '100% 50%',
                    },
                    '100%': {
                        backgroundPosition: '0% 50%',
                    },
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `
                        radial-gradient(
                            circle at 75% 30%,
                            rgba(255, 255, 255, 0.1) 0%,
                            transparent 50%
                        )`,
                    animation: 'pulse 8s ease infinite alternate',
                    '@keyframes pulse': {
                        '0%': {
                            transform: 'scale(1)',
                            opacity: 0.5,
                        },
                        '100%': {
                            transform: 'scale(1.2)',
                            opacity: 0.2,
                        },
                    },
                },
            }}
        >
            <ul className="background">
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
</ul>
            {/* Bubbles container */}
            <Box 
                ref={bubblesRef}
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    zIndex: 0,
                }}
            />
            
            <Container maxWidth="lg">
                <Box ref={textRef} sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <Typography variant="h1" 
                        component="h1" 
                        sx={{ mb: 2, fontWeight: 700, textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}>
                        Hi, I&apos;m Piyush Kumar Dewangan
                    </Typography>
                    <Typography variant="h2" 
                        component="h2"  
                        sx={{ mb: 2, textShadow: '0 2px 6px rgba(0, 0, 0, 0.2)' }}>
                        Frontend Developer
                    </Typography>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: {xs: 2, sm: 4, md: 6},flexDirection: {xs: "column", sm: "row"} }}>
                        <CustomButton 
                            variant="contained" 
                            color="secondary" 
                            size="large"
                            href="#contact"
                            sx={{ 
                                color: 'white',
                                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Contact Me
                        </CustomButton>
                        <CustomButton 
                            variant="outlined" 
                            color="inherit" 
                            size="large"
                            href="#projects"
                            sx={{
                                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            View Work
                        </CustomButton>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Hero;