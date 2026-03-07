import { createSupabaseServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function PortfolioDetailPage({
  params,
}: {
  params: { slug: string };
}) {

  const supabase = await createSupabaseServerClient();

  const { data: project, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!project || error) {
    return notFound();
  }

  const t = await getTranslations("portfolioDetail");
  const { data: images } = await supabase
    .from("portfolio_images")
    .select("*")
    .eq("project_id", project.id)
    .order("display_order", { ascending: true });

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:py-16 md:py-20">

      {project.cover_image && (
        <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-[400px] mb-8 md:mb-10">
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            className="object-cover rounded-lg"
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

            {images.map((img) => (
              <div key={img.id} className="relative w-full h-64">
                <Image
                  src={img.image_url}
                  alt={t("projectImageAlt")}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}

          </div>

        </div>
      )}

    </div>
  );
}