export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    image: string;
    link: string;
    content: string;
    features: string[];
    githubUrl?: string;
    liveUrl?: string;
  }
  
  export const projects: Project[] = [
    {
      id: 'e-commerce-platform',
      title: 'E-commerce Platform',
      description: 'A full-featured online store with cart functionality, user authentication, and payment processing.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '/images/project1.jpg',
      link: '/projects/e-commerce-platform',
      content: 'This e-commerce platform was built with a modern tech stack to provide a seamless shopping experience. The frontend uses React with Redux for state management, while the backend is powered by Node.js and Express. MongoDB serves as the database, and Stripe handles secure payment processing.',
      features: [
        'User authentication and authorization',
        'Product catalog with categories and filters',
        'Shopping cart functionality',
        'Checkout process with payment integration',
        'Order history and tracking',
        'Admin dashboard for product management'
      ],
      githubUrl: 'https://github.com/yourusername/e-commerce-platform',
      liveUrl: 'https://ecommerce.example.com'
    },
    {
      id: 'portfolio-website',
      title: 'Portfolio Website',
      description: 'A responsive portfolio website with animations and interactive elements.',
      technologies: ['Next.js', 'Material UI', 'Framer Motion'],
      image: '/images/project2.jpg',
      link: '/projects/portfolio-website',
      content: 'This portfolio website showcases my work and skills with a clean, modern design. Built with Next.js for optimal performance and SEO, it features smooth animations powered by Framer Motion and a responsive layout using Material UI components.',
      features: [
        'Responsive design for all devices',
        'Smooth page transitions',
        'Interactive elements',
        'Dark/light mode toggle',
        'Project showcase section',
        'Contact form with validation'
      ],
      githubUrl: 'https://github.com/yourusername/portfolio',
      liveUrl: 'https://portfolio.example.com'
    },
    // Add similar details for other projects
  ];