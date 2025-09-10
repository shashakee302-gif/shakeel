import React from 'react';

interface ResumeTemplateExport4Props {
  preview?: boolean;
}

const ResumeTemplateExport4: React.FC<ResumeTemplateExport4Props> = ({ preview }) => {
  const name = 'Maria Lopez';
  const title = 'Marketing Specialist';
  const email = 'maria.lopez@email.com';
  const phone = '222-333-4444';
  const location = 'Miami, FL';
  const summary = "Dynamic marketing specialist with a knack for social media and brand strategy. Proven track record in campaign management.";
  const skills = ['SEO', 'Content Marketing', 'Social Media', 'Google Ads', 'Branding'];
  const experience = [
    {
      company: 'Brandify',
      role: 'Marketing Lead',
      period: '2021 - Present',
      details: 'Led a team of 5 in executing digital campaigns for Fortune 500 clients.'
    },
    {
      company: 'AdWorks',
      role: 'Content Strategist',
      period: '2018 - 2021',
      details: 'Developed content plans that increased engagement by 40%.'
    }
  ];
  const education = [
    {
      school: 'University of Florida',
      degree: 'B.A. in Marketing',
      period: '2014 - 2018'
    }
  ];

  return (
    <div
      style={{
        fontFamily: 'Segoe UI, Arial, sans-serif',
        width: preview ? 300 : 800,
        minHeight: preview ? 425 : 1100,
        border: preview ? '1px solid #eee' : 'none',
        borderRadius: 10,
        boxShadow: preview ? '0 2px 8px #eee' : '0 4px 24px #ddd',
        overflow: 'hidden',
        background: '#fff',
        fontSize: preview ? 10 : 18
      }}
    >
      <div style={{ background: 'linear-gradient(90deg, #ff6a00, #ffb347)', color: '#fff', padding: preview ? '12px' : '32px', textAlign: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: preview ? 18 : 36 }}>{name}</div>
        <div style={{ fontWeight: 400, fontSize: preview ? 12 : 20 }}>{title}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', padding: preview ? 8 : 32 }}>
        <div style={{ width: preview ? 80 : 180, marginRight: preview ? 8 : 32 }}>
          <div style={{ fontWeight: 600, marginBottom: 4, color: '#ff6a00' }}>Contact</div>
          <div>{email}</div>
          <div>{phone}</div>
          <div>{location}</div>
          <div style={{ fontWeight: 600, margin: '12px 0 4px', color: '#ff6a00' }}>Skills</div>
          <ul style={{ paddingLeft: 16, margin: 0 }}>
            {skills.map(skill => <li key={skill}>{skill}</li>)}
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, color: '#ff6a00', marginBottom: 4 }}>Profile</div>
          <div style={{ marginBottom: preview ? 8 : 16 }}>{summary}</div>
          <div style={{ fontWeight: 600, color: '#ff6a00', marginBottom: 4 }}>Experience</div>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: preview ? 6 : 14 }}>
              <div style={{ fontWeight: 500 }}>{exp.role} @ {exp.company}</div>
              <div style={{ fontSize: preview ? 9 : 14, color: '#888' }}>{exp.period}</div>
              <div>{exp.details}</div>
            </div>
          ))}
          <div style={{ fontWeight: 600, color: '#ff6a00', margin: '8px 0 4px' }}>Education</div>
          {education.map((edu, i) => (
            <div key={i}>
              <div style={{ fontWeight: 500 }}>{edu.degree}</div>
              <div style={{ fontSize: preview ? 9 : 14, color: '#888' }}>{edu.school} ({edu.period})</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplateExport4; 