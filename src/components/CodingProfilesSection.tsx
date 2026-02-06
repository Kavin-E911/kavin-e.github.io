import { ExternalLink } from 'lucide-react';

const profiles = [
  {
    name: 'LeetCode',
    emoji: '✨',
    color: 'from-yellow-400 to-orange-500',
    borderColor: 'border-yellow-300/50 hover:border-yellow-400/80',
    link: 'https://leetcode.com/u/itskavin_e/',
    image: '/coding picture/leetcode.png',
  },
  {
    name: 'GeeksforGeeks',
    emoji: '📗',
    color: 'from-emerald-400 to-green-600',
    borderColor: 'border-green-300/50 hover:border-green-400/80',
    link: 'https://www.geeksforgeeks.org/profile/ekavin',
    image: '/coding picture/geekforgeeks.png',
  },
  {
    name: 'HackerRank',
    emoji: '📘',
    color: 'from-green-400 to-emerald-600',
    borderColor: 'border-emerald-300/50 hover:border-emerald-400/80',
    link: 'https://www.hackerrank.com/profile/23CS083_kpriet',
    image: '/coding picture/hackerrank.png',
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
            My journey in competitive programming and problem solving
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {profiles.map((profile, index) => (
            <div
              key={profile.name}
              className={`group rounded-2xl overflow-hidden bg-card border ${profile.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in flex flex-col`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Screenshot image */}
              <div className="relative overflow-hidden bg-muted/30 p-4">
                <div className="rounded-xl overflow-hidden shadow-md">
                  <img
                    src={profile.image}
                    alt={`${profile.name} Profile`}
                    className="w-full h-52 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Card content */}
              <div className="p-6 flex flex-col flex-1 text-center">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-6 flex items-center justify-center gap-2">
                  <span>{profile.emoji}</span>
                  {profile.name}
                </h3>

                <div className="mt-auto">
                  <a
                    href={profile.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r ${profile.color} text-white font-medium text-sm hover:opacity-90 transition-opacity shadow-md hover:shadow-lg`}
                  >
                    View Profile
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodingProfilesSection;
