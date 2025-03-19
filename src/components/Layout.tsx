import React, { useState } from 'react';
import { Brain, Menu, X, Bell } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const { scrollY } = useScroll();

  const headerBackground = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.9)']
  );

  const headerBackdrop = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(8px)']
  );

  const headerWidth = useTransform(
    scrollY,
    [0, 50],
    ['100%', '95%']
  );

  const headerBorderRadius = useTransform(
    scrollY,
    [0, 50],
    ['1.5rem', '1rem']
  );

  const headerShadow = useTransform(
    scrollY,
    [0, 50],
    ['0 4px 6px rgba(0, 0, 0, 0.01)', '0 8px 24px rgba(0, 0, 0, 0.05)']
  );

  const logoScale = useTransform(
    scrollY,
    [0, 50],
    [1, 0.85]
  );

  const bannerHeight = useTransform(
    scrollY,
    [0, 25],
    ['2rem', '0rem']
  );

  const bannerOpacity = useTransform(
    scrollY,
    [0, 25],
    [1, 0]
  );

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = showAnnouncement ? 80 : 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'faq', label: 'FAQ' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Announcement Banner */}
      <AnimatePresence>
        {showAnnouncement && (
          <motion.div
            style={{
              height: bannerHeight,
              opacity: bannerOpacity,
            }}
            className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_100%] animate-gradient overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
              <div className="flex items-center justify-between h-full">
                <div className="flex items-center space-x-2">
                  <Bell className="h-3 w-3 text-white animate-bounce" />
                  <p className="text-xs font-medium text-white truncate">
                    <span className="hidden sm:inline">New: AI-Powered Smart Job Matching</span>
                    <span className="sm:hidden">New: Smart Job Matching!</span>
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-xs font-medium px-2 py-0.5 rounded-full text-indigo-600 bg-white hover:bg-opacity-90 transition-colors"
                  >
                    Try Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAnnouncement(false)}
                    className="p-0.5 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="h-3 w-3 text-white" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Header Container */}
      <div className="sticky top-0 z-50 flex justify-center w-full h-16">
        <motion.header
          style={{
            backgroundColor: headerBackground,
            backdropFilter: headerBackdrop,
            width: headerWidth,
            borderRadius: headerBorderRadius,
            boxShadow: headerShadow,
          }}
          onMouseEnter={() => setIsHeaderHovered(true)}
          onMouseLeave={() => setIsHeaderHovered(false)}
          className="h-full px-4 mx-4 transition-all duration-300"
        >
          <div className="h-full">
            <div className="flex items-center justify-between h-full">
              {/* Logo */}
              <motion.div
                style={{ scale: logoScale }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 flex items-center cursor-pointer"
                onClick={() => scrollToSection('hero')}
              >
                <Brain className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  TalentIQ 360
                </span>
              </motion.div>

              {/* Navigation */}
              <nav 
                className={`hidden md:flex items-center space-x-4 flex-1 justify-center transition-all duration-300 ${
                  isHeaderHovered ? 'opacity-100 translate-y-0' : 'opacity-80'
                }`}
              >
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="relative px-3 py-1.5 text-sm font-medium text-gray-700 rounded-full hover:text-indigo-600 transition-colors group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                    <motion.div
                      className="absolute inset-0 bg-indigo-50 rounded-full -z-10"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.button>
                ))}
              </nav>

              {/* Action Buttons */}
              <motion.div 
                className={`hidden md:flex md:items-center md:space-x-3 transition-all duration-300 ${
                  isHeaderHovered ? 'opacity-100 translate-y-0' : 'opacity-80'
                }`}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors rounded-full hover:bg-indigo-50"
                >
                  Sign In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('waitlist')}
                  className="px-4 py-1.5 text-sm font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_100%] animate-gradient hover:shadow-lg hover:shadow-indigo-600/20 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Join Waitlist
                </motion.button>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden inline-flex items-center justify-center p-1.5 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden overflow-hidden bg-white rounded-xl mt-2 shadow-lg"
              >
                <div className="px-3 py-2 space-y-1">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection(item.id)}
                      className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                  <div className="pt-2 space-y-1">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="block w-full px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      Sign In
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection('waitlist')}
                      className="block w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_100%] animate-gradient rounded-lg transition-colors"
                    >
                      Join Waitlist
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      </div>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-2xl font-bold text-gray-900">TalentIQ 360</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">The AI-powered way to boost your career.</p>
              <div className="mt-4 flex space-x-4">
                {['twitter', 'linkedin', 'github', 'discord'].map((social) => (
                  <a
                    key={social}
                    href={`#${social}`}
                    className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-2">
                {['Features', 'Pricing', 'Documentation'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-2">
                {['Privacy Policy', 'Terms of Service'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {['AI-Powered', 'Real-time Insights', 'Smart Matching'].map((badge) => (
                    <div
                      key={badge}
                      className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800"
                    >
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-400 text-center">
              © {new Date().getFullYear()} TalentIQ 360. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}