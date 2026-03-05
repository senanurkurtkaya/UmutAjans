import { Link } from '@/lib/i18n/navigation';
import Image from 'next/image';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function PortfolioPage() {

  const supabase = await createSupabaseServerClient();

  const { data: projects } = await supabase
    .from("portfolio_projects")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="container mx-auto py-20">

      <h1 className="text-4xl font-bold mb-12 text-center">
        Portfolio
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {projects?.map((project) => (
          <Link
            key={project.id}
            href={`/portfolio/${project.slug}`}
            className="group block"
          >

            <div className="relative w-full h-72 overflow-hidden rounded-xl">

              {project.cover_image && (
                <Image
                  src={project.cover_image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
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