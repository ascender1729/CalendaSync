import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, X, Brain, TrendingUp, FileText, Zap } from 'lucide-react';

const comparisonData = [
  {
    feature: 'Live Skill Analysis',
    description: 'Real-time analysis of trending skills and market demand',
    icon: <Brain className="h-6 w-6 text-indigo-600" />,
    talentiq: true,
    traditional: false
  },
  {
    feature: 'AI-Based Training',
    description: 'Personalized learning paths based on your career goals',
    icon: <TrendingUp className="h-6 w-6 text-indigo-600" />,
    talentiq: true,
    traditional: false
  },
  {
    feature: 'Smart Profile Building',
    description: 'AI-powered profile optimization for targeted roles',
    icon: <FileText className="h-6 w-6 text-indigo-600" />,
    talentiq: true,
    traditional: false
  },
  {
    feature: 'Career Path Planning',
    description: 'Data-driven career progression recommendations',
    icon: <Zap className="h-6 w-6 text-indigo-600" />,
    talentiq: true,
    traditional: false
  }
];

export function FeatureComparison() {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <div
      id="why-us"
      className="relative py-24 bg-gradient-to-b from-gray-50 to-white"
      ref={ref}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-100/20 via-transparent to-transparent" />
      </div>

      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.6 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
            Why Choose TalentIQ 360?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our AI-powered platform transforms your career development journey
          </p>
        </div>

        <div className="relative">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-4 px-6 text-left text-lg font-semibold text-gray-900 w-1/2">Features</th>
                  <th className="py-4 px-6 text-center text-lg font-semibold w-1/4">
                    <div className="flex flex-col items-center">
                      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">TalentIQ 360</span>
                      <span className="text-sm font-normal text-gray-500">AI-Powered Platform</span>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-center text-lg font-semibold text-gray-900 w-1/4">
                    <div className="flex flex-col items-center">
                      <span>Traditional</span>
                      <span className="text-sm font-normal text-gray-500">Job Boards</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comparisonData.map((item, index) => (
                  <motion.tr
                    key={item.feature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group hover:bg-indigo-50/50 transition-colors"
                  >
                    <td className="py-6 px-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{item.feature}</h3>
                          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex justify-center">
                        <div className="rounded-full bg-green-100 p-1">
                          <Check className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex justify-center">
                        <div className="rounded-full bg-red-100 p-1">
                          <X className="h-5 w-5 text-red-600" />
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}