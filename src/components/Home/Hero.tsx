import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomButton from '../ui/CustomButton';
import { scroller } from 'react-scroll';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 70%',
          end: 'bottom top',
          toggleActions: 'play reverse play reverse',
        },
      });

      tl.fromTo(
        titleRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        }
      )
        .fromTo(
          subtitleRef.current,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .fromTo(
          buttonsRef.current
            ? Array.from(buttonsRef.current.children)
            : [],
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .fromTo(
          scrollHintRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          '-=0.3'
        );

      // Floating glow animation
      gsap.to(glowRef.current, {
        y: 30,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    scroller.scrollTo('contact', {
      duration: 800,
      smooth: 'easeInOutQuart',
      offset: -64,
    });
  };

  const scrollToProjects = () => {
    scroller.scrollTo('projects', {
      duration: 800,
      smooth: 'easeInOutQuart',
      offset: -64,
    });
  };

  return (
    <Box
      ref={heroRef}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        color: 'white',
        perspective: '1000px',
      }}
    >
      {/* Animated Gradient Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(0,200,255,0.1) 0%, rgba(0,0,0,0) 70%)',
          zIndex: 0,
        }}
      />

      {/* Floating Glow Orbs */}
      <Box
        ref={glowRef}
        sx={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(0,200,255,0.2), rgba(0,255,200,0.1))',
          filter: 'blur(100px)',
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,200,255,0.15), transparent)',
          filter: 'blur(80px)',
          zIndex: 0,
          bottom: '10%',
          right: '5%',
          animation: 'float 4s ease-in-out infinite',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            ref={titleRef}
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: {
                xs: '3rem',
                sm: '4.5rem',
                md: '6rem',
                lg: '7rem',
              },
              lineHeight: 1.1,
              my: 2,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
            }}
          >
            Hi, I&apos;m{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #00c8ff, #00ffc8, #ff00c8)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradientShift 3s ease infinite',
              }}
            >
              Piyush
            </Box>
          </Typography>

          <Typography
            ref={subtitleRef}
            variant="h4"
            sx={{
              color: 'rgba(255,255,255,0.85)',
              mb: 2,
              fontWeight: 500,
              letterSpacing: '0.05em',
            }}
          >
            Frontend Developer
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.6)',
              mb: 6,
              maxWidth: '600px',
              mx: 'auto',
              fontSize: '1.1rem',
            }}
          >
            Crafting beautiful, responsive web experiences with modern technologies
          </Typography>

          <Box
            ref={buttonsRef}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
              flexDirection: { xs: 'column', sm: 'row' },
              mb: 6,
            }}
          >
            <CustomButton
              variant="contained"
              size="large"
              onClick={scrollToContact}
              sx={{
                px: 5,
                py: 1.8,
                fontSize: '1.1rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #00c8ff, #00ffc8)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px) scale(1.05)',
                  boxShadow: '0 10px 30px rgba(0,200,255,0.3)',
                },
              }}
            >
              Get In Touch
            </CustomButton>

            <CustomButton
              variant="outlined"
              size="large"
              onClick={scrollToProjects}
              sx={{
                px: 5,
                py: 1.8,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderWidth: '2px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px) scale(1.05)',
                  borderColor: '#00ffc8',
                  boxShadow: '0 5px 20px rgba(0,255,200,0.2)',
                },
              }}
            >
              Explore Work
            </CustomButton>
          </Box>

          {/* Scroll Hint with Animation */}
          <Box
            ref={scrollHintRef}
            sx={{
              position: 'relative',
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              opacity: 0.7,
              transition: 'opacity 0.3s ease',
              '&:hover': {
                opacity: 1,
              },
            }}
            onClick={() => scrollToProjects()}
          >
            <Typography
              variant="caption"
              sx={{
                mb: 1,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
              }}
            >
              Scroll to explore
            </Typography>
            <KeyboardArrowDownIcon sx={{ animation: 'bounce 1.5s infinite' }} />
          </Box>
        </Box>
      </Container>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(10px); }
          }
        `}
      </style>
    </Box>
  );
};

export default Hero;