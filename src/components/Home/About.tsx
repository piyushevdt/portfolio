import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Avatar, Grid, useTheme } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const theme = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && imageRef.current && textRef.current) {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50,
        duration: 1,
      });

      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 75%',
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from(Array.from(textRef.current.children), {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        },
        x: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
      });
    }

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

      element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      if (avatarRef.current) {
        avatarRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
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
        py: 10,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" component="h2" align="center" sx={{ mb: 6 }}>
          About Me
        </Typography>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              ref={imageRef}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                perspective: '1000px',
              }}
            >
              <Box
                ref={avatarRef}
                sx={{
                  width: 300,
                  height: 300,
                  transition: 'transform 0.1s ease-out',
                  transformStyle: 'preserve-3d',
                }}
              >
                <Avatar
                  src="/project.jpg"
                  alt="Profile Image"
                  sx={{
                    width: '100%',
                    height: '100%',
                    boxShadow: 3,
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box ref={textRef}>
              <Typography variant="h5" component="h3" gutterBottom>
                Who am I
              </Typography>
              <Typography paragraph sx={{ mb: 2 }}>
                I&apos;m a passionate frontend developer with 5 years of experience...
              </Typography>
              <Typography paragraph sx={{ mb: 2 }}>
                My goal is to build applications that are not only functional
                but also provide an exceptional user experience. I pay attention
                to details and always strive to write clean, maintainable code.
              </Typography>
              <Typography paragraph>
                When I&apos;m not coding, you can find me exploring new technologies,
                contributing to open-source projects, or enjoying outdoor
                activities.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
