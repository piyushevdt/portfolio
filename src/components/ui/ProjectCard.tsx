import React from 'react';
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

  const handleClick = (e: React.MouseEvent) => {
    if (!externalLink) {
      e.preventDefault();
      router.push(`/projects/${id}`);
    }
  };

  return (
    <Card
      sx={{
        // borderRadius: "20px",
        // boxShadow: `0 5px 10px rgba(0, 0, 0, 0.1)`,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: `0 10px 20px rgba(0, 0, 0, 0.2)`,
        },
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(40, 40, 40, 0.3)' : 'rgba(5, 144, 250, 0.3)',
        backdropFilter: 'blur(8px)',
        color: "#fff",
        boxShadow: theme.palette.mode === 'dark' ? "0 8px 25px rgba(71, 242, 248, 0.3)" : "0 8px 25px rgba(9, 240, 248, 0.43)",
        // p: 3,
        borderRadius: 2,
        cursor: 'pointer',
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
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h3" sx={{ color: "#fff" }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: "#fff" }}>
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
  );
};

export default ProjectCard;