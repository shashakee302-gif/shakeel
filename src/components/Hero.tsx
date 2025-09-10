import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, FileText, Sparkles, Zap, Globe } from 'lucide-react';

const Hero: React.FC = () => {
  const floatingElements = [
    { icon: FileText, delay: 0, position: 'top-20 left-10' },
    { icon: Star, delay: 1, position: 'top-32 right-20' },
    { icon: Globe, delay: 2, position: 'top-40 left-1/4' },
    { icon: Zap, delay: 0.5, position: 'bottom-32 right-10' },
    { icon: Users, delay: 1.5, position: 'bottom-20 left-16' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 pt-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {floatingElements.map((Element, index) => (
          <motion.div
            key={index}
            className={`absolute ${Element.position} hidden lg:block`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ delay: Element.delay, duration: 1 }}
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                delay: Element.delay
              }}
              className="p-4 bg-gradient-to-r from-blue-200/30 to-purple-200/30 dark:from-blue-800/30 dark:to-purple-800/30 rounded-2xl backdrop-blur-sm"
            >
              <Element.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 px-4 py-2 rounded-full text-sm font-medium text-blue-800 dark:text-blue-200 border border-blue-200/50 dark:border-blue-700/50"
          >
            <span className="text-lg">🐼</span>
            <span>AI-Powered Career Platform</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              ✨
            </motion.div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold"
          >
            <span className="gradient-text">Unlock Your</span>
            <br />
            <span className="text-gray-900 dark:text-white">Career Potential</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            AI-powered resume analysis, smart job matching, and career guidance. 
            Join thousands of professionals who've accelerated their careers with CareerPanda.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <motion.a
              href="#resume"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center space-x-2 overflow-hidden"
            >
              <span className="relative z-10">Start Building Free</span>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
              />
            </motion.a>
            
            <motion.a
              href="#templates"
              whileHover={{ 
                scale: 1.05,
                y: -2,
                backgroundColor: 'rgba(59, 130, 246, 0.1)'
              }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl font-semibold text-lg border-2 border-blue-500/30 dark:border-blue-400/30 text-blue-600 dark:text-blue-400 hover:border-blue-500/50 dark:hover:border-blue-400/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Browse Templates</span>
              <motion.div
                animate={{ x: [0, 0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FileText className="w-5 h-5" />
              </motion.div>
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-4 gap-8 pt-16 max-w-4xl mx-auto"
          >
            {[
              { number: "30+", label: "ATS Templates" },
              { number: "1000+", label: "Real Job Opportunities" },
              { number: "95%", label: "Success Rate" },
              { number: "500+", label: "Students Helped" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
              >
                <div className="text-3xl font-bold gradient-text">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;