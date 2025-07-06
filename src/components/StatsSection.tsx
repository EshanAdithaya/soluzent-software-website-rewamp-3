'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Trophy, Users, Clock, Target } from 'lucide-react';

interface StatItemProps {
  number: number;
  label: string;
  suffix?: string;
  delay?: number;
  icon: React.ReactNode;
  description: string;
}

const StatItem = ({ number, label, suffix = '', delay = 0, icon, description }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const duration = 2500;
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
      initial={{ opacity: 0, y: 60, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.8 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group relative"
    >
      <div className="glass-heavy rounded-lg p-6 lg:p-8 text-center hover:bg-white/5 transition-all duration-500 border border-white/10 hover:border-primary/30">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ duration: 0.8, delay: delay + 0.2 }}
          className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors duration-300"
        >
          {icon}
        </motion.div>

        {/* Number */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
          transition={{ duration: 1, delay: delay + 0.4 }}
          className="text-display-md font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300"
          style={{ textShadow: '0 0 20px rgba(255, 115, 0, 0.2)' }}
        >
          {count}{suffix}
        </motion.div>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: delay + 0.6 }}
          className="text-body-lg font-semibold text-foreground mb-2 tracking-wide uppercase"
        >
          {label}
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, delay: delay + 0.8 }}
          className="text-body-sm text-muted-foreground leading-relaxed"
        >
          {description}
        </motion.div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none" />
      </div>
    </motion.div>
  );
};

const StatsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const stats = [
    { 
      number: 50, 
      label: 'Projects Delivered', 
      suffix: '+',
      icon: <Trophy className="w-8 h-8" />,
      description: 'Successfully completed projects across various industries and scales'
    },
    { 
      number: 8, 
      label: 'Years Experience', 
      suffix: '+',
      icon: <Clock className="w-8 h-8" />,
      description: 'Deep expertise in cutting-edge technologies and best practices'
    },
    { 
      number: 100, 
      label: 'Client Satisfaction', 
      suffix: '%',
      icon: <Users className="w-8 h-8" />,
      description: 'Consistently exceeding expectations and building lasting partnerships'
    },
    { 
      number: 25, 
      label: 'Technologies Mastered', 
      suffix: '+',
      icon: <Target className="w-8 h-8" />,
      description: 'Comprehensive toolkit spanning frontend, backend, and cloud solutions'
    },
  ];

  return (
    <section ref={containerRef} className="py-32 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-secondary/50 to-black" />
      
      {/* Floating Geometric Elements */}
      <motion.div
        style={{ y }}
        className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rotate-45 opacity-30"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
        className="absolute bottom-20 right-20 w-24 h-24 bg-primary/10 rounded-full opacity-40"
      />

      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="w-12 h-0.5 bg-primary" />
            <span className="text-caption text-primary tracking-wider">PROVEN EXCELLENCE</span>
            <div className="w-12 h-0.5 bg-primary" />
          </motion.div>
          
          <h2 className="text-display-lg font-bold text-foreground mb-6 tracking-tight">
            Numbers That{' '}
            <span className="text-gradient">Define Excellence</span>
          </h2>
          
          <p className="text-body-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our track record speaks volumes about our commitment to delivering exceptional 
            digital solutions that drive real business results.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              number={stat.number}
              label={stat.label}
              suffix={stat.suffix}
              icon={stat.icon}
              description={stat.description}
              delay={index * 0.15}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="glass-heavy px-10 py-4 text-body-md font-semibold text-foreground tracking-wider uppercase hover:bg-primary hover:text-black transition-all duration-500 border border-glass-border hover:border-primary glow-hover rounded-lg"
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StatsSection;