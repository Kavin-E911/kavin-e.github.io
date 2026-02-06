import { GraduationCap, MapPin, Calendar } from 'lucide-react';

const educationData = [
  {
    institution: 'KPR Institute of Engineering and Technology',
    location: 'Coimbatore, Tamil Nadu, India',
    locationLink: 'https://maps.app.goo.gl/iyBuH7uR4VRcRgmx5',
    degree: 'Bachelor of Engineering in Computer Science and Engineering',
    period: '2023 - 2027',
    score: '9.0/10 CGPA',
    image: '/education/kpr.png',
  },
  {
    institution: 'Universal Matric. Hr. Sec. School',
    location: 'Tiruppur, Tamil Nadu, India',
    locationLink: 'https://maps.app.goo.gl/G7CJMTcUeRGc8GdaA',
    degree: 'Higher Secondary Schooling',
    period: '2023',
    score: '95% Marks',
    image: '/education/universal.png',
  },
];

const EducationSection = () => {
  return (
    <section id="education" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            <span className="gradient-text">Education</span>
          </h2>
          <p className="section-subheading">
            My academic journey and qualifications
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {educationData.map((edu, index) => (
            <div
              key={edu.institution}
              className="glass-card group animate-fade-in overflow-hidden"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Institution Image */}
                <div className="w-full md:w-48 h-36 rounded-xl overflow-hidden border border-border/50 flex-shrink-0">
                  <img
                    src={edu.image}
                    alt={edu.institution}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-3 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {edu.institution}
                    </h3>
                  </div>

                  <p className="text-base text-foreground/80 font-medium">
                    {edu.degree}
                  </p>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                    <a
                      href={edu.locationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 hover:text-primary transition-colors"
                    >
                      <MapPin className="h-4 w-4" />
                      {edu.location}
                    </a>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {edu.period}
                    </div>
                  </div>

                  <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/20">
                    <span className="text-sm font-semibold text-primary">{edu.score}</span>
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
