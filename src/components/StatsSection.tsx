'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface StatItemProps {
  number: number;
  label: string;
  suffix?: string;
  delay?: number;
}

const StatItem = ({ number, label, suffix = '', delay = 0 }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const duration = 2000;
        const steps = 60;
        const increment = number / steps;
        let current = 0;

        const counter = setInterval(() => {
          current += increment;
          if (current >= number) {
            setCount(number);
            clearInterval(counter);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(counter);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isInView, number, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={isInView ? { scale: 1 } : { scale: 0.5 }}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
        className="text-4xl md:text-5xl font-bold text-blue-600 mb-2"
      >
        {count}{suffix}
      </motion.div>
      <div className="text-gray-600 text-sm md:text-base font-medium">
        {label}
      </div>
    </motion.div>
  );
};

const StatsSection = () => {
  const stats = [
    { number: 20, label: 'Projects Delivered', suffix: '+' },
    { number: 5, label: 'Years Experience', suffix: '+' },
    { number: 100, label: 'Client Satisfaction', suffix: '%' },
    { number: 15, label: 'Technologies Mastered', suffix: '+' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Track Record
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Numbers that speak to our commitment to excellence and innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              number={stat.number}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;