import { useState, useEffect, useRef } from 'react';

interface Item {
  name: string;
  icon: string;
  color: string;
  category: string;
  level?: number; // 1-5 proficiency
}

const skills: Item[] = [
  { name: 'Java', icon: '☕', color: 'from-orange-500 to-red-600', category: 'Languages', level: 5 },
  { name: 'Python', icon: '🐍', color: 'from-blue-500 to-yellow-500', category: 'Languages', level: 4 },
  { name: 'C', icon: '⚙️', color: 'from-blue-600 to-indigo-600', category: 'Languages', level: 4 },

  { name: 'HTML5', icon: '🟧', color: 'from-orange-500 to-orange-600', category: 'Web', level: 5 },
  { name: 'CSS3', icon: '🔵', color: 'from-blue-400 to-blue-600', category: 'Web', level: 4 },
  { name: 'JavaScript', icon: '🟨', color: 'from-yellow-400 to-amber-500', category: 'Web', level: 4 },
  { name: 'React.js', icon: '⚛️', color: 'from-cyan-400 to-blue-500', category: 'Web', level: 4 },
  { name: 'Flask', icon: '🌶️', color: 'from-gray-500 to-gray-700', category: 'Web', level: 3 },

  { name: 'SQL', icon: '🗄️', color: 'from-blue-500 to-blue-700', category: 'DB & Tools', level: 4 },
  { name: 'PL/SQL', icon: '📋', color: 'from-indigo-500 to-purple-600', category: 'DB & Tools', level: 3 },
  { name: 'MongoDB', icon: '🍃', color: 'from-green-500 to-green-700', category: 'DB & Tools', level: 3 },
  { name: 'Power BI', icon: '📊', color: 'from-yellow-500 to-amber-600', category: 'DB & Tools', level: 3 },

  { name: 'Java DSA', icon: '☕', color: 'from-orange-400 to-red-500', category: 'DSA', level: 5 },
  { name: 'C DSA', icon: '⚙️', color: 'from-blue-500 to-indigo-500', category: 'DSA', level: 4 },
];

const skillCats = ['All', 'Languages', 'Web', 'DB & Tools', 'DSA'];

