'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import React from 'react';

const references = [
  { name: 'Müşteri 1' },
  { name: 'Müşteri 2' },
  { name: 'Müşteri 3' },
  { name: 'Müşteri 4' },
  { name: 'Müşteri 5' },
  { name: 'Müşteri 6' },
  { name: 'Müşteri 7' },
  { name: 'Müşteri 8' },
  { name: 'Müşteri 9' },
  { name: 'Müşteri 10' },
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
    <section className="py-20 bg-muted/50" aria-label="Referanslarımız">
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
          {references.map((ref, index) => (
            <motion.div
              key={`${ref.name}-${index}`}
              {...animationProps}
              transition={{
                ...animationProps.transition,
                delay: prefersReducedMotion ? 0 : index * 0.05,
              }}
            >
              <div className="flex h-16 items-center justify-center rounded-xl border border-border bg-background/60 px-4 py-3 shadow-sm">
                <span className="text-sm md:text-base font-medium text-muted-foreground tracking-wide">
                  {ref.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
