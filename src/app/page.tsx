"use client"
import React from 'react';
import Hero from '../components/Home/Hero';
import About from '../components/Home/About';
import Skills from '../components/Home/Skills';
import Projects from '../components/Home/Projects';
import Contact from '../components/Home/Contact';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@/styles/theme';
import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';

const Home: React.FC = () => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      
        <Navbar />
        <div id="home"><Hero /></div>
        <div id="about"><About /></div>
        <div id="skills"><Skills /></div>
        <div id="projects"><Projects /></div>
        <div id="contact"><Contact /></div>
        <Footer />
    </ThemeProvider>
  );
};

export default Home;