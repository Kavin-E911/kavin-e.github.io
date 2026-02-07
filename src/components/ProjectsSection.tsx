import { useState } from 'react';
import ProjectCard from './ProjectCard';

type ProjectCategory = 'all' | 'internship' | 'personal';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink?: string;
  codeLink?: string;
  videoLink?: string;
  category: ProjectCategory;
}

const projects: Project[] = [
  // Internship Projects
  {
    title: 'Stopwatch',
    description: 'A sleek and functional stopwatch application with start, stop, and reset functionality. Features a clean UI with precise time tracking and lap recording capabilities.',
    image: '/project images/stopwatch.png',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    codeLink: 'https://github.com/Kavin-E911/Stopwatch',
    category: 'internship',
  },
  {
    title: 'Tic Tac Toe',
    description: 'A classic Tic Tac Toe game with an interactive board, win detection, and game reset. Built with smooth animations and a responsive design for all devices.',
    image: '/project images/tictactoe.png',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    codeLink: 'https://github.com/Kavin-E911/Tic-Tac-Toe',
    category: 'internship',
  },
  {
    title: 'Weather App',
    description: 'A real-time weather application that fetches current weather data using APIs. Displays temperature, humidity, wind speed, and weather conditions with a visually appealing interface.',
    image: '/project images/weatherapp.png',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    codeLink: 'https://github.com/Kavin-E911/Weather-App',
    category: 'internship',
  },
  // Personal / Other Projects
  {
    title: 'Kavin Portfolio',
    description: 'An immersive portfolio experience featuring interactive 3D elements, smooth animations, and modern design. Showcases projects with engaging visual effects and seamless navigation.',
    image: '/project images/portfolio.png',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    codeLink: 'https://github.com/Kavin-E911/aura-portfolio',
    category: 'personal',
  },
  {
    title: 'Fake News Detection System',
    description: 'Machine learning powered system to detect and classify fake news articles with high accuracy using NLP techniques and advanced text processing algorithms.',
    image: '/project images/fake news detection.png',
    technologies: ['Python', 'ML', 'NLP'],
    codeLink: 'https://github.com/Kavin-E911/fake_news',
    category: 'personal',
  },
  {
    title: 'Temperature Based Fan Control System',
    description: 'An Arduino-based science project that automatically adjusts fan speed based on ambient temperature, demonstrating practical application of embedded systems.',
    image: '/project images/fan speed control.jpeg',
    technologies: ['Arduino', 'C++', 'Embedded Systems'],
    videoLink: '/arduino.mp4',
    category: 'personal',
  },
  {
    title: 'ClassBot',
    description: 'An AI-powered chatbot designed for college students to instantly access academic information, schedules, and campus resources through natural conversation.',
    image: '/project images/classbot.png',
    technologies: ['Python', 'Flask', 'PostgreSQL', 'SpaCy', 'HTML', 'CSS', 'JavaScript'],
    codeLink: 'https://github.com/Kavin-E911/ClassBot-main',
    category: 'personal',
  },
  {
    title: 'Job Search Assistant',
    description: 'An AI-powered career platform with resume ATS analysis, smart job search across multiple platforms, interview preparation with custom questions, and an AI career chat assistant.',
    image: '/project images/job search.png',
    technologies: ['Python', 'Flask', 'AI/ML', 'Bootstrap', 'JavaScript', 'REST API'],
    codeLink: 'https://github.com/Kavin-E911/flask_app',
    category: 'personal',
  },
];

const filterTabs: { label: string; value: ProjectCategory }[] = [
  { label: 'All Projects', value: 'all' },
  { label: 'Internship Projects', value: 'internship' },
  { label: 'Personal Projects', value: 'personal' },
];

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('personal');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subheading">
            Real-world applications that showcase my skills and passion for building
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeFilter === tab.value
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-transparent shadow-lg shadow-primary/25'
                  : 'glass border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
