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
      className="flex-none w-80 md:w-96 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
        <div className="text-6xl text-blue-300">{project.image}</div>
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-600">
          {project.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium"
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
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
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
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
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
    <section id="projects" ref={containerRef} className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            style={{ y }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Featured Projects
          </motion.h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our latest work and see how we bring ideas to life
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
                className={`p-3 rounded-full border-2 transition-all duration-200 ${
                  canScrollLeft 
                    ? 'border-blue-600 text-blue-600 hover:bg-blue-50' 
                    : 'border-gray-300 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`p-3 rounded-full border-2 transition-all duration-200 ${
                  canScrollRight 
                    ? 'border-blue-600 text-blue-600 hover:bg-blue-50' 
                    : 'border-gray-300 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
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