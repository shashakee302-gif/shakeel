import React from 'react';

interface ResumeTemplateExport2Props {
  preview?: boolean;
}

const ResumeTemplateExport2: React.FC<ResumeTemplateExport2Props> = ({ preview }) => {
  // Hardcoded data
  const name = 'Jane Smith';
  const title = 'Product Designer';
  const email = 'jane.smith@email.com';
  const phone = '555-123-4567';
  const location = 'San Francisco, CA';
  const summary = "Creative product designer with 5+ years of experience in UI/UX and branding. Passionate about building delightful user experiences.";
  const skills = ['Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Branding', 'Wireframing'];
  const experience = [
    { company: 'DesignCo', title: 'Lead Designer', duration: '2019 - Present', description: 'Led a team of 4 designers. Shipped 10+ products.' },
    { company: 'StartupX', title: 'UI/UX Designer', duration: '2016 - 2019', description: 'Designed mobile and web apps for startups.' }
  ];
  const education = [
    { degree: 'BFA in Graphic Design', institution: 'Art University', year: '2012 - 2016' }
  ];

  // Styles
  const width = preview ? 300 : 900;
  const height = preview ? 425 : 'auto';
  const sidebarWidth = preview ? 80 : 220;
  const mainPad = preview ? 10 : 32;
  const font = preview ? 10 : 18;
  const sectionFont = preview ? 11 : 22;
  const subFont = preview ? 8 : 15;

  return (
    <div style={{
      display: 'flex',
      width: width,
      height: height,
      background: '#fff',
      borderRadius: 16,
      boxShadow: preview ? 'none' : '0 4px 24px #0001',
      border: '1px solid #eee',
      overflow: 'hidden',
      fontFamily: 'Inter, Arial, sans-serif',
      color: '#222',
    }}>
      {/* Sidebar */}
      <div style={{
        background: '#232946',
        color: '#fff',
        width: sidebarWidth,
        padding: preview ? 8 : 24,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100%',
      }}>
        <div style={{ fontWeight: 700, fontSize: preview ? 13 : 28, marginBottom: preview ? 4 : 16 }}>{name}</div>
        <div style={{ fontSize: preview ? 8 : 15, marginBottom: preview ? 4 : 16 }}>{title}</div>
        <div style={{ fontSize: subFont, marginBottom: preview ? 2 : 8 }}>📧 {email}</div>
        <div style={{ fontSize: subFont, marginBottom: preview ? 2 : 8 }}>📱 {phone}</div>
        <div style={{ fontSize: subFont }}>📍 {location}</div>
        <div style={{ borderTop: '1px solid #fff2', margin: preview ? '6px 0' : '16px 0', width: '100%' }} />
        <div style={{ fontWeight: 600, fontSize: sectionFont, marginBottom: preview ? 2 : 8 }}>Skills</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: preview ? 2 : 6 }}>
          {skills.map(skill => (
            <span key={skill} style={{ background: '#393e6e', color: '#fff', borderRadius: 12, padding: preview ? '2px 6px' : '6px 16px', fontSize: subFont }}>{skill}</span>
          ))}
        </div>
      </div>
      {/* Main */}
      <div style={{ flex: 1, padding: mainPad }}>
        <div style={{ fontSize: sectionFont, color: '#232946', fontWeight: 700, marginBottom: preview ? 4 : 12 }}>About</div>
        <div style={{ fontSize: font, color: '#444', marginBottom: preview ? 8 : 24 }}>{summary}</div>
        <div style={{ fontSize: sectionFont, color: '#232946', fontWeight: 700, marginBottom: preview ? 4 : 12 }}>Experience</div>
        {experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: preview ? 4 : 12 }}>
            <div style={{ fontWeight: 600, fontSize: font }}>{exp.title} @ {exp.company}</div>
            <div style={{ fontSize: subFont, color: '#888' }}>{exp.duration}</div>
            <div style={{ fontSize: subFont, color: '#444' }}>{exp.description}</div>
          </div>
        ))}
        <div style={{ fontSize: sectionFont, color: '#232946', fontWeight: 700, marginBottom: preview ? 4 : 12 }}>Education</div>
        {education.map((edu, i) => (
          <div key={i} style={{ marginBottom: preview ? 4 : 12 }}>
            <div style={{ fontWeight: 600, fontSize: font }}>{edu.degree}</div>
            <div style={{ fontSize: subFont, color: '#888' }}>{edu.institution}</div>
            <div style={{ fontSize: subFont, color: '#444' }}>{edu.year}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeTemplateExport2; 