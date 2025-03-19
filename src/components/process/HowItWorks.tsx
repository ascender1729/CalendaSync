import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, LineChart, Rocket, ArrowRight } from 'lucide-react';

const processSteps = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI-Powered Analysis",
    description: "Our advanced AI analyzes millions of job postings in real-time to identify emerging skills and career opportunities.",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: <LineChart className="w-8 h-8" />,
    title: "Personalized Insights",
    description: "Get tailored career recommendations and skill gap analysis based on your unique profile and goals.",
    color: "from-indigo-600 to-purple-600"
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Accelerated Growth",
    description: "Follow AI-guided learning paths and get matched with perfect opportunities to fast-track your career.",
    color: "from-purple-600 to-pink-600"
  }
];

export function HowItWorks() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-100/20 via-transparent to-transparent" />
        <div className="absolute inset-y-0 w-full bg-grid-pattern opacity-5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            How TalentIQ 360 Works
          </h2>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform simplifies your career growth journey through three powerful steps
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector Lines */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-100 via-indigo-300 to-indigo-100 transform -translate-y-1/2 hidden lg:block" />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                {/* Step Number */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white w-12 h-12 rounded-full border-2 border-indigo-600 flex items-center justify-center text-lg font-bold text-indigo-600 shadow-lg z-10">
                  {index + 1}
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 relative z-0 h-full transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-r ${step.color} p-3 text-white mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                    {step.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center text-lg">
                    {step.description}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl transform -rotate-1 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <button className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 hover:shadow-xl">
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}