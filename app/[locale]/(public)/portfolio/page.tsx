import { Link } from '@/lib/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { getBaseUrl } from '@/lib/api-base-url';

export default async function PortfolioPage() {
  const t = await getTranslations('portfolio');
  const base = await getBaseUrl();
  const res = await fetch(`${base}/api/portfolio?published=true`, { cache: 'no-store' });
  const projects = res.ok ? (await res.json()) : [];

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20">

      <h1 className="text-3xl sm:text-4xl font-bold mb-8 md:mb-12 text-center">
        {t('title')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {projects?.map((project: { id: string; slug: string; title: string; category?: string; cover_image?: string }) => (
          <Link
            key={project.id}
            href={`/portfolio/${project.slug}`}
            className="group block"
          >

            <div className="relative w-full h-72 overflow-hidden rounded-xl">
              {project.cover_image ? (
                <img
                  src={project.cover_image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 bg-base-300" />
              )}
            </div>

            <div className="mt-4">

              <h3 className="text-xl font-semibold group-hover:text-primary transition">
                {project.title}
              </h3>

              <p className="text-sm text-gray-500">
                {project.category}
              </p>

            </div>

          </Link>
        ))}

      </div>

    </div>
  );
}