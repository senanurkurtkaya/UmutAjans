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
          initial: { opacity: 0, y: 30 },
          animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
          transition: { duration: 0.5 },
        },
    [isInView, prefersReducedMotion]
  );

  return (
    <section ref={ref} className="py-24 bg-[#243147]">

      <div className="container mx-auto max-w-6xl px-6">

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT TEXT */}
          <motion.h2
            {...animationProps}
            className="text-4xl md:text-5xl font-bold leading-tight 
  text-transparent bg-clip-text 
  bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400"
          >
            Her Detayda Özen,
            <br />
            Her Tasarımda
            <br />
            Kaliteli İmza.
          </motion.h2>

          {/* RIGHT STATS */} 
          <div className="bg-[#0f1a2b] rounded-2xl shadow-xl border border-white/10 overflow-hidden">

            <div className="grid grid-cols-2 divide-x divide-y lg:divide-y-0 divide-white/10">

              {stats.map((item, index) => (
                <motion.div
                  key={index}
                  {...animationProps}
                  transition={{
                    ...animationProps.transition,
                    delay: prefersReducedMotion ? 0 : index * 0.1,
                  }}
                  className="text-center py-10 px-6"
                >
                  <div className="text-3xl md:text-4xl font-bold text-blue-400">
                    {item.value}
                  </div>

                  <div className="mt-2 text-white/70 font-medium">
                    {item.label}
                  </div>

                </motion.div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
});