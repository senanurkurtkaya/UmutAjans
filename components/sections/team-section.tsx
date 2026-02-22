'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useMemo } from 'react';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import React from 'react';

const teamMembers = [
  {
    name: 'John Doe',
    role: 'CEO & Founder',
    description: 'Visionary leader with 15+ years in digital marketing',
  },
  {
    name: 'Jane Smith',
    role: 'Creative Director',
    description: 'Award-winning designer and brand strategist',
  },
  {
    name: 'Mike Johnson',
    role: 'Head of SEO',
    description: 'SEO expert with proven track record of success',
  },
  {
    name: 'Sarah Williams',
    role: 'Social Media Manager',
    description: 'Social media strategist and content creator',
  },
];

export const TeamSection = React.memo(function TeamSection() {
  const t = useTranslations('about.team');
  const prefersReducedMotion = useReducedMotion();

  const animationProps = useMemo(
    () =>
      prefersReducedMotion
        ? {
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true },
            transition: { duration: 0.3 },
          }
        : {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: '-100px' },
            transition: { duration: 0.5 },
          },
    [prefersReducedMotion]
  );

  return (
    <section className="py-20 bg-muted/50" aria-label="Our team">
      <div className="container">
        <motion.div
          {...animationProps}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">{t('title')}</h2>
          <p className="text-muted-foreground">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={`${member.name}-${index}`}
              {...animationProps}
              transition={{
                ...animationProps.transition,
                delay: prefersReducedMotion ? 0 : index * 0.1,
              }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
