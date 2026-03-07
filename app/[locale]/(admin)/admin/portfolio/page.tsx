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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">{t('portfolioTitle')}</h1>
        <Link
          href={`/${locale}/admin/portfolio/new`}
          className="px-4 py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition shrink-0"
        >
          {t('portfolioNewProject')}
        </Link>
      </div>

      <div className="space-y-3">
        {projects?.map((project) => (
          <div
            key={project.id}
            className="p-4 bg-[#0f1a2b] border border-white/10 rounded-xl flex flex-wrap justify-between items-center gap-4 hover:border-white/20 transition-colors shadow-xl"
          >
            <div className="flex items-center gap-4">
              {project.cover_image && (
                <img
                  src={project.cover_image}
                  alt=""
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}

              <div>
                <h2 className="font-semibold">{project.title}</h2>
                <p className="text-sm text-white/60">
                  {project.category}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/${locale}/admin/portfolio/${project.id}/edit`}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-sm font-medium rounded-lg transition"
              >
                Düzenle
              </Link>

              <form action={deleteProject}>
                <input type="hidden" name="id" value={project.id} />
                <input type="hidden" name="locale" value={locale} />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition"
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