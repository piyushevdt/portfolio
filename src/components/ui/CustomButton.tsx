import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { motion } from 'framer-motion';

interface CustomButtonProps extends ButtonProps {
  hoverScale?: number;
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  children, 
  hoverScale = 1.05, 
  ...props 
}) => {
  return (
    <motion.div
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: 0.95 }}
    >
      <Button {...props}>
        {children}
      </Button>
    </motion.div>
  );
};

export default CustomButton;