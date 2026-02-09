import { Heart, ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Coding Profiles', href: '#coding-profiles' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background to-transparent" />
      <div className="absolute top-0 left-1/4 w-72 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-0 right-1/3 w-60 h-24 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 items-start mb-10">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-cyan-400">
              Kavin E
            </span>
            <p className="text-sm text-muted-foreground text-center md:text-left max-w-xs">
              Full-Stack Developer passionate about building modern web experiences.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-2">
              {[
                { icon: Github, href: 'https://github.com/Kavin-E911', color: 'hover:text-white hover:border-white/30' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/kavin-e-8b1a0b2b0/', color: 'hover:text-blue-400 hover:border-blue-400/30' },
                { icon: Mail, href: 'mailto:kavine911@gmail.com', color: 'hover:text-pink-400 hover:border-pink-400/30' },
              ].map(({ icon: Icon, href, color }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-all duration-300 hover:bg-white/10 ${color}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">Quick Links</span>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-primary to-purple-400 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Back to Top */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
            >
              Back to Top
              <ArrowUp className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5">
          <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-pink-500 animate-pulse" /> by Kavin E &middot; © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
