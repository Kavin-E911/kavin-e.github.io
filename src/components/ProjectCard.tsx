import { ExternalLink, Github, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink?: string;
  codeLink?: string;
}

const ProjectCard = ({ title, description, image, technologies, demoLink, codeLink }: ProjectCardProps) => {
  return (
    <div className="glass-card group overflow-hidden">
      {/* Project Image */}
      <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Code className="h-16 w-16 text-primary/50" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold font-display text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          {demoLink && (
            <Button variant="heroOutline" size="sm" asChild>
              <a href={demoLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Demo
              </a>
            </Button>
          )}
          {codeLink && (
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
              <a href={codeLink} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
