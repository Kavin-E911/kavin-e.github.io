import { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const WEB3FORMS_ACCESS_KEY = 'ae81cedb-a9de-4305-aa6f-42c6227a7bf2';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

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
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5, opacity: Math.random() * 0.25 + 0.05,
      });
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(236, 72, 153, ${p.opacity})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(236, 72, 153, ${0.04 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Portfolio Message from ${formData.name}`,
          from_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: "Message Sent!", description: "Thank you for reaching out. I'll get back to you soon!" });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else { throw new Error('Failed'); }
    } catch {
      toast({ title: "Failed to send", description: "Something went wrong. Please try again or email me directly.", variant: "destructive" });
    } finally { setIsSubmitting(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'ekavin65@gmail.com', href: 'mailto:ekavin65@gmail.com', color: 'from-pink-500 to-rose-600' },
    { icon: Phone, label: 'Phone', value: '+91 9750010881', href: 'tel:+919750010881', color: 'from-cyan-500 to-blue-600' },
    { icon: MapPin, label: 'Location', value: 'Tiruppur, Tamil Nadu, India', color: 'from-emerald-500 to-green-600' },
  ];

  const socials = [
    { icon: Github, href: 'https://github.com/Kavin-E911', label: 'GitHub', color: 'from-gray-500 to-gray-700' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/kavin-e-7258252a1/', label: 'LinkedIn', color: 'from-blue-500 to-blue-700' },
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-28 relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Decorative orbs */}
      <div className="absolute top-20 -right-32 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 -left-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-400/20 bg-pink-500/5 text-pink-400 text-xs font-semibold tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
            Let's Connect
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-cyan-400 bg-clip-text text-transparent">Get In Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className={`space-y-6 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Info cards */}
            <div className="rounded-2xl border-2 border-border/20 bg-card/50 backdrop-blur-sm p-6 space-y-4">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-white" />
                </span>
                Contact Information
              </h3>

              {contactInfo.map((info) => {
                const Icon = info.icon;
                const Wrapper = info.href ? 'a' : 'div';
                const wrapperProps = info.href ? { href: info.href, target: info.href.startsWith('mailto') ? undefined : '_blank', rel: 'noopener noreferrer' } : {};
                return (
                  <Wrapper
                    key={info.label}
                    {...wrapperProps}
                    className="group flex items-center gap-4 p-4 rounded-xl border border-border/20 bg-background/30 hover:bg-background/60 hover:border-white/15 transition-all duration-300 cursor-pointer"
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${info.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{info.label}</p>
                      <p className="text-foreground font-medium group-hover:text-primary transition-colors">{info.value}</p>
                    </div>
                    {info.href && <ArrowUpRight className="h-4 w-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </Wrapper>
                );
              })}
            </div>

            {/* Social links */}
            <div className="rounded-2xl border-2 border-border/20 bg-card/50 backdrop-blur-sm p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Linkedin className="h-4 w-4 text-white" />
                </span>
                Follow Me
              </h3>
              <div className="flex gap-4">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center gap-3 px-5 py-3 rounded-xl border-2 border-border/20 bg-background/30 hover:bg-background/60 hover:border-white/15 transition-all duration-300 hover:scale-105"
                    >
                      <div className={`absolute -inset-1 rounded-xl bg-gradient-to-r ${s.color} opacity-0 group-hover:opacity-10 blur-lg transition-opacity duration-500`} />
                      <Icon className="h-5 w-5 text-foreground group-hover:text-primary transition-colors relative z-10" />
                      <span className="text-sm font-semibold text-foreground relative z-10">{s.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <form onSubmit={handleSubmit} className="rounded-2xl border-2 border-border/20 bg-card/50 backdrop-blur-sm p-6 space-y-5">
              <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Send className="h-4 w-4 text-white" />
                </span>
                Send a Message
              </h3>

              {[
                { id: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                { id: 'email', label: 'Your Email', type: 'email', placeholder: 'john@example.com' },
                { id: 'phone', label: 'Your Phone Number', type: 'tel', placeholder: '+91 9876543210' },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wider">
                    {field.label}
                  </label>
                  <Input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    className="bg-background/40 border-border/30 focus:border-pink-400/60 focus:ring-pink-400/20 rounded-xl transition-all duration-300"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wider">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                  className="bg-background/40 border-border/30 focus:border-pink-400/60 focus:ring-pink-400/20 resize-none rounded-xl transition-all duration-300"
                />
              </div>

              <Button type="submit" size="lg" className="w-full group relative overflow-hidden bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-xl font-bold shadow-lg shadow-pink-500/20 hover:shadow-xl hover:shadow-pink-500/30 transition-all duration-300" disabled={isSubmitting}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
                <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
