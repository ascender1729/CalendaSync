import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Brain, CheckCircle, Sparkles, Loader2 } from 'lucide-react';
import { submitToWaitlist, WaitlistFormData } from '../lib/waitlist';

export function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<WaitlistFormData>();

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);
    
    try {
      const result = await submitToWaitlist(data);
      
      if (result.success) {
        setIsSuccess(true);
        reset();
        toast.success('Successfully joined the waitlist! Check your email for confirmation.');
      } else {
        throw new Error(result.error || 'Failed to join waitlist');
      }
    } catch (error) {
      console.error('Waitlist submission error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to join waitlist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-xl p-12 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        </motion.div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          You're on the List!
        </h3>
        <p className="text-xl text-gray-600 mb-4">
          Thanks for joining. Check your email for confirmation.
        </p>
        <p className="text-gray-500">
          We'll keep you updated on our launch and early access opportunities.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Brain className="h-8 w-8" />
          <Sparkles className="h-8 w-8" />
        </div>
        <h3 className="text-3xl font-bold text-center mb-2">
          Join the Future of Career Development
        </h3>
        <p className="text-indigo-100 text-center text-lg">
          Get early access to AI-powered career insights and personalized skill development
        </p>
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Work Email
              </label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="john@company.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                Industry
              </label>
              <select
                {...register('industry', { required: 'Industry is required' })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Industry</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select>
              {errors.industry && (
                <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="currentRole" className="block text-sm font-medium text-gray-700">
                Current Role
              </label>
              <input
                type="text"
                {...register('currentRole', { required: 'Current role is required' })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Software Engineer"
              />
              {errors.currentRole && (
                <p className="mt-1 text-sm text-red-600">{errors.currentRole.message}</p>
              )}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-lg font-semibold text-white shadow-lg hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Submitting...
              </span>
            ) : (
              'Join Waitlist & Get Early Access'
            )}
          </motion.button>

          <p className="text-center text-sm text-gray-500">
            By joining, you agree to receive updates about TalentIQ 360.
            <br />
            We respect your privacy and will never share your information.
          </p>
        </form>
      </div>
    </div>
  );
}