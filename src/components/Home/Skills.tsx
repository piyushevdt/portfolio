'use client';
import React, { useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
} from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';
import "@/styles/skills.css"

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'React', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'JavaScript', level: 95 },
  { name: 'Next.js', level: 80 },
  { name: 'HTML/CSS', level: 95 },
  { name: 'Material UI', level: 85 },
  { name: 'Framer Motion', level: 75 },
  { name: 'GSAP', level: 70 },
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
  const theme = useTheme();
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
        backgroundColor: theme.palette.background.default,
      }}
    >
            <ul className="background1">
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
      <Container maxWidth="lg" sx={{position: "relative", zIndex: 1}}>
        <Typography variant="h2" component="h2" align="center" sx={{ mb: 6 }}>
          My Skills
        </Typography>
        <Grid container spacing={4}>
          {skills.map((skill, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={skill.name}>
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
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: 1,
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.05)',
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      boxShadow: 3,
                      '& .progress-bar': {
                        background: theme.palette.common.white,
                      },
                      '& .skill-percent': {
                        color: theme.palette.primary.contrastText,
                      },
                    },
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {skill.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <Box
                        sx={{
                          height: 8,
                          backgroundColor: theme.palette.grey[300],
                          borderRadius: 4,
                          overflow: 'hidden',
                        }}
                      >
                        <motion.div
                          className="progress-bar"
                          style={{
                            height: '100%',
                            width: `${skill.level}%`,
                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            borderRadius: 4,
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </Box>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="skill-percent"
                    >
                      {skill.level}%
                    </Typography>
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
