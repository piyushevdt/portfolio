import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, TextField, Alert, CircularProgress } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import CustomButton from '../ui/CustomButton';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://formsubmit.co/ajax/piyushkdbittu@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New contact form submission from ${formData.name}`,
          _template: 'table' // Optional: makes the email more readable
        })
      });

      const data = await response.json();

      if (data.success === 'true') {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });

        // Reset status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      setStatus('error');
      setErrorMessage('There was a problem sending your message. Please try again later.');

      // Reset error status after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <Box
      ref={sectionRef}
      id="contact"
      sx={{
        py: 10,
        // backgroundColor: theme.palette.background.default,
        px: 2 ,
      }}
    >
      <Container maxWidth="md" sx={{
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
        backdropFilter: 'blur(8px)',
      }}>
        <Typography variant="h2" component="h2" align="center" sx={{ mb: 6,  color: "#fff", }}>
          Get In Touch
        </Typography>

        {/* Status Alerts */}
        {status === 'success' && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Your message has been sent successfully! We&apos;ll get back to you soon.
          </Alert>
        )}
        {status === 'error' && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

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
            disabled={status === 'submitting'}
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
            disabled={status === 'submitting'}
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
            disabled={status === 'submitting'}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CustomButton
              type="submit"
              variant="contained"
              size="large"
              disabled={status === 'submitting'}
              sx={{
                px: 6,
                py: 1.5,
                fontSize: '1.1rem',
                minWidth: 160,
              }}
            >
              {status === 'submitting' ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Send Message'
              )}
            </CustomButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;