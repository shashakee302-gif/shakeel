export interface ResumeTemplate {
  id: string;
  name: string;
  category: 'modern' | 'classic' | 'creative' | 'executive' | 'technical' | 'minimalist' | 'artistic' | 'corporate' | 'startup' | 'academic';
  atsScore: number;
  preview: string;
  description: string;
  features: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  };
  layout: 'single-column' | 'two-column' | 'three-column' | 'sidebar' | 'header-focus' | 'timeline' | 'grid' | 'asymmetric' | 'modular' | 'circular' | 'zigzag' | 'overlap';
  typography: {
    headingFont: string;
    bodyFont: string;
    fontSize: string;
  };
  // AI Analysis properties
  overallRating: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  jobMatches: string[];
  skillGaps: string[];
  industryTrends: string[];
  salaryInsights: string;
  keywords: string[];
}

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'quantum-matrix',
    name: 'Quantum Matrix',
    category: 'technical',
    atsScore: 96,
    preview: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Grid-based technical resume with circuit-inspired design elements',
    features: ['Modular Grid System', 'Tech-inspired Visuals', 'Data-Focused Layout', 'Dynamic Sections'],
    colors: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#10B981',
      text: '#1F2937',
      background: '#F3F4F6'
    },
    layout: 'modular',
    typography: {
      headingFont: 'Rajdhani',
      bodyFont: 'Exo 2',
      fontSize: 'small'
    },
    overallRating: 9.1,
    strengths: ['Excellent for technical roles', 'Modern data presentation', 'High ATS compatibility', 'Structured information flow'],
    weaknesses: ['Too technical for creative roles', 'May overwhelm non-technical recruiters'],
    suggestions: ['Focus on technical achievements', 'Include specific technologies and frameworks'],
    jobMatches: ['Software Developer', 'Data Scientist', 'Systems Engineer', 'DevOps Specialist'],
    skillGaps: ['Soft skills presentation', 'Creative storytelling'],
    industryTrends: ['Technical specialization', 'Data-driven hiring', 'Skill-based assessment'],
    salaryInsights: 'Tech roles: $95K - $180K depending on specialization and experience',
    keywords: ['Technology', 'Development', 'Engineering', 'Data', 'Systems']
  },
  {
    id: 'vintage-parchment',
    name: 'Vintage Parchment',
    category: 'classic',
    atsScore: 99,
    preview: 'https://images.pexels.com/photos/235985/pexels-photo-235985.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Elegant traditional design with paper texture and classic typography',
    features: ['Paper Texture Background', 'Classic Serif Fonts', 'Traditional Layout', 'Timeless Design'],
    colors: {
      primary: '#8B5A2B',
      secondary: '#654321',
      accent: '#D2B48C',
      text: '#2F4F4F',
      background: '#FDF5E6'
    },
    layout: 'single-column',
    typography: {
      headingFont: 'Garamond',
      bodyFont: 'Book Antiqua',
      fontSize: 'medium'
    },
    overallRating: 9.6,
    strengths: ['Universal acceptance', 'Excellent ATS performance', 'Professional appearance', 'Timeless design'],
    weaknesses: ['May appear outdated for tech roles', 'Limited visual creativity'],
    suggestions: ['Focus on content quality', 'Use traditional section organization'],
    jobMatches: ['Lawyer', 'Academic', 'Government Official', 'Finance Professional'],
    skillGaps: ['Modern tech skills', 'Digital presentation'],
    industryTrends: ['Traditional professionalism', 'Content-focused evaluation'],
    salaryInsights: 'Traditional professions: $85K - $160K for experienced roles',
    keywords: ['Professional', 'Traditional', 'Experienced', 'Established', 'Reliable']
  },
  {
    id: 'neo-abstract',
    name: 'Neo Abstract',
    category: 'creative',
    atsScore: 87,
    preview: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Artistic design with abstract shapes and unconventional layout',
    features: ['Abstract Design Elements', 'Non-linear Layout', 'Creative Typography', 'Visual Impact'],
    colors: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      accent: '#FFE66D',
      text: '#2D3748',
      background: '#F7F9FC'
    },
    layout: 'asymmetric',
    typography: {
      headingFont: 'Comfortaa',
      bodyFont: 'Nunito',
      fontSize: 'medium'
    },
    overallRating: 8.4,
    strengths: ['High visual impact', 'Memorable design', 'Perfect for creative fields', 'Stands out from traditional resumes'],
    weaknesses: ['Poor ATS performance', 'Not suitable for conservative industries'],
    suggestions: ['Use for portfolio applications', 'Supplement with traditional resume for ATS systems'],
    jobMatches: ['Graphic Designer', 'Art Director', 'Creative Director', 'UX Designer'],
    skillGaps: ['Traditional business presentation', 'Corporate communication'],
    industryTrends: ['Visual storytelling', 'Creative personal branding', 'Design-forward applications'],
    salaryInsights: 'Creative roles: $70K - $130K depending on experience and industry',
    keywords: ['Creative', 'Design', 'Art', 'Visual', 'Innovation']
  },
  {
    id: 'executive-summit',
    name: 'Executive Summit',
    category: 'executive',
    atsScore: 98,
    preview: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Prestigious design with gold accents and hierarchical information structure',
    features: ['Premium Finishes', 'Executive Summary Focus', 'Leadership Emphasis', 'Strategic Layout'],
    colors: {
      primary: '#0F172A',
      secondary: '#1E293B',
      accent: '#B8860B',
      text: '#1F2937',
      background: '#FFFFFF'
    },
    layout: 'header-focus',
    typography: {
      headingFont: 'Playfair Display',
      bodyFont: 'Lora',
      fontSize: 'large'
    },
    overallRating: 9.5,
    strengths: ['Executive presence', 'High-impact leadership presentation', 'Excellent ATS performance', 'Strategic emphasis'],
    weaknesses: ['Overqualified appearance for junior roles', 'Too formal for some industries'],
    suggestions: ['Focus on strategic achievements', 'Highlight board-level experience and leadership impact'],
    jobMatches: ['CEO', 'CFO', 'CTO', 'VP Positions', 'Board Members'],
    skillGaps: ['Operational hands-on skills', 'Technical implementation experience'],
    industryTrends: ['Executive branding', 'Strategic leadership emphasis', 'C-level personal presentation'],
    salaryInsights: 'Executive roles: $180K - $500K+ depending on company size and industry',
    keywords: ['Executive', 'Leadership', 'Strategy', 'Board', 'Governance']
  },
  {
    id: 'cyber-circuit',
    name: 'Cyber Circuit',
    category: 'technical',
    atsScore: 95,
    preview: 'https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Futuristic cyber-inspired design with circuit patterns and tech aesthetics',
    features: ['Circuit Pattern Elements', 'Tech Visuals', 'Modern Data Presentation', 'Innovative Layout'],
    colors: {
      primary: '#00FF87',
      secondary: '#007BFF',
      accent: '#FF073A',
      text: '#E0E0E0',
      background: '#0A0A0A'
    },
    layout: 'grid',
    typography: {
      headingFont: 'Orbitron',
      bodyFont: 'Share Tech Mono',
      fontSize: 'medium'
    },
    overallRating: 9.0,
    strengths: ['Perfect for tech and engineering roles', 'Modern innovative appearance', 'High visual impact for technical recruiters'],
    weaknesses: ['Too futuristic for traditional roles', 'May not appeal to non-technical hiring managers'],
    suggestions: ['Highlight technical projects and achievements', 'Include specific technologies and platforms'],
    jobMatches: ['Cybersecurity Specialist', 'AI Engineer', 'Software Developer', 'Systems Architect'],
    skillGaps: ['Traditional business communication', 'Non-technical stakeholder presentation'],
    industryTrends: ['Cybersecurity focus', 'Tech specialization', 'Future-ready skills'],
    salaryInsights: 'Tech security roles: $110K - $200K depending on specialization and experience',
    keywords: ['Technology', 'Security', 'Innovation', 'Engineering', 'Future']
  },
  {
    id: 'pure-essence',
    name: 'Pure Essence',
    category: 'minimalist',
    atsScore: 99,
    preview: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Ultra-minimalist design with extreme whitespace and essential information only',
    features: ['Maximum Whitespace', 'Essential Information Only', 'Clean Typography', 'Content Focus'],
    colors: {
      primary: '#2D3748',
      secondary: '#4A5568',
      accent: '#718096',
      text: '#1A202C',
      background: '#FFFFFF'
    },
    layout: 'single-column',
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      fontSize: 'medium'
    },
    overallRating: 9.4,
    strengths: ['Perfect ATS compatibility', 'Exceptional readability', 'Universal appeal', 'Professional simplicity'],
    weaknesses: ['May appear too simple for creative roles', 'Limited visual personality'],
    suggestions: ['Focus on high-quality content and achievements', 'Use precise, impactful language'],
    jobMatches: ['UX Researcher', 'Content Strategist', 'Analyst', 'Project Coordinator'],
    skillGaps: ['Visual presentation skills', 'Creative design ability'],
    industryTrends: ['Minimalist design', 'Content-focused resumes', 'Clean aesthetic'],
    salaryInsights: 'Analytical roles: $80K - $140K depending on experience and industry',
    keywords: ['Minimal', 'Clean', 'Content', 'Analysis', 'Precision']
  },
  {
    id: 'artisan-handcrafted',
    name: 'Artisan Handcrafted',
    category: 'artistic',
    atsScore: 85,
    preview: 'https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Handcrafted aesthetic with artisanal details and organic textures',
    features: ['Handcrafted Visual Elements', 'Textured Backgrounds', 'Artistic Layout', 'Creative Expression'],
    colors: {
      primary: '#B45309',
      secondary: '#78350F',
      accent: '#F59E0B',
      text: '#1F2937',
      background: '#FFFBEB'
    },
    layout: 'asymmetric',
    typography: {
      headingFont: 'Cormorant Garamond',
      bodyFont: 'Crimson Text',
      fontSize: 'medium'
    },
    overallRating: 8.3,
    strengths: ['Unique artistic expression', 'Memorable design', 'Perfect for creative fields', 'Handcrafted appeal'],
    weaknesses: ['Poor ATS performance', 'Not suitable for traditional industries'],
    suggestions: ['Use primarily for portfolio applications', 'Supplement with traditional resume for ATS systems'],
    jobMatches: ['Artisan', 'Craft Specialist', 'Creative Entrepreneur', 'Design Artist'],
    skillGaps: ['Digital skills', 'Corporate experience'],
    industryTrends: ['Handmade aesthetic', 'Artisanal craftsmanship', 'Unique personal branding'],
    salaryInsights: 'Creative arts: $50K - $90K depending on niche and reputation',
    keywords: ['Artisan', 'Craft', 'Creative', 'Handmade', 'Unique']
  },
  {
    id: 'corporate-tower',
    name: 'Corporate Tower',
    category: 'corporate',
    atsScore: 97,
    preview: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Professional corporate design with architectural elements and business focus',
    features: ['Architectural Visual Elements', 'Business Focus', 'Corporate Branding', 'Strategic Layout'],
    colors: {
      primary: '#1E40AF',
      secondary: '#3730A3',
      accent: '#6366F1',
      text: '#1F2937',
      background: '#FFFFFF'
    },
    layout: 'two-column',
    typography: {
      headingFont: 'Calibri',
      bodyFont: 'Arial',
      fontSize: 'medium'
    },
    overallRating: 9.3,
    strengths: ['Excellent corporate appeal', 'Strong ATS performance', 'Professional network emphasis', 'Business-focused'],
    weaknesses: ['Too corporate for creative roles', 'Limited personal expression'],
    suggestions: ['Highlight business achievements and corporate experience', 'Focus on leadership and management skills'],
    jobMatches: ['Business Manager', 'Corporate Director', 'Strategy Consultant', 'Operations Lead'],
    skillGaps: ['Entrepreneurial experience', 'Startup environment familiarity'],
    industryTrends: ['Corporate networking', 'Business leadership', 'Strategic management'],
    salaryInsights: 'Corporate roles: $90K - $180K depending on level and company',
    keywords: ['Corporate', 'Business', 'Management', 'Strategy', 'Leadership']
  },
  {
    id: 'startup-velocity',
    name: 'Startup Velocity',
    category: 'startup',
    atsScore: 93,
    preview: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Dynamic startup template with motion elements and growth-focused design',
    features: ['Motion Design Elements', 'Growth Metrics Focus', 'Innovation Emphasis', 'Modern Startup Aesthetic'],
    colors: {
      primary: '#DC2626',
      secondary: '#7C2D12',
      accent: '#EA580C',
      text: '#1F2937',
      background: '#FFF7ED'
    },
    layout: 'zigzag',
    typography: {
      headingFont: 'SF Pro Display',
      bodyFont: 'SF Pro Text',
      fontSize: 'medium'
    },
    overallRating: 8.9,
    strengths: ['Perfect for startup culture', 'Modern innovative appearance', 'Growth-focused design', 'Good ATS performance'],
    weaknesses: ['Too casual for corporate roles', 'May not appeal to traditional industries'],
    suggestions: ['Highlight growth achievements and innovation', 'Focus on metrics and impact'],
    jobMatches: ['Startup Founder', 'Growth Hacker', 'Product Manager', 'Innovation Lead'],
    skillGaps: ['Corporate experience', 'Traditional industry knowledge'],
    industryTrends: ['Startup culture', 'Growth mindset', 'Innovation focus'],
    salaryInsights: 'Startup roles: $80K - $150K plus equity potential',
    keywords: ['Startup', 'Growth', 'Innovation', 'Venture', 'Disruption']
  },
  {
    id: 'academic-thesis',
    name: 'Academic Thesis',
    category: 'academic',
    atsScore: 98,
    preview: 'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Research-focused template with academic rigor and publication emphasis',
    features: ['Publication Highlight System', 'Research Focus', 'Academic Credentials', 'Precision Layout'],
    colors: {
      primary: '#334155',
      secondary: '#1E293B',
      accent: '#64748B',
      text: '#1F2937',
      background: '#FFFFFF'
    },
    layout: 'two-column',
    typography: {
      headingFont: 'Times New Roman',
      bodyFont: 'Georgia',
      fontSize: 'medium'
    },
    overallRating: 9.5,
    strengths: ['Perfect for academic applications', 'Excellent publication display', 'High ATS compatibility', 'Professional academic appearance'],
    weaknesses: ['Too formal for industry roles', 'Limited creative expression'],
    suggestions: ['Focus on research achievements and publications', 'Highlight academic credentials'],
    jobMatches: ['Research Scientist', 'Professor', 'Academic Researcher', 'Postdoctoral Fellow'],
    skillGaps: ['Industry application experience', 'Commercialization knowledge'],
    industryTrends: ['Academic research', 'Publication emphasis', 'Research impact'],
    salaryInsights: 'Academic roles: $70K - $130K depending on institution and field',
    keywords: ['Research', 'Academic', 'Publication', 'Analysis', 'Science']
  },
  {
    id: 'future-dimension',
    name: 'Future Dimension',
    category: 'modern',
    atsScore: 94,
    preview: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Holographic futuristic design with 3D elements and innovative layout',
    features: ['3D Design Elements', 'Holographic Effects', 'Future Tech Focus', 'Innovative Layout'],
    colors: {
      primary: '#8B5CF6',
      secondary: '#6D28D9',
      accent: '#A78BFA',
      text: '#1F2937',
      background: '#F5F3FF'
    },
    layout: 'overlap',
    typography: {
      headingFont: 'Exo 2',
      bodyFont: 'Ubuntu',
      fontSize: 'medium'
    },
    overallRating: 8.8,
    strengths: ['Modern innovative appearance', 'Excellent for tech and future-focused roles', 'Good ATS performance', 'Progressive design'],
    weaknesses: ['Too futuristic for traditional roles', 'May not appeal to conservative industries'],
    suggestions: ['Highlight innovation and future-focused skills', 'Emphasize adaptability and learning ability'],
    jobMatches: ['Futurist', 'Innovation Consultant', 'Tech Strategist', 'Digital Transformation Lead'],
    skillGaps: ['Traditional industry experience', 'Legacy system knowledge'],
    industryTrends: ['Future-focused skills', 'Innovation capability', 'Adaptability emphasis'],
    salaryInsights: 'Future-focused roles: $100K - $180K depending on specialization',
    keywords: ['Future', 'Innovation', 'Technology', 'Strategy', 'Transformation']
  },
  {
    id: 'heritage-manuscript',
    name: 'Heritage Manuscript',
    category: 'classic',
    atsScore: 99,
    preview: 'https://images.pexels.com/photos/4596881/pexels-photo-4596881.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Antique-inspired design with manuscript elements and traditional elegance',
    features: ['Manuscript Styling', 'Heritage Design Elements', 'Classic Layout', 'Elegant Typography'],
    colors: {
      primary: '#5C4033',
      secondary: '#800020',
      accent: '#C19A6B',
      text: '#321414',
      background: '#F8F0E3'
    },
    layout: 'single-column',
    typography: {
      headingFont: 'Cinzel',
      bodyFont: 'Cormorant',
      fontSize: 'medium'
    },
    overallRating: 9.6,
    strengths: ['Universal professional appeal', 'Highest ATS compatibility', 'Timeless elegance', 'Industry standard'],
    weaknesses: ['Too traditional for creative roles', 'Limited modern appeal'],
    suggestions: ['Focus on proven experience and stable career progression', 'Emphasize reliability and expertise'],
    jobMatches: ['Historian', 'Archivist', 'Museum Curator', 'Traditional Craftsman'],
    skillGaps: ['Modern digital skills', 'Innovation experience'],
    industryTrends: ['Traditional values', 'Proven experience', 'Stability and reliability'],
    salaryInsights: 'Traditional professions: $60K - $120K depending on field and experience',
    keywords: ['Traditional', 'Heritage', 'Expertise', 'Reliability', 'History']
  }
];

export const getTemplatesByCategory = (category: string) => {
  return resumeTemplates.filter(template => template.category === category);
};

export const getTemplateById = (id: string) => {
  return resumeTemplates.find(template => template.id === id);
};

export const getHighestATSTemplates = (limit: number = 10) => {
  return resumeTemplates
    .sort((a, b) => b.atsScore - a.atsScore)
    .slice(0, limit);
};

export const getTemplatesByAtsScore = (minScore: number = 90) => {
  return resumeTemplates.filter(template => template.atsScore >= minScore);
};

export const searchTemplates = (query: string) => {
  const searchTerm = query.toLowerCase();
  return resumeTemplates.filter(template => 
    template.name.toLowerCase().includes(searchTerm) ||
    template.description.toLowerCase().includes(searchTerm) ||
    template.category.toLowerCase().includes(searchTerm) ||
    template.features.some(feature => feature.toLowerCase().includes(searchTerm))
  );
};
