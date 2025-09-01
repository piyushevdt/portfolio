import React from 'react';
import { Box, Typography, Chip, Card, CardMedia, CardContent, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { SxProps, Theme } from '@mui/material';


interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
  delay?: number;
  accentColor?: string;
  sx?: SxProps<Theme>;

}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  image,
  link,
  delay = 0,
  accentColor,
  sx
}) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -10 }}
      style={{ height: '100%' }}
    >
      <Card
        sx={{
          color: "#fff",
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background:
            "transparent linear-gradient(180deg, rgba(0, 238, 255, 0.67) 0%, rgba(0, 238, 255, 0.05) 100%)",
          borderRadius: "16px",
          // padding: 3,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          boxShadow: "0 0 10px rgba(129, 129, 129, 0.81)",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 0 13px 6px rgba(0, 249, 241, 0.81)",
            background:
            "transparent linear-gradient(180deg, rgba(0, 238, 255, 0.92) 0%, rgba(0, 238, 255, 0.05) 100%)",
          },
          // backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.background.paper,
          ...sx, 
        }}
        component="a"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            height: 200,
            objectFit: 'cover',
            borderBottom: `4px solid ${accentColor || theme.palette.primary.main}`,
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h3" sx={{color: "#fff", }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "#fff", }}>
            {description}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {technologies.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  backgroundColor: accentColor
                    ? `${accentColor}20` // Adds transparency (20% opacity)
                    : theme.palette.mode === 'dark'
                      ? theme.palette.grey[800]
                      : theme.palette.grey[200],
                  color: accentColor
                    ? accentColor
                    : theme.palette.text.primary,
                  fontWeight: 500,
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;