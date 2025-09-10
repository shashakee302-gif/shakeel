// Enhanced Gemini Service with localhost API integration
const API_BASE_URL = 'http://127.0.0.1:8000';

export interface GeminiAnalysis {
  atsScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  jobMatches: string[];
  skillGaps: string[];
  industryTrends: string[];
  salaryInsights: string;
  keywords: string[];
  overallRating: number;
}

export interface JobRecommendation {
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
  description: string;
  requirements: string[];
  url: string;
}

// Cache for API responses
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

const getCachedData = (key: string) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key: string, data: any) => {
  cache.set(key, { data, timestamp: Date.now() });
};

export const analyzeResumeWithGemini = async (resumeData: any): Promise<GeminiAnalysis> => {
  const cacheKey = `analysis-${JSON.stringify(resumeData).slice(0, 100)}`;
  const cachedResult = getCachedData(cacheKey);
  
  if (cachedResult) {
    return cachedResult;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/ai/analyze-resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        resumeData,
        analysisType: 'comprehensive'
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const analysis = normalizeAnalysisData(data);
    
    setCachedData(cacheKey, analysis);
    return analysis;
  } catch (error) {
    console.error('Error analyzing resume:', error);
    // Fallback to local analysis
    return generateLocalAnalysis(resumeData);
  }
};

export const getJobRecommendationsWithAI = async (skills: string[]): Promise<JobRecommendation[]> => {
  const cacheKey = `recommendations-${skills.join(',')}`;
  const cachedResult = getCachedData(cacheKey);
  
  if (cachedResult) {
    return cachedResult;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/ai/job-recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        skills,
        location: 'India',
        experienceLevel: 'mid',
        limit: 10
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const recommendations = normalizeJobRecommendations(data.recommendations || data.jobs || data || []);
    
    setCachedData(cacheKey, recommendations);
    return recommendations;
  } catch (error) {
    console.error('Error getting job recommendations:', error);
    // Fallback to local recommendations
    return generateLocalJobRecommendations(skills);
  }
};

// AI Chat function for chatbot
export const getChatResponse = async (message: string, context?: any): Promise<string> => {
  const cacheKey = `chat-${message.slice(0, 50)}`;
  const cachedResult = getCachedData(cacheKey);
  
  if (cachedResult) {
    return cachedResult;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        message,
        context,
        conversationId: Date.now().toString()
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const responseText = data.response || data.message || data.text || 'I apologize, but I cannot process your request right now.';
    
    setCachedData(cacheKey, responseText);
    return responseText;
  } catch (error) {
    console.error('Error getting chat response:', error);
    // Fallback to local response
    return getLocalChatResponse(message, context);
  }
};

// Normalize analysis data from API
const normalizeAnalysisData = (data: any): GeminiAnalysis => {
  return {
    atsScore: data.atsScore || data.ats_score || 85,
    strengths: data.strengths || data.strong_points || ['Professional experience', 'Good skill set'],
    weaknesses: data.weaknesses || data.weak_points || ['Could improve summary'],
    suggestions: data.suggestions || data.recommendations || ['Add more quantifiable achievements'],
    jobMatches: data.jobMatches || data.job_matches || data.matching_jobs || ['Software Engineer'],
    skillGaps: data.skillGaps || data.skill_gaps || data.missing_skills || ['Cloud platforms'],
    industryTrends: data.industryTrends || data.industry_trends || data.trends || ['AI/ML integration'],
    salaryInsights: data.salaryInsights || data.salary_insights || data.salary || 'Competitive salary expected',
    keywords: data.keywords || data.recommended_keywords || ['technology', 'development'],
    overallRating: data.overallRating || data.overall_rating || data.rating || 8.5
  };
};

// Normalize job recommendations from API
const normalizeJobRecommendations = (jobs: any[]): JobRecommendation[] => {
  return jobs.map((job: any, index: number) => ({
    title: job.title || job.job_title || job.position || 'Job Position',
    company: job.company || job.company_name || job.employer || 'Company',
    location: job.location || job.job_location || job.city || 'India',
    salary: job.salary || job.salary_range || job.compensation || '₹8-15 LPA',
    matchScore: job.matchScore || job.match_score || job.score || (90 - index * 5),
    description: job.description || job.job_description || 'Exciting opportunity to grow your career',
    requirements: job.requirements || job.required_skills || job.skills || ['Relevant skills'],
    url: job.url || job.apply_url || job.job_url || '#'
  }));
};

