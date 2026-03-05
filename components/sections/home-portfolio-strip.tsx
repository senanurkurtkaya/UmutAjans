'use client';

import { Link } from '@/lib/i18n/navigation';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const FALLBACK_TITLE = { en: 'Our Work', tr: 'Çalışmalarımız' };
const VIEW_ALL = { en: 'View all', tr: 'Tümünü gör' };

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  cover_image: string | null;
};

export function HomePortfolioStrip({
  projects,
  locale = 'en',
}: {
  projects: Project[];
  locale?: string;
}) {
  const display = (projects ?? []).slice(0, 6);
  if (display.length === 0) return null;
  const title = FALLBACK_TITLE[locale as keyof typeof FALLBACK_TITLE] ?? FALLBACK_TITLE.en;
  const viewAll = VIEW_ALL[locale as keyof typeof VIEW_ALL] ?? VIEW_ALL.en;

  return (
    <section className="py-16 md:py-24 bg-base-200">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content">
            {title}
          </h2>
          <Link
            href="/portfolio"
            className="btn btn-primary btn-outline gap-2 rounded-xl shadow-sm hover:shadow"
          >
            {viewAll}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((project) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className="group block"
            >
              <div className="card bg-base-100 shadow-xl overflow-hidden rounded-2xl border border-base-300 hover:border-primary/40 hover:shadow-2xl transition-all duration-300">
                <figure className="relative aspect-[4/3] overflow-hidden">
                  {project.cover_image ? (
                    <Image
                      src={project.cover_image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-base-300 flex items-center justify-center text-base-content/50">
                      Görsel yok
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </figure>
                <div className="card-body p-4">
                  <h3 className="card-title text-base group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.category && (
                    <p className="text-sm text-base-content/60">{project.category}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
