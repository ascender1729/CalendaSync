import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Sparkles, Zap } from 'lucide-react';

const badges = [
  {
    icon: <Brain className="h-8 w-8 text-indigo-600" />,
    title: 'Advanced AI Technology',
    description: 'Cutting-edge machine learning algorithms'
  },
  {
    icon: <Sparkles className="h-8 w-8 text-indigo-600" />,
    title: 'Real-time Analysis',
    description: 'Instant job market insights'
  },
  {
    icon: <Zap className="h-8 w-8 text-indigo-600" />,
    title: 'Smart Matching',
    description: 'Intelligent career recommendations'
  }
];

export function TrustBadges() {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <div className="bg-gray-50 py-16">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.2 }
                }
              }}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="bg-white rounded-lg shadow-sm p-6 text-center"
            >
              <div className="flex justify-center mb-4">
                {badge.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {badge.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}