export interface AIAnalysis {
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
  detailedFeedback: {
    summary: string;
    experience: string;
    skills: string;
    projects: string;
    education: string;
  };
}

export interface JobMatch {
  jobTitle: string;
  company: string;
  matchScore: number;
  reason: string;
  salary: string;
  requirements: string[];
}

// Local, rule-based resume analysis (no API calls)
export const analyzeResumeWithAI = async (resumeData: any, jobMarket: any = {}): Promise<AIAnalysis> => {
  return generateLocalAIAnalysis(resumeData, jobMarket);
};

const generateLocalAIAnalysis = (resumeData: any, jobMarket: any): AIAnalysis => {
  let atsScore = 70;
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: string[] = [];
  const jobMatches: string[] = [];
  const skillGaps: string[] = [];
  const industryTrends: string[] = [];
  const keywords: string[] = [];

  // ATS Score calculation
  if (resumeData.personalInfo?.name) atsScore += 5;
  if (resumeData.personalInfo?.email) atsScore += 5;
  if (resumeData.personalInfo?.phone) atsScore += 5;
  if (resumeData.personalInfo?.summary?.length > 50) atsScore += 10;
  if (resumeData.skills?.length >= 5) atsScore += 10;
  if (resumeData.experience?.length >= 2) atsScore += 5;
  if (resumeData.projects?.length > 0) atsScore += 5;
  if (resumeData.education?.length > 0) atsScore += 5;

  // Strengths analysis
  if (resumeData.skills?.length > 5) strengths.push('Diverse skill set');
  if (resumeData.experience?.length > 2) strengths.push('Strong professional experience');
  if (resumeData.projects?.length > 0) strengths.push('Practical project experience');
  if (resumeData.personalInfo?.linkedin) strengths.push('Professional online presence');
  if (resumeData.personalInfo?.github) strengths.push('Technical portfolio visibility');

  // Weaknesses analysis
  if (!resumeData.personalInfo?.summary || resumeData.personalInfo.summary.length < 50) {
    weaknesses.push('Weak professional summary');
  }
  if (resumeData.skills?.length < 5) weaknesses.push('Limited skills section');
  if (resumeData.experience?.length === 0) weaknesses.push('No work experience');
  if (!resumeData.projects || resumeData.projects.length === 0) {
    weaknesses.push('No project portfolio');
  }

  // Job matching
  if (resumeData.skills?.includes('React') && resumeData.skills?.includes('Node.js')) {
    jobMatches.push('Full Stack Developer');
  }
  if (resumeData.skills?.includes('Python') && resumeData.skills?.includes('Machine Learning')) {
    jobMatches.push('Data Scientist');
  }
  if (resumeData.skills?.includes('Marketing')) {
    jobMatches.push('Marketing Specialist');
  }

  // Industry trends
  industryTrends.push('Remote work is becoming standard');
  industryTrends.push('AI/ML skills are in high demand');
  industryTrends.push('Full-stack development is preferred');

  // Keywords extraction
  keywords.push(...(resumeData.skills || []));
  keywords.push('software engineer', 'developer', 'programmer');

  return {
    atsScore,
    strengths,
    weaknesses,
    suggestions: [
      'Add quantifiable achievements to experience',
      'Include relevant certifications',
      'Optimize for ATS with keywords',
      'Add a compelling professional summary'
    ],
    jobMatches,
    skillGaps: ['Cloud platforms', 'DevOps tools', 'Modern frameworks'],
    industryTrends,
    salaryInsights: 'Based on your experience level, expect ₹8-25 LPA in India',
    keywords,
    overallRating: Math.min(atsScore / 10, 10),
    detailedFeedback: {
      summary: resumeData.personalInfo?.summary ? 'Good summary present' : 'Add a compelling summary',
      experience: resumeData.experience?.length > 0 ? 'Experience section is good' : 'Add work experience',
      skills: resumeData.skills?.length > 0 ? 'Skills are listed' : 'Expand skills section',
      projects: resumeData.projects?.length > 0 ? 'Projects included' : 'Add relevant projects',
      education: resumeData.education?.length > 0 ? 'Education present' : 'Add education details'
    }
  };
};

export const getJobRecommendations = async (resumeData: any): Promise<JobMatch[]> => {
  const analysis = await analyzeResumeWithAI(resumeData);
  const recommendations: JobMatch[] = [];
  analysis.jobMatches.forEach(jobTitle => {
    recommendations.push({
      jobTitle,
      company: 'Various Companies',
      matchScore: Math.floor(Math.random() * 30) + 70,
      reason: `Strong match based on your ${analysis.strengths.join(', ')}`,
      salary: '₹8-25 LPA',
      requirements: analysis.skillGaps
    });
  });
  return recommendations.sort((a, b) => b.matchScore - a.matchScore);
};

export const getCareerInsights = async (resumeData: any): Promise<any> => {
  const analysis = await analyzeResumeWithAI(resumeData);
  return {
    marketTrends: analysis.industryTrends,
    salaryInsights: analysis.salaryInsights,
    skillGaps: analysis.skillGaps,
    recommendations: analysis.suggestions,
    keywords: analysis.keywords
  };
}; 
