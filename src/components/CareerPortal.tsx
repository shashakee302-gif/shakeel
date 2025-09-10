import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  Filter,
  Briefcase,
  Users,
  Star,
  ExternalLink,
  BookmarkPlus,
  Bookmark,
  TrendingUp,
  Award,
  Target,
  Zap,
  Building,
  Globe,
  Heart,
  X,
  ChevronDown,
  ChevronUp,
  Share2,
  Copy,
  Eye,
  CheckCircle,
  Calendar,
  Award as AwardIcon,
  Code,
  Layers,
  Settings,
  Wifi,
  WifiOff
} from 'lucide-react';
import { searchJobs, getJobMarketAnalytics, Job } from '../services/jobService';
import { JobStorageService } from '../services/jobStorageService';
import AdminPortal from './AdminPortal';
import toast from 'react-hot-toast';

interface JobViewModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (jobId: string) => void;
  onShare: (job: Job) => void;
  onApply: (job: Job) => void;
  isSaved: boolean;
}

const JobViewModal: React.FC<JobViewModalProps> = ({ 
  job, 
  isOpen, 
  onClose, 
  onSave, 
  onShare, 
  onApply, 
  isSaved 
}) => {
  if (!job || !isOpen) return null;

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200';
      case 'part-time': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200';
      case 'contract': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200';
      case 'internship': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close job details"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                {job.logo ? (
                  <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-xl object-cover" />
                ) : (
                  <Building className="w-8 h-8 text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
                  {job.title}
                </h1>
                <p className="text-xl text-blue-100 font-semibold mb-2">
                  {job.company}
                </p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4" />
                    <span>{job.posted}</span>
                  </div>
                  {job.salary && job.salary !== 'Competitive' && (
                    <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                  )}
                  {job.remote && (
                    <div className="bg-green-500/80 px-3 py-1 rounded-full text-sm font-medium">
                      Remote
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Job Type and Experience */}
                <div className="flex flex-wrap gap-3">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${getJobTypeColor(job.type)}`}>
                    {job.type.replace('-', ' ')}
                  </span>
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium">
                    {job.experience}
                  </span>
                </div>

                {/* Job Description */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    <span>Job Description</span>
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {job.description}
                    </p>
                  </div>
                </div>

                {/* Requirements */}
                {job.requirements && job.requirements.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Requirements</span>
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                      <ul className="space-y-2">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700 dark:text-gray-300">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Skills Required */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                    <Code className="w-5 h-5 text-purple-600" />
                    <span>Skills Required</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Info */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                    <Layers className="w-5 h-5 text-blue-600" />
                    <span>Quick Info</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Job Type</span>
                      <span className="font-medium text-gray-900 dark:text-white capitalize">
                        {job.type.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Experience</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {job.experience}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Posted</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {job.posted}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Remote</span>
                      <span className={`font-medium ${job.remote ? 'text-green-600' : 'text-gray-500'}`}>
                        {job.remote ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Company Rating */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span>Company Rating</span>
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current text-yellow-500" />
                      ))}
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">4.8</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Based on employee reviews
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onApply(job)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Apply Now</span>
                  </motion.button>

                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onSave(job.id)}
                      className={`flex items-center justify-center space-x-2 py-3 rounded-xl font-medium transition-all ${
                        isSaved
                          ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-400'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
                      }`}
                    >
                      {isSaved ? (
                        <Bookmark className="w-5 h-5" />
                      ) : (
                        <BookmarkPlus className="w-5 h-5" />
                      )}
                      <span>{isSaved ? 'Saved' : 'Save'}</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onShare(job)}
                      className="flex items-center justify-center space-x-2 bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-400 py-3 rounded-xl font-medium transition-all"
                    >
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const CareerPortal: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    experience: '',
    remote: undefined as boolean | undefined,
    skills: [] as string[]
  });
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'search' | 'saved'>('search');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [marketAnalytics, setMarketAnalytics] = useState<any>(null);
  const [showAdminPortal, setShowAdminPortal] = useState(false);

  useEffect(() => {
    loadJobs();
    loadSavedJobs();
    loadMarketAnalytics();
    
    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      loadJobs(); // Refresh jobs when back online
    };
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadJobs = async () => {
    setLoading(true);
    try {
      if (isOnline) {
        // Try to fetch from API
        const apiResults = await searchJobs(searchQuery, filters);
        if (apiResults.length > 0) {
          // Merge with stored jobs and save
          const mergedJobs = JobStorageService.mergeWithApiJobs(apiResults);
          setJobs(mergedJobs);
        } else {
          // If API returns empty, use stored jobs
          const storedJobs = JobStorageService.getStoredJobs();
          setJobs(storedJobs);
        }
      } else {
        // Offline: use stored jobs only
        const storedJobs = JobStorageService.getStoredJobs();
        setJobs(storedJobs);
        if (storedJobs.length === 0) {
          toast.error('No cached jobs available. Please connect to internet.');
        }
      }
    } catch (error) {
      console.error('Error loading jobs:', error);
      // On error, fallback to stored jobs
      const storedJobs = JobStorageService.getStoredJobs();
      setJobs(storedJobs);
      if (storedJobs.length === 0) {
        toast.error('Unable to load jobs. Please check your connection.');
      } else {
        toast.info('Showing cached jobs. Some listings may be outdated.');
      }
    } finally {
      setLoading(false);
    }
  };

  const loadMarketAnalytics = async () => {
    try {
      const analytics = await getJobMarketAnalytics();
      setMarketAnalytics(analytics);
    } catch (error) {
      console.error('Failed to load market analytics:', error);
      setMarketAnalytics({
        totalJobs: 0,
        trendingSkills: ['JavaScript', 'React', 'Python', 'Node.js'],
        topCompanies: ['Google', 'Microsoft', 'Amazon', 'Flipkart'],
        averageSalary: '₹12-25 LPA',
        growthRate: '15%'
      });
    }
  };

  const loadSavedJobs = () => {
    const saved = localStorage.getItem('savedJobs');
    if (saved) {
      try {
        setSavedJobs(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved jobs:', error);
        setSavedJobs([]);
      }
    }
  };

  const handleSearch = async () => {
    await loadJobs();
  };

  const toggleSaveJob = (jobId: string) => {
    const newSavedJobs = savedJobs.includes(jobId)
      ? savedJobs.filter(id => id !== jobId)
      : [...savedJobs, jobId];
    
    setSavedJobs(newSavedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
    
    toast.success(
      savedJobs.includes(jobId) ? 'Job removed from saved' : 'Job saved successfully!',
      {
        icon: savedJobs.includes(jobId) ? '💔' : '💖',
        style: {
          borderRadius: '12px',
          background: '#1F2937',
          color: '#F9FAFB',
        },
      }
    );
  };

  const handleApplyNow = (job: Job) => {
    if (job.application_link || job.url) {
      const applyUrl = job.application_link || job.url;
      if (applyUrl && applyUrl !== '#') {
        window.open(applyUrl, '_blank', 'noopener,noreferrer');
        toast.success('Redirecting to application page...', {
          icon: '🚀',
          style: {
            borderRadius: '12px',
            background: '#059669',
            color: '#FFFFFF',
          },
        });
      } else {
        toast.error('Application link not available', {
          icon: '❌',
        });
      }
    } else {
      toast.error('Application link not available', {
        icon: '❌',
      });
    }
  };

  const handleShareJob = (job: Job) => {
    const shareData = {
      title: `${job.title} at ${job.company}`,
      text: `Check out this amazing job opportunity: ${job.title} at ${job.company} in ${job.location}. ${job.salary ? `Salary: ${job.salary}` : ''}`,
      url: job.url && job.url !== '#' ? job.url : `${window.location.origin}/job/${job.id}`,
    };
    
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData)
        .then(() => {
          toast.success('Job shared successfully!', {
            icon: '📤',
            style: {
              borderRadius: '12px',
              background: '#059669',
              color: '#FFFFFF',
            },
          });
        })
        .catch((error) => {
          console.error('Error sharing:', error);
          fallbackShare(shareData);
        });
    } else {
      fallbackShare(shareData);
    }
  };

  const fallbackShare = (shareData: any) => {
    const shareText = `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareText)
        .then(() => {
          toast.success('Job details copied to clipboard!', {
            icon: '📋',
            style: {
              borderRadius: '12px',
              background: '#3B82F6',
              color: '#FFFFFF',
            },
          });
        })
        .catch(() => {
          legacyCopyToClipboard(shareText);
        });
    } else {
      legacyCopyToClipboard(shareText);
    }
  };

  const legacyCopyToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      toast.success('Job details copied to clipboard!', {
        icon: '📋',
        style: {
          borderRadius: '12px',
          background: '#3B82F6',
          color: '#FFFFFF',
        },
      });
    } catch (err) {
      toast.error('Failed to copy job details', {
        icon: '❌',
      });
    }
    
    document.body.removeChild(textArea);
  };

  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200';
      case 'part-time': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200';
      case 'contract': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200';
      case 'internship': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const JobCard: React.FC<{ job: Job }> = ({ job }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 border border-gray-100 dark:border-gray-700 group relative overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              {job.logo ? (
                <img src={job.logo} alt={job.company} className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl object-cover" />
              ) : (
                <Building className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {job.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-semibold truncate">
                {job.company}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleShareJob(job)}
              className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-400 dark:hover:bg-green-800/50 transition-all shadow-md hover:shadow-lg"
              aria-label="Share job"
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleSaveJob(job.id)}
              className={`p-2 rounded-xl transition-all shadow-md hover:shadow-lg ${
                savedJobs.includes(job.id)
                  ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-400'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
              }`}
              aria-label={savedJobs.includes(job.id) ? 'Remove from saved' : 'Save job'}
            >
              {savedJobs.includes(job.id) ? (
                <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <BookmarkPlus className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </motion.button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4 text-xs sm:text-sm">
          <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 px-2 sm:px-3 py-1 rounded-full">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 px-2 sm:px-3 py-1 rounded-full">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">{job.posted}</span>
          </div>
          {job.salary && job.salary !== 'Competitive' && (
            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 px-2 sm:px-3 py-1 rounded-full">
              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">{job.salary}</span>
            </div>
          )}
          {job.remote && (
            <div className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
              Remote
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium capitalize ${getJobTypeColor(job.type)}`}>
            {job.type.replace('-', ' ')}
          </span>
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate bg-gray-50 dark:bg-gray-700 px-2 sm:px-3 py-1 rounded-full">
            {job.experience}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          {job.skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium shadow-sm"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 3 && (
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 sm:px-3 py-1 rounded-full">
              +{job.skills.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="flex items-center space-x-0.5 sm:space-x-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">4.8</span>
          </div>
          
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleViewJob(job)}
              className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-medium hover:from-gray-700 hover:to-gray-800 transition-all flex items-center space-x-1 sm:space-x-2 shadow-md hover:shadow-lg text-xs sm:text-sm"
            >
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>View</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleApplyNow(job)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center space-x-1 sm:space-x-2 shadow-md hover:shadow-lg text-xs sm:text-sm"
            >
              <span>Apply</span>
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="careers" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              Career Portal
            </h2>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            {/* Admin Access Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowAdminPortal(true)}
              className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
              title="Admin Portal"
            >
              <Settings className="w-5 h-5 text-white" />
            </motion.button>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover opportunities that match your skills and aspirations with our intelligent job matching system.
          </p>
          
          {/* Connection Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`inline-flex items-center space-x-2 mt-4 px-4 py-2 rounded-full text-sm font-medium ${
              isOnline 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' 
                : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
            }`}
          >
            {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            <span>{isOnline ? 'Online - Live Jobs' : 'Offline - Cached Jobs'}</span>
          </motion.div>
        </motion.div>

        {/* Enhanced Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12"
        >
          {[
            { icon: Briefcase, label: 'Active Jobs', value: marketAnalytics?.totalJobs || jobs.length || '0', color: 'from-blue-500 to-blue-600', bgColor: 'from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50' },
            { icon: Building, label: 'Companies', value: marketAnalytics?.topCompanies?.length || '10+', color: 'from-green-500 to-green-600', bgColor: 'from-green-50 to-green-100 dark:from-green-900/50 dark:to-green-800/50' },
            { icon: Users, label: 'Applications', value: '500+', color: 'from-purple-500 to-purple-600', bgColor: 'from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50' },
            { icon: Heart, label: 'Success Rate', value: '85%', color: 'from-red-500 to-red-600', bgColor: 'from-red-50 to-red-100 dark:from-red-900/50 dark:to-red-800/50' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`bg-gradient-to-br ${stat.bgColor} p-6 rounded-3xl shadow-lg text-center border border-white/50 dark:border-gray-700/50 backdrop-blur-sm`}
            >
              <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl p-4 sm:p-6 mb-8 border border-white/50 dark:border-gray-700/50"
        >
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 sm:py-4 border border-gray-200 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-base sm:text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 items-stretch sm:items-center">
              <select
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="flex-1 sm:flex-none border border-gray-200 dark:border-gray-600 rounded-xl px-3 sm:px-4 py-2 sm:py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 text-sm sm:text-base shadow-sm"
              >
                <option value="">All Locations</option>
                <option value="bangalore">Bangalore</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="pune">Pune</option>
                <option value="chennai">Chennai</option>
              </select>

              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="flex-1 sm:flex-none border border-gray-200 dark:border-gray-600 rounded-xl px-3 sm:px-4 py-2 sm:py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 text-sm sm:text-base shadow-sm"
              >
                <option value="">All Types</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span className="text-sm sm:text-base">Search Jobs</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex space-x-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg p-1 rounded-2xl mb-8 w-full overflow-x-auto shadow-lg border border-white/50 dark:border-gray-700/50"
        >
          {[
            { id: 'search', label: 'All Jobs', count: jobs.length, icon: Search },
            { id: 'saved', label: 'Saved', count: savedJobs.length, icon: Bookmark }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-medium transition-all whitespace-nowrap flex items-center justify-center space-x-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-sm sm:text-base">{tab.label}</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-semibold">({tab.count})</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Jobs Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-20"
            >
              <div className="text-center">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                  Loading amazing opportunities...
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                  Finding the perfect match for your skills
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
            >
              {activeTab === 'search' && jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <JobCard job={job} />
                </motion.div>
              ))}
              
              {activeTab === 'saved' && jobs
                .filter(job => savedJobs.includes(job.id))
                .map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <JobCard job={job} />
                  </motion.div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced No Results */}
        {!loading && (
          (activeTab === 'search' && jobs.length === 0) ||
          (activeTab === 'saved' && savedJobs.length === 0)
        ) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-full flex items-center justify-center shadow-lg">
              {activeTab === 'saved' ? (
                <Bookmark className="w-16 h-16 text-blue-600 dark:text-blue-400" />
              ) : (
                <Search className="w-16 h-16 text-blue-600 dark:text-blue-400" />
              )}
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {activeTab === 'saved' ? 'No saved jobs yet' : 'No jobs found'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg max-w-md mx-auto">
              {activeTab === 'saved'
                ? 'Start saving jobs you\'re interested in to view them here later.'
                : 'Try adjusting your search criteria or check back later for new opportunities.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchQuery('');
                  setFilters({
                    location: '',
                    type: '',
                    experience: '',
                    remote: undefined,
                    skills: []
                  });
                  handleSearch();
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                Clear Filters & Search All
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Job View Modal */}
      <JobViewModal
        job={selectedJob}
        isOpen={showJobModal}
        onClose={() => {
          setShowJobModal(false);
          setSelectedJob(null);
        }}
        onSave={toggleSaveJob}
        onShare={handleShareJob}
        onApply={handleApplyNow}
        isSaved={selectedJob ? savedJobs.includes(selectedJob.id) : false}
      />
      
      {/* Admin Portal */}
      <AdminPortal
        isOpen={showAdminPortal}
        onClose={() => setShowAdminPortal(false)}
      />
    </section>
  );
};

export default CareerPortal;
