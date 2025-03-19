export interface PricingTier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  badge?: string;
  isPopular?: boolean;
  annualDiscount?: number;
  ctaText?: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Perfect for exploring AI-powered career insights',
    features: [
      'Basic job insights',
      'Skill analysis',
      'Limited market trends',
      'Community access',
      'Email support'
    ],
    ctaText: 'Get Started'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 14.99,
    description: 'Everything you need to accelerate your career growth',
    features: [
      'All Free features',
      'AI-powered skill recommendations',
      'Real-time job alerts',
      'Unlimited market insights',
      'Resume optimization',
      'Custom learning paths',
      'Priority support'
    ],
    badge: 'Most Popular',
    isPopular: true,
    annualDiscount: 20,
    ctaText: 'Start Pro Trial'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 24.99,
    description: 'Advanced features for serious career acceleration',
    features: [
      'All Pro features',
      'Advanced career insights',
      'Monthly 1-on-1 career guidance',
      'Industry network access',
      'Exclusive workshops',
      'Priority job matching',
      'API access'
    ],
    annualDiscount: 20,
    ctaText: 'Start Premium Trial'
  },
  {
    id: 'elite',
    name: 'Elite Mentorship',
    price: 99.99,
    description: 'Premium mentorship and career acceleration',
    features: [
      'All Premium features',
      'Weekly 1-on-1 mentorship sessions',
      'Personalized career roadmap',
      'Direct networking with recruiters',
      'VIP access to job openings',
      'Private career accelerator workshops',
      'Custom skill development plan'
    ],
    badge: 'Best Value',
    annualDiscount: 20,
    ctaText: 'Get Elite Access'
  }
];