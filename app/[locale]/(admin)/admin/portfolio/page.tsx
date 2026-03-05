export const dynamic = 'force-dynamic';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

async function deleteProject(formData: FormData) {
  "use server";

  const supabase = await createSupabaseServerClient();

  const id = formData.get("id") as string;
  const locale = formData.get("locale") as string;

  await supabase
    .from("portfolio_projects")
    .delete()
    .eq("id", id);

  revalidatePath(`/${locale}/admin/portfolio`);
}

export default async function AdminPortfolioPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: 'admin' });
  const supabase = await createSupabaseServerClient();

  const { data: projects } = await supabase
    .from('portfolio_projects')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">{t('portfolioTitle')}</h1>
        <Link
          href={`/${locale}/admin/portfolio/new`}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {t('portfolioNewProject')}
        </Link>
      </div>

      <div className="space-y-4">

        {projects?.map((project) => (

          <div
            key={project.id}
            className="border p-4 rounded flex justify-between items-center"
          >

            <div className="flex items-center gap-4">

              {project.cover_image && (
                <img
                  src={project.cover_image}
                  className="w-16 h-16 object-cover rounded"
                />
              )}

              <div>
                <h2 className="font-semibold">{project.title}</h2>

                <p className="text-sm text-gray-500">
                  {project.category}
                </p>
              </div>

            </div>

            <div className="flex gap-4">

              <Link
                href={`/${locale}/admin/portfolio/${project.id}/edit`}
                className="text-blue-600"
              >
                Düzenle
              </Link>

              <form action={deleteProject}>
                <input
                  type="hidden"
                  name="id"
                  value={project.id}
                />

                <input
                  type="hidden"
                  name="locale"
                  value={locale}
                />

                <button
                  type="submit"
                  className="text-red-600"
                >
                  Sil
                </button>
              </form>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}