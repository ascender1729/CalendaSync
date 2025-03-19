export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    id: "free-tier",
    question: "Is TalentIQ 360 free?",
    answer: "Yes! We offer a free tier that includes basic job insights, skill analysis, and limited market trends. You can upgrade to our Pro or Premium plans anytime to unlock more powerful AI features and personalized career guidance."
  },
  {
    id: "ai-analysis",
    question: "How does AI analyze job market data?",
    answer: "Our AI system analyzes millions of job postings, market trends, and industry data in real-time. We use advanced machine learning algorithms to identify skill trends, salary patterns, and career opportunities, providing you with actionable insights for your career growth."
  },
  {
    id: "data-security",
    question: "Is my data secure?",
    answer: "Absolutely! We take data security seriously. TalentIQ 360 is SOC 2 Type II certified and GDPR compliant. We use enterprise-grade encryption and follow strict privacy policies to ensure your data is always protected."
  },
  {
    id: "target-audience",
    question: "Who is TalentIQ 360 for?",
    answer: "TalentIQ 360 is designed for professionals at all career stages - from entry-level to senior executives. Whether you're looking to upskill, switch careers, or stay ahead of industry trends, our AI-powered platform provides personalized insights and recommendations."
  },
  {
    id: "ai-accuracy",
    question: "How accurate are the AI recommendations?",
    answer: "Our AI recommendations are highly accurate, thanks to our continuous learning system that processes real-time market data. We regularly validate our insights against industry standards and actual career outcomes to ensure reliability."
  },
  {
    id: "cancellation",
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. We offer a hassle-free cancellation process, and you'll continue to have access to your plan's features until the end of your billing period."
  }
];