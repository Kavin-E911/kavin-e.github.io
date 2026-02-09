import { Github, Code, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink?: string;
  codeLink?: string;
  videoLink?: string;
  category?: string;
  index?: number;
}

const ProjectCard = ({ title, description, image, technologies, demoLink, codeLink, videoLink, index = 0 }: ProjectCardProps) => {
  const [showVideo, setShowVideo] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col h-full animate-fade-in"
      style={{ animationDelay: `${index * 0.08}s`, perspective: '800px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer glow */}
      <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 transition-opacity duration-500 blur-xl ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

      <div
        className={`relative flex flex-col h-full rounded-2xl border-2 backdrop-blur-sm overflow-hidden transition-all duration-300 ${
          isHovered ? 'border-white/20 bg-card shadow-2xl' : 'border-border/20 bg-card/50'
        }`}
        style={{
          transform: isHovered ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : 'rotateX(0) rotateY(0)',
          transition: 'transform 0.2s ease-out, border-color 0.3s, background 0.3s, box-shadow 0.3s',
        }}
      >
        {/* Video Overlay */}
        {showVideo && videoLink && (
          <div className="absolute inset-0 z-50 bg-black/95 rounded-2xl flex flex-col items-center justify-center p-4">
            <video src={videoLink} controls autoPlay className="w-full max-h-[80%] rounded-lg object-contain" />
            <button onClick={() => setShowVideo(false)} className="mt-3 text-sm text-muted-foreground hover:text-white transition-colors">
              ✕ Close
            </button>
          </div>
        )}

        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
          {image && image !== '/placeholder.svg' ? (
            <>
              <img src={image} alt={title} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent pointer-events-none" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
              <Code className="h-12 w-12 text-primary/60" />
            </div>
          )}
          {/* Shimmer on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
              backgroundSize: '200% 200%',
              animation: isHovered ? 'shimmer 2s ease-in-out infinite' : 'none',
            }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6 space-y-4">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed flex-1">{description}</p>

          {/* Tech Stack */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-lg border border-primary/20 hover:bg-primary/20 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-3 border-t border-border/30">
            {codeLink && codeLink !== '#' && (
              <Button variant="ghost" size="sm" className="text-foreground hover:text-primary hover:bg-primary/10 gap-2 font-medium" asChild>
                <a href={codeLink} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />Code
                </a>
              </Button>
            )}
            {demoLink && demoLink !== '#' && (
              <Button variant="heroOutline" size="sm" asChild>
                <a href={demoLink} target="_blank" rel="noopener noreferrer">Demo</a>
              </Button>
            )}
            {videoLink && (
              <Button variant="ghost" size="sm" className="text-foreground hover:text-primary hover:bg-primary/10 gap-2 font-medium" onClick={() => setShowVideo(true)}>
                <Play className="h-4 w-4" />Video
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Shimmer keyframes */}
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
    </div>
  );
};

export default ProjectCard;
