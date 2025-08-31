'use client';
import React, { useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
} from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';
import "@/styles/skills.css"

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'React', level: 90, image: '/images/reactjs.svg' },
  { name: 'Next.js', level: 80, image: 'https://www.svgrepo.com/show/342062/next-js.svg' },
  { name: 'JavaScript', level: 95, image: '/images/javascript.svg' },
  { name: 'TypeScript', level: 85, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png' },
  { name: 'HTML', level: 95, image: '/images/html.svg' },
  { name: 'CSS', level: 95, image: '/images/css.svg' },
  { name: 'Material UI', level: 85, image: '/images/MUI.svg' },
  { name: 'Framer Motion', level: 75, image: 'https://images.seeklogo.com/logo-png/44/3/framer-motion-logo-png_seeklogo-446185.png' },
  { name: 'GSAP', level: 70, image: '/images/tailwind.svg' },
];

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
      });
    }
  }, []);

  return (
    <Box
      ref={sectionRef}
      id="skills"
      sx={{
        py: 10,
        // backgroundColor: theme.palette.background.default,
      }}
    >
      {/* <ul className="background1">
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
      </ul> */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Typography variant="h2" component="h2" align="center" sx={{ mb: 6, color: "#fff" }}>
          My Skills
        </Typography>
        <Grid container spacing={4} sx={{justifyContent: 'center'}}>
          {skills.map((skill, index) => (
            <Grid size={{ xs: 12, sm: 4, md: 3 }} key={skill.name}>
              <motion.div
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
              >
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.75)', // semi-transparent
                    boxShadow: 1,
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(0)',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      backgroundColor: 'rgba(252, 251, 252, 0.3)',
                      backdropFilter: 'blur(8px)',
                      color: "#fff",
                      fontWeight: '700',
                      boxShadow: "0 4px 20px rgba(255, 255, 255, 0.2)",
                    },
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    {skill.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <Box
                      className="skill-icon"
                      component="img"
                      src={skill.image}
                      alt={skill.name}
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: 'contain',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Skills;
