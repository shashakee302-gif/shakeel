import React from 'react';

interface ResumeTemplateExport6Props {
  preview?: boolean;
}

const ResumeTemplateExport6: React.FC<ResumeTemplateExport6Props> = ({ preview }) => {
  const name = 'Priya Patel';
  const title = 'Data Scientist';
  const email = 'priya.patel@email.com';
  const phone = '333-222-1111';
  const location = 'Seattle, WA';
  const summary = "Data scientist with expertise in machine learning, data visualization, and statistical modeling. Loves turning data into actionable insights.";
  const skills = ['Python', 'R', 'TensorFlow', 'Pandas', 'Data Viz'];
  const experience = [
    {
      company: 'DataGen',
      role: 'Lead Data Scientist',
      period: '2022 - Present',
      details: 'Built predictive models for healthcare analytics.'
    },
    {
      company: 'Insightful',
      role: 'Data Analyst',
      period: '2019 - 2022',
      details: 'Created dashboards and automated reporting.'
    }
  ];
  const education = [
    {
      school: 'University of Washington',
      degree: 'M.S. in Data Science',
      period: '2017 - 2019'
    }
  ];

  return (
    <div
      style={{
        fontFamily: 'Montserrat, Arial, sans-serif',
        width: preview ? 300 : 800,
        minHeight: preview ? 425 : 1100,
        border: preview ? '1px solid #222' : 'none',
        borderRadius: 10,
        boxShadow: preview ? '0 2px 8px #222' : '0 4px 24px #222',
        overflow: 'hidden',
        background: '#181c20',
        color: '#fff',
        fontSize: preview ? 10 : 18
      }}
    >
      <div style={{ background: '#23272b', padding: preview ? '12px' : '32px', textAlign: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: preview ? 18 : 36 }}>{name}</div>
        <div style={{ fontWeight: 400, fontSize: preview ? 12 : 20, color: '#b0b0b0' }}>{title}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', padding: preview ? 8 : 32 }}>
        <div style={{ width: preview ? 90 : 200, marginRight: preview ? 8 : 32 }}>
          <div style={{ fontWeight: 600, marginBottom: 4, color: '#ffb347' }}>Contact</div>
          <div>{email}</div>
          <div>{phone}</div>
          <div>{location}</div>
          <div style={{ fontWeight: 600, margin: '12px 0 4px', color: '#ffb347' }}>Skills</div>
          <ul style={{ paddingLeft: 16, margin: 0 }}>
            {skills.map(skill => <li key={skill}>{skill}</li>)}
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, color: '#ffb347', marginBottom: 4 }}>Profile</div>
          <div style={{ marginBottom: preview ? 8 : 16 }}>{summary}</div>
          <div style={{ fontWeight: 600, color: '#ffb347', marginBottom: 4 }}>Experience</div>
          <div style={{ borderLeft: '3px solid #ffb347', marginLeft: 8, paddingLeft: 12 }}>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: preview ? 6 : 14 }}>
                <div style={{ fontWeight: 500 }}>{exp.role} @ {exp.company}</div>
                <div style={{ fontSize: preview ? 9 : 14, color: '#b0b0b0' }}>{exp.period}</div>
                <div>{exp.details}</div>
              </div>
            ))}
          </div>
          <div style={{ fontWeight: 600, color: '#ffb347', margin: '8px 0 4px' }}>Education</div>
          {education.map((edu, i) => (
            <div key={i}>
              <div style={{ fontWeight: 500 }}>{edu.degree}</div>
              <div style={{ fontSize: preview ? 9 : 14, color: '#b0b0b0' }}>{edu.school} ({edu.period})</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplateExport6; 