import { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Award, Trophy } from 'lucide-react';

const certifications = [
  {
    title: 'Problem Solving (Intermediate)',
    issuer: 'HackerRank',
    credentialId: 'ECE166E780F8',
    description: 'Certified in intermediate-level problem solving, demonstrating proficiency in data structures, algorithms, and analytical thinking through HackerRank\'s assessment platform.',
    image: '/certificate/certificate1.png',
  },
  {
    title: 'Problem Solving (Basic)',
    issuer: 'HackerRank',
    credentialId: '4FE395C07283',
    description: 'Certified in basic problem solving, covering fundamental concepts of algorithms, data structures, and logical reasoning through HackerRank\'s assessment platform.',
    image: '/certificate/certificate2.png',
  },
  {
    title: 'The Complete Full-Stack Web Development Bootcamp',
    issuer: 'Udemy',
    credentialId: 'UC-3b7o22a9',
    description: 'Completed an extensive bootcamp covering HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, and more — building full-stack web applications from scratch.',
    image: '/certificate/certificate3.png',
  },
  {
    title: 'Red Hat Certified System Administrator (RHCSA)',
    issuer: 'Red Hat',
    credentialId: '250-190-931',
    description: 'Earned the globally recognized RHCSA certification, demonstrating skills in managing Red Hat Enterprise Linux systems, configuring services, and handling storage and security.',
    image: '/certificate/certificate4.png',
  },
  {
    title: 'Practical Cyber Security (Elite)',
    issuer: 'NPTEL (IIT Kanpur)',
    credentialId: 'NPTEL25CS120',
    description: 'Achieved Elite certification in Practical Cyber Security from NPTEL (IIT Kanpur), covering network security, cryptography, ethical hacking, and cyber defense strategies.',
    image: '/certificate/certificate6.png',
  },
  {
    title: 'Programming using Java',
    issuer: 'Infosys Springboard',
    credentialId: 'INFY-JAVA-2025',
    description: 'Completed a comprehensive Java programming course through Infosys Springboard, covering OOP principles, collections, exception handling, and application development.',
    image: '/certificate/certificate7.png',
  },
  {
    title: 'Web Development Internship',
    issuer: 'Prodigy InfoTech',
    credentialId: 'PIT/JAN25/00271',
    description: 'Completed a web development internship at Prodigy InfoTech, gaining hands-on experience in building responsive web applications using modern technologies and frameworks.',
    image: '/certificate/certificate8.png',
  },
];

const achievements = [
  {
    title: 'Flame Youth Achiever',
    issuer: 'FLAME 2024-25 (Mahindra Technical Academy)',
    credentialId: 'FLAME-2025',
    description: 'Recognized as a Flame Youth Achiever at FLAME 2024-25 organized by Mahindra Technical Academy. This prestigious award celebrates young talent who demonstrate exceptional skills, leadership, and dedication towards innovation and technology.',
    images: ['/achievement/flame1.0.png', '/achievement/flame1.1.png'],
  },
  {
    title: 'Top-30 at Science Day',
    issuer: 'Intra-college science fair',
    credentialId: 'TOP30-SCIENCE',
    description: 'Our team at KPRIET showcased innovation on Science Day with a Temperature Based Fan Speed Control model using Arduino, DC fan, and a Temperature sensor. Honored to secure a spot in the top 30, earning meritorious recognition and certificates.',
    images: ['/achievement/top301.0.png', '/achievement/top301.1.png'],
  },
  {
    title: 'Codematrix Runner-Up at BIT',
    issuer: 'Bannari Amman Institute of Technology',
    credentialId: 'BANNARI-2024',
    description: 'Thrilled to have participated in Codematrix, Slidescape, and Glitch Hunt at Bannari Amman Institute of Technology on November 6, 2024! Proud to have secured the runner-up position in Codematrix with my teammate Prakash Raj M, and honored to receive a certificate and shield for our achievement. Grateful for the experiences and skills gained along the way!',
    images: ['/achievement/bannari1.0.png', '/achievement/bannari1.1.png'],
  },
];

/* ── Particle Canvas ── */
const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }[] = [];

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#f59e0b', '#f97316', '#fbbf24', '#a855f7'];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

/* ── Scroll Reveal Hook ── */
const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
};

/* ── 3D Tilt Card Wrapper ── */
const TiltCard = ({ children, className = '', onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) card.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)';
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

