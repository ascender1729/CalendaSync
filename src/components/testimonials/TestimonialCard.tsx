import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import type { Testimonial } from '../../data/testimonials';

interface TestimonialCardProps extends Testimonial {
  direction?: 'left' | 'right';
}

export function TestimonialCard({ content, author, role, company, direction = 'left' }: TestimonialCardProps) {
  return (
    <motion.div
      className="flex-shrink-0 w-[350px] p-6 mx-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
      style={{
        background: 'linear-gradient(to bottom right, white, rgba(249, 250, 251, 0.8))',
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Quote className="h-8 w-8 text-indigo-400 mb-4" />
      <p className="text-gray-700 mb-4">{content}</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-indigo-600">{author}</p>
          <p className="text-sm text-gray-500">{role} at {company}</p>
        </div>
      </div>
    </motion.div>
  );
}