const tools: Item[] = [
  { name: 'Java', icon: '☕', color: 'from-orange-500 to-red-600', category: 'Languages', level: 5 },
  { name: 'Python', icon: '🐍', color: 'from-blue-500 to-yellow-500', category: 'Languages', level: 4 },
  { name: 'C++', icon: '⚡', color: 'from-blue-600 to-indigo-600', category: 'Languages', level: 3 },
  { name: 'JavaScript', icon: '🟨', color: 'from-yellow-400 to-amber-500', category: 'Languages', level: 4 },
  { name: 'TypeScript', icon: '🔷', color: 'from-blue-500 to-blue-700', category: 'Languages', level: 3 },

  { name: 'HTML5', icon: '🟧', color: 'from-orange-500 to-orange-600', category: 'Frontend', level: 5 },
  { name: 'CSS3', icon: '🎨', color: 'from-blue-400 to-blue-600', category: 'Frontend', level: 4 },
  { name: 'React', icon: '⚛️', color: 'from-cyan-400 to-blue-500', category: 'Frontend', level: 4 },
  { name: 'Tailwind CSS', icon: '💨', color: 'from-teal-400 to-cyan-500', category: 'Frontend', level: 4 },
  { name: 'Bootstrap', icon: '🅱️', color: 'from-purple-500 to-violet-600', category: 'Frontend', level: 3 },

  { name: 'Flask', icon: '🌶️', color: 'from-gray-500 to-gray-700', category: 'Backend', level: 3 },
  { name: 'REST API', icon: '🔗', color: 'from-green-500 to-emerald-600', category: 'Backend', level: 4 },
  { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-600 to-indigo-700', category: 'Backend', level: 3 },
  { name: 'MongoDB', icon: '🍃', color: 'from-green-500 to-green-700', category: 'Backend', level: 3 },
  { name: 'SpaCy', icon: '🧠', color: 'from-cyan-500 to-teal-600', category: 'Backend', level: 3 },

  { name: 'Git', icon: '📂', color: 'from-orange-500 to-red-500', category: 'DevTools', level: 4 },
  { name: 'GitHub', icon: '🐙', color: 'from-gray-600 to-gray-800', category: 'DevTools', level: 4 },
  { name: 'VS Code', icon: '💙', color: 'from-blue-500 to-blue-700', category: 'DevTools', level: 5 },
  { name: 'Vite', icon: '⚡', color: 'from-purple-500 to-yellow-500', category: 'DevTools', level: 4 },
  { name: 'Arduino', icon: '🔌', color: 'from-teal-500 to-cyan-600', category: 'DevTools', level: 3 },
  { name: 'Power BI', icon: '📊', color: 'from-yellow-500 to-amber-600', category: 'DevTools', level: 3 },
];

const toolCats = ['All', 'Languages', 'Frontend', 'Backend', 'DevTools'];

/* ── Floating particles background ── */
const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

/* ── Proficiency dots ── */
const ProficiencyDots = ({ level = 3, color }: { level: number; color: string }) => (
  <div className="flex gap-1 mt-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
          i <= level
            ? `bg-gradient-to-r ${color} shadow-sm`
            : 'bg-border/40'
        }`}
      />
    ))}
  </div>
);

/* ── Enhanced card with 3D tilt ── */
const SkillCard = ({
  item,
  index,
  isHovered,
  onHover,
  onLeave,
}: {
  item: Item;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -15, y: x * 15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    onLeave();
  };

  return (
    <div
      className="group relative animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s`, perspective: '600px' }}
      onMouseEnter={onHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer glow */}
      <div
        className={`absolute -inset-2 rounded-3xl bg-gradient-to-br ${item.color} transition-opacity duration-500 blur-xl ${
          isHovered ? 'opacity-25' : 'opacity-0'
        }`}
      />

      {/* Card body */}
      <div
        ref={cardRef}
        className={`relative w-28 h-32 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 cursor-default transition-all duration-300 backdrop-blur-sm ${
          isHovered
            ? 'border-white/30 bg-card shadow-2xl'
            : 'border-border/30 bg-card/50 hover:bg-card/80'
        }`}
        style={{
          transform: isHovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.08)`
            : 'rotateX(0) rotateY(0) scale(1)',
          transition: 'transform 0.2s ease-out, border-color 0.3s, background 0.3s, box-shadow 0.3s',
        }}
      >
        {/* Gradient border shimmer */}
        <div
          className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
            backgroundSize: '200% 200%',
            animation: isHovered ? 'shimmer 2s ease-in-out infinite' : 'none',
          }}
        />

        {/* Icon with bounce */}
        <span
          className="text-4xl transition-all duration-300 drop-shadow-lg"
          style={{
            transform: isHovered ? 'scale(1.3) translateY(-2px)' : 'scale(1)',
            filter: isHovered ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' : 'none',
          }}
        >
          {item.icon}
        </span>

        {/* Name */}
        <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight px-2 mt-0.5">
          {item.name}
        </span>

        {/* Proficiency */}
        <ProficiencyDots level={item.level || 3} color={item.color} />
      </div>

      {/* Floating category badge */}
      <div
        className={`absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase transition-all duration-300 ${
          isHovered
            ? `opacity-100 translate-y-0 bg-gradient-to-r ${item.color} text-white shadow-xl`
            : 'opacity-0 translate-y-3'
        }`}
      >
        {item.category === 'DevTools' ? 'Dev Tool' : item.category}
      </div>
    </div>
  );
};

/* ── Category filter pill ── */
const FilterPill = ({
  label,
  isActive,
  onClick,
  gradient,
  count,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  gradient: string;
  count?: number;
}) => (
  <button
    onClick={onClick}
    className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-400 border overflow-hidden ${
      isActive
        ? `bg-gradient-to-r ${gradient} text-white border-transparent shadow-lg scale-105`
        : 'bg-card/40 border-border/50 text-muted-foreground hover:text-foreground hover:border-white/20 hover:bg-card/70'
    }`}
  >
    {/* Shine effect on active */}
    {isActive && (
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 3s ease-in-out infinite',
        }}
      />
    )}
    <span className="relative z-10 flex items-center gap-2">
      {label}
      {count !== undefined && isActive && (
        <span className="bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </span>
  </button>
);

/* ── Stats card ── */
const StatCard = ({ label, count, color, icon }: { label: string; count: number; color: string; icon: string }) => (
  <div className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm hover:bg-card/80 hover:border-white/10 hover:scale-105 transition-all duration-300 cursor-default">
    <span className="text-xl">{icon}</span>
    <div className="flex flex-col">
      <span className={`text-xl font-black ${color} leading-none`}>{count}</span>
      <span className="text-[11px] text-muted-foreground font-medium">{label}</span>
    </div>
  </div>
);

const SkillsSection = () => {
  const [activeToolCat, setActiveToolCat] = useState('All');
  const [activeSkillCat, setActiveSkillCat] = useState('All');
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'techstack' | 'tools'>('techstack');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const filteredTools = activeToolCat === 'All' ? tools : tools.filter((t) => t.category === activeToolCat);
  const filteredSkills = activeSkillCat === 'All' ? skills : skills.filter((s) => s.category === activeSkillCat);

  return (
    <section ref={sectionRef} id="skills" className="py-28 relative overflow-hidden">
      {/* Animated particle background */}
      <ParticleField />

      {/* Decorative blurred orbs */}
      <div className="absolute top-20 -left-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            My Arsenal
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Tech Stack{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              & Tools
            </span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            The technologies and tools I wield to craft exceptional digital experiences
          </p>
        </div>

        {/* Tab switcher - glassmorphism style */}
        <div
          className={`flex justify-center mb-14 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex rounded-2xl border border-white/10 bg-card/30 backdrop-blur-xl p-1.5 gap-1 shadow-2xl shadow-black/10">
            <button
              onClick={() => setActiveTab('techstack')}
              className={`relative px-7 py-3 rounded-xl text-sm font-bold transition-all duration-400 overflow-hidden ${
                activeTab === 'techstack'
                  ? 'text-white shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {activeTab === 'techstack' && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl" />
              )}
              <span className="relative z-10 flex items-center gap-2">
                🎯 Tech Stack
              </span>
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`relative px-7 py-3 rounded-xl text-sm font-bold transition-all duration-400 overflow-hidden ${
                activeTab === 'tools'
                  ? 'text-white shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {activeTab === 'tools' && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl" />
              )}
              <span className="relative z-10 flex items-center gap-2">
                🛠️ Tools & Technologies
              </span>
            </button>
          </div>
        </div>

        {/* ═══ Tech Stack Tab ═══ */}
        {activeTab === 'techstack' && (
          <div className="animate-fade-in">
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-14">
              {skillCats.map((cat) => (
                <FilterPill
                  key={cat}
                  label={cat}
                  isActive={activeSkillCat === cat}
                  onClick={() => setActiveSkillCat(cat)}
                  gradient="from-cyan-500 to-blue-600"
                  count={cat === 'All' ? skills.length : skills.filter((s) => s.category === cat).length}
                />
              ))}
            </div>

            {/* Grid */}
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-wrap justify-center gap-7 pb-8">
                {filteredSkills.map((skill, index) => (
                  <SkillCard
                    key={skill.name}
                    item={skill}
                    index={index}
                    isHovered={hoveredSkill === skill.name}
                    onHover={() => setHoveredSkill(skill.name)}
                    onLeave={() => setHoveredSkill(null)}
                  />
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-14 flex flex-wrap justify-center gap-4">
              <StatCard label="Languages" count={skills.filter((s) => s.category === 'Languages').length} color="text-orange-400" icon="💻" />
              <StatCard label="Web" count={skills.filter((s) => s.category === 'Web').length} color="text-cyan-400" icon="🌐" />
              <StatCard label="DB & Tools" count={skills.filter((s) => s.category === 'DB & Tools').length} color="text-green-400" icon="🛠️" />
              <StatCard label="DSA" count={skills.filter((s) => s.category === 'DSA').length} color="text-purple-400" icon="🧠" />
            </div>
          </div>
        )}

        {/* ═══ Tools & Technologies Tab ═══ */}
        {activeTab === 'tools' && (
          <div className="animate-fade-in">
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-14">
              {toolCats.map((cat) => (
                <FilterPill
                  key={cat}
                  label={cat === 'DevTools' ? 'Dev Tools' : cat}
                  isActive={activeToolCat === cat}
                  onClick={() => setActiveToolCat(cat)}
                  gradient="from-purple-500 to-pink-600"
                  count={cat === 'All' ? tools.length : tools.filter((t) => t.category === cat).length}
                />
              ))}
            </div>

            {/* Grid */}
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-wrap justify-center gap-7 pb-8">
                {filteredTools.map((tool, index) => (
                  <SkillCard
                    key={tool.name}
                    item={tool}
                    index={index}
                    isHovered={hoveredTool === tool.name}
                    onHover={() => setHoveredTool(tool.name)}
                    onLeave={() => setHoveredTool(null)}
                  />
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-14 flex flex-wrap justify-center gap-4">
              <StatCard label="Languages" count={tools.filter((t) => t.category === 'Languages').length} color="text-orange-400" icon="💻" />
              <StatCard label="Frontend" count={tools.filter((t) => t.category === 'Frontend').length} color="text-cyan-400" icon="🌐" />
              <StatCard label="Backend" count={tools.filter((t) => t.category === 'Backend').length} color="text-green-400" icon="⚙️" />
              <StatCard label="Dev Tools" count={tools.filter((t) => t.category === 'DevTools').length} color="text-purple-400" icon="🔧" />
            </div>
          </div>
        )}

        {/* Total badge */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-card/80 to-card/40 border border-border/30 backdrop-blur-sm shadow-xl">
            <span className="text-sm text-muted-foreground">
              {activeTab === 'techstack' ? 'Total Skills:' : 'Total Tools:'}
            </span>
            <span className="text-lg font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {activeTab === 'techstack' ? skills.length : tools.length}
            </span>
          </div>
        </div>
      </div>

      {/* Shimmer keyframes */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;
