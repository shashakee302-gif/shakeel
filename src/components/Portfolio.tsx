import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertCircle, X, Brain } from 'lucide-react';
import { ResumeData } from '../utils/pdfGenerator';
import toast from 'react-hot-toast';

interface ResumeImporterProps {
  onDataImported: (data: ResumeData) => void;
  onClose: () => void;
}

const ResumeImporter: React.FC<ResumeImporterProps> = ({ onDataImported, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [extractedData, setExtractedData] = useState<ResumeData | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [processingStep, setProcessingStep] = useState<string>('');
  const [showManualInput, setShowManualInput] = useState<boolean>(false);
  const [manualText, setManualText] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragleave' || e.type === 'dragover') {
      setDragActive(e.type !== 'dragleave');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    console.log('Handling file:', file.name, 'Type:', file.type, 'Size:', file.size);
    
    const allowedTypes = ['application/pdf', 'text/plain'];
    const allowedExtensions = ['.pdf', '.txt'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      toast.error(`Invalid file type. Please upload a PDF or TXT file.`);
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }
    
    setUploading(true);
    setProcessingStep('Reading file...');
    
    try {
      let text = '';
      const isPDF = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      
      if (isPDF) {
        // Try multiple PDF parsing methods
        const formData = new FormData();
        formData.append('file', file);
        
        try {
          // Try local server first
          const response = await fetch('http://localhost:5000/extract-pdf', {
            method: 'POST',
            body: formData,
          });
          
          if (response.ok) {
            const data = await response.json();
            text = data.text || '';
          } else {
            throw new Error('Server not available');
          }
        } catch (serverError) {
          console.log('Local server not available, using client-side parsing');
          // Fallback to client-side PDF parsing using pdf-parse
          try {
            const arrayBuffer = await file.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            
            // Simple PDF text extraction (basic implementation)
            const decoder = new TextDecoder('utf-8');
            const pdfText = decoder.decode(uint8Array);
            
            // Extract text between stream and endstream
            const textMatches = pdfText.match(/stream\s*([\s\S]*?)\s*endstream/g);
            if (textMatches) {
              text = textMatches.join(' ').replace(/stream|endstream/g, '').trim();
            } else {
              // Try to extract any readable text
              text = pdfText.replace(/[^\x20-\x7E\n\r]/g, ' ').replace(/\s+/g, ' ').trim();
            }
            
            if (!text || text.length < 50) {
              throw new Error('Could not extract readable text from PDF');
            }
          } catch (clientError) {
            throw new Error('PDF parsing failed. Please try converting to text file or use manual entry.');
          }
        }
      } else {
        // Handle text files directly
        text = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string || '');
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsText(file);
        });
      }
      
      if (!text || text.trim().length < 10) {
        throw new Error('No readable text found in file. Please check the file format.');
      }
      
      setExtractedText(text);
      setProcessingStep('Analyzing content...');
      const parsedData = await parseResumeTextAdvanced(text);
      setExtractedData(parsedData);
      toast.success('🎉 Resume data extracted and analyzed successfully!');
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error processing file:', error);
      toast.error(`❌ ${errorMessage}`);
    } finally {
      setUploading(false);
      setProcessingStep('');
    }
  };

  // Improved resume parsing function
  const parseResumeTextAdvanced = async (text: string): Promise<ResumeData> => {
    console.log('Parsing text:', text.substring(0, 200) + '...');
    
    const resumeData: ResumeData = {
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
        linkedin: '',
        github: ''
      },
      experience: [],
      education: [],
      skills: [],
      projects: []
    };

    // Clean and normalize text
    const cleanText = text.replace(/\s+/g, ' ').trim();
    
    // Extract email (improved pattern)
    const emailMatch = cleanText.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
    if (emailMatch) resumeData.personalInfo.email = emailMatch[0];

    // Extract phone (comprehensive Indian and international patterns)
    const phonePatterns = [
      /(\+91[-.\s]?)?[6-9]\d{9}/,  // Indian mobile
      /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/, // International
      /\d{10}/, // 10 digit number
      /\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/ // US format
    ];
    
    for (const pattern of phonePatterns) {
      const phoneMatch = cleanText.match(pattern);
      if (phoneMatch) {
        resumeData.personalInfo.phone = phoneMatch[0];
        break;
      }
    }
    if (phoneMatch) resumeData.personalInfo.phone = phoneMatch[0];

    // Extract LinkedIn (improved pattern)
    const linkedinMatch = cleanText.match(/(linkedin\.com\/in\/[a-zA-Z0-9\-]+)|(linkedin\.com\/company\/[a-zA-Z0-9\-]+)|(@?[a-zA-Z0-9\-]+\s*linkedin)/i);
    if (linkedinMatch) {
      let linkedinUrl = linkedinMatch[0];
      if (!linkedinUrl.includes('linkedin.com')) {
        linkedinUrl = `linkedin.com/in/${linkedinUrl.replace('@', '').replace('linkedin', '').trim()}`;
      }
      resumeData.personalInfo.linkedin = linkedinUrl.startsWith('http') ? linkedinUrl : `https://${linkedinUrl}`;
    }

    // Extract GitHub (improved pattern)
    const githubMatch = cleanText.match(/(github\.com\/[a-zA-Z0-9\-]+)|(GitHub:\s*[a-zA-Z0-9\-]+)|(@?[a-zA-Z0-9\-]+\s*github)/i);
    if (githubMatch) {
      let githubUrl = githubMatch[0];
      if (!githubUrl.includes('github.com')) {
        githubUrl = `github.com/${githubUrl.replace('@', '').replace(/github:?/i, '').trim()}`;
      }
      resumeData.personalInfo.github = githubUrl.startsWith('http') ? githubUrl : `https://${githubUrl}`;
    }

    // Extract name (much improved pattern)
    const namePatterns = [
      /^[A-Z][a-z]+ [A-Z][a-z]+(?: [A-Z][a-z]+)?$/m,
      /(?:^|\n)\s*([A-Z][a-z]+ [A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s*$/m,
      /(?:^|\n)\s*([A-Z][a-z]+\s+[A-Z]\.?\s+[A-Z][a-z]+)/,
      /(?:^|\n)\s*([A-Z][a-z]+,\s*[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/,
      /Name:\s*([A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
      /^([A-Z][A-Z\s]+)$/m // All caps name
    ];
    
    for (const pattern of namePatterns) {
      const match = cleanText.match(pattern);
      if (match) {
        let name = (match[1] || match[0]).replace(/^\n/, '').replace(/Name:\s*/i, '').trim();
        // Convert all caps to proper case
        if (name === name.toUpperCase()) {
          name = name.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
        }
        resumeData.personalInfo.name = name;
        break;
      }
    }

    // Extract location (improved for Indian cities)
    const locationPatterns = [
      /(?:Address|Location):\s*([^,\n]+(?:,\s*[^,\n]+)*)/i,

    // Extract summary
    const summaryPatterns = [
      /(?:summary|objective|profile)[:\s]*([^]+?)(?=\n\s*\n|\n\s*[A-Z][^a-z]|\n\s*[a-z]+\s*:)/i,
      /(?:^|\n)\s*([A-Z][^.!?]{50,300}[.!?])(?=\n\s*\n|\n\s*[A-Z][^a-z])/
    ];
    
    for (const pattern of summaryPatterns) {
      const match = text.match(pattern);
      if (match && match[1] && match[1].length > 30) {
        resumeData.personalInfo.summary = match[1].trim();
        break;
      }
    }

    // Extract skills (expanded list)
    const commonSkills = [
      'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'PHP', 'Ruby', 'Go', 'Swift', 'Kotlin',
      'React', 'Angular', 'Vue', 'Svelte', 'Next.js', 'Nuxt.js', 'Node.js', 'Express', 'Django', 'Flask',
      'Spring', 'Laravel', 'Ruby on Rails', 'jQuery', 'Bootstrap', 'Tailwind CSS', 'SASS', 'LESS',
      'HTML', 'CSS', 'REST', 'GraphQL', 'gRPC', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite',
      'Firebase', 'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins', 'Git', 'CI/CD',
      'Agile', 'Scrum', 'TDD', 'DevOps', 'Machine Learning', 'Data Science', 'TensorFlow', 'PyTorch'
    ];
    
    const foundSkills: string[] = [];
    for (const skill of commonSkills) {
      // Case-insensitive match with word boundaries
      const regex = new RegExp(`\\b${skill}\\b`, 'i');
      if (regex.test(text) && !foundSkills.some(s => s.toLowerCase() === skill.toLowerCase())) {
        foundSkills.push(skill);
      }
    }
    resumeData.skills = foundSkills;

    // Extract experience (improved pattern)
    const experiencePatterns = [
      /([^•\n]+?)\s*[-–—]\s*([^•\n]+?)\s*[-–—]\s*([^•\n]+?)\s*[-–—]\s*([^•\n]*?(?:\n.*?)*?)(?=\n\s*(?:[A-Z][^a-z]|$))/g,
      /([^•\n]+?)\s*at\s*([^•\n]+?)\s*[-–—]\s*([^•\n]+?)(?:\n.*?)*?(?=\n\s*(?:[A-Z][^a-z]|$))/g,
      /(.*?)\n(.*?)\n(.*?)\n(.*?(?:\n.*?)*?)(?=\n\s*\n)/g
    ];
    
    const experienceSection = text.match(/experience[\s\S]*?(?=education|skills|projects|$)/i)?.[0] || text;
    
    for (const pattern of experiencePatterns) {
      let match;
      while ((match = pattern.exec(experienceSection)) !== null) {
        if (match[1] && match[2] && match[3]) {
          resumeData.experience.push({
            title: match[1].trim(),
            company: match[2].trim(),
            duration: match[3].trim(),
            description: match[4] ? match[4].trim() : 'Experience details extracted from resume.'
          });
        }
      }
    }

    // Extract education (improved pattern)
    const educationPatterns = [
      /([^•\n]+?)\s*[-–—]\s*([^•\n]+?)\s*[-–—]\s*([^•\n]+?)(?:\n.*?)*?(?=\n\s*(?:[A-Z][^a-z]|$))/g,
      /(.*?)\n(.*?)\n(.*?)\n(?=\n\s*\n)/g,
      /(Bachelor|Master|PhD|B\.S\.|B\.A\.|M\.S\.|M\.A\.|Ph\.D\.).*?(University|College|Institute|School).*?(\d{4})/gi
    ];
    
    const educationSection = text.match(/education[\s\S]*?(?=experience|skills|projects|$)/i)?.[0] || text;
    
    for (const pattern of educationPatterns) {
      let match;
      while ((match = pattern.exec(educationSection)) !== null) {
        if (match[1] && match[2]) {
          resumeData.education.push({
            degree: match[1].trim(),
            institution: match[2].trim(),
            year: match[3] ? match[3].trim() : '',
            gpa: match[4] ? match[4].trim() : ''
          });
        }
      }
    }

    return resumeData;
  };

  const handleManualTextProcess = async () => {
    if (!manualText.trim()) {
      toast.error('Please enter some text to process');
      return;
    }

    setUploading(true);
    setProcessingStep('Processing text...');
    
    try {
      setExtractedText(manualText);
      const parsedData = await parseResumeTextAdvanced(manualText);
      setExtractedData(parsedData);
      setShowManualInput(false);
      toast.success('Resume data extracted successfully!');
    } catch (error) {
      console.error('Error processing manual text:', error);
      toast.error('Failed to process text. Please try again.');
    } finally {
      setUploading(false);
      setProcessingStep('');
    }
  };

  const handleManualEntry = () => {
    const templateData: ResumeData = {
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
        linkedin: '',
        github: ''
      },
      experience: [{
        title: '',
        company: '',
        duration: '',
        description: ''
      }],
      education: [{
        degree: '',
        institution: '',
        year: '',
        gpa: ''
      }],
      skills: [],
      projects: []
    };
    
    onDataImported(templateData);
    toast.success('Manual entry template loaded!');
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Import Resume
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Upload your existing resume to auto-fill the form
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {!extractedData ? (
            <>
              {/* Upload Area */}
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.txt"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={uploading}
                />
                
                <div className="flex flex-col items-center justify-center h-40">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                  
                  <span className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {uploading ? 'Processing...' : 'Drag & Drop or Click to Upload'}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    PDF or TXT files, max 10MB
                  </span>
                  
                  {uploading && (
                    <div className="mt-4 flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="text-blue-600 text-sm">{processingStep}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Alternative Options */}
              <div className="mt-6 space-y-4">
                <div className="flex flex-wrap gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowManualInput(true)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Paste Text</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleManualEntry}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all text-sm"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Start Fresh</span>
                  </motion.button>
                </div>

                {/* Manual Text Input */}
                {showManualInput && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                  >
                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-3">
                      📋 Paste Your Resume Text:
                    </h4>
                    <textarea
                      value={manualText}
                      onChange={(e) => setManualText(e.target.value)}
                      placeholder="Paste your resume text here..."
                      className="w-full h-32 p-3 border border-blue-300 dark:border-blue-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="flex space-x-3 mt-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleManualTextProcess}
                        disabled={uploading || !manualText.trim()}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm disabled:opacity-50"
                      >
                        <Brain className="w-4 h-4" />
                        <span>{uploading ? 'Processing...' : 'Extract Data'}</span>
                      </motion.button>
                      <button
                        onClick={() => setShowManualInput(false)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </>
          ) : (
            /* Results Display */
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">Data extracted successfully!</span>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Extracted Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Name:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{extractedData.personalInfo.name || 'Not found'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Email:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{extractedData.personalInfo.email || 'Not found'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Phone:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{extractedData.personalInfo.phone || 'Not found'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Skills:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{extractedData.skills.length} skills found</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Experience:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{extractedData.experience.length} entries</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Education:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{extractedData.education.length} entries</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onDataImported(extractedData);
                    onClose();
                  }}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Use Extracted Data
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setExtractedData(null)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Try Again
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResumeImporter;
