import React from 'react';
import { ResumeData } from '../utils/pdfGenerator';
import { getTemplateById } from '../data/resumeTemplates';

interface TemplateRendererProps {
  templateId: string;
  resumeData: ResumeData;
  preview?: boolean;
}

const TemplateRenderer: React.FC<TemplateRendererProps> = ({ templateId, resumeData, preview = false }) => {
  const template = getTemplateById(templateId);

  if (!template) {
    return <div>Template not found</div>;
  }

  const renderTemplate = () => {
    switch (template.category) {
      case 'modern':
        return renderModernTemplate();
      case 'classic':
        return renderClassicTemplate();
      case 'creative':
        return renderCreativeTemplate();
      case 'executive':
        return renderExecutiveTemplate();
      case 'technical':
        return renderTechnicalTemplate();
      case 'minimalist':
        return renderMinimalistTemplate();
      case 'artistic':
        return renderArtisticTemplate();
      case 'corporate':
        return renderCorporateTemplate();
      case 'startup':
        return renderStartupTemplate();
      case 'academic':
        return renderAcademicTemplate();
      default:
        return renderModernTemplate();
    }
  };

  const renderModernTemplate = () => (
    <div className="font-sans bg-white text-gray-800 p-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="border-b-4 border-blue-600 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">{resumeData.personalInfo.name || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 text-gray-600">
          {resumeData.personalInfo.email && <span>📧 {resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo.phone && <span>📱 {resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.location && <span>📍 {resumeData.personalInfo.location}</span>}
          {resumeData.personalInfo.linkedin && <span>💼 LinkedIn</span>}
          {resumeData.personalInfo.github && <span>🔗 GitHub</span>}
        </div>
      </header>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-4">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-4">Work Experience</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600">{exp.title}</h3>
              <p className="text-gray-600 font-medium">{exp.company} | {exp.duration}</p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-4">Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600">{edu.degree}</h3>
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-gray-500">{edu.year}{edu.gpa && ` | GPA: ${edu.gpa}`}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span key={index} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-4">Projects</h2>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600">{project.name}</h3>
              <p className="text-gray-700 mt-2">{project.description}</p>
              {project.technologies && (
                <p className="text-gray-600 mt-2"><strong>Technologies:</strong> {project.technologies}</p>
              )}
              {project.link && (
                <a href={project.link} className="text-blue-600 hover:underline mt-2 inline-block">
                  🔗 View Project
                </a>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );

  const renderClassicTemplate = () => (
    <div className="font-serif bg-white text-black p-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="text-center border-b-2 border-black pb-4 mb-8">
        <h1 className="text-3xl font-bold mb-2">{resumeData.personalInfo.name || 'Your Name'}</h1>
        <div className="text-sm">
          {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email} | </span>}
          {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone} | </span>}
          {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
        </div>
      </header>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 border-b border-black">SUMMARY</h2>
          <p className="text-sm leading-relaxed">{resumeData.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 border-b border-black">EXPERIENCE</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold">{exp.title}</h3>
              <p className="text-sm italic">{exp.company} | {exp.duration}</p>
              <p className="text-sm mt-1">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 border-b border-black">EDUCATION</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <h3 className="font-bold">{edu.degree}</h3>
              <p className="text-sm">{edu.institution} | {edu.year}{edu.gpa && ` | GPA: ${edu.gpa}`}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 border-b border-black">SKILLS</h2>
          <p className="text-sm">{resumeData.skills.join(', ')}</p>
        </section>
      )}

      {/* Projects */}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 border-b border-black">PROJECTS</h2>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-bold">{project.name}</h3>
              <p className="text-sm">{project.description}</p>
              {project.technologies && <p className="text-sm italic">Technologies: {project.technologies}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  );

  const renderCreativeTemplate = () => (
    <div className="font-sans bg-gradient-to-br from-purple-50 to-pink-50 text-gray-800 p-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          {resumeData.personalInfo.name || 'Your Name'}
        </h1>
        <div className="flex justify-center flex-wrap gap-4 text-gray-600">
          {resumeData.personalInfo.email && <span>📧 {resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo.phone && <span>📱 {resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.location && <span>📍 {resumeData.personalInfo.location}</span>}
        </div>
      </header>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <section className="mb-8 bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">✨ About Me</h2>
          <p className="text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">🚀 Experience</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg mb-4">
              <h3 className="text-xl font-bold text-pink-600">{exp.title}</h3>
              <p className="text-gray-600 font-medium">{exp.company} | {exp.duration}</p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">🛠️ Skills</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {resumeData.skills.map((skill, index) => (
              <span key={index} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">💡 Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumeData.projects.map((project, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-pink-600">{project.name}</h3>
                <p className="text-gray-700 mt-2">{project.description}</p>
                {project.technologies && (
                  <p className="text-gray-600 mt-2"><strong>Tech:</strong> {project.technologies}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  const renderExecutiveTemplate = () => (
    <div className="font-serif bg-white text-gray-900 p-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="border-b-4 border-gray-800 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{resumeData.personalInfo.name || 'Your Name'}</h1>
        <p className="text-xl text-gray-600 mb-4">Executive Professional</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            {resumeData.personalInfo.email && <p>📧 {resumeData.personalInfo.email}</p>}
            {resumeData.personalInfo.phone && <p>📱 {resumeData.personalInfo.phone}</p>}
          </div>
          <div>
            {resumeData.personalInfo.location && <p>📍 {resumeData.personalInfo.location}</p>}
            {resumeData.personalInfo.linkedin && <p>💼 LinkedIn Profile</p>}
          </div>
        </div>
      </header>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">EXECUTIVE SUMMARY</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{resumeData.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">PROFESSIONAL EXPERIENCE</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-6 border-l-4 border-gray-800 pl-6">
              <h3 className="text-xl font-bold text-gray-800">{exp.title}</h3>
              <p className="text-gray-600 font-medium">{exp.company} | {exp.duration}</p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">CORE COMPETENCIES</h2>
          <div className="grid grid-cols-2 gap-4">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="flex items-center">
                <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                <span className="text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  const renderTechnicalTemplate = () => (
    <div className="font-mono bg-gray-900 text-green-400 p-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="border-b-2 border-green-400 pb-4 mb-8">
        <h1 className="text-3xl font-bold text-green-400 mb-2">{resumeData.personalInfo.name || 'Your Name'}</h1>
        <p className="text-green-300">// Software Engineer & Developer</p>
        <div className="mt-4 text-sm">
          {resumeData.personalInfo.email && <p>📧 {resumeData.personalInfo.email}</p>}
          {resumeData.personalInfo.phone && <p>📱 {resumeData.personalInfo.phone}</p>}
          {resumeData.personalInfo.location && <p>📍 {resumeData.personalInfo.location}</p>}
          {resumeData.personalInfo.github && <p>🔗 GitHub: {resumeData.personalInfo.github}</p>}
        </div>
      </header>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-green-400 mb-4">// ABOUT</h2>
          <p className="text-green-300 leading-relaxed">{resumeData.personalInfo.summary}</p>
        </section>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-green-400 mb-4">// TECHNICAL SKILLS</h2>
          <div className="grid grid-cols-2 gap-4">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="flex items-center">
                <span className="text-green-500 mr-2">{'>'}</span>
                <span className="text-green-300">{skill}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-green-400 mb-4">// EXPERIENCE</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-6 border-l-2 border-green-400 pl-4">
              <h3 className="text-lg font-bold text-green-400">{exp.title}</h3>
              <p className="text-green-300 text-sm">{exp.company} | {exp.duration}</p>
              <p className="text-green-300 mt-2">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-green-400 mb-4">// PROJECTS</h2>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-4 border-l-2 border-green-400 pl-4">
              <h3 className="text-lg font-bold text-green-400">{project.name}</h3>
              <p className="text-green-300">{project.description}</p>
              {project.technologies && (
                <p className="text-green-500 text-sm mt-1">Tech: {project.technologies}</p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );

  const renderMinimalistTemplate = () => (
    <div className="font-sans bg-white text-black p-8 max-w-3xl mx-auto">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-light mb-2">{resumeData.personalInfo.name || 'Your Name'}</h1>
        <div className="text-sm text-gray-600 space-y-1">
          {resumeData.personalInfo.email && <p>{resumeData.personalInfo.email}</p>}
          {resumeData.personalInfo.phone && <p>{resumeData.personalInfo.phone}</p>}
          {resumeData.personalInfo.location && <p>{resumeData.personalInfo.location}</p>}
        </div>
      </header>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <section className="mb-12">
          <p className="text-gray-700 leading-relaxed text-center">{resumeData.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-medium mb-6 border-b border-gray-300 pb-2">Experience</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-8">
              <h3 className="font-medium">{exp.title}</h3>
              <p className="text-sm text-gray-600">{exp.company} • {exp.duration}</p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-medium mb-6 border-b border-gray-300 pb-2">Skills</h2>
          <p className="text-gray-700">{resumeData.skills.join(' • ')}</p>
        </section>
      )}
    </div>
  );

  const renderArtisticTemplate = () => (
    <div className="font-serif bg-gradient-to-br from-yellow-50 to-orange-50 text-gray-800 p-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold text-orange-600 mb-4">{resumeData.personalInfo.name || 'Your Name'}</h1>
        <div className="flex justify-center flex-wrap gap-4 text-gray-600">
          {resumeData.personalInfo.email && <span>📧 {resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo.phone && <span>📱 {resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.location && <span>📍 {resumeData.personalInfo.location}</span>}
        </div>
      </header>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">🎨 Creative Vision</h2>
          <p className="text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
        </section>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">🖌️ Creative Skills</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {resumeData.skills.map((skill, index) => (
              <span key={index} className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">🎭 Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resumeData.projects.map((project, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-orange-600">{project.name}</h3>
                <p className="text-gray-700 mt-2">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  const renderCorporateTemplate = () => (
    <div className="font-sans bg-white text-gray-900 p-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="bg-gray-100 p-6 rounded-lg mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{resumeData.personalInfo.name || 'Your Name'}</h1>
        <p className="text-gray-600 mb-4">Professional Summary</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            {resumeData.personalInfo.email && <p>📧 {resumeData.personalInfo.email}</p>}
            {resumeData.personalInfo.phone && <p>📱 {resumeData.personalInfo.phone}</p>}
          </div>
          <div>
            {resumeData.personalInfo.location && <p>📍 {resumeData.personalInfo.location}</p>}
            {resumeData.personalInfo.linkedin && <p>💼 LinkedIn</p>}
          </div>
        </div>
      </header>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">PROFESSIONAL SUMMARY</h2>
          <p className="text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">PROFESSIONAL EXPERIENCE</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-bold text-gray-800">{exp.title}</h3>
              <p className="text-gray-600">{exp.company} | {exp.duration}</p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">CORE COMPETENCIES</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  const renderStartupTemplate = () => (
    <div className="font-sans bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800 p-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-600 mb-2">{resumeData.personalInfo.name || 'Your Name'}</h1>
        <p className="text-xl text-indigo-500 mb-4">Innovator & Problem Solver</p>
        <div className="flex justify-center flex-wrap gap-4 text-gray-600">
          {resumeData.personalInfo.email && <span>📧 {resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo.phone && <span>📱 {resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.location && <span>📍 {resumeData.personalInfo.location}</span>}
        </div>
      </header>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <section className="mb-8 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">🚀 Mission</h2>
          <p className="text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
        </section>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">⚡ Superpowers</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {resumeData.skills.map((skill, index) => (
              <span key={index} className="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">💡 Innovations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resumeData.projects.map((project, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-indigo-600">{project.name}</h3>
                <p className="text-gray-700 mt-2">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  const renderAcademicTemplate = () => (
    <div className="font-serif bg-white text-gray-900 p-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="text-center border-b-2 border-gray-300 pb-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{resumeData.personalInfo.name || 'Your Name'}</h1>
        <p className="text-gray-600 mb-4">Academic Professional</p>
        <div className="text-sm text-gray-600">
          {resumeData.personalInfo.email && <p>📧 {resumeData.personalInfo.email}</p>}
          {resumeData.personalInfo.phone && <p>📱 {resumeData.personalInfo.phone}</p>}
          {resumeData.personalInfo.location && <p>📍 {resumeData.personalInfo.location}</p>}
        </div>
      </header>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">RESEARCH INTERESTS</h2>
          <p className="text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
        </section>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">EDUCATION</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-gray-500">{edu.year}{edu.gpa && ` | GPA: ${edu.gpa}`}</p>
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">ACADEMIC EXPERIENCE</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-bold text-gray-800">{exp.title}</h3>
              <p className="text-gray-600">{exp.company} | {exp.duration}</p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">RESEARCH SKILLS</h2>
          <p className="text-gray-700">{resumeData.skills.join(', ')}</p>
        </section>
      )}
    </div>
  );

  return (
    <div className={`template-renderer ${preview ? 'preview-mode' : ''}`}>
      {renderTemplate()}
    </div>
  );
};

export default TemplateRenderer; 