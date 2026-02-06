import { Trophy, Star, Flame, Target, Code, Award } from 'lucide-react';

const profiles = [
  {
    name: 'HackerRank',
    icon: Code,
    stats: [
      { label: 'Problems Solved', value: '150+' },
      { label: 'Badges Earned', value: '12' },
      { label: 'Stars', value: '5★' },
    ],
    color: 'from-green-500 to-emerald-600',
    link: 'https://hackerrank.com',
  },
  {
    name: 'LeetCode',
    icon: Target,
    stats: [
      { label: 'Problems Solved', value: '100+' },
      { label: 'Contest Rating', value: '1500+' },
      { label: 'Streak', value: '30 days' },
    ],
    color: 'from-yellow-500 to-orange-600',
    link: 'https://leetcode.com',
  },
];

const CodingProfilesSection = () => {
  return (
    <section id="coding-profiles" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            <span className="gradient-text">Coding Profiles</span>
          </h2>
          <p className="section-subheading">
            My journey in competitive programming and problem-solving
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {profiles.map((profile, index) => (
            <a
              key={profile.name}
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${profile.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                  <profile.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-display text-foreground group-hover:text-primary transition-colors">
                    {profile.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">View Profile →</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                {profile.stats.map((stat) => (
                  <div key={stat.label} className="text-center p-3 rounded-xl bg-muted/50">
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Trophy className="h-24 w-24 text-primary" />
              </div>
            </a>
          ))}
        </div>

        {/* Achievement badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {[
            { icon: Star, label: '5★ Problem Solver' },
            { icon: Flame, label: '30 Day Streak' },
            { icon: Award, label: 'Top 10%' },
          ].map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 px-4 py-2 glass rounded-full"
            >
              <badge.icon className="h-5 w-5 text-primary" />
              <span className="text-sm text-foreground">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodingProfilesSection;
