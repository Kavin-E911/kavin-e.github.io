import { Github, Linkedin, Mail, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FloatingIcons from './FloatingIcons';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-20">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 8 + 's',
              animationDuration: Math.random() * 10 + 10 + 's',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Identity */}
          <div className="space-y-8 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-4">
              <p className="text-primary font-medium tracking-wider uppercase text-sm">
                Welcome to my portfolio
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-tight">
                Hi, I'm{' '}
                <span className="gradient-text neon-text">Kavin</span>
                <br />
                <span className="gradient-text">Vikraman</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Full Stack Developer | UI/UX Designer
              </p>
            </div>

            <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
              I craft fast, reliable web applications with clean code and stunning design. 
              Passionate about solving complex problems and creating seamless user experiences 
              that leave a lasting impression.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" className="group">
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Resume
              </Button>
              <Button variant="heroOutline" size="lg" className="group">
                Reach Me
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="flex gap-4 pt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass rounded-xl hover:neon-glow transition-all duration-300 hover:scale-110"
              >
                <Github className="h-6 w-6 text-foreground" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass rounded-xl hover:neon-glow transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-6 w-6 text-foreground" />
              </a>
              <a
                href="mailto:kavin@example.com"
                className="p-3 glass rounded-xl hover:neon-glow transition-all duration-300 hover:scale-110"
              >
                <Mail className="h-6 w-6 text-foreground" />
              </a>
            </div>
          </div>

          {/* Right Side - Photo + 3D Visuals */}
          <div className="relative flex justify-center items-center animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
            <FloatingIcons />
            
            {/* Profile Photo Container */}
            <div className="relative z-10">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary blur-2xl opacity-30 animate-glow-pulse" />
              
              {/* Profile ring */}
              <div className="profile-ring">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden bg-card">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl font-display font-bold gradient-text">KV</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '1s' }}>
        <span className="text-sm text-muted-foreground">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
