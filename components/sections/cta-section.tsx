'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import React from 'react';

type CTAData = {
  title?: string;
  subtitle?: string;
  button_text?: string;
};

export const CTASection = React.memo(function CTASection({
  data,
}: {
  data?: CTAData;
}) {
  const t = useTranslations('cta');
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary/10 via-base-200/50 to-secondary/10">
      <div className="container mx-auto max-w-4xl px-6">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
          }
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.5 }}
          className="text-center"
        >
          <div className="card bg-base-100/90 backdrop-blur-xl shadow-xl shadow-base-content/5 border border-base-300/60 rounded-3xl p-8 md:p-12">
            <div className="card-body items-center gap-4">
              <h2 className="card-title text-3xl md:text-4xl font-bold text-base-content text-center tracking-tight">
                {data?.title || t('title')}
              </h2>
              <p className="text-base-content/70 text-lg max-w-xl">
                {data?.subtitle || t('subtitle')}
              </p>
              <div className="card-actions mt-4">
                <Link
                  href="/contact"
                  className="btn btn-primary btn-lg gap-2 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  {data?.button_text || t('button')}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
