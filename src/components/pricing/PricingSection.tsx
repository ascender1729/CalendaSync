import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PricingCard } from './PricingCard';
import { pricingTiers } from '../../data/pricing';
import { Switch } from '../common/Switch';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function PricingSection() {
  const [ref, inView] = useInView({ triggerOnce: true });
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div
      id="pricing"
      className="relative py-24 bg-gradient-to-b from-indigo-50 to-white"
      ref={ref}
    >
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Choose Your Growth Path
          </h2>
          <p className="text-xl text-gray-500 mb-8">
            Start free and upgrade as you grow. All plans include a 14-day trial.
          </p>

          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm ${!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onChange={setIsAnnual}
              className="relative inline-flex h-6 w-11 items-center rounded-full"
            />
            <span className={`text-sm ${isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Annual
              <span className="ml-1.5 text-green-600 font-medium">
                (Save 20%)
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier) => (
            <PricingCard 
              key={tier.id} 
              tier={tier}
              isAnnual={isAnnual}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500">
            Need a custom enterprise plan?{' '}
            <a href="#contact" className="text-indigo-600 hover:text-indigo-500 font-medium">
              Contact our team
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}