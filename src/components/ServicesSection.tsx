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
      
      <div className="relative glass rounded-2xl hover:glass-heavy transition-all duration-300 overflow-hidden border border-glass-border hover:border-primary/20">
        <div className="p-8 lg:p-10">
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
            className="text-display-sm font-bold text-foreground mb-6"
          >
            {service.title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
            className="text-body-lg text-muted-foreground mb-8 leading-relaxed"
          >
            {service.description}
          </motion.p>

          {/* Features */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
            className="space-y-4 mb-8"
          >
            {service.features.map((feature, featureIndex) => (
              <motion.li
                key={featureIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: index * 0.2 + 0.7 + featureIndex * 0.1 }}
                className="flex items-center gap-3 text-foreground"
              >
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-body-md">{feature}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group/btn flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors duration-200 bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-lg"
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
    <section id="services" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5" />
      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-display-lg font-bold text-foreground mb-6">
            Our Services
          </h2>
          <p className="text-body-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive software solutions tailored to your business needs, delivered with excellence and innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
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
          className="text-center mt-20"
        >
          <h3 className="text-display-md font-bold text-foreground mb-6">
            Ready to Start Your Project?
          </h3>
          <p className="text-body-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help transform your ideas into reality with our expert development services.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 font-semibold text-body-md tracking-wide uppercase transition-all duration-300 glow-hover rounded-lg"
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