import { useEffect, useRef, useState } from 'react';
import { GraduationCap, MapPin, Calendar, ExternalLink } from 'lucide-react';

const educationData = [
  {
    institution: 'KPR Institute of Engineering and Technology',
    location: 'Coimbatore, Tamil Nadu, India',
    locationLink: 'https://maps.app.goo.gl/iyBuH7uR4VRcRgmx5',
    degree: 'Bachelor of Engineering in Computer Science and Engineering',
    period: '2023 - 2027',
    score: '9.0/10 CGPA',
    image: '/education/kpr.png',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    institution: 'Universal Matric. Hr. Sec. School',
    location: 'Tiruppur, Tamil Nadu, India',
    locationLink: 'https://maps.app.goo.gl/G7CJMTcUeRGc8GdaA',
    degree: 'Higher Secondary Schooling',
    period: '2023',
    score: '95% Marks',
    image: '/education/universal.png',
    color: 'from-purple-500 to-pink-600',
  },
];

const EducationSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5, opacity: Math.random() * 0.3 + 0.05,
      });
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.04 * (1 - dist / 110)})`;
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
    <section ref={sectionRef} id="education" className="py-28 relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Decorative orbs */}
      <div className="absolute top-20 -right-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 -left-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-500/5 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Academic Journey
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Education</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            My academic journey and qualifications
          </p>
        </div>

        {/* Cards – stacked one by one */}
        <div className="max-w-3xl mx-auto space-y-8">
          {educationData.map((edu, index) => (
            <div
              key={edu.institution}
              className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 200 + 300}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`group relative rounded-2xl border-2 backdrop-blur-sm overflow-hidden transition-all duration-500 ${
                  hoveredCard === index
                    ? 'border-white/20 bg-card shadow-2xl shadow-primary/10 scale-[1.01]'
                    : 'border-border/20 bg-card/50'
                }`}
              >
                {/* Glow */}
                <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${edu.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 pointer-events-none`} />

                <div className="flex flex-col md:flex-row gap-5 items-center p-6 relative">
                  {/* Image */}
                  <div className={`w-full md:w-44 h-32 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all duration-300 ${
                    hoveredCard === index ? 'border-white/20 shadow-lg' : 'border-border/30'
                  }`}>
                    <img src={edu.image} alt={edu.institution} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-3 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${edu.color} bg-opacity-20 border border-white/10`}>
                        <GraduationCap className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                        {edu.institution}
                      </h3>
                    </div>

                    <p className="text-base text-foreground/80 font-medium">{edu.degree}</p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {edu.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {edu.period}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                      <div className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${edu.color} shadow-lg`}>
                        <span className="text-sm font-bold text-white">{edu.score}</span>
                      </div>
                      <a
                        href={edu.locationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/10 bg-card/50 backdrop-blur-sm hover:border-white/30 hover:bg-card/80 text-sm font-semibold text-muted-foreground hover:text-foreground transition-all duration-300"
                      >
                        <MapPin className="h-3.5 w-3.5" />
                        View Location
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
