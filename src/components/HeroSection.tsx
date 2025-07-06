'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Code, Zap, Sparkles } from 'lucide-react';
import { useRef } from 'react';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 100, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const title = "BUILDING DIGITAL EXCELLENCE";
  const subtitle = "We craft innovative software solutions that transform your business vision into extraordinary digital experiences.";

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden noise"
    >
      {/* Animated Grid Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-20"
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

      {/* Floating Geometric Elements */}
      <motion.div
        animate={{
          y: [-30, 30, -30],
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-20 left-10 w-4 h-4 border border-primary/30 rotate-45"
      />
      <motion.div
        animate={{
          y: [40, -40, 40],
          rotate: [0, -180, -360],
          scale: [1.2, 0.8, 1.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/3 right-16 w-6 h-6 bg-primary/20 rotate-12"
      />
      <motion.div
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-40 left-1/4 w-8 h-8 border-2 border-primary/40 rounded-full"
      />

      {/* Spotlight Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-30" />

      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center container-wide"
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-caption text-muted-foreground">DIGITAL INNOVATION STUDIO</span>
          <Sparkles className="w-4 h-4 text-primary" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-display-xl font-bold text-foreground mb-8 tracking-tighter"
          style={{ 
            textShadow: '0 0 40px rgba(255, 115, 0, 0.3)',
            fontWeight: 700 
          }}
        >
          {title.split('').map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block"
              style={{ 
                marginRight: char === ' ' ? '0.5rem' : '0',
                transformOrigin: 'center bottom'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-body-xl text-muted-foreground mb-12 max-w-5xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12"
        >
          {[
            { icon: Code, text: "Custom Development" },
            { icon: Zap, text: "High Performance" },
            { icon: Sparkles, text: "Modern Design" }
          ].map((item, index) => (
            <div key={index} className="glass rounded-full px-3 sm:px-4 py-2 flex items-center gap-2">
              <item.icon className="w-4 h-4 text-primary" />
              <span className="text-body-sm text-foreground whitespace-nowrap">{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 lg:mb-20"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto group relative overflow-hidden bg-primary text-black px-8 sm:px-10 py-4 font-semibold text-body-md tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-3 glow-hover rounded-lg"
          >
            <span className="relative z-10">View Our Work</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </motion.a>
          
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto group glass-heavy px-8 sm:px-10 py-4 font-semibold text-body-md text-foreground tracking-wide uppercase hover:bg-foreground hover:text-background transition-all duration-500 border border-glass-border hover:border-primary rounded-lg text-center"
          >
            Let&apos;s Talk
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="cursor-pointer group"
          >
            <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center p-1 group-hover:border-primary transition-colors duration-300">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-2 bg-muted-foreground/50 rounded-full group-hover:bg-primary transition-colors duration-300"
              />
            </div>
            <p className="text-caption text-muted-foreground mt-3 group-hover:text-primary transition-colors duration-300">
              SCROLL TO EXPLORE
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};

export default HeroSection;