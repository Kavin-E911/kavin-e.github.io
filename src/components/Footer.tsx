import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-xl font-bold gradient-text">
            Kavin Vikraman
          </div>
          
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            Made with <Heart className="h-4 w-4 text-primary animate-pulse" /> © {currentYear}
          </p>

          <div className="flex gap-6">
            {['Home', 'Skills', 'Projects', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
