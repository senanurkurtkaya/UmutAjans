'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Lightbulb, Rocket, BarChart } from 'lucide-react';
import { useMemo } from 'react';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import React from 'react';

const processKeys = [
  { icon: Search, key: 'discovery' },
  { icon: Lightbulb, key: 'strategy' },
  { icon: Rocket, key: 'implementation' },
  { icon: BarChart, key: 'optimization' },
];

export const ProcessSection = React.memo(function ProcessSection() {
  const t = useTranslations('process');
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
    <section
      className="py-20 bg-muted/50"
      aria-label="Our process"
    >
      <div className="container mx-auto">
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
          {processKeys.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.key}
                {...animationProps}
                transition={{
                  ...animationProps.transition,
                  delay: prefersReducedMotion ? 0 : index * 0.1,
                }}
              >
                <Card className="h-full text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4">
                      <div className="rounded-full bg-primary/10 p-3 w-fit mx-auto">
                        <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-primary mb-2">
                      <span aria-label={`${t('step')} ${index + 1}`}>{t('step')} {index + 1}</span>
                    </div>
                    <CardTitle>{t(`${step.key}.title`)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t(`${step.key}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
