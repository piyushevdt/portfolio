import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Avatar, Grid, useTheme, Button } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { TextPlugin } from 'gsap/dist/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const About: React.FC = () => {
  const theme = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Section entrance animation
    if (sectionRef.current) {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: 'power3.out',
      });
    }

    // Title animation
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
      });
    }

    // Image animation
    if (imageRef.current) {
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 75%',
        },
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
      });

      // Continuous subtle floating animation
      gsap.to(imageRef.current, {
        y: 20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Text animation
    if (textRef.current) {
      const textElements = Array.from(textRef.current.children);
      gsap.from(textElements, {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 70%',
        },
        x: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      });
    }

    // Avatar 3D tilt effect
    const handleMouseMove = (e: MouseEvent) => {
      const element = avatarRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * -10;

      gsap.to(element, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformOrigin: 'center center',
        ease: 'power1.out',
        duration: 0.5,
      });

      // Parallax effect for the shadow
      const shadowX = (x - centerX) / 20;
      const shadowY = (y - centerY) / 20;
      const shadowBlur = 20 + Math.abs(x - centerX) / 10;

      element.style.boxShadow = `
        ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.3),
        0 0 40px rgba(98, 0, 234, 0.3)
      `;
    };

    const handleMouseLeave = () => {
      if (avatarRef.current) {
        gsap.to(avatarRef.current, {
          rotateX: 0,
          rotateY: 0,
          boxShadow: '0 10px 30px rgba(98, 0, 234, 0.3)',
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
        });
      }
    };

    const container = avatarRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <Box
      ref={sectionRef}
      id="about"
      sx={{
        py: 12,
        background: `
          linear-gradient(135deg, 
            ${theme.palette.background.default} 0%, 
            ${theme.palette.background.paper} 50%, 
            ${theme.palette.background.default} 100%)
        `,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at 20% 50%, 
            ${theme.palette.secondary.main}33 0%, 
            transparent 40%)`,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at 80% 70%, 
            ${theme.palette.primary.main}33 0%, 
            transparent 40%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg">
        <Box ref={titleRef} sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 2,
              fontWeight: 700,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: 4,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: 2,
              },
            }}
          >
            About Me
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Get to know the person behind the code
          </Typography>
        </Box>

        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              ref={imageRef}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                perspective: '1000px',
                position: 'relative',
              }}
            >
              <Box
                ref={avatarRef}
                sx={{
                  width: 280,
                  height: 280,
                  borderRadius: '50%',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 10px 30px rgba(98, 0, 234, 0.3)',
                  transition: 'transform 0.5s ease-out',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: -10,
                    borderRadius: '50%',
                    background: `linear-gradient(45deg, 
                      ${theme.palette.primary.main}, 
                      ${theme.palette.secondary.main})`,
                    zIndex: -1,
                    opacity: 0.7,
                    filter: 'blur(20px)',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: -5,
                    borderRadius: '50%',
                    border: `2px solid ${theme.palette.primary.main}`,
                    zIndex: -1,
                    opacity: 0.5,
                  },
                }}
              >
                <Avatar
                  src="/images/Photo.jpg"
                  alt="Profile Image"
                  sx={{
                    width: '100%',
                    height: '100%',
                    border: `3px solid ${theme.palette.background.paper}`,
                    transform: 'translateZ(30px)',
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box ref={textRef}>
              <Typography
                variant="h4"
                component="h3"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: theme.palette.text.primary,
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: 60,
                    height: 4,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, transparent)`,
                    borderRadius: 2,
                  },
                }}
              >
                Who am I?
              </Typography>
              <Typography
                paragraph
                sx={{
                  mb: 3,
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  color: theme.palette.text.secondary,
                }}
              >
                I&apos;m a <strong style={{ color: theme.palette.primary.main }}>passionate frontend developer</strong> with 5 years of experience crafting immersive digital experiences. I specialize in creating performant, accessible, and visually stunning web applications.
              </Typography>
              <Typography
                paragraph
                sx={{
                  mb: 3,
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  color: theme.palette.text.secondary,
                }}
              >
                My goal is to build applications that are not only functional but also provide an <strong style={{ color: theme.palette.secondary.main }}>exceptional user experience</strong>. I pay attention to details and always strive to write clean, maintainable code with a focus on scalability and performance.
              </Typography>
              <Typography
                paragraph
                sx={{
                  mb: 4,
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  color: theme.palette.text.secondary,
                }}
              >
                When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying outdoor activities that keep me inspired and energized.
              </Typography>

              <Button
                variant="outlined"
                size="large"
                component="a"
                href="/pdf/resume.pdf"
                download="Piyush_Resume.pdf" // This will be the filename when downloaded
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    background: `linear-gradient(135deg, 
        ${theme.palette.primary.main}, 
        ${theme.palette.secondary.main})`,
                    color: theme.palette.common.white,
                    boxShadow: `0 5px 15px ${theme.palette.primary.main}40`,
                  },
                }}
              >
                Download Resume
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;