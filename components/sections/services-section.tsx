'use client';

import { motion } from 'framer-motion';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Target,
  TrendingUp,
  Zap,
  Users,
  BarChart3,
  Globe,
} from 'lucide-react';
import { useMemo } from 'react';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import React from 'react';

type Service = {
  id: string;
  title: string;
  description: string;
  icon: string; // 🔥 DB’den gelen string
};

interface ServicesSectionProps {
  services: Service[];
}

// 🔥 Icon mapping
const iconMap: Record<string, React.ElementType> = {
  seo: Target,
  social: TrendingUp,
  ppc: Zap,
  content: Users,
  analytics: BarChart3,
  web: Globe,
  globe: Globe,
};

export const ServicesSection = React.memo(function ServicesSection({
  services = [],
}: ServicesSectionProps) {
  const prefersReducedMotion = useReducedMotion();
console.log("RENDER SERVICES:", services);
  const containerVariants = useMemo(
    () =>
      prefersReducedMotion
        ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
        : {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          },
    [prefersReducedMotion]
  );

  const itemVariants = useMemo(
    () =>
      prefersReducedMotion
        ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
        : {
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
              },
            },
          },
    [prefersReducedMotion]
  );

if (!services || services.length === 0) {
  return null;
}
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service: Service) => {
            const Icon = iconMap[service.icon] || Globe; // fallback icon

            return (
              <motion.div key={service.id} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-4">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
});