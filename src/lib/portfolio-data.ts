export const portfolioData = {
  personal: {
    name: 'Raksit Nongbua',
    nickname: 'Tan',
    title: 'Software Development Team Lead',
    company: 'Bitkub',
    location: 'Thailand',
    email: 'tan.raksit@gmail.com',
    bio: 'Experienced Software Development Team Lead at Bitkub, specializing in authentication systems and user onboarding experiences. Architect of dual authentication systems: internal bitkub-auth serving micro frontends with Domain-Driven Design, and external OAuth 2.0 for third-party integrations. Frontend expert with strong leadership skills, session management expertise, and maintainer of the onboarding domain. Pioneer in bringing design tokens to Bitkub projects, initiating the concept from zero and sharing knowledge across teams.',
  },
  skills: {
    frontend: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'HTML5',
      'CSS3',
      'Design Tokens',
      'Material UI',
      'Formik',
      'Storybook',
      'Redux',
    ],
    backend: ['Node.js', 'Express.js', 'Golang', 'REST APIs', 'GraphQL', 'Firebase Cloud Functions', 'ParseServer'],
    database: ['MongoDB', 'MySQL', 'Firebase Firestore', 'MinIO', 'AWS'],
    authentication: [
      'OAuth 2.0',
      'Session Management',
      'JWT',
      'Bitkub-Auth',
      'Authentication Systems',
      'ACL Management',
    ],
    tools: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'Adobe XD', 'Unity'],
    specializations: [
      'Design Systems',
      'User Onboarding',
      'Fintech Solutions',
      'Team Leadership',
      'Frontend Architecture',
      'Domain-Driven Design',
      'Micro Frontend',
      'Game Development',
      'Unity Development',
      'Cross-platform Development',
    ],
  },
  projects: [
    {
      name: 'Bitkub Authentication System',
      description:
        'Leading the development and maintenance of accounts.bitkub.com authentication domain with dual architecture: (1) Internal bitkub-auth system serving micro frontend applications using Domain-Driven Design principles, and (2) External OAuth 2.0 system for third-party integrations. Implemented robust session management, security protocols, and scalable microservice architecture for cryptocurrency trading platform.',
      technologies: ['OAuth 2.0', 'Micro Frontend', 'Domain-Driven Design', 'Session Management', 'Node.js', 'TypeScript', 'Microservices'],
      status: 'Ongoing',
    },
    {
      name: 'Bitkub Onboarding Platform',
      description:
        'Domain maintainer for user onboarding experiences, creating seamless KYC processes and user journey optimization for cryptocurrency exchange platform.',
      technologies: ['React', 'Node.js', 'User Experience', 'Fintech'],
      status: 'Ongoing',
    },
    {
      name: 'Design Tokens System',
      description:
        'Pioneered and implemented design tokens across Bitkub projects from zero. Established design system standards, created token architecture, and led knowledge sharing across development teams.',
      technologies: ['Design Tokens', 'Design Systems', 'CSS Variables', 'Documentation'],
      status: 'Implemented',
    },
    {
      name: 'ACL Management System',
      description:
        'Developed comprehensive Access Control List (ACL) management system for internal tools to manage customer permissions and access levels. Implemented role-based access control with granular permissions for customer support and operations teams.',
      technologies: ['ACL Management', 'Role-Based Access', 'Node.js', 'Security', 'Internal Tools'],
      status: 'Implemented',
    },
    {
      name: 'Tantolio Portfolio',
      description:
        'Interactive AI-powered portfolio website with chat interface',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
      status: 'In Development',
    },
  ],
  experience: [
    {
      company: 'Bitkub Online Co., Ltd.',
      position: 'Software Development Team Lead',
      period: '2024 - Present',
      description:
        'Leading development teams in building cutting-edge cryptocurrency trading platforms and fintech solutions. Expert domain maintainer for authentication systems (accounts.bitkub.com) with dual architecture: internal bitkub-auth serving micro frontends using Domain-Driven Design, and external OAuth 2.0 for third-party integrations. Frontend specialist with strong session management and ACL management systems for internal tools managing customer access. Pioneered design tokens initiative, introducing the concept from zero and establishing design system standards across multiple projects. Managing technical architecture, code reviews, and mentoring development teams.',
      website: 'https://www.bitkub.com/',
      logo: '/bitkub.jpg'
    },
    {
      company: 'Bitkub Online Co., Ltd.',
      position: 'Senior Frontend Developer',
      period: '2022 - 2024',
      description:
        'Advanced to senior role focusing on frontend architecture and complex user interface development. Led frontend initiatives, mentored junior developers, and contributed to design system development. Specialized in React, TypeScript, and modern frontend technologies for cryptocurrency trading platform.',
      website: 'https://www.bitkub.com/',
      logo: '/bitkub.jpg'
    },
    {
      company: 'Bitkub Online Co., Ltd.',
      position: 'Junior Frontend Developer',
      period: '2021 - 2022',
      description:
        'Started journey at Bitkub as junior frontend developer, learning and contributing to cryptocurrency trading platform development. Gained expertise in React, JavaScript, and financial technology domain while building user interfaces for trading and authentication systems.',
      website: 'https://www.bitkub.com/',
      logo: '/bitkub.jpg'
    },
    {
      company: 'ProGaming Co., Ltd.',
      position: 'Web Developer & Game Developer',
      period: '2016 - 2021',
      description:
        'Dual role handling both web development and game development projects based on company resource needs. For web development: Built complete user interfaces working closely with designers via Adobe XD and Figma, using Node.js, ReactJS, Material UI, Formik, Storybook, and Redux for state management. Developed backend APIs using Express.js and Firebase Cloud Functions, with database management using Firebase Firestore, MongoDB, ParseServer, GraphQL, MinIO, and AWS. For game development: Created complete game systems using Unity for iOS, Android, and PC platforms with C# and Unity Redux for data management. Developed web games initially using Unity Tiny with TypeScript and ReactJS integration, later transitioning to Cocos TypeScript for better stability, utilizing Firebase Firestore for data storage.',
      website: 'https://www.progaming.co.th/',
      logo: '/progaming.webp'
    },
  ],
  education: [
    {
      school: 'University Name',
      degree: "Bachelor's in Computer Game Multimedia",
      period: '2016 - 2020',
    },
  ],
};

export type PortfolioData = typeof portfolioData;
