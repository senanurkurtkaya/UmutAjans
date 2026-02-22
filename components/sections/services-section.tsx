'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, TrendingUp, Zap, Users, BarChart3, Globe } from 'lucide-react';
import { useMemo } from 'react';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import React from 'react';

const serviceKeys = [
  { icon: Target, key: 'seo' },
  { icon: TrendingUp, key: 'social' },
  { icon: Zap, key: 'ppc' },
  { icon: Users, key: 'content' },
  { icon: BarChart3, key: 'analytics' },
  { icon: Globe, key: 'web' },
];

export const ServicesSection = React.memo(function ServicesSection() {
  const t = useTranslations('services');
  const prefersReducedMotion = useReducedMotion();

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

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">{t('title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {serviceKeys.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-4">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle>{t(`${service.key}.title`)}</CardTitle>
                    <CardDescription>{t(`${service.key}.description`)}</CardDescription>
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
