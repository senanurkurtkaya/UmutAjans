'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import React from 'react';

type StatsItem = {
  label: string;
  value: string;
};

type StatsData = {
  stats?: Array<{
    label?: string | null;
    value?: string | null;
  }>;
};

const fallbackKeys = ['clients', 'projects', 'satisfaction', 'experience'];
const fallbackValues = ['500+', '1000+', '98%', '10+'];

export const StatsSection = React.memo(function StatsSection({
  data,
}: {
  data?: StatsData;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const t = useTranslations('stats');
  const prefersReducedMotion = useReducedMotion();

const stats =
  (data?.stats?.map((item) => ({
    label: item.label ?? '',
    value: item.value ?? '',
  })) as StatsItem[]) ??
  fallbackKeys.map((key, i) => ({
    label: t(key),
    value: fallbackValues[i],
  }));

  const animationProps = useMemo(
    () =>
      prefersReducedMotion
        ? {
            initial: { opacity: 0 },
            animate: isInView ? { opacity: 1 } : { opacity: 0 },
            transition: { duration: 0.3 },
          }
        : {
            initial: { opacity: 0, scale: 0.5 },
            animate: isInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.5 },
            transition: { duration: 0.5 },
          },
    [isInView, prefersReducedMotion]
  );

  return (
    <section ref={ref} className="py-20 bg-muted/50">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              {...animationProps}
              transition={{
                ...animationProps.transition,
                delay: prefersReducedMotion ? 0 : index * 0.1,
              }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {item.value}
              </div>
              <div className="text-muted-foreground">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});