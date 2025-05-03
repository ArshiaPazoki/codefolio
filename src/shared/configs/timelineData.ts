// src/shared/configs/timelineData.ts

export interface TimelineEvent {
    date: string
    title: string
    description: string
  }
  
  /**
   * Timeline of Arshia Pazoki’s career and projects
   */
  export const timelineEvents: TimelineEvent[] = [
    {
      date: 'Jan 2019 – Oct 2021',
      title: 'Software Engineer, MRL Humanoid (Mechatronics Research Lab)',
      description: 
        'Designed and programmed autonomous humanoid robots for the RoboCup Humanoid League at Qazvin Azad University. Led development of dynamic walking, balance control, visual perception, and team-play algorithms, culminating in globally recognized robotic platforms.',
    },
    {
      date: 'Mar 2019 – Nov 2021',
      title: 'Researcher, SYNTECH Technology & Innovation Center',
      description: 
        'Conducted R&D on computer science, electronics, robotics, and mechanics. Contributed to academic projects, prototypes, and publications that advanced QIAU’s innovation agenda.',
    },
    {
      date: 'Mar 2020 – Jan 2021',
      title: 'Lead Software Development Engineer, IrsaSannat',
      description: 
        'Oversaw end-to-end enterprise software development, architecting scalable applications, enforcing code quality standards, and mentoring junior engineers in full-stack best practices.',
    },
    {
      date: 'Mar 2020 – Jan 2021',
      title: 'Programming Team Lead, Fire Fighting Robot Lab',
      description: 
        'Coordinated robotics software efforts for autonomous fire-fighting robots. Integrated sensor fusion, control algorithms, and simulation testing to ensure reliable field performance.',
    },
    {
      date: 'Feb 2021 – Apr 2021',
      title: 'Linux System Administrator, Chekida',
      description: 
        'Managed and secured Linux-based servers and infrastructure as an LPIC-certified professional. Installed/configured systems, managed user accounts, monitored performance, and implemented security hardening.',
    },
    {
      date: 'Nov 2021 – Persent',
      title: 'Front-end Developer, ASA Co.',
      description: 
        'Built responsive, accessible UIs using React.js and Bootstrap for exchange-market solutions. Collaborated with designers and back-end teams to deliver seamless user experiences.',
    },
    {
      date: 'Jan 2022 – Persent',
      title: 'Back-end Developer, ASA Co.',
      description: 
        'Developed RESTful APIs and microservices using C#, Flask, and ASP.NET Core. Implemented authentication, data modeling, and performance optimizations for high-availability systems.',
    },
    {
      date: 'Oct 2022 – Present',
      title: 'Test Automation Engineer & SDET, ASA Co.',
      description: 
        'Architected end-to-end automation frameworks with Cypress, Robot Framework, Appium, and k6. Integrated CI/CD pipelines for continuous testing, performance validation, and quality metrics.',
    },
    {
      date: 'May 2025 – Present',
      title: 'Creator, CodeFolio',
      description: 
        'Crafting a VSCode-themed portfolio platform using Next.js 13, TypeScript, Tailwind CSS, and Turbopack. Showcasing interactive code editors, Git-inspired timelines, and modern UX patterns.',
    },
  ]
  