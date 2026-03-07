'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useMemo, useState } from 'react';
import { Link } from '@/lib/i18n/navigation';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import { useTranslations } from 'next-intl';
import Image from "next/image";

export type CategoryItem = {
  id?: string;
  title: string;
  image: string;
  link: string;
};

type CategoryShowcaseProps = {
  categories: CategoryItem[];
  locale?: string;
};

const LAYOUT = [
  { colSpan: 2, rowSpan: 2, colStart: 1, rowStart: 1 },
  { colSpan: 1, rowSpan: 1, colStart: 3, rowStart: 1 },
  { colSpan: 1, rowSpan: 1, colStart: 3, rowStart: 2 },
  { colSpan: 1, rowSpan: 1, colStart: 1, rowStart: 3 },
  { colSpan: 1, rowSpan: 1, colStart: 2, rowStart: 3 },
  { colSpan: 1, rowSpan: 1, colStart: 3, rowStart: 3 },
] as const;

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations('home');
  const viewAllLabel = t('viewAll');

  const containerVariants = useMemo(
    () =>
      prefersReducedMotion
        ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
        : {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.06, delayChildren: 0.04 },
          },
        },
    [prefersReducedMotion]
  );

  const cardVariants = useMemo(
    () =>
      prefersReducedMotion
        ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
        : {
          hidden: { opacity: 0, y: 16 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
          },
        },
    [prefersReducedMotion]
  );

  if (!categories?.length) return null;

 const displayCategories = categories.slice(0, 6);

  return (
    <section ref={ref} className="mt-16">
      <div className="container mx-auto max-w-6xl px-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-0 lg:hidden"
        >
          {displayCategories.map((category, index) => (
            <motion.div
              key={category.id ?? index}
              variants={cardVariants}
              className="relative overflow-hidden group w-full h-[240px]"
            >
              <CategoryCard category={category} viewAllLabel={viewAllLabel} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="hidden lg:grid lg:grid-cols-3 lg:gap-0"
          style={{ gridTemplateRows: '1fr 1fr 1fr' }}
        >
          {displayCategories.map((category, index) => {
            const slot = LAYOUT[index];
            if (!slot) return null;
            return (
              <motion.div
                key={category.id ?? index}
                variants={cardVariants}
                className="relative overflow-hidden group w-full h-full min-h-[200px]"
                style={{
                  gridColumn: `${slot.colStart} / span ${slot.colSpan}`,
                  gridRow: `${slot.rowStart} / span ${slot.rowSpan}`,
                }}
              >
                <CategoryCard category={category} viewAllLabel={viewAllLabel} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function CategoryCard({
  category,
  viewAllLabel,
}: {
  category: CategoryItem;
  viewAllLabel: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={category.link} className="block relative overflow-hidden group w-full h-full">

      <div className="relative overflow-hidden group w-full h-full min-h-[260px] bg-neutral-800">
        {!imgError ? (
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width:768px) 100vw, 33vw"
            onError={() => setImgError(true)}
            unoptimized={category.image.includes('islak-mendil')}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-700">
            <span className="text-white/80 text-lg font-medium text-center px-4">{category.title}</span>
          </div>
        )}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="text-2xl font-bold text-white text-center px-4">
          {category.title}
        </h3>

        <span className="btn btn-primary mt-4">
          {viewAllLabel}
        </span>
      </div>

    </Link>
  );
}
