"use client";
import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, IconButton, Link } from '@mui/material';
import { gsap } from 'gsap';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      gsap.from(footerRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
      });
    }
  }, []);

  return (
    <Box 
      ref={footerRef}
      component="footer"
      sx={{ 
        py: 6,
        background:
          "transparent linear-gradient(180deg, rgba(0, 238, 255, 0.67) 0%, rgba(0, 238, 255, 0.15) 100%)",
        color: '#fff',
        boxShadow: "0 0 13px 6px rgba(0, 249, 241, 0.81)",
        backdropFilter: 'blur(2px)',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <IconButton 
            href="https://github.com/piyush25dev" 
            target="_blank" 
            rel="noopener"
            color="inherit"
            sx={{ mx: 1 }}
          >
            <GitHub fontSize="large" />
          </IconButton>
          <IconButton 
            href="https://www.linkedin.com/in/piyush-kumar-dewangan-94124a256" 
            target="_blank" 
            rel="noopener"
            color="inherit"
            sx={{ mx: 1 }}
          >
            <LinkedIn fontSize="large" />
          </IconButton>
          <IconButton 
            href="mailto:piyushkdbittu@gmail.com" 
            color="inherit"
            sx={{ mx: 1 }}
          >
            <Email fontSize="large" />
          </IconButton>
        </Box>
        <Typography variant="body1" align="center" sx={{fontWeight: '700'}}>
          © {new Date().getFullYear()} Piyush Kumar Dewangan. All rights reserved.
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Built with <Link href="https://nextjs.org/" color="inherit" target="_blank">Next.js</Link>,{' '}
          <Link href="https://mui.com/" color="inherit" target="_blank">Material UI</Link>,{' '}
          <Link href="https://www.framer.com/motion/" color="inherit" target="_blank">Framer Motion</Link>, and{' '}
          <Link href="https://greensock.com/gsap/" color="inherit" target="_blank">GSAP</Link>.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;