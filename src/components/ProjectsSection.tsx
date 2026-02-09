import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
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

const filterTabs: { label: string; value: ProjectCategory; icon: string }[] = [
  { label: 'All Projects', value: 'all', icon: '📁' },
  { label: 'Internship', value: 'internship', icon: '💼' },
  { label: 'Personal', value: 'personal', icon: '🚀' },
];

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('personal');
  const [showAll, setShowAll] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* ── Particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 2 + 0.5, opacity: Math.random() * 0.25 + 0.05,
      });
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${p.opacity})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.04 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  const filteredProjects = activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);

  return (
    <section ref={sectionRef} id="projects" className="py-28 relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Decorative orbs */}
      <div className="absolute top-32 -left-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 -right-32 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-400/20 bg-purple-500/5 text-purple-400 text-xs font-semibold tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            My Work
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            Real-world applications that showcase my skills and passion for building
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={`flex flex-wrap justify-center gap-3 mb-14 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {filterTabs.map((tab) => {
            const count = tab.value === 'all' ? projects.length : projects.filter((p) => p.category === tab.value).length;
            return (
              <button
                key={tab.value}
                onClick={() => { setActiveFilter(tab.value); setShowAll(false); }}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-400 border overflow-hidden ${
                  activeFilter === tab.value
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white border-transparent shadow-lg scale-105'
                    : 'bg-card/40 border-border/50 text-muted-foreground hover:text-foreground hover:border-white/20 hover:bg-card/70'
                }`}
              >
                {activeFilter === tab.value && (
                  <div className="absolute inset-0 opacity-20" style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)',
                    backgroundSize: '200% 100%', animation: 'shimmer 3s ease-in-out infinite',
                  }} />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab.icon} {tab.label}
                  {activeFilter === tab.value && (
                    <span className="bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{count}</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>

        {filteredProjects.length > 3 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/10 bg-card/30 backdrop-blur-sm hover:border-white/20 hover:bg-card/60 text-sm font-semibold text-muted-foreground hover:text-foreground transition-all duration-300 shadow-lg"
            >
              {showAll ? 'Show Less' : 'Show More'}
              {showAll ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
        )}

        {/* Total badge */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-card/40 border border-border/30 backdrop-blur-sm">
            <span className="text-sm text-muted-foreground">Total Projects:</span>
            <span className="text-lg font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{projects.length}</span>
          </div>
        </div>
      </div>

      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
    </section>
  );
};

export default ProjectsSection;
