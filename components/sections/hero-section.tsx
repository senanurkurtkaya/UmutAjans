'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { useRef, useMemo } from 'react';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import React from 'react';

export const HeroSection = React.memo(function HeroSection() {
  const t = useTranslations('hero');
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Memoize animation variants
  const containerVariants = useMemo(
    () =>
      prefersReducedMotion
        ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
        : {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
              },
            },
          },
    [prefersReducedMotion]
  );

  const itemVariants = useMemo(
    () =>
      prefersReducedMotion
        ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
        : {
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          },
    [prefersReducedMotion]
  );

  const floatingVariants = useMemo(
    () =>
      prefersReducedMotion
        ? { animate: {} }
        : {
            animate: {
              y: [0, -20, 0],
              transition: {
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            },
          },
    [prefersReducedMotion]
  );

  const orbAnimationProps = useMemo(
    () =>
      prefersReducedMotion
        ? {}
        : {
            animate: {
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            },
            transition: {
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          },
    [prefersReducedMotion]
  );

  const orb2AnimationProps = useMemo(
    () =>
      prefersReducedMotion
        ? {}
        : {
            animate: {
              x: [0, -100, 0],
              y: [0, -50, 0],
              scale: [1, 1.3, 1],
            },
            transition: {
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          },
    [prefersReducedMotion]
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/30"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl will-change-transform"
          {...orbAnimationProps}
          aria-hidden="true"
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl dark:bg-primary/20 will-change-transform"
          {...orb2AnimationProps}
          aria-hidden="true"
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
      </div>

      {/* Main Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center space-y-8"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              transition={
                prefersReducedMotion
                  ? {}
                  : { type: 'spring', stiffness: 400, damping: 17 }
              }
            >
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-primary">
                Premium Digital Solutions
              </span>
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="block bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                {t('title')}
              </span>
              <span className="block mt-2 bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                Digital Excellence
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants}>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button
              asChild
              size="lg"
              className="group h-14 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/contact">
                {t('cta')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group h-14 px-8 text-base font-semibold border-2 hover:bg-accent/50 transition-all duration-300"
            >
              <Link href="/services">
                <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                {t('ctaSecondary')}
              </Link>
            </Button>
          </motion.div>

          {/* Stats or Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="pt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-sm text-muted-foreground"
          >
            <motion.div
              className="flex items-center gap-2"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            >
              <div
                className="h-2 w-2 rounded-full bg-primary animate-pulse"
                aria-hidden="true"
              />
              <span className="font-medium">500+ Happy Clients</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            >
              <div
                className="h-2 w-2 rounded-full bg-primary animate-pulse"
                aria-hidden="true"
              />
              <span className="font-medium">10+ Years Experience</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            >
              <div
                className="h-2 w-2 rounded-full bg-primary animate-pulse"
                aria-hidden="true"
              />
              <span className="font-medium">98% Satisfaction</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        variants={floatingVariants}
        animate="animate"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs font-medium uppercase tracking-wider">
            Scroll
          </span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
});
