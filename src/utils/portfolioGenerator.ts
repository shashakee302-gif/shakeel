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
  cyberpunk: {
    name: 'Cyberpunk Matrix',
    primaryColor: '#00ff41',
    secondaryColor: '#ff0080',
    accentColor: '#00d4ff',
    backgroundColor: '#0a0a0a',
    cardBackground: '#1a1a2e',
    textColor: '#ffffff',
    glowColor: '#00ff41'
  },
  holographic: {
    name: 'Holographic Nexus',
    primaryColor: '#8b5cf6',
    secondaryColor: '#06b6d4',
    accentColor: '#f59e0b',
    backgroundColor: '#0f0f23',
    cardBackground: '#1e1e3f',
    textColor: '#f1f5f9',
    glowColor: '#8b5cf6'
  },
  quantum: {
    name: 'Quantum Dimension',
    primaryColor: '#ff6b6b',
    secondaryColor: '#4ecdc4',
    accentColor: '#ffe66d',
    backgroundColor: '#2c3e50',
    cardBackground: '#34495e',
    textColor: '#ecf0f1',
    glowColor: '#ff6b6b'
  }
};

export const generateCyberpunkPortfolio = (data: PortfolioData): string => {
  const theme = portfolioTemplates.cyberpunk;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personalInfo.name || 'Cyberpunk'} - Digital Matrix Portfolio</title>
    <meta name="description" content="${data.personalInfo.summary || 'Cyberpunk-inspired digital portfolio showcasing cutting-edge skills and projects'}">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    
    <style>
        :root {
            --primary: ${theme.primaryColor};
            --secondary: ${theme.secondaryColor};
            --accent: ${theme.accentColor};
            --bg: ${theme.backgroundColor};
            --card-bg: ${theme.cardBackground};
            --text: ${theme.textColor};
            --glow: ${theme.glowColor};
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Rajdhani', sans-serif;
            background: var(--bg);
            color: var(--text);
            overflow-x: hidden;
            cursor: none;
        }
        
        /* Custom Cursor */
        .cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        }
        
        .cursor-trail {
            position: fixed;
            width: 6px;
            height: 6px;
            background: var(--secondary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            opacity: 0.7;
        }
        
        /* Matrix Rain Background */
        .matrix-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.1;
        }
        
        .matrix-char {
            position: absolute;
            font-family: 'Orbitron', monospace;
            font-size: 14px;
            color: var(--primary);
            animation: matrixFall linear infinite;
        }
        
        @keyframes matrixFall {
            0% { transform: translateY(-100vh); opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
        }
        
        /* Glitch Effect */
        .glitch {
            position: relative;
            display: inline-block;
        }
        
        .glitch::before,
        .glitch::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        .glitch::before {
            animation: glitch-1 0.5s infinite;
            color: var(--secondary);
            z-index: -1;
        }
        
        .glitch::after {
            animation: glitch-2 0.5s infinite;
            color: var(--accent);
            z-index: -2;
        }
        
        @keyframes glitch-1 {
            0%, 14%, 15%, 49%, 50%, 99%, 100% { transform: translate(0); }
            15%, 49% { transform: translate(-2px, 2px); }
        }
        
        @keyframes glitch-2 {
            0%, 20%, 21%, 62%, 63%, 99%, 100% { transform: translate(0); }
            21%, 62% { transform: translate(2px, -2px); }
        }
        
        /* Hero Section */
        .hero {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            position: relative;
            background: radial-gradient(circle at center, rgba(0,255,65,0.1) 0%, transparent 70%);
        }
        
        .hero-content {
            z-index: 2;
            position: relative;
        }
        
        .hero h1 {
            font-family: 'Orbitron', monospace;
            font-size: clamp(3rem, 8vw, 6rem);
            font-weight: 900;
            margin-bottom: 1rem;
            text-shadow: 0 0 20px var(--primary), 0 0 40px var(--primary), 0 0 60px var(--primary);
            animation: neonPulse 2s ease-in-out infinite alternate;
        }
        
        @keyframes neonPulse {
            from { text-shadow: 0 0 20px var(--primary), 0 0 40px var(--primary), 0 0 60px var(--primary); }
            to { text-shadow: 0 0 10px var(--primary), 0 0 20px var(--primary), 0 0 30px var(--primary); }
        }
        
        .hero .subtitle {
            font-size: clamp(1.2rem, 3vw, 2rem);
            margin-bottom: 2rem;
            opacity: 0.9;
            animation: typewriter 3s steps(40) 1s forwards;
            overflow: hidden;
            white-space: nowrap;
            border-right: 2px solid var(--primary);
            width: 0;
        }
        
        @keyframes typewriter {
            from { width: 0; }
            to { width: 100%; }
        }
        
        .cyber-button {
            display: inline-block;
            padding: 15px 30px;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            color: var(--bg);
            text-decoration: none;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            border: none;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 100%, 20px 100%);
        }
        
        .cyber-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s ease;
        }
        
        .cyber-button:hover::before {
            left: 100%;
        }
        
        .cyber-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0,255,65,0.3);
        }
        
        /* Floating Particles */
        .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--primary);
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-30px) rotate(120deg); }
            66% { transform: translateY(30px) rotate(240deg); }
        }
        
        /* Section Styling */
        .section {
            padding: 100px 0;
            position: relative;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        .section-title {
            font-family: 'Orbitron', monospace;
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 700;
            text-align: center;
            margin-bottom: 4rem;
            position: relative;
            text-shadow: 0 0 20px var(--glow);
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 4px;
            background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
            border-radius: 2px;
            animation: pulse 2s ease-in-out infinite;
        }
        
        /* Skills Matrix */
        .skills-matrix {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .skill-node {
            background: var(--card-bg);
            padding: 2rem;
            border-radius: 15px;
            border: 2px solid var(--primary);
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            animation: skillGlow 3s ease-in-out infinite alternate;
        }
        
        .skill-node::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: conic-gradient(from 0deg, var(--primary), var(--secondary), var(--accent), var(--primary));
            animation: rotate 4s linear infinite;
            z-index: -1;
        }
        
        .skill-node::after {
            content: '';
            position: absolute;
            inset: 2px;
            background: var(--card-bg);
            border-radius: 13px;
            z-index: -1;
        }
        
        @keyframes skillGlow {
            from { box-shadow: 0 0 20px var(--primary); }
            to { box-shadow: 0 0 40px var(--secondary), 0 0 60px var(--accent); }
        }
        
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .skill-node:hover {
            transform: translateY(-10px) scale(1.05);
            box-shadow: 0 20px 50px rgba(0,255,65,0.3);
        }
        
        .skill-name {
            font-family: 'Orbitron', monospace;
            font-size: 1.2rem;
            font-weight: 700;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: var(--primary);
            text-shadow: 0 0 10px var(--primary);
        }
        
        /* Projects Hexagon Grid */
        .projects-hex-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .project-hex {
            width: 350px;
            height: 400px;
            background: var(--card-bg);
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
            position: relative;
            transition: all 0.5s ease;
            cursor: pointer;
            overflow: hidden;
        }
        
        .project-hex::before {
            content: '';
            position: absolute;
            inset: 3px;
            background: var(--card-bg);
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
            z-index: 1;
        }
        
        .project-hex::after {
            content: '';
            position: absolute;
            inset: 0;
            background: conic-gradient(from 0deg, var(--primary), var(--secondary), var(--accent), var(--primary));
            animation: rotate 6s linear infinite;
            z-index: 0;
        }
        
        .project-hex:hover {
            transform: scale(1.1) rotate(5deg);
            filter: drop-shadow(0 0 30px var(--primary));
        }
        
        .project-content {
            position: absolute;
            inset: 20px;
            z-index: 2;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 2rem;
        }
        
        .project-content h3 {
            font-family: 'Orbitron', monospace;
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--primary);
            text-shadow: 0 0 10px var(--primary);
        }
        
        .project-content p {
            font-size: 0.9rem;
            line-height: 1.4;
            margin-bottom: 1rem;
            opacity: 0.9;
        }
        
        .tech-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            justify-content: center;
            margin-bottom: 1rem;
        }
        
        .tech-chip {
            background: linear-gradient(45deg, var(--secondary), var(--accent));
            color: var(--bg);
            padding: 0.3rem 0.8rem;
            border-radius: 15px;
            font-size: 0.7rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        /* Experience Timeline */
        .cyber-timeline {
            position: relative;
            margin-top: 3rem;
        }
        
        .cyber-timeline::before {
            content: '';
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 4px;
            background: linear-gradient(to bottom, var(--primary), var(--secondary), var(--accent));
            transform: translateX(-50%);
            animation: pulse 2s ease-in-out infinite;
        }
        
        .timeline-item {
            display: flex;
            align-items: center;
            margin-bottom: 4rem;
            position: relative;
        }
        
        .timeline-item:nth-child(even) {
            flex-direction: row-reverse;
        }
        
        .timeline-content {
            flex: 1;
            background: var(--card-bg);
            padding: 2rem;
            border-radius: 20px;
            margin: 0 2rem;
            border: 2px solid var(--primary);
            position: relative;
            transition: all 0.3s ease;
            animation: slideInFromSide 0.8s ease-out;
        }
        
        .timeline-content::before {
            content: '';
            position: absolute;
            top: 50%;
            width: 0;
            height: 0;
            border: 15px solid transparent;
            transform: translateY(-50%);
        }
        
        .timeline-item:nth-child(odd) .timeline-content::before {
            right: -30px;
            border-left-color: var(--primary);
        }
        
        .timeline-item:nth-child(even) .timeline-content::before {
            left: -30px;
            border-right-color: var(--primary);
        }
        
        .timeline-content:hover {
            transform: scale(1.05);
            box-shadow: 0 0 30px var(--primary);
        }
        
        .timeline-node {
            width: 20px;
            height: 20px;
            background: var(--primary);
            border-radius: 50%;
            border: 4px solid var(--bg);
            box-shadow: 0 0 20px var(--primary);
            z-index: 2;
            animation: nodePulse 2s ease-in-out infinite;
        }
        
        @keyframes nodePulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
        }
        
        @keyframes slideInFromSide {
            from { transform: translateX(-100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        /* Holographic Cards */
        .holo-card {
            background: var(--card-bg);
            border-radius: 20px;
            padding: 2rem;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            border: 1px solid rgba(0,255,65,0.3);
        }
        
        .holo-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0,255,65,0.2), transparent);
            transition: left 0.5s ease;
        }
        
        .holo-card:hover::before {
            left: 100%;
        }
        
        .holo-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 50px rgba(0,255,65,0.2);
            border-color: var(--primary);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .cyber-timeline::before { left: 30px; }
            .timeline-item { flex-direction: column !important; }
            .timeline-content { margin: 1rem 0 1rem 60px; }
            .timeline-content::before { display: none; }
            .projects-hex-grid { flex-direction: column; align-items: center; }
            .project-hex { width: 300px; height: 350px; }
            .skills-matrix { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
        }
        
        /* Scroll Animations */
        .fade-in {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Terminal Window */
        .terminal {
            background: #000;
            border-radius: 10px;
            padding: 1rem;
            margin: 2rem 0;
            border: 2px solid var(--primary);
            font-family: 'Courier New', monospace;
            position: relative;
        }
        
        .terminal::before {
            content: '● ● ●';
            position: absolute;
            top: 10px;
            left: 15px;
            color: var(--primary);
            font-size: 12px;
        }
        
        .terminal-content {
            margin-top: 30px;
            color: var(--primary);
            font-size: 14px;
            line-height: 1.4;
        }
        
        .typing-animation {
            overflow: hidden;
            white-space: nowrap;
            animation: typing 3s steps(40) infinite;
        }
        
        @keyframes typing {
            0%, 50% { width: 0; }
            100% { width: 100%; }
        }
    </style>
</head>
<body>
    <div class="cursor"></div>
    <div class="matrix-bg"></div>
    
    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <h1 class="glitch" data-text="${data.personalInfo.name || 'CYBER_MATRIX'}">${data.personalInfo.name || 'CYBER_MATRIX'}</h1>
            <p class="subtitle">${data.personalInfo.summary || 'Digital Architect | Code Warrior | Future Builder'}</p>
            <div style="margin-top: 2rem;">
                ${data.personalInfo.email ? `<a href="mailto:${data.personalInfo.email}" class="cyber-button">CONNECT</a>` : ''}
            </div>
        </div>
    </section>
    
    <!-- Skills Matrix -->
    <section class="section" id="skills">
        <div class="container">
            <h2 class="section-title fade-in">SKILL_MATRIX</h2>
            <div class="skills-matrix">
                ${data.skills.map(skill => `
                    <div class="skill-node fade-in">
                        <div class="skill-name">${skill}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    
    <!-- Projects Hexagon -->
    <section class="section" id="projects">
        <div class="container">
            <h2 class="section-title fade-in">PROJECT_NEXUS</h2>
            <div class="projects-hex-grid">
                ${data.projects.map(project => `
                    <div class="project-hex fade-in">
                        <div class="project-content">
                            <h3>${project.name}</h3>
                            <p>${project.description}</p>
                            <div class="tech-chips">
                                ${project.technologies.split(',').map(tech => `
                                    <span class="tech-chip">${tech.trim()}</span>
                                `).join('')}
                            </div>
                            ${project.link ? `<a href="${project.link}" class="cyber-button" style="font-size: 0.8rem; padding: 10px 20px;">ACCESS</a>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    
    <!-- Experience Timeline -->
    <section class="section" id="experience">
        <div class="container">
            <h2 class="section-title fade-in">EXPERIENCE_LOG</h2>
            <div class="cyber-timeline">
                ${data.experience.map((exp, index) => `
                    <div class="timeline-item fade-in" style="animation-delay: ${index * 0.2}s;">
                        <div class="timeline-content">
                            <h3 style="font-family: 'Orbitron', monospace; color: var(--primary); font-size: 1.5rem; margin-bottom: 0.5rem;">${exp.title}</h3>
                            <p style="color: var(--secondary); font-weight: 600; margin-bottom: 0.5rem;">${exp.company} | ${exp.duration}</p>
                            <p style="opacity: 0.9; line-height: 1.6;">${exp.description}</p>
                        </div>
                        <div class="timeline-node"></div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    
    <!-- Terminal Contact -->
    <section class="section">
        <div class="container">
            <div class="terminal fade-in">
                <div class="terminal-content">
                    <div class="typing-animation">$ whoami</div>
                    <div>${data.personalInfo.name || 'cyber_warrior'}</div>
                    <div class="typing-animation">$ contact --info</div>
                    <div>Email: ${data.personalInfo.email || 'classified@matrix.net'}</div>
                    <div>Location: ${data.personalInfo.location || 'The Grid'}</div>
                    <div class="typing-animation">$ status</div>
                    <div style="color: var(--primary);">READY_FOR_MISSION</div>
                </div>
            </div>
        </div>
    </section>

    <script>
        // Custom Cursor
        const cursor = document.querySelector('.cursor');
        const trails = [];
        
        for (let i = 0; i < 10; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            document.body.appendChild(trail);
            trails.push(trail);
        }
        
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
            
            trails.forEach((trail, index) => {
                setTimeout(() => {
                    trail.style.left = mouseX + 'px';
                    trail.style.top = mouseY + 'px';
                }, index * 50);
            });
        });
        
        // Matrix Rain
        function createMatrixRain() {
            const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
            const matrixBg = document.querySelector('.matrix-bg');
            
            for (let i = 0; i < 50; i++) {
                const char = document.createElement('div');
                char.className = 'matrix-char';
                char.textContent = chars[Math.floor(Math.random() * chars.length)];
                char.style.left = Math.random() * 100 + '%';
                char.style.animationDuration = (Math.random() * 3 + 2) + 's';
                char.style.animationDelay = Math.random() * 2 + 's';
                matrixBg.appendChild(char);
            }
        }
        
        // Floating Particles
        function createParticles() {
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
                document.body.appendChild(particle);
            }
        }
        
        // Scroll Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
        
        // Initialize
        createMatrixRain();
        createParticles();
        
        // Glitch effect on hover
        document.querySelectorAll('.glitch').forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.animation = 'glitch-1 0.3s ease-in-out';
            });
        });
        
        console.log('%c🔥 CYBERPUNK PORTFOLIO LOADED 🔥', 'color: #00ff41; font-size: 20px; font-weight: bold;');
    </script>
