import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Github, 
  ExternalLink, 
  Code, 
  Palette, 
  Sparkles,
  Monitor,
  Smartphone,
  Tablet,
  Download,
  Eye,
  CheckCircle
} from 'lucide-react';
import { downloadPortfolio, generateGitHubPages, PortfolioData } from '../utils/portfolioGenerator';
import toast, { Toaster } from 'react-hot-toast';
import { searchJobs, Job } from '../services/jobService';
import jsPDF from 'jspdf';

const GEMINI_API_KEY = 'AIzaSyBS9GMNth3NocYCEABb3maGb0xWD1aemjQ';

const Portfolio: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      linkedin: '',
      github: ''
    },
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB', 'Express.js'],
    projects: [
      {
        name: 'Smart Resume Builder',
        description: 'AI-powered resume and portfolio builder for students with ATS-friendly templates.',
        technologies: 'React, TypeScript, Tailwind CSS, jsPDF',
        link: 'https://github.com/skshakeel/resume-builder'
      },
      {
        name: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with payment integration and admin dashboard.',
        technologies: 'MERN Stack, Stripe, JWT Authentication',
        link: 'https://github.com/skshakeel/ecommerce'
      }
    ],
    experience: [
      {
        title: 'Full Stack Developer',
        company: 'Tech Solutions Inc.',
        duration: '2023 - Present',
        description: 'Developing scalable web applications using modern technologies and best practices.'
      }
    ],
    education: [
      {
        degree: 'Bachelor of Technology',
        institution: 'Indian Institute of Technology',
        year: '2020-2024',
        gpa: '8.5'
      }
    ]
  });
  const [modal, setModal] = useState<null | 'domain' | 'github' | 'seo' | 'customize'>(null);
  const [AIReport, setAIReport] = useState<string>('');
  const [showAIReport, setShowAIReport] = useState<boolean>(false);

  const templates = [
    {
      id: 0,
      name: "Cyberpunk Matrix",
      description: "Futuristic cyberpunk design with matrix rain, glitch effects, and neon aesthetics",
      image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400",
      color: "from-green-400 to-cyan-400",
      features: ["Matrix Rain Effect", "Custom Cursor", "Glitch Animations", "Neon Glow", "Hexagonal Grid"]
    },
    {
      id: 1,
      name: "Holographic Nexus",
      description: "Interdimensional holographic design with morphing elements and particle systems",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400",
      color: "from-purple-500 to-pink-500",
      features: ["Holographic Effects", "Morphing Cards", "Particle System", "3D Transforms", "Liquid Animations"]
    },
    {
      id: 2,
      name: "Quantum Dimension",
      description: "Multidimensional quantum-inspired design with geometric shapes and energy waves",
      image: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400",
      color: "from-red-500 to-yellow-500",
      features: ["Quantum Effects", "Geometric Animations", "Energy Waves", "Dimensional Cards", "Spiral Layout"]
    }
  ];

  const portfolioFeatures = [
    {
      icon: Globe,
      title: "Custom Domain",
      description: "Get your own professional domain like yourname.dev",
      onClick: () => setModal('domain')
    },
    {
      icon: Github,
      title: "GitHub Pages",
      description: "Automatically deployed and hosted on GitHub Pages for free",
      onClick: () => setModal('github')
    },
    {
      icon: Code,
      title: "SEO Optimized",
      description: "Built with SEO best practices to help you get discovered",
      onClick: () => setModal('seo')
    },
    {
      icon: Palette,
      title: "Customizable",
      description: "Choose colors, fonts, and layouts that match your style",
      onClick: () => setModal('customize')
    }
  ];

  const getDeviceClasses = () => {
    switch (previewDevice) {
      case 'mobile':
        return 'w-80 h-96';
      case 'tablet':
        return 'w-96 h-72';
      default:
        return 'w-full h-96';
    }
  };

  const handleGeneratePortfolio = () => {
    try {
      // Load resume data if portfolio data is empty
      if (!portfolioData.personalInfo.name) {
        loadResumeData();
      }
      
      const templateNames = ['cyberpunk', 'holographic', 'quantum'];
      downloadPortfolio(portfolioData, templateNames[selectedTemplate]);
      toast.success(`🚀 ${templates[selectedTemplate].name} portfolio downloaded! This is next-level stuff!`);
    } catch (error) {
      toast.error('Error generating portfolio. Please try again.');
      console.error('Portfolio generation error:', error);
    }
  };

  const handlePreviewPortfolio = () => {
    try {
      const templateNames = ['cyberpunk', 'holographic', 'quantum'];
      const htmlContent = generateGitHubPages(portfolioData, templateNames[selectedTemplate]);
      
      // Open preview in new window
      const previewWindow = window.open('', '_blank');
      if (previewWindow) {
        previewWindow.document.write(htmlContent);
        previewWindow.document.close();
        toast.success(`🎨 ${templates[selectedTemplate].name} preview opened! Prepare to be amazed!`);
      }
    } catch (error) {
      toast.error('Error previewing portfolio. Please try again.');
      console.error('Portfolio preview error:', error);
    }
  };

  const loadResumeData = () => {
    try {
      const savedData = localStorage.getItem('resumeData');
      if (savedData) {
        const resumeData = JSON.parse(savedData);
        setPortfolioData({
          personalInfo: {
            name: resumeData.personalInfo?.name || '',
            email: resumeData.personalInfo?.email || '',
            phone: resumeData.personalInfo?.phone || '',
            location: resumeData.personalInfo?.location || '',
            summary: resumeData.personalInfo?.summary || '',
            linkedin: resumeData.personalInfo?.linkedin || '',
            github: resumeData.personalInfo?.github || ''
          },
          skills: resumeData.skills || [],
          projects: resumeData.projects || [],
          experience: resumeData.experience || [],
          education: resumeData.education || []
        });
        toast.success('Resume data loaded for portfolio generation!');
      } else {
        toast.error('No resume data found. Please create a resume first.');
      }
    } catch (error) {
      toast.error('Error loading resume data.');
      console.error('Data loading error:', error);
    }
  };

  const handleAIFeedback = async () => {
    toast.loading('Analyzing your resume and portfolio...');
    // Load resume data from localStorage if available
    let resumeData: any = null;
    try {
      const savedData = localStorage.getItem('resumeData');
      if (savedData) {
        resumeData = JSON.parse(savedData);
      }
    } catch {}

    // Analyze portfolio
    const strengths = [];
    if (portfolioData.skills.length > 5) strengths.push('Diverse skill set');
    if (portfolioData.projects.length > 2) strengths.push('Strong project experience');
    if (portfolioData.experience.length > 0) strengths.push('Professional work experience');
    if (portfolioData.education.length > 0) strengths.push('Solid educational background');
    if (portfolioData.personalInfo.summary && portfolioData.personalInfo.summary.length > 50) strengths.push('Clear professional summary');

    const weaknesses = [];
    if (portfolioData.skills.length < 3) weaknesses.push('Add more skills to showcase your expertise');
    if (portfolioData.projects.length === 0) weaknesses.push('Add projects to demonstrate your work');
    if (!portfolioData.personalInfo.summary || portfolioData.personalInfo.summary.length < 30) weaknesses.push('Expand your professional summary');
    if (portfolioData.experience.length === 0) weaknesses.push('Add work experience to strengthen your profile');
    if (portfolioData.education.length === 0) weaknesses.push('Add your education details');

    let advice = '';
    if (portfolioData.skills.includes('JavaScript') && portfolioData.skills.includes('React')) {
      advice += 'You are well-suited for front-end or full-stack developer roles. Consider applying to tech companies or startups.\n';
    }
    if (portfolioData.skills.includes('Python') && portfolioData.skills.includes('Machine Learning')) {
      advice += 'You have a strong foundation for data science or AI roles. Explore opportunities in analytics, research, or AI product teams.\n';
    }
    if (portfolioData.skills.includes('Marketing')) {
      advice += 'Your marketing skills are valuable for digital marketing, content creation, or brand management roles.\n';
    }
    if (portfolioData.skills.length > 0 && advice === '') {
      advice += 'Leverage your skills to target roles that match your interests. Keep learning and adding new skills to stay competitive.\n';
    }
    if (portfolioData.projects.length > 0) {
      advice += 'Showcase your projects on LinkedIn or a personal website to attract recruiters.\n';
    }

    // Analyze resume if available
    let resumeStrengths: string[] = [];
    let resumeWeaknesses: string[] = [];
    let resumeAdvice = '';
    if (resumeData) {
      if (resumeData.skills && resumeData.skills.length > 5) resumeStrengths.push('Diverse skill set');
      if (resumeData.projects && resumeData.projects.length > 2) resumeStrengths.push('Strong project experience');
      if (resumeData.experience && resumeData.experience.length > 0) resumeStrengths.push('Professional work experience');
      if (resumeData.education && resumeData.education.length > 0) resumeStrengths.push('Solid educational background');
      if (resumeData.personalInfo && resumeData.personalInfo.summary && resumeData.personalInfo.summary.length > 50) resumeStrengths.push('Clear professional summary');

      if (resumeData.skills && resumeData.skills.length < 3) resumeWeaknesses.push('Add more skills to your resume');
      if (!resumeData.projects || resumeData.projects.length === 0) resumeWeaknesses.push('Add projects to your resume');
      if (!resumeData.personalInfo || !resumeData.personalInfo.summary || resumeData.personalInfo.summary.length < 30) resumeWeaknesses.push('Expand your professional summary');
      if (!resumeData.experience || resumeData.experience.length === 0) resumeWeaknesses.push('Add work experience');
      if (!resumeData.education || resumeData.education.length === 0) resumeWeaknesses.push('Add your education details');

      if (resumeData.skills && resumeData.skills.includes('JavaScript') && resumeData.skills.includes('React')) {
        resumeAdvice += 'Your resume is strong for front-end or full-stack developer roles.\n';
      }
      if (resumeData.skills && resumeData.skills.includes('Python') && resumeData.skills.includes('Machine Learning')) {
        resumeAdvice += 'You are a good fit for data science or AI roles.\n';
      }
      if (resumeData.skills && resumeData.skills.includes('Marketing')) {
        resumeAdvice += 'Consider marketing, content, or brand roles.\n';
      }
      if (resumeData.skills && resumeData.skills.length > 0 && resumeAdvice === '') {
        resumeAdvice += 'Target roles that match your skills and interests.\n';
      }
      if (resumeData.projects && resumeData.projects.length > 0) {
        resumeAdvice += 'Showcase your projects on your resume and LinkedIn.\n';
      }
    }

    // Recommend jobs (local search)
    let recommendedJobs: Job[] = [];
    try {
      recommendedJobs = await searchJobs('', { skills: portfolioData.skills });
    } catch {}
    const topJobs = recommendedJobs.slice(0, 5);

    // Build the report
    let report = '---\n';
    report += '🌟 Portfolio Strengths:\n';
    report += strengths.length ? strengths.map(s => '- ' + s).join('\n') : '- Add more content to your portfolio.';
    report += '\n\n⚠️ Portfolio Areas to Improve:\n';
    report += weaknesses.length ? weaknesses.map(w => '- ' + w).join('\n') : '- Your portfolio is well-rounded!';
    report += '\n\n💡 Portfolio Career Advice:\n' + advice;
    if (resumeData) {
      report += '\n\n🌟 Resume Strengths:\n';
      report += resumeStrengths.length ? resumeStrengths.map(s => '- ' + s).join('\n') : '- Add more content to your resume.';
      report += '\n\n⚠️ Resume Areas to Improve:\n';
      report += resumeWeaknesses.length ? resumeWeaknesses.map(w => '- ' + w).join('\n') : '- Your resume is well-rounded!';
      report += '\n\n💡 Resume Career Advice:\n' + resumeAdvice;
    }
    report += '\n\n🔎 Recommended Jobs:\n';
    if (topJobs.length) {
      report += topJobs.map(j => `- ${j.title} at ${j.company} (${j.location})`).join('\n');
    } else {
      report += 'No matching jobs found. Try adding more skills or experience.';
    }
    report += '\n---';
    toast.dismiss();
    setAIReport(report);
    setShowAIReport(true);
  };

  function handleDownloadAIReportPDF() {
    try {
      const pdf = new jsPDF('p', 'pt', 'a4');
      let y = 40;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(28);
      pdf.setTextColor(255, 99, 132);
      pdf.text('AI Feedback Report', 40, y);
      y += 30;
      // Portfolio Strengths
      pdf.setFillColor(102, 255, 178);
      pdf.roundedRect(30, y, 530, 40, 8, 8, 'F');
      pdf.setFontSize(16);
      pdf.setTextColor(0, 128, 0);
      pdf.text('🌟 Portfolio Strengths', 40, y + 25);
      y += 50;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      pdf.setTextColor(34, 139, 34);
      (AIReport.match(/🌟 Portfolio Strengths:[\s\S]*?\n\n/)?.[0].split('\n').slice(1,-1) || ['No strengths found']).forEach((line, i) => {
        pdf.text(`• ${line.replace(/^- /, '')}`, 50, y + i * 18);
      });
      y += 18 * ((AIReport.match(/🌟 Portfolio Strengths:[\s\S]*?\n\n/)?.[0].split('\n').slice(1,-1) || ['No strengths found']).length) + 10;
      // Portfolio Weaknesses
      pdf.setFillColor(255, 182, 193);
      pdf.roundedRect(30, y, 530, 40, 8, 8, 'F');
      pdf.setFontSize(16);
      pdf.setTextColor(220, 20, 60);
      pdf.text('⚠️ Portfolio Areas to Improve', 40, y + 25);
      y += 50;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      pdf.setTextColor(220, 20, 60);
      (AIReport.match(/⚠️ Portfolio Areas to Improve:[\s\S]*?\n\n/)?.[0].split('\n').slice(1,-1) || ['No weaknesses found']).forEach((line, i) => {
        pdf.text(`• ${line.replace(/^- /, '')}`, 50, y + i * 18);
      });
      y += 18 * ((AIReport.match(/⚠️ Portfolio Areas to Improve:[\s\S]*?\n\n/)?.[0].split('\n').slice(1,-1) || ['No weaknesses found']).length) + 10;
      // Portfolio Advice
      pdf.setFillColor(255, 236, 139);
      pdf.roundedRect(30, y, 530, 40, 8, 8, 'F');
      pdf.setFontSize(16);
      pdf.setTextColor(255, 140, 0);
      pdf.text('💡 Portfolio Career Advice', 40, y + 25);
      y += 50;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      pdf.setTextColor(255, 140, 0);
      pdf.text((AIReport.match(/💡 Portfolio Career Advice:[\s\S]*?(?=\n\n|$)/)?.[0].replace('💡 Portfolio Career Advice:\n', '') || 'No advice found'), 50, y, { maxWidth: 500 });
      y += 40;
      // Resume Strengths
      if (AIReport.includes('🌟 Resume Strengths:')) {
        pdf.setFillColor(173, 216, 230);
        pdf.roundedRect(30, y, 530, 40, 8, 8, 'F');
        pdf.setFontSize(16);
        pdf.setTextColor(0, 0, 255);
        pdf.text('🌟 Resume Strengths', 40, y + 25);
        y += 50;
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 205);
        (AIReport.match(/🌟 Resume Strengths:[\s\S]*?\n\n/)?.[0].split('\n').slice(1,-1) || ['No strengths found']).forEach((line, i) => {
          pdf.text(`• ${line.replace(/^- /, '')}`, 50, y + i * 18);
        });
        y += 18 * ((AIReport.match(/🌟 Resume Strengths:[\s\S]*?\n\n/)?.[0].split('\n').slice(1,-1) || ['No strengths found']).length) + 10;
      }
      // Resume Weaknesses
      if (AIReport.includes('⚠️ Resume Areas to Improve:')) {
        pdf.setFillColor(255, 192, 203);
        pdf.roundedRect(30, y, 530, 40, 8, 8, 'F');
        pdf.setFontSize(16);
        pdf.setTextColor(255, 20, 147);
        pdf.text('⚠️ Resume Areas to Improve', 40, y + 25);
        y += 50;
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(12);
        pdf.setTextColor(255, 20, 147);
        (AIReport.match(/⚠️ Resume Areas to Improve:[\s\S]*?\n\n/)?.[0].split('\n').slice(1,-1) || ['No weaknesses found']).forEach((line, i) => {
          pdf.text(`• ${line.replace(/^- /, '')}`, 50, y + i * 18);
        });
        y += 18 * ((AIReport.match(/⚠️ Resume Areas to Improve:[\s\S]*?\n\n/)?.[0].split('\n').slice(1,-1) || ['No weaknesses found']).length) + 10;
      }
      // Resume Advice
      if (AIReport.includes('💡 Resume Career Advice:')) {
        pdf.setFillColor(255, 218, 185);
        pdf.roundedRect(30, y, 530, 40, 8, 8, 'F');
        pdf.setFontSize(16);
        pdf.setTextColor(255, 140, 0);
        pdf.text('💡 Resume Career Advice', 40, y + 25);
        y += 50;
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(12);
        pdf.setTextColor(255, 140, 0);
        pdf.text((AIReport.match(/💡 Resume Career Advice:[\s\S]*?(?=\n\n|$)/)?.[0].replace('💡 Resume Career Advice:\n', '') || 'No advice found'), 50, y, { maxWidth: 500 });
        y += 40;
      }
      // Recommended Jobs
      pdf.setFillColor(216, 191, 216);
      pdf.roundedRect(30, y, 530, 40, 8, 8, 'F');
      pdf.setFontSize(16);
      pdf.setTextColor(128, 0, 128);
      pdf.text('🔎 Recommended Jobs', 40, y + 25);
      y += 50;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      pdf.setTextColor(128, 0, 128);
      (AIReport.match(/🔎 Recommended Jobs:[\s\S]*?(?=---|$)/)?.[0].split('\n').slice(1) || ['No jobs found']).forEach((line, i) => {
        pdf.text(`• ${line.replace(/^- /, '')}`, 50, y + i * 18);
      });
      y += 18 * ((AIReport.match(/🔎 Recommended Jobs:[\s\S]*?(?=---|$)/)?.[0].split('\n').slice(1) || ['No jobs found']).length) + 10;
      pdf.save('AI_Feedback_Report.pdf');
      toast.success('AI Feedback PDF downloaded!');
    } catch (err) {
      toast.error('Failed to generate PDF.');
    }
  }

  return (
    <section id="portfolio" className="py-20 bg-white dark:bg-gray-900">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 px-4 py-2 rounded-full text-sm font-medium text-purple-800 dark:text-purple-200 border border-purple-200/50 dark:border-purple-700/50 mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>Portfolio Generator</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Showcase Your Work with a
            <span className="gradient-text"> Stunning Portfolio</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Create a professional portfolio website that highlights your projects, skills, and achievements. 
            Automatically generated and hosted for free.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadResumeData}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all shadow-lg"
          >
            <Download className="w-5 h-5" />
            <span>Load Resume Data</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAIFeedback}
            className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg"
          >
            <Sparkles className="w-5 h-5" />
            <span>AI Feedback</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePreviewPortfolio}
            className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-all shadow-lg"
          >
            <Eye className="w-5 h-5" />
            <span>Preview Portfolio</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGeneratePortfolio}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Generate Portfolio</span>
          </motion.button>
        </motion.div>

        {/* Template Selection */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Choose Your Template
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setSelectedTemplate(template.id);
                  toast.success(`${template.name} template selected!`);
                }}
                className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
                  selectedTemplate === template.id 
                    ? 'ring-4 ring-blue-500 shadow-2xl' 
                    : 'shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Template Preview */}
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                  <img 
                    src={template.image} 
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-80`} />
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <Globe className="w-8 h-8" />
                      </div>
                      <h4 className="text-xl font-bold mb-2">{template.name}</h4>
                      <p className="text-sm opacity-90">{template.description}</p>
                    </div>
                  </div>
                  
                  {/* Selected Indicator */}
                  {selectedTemplate === template.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-6 bg-white dark:bg-gray-800">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {template.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {template.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Live Preview */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Live Preview - {templates[selectedTemplate].name}
            </h3>
            {/* Device Selector */}
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              {[
                { device: 'desktop' as const, icon: Monitor },
                { device: 'tablet' as const, icon: Tablet },
                { device: 'mobile' as const, icon: Smartphone }
              ].map(({ device, icon: Icon }) => (
                <button
                  key={device}
                  onClick={() => setPreviewDevice(device)}
                  className={`p-2 rounded-md transition-all ${
                    previewDevice === device
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <div className={`${getDeviceClasses()} bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300`}>
              <iframe
                srcDoc={generateGitHubPages(portfolioData, ['cyberpunk', 'holographic', 'quantum'][selectedTemplate])}
                className="w-full h-full border-0"
                title="Portfolio Live Preview"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {portfolioFeatures.map((feature, index) => (
            <motion.button
              key={index}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl focus:outline-none"
              onClick={feature.onClick}
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </motion.button>
          ))}
        </div>

        {/* GitHub Pages Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            How to Deploy on GitHub Pages
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: 1,
                title: "Generate Portfolio",
                description: "Click 'Generate Portfolio' to download your HTML file",
                icon: Download
              },
              {
                step: 2,
                title: "Create Repository",
                description: "Create a new GitHub repository named 'your-portfolio'",
                icon: Github
              },
              {
                step: 3,
                title: "Deploy & Share",
                description: "Upload the HTML file and enable GitHub Pages in settings",
                icon: Globe
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {item.step}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGeneratePortfolio}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Generate My Portfolio Now</span>
          </motion.button>
          
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Your portfolio will be ready in seconds! Perfect for job applications and networking.
          </p>
        </motion.div>
      </div>

      {/* Feature Modals */}
      {modal === 'domain' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative">
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              <span aria-hidden>×</span>
            </button>
            <h2 className="text-2xl font-bold mb-4">How to Set Up a Custom Domain</h2>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Purchase a domain from a provider (e.g., Namecheap, GoDaddy, Google Domains).</li>
              <li>Deploy your portfolio to GitHub Pages or Netlify.</li>
              <li>Follow the provider's instructions to point your domain to your portfolio (CNAME or A record).</li>
              <li>For GitHub Pages, add a <code>CNAME</code> file to your repo with your domain name.</li>
              <li>Wait for DNS propagation, then enjoy your custom domain!</li>
            </ol>
            <a href="https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-blue-600 hover:underline">Read more in GitHub Pages Docs</a>
          </div>
        </div>
      )}
      {modal === 'github' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative">
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              <span aria-hidden>×</span>
            </button>
            <h2 className="text-2xl font-bold mb-4">Deploy to GitHub Pages</h2>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Generate your portfolio HTML file.</li>
              <li>Create a new GitHub repository (e.g., <code>yourname-portfolio</code>).</li>
              <li>Upload the HTML file as <code>index.html</code> to the repo.</li>
              <li>Go to Settings &gt; Pages and select the <code>main</code> branch.</li>
              <li>Your site will be live at <code>https://yourusername.github.io/yourname-portfolio</code>.</li>
            </ol>
            <a href="https://pages.github.com/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-blue-600 hover:underline">GitHub Pages Docs</a>
          </div>
        </div>
      )}
      {modal === 'seo' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative">
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              <span aria-hidden>×</span>
            </button>
            <h2 className="text-2xl font-bold mb-4">SEO Optimization</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Semantic HTML structure for better search engine understanding.</li>
              <li>Meta tags for title, description, and social sharing.</li>
              <li>Fast loading and mobile-friendly design.</li>
              <li>Customizable URLs and content for better discoverability.</li>
            </ul>
            <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-blue-600 hover:underline">Learn SEO Best Practices</a>
          </div>
        </div>
      )}
      {modal === 'customize' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative">
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              <span aria-hidden>×</span>
            </button>
            <h2 className="text-2xl font-bold mb-4">Customize Your Portfolio</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Choose from multiple templates and color themes.</li>
              <li>Edit your content, skills, and projects.</li>
              <li>Preview changes live before publishing.</li>
            </ul>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Go to the template selector above to start customizing!</p>
          </div>
        </div>
      )}
      {/* AI Feedback Modal */}
      {showAIReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative max-h-[80vh] overflow-y-auto">
            <button onClick={() => setShowAIReport(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              <span aria-hidden>×</span>
            </button>
            <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-yellow-400" /> AI Feedback Report
            </h2>
            <div className="space-y-6">
              {/* Portfolio Strengths */}
              <div className="rounded-xl p-4 bg-gradient-to-r from-green-100 to-green-300 dark:from-green-900/40 dark:to-green-700/40 border-l-8 border-green-400 flex gap-3 items-start">
                <span className="mt-1"><Sparkles className="w-6 h-6 text-green-500" /></span>
                <div>
                  <h3 className="font-bold text-lg text-green-800 dark:text-green-200 mb-1">Portfolio Strengths</h3>
                  <ul className="list-disc pl-5 text-green-900 dark:text-green-100">
                    {AIReport.match(/🌟 Portfolio Strengths:[\s\S]*?\n\n/)?.[0].split('\n').slice(1,-1).map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                  </ul>
                </div>
              </div>
              {/* Portfolio Weaknesses */}
              <div className="rounded-xl p-4 bg-gradient-to-r from-red-100 to-pink-200 dark:from-red-900/40 dark:to-pink-900/40 border-l-8 border-red-400 flex gap-3 items-start">
                <span className="mt-1"><Sparkles className="w-6 h-6 text-red-500" /></span>
                <div>
                  <h3 className="font-bold text-lg text-red-800 dark:text-red-200 mb-1">Portfolio Areas to Improve</h3>
                  <ul className="list-disc pl-5 text-red-900 dark:text-red-100">
                    {AIReport.match(/⚠️ Portfolio Areas to Improve:[\s\S]*?\n\n/)?.[0].split('\n').slice(1,-1).map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                  </ul>
                </div>
              </div>
              {/* Portfolio Advice */}
              <div className="rounded-xl p-4 bg-gradient-to-r from-yellow-100 to-orange-200 dark:from-yellow-900/40 dark:to-orange-900/40 border-l-8 border-yellow-400 flex gap-3 items-start">
                <span className="mt-1"><Sparkles className="w-6 h-6 text-yellow-500" /></span>
                <div>
                  <h3 className="font-bold text-lg text-yellow-800 dark:text-yellow-200 mb-1">Portfolio Career Advice</h3>
                  <p className="text-yellow-900 dark:text-yellow-100 whitespace-pre-line">{AIReport.match(/💡 Portfolio Career Advice:[\s\S]*?(?=\n\n|$)/)?.[0].replace('💡 Portfolio Career Advice:\n', '')}</p>
                </div>
              </div>
              {/* Resume Sections (if present) */}
              {AIReport.includes('🌟 Resume Strengths:') && (
                <div className="rounded-xl p-4 bg-gradient-to-r from-blue-100 to-cyan-200 dark:from-blue-900/40 dark:to-cyan-900/40 border-l-8 border-blue-400 flex gap-3 items-start">
                  <span className="mt-1"><Sparkles className="w-6 h-6 text-blue-500" /></span>
                  <div>
                    <h3 className="font-bold text-lg text-blue-800 dark:text-blue-200 mb-1">Resume Strengths</h3>
                    <ul className="list-disc pl-5 text-blue-900 dark:text-blue-100">
                      {AIReport.match(/🌟 Resume Strengths:[\s\S]*?\n\n/)?.[0].split('\n').slice(1,-1).map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                    </ul>
                  </div>
                </div>
              )}
              {AIReport.includes('⚠️ Resume Areas to Improve:') && (
                <div className="rounded-xl p-4 bg-gradient-to-r from-pink-100 to-purple-200 dark:from-pink-900/40 dark:to-purple-900/40 border-l-8 border-pink-400 flex gap-3 items-start">
                  <span className="mt-1"><Sparkles className="w-6 h-6 text-pink-500" /></span>
                  <div>
                    <h3 className="font-bold text-lg text-pink-800 dark:text-pink-200 mb-1">Resume Areas to Improve</h3>
                    <ul className="list-disc pl-5 text-pink-900 dark:text-pink-100">
                      {AIReport.match(/⚠️ Resume Areas to Improve:[\s\S]*?\n\n/)?.[0].split('\n').slice(1,-1).map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                    </ul>
                  </div>
                </div>
              )}
              {AIReport.includes('💡 Resume Career Advice:') && (
                <div className="rounded-xl p-4 bg-gradient-to-r from-orange-100 to-yellow-200 dark:from-orange-900/40 dark:to-yellow-900/40 border-l-8 border-orange-400 flex gap-3 items-start">
                  <span className="mt-1"><Sparkles className="w-6 h-6 text-orange-500" /></span>
                  <div>
                    <h3 className="font-bold text-lg text-orange-800 dark:text-orange-200 mb-1">Resume Career Advice</h3>
                    <p className="text-orange-900 dark:text-orange-100 whitespace-pre-line">{AIReport.match(/💡 Resume Career Advice:[\s\S]*?(?=\n\n|$)/)?.[0].replace('💡 Resume Career Advice:\n', '')}</p>
                  </div>
                </div>
              )}
              {/* Recommended Jobs */}
              <div className="rounded-xl p-4 bg-gradient-to-r from-purple-100 to-pink-200 dark:from-purple-900/40 dark:to-pink-900/40 border-l-8 border-purple-400 flex gap-3 items-start">
                <span className="mt-1"><Sparkles className="w-6 h-6 text-purple-500" /></span>
                <div>
                  <h3 className="font-bold text-lg text-purple-800 dark:text-purple-200 mb-1">Recommended Jobs</h3>
                  <ul className="list-disc pl-5 text-purple-900 dark:text-purple-100">
                    {AIReport.match(/🔎 Recommended Jobs:[\s\S]*?(?=---|$)/)?.[0].split('\n').slice(1).map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button
                onClick={handleDownloadAIReportPDF}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all flex items-center gap-2"
              >
                <Download className="w-5 h-5" /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
