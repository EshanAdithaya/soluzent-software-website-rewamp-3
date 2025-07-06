'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  link?: string;
  github?: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex-none w-80 md:w-96 glass rounded-2xl overflow-hidden border border-glass-border hover:glass-heavy transition-all duration-300"
    >
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <div className="text-6xl text-primary">{project.image}</div>
        <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-xs font-medium text-foreground">
          {project.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-display-sm font-bold text-foreground mb-3">{project.title}</h3>
        <p className="text-muted-foreground mb-6 text-body-md leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium border border-primary/20"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          {project.link && (
            <motion.a
              href={project.link}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              View Live
            </motion.a>
          )}
          {project.github && (
            <motion.a
              href={project.github}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 glass-heavy text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-foreground hover:text-background transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
              Code
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Modern e-commerce solution with advanced features including real-time inventory, payment processing, and analytics dashboard.",
      image: "🛒",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Web App",
      link: "#",
      github: "#"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management platform with real-time updates, file sharing, and team communication features.",
      image: "📋",
      technologies: ["Vue.js", "Express", "Socket.io", "PostgreSQL"],
      category: "SaaS",
      link: "#",
      github: "#"
    },
    {
      id: 3,
      title: "Healthcare Dashboard",
      description: "Comprehensive healthcare management system with patient records, appointment scheduling, and telemedicine integration.",
      image: "🏥",
      technologies: ["Angular", "Python", "Django", "PostgreSQL"],
      category: "Healthcare",
      link: "#"
    },
    {
      id: 4,
      title: "Financial Analytics",
      description: "Advanced financial analytics platform with real-time data visualization, portfolio tracking, and risk assessment.",
      image: "📊",
      technologies: ["React", "TypeScript", "Python", "AWS"],
      category: "FinTech",
      link: "#",
      github: "#"
    },
    {
      id: 5,
      title: "Learning Management System",
      description: "Comprehensive LMS with video streaming, interactive quizzes, progress tracking, and certification management.",
      image: "📚",
      technologies: ["Next.js", "Node.js", "MongoDB", "AWS"],
      category: "EdTech",
      link: "#"
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      const newScrollLeft = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  return (
    <section id="projects" ref={containerRef} className="py-20 lg:py-32 bg-background relative overflow-hidden mt-16 mb-16">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5" />
      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            style={{ y }}
            className="text-display-lg font-bold text-foreground mb-6"
          >
            Featured Projects
          </motion.h2>
          <p className="text-body-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our latest work and see how we bring ideas to life with cutting-edge technology and innovative design
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`p-3 rounded-lg glass border transition-all duration-200 ${
                  canScrollLeft 
                    ? 'border-primary text-primary hover:bg-primary/10' 
                    : 'border-muted text-muted-foreground cursor-not-allowed opacity-50'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`p-3 rounded-lg glass border transition-all duration-200 ${
                  canScrollRight 
                    ? 'border-primary text-primary hover:bg-primary/10' 
                    : 'border-muted text-muted-foreground cursor-not-allowed opacity-50'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent transition-colors duration-200"
            >
              View All Projects
            </motion.a>
          </div>

          {/* Projects Scroll Container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(projects.length / 2) }).map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 bg-gray-300 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;