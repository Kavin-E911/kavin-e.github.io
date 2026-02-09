import { Code, Database, Palette, Terminal, Globe, Cpu, Layers, Zap } from 'lucide-react';

const icons = [
  { Icon: Code, delay: 0, position: 'top-0 left-1/4' },
  { Icon: Database, delay: 1, position: 'top-1/4 right-0' },
  { Icon: Palette, delay: 2, position: 'bottom-1/4 right-1/4' },
  { Icon: Terminal, delay: 3, position: 'bottom-0 left-1/3' },
  { Icon: Globe, delay: 4, position: 'top-1/3 left-0' },
  { Icon: Cpu, delay: 5, position: 'top-1/2 right-1/4' },
  { Icon: Layers, delay: 6, position: 'bottom-1/3 left-0' },
  { Icon: Zap, delay: 7, position: 'top-0 right-1/3' },
];

const FloatingIcons = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {icons.map(({ Icon, delay, position }, index) => (
        <div
          key={index}
          className={`absolute ${position} float`}
          style={{
            animationDelay: `${delay * 0.5}s`,
          }}
        >
          <div className="p-3 glass rounded-xl opacity-60 hover:opacity-100 transition-opacity">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      ))}
      
      {/* Orbiting circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-primary/10 animate-spin-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-secondary/10 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
    </div>
  );
};

export default FloatingIcons;
