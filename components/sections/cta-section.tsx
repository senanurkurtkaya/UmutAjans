'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import React from 'react';

export const CTASection = React.memo(function CTASection() {
  const t = useTranslations('cta');
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="py-20 md:py-32 bg-gradient-to-r from-primary/10 to-primary/5"
      aria-label="Call to action"
    >
      <div className="container">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.5 }}
          className="max-w-2xl mx-auto text-center space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('subtitle')}
          </p>
          <Button asChild size="lg" className="group">
            <Link href="/contact">
              {t('button')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
});
