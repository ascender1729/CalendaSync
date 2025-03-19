import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Brain, Sparkles, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { submitToWaitlist } from '../lib/waitlist';

interface WaitlistFormData {
  name: string;
  email: string;
  industry: string;
  currentRole: string;
}

export function WaitlistDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<WaitlistFormData>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000); // Show after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);
    
    try {
      const result = await submitToWaitlist(data);
      
      if (result.success) {
        setIsSuccess(true);
        reset();
        toast.success('Successfully joined the waitlist! Check your email for confirmation.');
        
        // Close dialog after showing success state
        setTimeout(() => {
          setIsOpen(false);
          setIsSuccess(false);
        }, 3000);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast.error('Failed to join waitlist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
              <div className="relative">
                {/* Header with gradient background */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                  <div className="absolute right-4 top-4">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <Brain className="h-8 w-8" />
                    <Sparkles className="h-8 w-8" />
                  </div>

                  <Dialog.Title className="text-2xl font-bold text-center">
                    Join TalentIQ 360 Waitlist
                  </Dialog.Title>
                  <p className="mt-2 text-center text-indigo-100">
                    Get early access to AI-powered career insights
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-6 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.5 }}
                      >
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        You're on the List!
                      </h3>
                      <p className="text-gray-600">
                        Thanks for joining. Check your email for confirmation.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-6"
                    >
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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

                        <p className="text-center text-xs text-gray-500">
                          By joining, you agree to receive updates about TalentIQ 360.
                          <br />
                          We respect your privacy and will never share your information.
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}