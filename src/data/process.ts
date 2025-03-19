export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: 'brain' | 'chart' | 'rocket';
}

export const processSteps: ProcessStep[] = [
  {
    id: 'analyze',
    title: 'Extract Market Insights',
    description: 'Our AI scans millions of job postings daily to identify emerging skills, salary trends, and career opportunities in real-time.',
    icon: 'brain'
  },
  {
    id: 'personalize',
    title: 'Get Personalized Analysis',
    description: 'Advanced AI algorithms analyze your profile against market demands to create a tailored career growth roadmap.',
    icon: 'chart'
  },
  {
    id: 'accelerate',
    title: 'Accelerate Your Career Growth',
    description: 'Follow AI-guided learning paths, get matched with perfect job opportunities, and track your progress towards your career goals.',
    icon: 'rocket'
  }
];