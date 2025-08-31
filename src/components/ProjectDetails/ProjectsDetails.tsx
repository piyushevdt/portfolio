"use client"
import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { Box, Container, Typography, Grid, Chip, Stack, Button, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import Head from 'next/head';
import Image from 'next/image';

const ProjectDetails: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;

  const project = projects.find(p => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Head>
        <title>{project.title} | My Portfolio</title>
        <meta name="description" content={project.description} />
      </Head>

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        sx={{
          py: 8,
          // backgroundColor: theme.palette.background.default,
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box
                component={motion.div}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: "0 0 13px 6px rgba(0, 249, 241, 0.81)",
                  // height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  height={500}
                  width={500}
                  layout='responsive'
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                />
                {/* <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                /> */}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h3"
                  component="h1"
                  gutterBottom
                  sx={{ fontWeight: 700, color: "#fff" }}
                >
                  {project.title}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                  {project.technologies.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      // color="primary"
                      variant="outlined"
                      sx={{ color: "#fff", borderColor: "#fff" }}
                    />
                  ))}
                </Stack>

                <Typography variant="body1" paragraph sx={{ mb: 3, color: "#fff" }}>
                  {project.content}
                </Typography>

                {project.githubUrl && (
                  <Button
                    variant="outlined"
                    // color="primary"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ mr: 2, mb: 2 }}
                  >
                    View on GitHub
                  </Button>
                )}

                {project.liveUrl && (
                  <Button
                    variant="contained"
                    color="primary"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ mb: 2 }}
                  >
                    Live Demo
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 6 }} />

          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, color: "#fff" }}>
              Features
            </Typography>

            <Grid container spacing={2}>
              {project.features.map((feature, index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={index}>
                  <Box
                    component={motion.div}
                    whileHover={{ y: -5 }}
                    sx={{
                      color: "#fff",
                      background:
                        "transparent linear-gradient(180deg, rgba(0, 238, 255, 0.67) 0%, rgba(0, 238, 255, 0.05) 100%)",
                      borderRadius: "16px",
                      padding: 3,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      boxShadow: "0 0 10px rgba(129, 129, 129, 0.81)",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: "0 0 13px 6px rgba(0, 249, 241, 0.81)",
                      },
                    }}
                  >
                    <Typography variant="body1">{feature}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProjectDetails;