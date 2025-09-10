import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import LoadingScreen from './components/LoadingScreen';
import AIAssistant from './components/AIAssistant';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import ResumeBuilder from './components/ResumeBuilder';
import Portfolio from './components/Portfolio';
import CareerPortal from './components/CareerPortal';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import { ResumeData } from './utils/pdfGenerator';
import { Toaster } from 'react-hot-toast';

function App() {
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading process
    const loadingSteps = [
      { progress: 20, delay: 500 },
      { progress: 40, delay: 800 },
      { progress: 60, delay: 1200 },
      { progress: 80, delay: 1500 },
      { progress: 100, delay: 2000 }
    ];

    loadingSteps.forEach(({ progress, delay }) => {
      setTimeout(() => {
        setLoadingProgress(progress);
        if (progress === 100) {
          setTimeout(() => setIsLoading(false), 500);
        }
      }, delay);
    });

    // Check for saved user data
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('user');
        setUser(null);
      }
    }

    // Load resume data
    const savedResumeData = localStorage.getItem('resumeData');
    if (savedResumeData) {
      try {
        setResumeData(JSON.parse(savedResumeData));
      } catch (e) {
        localStorage.removeItem('resumeData');
        setResumeData(undefined);
      }
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <ThemeProvider>
      <LoadingScreen 
        isLoading={isLoading} 
        progress={loadingProgress}
        message="Preparing your career success platform..."
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1F2937',
              color: '#F9FAFB',
              borderRadius: '12px',
              border: '1px solid #374151'
            }
          }}
        />
        
        <Navigation 
          user={user} 
          onLogin={() => setShowAuthModal(true)}
          onLogout={handleLogout}
        />
        <Hero />
        <Features />
        <ResumeBuilder />
        <Portfolio />
        <CareerPortal />
        <Footer />
        
        <AIAssistant 
          resumeData={resumeData}
          isLoggedIn={!!user}
        />
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;