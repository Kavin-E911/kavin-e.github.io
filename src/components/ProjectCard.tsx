import { Github, Code, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink?: string;
  codeLink?: string;
  videoLink?: string;
  category?: string;
}

const ProjectCard = ({ title, description, image, technologies, demoLink, codeLink, videoLink }: ProjectCardProps) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="glass-card group overflow-hidden flex flex-col h-full relative">
      {/* Video Overlay */}
      {showVideo && videoLink && (
        <div className="absolute inset-0 z-50 bg-black/95 rounded-xl flex flex-col items-center justify-center p-4">
          <video
            src={videoLink}
            controls
            autoPlay
            className="w-full max-h-[80%] rounded-lg object-contain"
          />
          <button
            onClick={() => setShowVideo(false)}
            className="mt-3 text-sm text-muted-foreground hover:text-white transition-colors"
          >
            ✕ Close
          </button>
        </div>
      )}

      {/* Project Image / Preview */}
      <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {image && image !== '/placeholder.svg' ? (
          <>
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent pointer-events-none" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Code className="h-12 w-12 text-primary/60 mx-auto mb-2" />
                <span className="text-xs text-muted-foreground/60 font-mono">{title}</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent pointer-events-none" />
          </>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 space-y-4">
        <h3 className="text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed flex-1">
          {description}
        </p>

        {/* Tech Stack */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-lg border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-3 border-t border-border/50">
          {codeLink && codeLink !== '#' && (
            <Button
              variant="ghost"
              size="sm"
              className="text-foreground hover:text-primary hover:bg-primary/10 gap-2 font-medium"
              asChild
            >
              <a href={codeLink} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                Code
              </a>
            </Button>
          )}
          {demoLink && demoLink !== '#' && (
            <Button variant="heroOutline" size="sm" asChild>
              <a href={demoLink} target="_blank" rel="noopener noreferrer">
                Demo
              </a>
            </Button>
          )}
          {videoLink && (
            <Button
              variant="ghost"
              size="sm"
              className="text-foreground hover:text-primary hover:bg-primary/10 gap-2 font-medium"
              onClick={() => setShowVideo(true)}
            >
              <Play className="h-4 w-4" />
              Video
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
