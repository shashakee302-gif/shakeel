import React from 'react';

interface ResumeTemplateExport1Props {
  preview?: boolean;
}

const ResumeTemplateExport1: React.FC<ResumeTemplateExport1Props> = ({ preview }) => {
  // Sample data for the template
  const name = 'Alex Johnson';
  const title = 'Senior Software Engineer';
  const email = 'alex.johnson@email.com';
  const phone = '+1 (555) 123-4567';
  const location = 'San Francisco, CA';
  const linkedin = 'linkedin.com/in/alexjohnson';
  const github = 'github.com/alexjohnson';
  const summary = 'Passionate software engineer with 5+ years of experience building scalable web applications. Expert in React, Node.js, and cloud technologies. Led teams of 8+ developers and delivered 15+ production applications.';
  
  const experience = [
    {
      title: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      duration: '2021 - Present',
      description: 'Lead development of microservices architecture serving 2M+ users. Implemented CI/CD pipelines reducing deployment time by 70%. Mentored 5 junior developers.'
    },
    {
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      duration: '2019 - 2021',
      description: 'Built React-based dashboard with real-time analytics. Integrated 10+ third-party APIs. Improved application performance by 40%.'
    }
  ];
  
  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Stanford University',
      year: '2015 - 2019',
      gpa: '3.8/4.0'
    }
  ];
  
  const skills = [
    'React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'GraphQL', 'Kubernetes'
  ];
  
  const projects = [
    {
      name: 'E-commerce Platform',
      description: 'Built a full-stack e-commerce solution with React, Node.js, and Stripe integration. Handles 10K+ daily transactions.',
      technologies: 'React, Node.js, MongoDB, Stripe',
      link: 'github.com/alexjohnson/ecommerce'
    }
  ];

  const scale = preview ? 0.4 : 1;
  const fontSize = (size: number) => size * scale;
  const spacing = (space: number) => space * scale;

  return (
    <div
      style={{
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        maxWidth: preview ? 300 : 800,
        minHeight: preview ? 425 : 1100,
        background: '#ffffff',
        borderRadius: spacing(12),
        boxShadow: preview ? '0 2px 8px rgba(0,0,0,0.1)' : '0 8px 32px rgba(0,0,0,0.12)',
        overflow: 'hidden',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      {/* Header with Gradient */}
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: spacing(32),
          textAlign: 'center'
        }}
      >
        <h1
          style={{
            fontSize: fontSize(36),
            fontWeight: 700,
            margin: 0,
            marginBottom: spacing(8),
            letterSpacing: '-0.02em'
          }}
        >
          {name}
        </h1>
        <h2
          style={{
            fontSize: fontSize(20),
            fontWeight: 500,
            margin: 0,
            marginBottom: spacing(16),
            opacity: 0.9
          }}
        >
          {title}
        </h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: spacing(16),
            flexWrap: 'wrap',
            fontSize: fontSize(14)
          }}
        >
          <span>📧 {email}</span>
          <span>📱 {phone}</span>
          <span>📍 {location}</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: spacing(16),
            marginTop: spacing(8),
            fontSize: fontSize(14)
          }}
        >
          <span>🔗 {linkedin}</span>
          <span>💻 {github}</span>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: spacing(32) }}>
        {/* Summary */}
        <section style={{ marginBottom: spacing(32) }}>
          <h3
            style={{
              fontSize: fontSize(20),
              fontWeight: 600,
              color: '#1f2937',
              margin: 0,
              marginBottom: spacing(12),
              borderBottom: '2px solid #667eea',
              paddingBottom: spacing(8)
            }}
          >
            Professional Summary
          </h3>
          <p
            style={{
              fontSize: fontSize(14),
              lineHeight: 1.6,
              color: '#4b5563',
              margin: 0
            }}
          >
            {summary}
          </p>
        </section>

        {/* Experience */}
        <section style={{ marginBottom: spacing(32) }}>
          <h3
            style={{
              fontSize: fontSize(20),
              fontWeight: 600,
              color: '#1f2937',
              margin: 0,
              marginBottom: spacing(16),
              borderBottom: '2px solid #667eea',
              paddingBottom: spacing(8)
            }}
          >
            Work Experience
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing(20) }}>
            {experience.map((exp, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: spacing(-8),
                    top: spacing(8),
                    width: spacing(4),
                    height: spacing(4),
                    background: '#667eea',
                    borderRadius: '50%'
                  }}
                />
                <div style={{ marginLeft: spacing(16) }}>
                  <h4
                    style={{
                      fontSize: fontSize(16),
                      fontWeight: 600,
                      color: '#1f2937',
                      margin: 0,
                      marginBottom: spacing(4)
                    }}
                  >
                    {exp.title}
                  </h4>
                  <div
                    style={{
                      fontSize: fontSize(14),
                      color: '#667eea',
                      fontWeight: 500,
                      marginBottom: spacing(4)
                    }}
                  >
                    {exp.company} • {exp.duration}
                  </div>
                  <p
                    style={{
                      fontSize: fontSize(14),
                      lineHeight: 1.5,
                      color: '#4b5563',
                      margin: 0
                    }}
                  >
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Two Column Layout */}
        <div style={{ display: 'flex', gap: spacing(32) }}>
          {/* Left Column */}
          <div style={{ flex: 2 }}>
            {/* Education */}
            <section style={{ marginBottom: spacing(32) }}>
              <h3
                style={{
                  fontSize: fontSize(20),
                  fontWeight: 600,
                  color: '#1f2937',
                  margin: 0,
                  marginBottom: spacing(16),
                  borderBottom: '2px solid #667eea',
                  paddingBottom: spacing(8)
                }}
              >
                Education
              </h3>
              {education.map((edu, index) => (
                <div key={index}>
                  <h4
                    style={{
                      fontSize: fontSize(16),
                      fontWeight: 600,
                      color: '#1f2937',
                      margin: 0,
                      marginBottom: spacing(4)
                    }}
                  >
                    {edu.degree}
                  </h4>
                  <div
                    style={{
                      fontSize: fontSize(14),
                      color: '#667eea',
                      fontWeight: 500,
                      marginBottom: spacing(4)
                    }}
                  >
                    {edu.institution}
                  </div>
                  <div
                    style={{
                      fontSize: fontSize(14),
                      color: '#6b7280'
                    }}
                  >
                    {edu.year} • GPA: {edu.gpa}
                  </div>
                </div>
              ))}
            </section>

            {/* Projects */}
            <section>
              <h3
                style={{
                  fontSize: fontSize(20),
                  fontWeight: 600,
                  color: '#1f2937',
                  margin: 0,
                  marginBottom: spacing(16),
                  borderBottom: '2px solid #667eea',
                  paddingBottom: spacing(8)
                }}
              >
                Projects
              </h3>
              {projects.map((project, index) => (
                <div key={index} style={{ marginBottom: spacing(16) }}>
                  <h4
                    style={{
                      fontSize: fontSize(16),
                      fontWeight: 600,
                      color: '#1f2937',
                      margin: 0,
                      marginBottom: spacing(4)
                    }}
                  >
                    {project.name}
                  </h4>
                  <p
                    style={{
                      fontSize: fontSize(14),
                      lineHeight: 1.5,
                      color: '#4b5563',
                      margin: 0,
                      marginBottom: spacing(4)
                    }}
                  >
                    {project.description}
                  </p>
                  <div
                    style={{
                      fontSize: fontSize(12),
                      color: '#667eea',
                      fontWeight: 500
                    }}
                  >
                    {project.technologies}
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* Right Column */}
          <div style={{ flex: 1 }}>
            {/* Skills */}
            <section>
              <h3
                style={{
                  fontSize: fontSize(20),
                  fontWeight: 600,
                  color: '#1f2937',
                  margin: 0,
                  marginBottom: spacing(16),
                  borderBottom: '2px solid #667eea',
                  paddingBottom: spacing(8)
                }}
              >
                Skills
              </h3>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: spacing(8)
                }}
              >
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      padding: `${spacing(6)} ${spacing(12)}`,
                      borderRadius: spacing(20),
                      fontSize: fontSize(12),
                      fontWeight: 500,
                      boxShadow: '0 2px 4px rgba(102, 126, 234, 0.2)'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplateExport1; 