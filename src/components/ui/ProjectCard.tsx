import React, { useRef, useEffect } from 'react';
import { Box, Typography, Chip, Card, CardMedia, CardContent, useTheme } from '@mui/material';
import { SxProps, Theme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Tilt } from 'react-tilt';
import { gsap } from 'gsap';

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

const defaultTiltOptions = {
  reverse: false,
  max: 15,
  perspective: 1000,
  scale: 1.05,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

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
  const cardRef = useRef<HTMLAnchorElement>(null); // Changed to HTMLAnchorElement

  const handleClick = (e: React.MouseEvent) => {
    if (!externalLink) {
      e.preventDefault();
      router.push(`/projects/${id}`);
    }
  };

  useEffect(() => {
    if (cardRef.current) {
      // Initial animation on mount
      gsap.fromTo(cardRef.current, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Hover animation
      const card = cardRef.current;
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
          boxShadow: `0 15px 30px ${theme.palette.mode === 'dark' ? 'rgba(71, 242, 248, 0.4)' : 'rgba(9, 240, 248, 0.6)'}`,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          boxShadow: theme.palette.mode === 'dark' ? "0 8px 25px rgba(71, 242, 248, 0.3)" : "0 8px 25px rgba(9, 240, 248, 0.43)",
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [theme.palette.mode]);

  return (
    <Tilt options={defaultTiltOptions} style={{ height: '100%' }}>
      <Card
        ref={cardRef}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s ease',
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(40, 40, 40, 0.3)' : 'rgba(5, 144, 250, 0.3)',
          backdropFilter: 'blur(8px)',
          color: "#fff",
          boxShadow: theme.palette.mode === 'dark' ? "0 8px 25px rgba(71, 242, 248, 0.3)" : "0 8px 25px rgba(9, 240, 248, 0.43)",
          borderRadius: 2,
          cursor: 'pointer',
          overflow: 'hidden',
          textDecoration: 'none', // Remove underline from anchor
          ...sx,
        }}
        component="a"
        href={externalLink ? link : `/projects/${id}`}
        target={externalLink ? "_blank" : "_self"}
        rel={externalLink ? "noopener noreferrer" : ""}
        onClick={handleClick}
      >
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            height: 200,
            objectFit: 'cover',
            borderBottom: `4px solid ${accentColor || theme.palette.primary.main}`,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            }
          }}
        />
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography 
            gutterBottom 
            variant="h5" 
            component="h3" 
            sx={{ 
              color: "#fff",
              fontWeight: 600,
              mb: 2,
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              mb: 3, 
              color: "rgba(255, 255, 255, 0.9)",
              lineHeight: 1.6,
            }}
          >
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
                    ? `${accentColor}20`
                    : theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(255, 255, 255, 0.2)',
                  color: accentColor
                    ? accentColor
                    : "#fff",
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  '&:hover': {
                    backgroundColor: accentColor
                      ? `${accentColor}40`
                      : theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(255, 255, 255, 0.3)',
                  }
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Tilt>
  );
};

export default ProjectCard;