</body>
</html>`;
};

export const generateHolographicPortfolio = (data: PortfolioData): string => {
  const theme = portfolioTemplates.holographic;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personalInfo.name || 'Holographic'} - Nexus Portfolio</title>
    <meta name="description" content="${data.personalInfo.summary || 'Holographic portfolio showcasing innovative projects and cutting-edge skills'}">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    
    <style>
        :root {
            --primary: ${theme.primaryColor};
            --secondary: ${theme.secondaryColor};
            --accent: ${theme.accentColor};
            --bg: ${theme.backgroundColor};
            --card-bg: ${theme.cardBackground};
            --text: ${theme.textColor};
            --glow: ${theme.glowColor};
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Space Grotesk', sans-serif;
            background: var(--bg);
            color: var(--text);
            overflow-x: hidden;
            position: relative;
        }
        
        /* Holographic Background */
        .holo-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(245, 158, 11, 0.2) 0%, transparent 50%);
            z-index: -1;
            animation: holoShift 10s ease-in-out infinite;
        }
        
        @keyframes holoShift {
            0%, 100% { filter: hue-rotate(0deg); }
            50% { filter: hue-rotate(180deg); }
        }
        
        /* Floating Orbs */
        .orb {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, var(--primary), transparent);
            animation: orbFloat 8s ease-in-out infinite;
            filter: blur(1px);
        }
        
        @keyframes orbFloat {
            0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
            33% { transform: translateY(-30px) translateX(20px) scale(1.1); }
            66% { transform: translateY(20px) translateX(-20px) scale(0.9); }
        }
        
        /* Hero Section */
        .hero {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            position: relative;
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1));
        }
        
        .hero-content {
            z-index: 2;
            position: relative;
        }
        
        .hero h1 {
            font-size: clamp(3rem, 8vw, 7rem);
            font-weight: 700;
            margin-bottom: 1rem;
            background: linear-gradient(45deg, var(--primary), var(--secondary), var(--accent));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: holoText 3s ease-in-out infinite;
            position: relative;
        }
        
        .hero h1::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            background: linear-gradient(45deg, var(--secondary), var(--accent), var(--primary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: holoShimmer 2s ease-in-out infinite reverse;
        }
        
        @keyframes holoText {
            0%, 100% { filter: brightness(1) contrast(1); }
            50% { filter: brightness(1.2) contrast(1.1); }
        }
        
        @keyframes holoShimmer {
            0% { opacity: 0; transform: translateX(-10px); }
            50% { opacity: 0.7; transform: translateX(0px); }
            100% { opacity: 0; transform: translateX(10px); }
        }
        
        .hero .subtitle {
            font-size: clamp(1.2rem, 3vw, 2rem);
            margin-bottom: 3rem;
            opacity: 0.9;
            animation: fadeInUp 1s ease-out 0.5s both;
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Holographic Button */
        .holo-button {
            display: inline-block;
            padding: 18px 40px;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            color: var(--text);
            text-decoration: none;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            border-radius: 50px;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            border: 2px solid transparent;
            background-clip: padding-box;
        }
        
        .holo-button::before {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px;
            background: linear-gradient(45deg, var(--primary), var(--secondary), var(--accent));
            border-radius: 50px;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            z-index: -1;
        }
        
        .holo-button:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(139, 92, 246, 0.4);
            filter: brightness(1.2);
        }
        
        /* Section Styling */
        .section {
            padding: 120px 0;
            position: relative;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        .section-title {
            font-size: clamp(2.5rem, 6vw, 5rem);
            font-weight: 700;
            text-align: center;
            margin-bottom: 5rem;
            background: linear-gradient(45deg, var(--primary), var(--secondary), var(--accent));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            position: relative;
            animation: titleGlow 3s ease-in-out infinite;
        }
        
        @keyframes titleGlow {
            0%, 100% { filter: drop-shadow(0 0 20px var(--primary)); }
            50% { filter: drop-shadow(0 0 40px var(--secondary)); }
        }
        
        /* Morphing Skills Grid */
        .skills-morph {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin-top: 4rem;
        }
        
        .skill-morph {
            background: var(--card-bg);
            padding: 2.5rem;
            border-radius: 25px;
            position: relative;
            overflow: hidden;
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 1px solid rgba(139, 92, 246, 0.3);
        }
        
        .skill-morph::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, var(--primary), var(--secondary), var(--accent));
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
        }
        
        .skill-morph:hover::before {
            opacity: 0.1;
        }
        
        .skill-morph:hover {
            transform: translateY(-15px) rotateX(10deg);
            box-shadow: 0 30px 60px rgba(139, 92, 246, 0.3);
        }
        
        .skill-name {
            font-size: 1.4rem;
            font-weight: 600;
            text-align: center;
            color: var(--primary);
            text-shadow: 0 0 20px var(--primary);
            animation: skillPulse 2s ease-in-out infinite;
        }
        
        @keyframes skillPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        /* Liquid Projects */
        .projects-liquid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 3rem;
            margin-top: 4rem;
        }
        
        .project-liquid {
            background: var(--card-bg);
            border-radius: 30px;
            padding: 3rem;
            position: relative;
            overflow: hidden;
            transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
            border: 2px solid transparent;
            background-clip: padding-box;
        }
        
        .project-liquid::before {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px;
            background: linear-gradient(45deg, var(--primary), var(--secondary), var(--accent));
            border-radius: 30px;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            animation: borderFlow 4s linear infinite;
        }
        
        @keyframes borderFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .project-liquid:hover {
            transform: translateY(-20px) scale(1.02);
            box-shadow: 0 40px 80px rgba(139, 92, 246, 0.4);
        }
        
        .project-liquid h3 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1rem;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .project-liquid p {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        
        /* Wave Experience */
        .experience-wave {
            position: relative;
            margin-top: 4rem;
        }
        
        .wave-item {
            background: var(--card-bg);
            margin: 3rem 0;
            padding: 3rem;
            border-radius: 25px;
            position: relative;
            overflow: hidden;
            transition: all 0.5s ease;
            border: 1px solid rgba(139, 92, 246, 0.3);
            animation: waveFloat 6s ease-in-out infinite;
        }
        
        .wave-item:nth-child(even) {
            animation-delay: 1s;
            margin-left: 10%;
        }
        
        .wave-item:nth-child(odd) {
            animation-delay: 2s;
            margin-right: 10%;
        }
        
        @keyframes waveFloat {
            0%, 100% { transform: translateY(0px) rotateY(0deg); }
            50% { transform: translateY(-10px) rotateY(5deg); }
        }
        
        .wave-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.2), transparent);
            transition: left 0.8s ease;
        }
        
        .wave-item:hover::before {
            left: 100%;
        }
        
        .wave-item:hover {
            transform: translateY(-15px) scale(1.02);
            box-shadow: 0 30px 60px rgba(139, 92, 246, 0.3);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .projects-liquid { grid-template-columns: 1fr; }
            .skills-morph { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
            .wave-item:nth-child(even), .wave-item:nth-child(odd) { margin: 2rem 0; }
            .hero h1 { font-size: 3rem; }
        }
        
        /* Scroll Reveal */
        .reveal {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Particle System */
        .particle-system {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }
        
        .particle {
            position: absolute;
            width: 3px;
            height: 3px;
            background: var(--primary);
            border-radius: 50%;
            animation: particleFloat 8s linear infinite;
        }
        
        @keyframes particleFloat {
            0% { transform: translateY(100vh) translateX(0px) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(100px) rotate(360deg); opacity: 0; }
        }
    </style>
</head>
<body>
    <div class="holo-bg"></div>
    <div class="particle-system"></div>
    
    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <h1 data-text="${data.personalInfo.name || 'HOLOGRAPHIC_NEXUS'}">${data.personalInfo.name || 'HOLOGRAPHIC_NEXUS'}</h1>
            <p class="subtitle">${data.personalInfo.summary || 'Interdimensional Developer | Reality Architect | Code Alchemist'}</p>
            <div style="margin-top: 3rem;">
                ${data.personalInfo.email ? `<a href="mailto:${data.personalInfo.email}" class="holo-button">ESTABLISH_CONNECTION</a>` : ''}
            </div>
        </div>
    </section>
    
    <!-- Skills Morphing Grid -->
    <section class="section" id="skills">
        <div class="container">
            <h2 class="section-title reveal">NEURAL_NETWORK</h2>
            <div class="skills-morph">
                ${data.skills.map((skill, index) => `
                    <div class="skill-morph reveal" style="animation-delay: ${index * 0.1}s;">
                        <div class="skill-name">${skill}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    
    <!-- Liquid Projects -->
    <section class="section" id="projects">
        <div class="container">
            <h2 class="section-title reveal">QUANTUM_PROJECTS</h2>
            <div class="projects-liquid">
                ${data.projects.map((project, index) => `
                    <div class="project-liquid reveal" style="animation-delay: ${index * 0.2}s;">
                        <h3>${project.name}</h3>
                        <p>${project.description}</p>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
                            ${project.technologies.split(',').map(tech => `
                                <span style="background: linear-gradient(45deg, var(--secondary), var(--accent)); color: var(--bg); padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 600;">${tech.trim()}</span>
                            `).join('')}
                        </div>
                        ${project.link ? `<a href="${project.link}" class="holo-button" style="font-size: 0.9rem; padding: 12px 25px;">EXPLORE_PROJECT</a>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    
    <!-- Wave Experience -->
    <section class="section" id="experience">
        <div class="container">
            <h2 class="section-title reveal">EXPERIENCE_MATRIX</h2>
            <div class="experience-wave">
                ${data.experience.map((exp, index) => `
                    <div class="wave-item reveal" style="animation-delay: ${index * 0.3}s;">
                        <h3 style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem; background: linear-gradient(45deg, var(--primary), var(--secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${exp.title}</h3>
                        <p style="color: var(--accent); font-weight: 600; font-size: 1.2rem; margin-bottom: 1rem;">${exp.company} | ${exp.duration}</p>
                        <p style="opacity: 0.9; line-height: 1.7; font-size: 1.1rem;">${exp.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <script>
        // Create floating orbs
        function createOrbs() {
            for (let i = 0; i < 15; i++) {
                const orb = document.createElement('div');
                orb.className = 'orb';
                orb.style.width = Math.random() * 100 + 50 + 'px';
                orb.style.height = orb.style.width;
                orb.style.left = Math.random() * 100 + '%';
                orb.style.top = Math.random() * 100 + '%';
                orb.style.animationDelay = Math.random() * 8 + 's';
                orb.style.animationDuration = (Math.random() * 10 + 8) + 's';
                document.body.appendChild(orb);
            }
        }
        
        // Create particle system
        function createParticles() {
            const particleSystem = document.querySelector('.particle-system');
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 8 + 's';
                particle.style.animationDuration = (Math.random() * 6 + 6) + 's';
                particleSystem.appendChild(particle);
            }
        }
        
        // Scroll reveal animation
        const revealElements = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(el => revealObserver.observe(el));
        
        // Mouse movement parallax
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            document.querySelectorAll('.orb').forEach((orb, index) => {
                const speed = (index + 1) * 0.5;
                orb.style.transform = \`translate(\${mouseX * speed}px, \${mouseY * speed}px)\`;
            });
        });
        
        // Initialize
        createOrbs();
        createParticles();
        
        console.log('%c🌈 HOLOGRAPHIC PORTFOLIO ACTIVATED 🌈', 'color: #8b5cf6; font-size: 20px; font-weight: bold;');
    </script>
</body>
</html>`;
};

export const generateQuantumPortfolio = (data: PortfolioData): string => {
  const theme = portfolioTemplates.quantum;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personalInfo.name || 'Quantum'} - Dimensional Portfolio</title>
    <meta name="description" content="${data.personalInfo.summary || 'Quantum-inspired portfolio showcasing multidimensional skills and innovative projects'}">
    <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700;800&family=Audiowide&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    
    <style>
        :root {
            --primary: ${theme.primaryColor};
            --secondary: ${theme.secondaryColor};
            --accent: ${theme.accentColor};
            --bg: ${theme.backgroundColor};
            --card-bg: ${theme.cardBackground};
            --text: ${theme.textColor};
            --glow: ${theme.glowColor};
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Exo 2', sans-serif;
            background: var(--bg);
            color: var(--text);
            overflow-x: hidden;
            position: relative;
        }
        
        /* Quantum Field Background */
        .quantum-field {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(circle at 25% 25%, rgba(255, 107, 107, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(78, 205, 196, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(255, 230, 109, 0.2) 0%, transparent 50%);
            z-index: -2;
            animation: quantumShift 15s ease-in-out infinite;
        }
        
        @keyframes quantumShift {
            0%, 100% { transform: scale(1) rotate(0deg); filter: hue-rotate(0deg); }
            33% { transform: scale(1.1) rotate(120deg); filter: hue-rotate(120deg); }
            66% { transform: scale(0.9) rotate(240deg); filter: hue-rotate(240deg); }
        }
        
        /* Geometric Shapes */
        .geo-shape {
            position: absolute;
            border: 2px solid var(--primary);
            animation: geometricFloat 12s ease-in-out infinite;
        }
        
        .geo-triangle {
            width: 0;
            height: 0;
            border-left: 25px solid transparent;
            border-right: 25px solid transparent;
            border-bottom: 43px solid var(--secondary);
            animation: triangleSpin 8s linear infinite;
        }
        
        .geo-square {
            width: 40px;
            height: 40px;
            background: linear-gradient(45deg, var(--accent), transparent);
            animation: squareMorph 6s ease-in-out infinite;
        }
        
        .geo-circle {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: radial-gradient(circle, var(--primary), transparent);
            animation: circleExpand 4s ease-in-out infinite;
        }
        
        @keyframes geometricFloat {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-50px) translateX(30px); }
            50% { transform: translateY(-20px) translateX(-30px); }
            75% { transform: translateY(-40px) translateX(20px); }
        }
        
        @keyframes triangleSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @keyframes squareMorph {
            0%, 100% { border-radius: 0%; }
            50% { border-radius: 50%; }
        }
        
        @keyframes circleExpand {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.5); }
        }
        
        /* Hero Section */
        .hero {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            position: relative;
            background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(78, 205, 196, 0.1));
        }
        
        .hero-content {
            z-index: 2;
            position: relative;
        }
        
        .hero h1 {
            font-family: 'Audiowide', cursive;
            font-size: clamp(3rem, 10vw, 8rem);
            font-weight: 700;
            margin-bottom: 1rem;
            background: linear-gradient(45deg, var(--primary), var(--secondary), var(--accent), var(--primary));
            background-size: 300% 300%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: quantumGradient 4s ease-in-out infinite;
            text-shadow: 0 0 50px var(--primary);
        }
        
        @keyframes quantumGradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        .hero .subtitle {
            font-size: clamp(1.2rem, 4vw, 2.5rem);
            margin-bottom: 3rem;
            opacity: 0.9;
            animation: quantumFadeIn 2s ease-out 1s both;
        }
        
        @keyframes quantumFadeIn {
            from { opacity: 0; transform: translateY(30px) scale(0.8); }
            to { opacity: 0.9; transform: translateY(0) scale(1); }
        }
        
        /* Quantum Button */
        .quantum-button {
            display: inline-block;
            padding: 20px 45px;
            background: linear-gradient(45deg, var(--primary), var(--secondary), var(--accent));
            background-size: 300% 300%;
            color: var(--bg);
            text-decoration: none;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 3px;
            border-radius: 50px;
            position: relative;
            overflow: hidden;
            transition: all 0.4s ease;
            animation: quantumGradient 3s ease-in-out infinite;
            border: 3px solid transparent;
        }
        
        .quantum-button::before {
            content: '';
            position: absolute;
            inset: -3px;
            background: linear-gradient(45deg, var(--primary), var(--secondary), var(--accent));
            border-radius: 50px;
            z-index: -1;
            animation: quantumGradient 3s ease-in-out infinite reverse;
        }
        
        .quantum-button:hover {
            transform: translateY(-8px) scale(1.05);
            box-shadow: 0 25px 50px rgba(255, 107, 107, 0.4);
            filter: brightness(1.2);
        }
        
        /* Section Styling */
        .section {
            padding: 150px 0;
            position: relative;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        .section-title {
            font-family: 'Audiowide', cursive;
            font-size: clamp(2.5rem, 7vw, 6rem);
            font-weight: 700;
            text-align: center;
            margin-bottom: 6rem;
            background: linear-gradient(45deg, var(--primary), var(--secondary), var(--accent));
            background-size: 300% 300%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: quantumGradient 4s ease-in-out infinite;
            position: relative;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            width: 150px;
            height: 6px;
            background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
            border-radius: 3px;
            animation: pulse 2s ease-in-out infinite;
        }
        
        /* Dimensional Skills */
        .skills-dimension {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 3rem;
            margin-top: 5rem;
            perspective: 1000px;
        }
        
        .skill-dimension {
            background: var(--card-bg);
            padding: 3rem;
            border-radius: 30px;
            position: relative;
            overflow: hidden;
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 2px solid var(--primary);
            transform-style: preserve-3d;
        }
        
        .skill-dimension::before {
            content: '';
            position: absolute;
            inset: 0;
            background: conic-gradient(from 0deg, var(--primary), var(--secondary), var(--accent), var(--primary));
            animation: rotate 8s linear infinite;
            z-index: -1;
            border-radius: 30px;
        }
        
        .skill-dimension::after {
            content: '';
            position: absolute;
            inset: 3px;
            background: var(--card-bg);
            border-radius: 27px;
            z-index: -1;
        }
        
        .skill-dimension:hover {
            transform: translateY(-20px) rotateX(15deg) rotateY(15deg);
            box-shadow: 0 40px 80px rgba(255, 107, 107, 0.4);
        }
        
        .skill-name {
            font-family: 'Audiowide', cursive;
            font-size: 1.6rem;
            font-weight: 700;
            text-align: center;
            color: var(--primary);
            text-shadow: 0 0 20px var(--primary);
            animation: skillQuantumPulse 3s ease-in-out infinite;
        }
        
        @keyframes skillQuantumPulse {
            0%, 100% { transform: scale(1); filter: brightness(1); }
            50% { transform: scale(1.1); filter: brightness(1.3); }
        }
        
        /* Spiral Projects */
        .projects-spiral {
            position: relative;
            margin-top: 5rem;
            min-height: 800px;
        }
        
        .project-spiral {
            position: absolute;
            width: 350px;
            height: 450px;
            background: var(--card-bg);
            border-radius: 25px;
            padding: 2.5rem;
            border: 2px solid var(--secondary);
            transition: all 0.6s ease;
            animation: spiralFloat 10s ease-in-out infinite;
        }
        
        .project-spiral:nth-child(1) { top: 0; left: 50%; transform: translateX(-50%); animation-delay: 0s; }
        .project-spiral:nth-child(2) { top: 200px; right: 10%; animation-delay: 1s; }
        .project-spiral:nth-child(3) { top: 400px; left: 10%; animation-delay: 2s; }
        
        @keyframes spiralFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-30px) rotate(5deg); }
            66% { transform: translateY(15px) rotate(-5deg); }
        }
        
        .project-spiral:hover {
            transform: translateY(-25px) scale(1.08) rotate(3deg);
            box-shadow: 0 35px 70px rgba(78, 205, 196, 0.4);
            z-index: 10;
        }
        
        .project-spiral h3 {
            font-family: 'Audiowide', cursive;
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .project-spiral p {
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .skills-dimension { grid-template-columns: 1fr; }
            .projects-spiral { position: static; }
            .project-spiral { 
                position: static !important; 
                margin: 2rem auto; 
                width: 100%; 
                max-width: 350px;
            }
            .hero h1 { font-size: 3rem; }
        }
        
        /* Quantum Reveal */
        .quantum-reveal {
            opacity: 0;
            transform: translateY(100px) rotateX(45deg);
            transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .quantum-reveal.active {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
        }
        
        /* Energy Waves */
        .energy-wave {
            position: absolute;
            width: 200%;
            height: 200%;
            background: conic-gradient(from 0deg, transparent, var(--primary), transparent);
            animation: energyRotate 20s linear infinite;
            opacity: 0.1;
            z-index: -1;
        }
        
        @keyframes energyRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="quantum-field"></div>
    
    <!-- Hero Section -->
    <section class="hero">
        <div class="energy-wave"></div>
        <div class="hero-content">
            <h1>${data.personalInfo.name || 'QUANTUM_DIMENSION'}</h1>
            <p class="subtitle">${data.personalInfo.summary || 'Multidimensional Creator | Quantum Developer | Reality Shifter'}</p>
            <div style="margin-top: 3rem;">
                ${data.personalInfo.email ? `<a href="mailto:${data.personalInfo.email}" class="quantum-button">ENTER_DIMENSION</a>` : ''}
            </div>
        </div>
    </section>
    
    <!-- Dimensional Skills -->
    <section class="section" id="skills">
        <div class="container">
            <h2 class="section-title quantum-reveal">SKILL_DIMENSIONS</h2>
            <div class="skills-dimension">
                ${data.skills.map((skill, index) => `
                    <div class="skill-dimension quantum-reveal" style="animation-delay: ${index * 0.15}s;">
                        <div class="skill-name">${skill}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    
    <!-- Spiral Projects -->
    <section class="section" id="projects">
        <div class="container">
            <h2 class="section-title quantum-reveal">PROJECT_MULTIVERSE</h2>
            <div class="projects-spiral">
                ${data.projects.map((project, index) => `
                    <div class="project-spiral quantum-reveal" style="animation-delay: ${index * 0.4}s;">
                        <h3>${project.name}</h3>
                        <p>${project.description}</p>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.8rem; margin-bottom: 2rem;">
                            ${project.technologies.split(',').map(tech => `
                                <span style="background: linear-gradient(45deg, var(--accent), var(--primary)); color: var(--bg); padding: 0.6rem 1.2rem; border-radius: 25px; font-size: 0.9rem; font-weight: 600; text-transform: uppercase;">${tech.trim()}</span>
                            `).join('')}
                        </div>
                        ${project.link ? `<a href="${project.link}" class="quantum-button" style="font-size: 0.8rem; padding: 15px 30px;">EXPLORE_UNIVERSE</a>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    
    <!-- Quantum Experience -->
    <section class="section" id="experience">
        <div class="container">
            <h2 class="section-title quantum-reveal">EXPERIENCE_CONTINUUM</h2>
            <div style="margin-top: 5rem;">
                ${data.experience.map((exp, index) => `
                    <div class="quantum-reveal" style="animation-delay: ${index * 0.3}s; margin-bottom: 4rem;">
                        <div style="background: var(--card-bg); padding: 3rem; border-radius: 30px; border: 2px solid var(--accent); position: relative; overflow: hidden; transition: all 0.5s ease;">
                            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 6px; background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent)); animation: pulse 2s ease-in-out infinite;"></div>
                            <h3 style="font-family: 'Audiowide', cursive; font-size: 2.2rem; font-weight: 700; margin-bottom: 1rem; color: var(--primary);">${exp.title}</h3>
                            <p style="color: var(--accent); font-weight: 600; font-size: 1.3rem; margin-bottom: 1.5rem;">${exp.company} | ${exp.duration}</p>
                            <p style="opacity: 0.9; line-height: 1.8; font-size: 1.1rem;">${exp.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <script>
        // Create geometric shapes
        function createGeometricShapes() {
            const shapes = ['geo-triangle', 'geo-square', 'geo-circle'];
            for (let i = 0; i < 20; i++) {
                const shape = document.createElement('div');
                shape.className = \`geo-shape \${shapes[Math.floor(Math.random() * shapes.length)]}\`;
                shape.style.left = Math.random() * 100 + '%';
                shape.style.top = Math.random() * 100 + '%';
                shape.style.animationDelay = Math.random() * 12 + 's';
                shape.style.animationDuration = (Math.random() * 8 + 8) + 's';
                document.body.appendChild(shape);
            }
        }
        
        // Quantum reveal animation
        const quantumElements = document.querySelectorAll('.quantum-reveal');
        const quantumObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });
        
        quantumElements.forEach(el => quantumObserver.observe(el));
        
        // Mouse interaction with quantum field
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const quantumField = document.querySelector('.quantum-field');
            quantumField.style.transform = \`translate(\${mouseX * 20}px, \${mouseY * 20}px) scale(1.05)\`;
            
            // Interactive shapes
            document.querySelectorAll('.geo-shape').forEach((shape, index) => {
                const speed = (index + 1) * 0.8;
                shape.style.transform = \`translate(\${mouseX * speed}px, \${mouseY * speed}px)\`;
            });
        });
        
        // Hover effects for cards
        document.querySelectorAll('.skill-dimension, .project-spiral').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.filter = 'brightness(1.2) saturate(1.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.filter = 'brightness(1) saturate(1)';
            });
        });
        
        // Initialize
        createGeometricShapes();
        
        console.log('%c⚡ QUANTUM PORTFOLIO INITIALIZED ⚡', 'color: #ff6b6b; font-size: 20px; font-weight: bold;');
    </script>
</body>
</html>`;
};

export const generatePortfolioHTML = (data: PortfolioData, template: string = 'modern'): string => {
  switch (template) {
    case 'cyberpunk':
    case 'modern':
      return generateCyberpunkPortfolio(data);
    case 'holographic':
    case 'creative':
      return generateHolographicPortfolio(data);
    case 'quantum':
    case 'developer':
      return generateQuantumPortfolio(data);
    default:
      return generateCyberpunkPortfolio(data);
  }
};

export const downloadPortfolio = (data: PortfolioData, template: string = 'modern'): void => {
  const htmlContent = generatePortfolioHTML(data, template);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const cleanName = (data.personalInfo.name || 'Portfolio').replace(/[^a-zA-Z0-9]/g, '_');
  const templateName = template.charAt(0).toUpperCase() + template.slice(1);
  const fileName = `${cleanName}_${templateName}_Portfolio.html`;
  saveAs(blob, fileName);
};

export const generateGitHubPages = (data: PortfolioData, template: string = 'modern'): string => {
  return generatePortfolioHTML(data, template);
};