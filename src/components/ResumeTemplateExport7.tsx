import React from 'react';

interface ResumeTemplateExport7Props {
  preview?: boolean;
}

const ResumeTemplateExport7: React.FC<ResumeTemplateExport7Props> = ({ preview }) => {
  const name = 'Liam Brown';
  const title = 'UX Researcher';
  const email = 'liam.brown@email.com';
  const phone = '888-777-6666';
  const location = 'Boston, MA';
  const summary = "Empathetic UX researcher with a passion for understanding users and improving product experiences. Skilled in interviews, surveys, and usability testing.";
  const skills = ['User Research', 'Interviews', 'Usability Testing', 'Persona Creation', 'Wireframing'];
  const experience = [
    {
      company: 'UserFirst',
      role: 'Lead UX Researcher',
      period: '2021 - Present',
      details: 'Led research for a SaaS platform used by 100k+ users.'
    },
    {
      company: 'DesignLab',
      role: 'UX Analyst',
      period: '2018 - 2021',
      details: 'Conducted usability tests and synthesized findings.'
    }
  ];
  const education = [
    {
      school: 'Harvard University',
      degree: 'M.A. in Human Factors',
      period: '2014 - 2018'
    }
  ];

  return (
    <div
      style={{
        fontFamily: 'Poppins, Arial, sans-serif',
        width: preview ? 300 : 800,
        minHeight: preview ? 425 : 1100,
        border: preview ? '1px solid #eee' : 'none',
        borderRadius: 10,
        boxShadow: preview ? '0 2px 8px #eee' : '0 4px 24px #ddd',
        overflow: 'hidden',
        background: '#fff',
        fontSize: preview ? 10 : 18,
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <div style={{ background: 'linear-gradient(180deg, #7b2ff2, #f357a8)', width: preview ? 60 : 160, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: preview ? 8 : 32 }}>
        <div style={{ fontWeight: 700, fontSize: preview ? 14 : 28, marginBottom: preview ? 8 : 24 }}>{name}</div>
        <div style={{ fontWeight: 400, fontSize: preview ? 10 : 16, marginBottom: preview ? 6 : 16 }}>{title}</div>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>Contact</div>
        <div style={{ fontSize: preview ? 8 : 14 }}>{email}</div>
        <div style={{ fontSize: preview ? 8 : 14 }}>{phone}</div>
        <div style={{ fontSize: preview ? 8 : 14 }}>{location}</div>
        <div style={{ fontWeight: 600, margin: '12px 0 4px' }}>Skills</div>
        <ul style={{ paddingLeft: 16, margin: 0, fontSize: preview ? 8 : 14 }}>
          {skills.map(skill => <li key={skill}>{skill}</li>)}
        </ul>
      </div>
      <div style={{ flex: 1, padding: preview ? 8 : 32 }}>
        <div style={{ fontWeight: 600, color: '#7b2ff2', marginBottom: 4 }}>Profile</div>
        <div style={{ marginBottom: preview ? 8 : 16 }}>{summary}</div>
        <div style={{ fontWeight: 600, color: '#7b2ff2', marginBottom: 4 }}>Experience</div>
        {experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: preview ? 6 : 14 }}>
            <div style={{ fontWeight: 500 }}>{exp.role} @ {exp.company}</div>
            <div style={{ fontSize: preview ? 9 : 14, color: '#888' }}>{exp.period}</div>
            <div>{exp.details}</div>
          </div>
        ))}
        <div style={{ fontWeight: 600, color: '#7b2ff2', margin: '8px 0 4px' }}>Education</div>
        {education.map((edu, i) => (
          <div key={i}>
            <div style={{ fontWeight: 500 }}>{edu.degree}</div>
            <div style={{ fontSize: preview ? 9 : 14, color: '#888' }}>{edu.school} ({edu.period})</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeTemplateExport7; 