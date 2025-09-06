export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
  detailedDescription?: string;
  features?: string[];
  challenges?: string[];
  solutions?: string[];
  github?: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  // {
  //   id: 'e-commerce-platform',
  //   title: 'E-commerce Platform',
  //   description: 'A full-featured online store with cart functionality, user authentication, and payment processing.',
  //   technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
  //   image: '/images/javascript.svg',
  //   link: '#',
  //   detailedDescription: 'A comprehensive e-commerce solution built with a React frontend and Node.js backend. The platform includes user authentication, product catalog, shopping cart, checkout process, and integration with Stripe for payment processing.',
  //   features: [
  //     'User authentication and profile management',
  //     'Product catalog with filtering and search',
  //     'Shopping cart and wishlist functionality',
  //     'Secure checkout process with Stripe integration',
  //     'Order history and tracking',
  //     'Admin dashboard for product management'
  //   ],
  //   challenges: [
  //     'Implementing secure payment processing',
  //     'Creating a responsive design for all device sizes',
  //     'Optimizing database queries for performance'
  //   ],
  //   solutions: [
  //     "Used Stripe's secure API for handling sensitive payment information",
  //     'Implemented responsive design with Material UI and custom CSS',
  //     'Created efficient MongoDB queries with proper indexing'
  //   ],
  //   github: 'https://github.com/yourusername/ecommerce-platform',
  //   demoUrl: 'https://ecommerce-demo.example.com'
  // },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'A responsive portfolio website with animations and interactive elements.',
    technologies: ['Next.js', 'Material UI', 'TypeScript','Framer Motion'],
    image: '/images/portfolio.png',
    link: '#',
    detailedDescription: 'A modern portfolio website built using Next.js to showcase my projects and skills. The site features smooth animations, interactive elements, and a responsive design that works across all devices.',
    features: [
      'Responsive design that adapts to all screen sizes',
      'Smooth page transitions and scroll animations',
      'Dark/light mode toggle',
      'Contact form with validation',
      'Project showcase with filtering capabilities'
    ],
    challenges: [
      'Creating smooth animations without affecting performance',
      'Implementing a seamless dark/light mode transition',
      'Optimizing images for fast loading'
    ],
    solutions: [
      'Used Framer Motion for performant animations',
      'Implemented theme context with smooth transitions',
      'Optimized images with Next.js Image component and proper sizing'
    ],
    github: 'hhttps://github.com/piyushevdt/portfolio',
    demoUrl: 'https://portfolio-six-beta-17.vercel.app'
  },
  {
    id: 'hems-corporation',
    title: 'Hems Corporation',
    description: 'A dynamic construction services website with interactive project showcases and client communication tools.',
    technologies: ['React.js', 'Material-UI', 'Framer Motion', 'JavaScript', 'EmailJS'],
    image: '/images/hems.png', // Replace with actual image path
    link: '#',
    detailedDescription: 'A modern website for Hems Corporation featuring smooth animations, a project portfolio gallery, and seamless contact form integration with EmailJS for instant client inquiries.',
    features: [
      'Animated project showcases with Framer Motion',
      'Material-UI design system for consistent styling',
      'EmailJS integration for instant form submissions',
      'Interactive service catalog with expandable details',
      'Mobile-responsive layout for on-site contractors'
    ],
    challenges: [
      'Balancing heavy construction imagery with performance',
      'Creating intuitive touch controls for mobile users',
      'Implementing reliable email notifications without a backend'
    ],
    solutions: [
      'Used Material-UI’s lazy-loading components for images',
      'Designed touch-friendly carousels with Framer Motion gestures',
      'Integrated EmailJS for direct client-to-email workflows'
    ],
    github: 'https://github.com/piyushevdt/hems-website',
    demoUrl: 'https://hems-website.vercel.app/'
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    description: 'Real-time weather information with interactive maps and forecasts.',
    technologies: ['React', 'JavaScript', 'OpenWeather API'],
    image: '/images/weather.png',
    link: '#',
    detailedDescription: 'A weather dashboard that provides real-time weather information, forecasts, and interactive maps. The application uses the OpenWeather API to fetch accurate weather data and presents it in an intuitive interface.',
    features: [
      'Current weather conditions display',
      'Five-day forecast with hourly breakdowns',
      'Interactive map with weather layers',
      'Location search and favorites',
      'Weather alerts and notifications',
      'Historical weather data charts'
    ],
    challenges: [
      'Processing and displaying complex weather data',
      'Creating interactive and informative visualizations',
      'Handling API rate limits and optimizing requests'
    ],
    solutions: [
      'Implemented data processing utilities for API responses',
      'Used chart.js for clear data visualization',
      'Created intelligent caching to minimize API calls'
    ],
    github: 'https://github.com/piyushevdt/weather-dashboard',
    demoUrl: 'https://weather-dashboard-ecru-five.vercel.app/'
  },
  {
  id: 'oss-website',
  title: 'One Stop Service',
  description: 'A solar panel information and service website with contact support.',
  technologies: ['React', 'JavaScript', 'Material UI', 'Framer Motion'],
  image: '/images/oss.png',
  link: '#',
  detailedDescription: 'A static website showcasing solar panel products and services. The platform provides detailed information about solar panels, their benefits, and allows users to directly contact the seller via email for queries.',
  features: [
    'Informative sections about solar panels and their benefits',
    'Static data display for solar panel products and services',
    'Contact form integration to send queries via email',
    'Clean and modern UI with responsive design',
    'Smooth animations using Framer Motion'
  ],
  challenges: [
    'Presenting technical solar panel data in a user-friendly format',
    'Ensuring responsiveness across devices',
    'Building a reliable contact system for user queries'
  ],
  solutions: [
    'Structured data into clear sections with visual emphasis',
    'Implemented responsive layouts using Material UI',
    'Integrated mail functionality for direct user-to-seller communication'
  ],
  github: 'https://github.com/piyushevdt/oss-website',
  demoUrl: 'https://oss-website.netlify.app/'
}
];