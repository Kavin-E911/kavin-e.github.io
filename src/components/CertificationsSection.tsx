import { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';

const certifications = [
  {
    title: 'Problem Solving (Intermediate)',
    issuer: 'HackerRank',
    date: 'Jan 2026',
    credentialId: 'ECE166E780F8',
    link: 'https://www.hackerrank.com/certificates/ece166e780f8',
    image: '/certificate/certificate1.png',
  },
  {
    title: 'Problem Solving (Basic)',
    issuer: 'HackerRank',
    date: 'Jul 2024',
    credentialId: '4FE395C07283',
    link: 'https://www.hackerrank.com/certificates/4fe395c07283',
    image: '/certificate/certificate2.png',
  },
  {
    title: 'The Complete Full-Stack Web Development Bootcamp',
    issuer: 'Udemy',
    date: 'Nov 2025',
    credentialId: 'UC-3b7o22a9-72e1-4ac2-8dae-69228b750419',
    link: 'https://ude.my/UC-3b7o22a9-72e1-4ac2-8dae-69228b750419',
    image: '/certificate/certificate3.png',
  },
  {
    title: 'Red Hat Certified System Administrator (RHCSA)',
    issuer: 'Red Hat',
    date: 'Dec 2025',
    credentialId: '250-190-931',
    link: 'https://www.credly.com/badges/6e4db220-6e2d-4662-9287-c2f2edf1a676',
    image: '/certificate/certificate4.png',
  },
  {
    title: 'Flame Youth Achiever',
    issuer: 'FLAME 2024-25 (Mahindra Technical Academy)',
    date: 'Nov 2025',
    credentialId: 'FLAME-2025',
    link: '#',
    image: '/certificate/certificate5.png',
  },
  {
    title: 'Practical Cyber Security for Cyber Security Practitioners (Elite)',
    issuer: 'NPTEL (IIT Kanpur)',
    date: 'Oct 2025',
    credentialId: 'NPTEL25CS120S670900809',
    link: '#',
    image: '/certificate/certificate6.png',
  },
  {
    title: 'Programming using Java',
    issuer: 'Infosys Springboard',
    date: 'Jun 2025',
    credentialId: 'INFY-JAVA-2025',
    link: 'https://verify.onwingspan.com',
    image: '/certificate/certificate7.png',
  },
  {
    title: 'Web Development Internship',
    issuer: 'Prodigy InfoTech',
    date: 'Feb 2025',
    credentialId: 'PIT/JAN25/00271',
    link: 'https://prodigyinfotech.dev',
    image: '/certificate/certificate8.png',
  },
];

const CertificationsSection = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={cert.credentialId}
              className="group rounded-2xl overflow-hidden bg-card border border-border/50 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 animate-fade-in flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Certificate image */}
              {cert.image && (
                <div
                  className="relative overflow-hidden cursor-pointer bg-muted/30"
                  onClick={() => setPreviewImage(cert.image)}
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              )}

              {/* Card content */}
              <div className="p-5 flex flex-col flex-1 text-center">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-1">
                  Issued by {cert.issuer}
                </p>
                <p className="text-sm text-muted-foreground mb-5">
                  {cert.date}
                </p>

                <div className="mt-auto">
                  <button
                    onClick={() => cert.image && setPreviewImage(cert.image)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
                  >
                    View Certificate
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl w-full animate-fade-in">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={previewImage}
              alt="Certificate Preview"
              className="w-full rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificationsSection;
