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
            initial: { opacity: 0, y: 20 },
            animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
            transition: { duration: 0.5 },
          },
    [isInView, prefersReducedMotion]
  );

  return (
    <section ref={ref} className="py-16 md:py-24 bg-base-200">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="stats stats-vertical md:stats-horizontal w-full shadow-lg bg-base-100 rounded-2xl overflow-hidden border border-base-300/60">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              {...animationProps}
              transition={{
                ...animationProps.transition,
                delay: prefersReducedMotion ? 0 : index * 0.1,
              }}
              className="stat place-items-center py-8 px-6"
            >
              <div className="stat-value text-primary text-3xl md:text-4xl font-bold">
                {item.value}
              </div>
              <div className="stat-desc text-base-content/70 font-medium">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});