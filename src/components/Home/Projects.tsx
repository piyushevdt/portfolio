import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Grid, Pagination, useTheme } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ProjectCard from '../ui/ProjectCard';
import { projects } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const projectsPerPage = 4;
  const theme = useTheme();


  const getAccentColor = (index: number) => {
    const colors = [
      '#FF5252',
      '#FF9800',
      '#ffff11',
      '#FBC02D',
      '#CE93D8',
      '#ffffff',
    ];
    return colors[index % colors.length];
  };

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (page - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
  }, [page]);

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
       <Box sx={{display: 'flex', justifyContent: 'center' }}>
         <Typography variant="h2" component="h2" align="center" sx={{
          mb: 6,
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
        }}>
          My Projects
        </Typography>
       </Box>
        <Grid container spacing={4} ref={projectsRef}>
          {currentProjects.map((project, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <ProjectCard
                id={project.id}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                image={project.image}
                link={project.link}
                accentColor={getAccentColor(startIndex + index)}
                externalLink={false}
              />
            </Grid>
          ))}
        </Grid>
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#fff',
                },
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Projects;