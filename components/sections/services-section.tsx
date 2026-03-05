'use client';

import { motion } from 'framer-motion';
import {
  Target,
  TrendingUp,
  Zap,
  Users,
  BarChart3,
  Globe,
  FileText,
  BookOpen,
  Mail,
  Folder,
  Tag,
  Barcode,
  Image,
  Gift,
  Award,
  Book,
  Layout,
  Shirt,
  ShoppingBag,
  Magnet,
  Calendar,
} from 'lucide-react';
import { useMemo } from 'react';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import React from 'react';

type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

interface ServicesSectionProps {
  services: Service[];
}

const iconMap: Record<string, React.ElementType> = {
  // Eski dijital hizmet anahtarlarını da çalışır bırakıyoruz
  seo: Target,
  social: TrendingUp,
  ppc: Zap,
  content: Users,
  analytics: BarChart3,
  web: Globe,
  globe: Globe,

  // Matbaa hizmetleri – ikon alanına bu değerleri yazabilirsin
  filetext: FileText,
  FileText,
  bookopen: BookOpen,
  BookOpen,
  mail: Mail,
  Mail,
  folder: Folder,
  Folder,
  tag: Tag,
  Tag,
  barcode: Barcode,
  Barcode,
  image: Image,
  Image,
  gift: Gift,
  Gift,
  award: Award,
  Award,
  book: Book,
  Book,
  layout: Layout,
  Layout,
  shirt: Shirt,
  Shirt,
  shoppingbag: ShoppingBag,
  ShoppingBag,
  magnet: Magnet,
  Magnet,
  calendar: Calendar,
  Calendar,
};

export const ServicesSection = React.memo(function ServicesSection({
  services = [],
}: ServicesSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = useMemo(
    () =>
      prefersReducedMotion
        ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
        : {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          },
    [prefersReducedMotion]
  );

  const itemVariants = useMemo(
    () =>
      prefersReducedMotion
        ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
        : {
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5 },
            },
          },
    [prefersReducedMotion]
  );

  if (!services?.length) return null;

  return (
    <section id="services" className="py-16 md:py-24 bg-base-100">
      <div className="container mx-auto max-w-6xl px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service: Service) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <motion.div key={service.id} variants={itemVariants} className="h-full">
                <div className="card h-full flex flex-col bg-base-200/80 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden border border-base-300/80 hover:border-primary/40">
                  <div className="card-body flex flex-col justify-between">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="card-title text-lg text-base-content">
                      {service.title}
                    </h3>
                    <div className="mt-2">
                      <p className="text-base-content/70 text-sm leading-relaxed max-h-24 overflow-hidden">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
});
