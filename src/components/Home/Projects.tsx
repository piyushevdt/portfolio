import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid, useTheme } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ProjectCard from '../ui/ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'A full-featured online store with cart functionality, user authentication, and payment processing.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: '/images/project1.jpg',
    link: '#',
  },
  {
    title: 'Portfolio Website',
    description: 'A responsive portfolio website with animations and interactive elements.',
    technologies: ['Next.js', 'Material UI', 'Framer Motion'],
    image: '/images/project2.jpg',
    link: '#',
  },
  {
    title: 'Task Management App',
    description: 'A productivity app for managing tasks with drag-and-drop functionality.',
    technologies: ['React', 'Redux', 'Firebase'],
    image: '/images/project3.jpg',
    link: '#',
  },
  {
    title: 'Weather Dashboard',
    description: 'Real-time weather information with interactive maps and forecasts.',
    technologies: ['React', 'TypeScript', 'OpenWeather API'],
    image: '/images/project4.jpg',
    link: '#',
  },
];

const Projects: React.FC = () => {
  const theme = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && projectsRef.current) {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
      });

      gsap.from(projectsRef.current.children, {
        scrollTrigger: {
          trigger: projectsRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
      });
    }
  }, []);

  return (
    <Box 
      ref={sectionRef}
      id="projects"
      sx={{ 
        py: 10,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" component="h2" align="center" sx={{ mb: 6 }}>
          My Projects
        </Typography>
        <Grid container spacing={4} ref={projectsRef}>
          {projects.map((project, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <ProjectCard 
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                image={project.image}
                link={project.link}
                delay={index * 0.1}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Projects;