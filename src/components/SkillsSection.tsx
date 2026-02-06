import { Code, FileCode, Palette, Database, GitBranch, Terminal, Cpu, Brain } from 'lucide-react';

const skills = [
  { name: 'HTML', icon: FileCode, level: 95 },
  { name: 'CSS', icon: Palette, level: 90 },
  { name: 'JavaScript', icon: Code, level: 88 },
  { name: 'Python', icon: Terminal, level: 85 },
  { name: 'React', icon: Code, level: 85 },
  { name: 'Git & GitHub', icon: GitBranch, level: 82 },
  { name: 'UI/UX', icon: Palette, level: 80 },
  { name: 'Machine Learning', icon: Brain, level: 70 },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subheading">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="skill-bubble group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Icon container */}
                <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 group-hover:border-primary/50 transition-all">
                  <skill.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              
              <span className="text-foreground font-medium text-center">{skill.name}</span>
              
              {/* Skill level bar */}
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{skill.level}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
