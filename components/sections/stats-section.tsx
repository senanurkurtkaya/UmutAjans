'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import React from 'react';

const statKeys = ['clients', 'projects', 'satisfaction', 'experience'];
const statValues = ['500+', '1000+', '98%', '10+'];

export const StatsSection = React.memo(function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const t = useTranslations('stats');
  const prefersReducedMotion = useReducedMotion();

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
    <section
      ref={ref}
      className="py-20 bg-muted/50"
      aria-label="Statistics"
    >
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statKeys.map((key, index) => (
            <motion.div
              key={key}
              {...animationProps}
              transition={{
                ...animationProps.transition,
                delay: prefersReducedMotion ? 0 : index * 0.1,
              }}
              className="text-center"
            >
              <div
                className="text-4xl md:text-5xl font-bold text-primary mb-2"
                aria-label={`${statValues[index]} ${t(key)}`}
              >
                {statValues[index]}
              </div>
              <div className="text-muted-foreground">{t(key)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
