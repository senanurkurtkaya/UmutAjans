'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Heart, Zap, Shield } from 'lucide-react';
import { useMemo } from 'react';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import React from 'react';

const valueKeys = [
  { icon: Target, key: 'results' },
  { icon: Heart, key: 'client' },
  { icon: Zap, key: 'innovation' },
  { icon: Shield, key: 'transparency' },
];

export const ValuesSection = React.memo(function ValuesSection() {
  const t = useTranslations('about.values');
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
    <section className="py-20" aria-label="Our values">
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
          {valueKeys.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.key}
                {...animationProps}
                transition={{
                  ...animationProps.transition,
                  delay: prefersReducedMotion ? 0 : index * 0.1,
                }}
              >
                <Card className="h-full text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4">
                      <Icon className="h-10 w-10 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle>{t(`${value.key}.title`)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t(`${value.key}.description`)}
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
