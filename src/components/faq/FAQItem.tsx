import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { FAQItem as FAQItemType } from '../../data/faq';

interface FAQItemProps extends FAQItemType {
  isOpen: boolean;
  onToggle: () => void;
}

export function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex w-full items-center justify-between py-6 text-left"
        onClick={onToggle}
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}