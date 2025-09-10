import React from 'react';

interface ResumeTemplateExport3Props {
  preview?: boolean;
}

const ResumeTemplateExport3: React.FC<ResumeTemplateExport3Props> = ({ preview }) => {
  const name = 'Alex Kim';
  const title = 'Full Stack Developer';
  const email = 'alex.kim@email.com';
  const phone = '444-555-6666';
  const location = 'Austin, TX';
  const summary = "Versatile developer with a passion for scalable web apps and clean code. Experienced in React, Node, and cloud platforms.";
  const skills = ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB', 'Docker'];
  const experience = [
    { company: 'Webify', title: 'Senior Developer', duration: '2020 - Present', description: 'Built scalable SaaS platforms.' },
    { company: 'CloudSoft', title: 'Developer', duration: '2017 - 2020', description: 'Worked on cloud migration projects.' }
  ];
  const education = [
    { degree: 'BS Computer Science', institution: 'UT Austin', year: '2013 - 2017' }
  ];

  const width = preview ? 300 : 900;
  const height = preview ? 425 : 'auto';
  const leftWidth = preview ? 90 : 260;
  const pad = preview ? 10 : 32;
  const font = preview ? 10 : 18;
  const sectionFont = preview ? 11 : 22;
  const subFont = preview ? 8 : 15;

  return (
    <div style={{ display: 'flex', width, height, background: '#f8fafb', borderRadius: 16, boxShadow: preview ? 'none' : '0 4px 24px #0001', border: '1px solid #eee', overflow: 'hidden', fontFamily: 'Inter, Arial, sans-serif', color: '#222' }}>
      {/* Left */}
      <div style={{ background: '#20bfa9', color: '#fff', width: leftWidth, padding: preview ? 8 : 24, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100%' }}>
        <div style={{ fontWeight: 700, fontSize: preview ? 13 : 28, marginBottom: preview ? 4 : 16 }}>{name}</div>
        <div style={{ fontSize: preview ? 8 : 15, marginBottom: preview ? 4 : 16 }}>{title}</div>
        <div style={{ fontSize: subFont, marginBottom: preview ? 2 : 8 }}>📧 {email}</div>
        <div style={{ fontSize: subFont, marginBottom: preview ? 2 : 8 }}>📱 {phone}</div>
        <div style={{ fontSize: subFont }}>📍 {location}</div>
        <div style={{ borderTop: '1px solid #fff2', margin: preview ? '6px 0' : '16px 0', width: '100%' }} />
        <div style={{ fontWeight: 600, fontSize: sectionFont, marginBottom: preview ? 2 : 8 }}>Skills</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: preview ? 2 : 6 }}>
          {skills.map(skill => (
            <span key={skill} style={{ background: '#1a9e8c', color: '#fff', borderRadius: 12, padding: preview ? '2px 6px' : '6px 16px', fontSize: subFont }}>{skill}</span>
          ))}
        </div>
      </div>
      {/* Right */}
      <div style={{ flex: 1, padding: pad }}>
        <div style={{ fontSize: sectionFont, color: '#20bfa9', fontWeight: 700, marginBottom: preview ? 4 : 12 }}>About</div>
        <div style={{ fontSize: font, color: '#444', marginBottom: preview ? 8 : 24 }}>{summary}</div>
        <div style={{ fontSize: sectionFont, color: '#20bfa9', fontWeight: 700, marginBottom: preview ? 4 : 12 }}>Experience</div>
        {experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: preview ? 4 : 12 }}>
            <div style={{ fontWeight: 600, fontSize: font }}>{exp.title} @ {exp.company}</div>
            <div style={{ fontSize: subFont, color: '#e0f7f4' }}>{exp.duration}</div>
            <div style={{ fontSize: subFont, color: '#fff' }}>{exp.description}</div>
          </div>
        ))}
        <div style={{ fontSize: sectionFont, color: '#20bfa9', fontWeight: 700, marginBottom: preview ? 4 : 12 }}>Education</div>
        {education.map((edu, i) => (
          <div key={i} style={{ marginBottom: preview ? 4 : 12 }}>
            <div style={{ fontWeight: 600, fontSize: font }}>{edu.degree}</div>
            <div style={{ fontSize: subFont, color: '#e0f7f4' }}>{edu.institution}</div>
            <div style={{ fontSize: subFont, color: '#fff' }}>{edu.year}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeTemplateExport3; 