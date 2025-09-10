import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  FileText, 
  Globe, 
  Smartphone, 
  Zap, 
  Users,
  Download,
  Shield,
  Sparkles
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Feedback",
      description: "Get intelligent suggestions to improve your resume with AI analysis and scoring.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: FileText,
      title: "ATS-Friendly Templates",
      description: "Choose from professionally designed templates that pass ATS screening systems.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Globe,
      title: "Portfolio Website",
      description: "Auto-generate a beautiful portfolio website hosted on GitHub Pages.",
      color: "from-emerald-500 to-green-500"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Build and edit your resume on any device with our responsive design.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Zap,
      title: "Quick Setup",
      description: "Import data from LinkedIn or Google Forms to get started in minutes.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Download,
      title: "PDF Export",
      description: "Download your resume as a high-quality PDF ready for job applications.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Share your resume with mentors and get feedback from industry experts.",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and secure. We never share your information.",
      color: "from-gray-500 to-slate-500"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 px-4 py-2 rounded-full text-sm font-medium text-blue-800 dark:text-blue-200 border border-blue-200/50 dark:border-blue-700/50 mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>Powerful Features</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Everything You Need to
            <span className="gradient-text"> Stand Out</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our comprehensive suite of tools helps you create professional resumes and portfolios 
            that get noticed by recruiters and hiring managers.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
              className="group relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl mb-4 shadow-lg`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            Explore All Features
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;