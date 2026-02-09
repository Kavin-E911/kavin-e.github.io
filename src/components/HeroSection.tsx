import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/* ── Animated Stats Ticker ── */
const StatsTicker = () => {
  const stats = [
    { label: 'Problems Solved', value: '400+', color: 'from-cyan-400 to-blue-500' },
    { label: 'Projects Built', value: '8+', color: 'from-purple-400 to-pink-500' },
    { label: 'Certifications', value: '7+', color: 'from-amber-400 to-orange-500' },
    { label: 'Platforms Active', value: '3+', color: 'from-green-400 to-emerald-500' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="group relative px-4 py-3 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm hover:border-white/15 transition-all duration-500 hover:scale-105 cursor-default overflow-hidden"
          style={{ animation: `fadeSlideUp 0.6s ease ${i * 0.1 + 0.5}s both` }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
          <div className={`text-xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsVisible(true);
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
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5, opacity: Math.random() * 0.4 + 0.1,
      });
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.opacity})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.05 * (1 - dist / 100)})`;
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
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-20">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Decorative orbs */}
      <div className="absolute top-20 -left-40 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 -right-40 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Welcome to my portfolio
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Kavin
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                Full Stack Developer | Problem Solver
              </p>
            </div>

            <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
              I am Kavin E, a passionate and self-motivated Full-Stack Developer with a strong foundation in programming and problem-solving. Proficient in <span className="text-primary font-semibold">Java</span>, I actively enhance my analytical and logical thinking skills by solving complex problems on platforms such as LeetCode, GeeksforGeeks, and HackerRank.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="/Kavin-resume.pdf" download>
                <Button variant="hero" size="lg" className="group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Resume
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/kavin-e-7258252a1/" target="_blank" rel="noopener noreferrer">
                <Button variant="heroOutline" size="lg" className="group">
                  Reach Me
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </div>

            {/* Social links with 3D hover */}
            <div className="flex gap-4 pt-4">
              {[
                { href: 'https://github.com/Kavin-E911', Icon: Github },
                { href: 'https://www.linkedin.com/in/kavin-e-7258252a1/', Icon: Linkedin },
                { href: 'mailto:ekavin65@gmail.com', Icon: Mail },
              ].map(({ href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm hover:scale-110 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                >
                  <Icon className="h-6 w-6 text-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Side - Cosmic Ring Photo */}
          <div
            className={`relative flex flex-col items-center gap-6 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="relative w-[450px] h-[450px] md:w-[520px] md:h-[520px] flex items-center justify-center">

              {/* Concentric rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[520, 440, 360, 300].map((size, i) => (
                  <div
                    key={size}
                    className="absolute rounded-full border"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      borderColor: `rgba(6, 182, 212, ${0.06 + i * 0.03})`,
                      animation: `pulseRing 4s ease-in-out ${i * 0.6}s infinite`,
                    }}
                  />
                ))}
              </div>

              {/* Sparkle stars */}
              {[
                { top: '5%', left: '20%', size: 20, delay: 0 },
                { top: '12%', right: '10%', size: 14, delay: 1.2 },
                { top: '35%', left: '2%', size: 12, delay: 0.6 },
                { top: '30%', right: '0%', size: 8, delay: 2.1 },
                { bottom: '25%', left: '5%', size: 18, delay: 0.3 },
                { bottom: '10%', left: '25%', size: 10, delay: 1.8 },
                { bottom: '5%', right: '20%', size: 16, delay: 0.9 },
                { top: '55%', right: '2%', size: 20, delay: 1.5 },
                { top: '8%', left: '45%', size: 8, delay: 2.4 },
                { bottom: '30%', right: '12%', size: 6, delay: 0.5 },
              ].map((star, i) => (
                <svg
                  key={i}
                  className="absolute pointer-events-none"
                  style={{ top: star.top, left: star.left, right: star.right, bottom: star.bottom, animation: `twinkle 3s ease-in-out ${star.delay}s infinite` }}
                  width={star.size}
                  height={star.size}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" fill="rgba(6, 182, 212, 0.7)" />
                </svg>
              ))}

              {/* Small floating dots */}
              {[
                { top: '18%', right: '18%', size: 6 },
                { top: '70%', left: '15%', size: 4 },
                { top: '25%', right: '30%', size: 5 },
                { bottom: '15%', right: '25%', size: 3 },
                { top: '50%', left: '8%', size: 4 },
              ].map((dot, i) => (
                <div
                  key={`dot-${i}`}
                  className="absolute rounded-full bg-cyan-400/40 pointer-events-none"
                  style={{ top: dot.top, left: dot.left, right: dot.right, bottom: dot.bottom, width: dot.size, height: dot.size, animation: `float ${3 + i * 0.5}s ease-in-out ${i * 0.4}s infinite` }}
                />
              ))}

              {/* Cyan ring border around photo */}
              <div className="absolute w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full border-2 border-cyan-400/50" style={{ animation: 'spinSlow 25s linear infinite' }} />

              {/* Profile photo */}
              <div className="relative z-10 w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden shadow-2xl shadow-cyan-500/10">
                <img src="/profile.png" alt="Kavin E" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Stats Ticker */}
            <div className="w-full max-w-sm" style={{ animation: 'fadeSlideUp 0.8s ease 0.6s both' }}>
              <StatsTicker />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <span className="text-sm text-muted-foreground">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRing {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.03); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
