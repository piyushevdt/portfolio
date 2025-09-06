"use client"
import React, { useState, useEffect } from 'react';
import Hero from '../components/Home/Hero';
import About from '../components/Home/About';
import Skills from '../components/Home/Skills';
import Projects from '../components/Home/Projects';
import Contact from '../components/Home/Contact';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@/styles/theme';
import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';
import AnimatedWelcome from '@/components/Home/AnimatedWelcome';

const Home: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 4500); 

    const hideTimer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000); 

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {showWelcome && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isExiting ? 0 : 1,
          transition: 'opacity 0.5s ease-out'
        }}>
          <AnimatedWelcome
            delay={0.08}
            duration={0.4}
            isExiting={isExiting}
          />
        </div>
      )}
      
      <div style={{ 
        opacity: showWelcome ? 0 : 1, 
        transition: 'opacity 0.5s ease-in',
        display: showWelcome ? 'block' : 'block'
      }}>
        <Navbar />
        <div id="home"><Hero /></div>
        <div id="about"><About /></div>
        <div id="skills"><Skills /></div>
        <div id="projects"><Projects /></div>
        <div id="contact"><Contact /></div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Home;