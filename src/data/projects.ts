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
},
{
  id: 'uniklinger',
  title: 'Uniklinger',
  description: 'A corporate website for Uniklinger, showcasing precision-engineered valves, steam traps, and fluid control solutions with global reach and advanced manufacturing capabilities.',
  technologies: ['React.js', 'Material-UI', 'Framer Motion', 'JavaScript', 'EmailJS'],
  image: '/images/ukl.png', 
  link: '#',
  detailedDescription: 'Uniklinger’s website highlights their expertise in fluid control, sealing, steam engineering, and safety valves. Featuring smooth animations, an extensive product catalog, and integrated contact forms for inquiries, it emphasizes global service, advanced solutions, and sustainable engineering practices.',
  features: [
    'Interactive product catalog for valves, steam traps, and fluid control systems',
    'Material-UI design for a professional and consistent look',
    'EmailJS-powered inquiry forms for instant customer communication',
    'Detailed service sections for greenfield and brownfield project support',
    'Mobile-responsive layout optimized for global users and distributors'
  ],
  challenges: [
    'Presenting complex industrial solutions in an intuitive format',
    'Ensuring fast performance despite heavy technical content and imagery',
    'Providing real-time inquiry options without a dedicated backend infrastructure'
  ],
  solutions: [
    'Utilized lazy-loading and optimized assets to enhance site speed',
    'Crafted user-friendly navigation with expandable sections for detailed products',
    'Integrated EmailJS to enable seamless communication between clients and technical experts'
  ],
  github: 'https://github.com/piyushevdt/ukl-frontend',
  demoUrl: 'https://www.uniklinger.com'
},
{
  id: 'travel',
  title: 'Travel',
  description: 'A modern booking platform for hotels, flights, and destination packages, helping users plan and enjoy their trips with ease and confidence.',
  technologies: ['Next.js', 'Material-UI', 'Framer Motion', 'JavaScript', 'EmailJS'],
  image: '/images/travel.png', 
  link: '#',
  detailedDescription: 'Travel’s website offers users a seamless experience to explore and book hotels, flights, and destination packages. With engaging animations, intuitive navigation, and quick inquiry forms, it aims to inspire adventure and simplify the booking process for travelers worldwide.',
  features: [
    'Search and filter for hotels, flights, and destination packages',
    'Material-UI design for a sleek and responsive user interface',
    'Framer Motion animations for smooth transitions and interactions',
    'EmailJS-powered booking inquiries and contact forms',
    'Mobile-friendly layout to support travelers on the go'
  ],
  challenges: [
    'Creating an easy-to-use interface for multiple booking options',
    'Maintaining fast load times with rich imagery and animations',
    'Handling user interactions without a complex backend setup'
  ],
  solutions: [
    'Implemented lazy loading and optimized media assets to improve performance',
    'Designed modular components with Material-UI for consistency and scalability',
    'Used EmailJS for instant communication, reducing dependency on backend infrastructure'
  ],
  github: 'https://github.com/piyushevdt/travel',
  demoUrl: 'https://travel-bay-seven.vercel.app/'
}


];