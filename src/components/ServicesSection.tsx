'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Globe, 
  Smartphone, 
  Server, 
  Cloud, 
  Building, 
  Palette,
  ArrowRight
} from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
  gradient: string;
}

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="relative group"
    >
      <div className={`absolute inset-0 ${service.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
      
      <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="p-8">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
            className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
          >
            {service.icon}
          </motion.div>

          {/* Content */}
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
            className="text-2xl font-bold text-gray-900 mb-4"
          >
            {service.title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
            className="text-gray-600 mb-6 leading-relaxed"
          >
            {service.description}
          </motion.p>

          {/* Features */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
            className="space-y-3"
          >
            {service.features.map((feature, featureIndex) => (
              <motion.li
                key={featureIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: index * 0.2 + 0.7 + featureIndex * 0.1 }}
                className="flex items-center gap-3 text-gray-700"
              >
                <div className={`w-2 h-2 ${service.color} rounded-full`} />
                <span className="text-sm">{feature}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
            className="mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group/btn flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
            >
              Learn More
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
            </motion.button>
          </motion.div>
        </div>

        {/* Decorative Element */}
        <div className={`absolute top-0 right-0 w-20 h-20 ${service.gradient} opacity-10 rounded-bl-full`} />
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const services: Service[] = [
    {
      id: 1,
      title: "Web Development",
      description: "Create stunning, responsive websites and web applications that engage users and drive business growth.",
      icon: <Globe className="w-8 h-8 text-white" />,
      features: [
        "Responsive Design",
        "Modern Frameworks",
        "SEO Optimization",
        "Performance Focus"
      ],
      color: "bg-blue-600",
      gradient: "bg-gradient-to-r from-blue-600 to-indigo-600"
    },
    {
      id: 2,
      title: "Mobile Development",
      description: "Build native and cross-platform mobile applications that deliver exceptional user experiences.",
      icon: <Smartphone className="w-8 h-8 text-white" />,
      features: [
        "iOS & Android",
        "Cross-Platform",
        "Native Performance",
        "App Store Optimization"
      ],
      color: "bg-green-600",
      gradient: "bg-gradient-to-r from-green-600 to-emerald-600"
    },
    {
      id: 3,
      title: "Backend Systems",
      description: "Develop robust, scalable backend architectures that power your applications reliably.",
      icon: <Server className="w-8 h-8 text-white" />,
      features: [
        "API Development",
        "Database Design",
        "Microservices",
        "Performance Optimization"
      ],
      color: "bg-purple-600",
      gradient: "bg-gradient-to-r from-purple-600 to-pink-600"
    },
    {
      id: 4,
      title: "Cloud Solutions",
      description: "Deploy and manage applications on cloud platforms for optimal scalability and reliability.",
      icon: <Cloud className="w-8 h-8 text-white" />,
      features: [
        "AWS/Azure/GCP",
        "DevOps & CI/CD",
        "Auto-scaling",
        "Cost Optimization"
      ],
      color: "bg-orange-600",
      gradient: "bg-gradient-to-r from-orange-600 to-red-600"
    },
    {
      id: 5,
      title: "Enterprise Solutions",
      description: "Develop comprehensive enterprise software solutions that streamline business operations.",
      icon: <Building className="w-8 h-8 text-white" />,
      features: [
        "Custom Software",
        "System Integration",
        "Workflow Automation",
        "Security & Compliance"
      ],
      color: "bg-indigo-600",
      gradient: "bg-gradient-to-r from-indigo-600 to-purple-600"
    },
    {
      id: 6,
      title: "UI/UX Design",
      description: "Create intuitive, beautiful user interfaces that enhance user experience and satisfaction.",
      icon: <Palette className="w-8 h-8 text-white" />,
      features: [
        "User Research",
        "Prototyping",
        "Design Systems",
        "Usability Testing"
      ],
      color: "bg-pink-600",
      gradient: "bg-gradient-to-r from-pink-600 to-rose-600"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive software solutions tailored to your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Let&apos;s discuss how we can help transform your ideas into reality with our expert development services.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;