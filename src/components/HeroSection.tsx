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
                <span className="gradient-text">Kavin</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Full Stack Developer | Problem Solver
              </p>
            </div>

            <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
              I am Kavin E, a passionate and self-motivated Full-Stack Developer with a strong foundation in programming and problem-solving. Proficient in Java, Python, and C, I actively enhance my analytical and logical thinking skills by solving complex problems on platforms such as LeetCode, GeeksforGeeks, and HackerRank. Eager to apply my technical expertise to real-world IT challenges and continuously grow as a skilled software professional.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="/Kavin-resume.pdf" download>
                <Button variant="hero" size="lg" className="group">
                  <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Resume
                </Button>
              </a>
              <a
                href="https://www.linkedin.com/in/kavin-e-7258252a1/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="heroOutline" size="lg" className="group">
                  Reach Me
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </div>

            <div className="flex gap-4 pt-4">
              <a
                href="https://github.com/Kavin-E911"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass rounded-xl hover:scale-110 transition-all duration-300"
              >
                <Github className="h-6 w-6 text-foreground" />
              </a>
              <a
                href="https://www.linkedin.com/in/kavin-e-7258252a1/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass rounded-xl hover:scale-110 transition-all duration-300"
              >
                <Linkedin className="h-6 w-6 text-foreground" />
              </a>
              <a
                href="mailto:ekavin65@gmail.com"
                className="p-3 glass rounded-xl hover:scale-110 transition-all duration-300"
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
              {/* Profile photo */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden bg-card border-4 border-primary/30 shadow-2xl">
                  <img
                    src="/profile.png"
                    alt="Kavin E"
                    className="w-full h-full object-cover"
                  />
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
