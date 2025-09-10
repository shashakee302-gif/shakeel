import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Mail, 
  Twitter, 
  Github, 
  Linkedin,
  Heart,
  ArrowUp,
  Phone,
  ExternalLink
} from 'lucide-react';

const Footer: React.FC = () => {
  const [modal, setModal] = useState<null | string>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    product: [
      { name: 'Resume Builder', href: '#resume', onClick: () => {} },
      { name: 'Portfolio Generator', href: '#portfolio', onClick: () => {} },
      { name: 'AI Feedback', href: '#features', onClick: () => {} },
      { name: 'Templates', href: '#templates', onClick: () => {} }
    ],
    company: [
      { name: 'About Us', href: '#about', onClick: () => setModal('About Us') },
      { name: 'Blog', href: '#blog', onClick: () => setModal('Blog') },
      { name: 'Careers', href: '#careers', onClick: () => setModal('Careers') },
      { name: 'Contact', href: '#contact', onClick: () => setModal('Contact') }
    ],
    resources: [
      { name: 'Help Center', href: '#help', onClick: () => setModal('Help Center') },
      { name: 'Tutorials', href: '#tutorials', onClick: () => setModal('Tutorials') },
      { name: 'Community', href: '#community', onClick: () => setModal('Community') },
      { name: 'Examples', href: '#examples', onClick: () => setModal('Examples') }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy', onClick: () => setModal('Privacy Policy') },
      { name: 'Terms of Service', href: '#terms', onClick: () => setModal('Terms of Service') },
      { name: 'Cookie Policy', href: '#cookies', onClick: () => setModal('Cookie Policy') },
      { name: 'GDPR', href: '#gdpr', onClick: () => setModal('GDPR') }
    ]
  };

  const socialLinks = [
    { 
      icon: Linkedin, 
      href: '', 
      label: 'LinkedIn',
      color: 'hover:text-blue-600'
    },
    { 
      icon: Github, 
      href: 'https://github.com/skshakeel', 
      label: 'GitHub',
      color: 'hover:text-gray-600'
    },
    { 
      icon: Mail, 
      href: 'mailto:skshakeel9086@gmail.com', 
      label: 'Email',
      color: 'hover:text-red-500'
    },
    { 
      icon: Phone, 
      href: '', 
      label: 'Phone',
      color: 'hover:text-green-500'
    }
  ];

  const contactInfo = {
    email: 'skshakeel9086@gmail.com',
    phone: '',
    linkedin: ''
  };

  // Modal content for each footer link
  const modalContent: Record<string, { title: string; content: React.ReactNode }> = {
    'Templates': {
      title: 'Resume Templates',
      content: (
        <>
          At ResumeFlow, we offer a wide range of professionally designed resume templates tailored for every industry and experience level. Whether you're a fresh graduate, software engineer, designer, or marketing professional, our templates help you stand out. Choose a layout, customize it effortlessly, and download your resume in just minutes.
        </>
      )
    },
    'Company': {
      title: 'About ResumeFlow',
      content: (
        <>
          ResumeFlow is on a mission to simplify job hunting for students and professionals across India and beyond. Our platform helps users build beautiful, AI-enhanced resumes and portfolios in minutes. With cutting-edge tools, intuitive design, and personalized guidance, we empower talent to showcase their best selves and get noticed by employers.
        </>
      )
    },
    'About Us': {
      title: 'About Us',
      content: (
        <>
          ResumeFlow was founded with one clear goal — to make resume building effortless and accessible to everyone. We believe your resume should reflect your true potential, and with our intelligent tools and modern templates, it finally can. Whether you're applying for your first job or switching careers, ResumeFlow is your trusted partner in success.
        </>
      )
    },
    'Blog': {
      title: 'ResumeFlow Blog',
      content: (
        <>
          Explore expert tips, resume writing strategies, job search hacks, and industry trends on the ResumeFlow blog. Stay ahead with curated advice from HR professionals, career coaches, and successful job seekers. We help you stay inspired, informed, and interview-ready.
        </>
      )
    },
    'Careers': {
      title: 'Careers at ResumeFlow',
      content: (
        <>
          We're building the future of career tools — and we want you on the team! At ResumeFlow, we value creativity, ownership, and growth. Check out our open roles and apply today. Join us in shaping how millions craft their careers with confidence.
        </>
      )
    },
    'Contact': {
      title: 'Get in Touch',
      content: (
        <>
          Have questions, suggestions, or feedback? We'd love to hear from you!<br />
          📧 Email: <a href="mailto:support@resumeflow.in" className="text-blue-600 underline">support@resumeflow.in</a><br />
          📍 Location: India (Remote-friendly)<br />
          Fill out the form below or reach out directly, and our support team will get back to you within 24 hours.
        </>
      )
    },
    'Help Center': {
      title: 'Help Center',
      content: (
        <>
          Need assistance? Our Help Center provides step-by-step guides on everything from creating your resume to downloading your final version. Explore FAQs, troubleshooting tips, and video tutorials. If you're stuck, we're just a message away!
        </>
      )
    },
    'Tutorials': {
      title: 'Tutorials & How-To Guides',
      content: (
        <>
          Get hands-on with ResumeFlow through our detailed tutorials. Learn how to create resumes, add custom sections, tweak designs, connect your LinkedIn, and more. Perfect for first-time users and power users alike.
        </>
      )
    },
    'Community': {
      title: 'ResumeFlow Community',
      content: (
        <>
          Connect with thousands of users, share your experience, ask questions, and get inspired. Our community is a space to grow together, celebrate wins, and support each other on the job search journey.
        </>
      )
    },
    'Examples': {
      title: 'Resume Examples',
      content: (
        <>
          Browse real-world resume examples from students, developers, marketers, and designers who landed interviews using ResumeFlow. Get inspired, see what works, and build your resume confidently with proven formats.
        </>
      )
    },
    'Privacy Policy': {
      title: 'Privacy Policy',
      content: (
        <>
          ResumeFlow respects your privacy. We collect minimal personal data, solely to provide and improve our services. We do not sell or misuse your information. Read our full policy to learn what data we collect, how it's used, and your rights under data privacy laws.
        </>
      )
    },
    'Terms of Service': {
      title: 'Terms of Service',
      content: (
        <>
          By using ResumeFlow, you agree to our terms and conditions. This includes how the service operates, your responsibilities, intellectual property rights, and limitations of liability. Please review carefully before using our platform.
        </>
      )
    },
    'Cookie Policy': {
      title: 'Cookie Policy',
      content: (
        <>
          ResumeFlow uses cookies to enhance your browsing experience, analyze traffic, and improve site functionality. You can accept or reject cookies anytime. Learn more about what cookies we use and how you can manage them.
        </>
      )
    },
    'GDPR': {
      title: 'GDPR Policy',
      content: (
        <>
          In accordance with the General Data Protection Regulation (GDPR), ResumeFlow provides users in the EU with full transparency and control over their data. You can request data access, deletion, or correction at any time. We are committed to protecting your digital rights.
        </>
      )
    },
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🐼</span>
                </div>
                <span className="text-xl font-bold gradient-text">CareerPanda</span>
              </div>
              
              <p className="text-gray-300 max-w-md">
                Empowering professionals to accelerate their careers with AI-powered 
                resume analysis, smart job matching, and personalized career guidance.
              </p>
              
              {/* Contact Information */}
              <div className="space-y-2">
                <motion.a
                  href="mailto:shakeelsk@pandascanpros.in"
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>shakeelsk@pandascanpros.in</span>
                </motion.a>
                
                <motion.a
                  href="tel:8074015276"
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>8074015276</span>
                </motion.a>
                
                <motion.a
                  href="https://linkedin.com/in/shaik-mohammad-shakeel-ba5a771b1"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>linkedin.com/in/shaik-mohammad-shakeel-ba5a771b1</span>
                  <ExternalLink className="w-3 h-3" />
                </motion.a>
              </div>
              
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : '_self'}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="font-semibold text-gray-100 uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <motion.button
                      type="button"
                      onClick={link.onClick}
                      whileHover={{ x: 5 }}
                      className="text-gray-300 hover:text-white transition-colors bg-transparent border-none p-0 m-0 text-left cursor-pointer focus:outline-none"
                    >
                      {link.name}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Build Your Dream Career?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of students who have successfully landed their dream jobs with our AI-powered resume builder.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#resume"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
              >
                Start Building Resume
              </motion.a>
              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-semibold hover:border-gray-500 hover:text-white transition-all"
              >
                Create Portfolio
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2 text-gray-400 text-sm"
            >
              <span>© 2025 CareerPanda. Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span>for career success by</span>
              <motion.a
                href="https://linkedin.com/in/shaik-mohammad-shakeel-ba5a771b1"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                SK Shakeel
              </motion.a>
            </motion.div>
            
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="mt-4 md:mt-0 w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center hover:shadow-lg transition-all"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Footer Modals */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-lg w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setModal(null)}
              aria-label="Close modal"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {modalContent[modal]?.title || modal}
            </h2>
            <div className="text-gray-700 dark:text-gray-200 text-base">
              {modalContent[modal]?.content || 'Content coming soon.'}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
