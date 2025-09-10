// Job Service
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  posted: string;
  url: string;
  logo: string;
  remote: boolean;
  skills: string[];
  application_link?: string;
  created_at?: string;
  job_type?: string;
}

export interface JobFilters {
  location?: string;
  type?: string;
  experience?: string;
  remote?: boolean;
  skills?: string[];
}

import { JobStorageService } from '../services/jobStorageService';

const API_BASE_URL = 'https://trinidad-turner-install-zus.trycloudflare.com';

// Cache for API responses
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

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

// Main job search function
export const searchJobs = async (query: string = '', filters: JobFilters = {}): Promise<Job[]> => {
  const cacheKey = `search-${query}-${JSON.stringify(filters)}`;
  const cachedResult = getCachedData(cacheKey);
  
  if (cachedResult) {
    return cachedResult;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    let jobs = normalizeJobData(Array.isArray(data) ? data : (data.jobs || data.data || []));
    
    // Apply client-side filtering
    jobs = applyFilters(jobs, query, filters);
    
    setCachedData(cacheKey, jobs);
    return jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    // Return stored jobs if API fails
    const storedJobs = JobStorageService.getStoredJobs();
    return applyFilters(storedJobs, query, filters);
  }
};

// Get job details by ID
export const getJobById = async (jobId: string): Promise<Job | null> => {
  const cacheKey = `job-${jobId}`;
  const cachedResult = getCachedData(cacheKey);
  
  if (cachedResult) {
    return cachedResult;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const job = normalizeJobData([data])[0] || null;
    
    if (job) {
      setCachedData(cacheKey, job);
    }
    
    return job;
  } catch (error) {
    console.error('Error fetching job details:', error);
    return null;
  }
};

// Apply client-side filtering
const applyFilters = (jobs: Job[], query: string, filters: JobFilters): Job[] => {
  return jobs.filter(job => {
    // Search query filter
    if (query) {
      const searchTerm = query.toLowerCase();
      const searchableText = `${job.title} ${job.company} ${job.description} ${job.skills.join(' ')}`.toLowerCase();
      if (!searchableText.includes(searchTerm)) {
        return false;
      }
    }
    
    // Location filter
    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    // Job type filter
    if (filters.type && job.type !== filters.type) {
      return false;
    }
    
    // Experience filter
    if (filters.experience && !job.experience.toLowerCase().includes(filters.experience.toLowerCase())) {
      return false;
    }
    
    // Remote filter
    if (filters.remote !== undefined && job.remote !== filters.remote) {
      return false;
    }
    
    // Skills filter
    if (filters.skills && filters.skills.length > 0) {
      const hasMatchingSkill = filters.skills.some(skill => 
        job.skills.some(jobSkill => 
          jobSkill.toLowerCase().includes(skill.toLowerCase())
        )
      );
      if (!hasMatchingSkill) {
        return false;
      }
    }
    
    return true;
  });
};

// Get recommended jobs (now just returns all jobs since no login required)
export const getRecommendedJobs = async (skills: string[], experience?: string): Promise<Job[]> => {
  // Since no login required, just return filtered jobs based on skills
  return searchJobs('', { skills });
};

// Get job market analytics
export const getJobMarketAnalytics = async () => {
  try {
    const jobs = await searchJobs();
    return {
      totalJobs: jobs.length,
      trendingSkills: extractTrendingSkills(jobs),
      topCompanies: extractTopCompanies(jobs),
      averageSalary: 'Competitive',
      growthRate: '15%'
    };
  } catch (error) {
    console.error('Error fetching market analytics:', error);
    return {
      totalJobs: 0,
      trendingSkills: ['JavaScript', 'React', 'Python', 'Node.js'],
      topCompanies: ['Google', 'Microsoft', 'Amazon', 'Meta'],
      averageSalary: '₹12-25 LPA',
      growthRate: '15%'
    };
  }
};

// Extract trending skills from jobs
const extractTrendingSkills = (jobs: Job[]): string[] => {
  const skillCount = new Map<string, number>();
  
  jobs.forEach(job => {
    job.skills.forEach(skill => {
      skillCount.set(skill, (skillCount.get(skill) || 0) + 1);
    });
  });
  
  return Array.from(skillCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([skill]) => skill);
};

// Extract top companies from jobs
const extractTopCompanies = (jobs: Job[]): string[] => {
  const companyCount = new Map<string, number>();
  
  jobs.forEach(job => {
    companyCount.set(job.company, (companyCount.get(job.company) || 0) + 1);
  });
  
  return Array.from(companyCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([company]) => company);
};

// Record user job search for analytics (optional)
export const recordUserJobSearch = async (query: string, location?: string) => {
  try {
    // You can implement analytics endpoint if needed
    console.log('Search recorded:', { query, location });
  } catch (error) {
    console.error('Error recording search:', error);
  }
};

// Normalize job data from API response
const normalizeJobData = (jobs: any[]): Job[] => {
  return jobs.map((job: any, index: number) => ({
    id: job.id || `job-${index}-${Date.now()}`,
    title: job.title || 'Job Position',
    company: job.company || 'Company',
    location: job.location || 'Location',
    type: job.job_type || job.type || 'full-time',
    experience: job.experience || job.experience_level || 'Not specified',
    salary: job.salary || job.salary_range || 'Competitive',
    description: job.description || 'No description available',
    requirements: job.requirements || job.skills || [],
    posted: job.created_at ? formatDate(job.created_at) : 'Recently',
    url: job.application_link || job.url || '#',
    logo: job.logo || job.company_logo || '',
    remote: job.remote || job.is_remote || false,
    skills: job.skills || job.requirements || [],
    application_link: job.application_link,
    created_at: job.created_at,
    job_type: job.job_type
  }));
};

// Format date helper
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  } catch (error) {
    return 'Recently';
  }
};

// Share job function
export const shareJob = (job: Job): void => {
  const shareUrl = `${window.location.origin}/job/${job.id}`;
  const shareText = `Check out this job: ${job.title} at ${job.company}`;
  
  if (navigator.share) {
    navigator.share({
      title: shareText,
      url: shareUrl,
    }).catch(console.error);
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(shareUrl).then(() => {
      console.log('Job link copied to clipboard');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    });
  }
};
