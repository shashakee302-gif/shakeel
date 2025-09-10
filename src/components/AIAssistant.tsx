import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, FileText, Briefcase, TrendingUp } from 'lucide-react';
import { analyzeResumeWithGemini, getJobRecommendationsWithAI, getChatResponse } from '../services/geminiService';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface AIAssistantProps {
  resumeData?: any;
  isLoggedIn: boolean;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ resumeData, isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm Panda AI 🐼, your career assistant. I can help you analyze your resume, find jobs, and provide career advice. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    {
      icon: FileText,
      label: "Analyze Resume",
      action: () => handleQuickAction("analyze-resume")
    },
    {
      icon: Briefcase,
      label: "Find Jobs",
      action: () => handleQuickAction("find-jobs")
    },
    {
      icon: TrendingUp,
      label: "Career Tips",
      action: () => handleQuickAction("career-tips")
    }
  ];

  const handleQuickAction = async (action: string) => {
    let message = '';
    switch (action) {
      case 'analyze-resume':
        message = 'Please analyze my resume and provide feedback';
        break;
      case 'find-jobs':
        message = 'Help me find jobs that match my skills';
        break;
      case 'career-tips':
        message = 'Give me some career advancement tips';
        break;
    }
    
    if (message) {
      await handleSendMessage(message);
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      let response = '';

      // Handle different types of queries
      if (text.toLowerCase().includes('analyze') || text.toLowerCase().includes('resume')) {
        if (resumeData) {
          const analysis = await analyzeResumeWithGemini(resumeData);
          response = `🎯 **Resume Analysis Complete!**\n\n**ATS Score:** ${analysis.atsScore}/100\n\n**Strengths:**\n${analysis.strengths.map(s => `• ${s}`).join('\n')}\n\n**Areas for Improvement:**\n${analysis.weaknesses.map(w => `• ${w}`).join('\n')}\n\n**Recommendations:**\n${analysis.suggestions.map(s => `• ${s}`).join('\n')}`;
        } else {
          response = "I'd love to analyze your resume! Please create or upload a resume first using the Resume Builder section.";
        }
      } else if (text.toLowerCase().includes('job') || text.toLowerCase().includes('career')) {
        if (isLoggedIn && resumeData?.skills) {
          const jobs = await getJobRecommendationsWithAI(resumeData.skills);
          response = `💼 **Job Recommendations Based on Your Skills:**\n\n${jobs.slice(0, 5).map((job, i) => `${i + 1}. **${job.title}** at ${job.company}\n   📍 ${job.location} | 💰 ${job.salary}\n   🎯 Match: ${job.matchScore}%\n`).join('\n')}`;
        } else if (!isLoggedIn) {
          response = "To get personalized job recommendations, please log in to access the Career Portal!";
        } else {
          response = "I need your resume data to provide job recommendations. Please create a resume first!";
        }
      } else {
        // Use API for general AI response
        response = await getChatResponse(text, { resumeData, isLoggedIn });
      }

      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000);

    } catch (error) {
      console.error('AI Assistant error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const getAIResponse = async (query: string): Promise<string> => {
    // Simple rule-based responses for common queries
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
      return "Hello! 👋 I'm Panda AI, your personal career assistant. I'm here to help you with resume analysis, job searching, and career advice. What would you like to work on today?";
    }
    
    if (lowerQuery.includes('help')) {
      return "I can help you with:\n\n🔍 **Resume Analysis** - Get ATS scores and improvement suggestions\n💼 **Job Matching** - Find opportunities that match your skills\n📈 **Career Advice** - Tips for professional growth\n📝 **Resume Building** - Guidance on creating effective resumes\n🎯 **Interview Prep** - Common questions and best practices\n\nWhat would you like to explore?";
    }
    
    if (lowerQuery.includes('salary') || lowerQuery.includes('pay')) {
      return "💰 **Salary Insights:**\n\nSalary ranges vary by role, experience, and location:\n• **Entry Level (0-2 years):** ₹3-8 LPA\n• **Mid Level (2-5 years):** ₹8-20 LPA\n• **Senior Level (5+ years):** ₹20-50 LPA\n• **Leadership Roles:** ₹50+ LPA\n\nFactors affecting salary:\n• Technical skills and certifications\n• Company size and industry\n• Location (metro vs non-metro)\n• Negotiation skills\n\nWould you like specific salary data for your field?";
    }
    
    return "That's an interesting question! I'm here to help with career-related topics like resume building, job searching, and professional development. Could you tell me more about what specific career help you're looking for?";
  };

  const formatMessage = (content: string) => {
    // Convert markdown-like formatting to JSX
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <div key={index} className="font-bold text-blue-600 dark:text-blue-400 mb-2 text-base">{line.slice(2, -2)}</div>;
      }
      if (line.startsWith('• ')) {
        return <div key={index} className="ml-4 mb-1 flex items-start space-x-2">
          <span className="text-blue-500 mt-1">•</span>
          <span>{line.slice(2)}</span>
        </div>;
      }
      if (line.match(/^\d+\./)) {
        return <div key={index} className="mb-1 font-medium text-purple-600 dark:text-purple-400">{line}</div>;
      }
      return line ? <div key={index} className="mb-1 leading-relaxed">{line}</div> : <div key={index} className="mb-2"></div>;
    });
  };

  const toggleChat = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // Prevent event bubbling
    setIsOpen(!isOpen);
    if (!isOpen && inputRef.current) {
      // Focus input when opening chat
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const chatWindow = document.querySelector('.ai-chat-window');
      const chatButton = document.querySelector('.ai-chat-button');
      
      if (isOpen && chatWindow && !chatWindow.contains(target) && !chatButton?.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={toggleChat}
        className="ai-chat-button fixed bottom-6 right-6 z-50 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        transition={{ type: "spring" }}
        aria-label={isOpen ? 'Close chat' : 'Open chat with AI Assistant'}
        aria-expanded={isOpen}
      >
        <div className="relative flex flex-col items-center">
          <motion.div 
            className="text-3xl mb-1"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🐼
          </motion.div>
          <div className="text-xs font-bold opacity-90 group-hover:opacity-100 transition-opacity">
            AI
          </div>
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center"
            animate={{ 
              scale: [1, 1.3, 1],
              boxShadow: ["0 0 0 0 rgba(34, 197, 94, 0.7)", "0 0 0 10px rgba(34, 197, 94, 0)", "0 0 0 0 rgba(34, 197, 94, 0)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
              role="presentation"
            />
            
            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="ai-chat-window fixed bottom-24 right-6 w-[calc(100%-3rem)] sm:w-full max-w-md h-[70vh] max-h-[800px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
              role="dialog"
              aria-labelledby="chat-title"
              aria-modal="true"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 id="chat-title" className="font-bold">Panda AI Assistant</h3>
                    <div className="text-xs opacity-90">Your AI Career Assistant</div>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="p-1 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Actions */}
              <div className="p-2 sm:p-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 overflow-x-auto">
                <div className="grid grid-cols-3 gap-2 min-w-max">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      onClick={action.action}
                      className="flex flex-col items-center space-y-1 bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 px-2 py-3 rounded-xl text-xs hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all shadow-sm border border-blue-100 dark:border-blue-800"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={action.label}
                    >
                      <action.icon className="w-4 h-4" />
                      <span className="font-medium">{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-900">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <motion.div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                          : 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white border-2 border-white/20'
                      }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {message.type === 'user' ? (
                          <User className="w-5 h-5" />
                        ) : (
                          <motion.span 
                            className="text-lg"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            🐼
                          </motion.span>
                        )}
                      </motion.div>
                      <motion.div 
                        className={`p-4 rounded-2xl shadow-lg ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md border border-blue-400'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md border border-gray-200 dark:border-gray-700'
                      }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="text-sm whitespace-pre-line">
                          {typeof message.content === 'string' ? formatMessage(message.content) : message.content}
                        </div>
                        <div className="text-xs opacity-70 mt-2 font-medium">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg border-2 border-white/20">
                        <motion.span 
                          className="text-lg"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          🐼
                        </motion.span>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-bl-md shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Panda AI is thinking...</span>
                        </div>
                        <div className="flex space-x-2">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                              animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 sm:py-3 text-sm sm:text-base rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isTyping}
                    ref={inputRef}
                    aria-label="Type your message"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    className="p-2 sm:p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;