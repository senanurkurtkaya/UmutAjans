import { createSupabaseServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";

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

  const { data: images } = await supabase
    .from("portfolio_images")
    .select("*")
    .eq("project_id", project.id)
    .order("display_order", { ascending: true });

  return (
    <div className="container mx-auto py-20 max-w-4xl">

      {project.cover_image && (
        <div className="relative w-full h-[400px] mb-10">
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <h1 className="text-4xl font-bold mb-6">
        {project.title}
      </h1>

      <div className="flex gap-6 text-sm text-gray-500 mb-8">

        {project.client && (
          <span>Client: {project.client}</span>
        )}

        {project.year && (
          <span>Year: {project.year}</span>
        )}

        {project.category && (
          <span>Category: {project.category}</span>
        )}

      </div>

      <p className="text-lg leading-relaxed mb-12">
        {project.description}
      </p>

      {images && images.length > 0 && (
        <div>

          <h2 className="text-2xl font-semibold mb-6">
            Project Images
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {images.map((img) => (
              <div key={img.id} className="relative w-full h-64">
                <Image
                  src={img.image_url}
                  alt="Project Image"
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