import ProjectCard from './ProjectCard';

const projects = [
  {
    title: 'Tic Tac Toe Web App',
    description: 'An interactive Tic Tac Toe game with AI opponent, smooth animations, and score tracking. Built with a focus on user experience.',
    image: '/placeholder.svg',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    demoLink: '#',
    codeLink: '#',
  },
  {
    title: 'Weather App',
    description: 'Real-time weather application with location detection, 5-day forecast, and beautiful weather animations based on conditions.',
    image: '/placeholder.svg',
    technologies: ['React', 'API', 'CSS'],
    demoLink: '#',
    codeLink: '#',
  },
  {
    title: 'Stopwatch Web App',
    description: 'Precision stopwatch with lap functionality, countdown timer, and clean minimalist design. Perfect for time tracking.',
    image: '/placeholder.svg',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    demoLink: '#',
    codeLink: '#',
  },
  {
    title: 'Responsive Landing Page',
    description: 'Modern, fully responsive landing page with smooth scroll animations, mobile-first design, and optimized performance.',
    image: '/placeholder.svg',
    technologies: ['React', 'Tailwind', 'Framer'],
    demoLink: '#',
    codeLink: '#',
  },
  {
    title: 'Fake News Detection System',
    description: 'Machine learning powered system to detect and classify fake news articles with high accuracy using NLP techniques.',
    image: '/placeholder.svg',
    technologies: ['Python', 'ML', 'NLP'],
    demoLink: '#',
    codeLink: '#',
  },
];

const ProjectsSection = () => {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
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
