import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import { InfiniteCarousel } from './InfiniteCarousel';
import { testimonials } from '../../data/testimonials';
import { useNavigate } from 'react-router-dom';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function WallOfLove() {
  const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true });

  // Split testimonials into two groups for opposite direction scrolling
  const midPoint = Math.ceil(testimonials.length / 2);
  const firstGroup = testimonials.slice(0, midPoint);
  const secondGroup = testimonials.slice(midPoint);

  return (
    <div
      id="testimonials"
      className="relative py-24 bg-gradient-to-b from-white to-indigo-50"
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
            What Our Users Say About TalentIQ 360
          </h2>
          <p className="text-xl text-gray-500">
            Join thousands of professionals who transformed their careers with AI-powered insights
          </p>
        </div>

        <div className="space-y-8">
          <InfiniteCarousel items={firstGroup} direction="left" speed={30} />
          <InfiniteCarousel items={secondGroup} direction="right" speed={25} />
        </div>

        <div className="mt-16 text-center">
          <p className="text-2xl font-bold text-gray-900 mb-8">
            Join 50,000+ professionals growing their careers with AI
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-all transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}