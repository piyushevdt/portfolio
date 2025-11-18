"use client"
import React, { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import {
  Container,
  Typography,
  Box,
  Chip,
  Grid,
  Button,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { projects } from '@/data/projects';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Create motion components
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionPaper = motion(Paper);
const MotionChip = motion(Chip);
const MotionDivider = motion(Divider);

const ProjectDetails: React.FC = () => {
  const params = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Create refs for scroll animations with proper typing
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const challengesRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get the project id from params and find the matching project
  const projectId = params?.id as string;
  const project = projects.find(p => p.id === projectId);

  // Scroll animations - conditionally apply based on device capability
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start", "end"]
  });

  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: isMobile ? 50 : 100, // Lower stiffness for mobile for better performance
    damping: isMobile ? 15 : 30,
    restDelta: 0.001
  });

  // Parallax effect for project image - less intense on mobile
  const imageY = useTransform(smoothScrollProgress, [0, 0.5], [0, isMobile ? -50 : -100]);
  const imageScale = useTransform(smoothScrollProgress, [0, 0.5], [1, isMobile ? 1.05 : 1.1]);

  // Header animations - less intense on mobile
  const headerY = useTransform(smoothScrollProgress, [0, 0.1], [0, isMobile ? -10 : -20]);
  const headerOpacity = useTransform(smoothScrollProgress, [0, 0.1], [1, 0.8]);

  // Check if elements are in view
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.3 });
  const isImageInView = useInView(imageRef, { once: false, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.1, // Faster stagger on mobile
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: isMobile ? 0.3 : 0.5 } // Faster animations on mobile
    },
  };

  // Staggered features animation - simpler on mobile
  const featureVariants = {
    hidden: { opacity: 0, y: isMobile ? 30 : 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * (isMobile ? 0.05 : 0.1),
        duration: isMobile ? 0.4 : 0.6,
        ease: "easeOut"
      }
    })
  };

  // Challenge/solution cards animation - simpler on mobile
  const cardVariants = {
    hidden: { opacity: 0, x: isMobile ? -20 : -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * (isMobile ? 0.1 : 0.15),
        duration: isMobile ? 0.5 : 0.7,
        ease: "easeOut"
      }
    })
  };

  // Setup GSAP animations - conditionally based on device capability
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Skip intensive animations on mobile devices
    const shouldSkipIntensiveAnimations = isMobile;

    // Create a variable to store the Lenis instance
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lenis: any = null;

    // Function to initialize Lenis after making sure it's available
    const initLenis = () => {
      if (window.Lenis) {
        // Less intensive settings for mobile
        lenis = new window.Lenis({
          duration: isMobile ? 0.8 : 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: isMobile ? true : false, // Enable smooth touch for mobile
          touchMultiplier: isMobile ? 1.5 : 2,
        });

        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
      } else {
        console.warn("Lenis is not available yet");
      }
    };

    // Check if Lenis is already available
    if (typeof window.Lenis === 'function') {
      initLenis();
    } else {
      // If not available, set up a listener for when the script loads
      const checkLenisInterval = setInterval(() => {
        if (typeof window.Lenis === 'function') {
          initLenis();
          clearInterval(checkLenisInterval);
        }
      }, 100);

      // Clear interval after 5 seconds to prevent infinite checking
      setTimeout(() => clearInterval(checkLenisInterval), 5000);
    }

    // GSAP ScrollTrigger animations - skip intensive ones on mobile
    if (!shouldSkipIntensiveAnimations) {
      const ctx = gsap.context(() => {
        // Background animation - less items on mobile
        gsap.to('.background1 li', {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: isMobile ? 0.5 : 1,
          },
          y: (i) => -100 * (i % 5),
          opacity: (i) => 0.3 + (i % 5) * 0.1,
          duration: 1,
          ease: 'power1.inOut',
          stagger: 0.1,
        });

        // Features section animation
        if (featuresRef.current) {
          const featureTitles = featuresRef.current.querySelectorAll('.feature-title') as NodeListOf<HTMLElement>;
          gsap.from(featureTitles, {
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            x: -50,
            opacity: 0,
            duration: isMobile ? 0.5 : 0.8,
            stagger: isMobile ? 0.1 : 0.2,
          });
        }

        // Challenges section animation
        if (challengesRef.current) {
          const challengeCards = challengesRef.current.querySelectorAll('.challenge-card') as NodeListOf<HTMLElement>;
          gsap.from(challengeCards, {
            scrollTrigger: {
              trigger: challengesRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
            scale: 0.95,
            opacity: 0,
            duration: isMobile ? 0.5 : 0.8,
            stagger: isMobile ? 0.2 : 0.3,
            ease: 'back.out(1.2)',
          });
        }
      });

      // Clean up animations when component unmounts
      return () => {
        ctx.revert();
        if (lenis) {
          lenis.destroy();
        }
      };
    } else {
      // Minimal cleanup for mobile
      return () => {
        if (lenis) {
          lenis.destroy();
        }
      };
    }
  }, [project, isMobile]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If project not found, show not found page or redirect
  if (!project) {
    return (
      <Box sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.background.default
      }}>
        <Typography variant="h4">Project not found</Typography>
      </Box>
    );
  }

  // Generate a unique accent color based on project id
  const getAccentColor = () => {
    const colors = [
      '#FFCDD2',
      '#FFCC80',
      '#FFF59D',
      '#A5D6A7',
      '#90CAF9',
      '#CE93D8',
      '#80DEEA',
      '#BCAAA4',
    ];
    // Simple hash function to get consistent color for each project
    const hash = project.id.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + acc;
    }, 0);

    return colors[hash % colors.length];
  };

  const accentColor = getAccentColor();

  return (
    <>
      <Head>
        <title>{project.title} | Portfolio</title>
        <meta name="description" content={project.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Head>

      {/* <ul className={styles.background1}>
        {[...Array(isMobile ? 20 : 40)].map((_, i) => (
          <li key={i}></li>
        ))}
      </ul> */}

      <MotionBox
        ref={containerRef}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        sx={{
          py: { xs: 4, sm: 6, md: 8 },
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg">
          <MotionBox
            variants={itemVariants}
            sx={{ mb: { xs: 2, sm: 3, md: 4 } }}
            style={{ opacity: headerOpacity, y: headerY }}
            ref={headerRef}
          >
            <Link href="/#projects" passHref>
              <Button
                startIcon={<ArrowBackIcon />}
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                sx={{
                  mb: { xs: 1, sm: 2 },
                  borderRadius: '12px',
                  '&:hover': {
                    backgroundColor: `${accentColor}20`,
                    borderColor: accentColor,
                    transform: 'translateY(-3px)',
                    transition: 'transform 0.3s ease-out',
                  },
                  borderColor: accentColor,
                  color: accentColor,
                  transition: 'all 0.3s ease',
                }}
              >
                Back to Projects
              </Button>
            </Link>
          </MotionBox>

          <Grid container spacing={isMobile ? 2 : 4}>
            <Grid size={{ xs: 12, md: 7 }}>
              <MotionBox
                ref={imageRef}
                variants={itemVariants}
                initial={{ opacity: 0, y: 50 }}
                animate={isImageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: isMobile ? 0.5 : 0.7, ease: "easeOut" }}
                style={{ y: imageY, scale: imageScale }}
                sx={{
                  position: 'relative',
                  height: { xs: '200px', sm: '250px', md: '450px' },
                  width: '100%',
                  borderRadius: { xs: '12px', sm: '16px', md: '20px' },
                  overflow: 'hidden',
                  boxShadow: `0 ${isMobile ? '5px 15px' : '10px 30px'} rgba(0, 0, 0, 0.15)`,
                  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
                <Box
                  component={motion.div}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: { xs: '3px', sm: '4px', md: '6px' },
                    backgroundColor: accentColor
                  }}
                />
              </MotionBox>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }} sx={{
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(40, 40, 40, 0.3)' : 'rgba(5, 144, 250, 0.3)',
              backdropFilter: 'blur(8px)',
              color: "#fff",
             boxShadow: theme.palette.mode === 'dark' ? "0 8px 25px rgba(71, 242, 248, 0.3)" : "0 8px 25px rgba(9, 240, 248, 0.43)",
              p: 3,
              borderRadius: 2,
            }}>
              <MotionTypography
                variant={isMobile ? "h4" : "h3"}
                variants={itemVariants}
                initial={{ opacity: 0, x: 50 }}
                animate={isHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                gutterBottom
                sx={{
                  fontWeight: 700,
                  color: "#39fcfcff",
                  fontSize: { xs: '1.75rem', sm: '2.125rem', md: '3rem' },
                }}
              >
                {project.title}
              </MotionTypography>

              <MotionBox
                variants={itemVariants}
                sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 0.5, sm: 1 }, mb: { xs: 2, sm: 3 } }}
              >
                {project.technologies.map((tech, index) => (
                  <MotionChip
                    key={index}
                    label={tech}
                    size={isMobile ? "small" : "medium"}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * (isMobile ? 0.05 : 0.1), duration: 0.5 }}
                    sx={{
                      backgroundColor: `${accentColor}20`,
                      color: accentColor,
                      fontWeight: 500,
                      borderRadius: { xs: '8px', sm: '10px' },
                      '&:hover': {
                        backgroundColor: `${accentColor}40`,
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                      mb: { xs: 0.5, sm: 0 },
                    }}
                  />
                ))}
              </MotionBox>

              <MotionTypography
                variant="body1"
                initial={{ opacity: 0 }}
                animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                sx={{
                  mb: { xs: 2, sm: 3 },
                  color: "#FFF",
                  lineHeight: 1.7,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                {project.detailedDescription}
              </MotionTypography>

              <MotionBox
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 1, sm: 2 },
                  mb: { xs: 3, sm: 4 }
                }}
              >
                {project.github && (
                  <Button
                    variant="contained"
                    startIcon={<GitHubIcon />}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth={isMobile}
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      backgroundColor: accentColor,
                      color: '#000',
                      '&:hover': {
                        backgroundColor: `${accentColor}CC`,
                        transform: 'translateY(-3px)',
                        boxShadow: `0 6px 12px ${accentColor}40`,
                      },
                      borderRadius: { xs: '8px', sm: '12px' },
                      px: { xs: 2, sm: 3 },
                      py: { xs: 0.75, sm: 1 },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    GitHub
                  </Button>
                )}
                {project.demoUrl && (
                  <Button
                    variant="outlined"
                    startIcon={<LaunchIcon />}
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth={isMobile}
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      borderColor: accentColor,
                      color: accentColor,
                      '&:hover': {
                        backgroundColor: `${accentColor}20`,
                        borderColor: accentColor,
                        transform: 'translateY(-3px)',
                        boxShadow: `0 6px 12px rgba(0,0,0,0.1)`,
                      },
                      borderRadius: { xs: '8px', sm: '12px' },
                      px: { xs: 2, sm: 3 },
                      py: { xs: 0.75, sm: 1 },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Live Demo
                  </Button>
                )}
              </MotionBox>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <MotionDivider
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.2 }}
                viewport={{ once: false, amount: 0.8 }}
                sx={{ my: { xs: 4, sm: 5, md: 6 }, borderColor: `${accentColor}50` }}
              />

              <MotionBox ref={featuresRef}>
                <MotionTypography
                  className="feature-title"
                  variant={isMobile ? "h5" : "h4"}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: false, amount: 0.5 }}
                  sx={{
                    mb: { xs: 2, sm: 3, md: 4 },
                    fontWeight: 600,
                    color: "#fff",
                    position: 'relative',
                    display: 'inline-block',
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: 0,
                      width: '40%',
                      height: { xs: 3, sm: 4 },
                      backgroundColor: accentColor,
                      borderRadius: '2px'
                    }
                  }}
                >
                  Key Features
                </MotionTypography>

                <Grid container spacing={isMobile ? 2 : 3}>
                  {project.features?.map((feature, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ mb: { xs: 3, sm: 2 } }}>
                      <MotionPaper
                        custom={index}
                        variants={featureVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                        sx={{
                          p: { xs: 2, sm: 1 },
                          height: '100%',
                          borderRadius: { xs: '12px', sm: '16px' },
                          borderLeft: `4px solid ${accentColor}`,
                          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(40, 40, 40, 0.3)' : 'rgba(5, 144, 250, 0.3)',
                          backdropFilter: 'blur(8px)',
                          color: "#fff",
                          boxShadow: theme.palette.mode === 'dark' ? "0 8px 25px rgba(71, 242, 248, 0.3)" : "0 8px 25px rgba(9, 240, 248, 0.43)",
                          transition: 'all 0.4s ease',
                          // backdropFilter: 'blur(0)',
                          '&:hover': {
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(40, 40, 40, 0.3)' : 'rgba(252, 251, 252, 0.3)',
                            backdropFilter: 'blur(8px)',
                            color: "white",
                            boxShadow: theme.palette.mode === 'dark' ? "0 8px 25px rgba(0, 0, 0, 0.3)" : "0 8px 25px rgba(255, 255, 255, 0.3)",
                            transform: isMobile ? 'translateY(-3px) scale(1.01)' : 'translateY(-5px) scale(1.02)',
                          },
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            lineHeight: 1.7,
                            // color: theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.text.primary,
                            fontSize: { xs: '0.875rem', sm: '1rem' },
                          }}
                        >
                          {feature}
                        </Typography>
                      </MotionPaper>
                    </Grid>
                  ))}
                </Grid>
              </MotionBox>

              <MotionBox ref={challengesRef} sx={{ mt: { xs: 4, sm: 6, md: 8 } }}>
                <MotionTypography
                  className="feature-title"
                  variant={isMobile ? "h5" : "h4"}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: false, amount: 0.5 }}
                  sx={{
                    mb: { xs: 2, sm: 3, md: 4 },
                    fontWeight: 600,
                    color: "#fff",
                    position: 'relative',
                    display: 'inline-block',
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: 0,
                      width: '40%',
                      height: { xs: 3, sm: 4 },
                      backgroundColor: accentColor,
                      borderRadius: '2px'
                    }
                  }}
                >
                  Challenges & Solutions
                </MotionTypography>

                <Grid container spacing={isMobile ? 2 : 4}>
                  {project.challenges?.map((challenge, index) => (
                    <Grid size={{ xs: 12 }} key={index}>
                      <MotionPaper
                        className="challenge-card"
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                        whileHover={{ scale: isMobile ? 1.005 : 1.01, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)" }}
                        transition={{ duration: 0.3 }}
                        sx={{
                          p: { xs: 2, sm: 3, md: 4 },
                          mb: { xs: 1, sm: 2 },
                          borderRadius: { xs: '12px', sm: '16px' },
                          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(40, 40, 40, 0.3)' : 'rgba(5, 144, 250, 0.3)',
                          backdropFilter: 'blur(8px)',
                          color: "#fff",
                          boxShadow: theme.palette.mode === 'dark' ? "0 8px 25px rgba(71, 242, 248, 0.3)" : "0 8px 25px rgba(9, 240, 248, 0.43)",
                          transition: 'all 0.4s ease',
                        }}
                      >
                        <Typography
                          variant={isMobile ? "subtitle1" : "h6"}
                          gutterBottom
                          sx={{
                            fontWeight: 600,
                            color: accentColor,
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: { xs: '1rem', sm: '1.25rem' },
                            '&:before': {
                              content: '""',
                              display: 'inline-block',
                              width: { xs: '8px', sm: '12px' },
                              height: { xs: '8px', sm: '12px' },
                              borderRadius: '50%',
                              backgroundColor: accentColor,
                              marginRight: { xs: '6px', sm: '10px' }
                            }
                          }}
                        >
                          Challenge
                        </Typography>

                        <MotionBox
                          initial={{ height: 0, opacity: 0 }}
                          whileInView={{ height: "auto", opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.6 }}
                          viewport={{ once: false, amount: 0.5 }}
                        >
                          <Typography
                            variant="body1"
                            paragraph
                            sx={{
                              pl: { xs: 2, sm: 3 },
                              borderLeft: `2px solid ${accentColor}40`,
                              ml: { xs: 0.3, sm: 0.5 },
                              color: "white",
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                            }}
                          >
                            {challenge}
                          </Typography>
                        </MotionBox>
                        <Typography
                          variant={isMobile ? "subtitle1" : "h6"}
                          gutterBottom
                          sx={{
                            mt: { xs: 2, sm: 3 },
                            fontWeight: 600,
                            color: "#39fcfcff",
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: { xs: '1rem', sm: '1.25rem' },
                            '&:before': {
                              content: '""',
                              display: 'inline-block',
                              width: { xs: '8px', sm: '12px' },
                              height: { xs: '8px', sm: '12px' },
                              borderRadius: '50%',
                              backgroundColor: "#39fcfcff",
                              marginRight: { xs: '6px', sm: '10px' }
                            }
                          }}
                        >
                          Solution
                        </Typography>

                        <MotionBox
                          initial={{ height: 0, opacity: 0 }}
                          whileInView={{ height: "auto", opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.6 }}
                          viewport={{ once: false, amount: 0.5 }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              pl: { xs: 2, sm: 3 },
                              borderLeft: `2px solid ${theme.palette.success.main}40`,
                              ml: { xs: 0.3, sm: 0.5 },
                              color: "white",
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                            }}
                          >
                            {project.solutions?.[index]}
                          </Typography>
                        </MotionBox>
                      </MotionPaper>
                    </Grid>
                  ))}
                </Grid>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </MotionBox>
    </>
  );
};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Lenis: any;
  }
}

export default ProjectDetails;