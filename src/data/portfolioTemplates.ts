export interface PortfolioTemplate {
  id: string;
  name: string;
  category:
    | 'modern'
    | 'creative'
    | 'developer'
    | 'business'
    | 'minimal'
    | 'artistic'
    | 'corporate'
    | 'startup'
    | 'academic'
    | 'futuristic';
  preview: string;
  description: string;
  features: string[];
  technologies: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  layout:
    | 'single-page'
    | 'multi-section'
    | 'parallax'
    | 'grid'
    | 'masonry'
    | 'timeline'
    | 'card-based'
    | 'split-screen';
  animations: string[];
  seoOptimized: boolean;
}

export const portfolioTemplates: PortfolioTemplate[] = [
  // ... existing templates ...

  // ------------------------- Template 4: Modern Minimal -------------------------
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    category: 'modern',
    preview: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    description: 'A clean, professional portfolio with elegant typography and spacious layout. Focuses on content hierarchy and readability.',
    features: [
      'Dark/Light Mode Toggle',
      'Smooth Scroll Navigation',
      'Content-Focused Layout',
      'Elegant Typography',
      'Mobile-First Responsive Design'
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    colors: {
      primary: '#2563EB',
      secondary: '#64748B',
      accent: '#0EA5E9',
      background: '#FFFFFF',
      text: '#1E293B'
    },
    layout: 'single-page',
    animations: ['Smooth Scroll', 'Fade-in Sections', 'Subtle Transitions'],
    seoOptimized: true,
  },

  // ------------------------- Template 5: Creative Canvas -------------------------
  {
    id: 'creative-canvas',
    name: 'Creative Canvas',
    category: 'artistic',
    preview: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&h=300&fit=crop',
    description: 'An artistic portfolio with bold visual elements and interactive experiences. Perfect for designers and creatives.',
    features: [
      'Interactive Canvas Elements',
      'Scroll-Triggered Animations',
      'Custom Cursor Design',
      'Dynamic Color Transitions',
      'Immersive Project Showcase'
    ],
    technologies: ['React', 'Three.js', 'GSAP', 'Styled Components'],
    colors: {
      primary: '#FF3B30',
      secondary: '#5856D6',
      accent: '#FFCC00',
      background: '#000000',
      text: '#FFFFFF'
    },
    layout: 'parallax',
    animations: ['Parallax Scrolling', 'Element Transformations', 'Path Animations'],
    seoOptimized: true,
  },

  // ------------------------- Template 6: CodeCraft Developer -------------------------
  {
    id: 'codecraft-dev',
    name: 'CodeCraft Developer',
    category: 'developer',
    preview: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=300&fit=crop',
    description: 'A technical portfolio showcasing code expertise with interactive elements and live code demonstrations.',
    features: [
      'Live Code Demos',
      'Interactive Terminal',
      'GitHub Integration',
      'Technical Blog Section',
      'Skill Proficiency Charts'
    ],
    technologies: ['React', 'MDX', 'Prism.js', 'Chart.js'],
    colors: {
      primary: '#00C2A8',
      secondary: '#6A57A5',
      accent: '#FF6B6B',
      background: '#0D1117',
      text: '#E6EDF3'
    },
    layout: 'split-screen',
    animations: ['Terminal Typing', 'Code Highlighting', 'Graph Animations'],
    seoOptimized: true,
  },
];

// ------------------------- Utility Functions -------------------------
export const getPortfolioTemplateById = (id: string) => {
  return portfolioTemplates.find((template) => template.id === id);
};

export const getPortfolioTemplatesByCategory = (category: string) => {
  return portfolioTemplates.filter(
    (template) => template.category === category
  );
};
