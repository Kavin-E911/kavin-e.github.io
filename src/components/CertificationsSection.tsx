import { Award, ExternalLink, Calendar, Building } from 'lucide-react';

const certifications = [
  {
    title: 'Full Stack Development',
    issuer: 'Coursera',
    date: '2024',
    credentialId: 'FSW-2024-001',
    link: '#',
  },
  {
    title: 'Machine Learning Fundamentals',
    issuer: 'Google',
    date: '2024',
    credentialId: 'ML-2024-002',
    link: '#',
  },
  {
    title: 'UI/UX Design Certification',
    issuer: 'Adobe',
    date: '2023',
    credentialId: 'UXD-2023-003',
    link: '#',
  },
  {
    title: 'Python Programming',
    issuer: 'HackerRank',
    date: '2023',
    credentialId: 'PY-2023-004',
    link: '#',
  },
  {
    title: 'Web Development Internship',
    issuer: 'Tech Company',
    date: '2024',
    credentialId: 'INT-2024-005',
    link: '#',
  },
  {
    title: 'React Developer Certificate',
    issuer: 'Meta',
    date: '2024',
    credentialId: 'RD-2024-006',
    link: '#',
  },
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="section-subheading">
            Professional certifications and achievements that validate my expertise
          </p>
        </div>

        {/* Certification Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={cert.credentialId}
              className="glass-card group relative overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />

              {/* Certificate icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Award className="h-20 w-20 text-primary" />
              </div>

              <div className="relative space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <Building className="h-4 w-4" />
                      <span>{cert.issuer}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{cert.date}</span>
                  </div>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    View
                    <ExternalLink className="h-3 w-3" />
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

export default CertificationsSection;
