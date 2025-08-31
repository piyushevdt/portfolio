import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ProjectCard from '../ui/ProjectCard';
import { projects } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
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
        // backgroundColor: theme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" component="h2" align="center" sx={{ mb: 6,  color: "#fff", }}>
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