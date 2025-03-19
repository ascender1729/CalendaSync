import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, Play, Sparkles } from 'lucide-react';
import { WallOfLove } from './testimonials/WallOfLove';
import { PricingSection } from './pricing/PricingSection';
import { FAQSection } from './faq/FAQSection';
import { HowItWorks } from './process/HowItWorks';
import { FeatureComparison } from './features/FeatureComparison';
import { TrustBadges } from './trust/TrustBadges';
import { WaitlistDialog } from './WaitlistDialog';
import { WaitlistForm } from './WaitlistForm';
import { companyLogos } from '../data/companies';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function LandingPage() {
  const navigate = useNavigate();
  const [heroRef, heroInView] = useInView({ triggerOnce: true });

  return (
    <div className="relative">
      <WaitlistDialog />
      
      {/* Hero Section */}
      <div id="hero" className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-indigo-50">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-r from-transparent to-indigo-50/30" />
        </div>

        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <motion.div
              ref={heroRef}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Value Proposition */}
              <div className="mb-12">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-4"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold">
                    TalentIQ 360
                  </span>
                  <span className="mx-2">•</span>
                  AI-Powered Career Development
                </motion.div>

                <motion.h1 
                  className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Build Your Future-Ready Career with AI
                </motion.h1>

                <motion.p 
                  className="text-xl text-gray-600 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Get AI-powered career insights based on live skill trends and personalized training. 
                  Build a future-ready career profile tailored to your skills and targeted roles.
                </motion.p>
              </div>

              {/* Primary CTAs */}
              <motion.div 
                className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const waitlistSection = document.getElementById('waitlist');
                    if (waitlistSection) {
                      waitlistSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all transform hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Join the Waitlist
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 border-2 border-indigo-200 text-lg font-bold rounded-xl text-indigo-600 bg-white hover:bg-indigo-50 transition-all transform hover:shadow-md"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch 2-Min Demo
                </motion.button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div 
                className="flex flex-col items-center space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <p className="text-sm font-medium text-gray-500">
                  Trusted by professionals from leading companies
                </p>
                
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 px-4 max-w-4xl mx-auto">
                  {companyLogos.map((company, index) => (
                    <motion.div
                      key={company.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      className="flex items-center justify-center bg-white rounded-lg shadow-sm p-4 transition-all hover:shadow-md"
                    >
                      <img
                        src={`https://logo.clearbit.com/${company.url}`}
                        alt={`${company.name} logo`}
                        className="h-6 sm:h-8 w-auto object-contain"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Sections */}
      <HowItWorks />
      <FeatureComparison />
      <WallOfLove />
      <PricingSection />
      <TrustBadges />
      <FAQSection />
      
      {/* Final CTA Section */}
      <div id="waitlist" className="bg-gradient-to-b from-white to-indigo-50 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-gray-600">
              Join the waitlist to get early access and exclusive benefits.
            </p>
          </div>
          
          <WaitlistForm />
        </div>
      </div>
    </div>
  );
}