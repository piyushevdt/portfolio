import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';
import ProjectCard from '../ui/ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'A full-featured online store with cart functionality, user authentication, and payment processing.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: '/images/project1.jpg', // Updated image path
    link: '#',
    accentColor: '#6366f1',
  },
  {
    title: 'Portfolio Website',
    description: 'A responsive portfolio website with animations and interactive elements.',
    technologies: ['Next.js', 'Material UI', 'Framer Motion'],
    image: '/images/project2.jpg', // Updated image path
    link: '#',
    accentColor: '#10b981',
  },
  {
    title: 'Task Management App',
    description: 'A productivity app for managing tasks with drag-and-drop functionality.',
    technologies: ['React', 'Redux', 'Firebase'],
    image: '/images/project3.jpg', // Updated image path
    link: '#',
    accentColor: '#f59e0b',
  },
  {
    title: 'Weather Dashboard',
    description: 'Real-time weather information with interactive maps and forecasts.',
    technologies: ['React', 'TypeScript', 'OpenWeather API'],
    image: '/images/project4.jpg', // Updated image path
    link: '#',
    accentColor: '#3b82f6',
  },
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && titleRef.current && projectsRef.current) {
      // Section entrance animation
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

      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'back.out',
      });

      // Grid items animation
      gsap.from(projectsRef.current.children, {
        scrollTrigger: {
          trigger: projectsRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out',
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Box
      ref={sectionRef}
      id="projects"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: '#0f172a',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 80% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          ref={titleRef}
          variant="h2"
          component={motion.h2}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{
            mb: 8,
            textAlign: 'center',
            color: 'white',
            fontSize: { xs: '2.5rem', md: '3rem' },
            fontWeight: 700,
            '&::after': {
              content: '""',
              display: 'block',
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #3b82f6, #6366f1)',
              margin: '16px auto 0',
              borderRadius: '2px',
            },
          }}
        >
          My Projects
        </Typography>

        <Grid
          container
          spacing={4}
          ref={projectsRef}
          sx={{
            position: 'relative',
            zIndex: 1,
          }}
        >
          {projects.map((project, index) => (
            <Grid
              size={{ xs: 12, sm: 6 }}
              key={index}
              component={motion.div}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                image={project.image.replace('.jpeg', '.jpg')} // Normalize image extensions
                link={project.link}
                delay={index * 0.1}
                accentColor={project.accentColor}
                sx={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`,
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Projects;