/* ── Main Section Component ── */
const CertificationsSection = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [achImageIndex, setAchImageIndex] = useState<Record<string, number>>({});
  const [selectedAchievement, setSelectedAchievement] = useState<typeof achievements[0] | null>(null);
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [showAllAch, setShowAllAch] = useState(false);

  const { ref: sectionRef, visible } = useScrollReveal();

  const visibleCerts = showAllCerts ? certifications : certifications.slice(0, 4);
  const visibleAch = showAllAch ? achievements : achievements.slice(0, 2);

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      {/* Particle Background */}
      <ParticleField />

      {/* Decorative Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl" />

      <div
        ref={sectionRef}
        className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/20 bg-amber-500/5 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Credentials & Honors
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-purple-400 bg-clip-text text-transparent">
              Certifications & Achievements
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            A showcase of my certifications and achievements across learning, competitions, and projects.
          </p>
          {/* Stats Bar */}
          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm">
              <Award className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-300">{certifications.length} Certifications</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
              <Trophy className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-300">{achievements.length} Achievements</span>
            </div>
          </div>
        </div>

        {/* Two-panel layout */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* ── Certifications Panel ── */}
          <div className="rounded-2xl border-2 border-cyan-500/30 bg-background/40 p-6 backdrop-blur-xl relative group/panel">
            {/* Panel shimmer border */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/panel:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.08), transparent)', backgroundSize: '200% 100%', animation: 'shimmer 3s infinite' }} />

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30">
                <Award className="h-5 w-5 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                Certifications
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {visibleCerts.map((cert, index) => (
                <TiltCard key={cert.credentialId} onClick={() => setSelectedCert(cert)} className="cursor-pointer">
                  <div
                    className="group rounded-xl overflow-hidden bg-background/60 border border-white/5 hover:border-cyan-500/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                    style={{ animationDelay: `${index * 0.08}s`, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.5s ease ${index * 0.08}s` }}
                  >
                    {/* Image with shimmer */}
                    <div className="relative overflow-hidden bg-muted/20">
                      <img src={cert.image} alt={cert.title} className="w-full h-32 object-cover object-top group-hover:scale-110 transition-transform duration-700" />
                      {/* Shimmer overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)', backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }} />
                      {/* Gradient overlay bottom */}
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background/80 to-transparent" />
                    </div>
                    <div className="p-3">
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-cyan-400 transition-colors leading-tight mb-1">{cert.title}</h4>
                      <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>

            {certifications.length > 4 && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAllCerts(!showAllCerts)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-400/30 hover:border-cyan-400/60 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                >
                  {showAllCerts ? 'Show Less' : 'Show More'}
                  {showAllCerts ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>
            )}
          </div>

          {/* ── Achievements Panel ── */}
          <div id="achievements" className="rounded-2xl border-2 border-purple-500/30 bg-background/40 p-6 backdrop-blur-xl relative group/panel">
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/panel:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.08), transparent)', backgroundSize: '200% 100%', animation: 'shimmer 3s infinite' }} />

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                <Trophy className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Achievements
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {visibleAch.map((ach, index) => {
                const currentIdx = achImageIndex[ach.credentialId] || 0;
                const currentImg = ach.images[currentIdx];
                const hasMultiple = ach.images.length > 1;

                return (
                  <TiltCard key={ach.credentialId} className="flex flex-col">
                    <div
                      className="group rounded-xl overflow-hidden bg-background/60 border border-white/5 hover:border-purple-500/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col h-full"
                      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.5s ease ${index * 0.08}s` }}
                    >
                      <div className="relative overflow-hidden bg-muted/20 cursor-pointer" onClick={() => setSelectedAchievement(ach)}>
                        <img src={currentImg} alt={`${ach.title} ${currentIdx + 1}`} className="w-full h-32 object-cover object-top transition-transform duration-700 group-hover:scale-110" />
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)', backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }} />
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background/80 to-transparent" />

                        {hasMultiple && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setAchImageIndex((prev) => ({ ...prev, [ach.credentialId]: (currentIdx - 1 + ach.images.length) % ach.images.length }));
                              }}
                              className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/60 text-white hover:bg-purple-500/60 transition-colors backdrop-blur-sm"
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setAchImageIndex((prev) => ({ ...prev, [ach.credentialId]: (currentIdx + 1) % ach.images.length }));
                              }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/60 text-white hover:bg-purple-500/60 transition-colors backdrop-blur-sm"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </button>
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                              {ach.images.map((_, i) => (
                                <span key={i} className={`w-2 h-2 rounded-full transition-colors ${i === currentIdx ? 'bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.6)]' : 'bg-white/40'}`} />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="p-3 cursor-pointer" onClick={() => setSelectedAchievement(ach)}>
                        <h4 className="text-sm font-semibold text-foreground group-hover:text-purple-400 transition-colors leading-tight mb-1">{ach.title}</h4>
                        <p className="text-xs text-muted-foreground">{ach.issuer}</p>
                      </div>
                    </div>
                  </TiltCard>
                );
              })}
            </div>

            {achievements.length > 2 && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAllAch(!showAllAch)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 hover:border-purple-400/60 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                >
                  {showAllAch ? 'Show Less' : 'Show More'}
                  {showAllAch ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Certification Detail Modal ── */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4" onClick={() => setSelectedCert(null)}>
          <div
            className="relative max-w-lg w-full bg-background/95 rounded-2xl border-2 border-cyan-500/40 shadow-[0_0_60px_rgba(6,182,212,0.15)] backdrop-blur-xl overflow-hidden"
            style={{ animation: 'fadeInScale 0.3s ease-out' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setSelectedCert(null)} className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-cyan-500/30 transition-colors backdrop-blur-sm">
              <X className="h-5 w-5" />
            </button>

            <div className="relative overflow-hidden bg-muted/20 cursor-pointer" onClick={() => setPreviewImage(selectedCert.image)}>
              <img src={selectedCert.image} alt={selectedCert.title} className="w-full h-56 object-cover object-top hover:scale-105 transition-transform duration-300" />
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background/90 to-transparent" />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-1">{selectedCert.title}</h3>
              <p className="text-sm text-muted-foreground mb-1">{selectedCert.issuer}</p>
              <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-3">ID: {selectedCert.credentialId}</span>
              <p className="text-sm text-foreground/80 leading-relaxed">{selectedCert.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Achievement Detail Modal ── */}
      {selectedAchievement && (() => {
        const modalIdx = achImageIndex[selectedAchievement.credentialId] || 0;
        const modalImg = selectedAchievement.images[modalIdx];
        const modalHasMultiple = selectedAchievement.images.length > 1;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4" onClick={() => setSelectedAchievement(null)}>
            <div
              className="relative max-w-lg w-full bg-background/95 rounded-2xl border-2 border-purple-500/40 shadow-[0_0_60px_rgba(168,85,247,0.15)] backdrop-blur-xl overflow-hidden"
              style={{ animation: 'fadeInScale 0.3s ease-out' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedAchievement(null)} className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-purple-500/30 transition-colors backdrop-blur-sm">
                <X className="h-5 w-5" />
              </button>

              <div className="relative overflow-hidden bg-muted/20 cursor-pointer" onClick={() => setPreviewImage(modalImg)}>
                <img src={modalImg} alt={`${selectedAchievement.title} ${modalIdx + 1}`} className="w-full h-56 object-cover object-top hover:scale-105 transition-transform duration-300" />
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background/90 to-transparent" />
                {modalHasMultiple && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); setAchImageIndex((prev) => ({ ...prev, [selectedAchievement.credentialId]: (modalIdx - 1 + selectedAchievement.images.length) % selectedAchievement.images.length })); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 text-white hover:bg-purple-500/60 transition-colors backdrop-blur-sm"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setAchImageIndex((prev) => ({ ...prev, [selectedAchievement.credentialId]: (modalIdx + 1) % selectedAchievement.images.length })); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 text-white hover:bg-purple-500/60 transition-colors backdrop-blur-sm"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {selectedAchievement.images.map((_, i) => (
                        <span key={i} className={`w-2 h-2 rounded-full transition-colors ${i === modalIdx ? 'bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.6)]' : 'bg-white/40'}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">{selectedAchievement.title}</h3>
                <p className="text-sm text-muted-foreground mb-1">{selectedAchievement.issuer}</p>
                <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-3">ID: {selectedAchievement.credentialId}</span>
                <p className="text-sm text-foreground/80 leading-relaxed">{selectedAchievement.description}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Image Preview Modal ── */}
      {previewImage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md p-4" onClick={() => setPreviewImage(null)}>
          <div className="relative max-w-4xl w-full" style={{ animation: 'fadeInScale 0.3s ease-out' }}>
            <button onClick={() => setPreviewImage(null)} className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors">
              <X className="h-8 w-8" />
            </button>
            <img src={previewImage} alt="Preview" className="w-full rounded-xl shadow-[0_0_80px_rgba(0,0,0,0.5)] border border-white/10" onClick={(e) => e.stopPropagation()} />
          </div>
        </div>
      )}

      {/* Shimmer + fade keyframes */}
      <style>{`
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes fadeInScale { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
      `}</style>
    </section>
  );
};

export default CertificationsSection;
