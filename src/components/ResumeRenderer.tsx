import React from 'react';

interface ResumeRendererProps {
  data: any;
}

const ResumeRenderer: React.FC<ResumeRendererProps> = ({ data }) => {
  if (!data) return <div>No data loaded.</div>;

  const name = data.personalInfo?.name || 'Your Name';
  const title = data.personalInfo?.title || 'Professional Title';
  const email = data.personalInfo?.email || '';
  const phone = data.personalInfo?.phone || '';
  const location = data.personalInfo?.location || '';
  const linkedin = data.personalInfo?.linkedin || '';
  const github = data.personalInfo?.github || '';
  const summary = data.personalInfo?.summary || '';

  return (
    <div
      style={{
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        maxWidth: 800,
        minHeight: 1100,
        background: '#ffffff',
        borderRadius: 12,
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
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
          padding: 32,
          textAlign: 'center'
        }}
      >
        <h1
          style={{
            fontSize: 36,
            fontWeight: 700,
            margin: 0,
            marginBottom: 8,
            letterSpacing: '-0.02em'
          }}
        >
          {name}
        </h1>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 500,
            margin: 0,
            marginBottom: 16,
            opacity: 0.9
          }}
        >
          {title}
        </h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            flexWrap: 'wrap',
            fontSize: 14
          }}
        >
          {email && <span>📧 {email}</span>}
          {phone && <span>📱 {phone}</span>}
          {location && <span>📍 {location}</span>}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            marginTop: 8,
            fontSize: 14
          }}
        >
          {linkedin && <span>🔗 {linkedin}</span>}
          {github && <span>💻 {github}</span>}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: 32 }}>
        {/* Summary */}
        {summary && (
          <section style={{ marginBottom: 32 }}>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: '#1f2937',
                margin: 0,
                marginBottom: 12,
                borderBottom: '2px solid #667eea',
                paddingBottom: 8
              }}
            >
              Professional Summary
            </h3>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: '#4b5563',
                margin: 0
              }}
            >
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section style={{ marginBottom: 32 }}>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: '#1f2937',
                margin: 0,
                marginBottom: 16,
                borderBottom: '2px solid #667eea',
                paddingBottom: 8
              }}
            >
              Work Experience
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {data.experience.map((exp: any, index: number) => (
                <div key={index} style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: -8,
                      top: 8,
                      width: 4,
                      height: 4,
                      background: '#667eea',
                      borderRadius: '50%'
                    }}
                  />
                  <div style={{ marginLeft: 16 }}>
                    <h4
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: '#1f2937',
                        margin: 0,
                        marginBottom: 4
                      }}
                    >
                      {exp.title}
                    </h4>
                    <div
                      style={{
                        fontSize: 14,
                        color: '#667eea',
                        fontWeight: 500,
                        marginBottom: 4
                      }}
                    >
                      {exp.company} {exp.duration && `• ${exp.duration}`}
                    </div>
                    <p
                      style={{
                        fontSize: 14,
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
        )}

        {/* Two Column Layout */}
        <div style={{ display: 'flex', gap: 32 }}>
          {/* Left Column */}
          <div style={{ flex: 2 }}>
            {/* Education */}
            {data.education && data.education.length > 0 && (
              <section style={{ marginBottom: 32 }}>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: '#1f2937',
                    margin: 0,
                    marginBottom: 16,
                    borderBottom: '2px solid #667eea',
                    paddingBottom: 8
                  }}
                >
                  Education
                </h3>
                {data.education.map((edu: any, index: number) => (
                  <div key={index}>
                    <h4
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: '#1f2937',
                        margin: 0,
                        marginBottom: 4
                      }}
                    >
                      {edu.degree}
                    </h4>
                    <div
                      style={{
                        fontSize: 14,
                        color: '#667eea',
                        fontWeight: 500,
                        marginBottom: 4
                      }}
                    >
                      {edu.institution}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: '#6b7280'
                      }}
                    >
                      {edu.year} {edu.gpa && `• GPA: ${edu.gpa}`}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
              <section>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: '#1f2937',
                    margin: 0,
                    marginBottom: 16,
                    borderBottom: '2px solid #667eea',
                    paddingBottom: 8
                  }}
                >
                  Projects
                </h3>
                {data.projects.map((project: any, index: number) => (
                  <div key={index} style={{ marginBottom: 16 }}>
                    <h4
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: '#1f2937',
                        margin: 0,
                        marginBottom: 4
                      }}
                    >
                      {project.name}
                    </h4>
                    <p
                      style={{
                        fontSize: 14,
                        lineHeight: 1.5,
                        color: '#4b5563',
                        margin: 0,
                        marginBottom: 4
                      }}
                    >
                      {project.description}
                    </p>
                    {project.technologies && (
                      <div
                        style={{
                          fontSize: 12,
                          color: '#667eea',
                          fontWeight: 500
                        }}
                      >
                        {project.technologies}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}
          </div>

          {/* Right Column */}
          <div style={{ flex: 1 }}>
            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
              <section>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: '#1f2937',
                    margin: 0,
                    marginBottom: 16,
                    borderBottom: '2px solid #667eea',
                    paddingBottom: 8
                  }}
                >
                  Skills
                </h3>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 8
                  }}
                >
                  {data.skills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 500,
                        boxShadow: '0 2px 4px rgba(102, 126, 234, 0.2)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeRenderer; 