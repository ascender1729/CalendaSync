import React from 'react';
import { Brain, TrendingUp, UserCheck, FileText, Building, Shield } from 'lucide-react';

export const features = [
  {
    id: 'ai-insights',
    title: 'Real-Time AI Career Insights',
    description: 'Our platform analyzes millions of job postings daily to extract the latest industry skill trends with AI-powered forecasting.',
    icon: <Brain className="h-6 w-6" />
  },
  {
    id: 'personalized-coaching',
    title: 'AI-Powered Personalized Career Coaching',
    description: 'Unlike basic job search AI, our career coach customizes project recommendations based on your skill gaps to help you grow.',
    icon: <UserCheck className="h-6 w-6" />
  },
  {
    id: 'resume-enhancement',
    title: 'Industry-Standard Resume Enhancement',
    description: 'Integrated AI-powered resume analysis that optimizes ATS compatibility and highlights missing skills.',
    icon: <FileText className="h-6 w-6" />
  },
  {
    id: 'smart-matching',
    title: 'Smart Job Matching Beyond Keywords',
    description: 'Uses deep learning instead of basic keyword matching, ensuring you get job alerts that match your real capabilities.',
    icon: <TrendingUp className="h-6 w-6" />
  },
  {
    id: 'enterprise-insights',
    title: 'Enterprise-Grade Talent Insights',
    description: 'Coming Soon: B2B workforce analytics, helping companies hire smarter and manage talent effectively.',
    icon: <Building className="h-6 w-6" />
  },
  {
    id: 'security',
    title: 'Data Security & Compliance',
    description: 'Our AI platform is SOC 2 Type II Certified & GDPR Compliant, ensuring the highest standards for data privacy.',
    icon: <Shield className="h-6 w-6" />
  }
];