// src/shared/configs/skills.ts

// A comprehensive, categorized list of all your skills
// src/shared/configs/skillGroups.ts

export const skillGroups: Record<string, string[]> = {
    // Testing & Quality
    'Testing & Quality': [
      'Selenium',
      'Beautiful Soup (bs4)',
      'Cypress',
      'Robot Framework',
      'Appium',
      'Pact',
      'Test Planning',
      'API Testing',
      'Data Validation',
      'k6 Load Testing',
      'Playwright',
    ],
  
    // Programming Languages & Ecosystems
    'Programming Languages & Ecosystems': [
      'C (Programming Language)',
      'C++',
      'Boost C++ Libraries',
      'C#',
      'Java',
      'JavaScript',
      'TypeScript',
      'Go (Programming Language)',
      'Python (Programming Language)',
      'Rust',
    ],
  
    // Front-end & UI Frameworks
    'Front-end & UI Frameworks': [
      'HTML',
      'Cascading Style Sheets (CSS)',
      'Bootstrap',
      'Tailwind CSS',
      'Material Design',
      'Ant Design',
      'React.js',
      'Redux.js',
      'Recoil',
      'Next.js',
      'Svelte',
      'Sapper',
      'Qt',
      'PyQt',
      'Highcharts',
    ],
  
    // Back-end & APIs
    'Back-end & APIs': [
      'Node.js',
      'Django',
      'Flask',
      'ASP.NET Core',
      'REST APIs',
      'GraphQL',
      'gRPC',
      'tRPC',
      'Protocol Buffers',
      'WebSockets',
      'Socket.io',
    ],
  
    // Databases & Caching
    'Databases & Caching': [
      'SQL',
      'MySQL',
      'PostgreSQL',
      'MongoDB',
      'Redis',
    ],
  
    // DevOps & Infrastructure
    'DevOps & Infrastructure': [
      'Git',
      'GitHub Actions',
      'Jenkins',
      'Docker',
      'Docker Compose',
      'Docker Swarm',
      'Kubernetes',
      'Helm',
      'Ansible',
      'Terraform',
      'Azure',
      'AWS',
      'NGINX',
      'MQTT',
    ],
  
    // Monitoring & Observability
    'Monitoring & Observability': [
      'Prometheus',
      'Grafana',
      'OpenTelemetry',
      'Elastic Stack (ELK)',
      'Sentry',
    ],
  
    // Messaging & Streaming
    'Messaging & Streaming': [
      'RabbitMQ',
      'Kafka',
    ],
  
    // Robotics & Simulation
    'Robotics & Simulation': [
      'ROS',
      'ROS2',
      'Gazebo',
      'Robotics',
    ],
  
    // Machine Learning & Data Science
    'Machine Learning & Data Science': [
      'TensorFlow (TF)',
      'TensorFlow 2 (TF2)',
      'Keras',
      'PyTorch',
      'scikit-learn',
      'pandas',
      'NumPy',
      'scipy',
      'Matplotlib',
      'XGBoost',
      'Data Science',
      'Computer Vision',
      'OpenCV',
      'Image Processing',
    ],
  
    // Architecture, Patterns & Practices
    'Architecture, Patterns & Practices': [
      'Microservices',
      'CQRS',
      'Event Sourcing',
      'SOLID Design Principles',
      'Object-Oriented Programming (OOP)',
    ],
  
    // GoF & Other Design Patterns
    'GoF & Other Design Patterns': [
      'Factory Pattern',
      'Singleton Pattern',
      'Observer Pattern',
      'Strategy Pattern',
      'Decorator Pattern',
      'Adapter Pattern',
      'Facade Pattern',
      'Proxy Pattern',
      'Command Pattern',
      'Template Method Pattern',
      'Builder Pattern',
      'Composite Pattern',
      'Iterator Pattern',
      'Mediator Pattern',
      'Memento Pattern',
      'State Pattern',
      'Visitor Pattern',
    ],
  
    // Algorithms & Problem Solving
    'Algorithms & Problem Solving': [
      'Algorithms',
      'Algorithm Design',
      'Algorithm Analysis',
      'Data Structures',
    ],
  
    // Miscellaneous
    'Miscellaneous': [
      'Linux',
      'MATLAB',
      'High-performance computing (HPC)',
    ],
  }
  
  
  // Group skills by each timeline event title (exact string match)
  export const skillsByEvent: Record<string, string[]> = {
    'Software Engineer, MRL Humanoid (Mechatronics Research Lab)': [
      'Robotics', 'ROS', 'Gazebo', 'C++', 'Python (Programming Language)',
      'Computer Vision', 'OpenCV', 'MATLAB', 'Algorithms', 'Data Structures'
    ],
    'Researcher, SYNTECH Technology & Innovation Center': [
      'Robotics', 'ROS2', 'Gazebo', 'C++', 'Python (Programming Language)',
      'Algorithms', 'Machine Learning'
    ],
    'Lead Software Development Engineer, IrsaSannat': [
      'ASP.NET Core', 'C#', 'Design Patterns', 'Microservices',
      'Docker', 'SQL', 'Entity Framework'
    ],
    'Programming Team Lead, Fire Fighting Robot Lab': [
      'Robotics', 'ROS', 'Sensor Fusion', 'C++', 'Python (Programming Language)',
      'Algorithms', 'Data Structures'
    ],
    'Linux System Administrator, Chekida': [
      'Linux', 'Ansible', 'Azure', 'AWS', 'High-performance computing (HPC)'
    ],
    'Front-end Developer, ASA Co.': [
      'React.js', 'TypeScript', 'Next.js', 'HTML', 'Cascading Style Sheets (CSS)',
      'Bootstrap', 'Tailwind CSS', 'Ant Design'
    ],
    'Back-end Developer, ASA Co.': [
      'Node.js', 'Flask', 'ASP.NET Core', 'REST APIs', 'GraphQL',
      'MongoDB', 'Docker', 'Microservices'
    ],
    'Test Automation Engineer & SDET, ASA Co.': [
      'Cypress', 'Robot Framework', 'Appium', 'k6 Load Testing', 'Playwright',
      'API Testing', 'Data Validation', 'GitHub Actions', 'Jenkins'
    ],
    'Creator, CodeFolio': [
      'Next.js', 'TypeScript', 'Tailwind CSS', 'React.js', 'Git',
      'Design Patterns', 'Docker', 'Continuous Integration'
    ]
  }
  