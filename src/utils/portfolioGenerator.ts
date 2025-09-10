import { saveAs } from 'file-saver';

export interface PortfolioData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    linkedin?: string;
    github?: string;
  };
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
    link?: string;
    image?: string;
  }>;
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
}

const portfolioTemplates = {
  modern: {
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    backgroundColor: '#F8FAFC',
    textColor: '#1E293B',
    cardBackground: '#FFFFFF',
    animations: 'fadeInUp, slideIn, bounce'
  },
  creative: {
    primaryColor: '#8B5CF6',
    secondaryColor: '#EC4899',
    backgroundColor: '#0F0F23',
    textColor: '#F1F5F9',
    cardBackground: '#1E1E3F',
    animations: 'morphing, colorShift, pulse'
  },
  developer: {
    primaryColor: '#10B981',
    secondaryColor: '#06B6D4',
    backgroundColor: '#111827',
    textColor: '#F9FAFB',
    cardBackground: '#1F2937',
    animations: 'typewriter, codeHighlight, matrix'
  }
};

export const generatePortfolioHTML = (data: PortfolioData, template: string = 'modern'): string => {
  const theme = portfolioTemplates[template as keyof typeof portfolioTemplates] || portfolioTemplates.modern;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personalInfo.name || 'Professional'} - Portfolio</title>
    <meta name="description" content="${data.personalInfo.name || 'Professional'} - ${data.personalInfo.summary || 'Professional Portfolio showcasing skills, projects, and experience'}">
    <meta name="keywords" content="${data.skills.join(', ')}, portfolio, ${data.personalInfo.name || 'professional'}, developer, professional">
    <meta name="author" content="${data.personalInfo.name || 'Professional'}">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="${data.personalInfo.name || 'Professional'} - Portfolio">
    <meta property="og:description" content="${data.personalInfo.summary || 'Professional Portfolio showcasing skills, projects, and experience'}">
    <meta property="og:type" content="website">
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    
    <style>
        :root {
            --primary-color: ${theme.primaryColor};
            --secondary-color: ${theme.secondaryColor};
            --background-color: ${theme.backgroundColor};
            --text-color: ${theme.textColor};
            --card-background: ${theme.cardBackground};
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            background: var(--background-color);
            color: var(--text-color);
            line-height: 1.6;
            overflow-x: hidden;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Hero Section */
        .hero {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            padding: 120px 0;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%);
        }
        
        .hero-content {
            position: relative;
            z-index: 2;
        }
        
        .hero h1 {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 800;
            margin-bottom: 1rem;
            text-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .hero .subtitle {
            font-size: clamp(1rem, 2.5vw, 1.5rem);
            opacity: 0.95;
            max-width: 600px;
            margin: 0 auto 2rem;
            line-height: 1.6;
        }
        
        .contact-links {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            flex-wrap: wrap;
            margin-top: 2rem;
        }
        
        .contact-links a {
            color: white;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50px;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            background: rgba(255,255,255,0.1);
            font-weight: 500;
        }
        
        .contact-links a:hover {
            background: rgba(255,255,255,0.2);
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        }
        
        /* Section Styling */
        .section {
            padding: 80px 0;
            position: relative;
        }
        
        .section h2 {
            font-size: clamp(2rem, 4vw, 3rem);
            font-weight: 700;
            text-align: center;
            margin-bottom: 3rem;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            position: relative;
        }
        
        .section h2::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 4px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border-radius: 2px;
        }
        
        /* Skills Grid */
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }
        
        .skill-tag {
            background: var(--card-background);
            padding: 1.5rem;
            border-radius: 15px;
            text-align: center;
            font-weight: 600;
            font-size: 1rem;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            border: 2px solid transparent;
            position: relative;
            overflow: hidden;
        }
        
        .skill-tag::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        }
        
        .skill-tag:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.15);
            border-color: var(--primary-color);
        }
        
        /* Projects Grid */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .project-card {
            background: var(--card-background);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            border: 1px solid rgba(0,0,0,0.05);
            position: relative;
            overflow: hidden;
        }
        
        .project-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        }
        
        .project-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        
        .project-card h3 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--primary-color);
        }
        
        .project-card p {
            margin-bottom: 1.5rem;
            opacity: 0.8;
            line-height: 1.6;
        }
        
        .tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
        }
        
        .tech-tag {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 0.4rem 1rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .project-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            padding: 0.6rem 1.2rem;
            border: 2px solid var(--primary-color);
            border-radius: 25px;
            background: transparent;
            font-size: 0.9rem;
        }
        
        .project-link:hover {
            background: var(--primary-color);
            color: white;
            transform: translateX(5px);
        }
        
        /* Experience Timeline */
        .experience-timeline {
            position: relative;
            margin-top: 2rem;
        }
        
        .experience-timeline::before {
            content: '';
            position: absolute;
            left: 30px;
            top: 0;
            bottom: 0;
            width: 3px;
            background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
            border-radius: 2px;
        }
        
        .experience-item {
            background: var(--card-background);
            padding: 2rem;
            border-radius: 20px;
            margin-bottom: 2rem;
            margin-left: 80px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            border-left: 4px solid var(--primary-color);
            transition: all 0.3s ease;
            position: relative;
        }
        
        .experience-item::before {
            content: '';
            position: absolute;
            left: -88px;
            top: 2rem;
            width: 16px;
            height: 16px;
            background: var(--primary-color);
            border-radius: 50%;
            border: 4px solid var(--background-color);
            box-shadow: 0 0 0 3px var(--primary-color);
        }
        
        .experience-item:hover {
            transform: translateX(10px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        }
        
        .experience-item h3 {
            font-size: 1.4rem;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 0.5rem;
        }
        
        .experience-item .company {
            font-weight: 600;
            font-size: 1.1rem;
            opacity: 0.8;
            margin-bottom: 0.5rem;
        }
        
        .experience-item .duration {
            font-size: 0.9rem;
            opacity: 0.7;
            margin-bottom: 1rem;
            padding: 0.4rem 1rem;
            background: rgba(59, 130, 246, 0.1);
            border-radius: 15px;
            display: inline-block;
            color: var(--primary-color);
            font-weight: 500;
        }
        
        .experience-item p {
            line-height: 1.6;
            opacity: 0.8;
        }
        
        /* Education Grid */
        .education-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .education-card {
            background: var(--card-background);
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            border-top: 4px solid var(--secondary-color);
            position: relative;
        }
        
        .education-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        }
        
        .education-card h3 {
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--secondary-color);
            margin-bottom: 0.5rem;
        }
        
        .education-card .institution {
            font-weight: 600;
            opacity: 0.8;
            margin-bottom: 0.5rem;
        }
        
        .education-card .year {
            font-size: 0.9rem;
            opacity: 0.7;
            color: var(--primary-color);
            font-weight: 500;
        }
        
        /* Footer */
        .footer {
            background: var(--card-background);
            padding: 4rem 0 2rem;
            text-align: center;
            margin-top: 4rem;
            border-top: 1px solid rgba(0,0,0,0.1);
        }
        
        .footer p {
            opacity: 0.7;
            margin-bottom: 1rem;
        }
        
        .footer-links {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-top: 1rem;
            flex-wrap: wrap;
        }
        
        .footer-links a {
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
            padding: 0.5rem 1rem;
            border-radius: 8px;
        }
        
        .footer-links a:hover {
            background: rgba(59, 130, 246, 0.1);
            transform: translateY(-2px);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .container { padding: 0 15px; }
            .hero { padding: 80px 0; }
            .section { padding: 60px 0; }
            .projects-grid { grid-template-columns: 1fr; }
            .education-grid { grid-template-columns: 1fr; }
            .skills-grid { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }
            .experience-item { margin-left: 40px; padding: 1.5rem; }
            .experience-timeline::before { left: 15px; }
            .experience-item::before { left: -48px; }
            .contact-links { flex-direction: column; align-items: center; gap: 1rem; }
            .footer-links { flex-direction: column; gap: 1rem; }
        }
        
        @media (max-width: 480px) {
            .hero h1 { font-size: 2rem; }
            .hero .subtitle { font-size: 1rem; }
            .section h2 { font-size: 1.8rem; }
            .project-card, .education-card, .experience-item { padding: 1.5rem; }
            .skills-grid { grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); }
        }
        
        /* Animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fade-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
    </style>
</head>
<body>
    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1>${data.personalInfo.name || 'Your Name'}</h1>
                <p class="subtitle">${data.personalInfo.summary || 'Professional Summary'}</p>
                <div class="contact-links">
                    ${data.personalInfo.email ? `
                    <a href="mailto:${data.personalInfo.email}" aria-label="Send email">
                        <i class="fas fa-envelope"></i>
                        <span>Email</span>
                    </a>
                    ` : ''}
                    ${data.personalInfo.phone ? `
                    <a href="tel:${data.personalInfo.phone}" aria-label="Call phone number">
                        <i class="fas fa-phone"></i>
                        <span>Call</span>
                    </a>
                    ` : ''}
                    ${data.personalInfo.linkedin ? `
                    <a href="${data.personalInfo.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                        <i class="fab fa-linkedin"></i>
                        <span>LinkedIn</span>
                    </a>
                    ` : ''}
                    ${data.personalInfo.github ? `
                    <a href="${data.personalInfo.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                        <i class="fab fa-github"></i>
                        <span>GitHub</span>
                    </a>
                    ` : ''}
                </div>
            </div>
        </div>
    </section>

    ${data.skills && data.skills.length > 0 ? `
    <!-- Skills Section -->
    <section class="section" id="skills">
        <div class="container">
            <h2>Skills & Expertise</h2>
            <div class="skills-grid">
                ${data.skills.map(skill => `
                    <div class="skill-tag fade-in">${skill}</div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${data.projects && data.projects.length > 0 ? `
    <!-- Projects Section -->
    <section class="section" id="projects">
        <div class="container">
            <h2>Featured Projects</h2>
            <div class="projects-grid">
                ${data.projects.map(project => `
                    <article class="project-card fade-in">
                        <h3>${project.name || 'Project Name'}</h3>
                        <p>${project.description || 'Project description'}</p>
                        ${project.technologies ? `
                        <div class="tech-tags">
                            ${project.technologies.split(',').map(tech => `
                                <span class="tech-tag">${tech.trim()}</span>
                            `).join('')}
                        </div>
                        ` : ''}
                        ${project.link ? `
                        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">
                            <i class="fas fa-external-link-alt"></i>
                            <span>View Project</span>
                        </a>
                        ` : ''}
                    </article>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${data.experience && data.experience.length > 0 ? `
    <!-- Experience Section -->
    <section class="section" id="experience">
        <div class="container">
            <h2>Work Experience</h2>
            <div class="experience-timeline">
                ${data.experience.map(exp => `
                    <article class="experience-item fade-in">
                        <h3>${exp.title || 'Job Title'}</h3>
                        <div class="company">${exp.company || 'Company Name'}</div>
                        <div class="duration">${exp.duration || 'Duration'}</div>
                        <p>${exp.description || 'Job description'}</p>
                    </article>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${data.education && data.education.length > 0 ? `
    <!-- Education Section -->
    <section class="section" id="education">
        <div class="container">
            <h2>Education</h2>
            <div class="education-grid">
                ${data.education.map(edu => `
                    <article class="education-card fade-in">
                        <h3>${edu.degree || 'Degree'}</h3>
                        <div class="institution">${edu.institution || 'Institution'}</div>
                        <div class="year">${edu.year || 'Year'}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>
                    </article>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; ${new Date().getFullYear()} ${data.personalInfo.name || 'Professional'}. All rights reserved.</p>
            <p>Built with CareerPanda - AI-Powered Career Platform</p>
            <div class="footer-links">
                ${data.personalInfo.email ? `<a href="mailto:${data.personalInfo.email}">Contact</a>` : ''}
                ${data.personalInfo.linkedin ? `<a href="${data.personalInfo.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>` : ''}
                ${data.personalInfo.github ? `<a href="${data.personalInfo.github}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ''}
                <a href="#skills">Skills</a>
                <a href="#projects">Projects</a>
                <a href="#experience">Experience</a>
            </div>
        </div>
    </footer>

    <script>
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.skill-tag, .project-card, .experience-item, .education-card').forEach(el => {
            observer.observe(el);
        });

        console.log('Portfolio loaded successfully! Built with CareerPanda.');
    </script>
</body>
</html>`;
};

export const downloadPortfolio = (data: PortfolioData, template: string = 'modern'): void => {
  const htmlContent = generatePortfolioHTML(data, template);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const cleanName = (data.personalInfo.name || 'Portfolio').replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `${cleanName}_Portfolio_${template}.html`;
  saveAs(blob, fileName);
};

export const generateGitHubPages = (data: PortfolioData, template: string = 'modern'): string => {
  return generatePortfolioHTML(data, template);
};