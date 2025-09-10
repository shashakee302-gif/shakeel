import React from 'react';

interface ResumeTemplateExport5Props {
  preview?: boolean;
}

const ResumeTemplateExport5: React.FC<ResumeTemplateExport5Props> = ({ preview }) => {
  const name = 'Samuel Green';
  const title = 'Business Analyst';
  const email = 'samuel.green@email.com';
  const phone = '777-888-9999';
  const location = 'Chicago, IL';
  const summary = "Analytical and detail-oriented business analyst with a focus on data-driven decision making and process optimization.";
  const skills = ['Excel', 'SQL', 'Power BI', 'Process Mapping', 'Data Analysis'];
  const experience = [
    {
      company: 'Insight Corp',
      role: 'Business Analyst',
      period: '2020 - Present',
      details: 'Implemented new reporting systems that reduced costs by 15%.'
    },
    {
      company: 'DataWorks',
      role: 'Junior Analyst',
      period: '2017 - 2020',
      details: 'Supported senior analysts in large-scale data projects.'
    }
  ];
  const education = [
    {
      school: 'Northwestern University',
      degree: 'B.S. in Business Administration',
      period: '2013 - 2017'
    }
  ];

  return (
    <div
      style={{
        fontFamily: 'Roboto, Arial, sans-serif',
        width: preview ? 300 : 800,
        minHeight: preview ? 425 : 1100,
        border: preview ? '1px solid #eee' : 'none',
        borderRadius: 10,
        boxShadow: preview ? '0 2px 8px #eee' : '0 4px 24px #ddd',
        background: '#fff',
        fontSize: preview ? 10 : 18
      }}
    >
      <div style={{ background: '#f5f5f5', padding: preview ? '10px 0' : '28px 0', textAlign: 'center', borderBottom: '2px solid #eee' }}>
        <div style={{ fontWeight: 700, fontSize: preview ? 18 : 36 }}>{name}</div>
        <div style={{ fontWeight: 400, fontSize: preview ? 12 : 20, color: '#888' }}>{title}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', padding: preview ? 8 : 32 }}>
        <div style={{ width: preview ? 90 : 200, marginRight: preview ? 8 : 32 }}>
          <div style={{ fontWeight: 600, marginBottom: 4, color: '#333' }}>Contact</div>
          <div>{email}</div>
          <div>{phone}</div>
          <div>{location}</div>
          <div style={{ fontWeight: 600, margin: '12px 0 4px', color: '#333' }}>Skills</div>
          <ul style={{ paddingLeft: 16, margin: 0 }}>
            {skills.map(skill => <li key={skill}>{skill}</li>)}
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, color: '#333', marginBottom: 4 }}>Profile</div>
          <div style={{ marginBottom: preview ? 8 : 16 }}>{summary}</div>
          <div style={{ fontWeight: 600, color: '#333', marginBottom: 4 }}>Experience</div>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: preview ? 6 : 14 }}>
              <div style={{ fontWeight: 500 }}>{exp.role} @ {exp.company}</div>
              <div style={{ fontSize: preview ? 9 : 14, color: '#888' }}>{exp.period}</div>
              <div>{exp.details}</div>
            </div>
          ))}
          <div style={{ fontWeight: 600, color: '#333', margin: '8px 0 4px' }}>Education</div>
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

export default ResumeTemplateExport5; 