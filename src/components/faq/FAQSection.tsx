import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FAQItem } from './FAQItem';
import { faqItems } from '../../data/faq';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function FAQSection() {
  const [ref, inView] = useInView({ triggerOnce: true });
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set([faqItems[0].id]));

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div
      id="faq"
      className="relative py-24 bg-white"
      ref={ref}
    >
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Everything You Need to Know
          </h2>
          <p className="text-xl text-gray-500">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {faqItems.map((item) => (
            <FAQItem
              key={item.id}
              {...item}
              isOpen={openItems.has(item.id)}
              onToggle={() => toggleItem(item.id)}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500">
            Still have questions?{' '}
            <a href="#contact" className="text-indigo-600 hover:text-indigo-500">
              Contact our support team
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}