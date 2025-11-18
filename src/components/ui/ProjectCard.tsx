import React, { useRef } from 'react';
import { Box, Typography, Chip, Card, CardMedia, CardContent, useTheme } from '@mui/material';
import { SxProps, Theme } from '@mui/material';
import { useRouter } from 'next/navigation';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
  accentColor?: string;
  sx?: SxProps<Theme>;
  externalLink?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  technologies,
  image,
  link,
  accentColor,
  sx,
  externalLink = false
}) => {
  const theme = useTheme();
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!externalLink) {
      e.preventDefault();
      router.push(`/projects/${id}`);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const cardRect = card.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;
    
    // Calculate mouse position relative to the card center
    const centerX = cardRect.left + cardWidth / 2;
    const centerY = cardRect.top + cardHeight / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation values (adjust divisor to control sensitivity)
    const rotateY = (mouseX / (cardWidth / 2)) * 10; // Max 10 degrees rotation
    const rotateX = -(mouseY / (cardHeight / 2)) * 10; // Max 10 degrees rotation
    
    // Apply the transformation
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    
    // Add subtle shadow effect based on mouse position
    const shadowX = -rotateY / 2;
    const shadowY = rotateX / 2;
    card.style.boxShadow = `
      ${shadowX}px ${shadowY}px 15px rgba(0, 0, 0, 0.2),
      ${shadowX * 2}px ${shadowY * 2}px 30px rgba(0, 0, 0, 0.1)
    `;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    // Reset transformations with smooth transition
    const card = cardRef.current;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    card.style.boxShadow = theme.palette.mode === 'dark' 
      ? "0 8px 25px rgba(71, 242, 248, 0.3)" 
      : "0 8px 25px rgba(9, 240, 248, 0.43)";
    
    // Remove transition after reset to avoid interference with hover effect
    setTimeout(() => {
      card.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
    }, 300);
  };

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    
    // Remove transition for direct response to mouse movement
    cardRef.current.style.transition = 'none';
  };

  return (
    <Box
      component="a"
      href={externalLink ? link : `/projects/${id}`}
      target={externalLink ? "_blank" : "_self"}
      rel={externalLink ? "noopener noreferrer" : ""}
      onClick={handleClick}
      sx={{
        textDecoration: 'none',
        display: 'block',
        height: '100%'
      }}
    >
      <Card
        ref={cardRef}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          background:
          "transparent linear-gradient(180deg, rgba(0, 238, 255, 0.67) 0%, rgba(0, 238, 255, 0.15) 100%)",
          backdropFilter: 'blur(8px)',
          color: "#fff",
          boxShadow: theme.palette.mode === 'dark' 
            ? "0 8px 25px rgba(71, 242, 248, 0.3)" 
            : "0 8px 25px rgba(9, 240, 248, 0.43)",
          borderRadius: 4,
          cursor: 'pointer',
          transformStyle: 'preserve-3d',
          ...sx,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            height: 200,
            objectFit: 'cover',
            borderBottom: `4px solid ${accentColor || theme.palette.primary.main}`,
            transform: 'translateZ(30px)', // Adds depth to the image
          }}
        />
        <CardContent sx={{ flexGrow: 1, transform: 'translateZ(20px)' }}> {/* Adds depth to content */}
          <Typography gutterBottom variant="h5" component="h3" sx={{ color: "#fff" }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "#fff" }}>
            {description}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, transform: 'translateZ(10px)' }}> {/* Adds depth to chips */}
            {technologies.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  backgroundColor: accentColor
                    ? `${accentColor}20`
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
    </Box>
  );
};

export default ProjectCard;