// Local fallback analysis
const generateLocalAnalysis = (resumeData: any): GeminiAnalysis => {
  let atsScore = 70;
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: string[] = [];
  const jobMatches: string[] = [];

  // Calculate ATS score
  if (resumeData.personalInfo?.name) atsScore += 5;
  if (resumeData.personalInfo?.email) atsScore += 5;
  if (resumeData.personalInfo?.phone) atsScore += 5;
  if (resumeData.personalInfo?.summary?.length > 50) atsScore += 10;
  if (resumeData.skills?.length >= 5) atsScore += 10;
  if (resumeData.experience?.length >= 2) atsScore += 5;
  if (resumeData.projects?.length > 0) atsScore += 5;

  // Analyze strengths
  if (resumeData.skills?.length > 5) strengths.push('Diverse skill set');
  if (resumeData.experience?.length > 2) strengths.push('Strong work experience');
  if (resumeData.projects?.length > 0) strengths.push('Practical project experience');
  if (resumeData.personalInfo?.linkedin) strengths.push('Professional online presence');

  // Analyze weaknesses
  if (!resumeData.personalInfo?.summary || resumeData.personalInfo.summary.length < 50) {
    weaknesses.push('Weak professional summary');
  }
  if (resumeData.skills?.length < 5) weaknesses.push('Limited skills section');
  if (resumeData.experience?.length === 0) weaknesses.push('No work experience');

  // Generate suggestions
  suggestions.push('Add quantifiable achievements to experience');
  suggestions.push('Include relevant certifications');
  suggestions.push('Optimize keywords for ATS');
  suggestions.push('Add a compelling professional summary');

  // Job matching based on skills
  const skills = resumeData.skills || [];
  if (skills.includes('React') || skills.includes('JavaScript')) {
    jobMatches.push('Frontend Developer');
  }
  if (skills.includes('Node.js') || skills.includes('Express')) {
    jobMatches.push('Backend Developer');
  }
  if (skills.includes('Python') || skills.includes('Django')) {
    jobMatches.push('Python Developer');
  }
  if (skills.includes('React') && skills.includes('Node.js')) {
    jobMatches.push('Full Stack Developer');
  }
  if (skills.includes('Data Science') || skills.includes('Machine Learning')) {
    jobMatches.push('Data Scientist');
  }

  return {
    atsScore: Math.min(atsScore, 100),
    strengths,
    weaknesses,
    suggestions,
    jobMatches,
    skillGaps: ['Cloud platforms', 'DevOps tools', 'Modern frameworks'],
    industryTrends: ['AI/ML integration', 'Remote work', 'Cloud-first approach'],
    salaryInsights: 'Based on your skills, expect ₹8-25 LPA in India',
    keywords: [...skills, 'software engineer', 'developer', 'programmer'],
    overallRating: Math.min(atsScore / 10, 10)
  };
};

// Local fallback job recommendations
const generateLocalJobRecommendations = (skills: string[]): JobRecommendation[] => {
  const jobTemplates = [
    {
      title: 'Senior Software Engineer',
      company: 'Google India',
      location: 'Bangalore, Karnataka',
      salary: '₹25-40 LPA',
      description: 'Build scalable systems for billions of users',
      requirements: ['JavaScript', 'React', 'System Design'],
      url: 'https://careers.google.com'
    },
    {
      title: 'Full Stack Developer',
      company: 'Microsoft India',
      location: 'Hyderabad, Telangana',
      salary: '₹20-35 LPA',
      description: 'Develop end-to-end solutions',
      requirements: ['React', 'Node.js', 'TypeScript'],
      url: 'https://careers.microsoft.com'
    },
    {
      title: 'Frontend Developer',
      company: 'Flipkart',
      location: 'Bangalore, Karnataka',
      salary: '₹15-25 LPA',
      description: 'Create amazing user experiences',
      requirements: ['React', 'JavaScript', 'CSS'],
      url: 'https://www.flipkartcareers.com'
    },
    {
      title: 'Backend Developer',
      company: 'Zomato',
      location: 'Gurgaon, Haryana',
      salary: '₹12-22 LPA',
      description: 'Build robust backend systems',
      requirements: ['Node.js', 'Python', 'MongoDB'],
      url: 'https://www.zomato.com/careers'
    },
    {
      title: 'Data Scientist',
      company: 'Amazon India',
      location: 'Mumbai, Maharashtra',
      salary: '₹18-30 LPA',
      description: 'Use ML to solve business problems',
      requirements: ['Python', 'Machine Learning', 'SQL'],
      url: 'https://amazon.jobs'
    }
  ];

  return jobTemplates.map((job, index) => ({
    ...job,
    matchScore: 85 + Math.floor(Math.random() * 15)
  }));
};

