'use client';
import React, { useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
} from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import "@/styles/skills.css"
// import useResponsive from '@/hooks/useResponsive';

gsap.registerPlugin(ScrollTrigger);

interface AnimationProps {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
}

interface UseGsapProps {
  elementRef: React.RefObject<HTMLElement | null>;
  animation: AnimationProps;
  delay?: number;
}

const useGsap = ({ elementRef, animation, delay = 0 }: UseGsapProps): void => {
  useEffect(() => {
    if (elementRef.current) {
      gsap.fromTo(
        elementRef.current,
        animation.from,
        {
          ...animation.to,
          delay,
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [elementRef, animation, delay]);
};

interface ServiceCardProps {
  index: number;
  name: string;
  image: string;
}

const ServiceCard = ({ index, name, image }: ServiceCardProps): React.JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGsap({
    elementRef: cardRef,
    animation: {
      from: { opacity: 0, y: 100, scale: 0.1 },
      to: { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power4.out" }
    },
    delay: index * 0.5
  });

  // GSAP hover animation
  useEffect(() => {
    if (cardRef.current && contentRef.current) {
      const card = cardRef.current;
      const content = contentRef.current;

      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
          backgroundColor: 'rgba(252, 251, 252, 0.3)',
          boxShadow: "0 4px 20px rgba(255, 255, 255, 0.2)",
        });
        gsap.to(content, {
          color: "#fff",
          fontWeight: '700',
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          boxShadow: 1,
        });
        gsap.to(content, {
          color: "inherit",
          fontWeight: 'normal',
          duration: 0.3,
          ease: "power2.out",
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <Box
      className="xs:w-[250px]"
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        ref={cardRef}
        sx={{
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.75)', // semi-transparent
          boxShadow: 1,
          textAlign: 'center',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(0)',
          p: '1px',
          borderRadius: '20px',
          cursor: 'pointer',
          // boxShadow: 3,
          // '&:hover': {
          //   boxShadow: 6,
          // }
        }}
      >
        <Box
          ref={contentRef}
          sx={{
            // backgroundColor: 'tertiary.main',
            borderRadius: '20px',
            py: { xs: 2, md: 4 },
            px: { xs: 2, md: 4 },
            minHeight: { xs: '100%', md: "100%" },
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'column',
            transition: 'all 0.3s ease',
          }}
        >
          <Box
            component="img"
            src={image}
            alt={name}
            sx={{
              width: 80,
              height: 80,
              objectFit: 'contain',
              transition: 'all 0.3s ease',
              filter: 'grayscale(30%)',
              '&:hover': {
                filter: 'grayscale(0%)',
                transform: 'scale(1.1)',
              }
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              fontSize: { xs: '16px', sm: '20px' },
              fontWeight: 'bold',
              textAlign: 'center',
              transition: 'all 0.3s ease',
            }}
          >
            {name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};


const skills = [
  { name: 'React', image: '/images/reactjs.svg' },
  { name: 'Next.js', image: 'https://www.svgrepo.com/show/342062/next-js.svg' },
  { name: 'JavaScript', image: '/images/javascript.svg' },
  { name: 'TypeScript', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png' },
  { name: 'HTML', image: '/images/html.svg' },
  { name: 'CSS', image: '/images/css.svg' },
  { name: 'Material UI', image: '/images/MUI.svg' },
  { name: 'Framer Motion', image: 'https://images.seeklogo.com/logo-png/44/3/framer-motion-logo-png_seeklogo-446185.png' },
  { name: 'Tailwind CSS', image: '/images/tailwind.svg' },
  { name: 'GSAP', image: 'https://dzakifadh.dev/img/gsap.png' },
  { name: 'Redux', image: '/images/redux.svg' },
];

// const itemVariants = {
//   hidden: { opacity: 0, scale: 0.8, y: 30 },
//   visible: (i: number) => ({
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.1,
//       duration: 0.6,
//       ease: 'easeOut',
//     },
//   }),
// };

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  // const isMobile = useResponsive(768);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
      });
    }
  }, []);

  return (
    <Box
      ref={sectionRef}
      id="skills"
      sx={{
        py: { xs: 2, md: 10 },
        // backgroundColor: theme.palette.background.default,
      }}
    >
      {/* <ul className="background1">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul> */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Typography variant="h2" component="h2" align="center" sx={{ mb: 6, color: "#fff" }}>
          My Skills
        </Typography>
        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {skills.map((skill, index) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={skill.name}>
              {/* <motion.div
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
              >
                <Box
                  sx={{
                    p:isMobile? 1: 3,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.75)', // semi-transparent
                    boxShadow: 1,
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(0)',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      backgroundColor: 'rgba(252, 251, 252, 0.3)',
                      backdropFilter: 'blur(8px)',
                      color: "#fff",
                      fontWeight: '700',
                      boxShadow: "0 4px 20px rgba(255, 255, 255, 0.2)",
                    },
                  }}
                >
                  <Typography variant={isMobile ? "body1" : "h5"} gutterBottom>
                    {skill.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <Box
                      className="skill-icon"
                      component="img"
                      src={skill.image}
                      alt={skill.name}
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: 'contain',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  </Box>
                </Box>
              </motion.div> */}
              <ServiceCard index={index} name={skill.name} image={skill.image} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Skills;