import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface NewsletterForm {
  email: string;
  interests: string[];
}

const interests = [
  'AI Career Insights',
  'Job Market Trends',
  'Skill Development',
  'Industry News'
];

export function NewsletterSignup() {
  const [ref, inView] = useInView({ triggerOnce: true });
  const { register, handleSubmit, formState: { errors } } = useForm<NewsletterForm>();

  const onSubmit = (data: NewsletterForm) => {
    console.log('Newsletter signup:', data);
    // Implement newsletter signup logic
  };

  return (
    <div className="relative bg-gradient-to-b from-indigo-50 to-white py-16 sm:py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),transparent)] opacity-20" />
      </div>
      
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center">
          <Mail className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Stay Ahead of the Curve
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Get weekly AI-powered insights on career trends, skill demands, and job market analysis.
          </p>
        </div>

        <div className="mt-12 max-w-xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative rounded-full shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="block w-full pl-10 pr-20 py-3 text-base rounded-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your work email"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    type="submit"
                    className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-2"
                  >
                    Subscribe
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">I'm interested in:</p>
              <div className="grid grid-cols-2 gap-2">
                {interests.map((interest) => (
                  <label
                    key={interest}
                    className="relative flex items-start p-2 rounded-lg border border-gray-200 hover:border-indigo-500 cursor-pointer transition-colors"
                  >
                    <div className="min-w-0 flex-1 text-sm">
                      <input
                        type="checkbox"
                        {...register('interests')}
                        value={interest}
                        className="hidden"
                      />
                      <span className="font-medium text-gray-700">{interest}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </form>

          <p className="mt-4 text-xs text-gray-500 text-center">
            By subscribing, you agree to our Privacy Policy and Terms of Service.
            You can unsubscribe at any time.
          </p>
        </div>
      </motion.div>
    </div>
  );
}