import jsPDF from 'jspdf';
import { getTemplateById } from '../data/resumeTemplates';

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    linkedin?: string;
    github?: string;
  };
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    gpa?: string;
  }>;
  skills: string[];
  projects?: Array<{
    name: string;
    description: string;
    technologies: string;
    link?: string;
  }>;
}

export const generateResumePDF = (data: ResumeData, templateId: string = 'modern-1'): void => {
  const template = getTemplateById(templateId);
  const pdf = new jsPDF('p', 'pt', 'a4'); // Use points for better precision
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - (margin * 2);
  let yPosition = margin + 20;

  // Helper function to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 37, g: 99, b: 235 }; // Default blue
  };

  // Helper function to add text with proper word wrapping and spacing
  const addWrappedText = (
    text: string, 
    x: number, 
    y: number, 
    maxWidth: number, 
    fontSize: number = 11,
    lineHeight: number = 1.4
  ): number => {
    if (!text || text.trim() === '') return y;
    
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text.trim(), maxWidth);
    const lineSpacing = fontSize * lineHeight;
    
    lines.forEach((line: string, index: number) => {
      pdf.text(line, x, y + (index * lineSpacing));
    });
    
    return y + (lines.length * lineSpacing) + (fontSize * 0.5); // Add extra spacing after text block
  };

  // Helper function to check if we need a new page
  const checkPageBreak = (requiredSpace: number): number => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      pdf.addPage();
      return margin + 20;
    }
    return yPosition;
  };

  // Helper function to add section header
  const addSectionHeader = (title: string, color: any): number => {
    yPosition = checkPageBreak(60);
    
    // Add some space before section
    yPosition += 20;
    
    pdf.setTextColor(color.r, color.g, color.b);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(title.toUpperCase(), margin, yPosition);
    
    // Add underline
    pdf.setDrawColor(color.r, color.g, color.b);
    pdf.setLineWidth(2);
    const textWidth = pdf.getTextWidth(title.toUpperCase());
    pdf.line(margin, yPosition + 5, margin + textWidth, yPosition + 5);
    
    return yPosition + 25; // Return position after header with spacing
  };

  // Set template colors
  const primaryColor = template?.colors.primary || '#2563EB';
  const secondaryColor = template?.colors.secondary || '#1E40AF';
  const primaryRgb = hexToRgb(primaryColor);
  const secondaryRgb = hexToRgb(secondaryColor);

  // HEADER SECTION - Name and Title
  pdf.setTextColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
  pdf.setFontSize(28);
  pdf.setFont('helvetica', 'bold');
  pdf.text(data.personalInfo.name || 'Your Name', margin, yPosition);
  yPosition += 35;

  // Add professional title if available from experience
  if (data.experience.length > 0) {
    pdf.setTextColor(100, 100, 100);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text(data.experience[0].title, margin, yPosition);
    yPosition += 20;
  }

  // Add colored separator line
  pdf.setDrawColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
  pdf.setLineWidth(3);
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 25;

  // CONTACT INFORMATION - Properly formatted
  pdf.setTextColor(60, 60, 60);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  
  const contactItems = [];
  if (data.personalInfo.email) contactItems.push(`📧 ${data.personalInfo.email}`);
  if (data.personalInfo.phone) contactItems.push(`📱 ${data.personalInfo.phone}`);
  if (data.personalInfo.location) contactItems.push(`📍 ${data.personalInfo.location}`);
  
  // Display contact info in multiple lines if needed
  if (contactItems.length > 0) {
    const contactLine1 = contactItems.slice(0, 2).join('    ');
    pdf.text(contactLine1, margin, yPosition);
    yPosition += 15;
    
    if (contactItems.length > 2) {
      const contactLine2 = contactItems.slice(2).join('    ');
      pdf.text(contactLine2, margin, yPosition);
      yPosition += 15;
    }
  }

  // Social links on separate line
  const socialItems = [];
  if (data.personalInfo.linkedin) socialItems.push(`💼 ${data.personalInfo.linkedin}`);
  if (data.personalInfo.github) socialItems.push(`🔗 ${data.personalInfo.github}`);
  
  if (socialItems.length > 0) {
    const socialLine = socialItems.join('    ');
    pdf.text(socialLine, margin, yPosition);
    yPosition += 25;
  }

  // PROFESSIONAL SUMMARY SECTION
  if (data.personalInfo.summary && data.personalInfo.summary.trim()) {
    yPosition = addSectionHeader('Professional Summary', primaryRgb);
    
    pdf.setTextColor(40, 40, 40);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    yPosition = addWrappedText(data.personalInfo.summary, margin, yPosition, contentWidth, 11, 1.5);
    yPosition += 15;
  }

  // WORK EXPERIENCE SECTION
  if (data.experience && data.experience.length > 0) {
    yPosition = addSectionHeader('Work Experience', secondaryRgb);

    data.experience.forEach((exp, index) => {
      yPosition = checkPageBreak(80);
      
      // Job title
      pdf.setTextColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text(exp.title || 'Position Title', margin, yPosition);
      yPosition += 18;

      // Company and duration
      pdf.setTextColor(80, 80, 80);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      const companyDuration = `${exp.company || 'Company Name'} | ${exp.duration || 'Duration'}`;
      pdf.text(companyDuration, margin, yPosition);
      yPosition += 20;

      // Job description
      if (exp.description && exp.description.trim()) {
        pdf.setTextColor(60, 60, 60);
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        yPosition = addWrappedText(exp.description, margin, yPosition, contentWidth, 11, 1.4);
      }
      
      // Add spacing between experience entries
      yPosition += 20;
    });
  }

  // EDUCATION SECTION
  if (data.education && data.education.length > 0) {
    yPosition = addSectionHeader('Education', secondaryRgb);

    data.education.forEach((edu, index) => {
      yPosition = checkPageBreak(60);
      
      // Degree
      pdf.setTextColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
      pdf.setFontSize(13);
      pdf.setFont('helvetica', 'bold');
      pdf.text(edu.degree || 'Degree', margin, yPosition);
      yPosition += 16;

      // Institution and year
      pdf.setTextColor(80, 80, 80);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      const institutionInfo = `${edu.institution || 'Institution'} | ${edu.year || 'Year'}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}`;
      pdf.text(institutionInfo, margin, yPosition);
      yPosition += 20;
    });
  }

  // SKILLS SECTION
  if (data.skills && data.skills.length > 0) {
    yPosition = addSectionHeader('Technical Skills', secondaryRgb);

    pdf.setTextColor(60, 60, 60);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    
    // Group skills into lines to prevent overflow
    const skillsPerLine = 6;
    const skillGroups = [];
    for (let i = 0; i < data.skills.length; i += skillsPerLine) {
      skillGroups.push(data.skills.slice(i, i + skillsPerLine));
    }
    
    skillGroups.forEach((group, groupIndex) => {
      const skillsText = group.join(' • ');
      yPosition = addWrappedText(skillsText, margin, yPosition, contentWidth, 11, 1.3);
      if (groupIndex < skillGroups.length - 1) {
        yPosition += 8; // Add spacing between skill groups
      }
    });
    
    yPosition += 15;
  }

  // PROJECTS SECTION
  if (data.projects && data.projects.length > 0) {
    yPosition = addSectionHeader('Projects', secondaryRgb);

    data.projects.forEach((project, index) => {
      yPosition = checkPageBreak(100);
      
      // Project name
      pdf.setTextColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
      pdf.setFontSize(13);
      pdf.setFont('helvetica', 'bold');
      pdf.text(project.name || 'Project Name', margin, yPosition);
      yPosition += 16;

      // Project description
      if (project.description && project.description.trim()) {
        pdf.setTextColor(60, 60, 60);
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        yPosition = addWrappedText(project.description, margin, yPosition, contentWidth, 11, 1.4);
      }

      // Technologies used
      if (project.technologies && project.technologies.trim()) {
        pdf.setTextColor(100, 100, 100);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'italic');
        yPosition = addWrappedText(`Technologies: ${project.technologies}`, margin, yPosition + 5, contentWidth, 10, 1.3);
      }

      // Project link
      if (project.link && project.link.trim()) {
        pdf.setTextColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`🔗 ${project.link}`, margin, yPosition + 8);
        yPosition += 15;
      }
      
      // Add spacing between projects
      yPosition += 20;
    });
  }

  // FOOTER
  yPosition = checkPageBreak(40);
  pdf.setFontSize(9);
  pdf.setTextColor(120, 120, 120);
  pdf.setFont('helvetica', 'normal');
  const footerText = `Generated with CareerPanda - ${template?.name || 'Professional'} Template | ${new Date().toLocaleDateString()}`;
  pdf.text(footerText, margin, pageHeight - 30);

  // Save the PDF with proper filename
  const cleanName = (data.personalInfo.name || 'Resume').replace(/[^a-zA-Z0-9]/g, '_');
  const templateName = (template?.name || 'Professional').replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `${cleanName}_Resume_${templateName}.pdf`;
  pdf.save(fileName);
};