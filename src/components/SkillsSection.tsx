const skillCategories = [
  {
    title: 'Programming Languages',
    emoji: '💻',
    bgColor: 'bg-card',
    borderColor: 'border-border',
    skills: [
      { name: 'Java', icon: '☕' },
      { name: 'Python', icon: '🐍' },
      { name: 'C', icon: '⚙️' },
    ],
  },
  {
    title: 'Web Technologies',
    emoji: '🌐',
    bgColor: 'bg-card',
    borderColor: 'border-border',
    skills: [
      { name: 'HTML5', icon: '🟧' },
      { name: 'CSS3', icon: '🔵' },
      { name: 'JavaScript', icon: '🟨' },
      { name: 'React.js', icon: '⚛️' },
      { name: 'Flask', icon: '🌶️' },
    ],
  },
  {
    title: 'Databases & Tools',
    emoji: '🛠️',
    bgColor: 'bg-card',
    borderColor: 'border-border',
    skills: [
      { name: 'SQL', icon: '🗄️' },
      { name: 'PL/SQL', icon: '📋' },
      { name: 'MongoDB', icon: '🍃' },
      { name: 'Power BI', icon: '📊' },
    ],
  },
  {
    title: 'DSA',
    emoji: '🧠',
    bgColor: 'bg-card',
    borderColor: 'border-border',
    skills: [
      { name: 'Java DSA', icon: '☕' },
      { name: 'C DSA', icon: '⚙️' },
    ],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="section-subheading">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={`rounded-2xl border ${category.borderColor} ${category.bgColor} p-6 animate-fade-in`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Category header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.emoji}</span>
                  <h3 className="text-lg font-bold text-foreground">{category.title}</h3>
                </div>
                <span className="text-sm text-muted-foreground px-3 py-1 rounded-full bg-background/60 border border-border/50">
                  {category.skills.length} skills
                </span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-background/80 border border-border/50 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 cursor-default"
                  >
                    <span className="text-lg">{skill.icon}</span>
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
