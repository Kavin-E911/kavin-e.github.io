import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Code2, Trophy, Target } from 'lucide-react';

const profiles = [
  {
    name: 'LeetCode',
    emoji: '✨',
    color: 'from-yellow-400 to-orange-500',
    glowColor: 'rgba(250,204,21,0.15)',
    borderColor: 'border-yellow-400/30',
    activeBorder: 'hover:border-yellow-400/60',
    link: 'https://leetcode.com/u/itskavin_e/',
    image: '/coding picture/leetcode.png',
    icon: Target,
  },
  {
    name: 'GeeksforGeeks',
    emoji: '📗',
    color: 'from-emerald-400 to-green-600',
    glowColor: 'rgba(52,211,153,0.15)',
    borderColor: 'border-emerald-400/30',
    activeBorder: 'hover:border-emerald-400/60',
    link: 'https://www.geeksforgeeks.org/profile/ekavin',
    image: '/coding picture/geekforgeeks.png',
    icon: Code2,
  },
  {
    name: 'HackerRank',
    emoji: '📘',
    color: 'from-green-400 to-emerald-600',
    glowColor: 'rgba(74,222,128,0.15)',
    borderColor: 'border-green-400/30',
    activeBorder: 'hover:border-green-400/60',
    link: 'https://www.hackerrank.com/profile/23CS083_kpriet',
    image: '/coding picture/hackerrank.png',
    icon: Trophy,
  },
];

/* ── 3D Tilt Card ── */
const ProfileCard = ({ profile, index, isVisible }: { profile: typeof profiles[0]; index: number; isVisible: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
  };

  const Icon = profile.icon;

  return (
    <div
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 150 + 300}ms` }}
    >
      {/* Outer glow */}
      <div className="relative group">
        <div
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
          style={{ background: profile.glowColor }}
        />

        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`relative rounded-2xl overflow-hidden bg-card/60 backdrop-blur-md border ${profile.borderColor} ${profile.activeBorder} shadow-lg transition-all duration-300 flex flex-col`}
          style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        >
          {/* Image with shimmer */}
          <div className="relative overflow-hidden bg-muted/20 p-4">
            <div className="rounded-xl overflow-hidden shadow-md relative">
              <img
                src={profile.image}
                alt={`${profile.name} Profile`}
                className="w-full h-52 object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              {/* Shimmer overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2.5s ease-in-out infinite',
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1 text-center">
            <div className="flex items-center justify-center gap-2 mb-5">
              <div className={`p-1.5 rounded-lg bg-gradient-to-r ${profile.color}`}>
                <Icon className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-white transition-colors">
                <span className="mr-1.5">{profile.emoji}</span>
                {profile.name}
              </h3>
            </div>

            <div className="mt-auto">
              <a
                href={profile.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r ${profile.color} text-white font-medium text-sm shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Profile
                  <ExternalLink className="h-4 w-4" />
                </span>
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 3s ease-in-out infinite',
                  }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CodingProfilesSection = () => {
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
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5, opacity: Math.random() * 0.2 + 0.05,
      });
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(250, 204, 21, ${p.opacity})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(250, 204, 21, ${0.04 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section ref={sectionRef} id="coding-profiles" className="py-28 relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Decorative orbs */}
      <div className="absolute top-20 -right-28 w-56 h-56 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 -left-28 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-400/20 bg-yellow-500/5 text-yellow-400 text-xs font-semibold tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            Problem Solving
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">Coding Profiles</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            My journey in competitive programming and problem solving
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {profiles.map((profile, index) => (
            <ProfileCard key={profile.name} profile={profile} index={index} isVisible={isVisible} />
          ))}
        </div>

        {/* Stats badge */}
        <div className={`mt-12 flex justify-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-card/40 border border-border/30 backdrop-blur-sm">
            <span className="text-sm text-muted-foreground">Active on</span>
            <span className="text-lg font-black bg-gradient-to-r from-yellow-400 to-emerald-400 bg-clip-text text-transparent">{profiles.length}</span>
            <span className="text-sm text-muted-foreground">platforms</span>
          </div>
        </div>
      </div>

      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
    </section>
  );
};

export default CodingProfilesSection;
