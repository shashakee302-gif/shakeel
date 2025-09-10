import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeTemplates } from '../data/resumeTemplates';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

const templates = resumeTemplates;

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplate, onTemplateSelect }) => {
  const [showSheet, setShowSheet] = useState(false);

  const handleOpen = () => setShowSheet(true);
  const handleClose = () => setShowSheet(false);
  const handleSelect = (id: string) => {
    onTemplateSelect(id);
    setShowSheet(false);
  };

  return (
    <div className="w-full">
      {/* Change Template Button - Full Width */}
      <button
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-bold shadow-lg text-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
        onClick={handleOpen}
      >
        <span role="img" aria-label="template">🎨</span>
        <span>Change Template</span>
      </button>
      {/* Bottom Sheet/Modal for ALL devices */}
      <AnimatePresence>
        {showSheet && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40"
            onClick={handleClose}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="w-full bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl p-4 sm:p-8 max-h-[90vh] overflow-y-auto mx-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Choose Your Template
                </h2>
                <p className="text-gray-500 dark:text-gray-400">Select a design that best represents your professional style</p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <motion.div
                      key={template.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex flex-col h-full rounded-xl border-2 transition-all cursor-pointer overflow-hidden group ${selectedTemplate === template.id ? 'border-blue-500 ring-2 ring-blue-400 ring-opacity-50' : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'}`}
                      onClick={() => handleSelect(template.id)}
                    >
                      <div className="relative h-40 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <img 
                          src={template.preview} 
                          alt={template.name} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <div className="text-white">
                            <h3 className="text-lg font-bold">{template.name}</h3>
                            <p className="text-sm text-gray-200">{template.description}</p>
                          </div>
                        </div>
                        {selectedTemplate === template.id && (
                          <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-800 flex-1">
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {template.features.map((feature, i) => (
                            <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <button
                className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                onClick={handleClose}
              >
                Confirm Selection
              </button>
            </motion.div>
          </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TemplateSelector;
