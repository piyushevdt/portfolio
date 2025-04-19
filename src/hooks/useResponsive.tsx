// hooks/useResponsive.ts
import { useEffect, useState } from 'react';

const useResponsive = (breakpoint = 768): boolean => {
  // Default to non-mobile for SSR
  const [isMobile, setIsMobile] = useState(false);
  // Track if component is mounted
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    handleResize(); // set initial size
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  // Return false during SSR, actual value after mount
  return mounted ? isMobile : false;
};

export default useResponsive;