import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getBaseUrl } from "@/lib/api-base-url";

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const base = await getBaseUrl();
  const t = await getTranslations("portfolioDetail");

  const projectRes = await fetch(`${base}/api/portfolio?slug=${encodeURIComponent(slug)}`, { cache: 'no-store' });
  if (!projectRes.ok) return notFound();
  const project = await projectRes.json();
  if (!project?.id) return notFound();

  const imagesRes = await fetch(`${base}/api/portfolio-images?project_id=${encodeURIComponent(project.id)}`, { cache: 'no-store' });
  const images = imagesRes.ok ? (await imagesRes.json()) : [];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:py-16 md:py-20">

      {project.cover_image && (
        <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-[400px] mb-8 md:mb-10 overflow-hidden rounded-lg">
          <img
            src={project.cover_image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <h1 className="text-3xl sm:text-4xl font-bold mb-6">
        {project.title}
      </h1>

      <div className="flex gap-6 text-sm text-gray-500 mb-8">

        {project.client && (
          <span>{t("client")}: {project.client}</span>
        )}

        {project.year && (
          <span>{t("year")}: {project.year}</span>
        )}

        {project.category && (
          <span>{t("category")}: {project.category}</span>
        )}

      </div>

      <p className="text-lg leading-relaxed mb-12">
        {project.description}
      </p>

      {images && images.length > 0 && (
        <div>

          <h2 className="text-2xl font-semibold mb-6">
            {t("projectImages")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {images.map((img: { id: string; image_url: string }) => (
              <div key={img.id} className="relative w-full h-64 overflow-hidden rounded-lg">
                <img
                  src={img.image_url}
                  alt={t("projectImageAlt")}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

          </div>

        </div>
      )}

    </div>
  );
}