// Local fallback chat response
const getLocalChatResponse = (message: string, context?: any): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! 👋 I'm Panda AI, your personal career assistant. I can help you with resume analysis, job searching, and career advice. What would you like to work on today?";
  }
  
  if (lowerMessage.includes('job') || lowerMessage.includes('career')) {
    return "💼 I can help you find amazing job opportunities! Based on your skills, I can recommend positions at top companies like Google, Microsoft, Amazon, and many Indian startups. Would you like me to search for specific roles?";
  }
  
  if (lowerMessage.includes('resume') || lowerMessage.includes('analyze')) {
    return "📄 I'd be happy to analyze your resume! I can provide ATS scores, identify strengths and weaknesses, and suggest improvements. Please make sure you have created a resume first using our Resume Builder.";
  }
  
  if (lowerMessage.includes('salary') || lowerMessage.includes('pay')) {
    return "💰 **Salary Insights for India:**\n\n• **Entry Level (0-2 years):** ₹3-8 LPA\n• **Mid Level (2-5 years):** ₹8-20 LPA\n• **Senior Level (5+ years):** ₹20-50 LPA\n• **Leadership Roles:** ₹50+ LPA\n\nFactors affecting salary:\n• Technical skills and certifications\n• Company size and industry\n• Location (metro vs non-metro)\n• Negotiation skills";
  }
  
  if (lowerMessage.includes('skill') || lowerMessage.includes('learn')) {
    return "🎯 **Top Skills in Demand:**\n\n• **Programming:** JavaScript, Python, Java, React\n• **Cloud:** AWS, Azure, Google Cloud\n• **Data:** SQL, MongoDB, Data Analysis\n• **DevOps:** Docker, Kubernetes, CI/CD\n• **Soft Skills:** Communication, Leadership, Problem-solving\n\nWould you like specific learning resources for any of these?";
  }
  
  if (lowerMessage.includes('help')) {
    return "🤖 **I can help you with:**\n\n🔍 **Resume Analysis** - Get ATS scores and improvement suggestions\n💼 **Job Matching** - Find opportunities that match your skills\n📈 **Career Advice** - Tips for professional growth\n📝 **Resume Building** - Guidance on creating effective resumes\n🎯 **Interview Prep** - Common questions and best practices\n💰 **Salary Insights** - Market rates for your skills\n\nWhat would you like to explore?";
  }
  
  return "That's an interesting question! I'm here to help with career-related topics like resume building, job searching, and professional development. Could you tell me more about what specific career help you're looking for?";
};

// API health check
export const checkAPIHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

// Get AI chat response from API
export const getAIChatResponse = async (message: string, context?: any): Promise<string> => {
  const cacheKey = `chat-${message.slice(0, 50)}`;
  const cachedResult = getCachedData(cacheKey);
  
  if (cachedResult) {
    return cachedResult;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        message,
        context,
        userId: 'user-' + Date.now()
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const responseText = data.response || data.message || data.text || 'I apologize, but I cannot process your request right now.';
    
    setCachedData(cacheKey, responseText);
    return responseText;
  } catch (error) {
    console.error('Error getting AI chat response:', error);
    // Fallback to local response
    return getLocalChatResponse(message, context);
  }
};