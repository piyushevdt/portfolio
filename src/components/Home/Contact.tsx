import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, TextField, useTheme } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import CustomButton from '../ui/CustomButton';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const theme = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    if (sectionRef.current && formRef.current) {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
      });

      gsap.from(formRef.current.children, {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <Box 
      ref={sectionRef}
      id="contact"
      sx={{ 
        py: 10,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" component="h2" align="center" sx={{ mb: 6 }}>
          Get In Touch
        </Typography>
        <Box 
          ref={formRef}
          component="form" 
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <TextField
            name="name"
            label="Your Name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            name="email"
            label="Your Email"
            variant="outlined"
            fullWidth
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            name="message"
            label="Your Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
          />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CustomButton 
              type="submit" 
              variant="contained" 
              size="large"
              sx={{ 
                px: 6,
                py: 1.5,
                fontSize: '1.1rem',
              }}
            >
              Send Message
            </CustomButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;