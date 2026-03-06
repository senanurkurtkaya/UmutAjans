export const dynamic = 'force-dynamic';

import { getTranslations } from 'next-intl/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';
import { HeroSortableList } from '../components/HeroSortableList';

type Props = {
    params: { locale: string };
    searchParams: { edit?: string };
};

export default async function HeroAdminPage({
    params,
    searchParams,
}: Props) {
    const t = await getTranslations('adminAlerts');
    const tAdmin = await getTranslations('admin');
    const supabase = await createSupabaseServerClient();

    const { data: slides } = await supabase
        .from('hero_slides')
        .select('*')
        .order('display_order', { ascending: true });

    const editingSlide = slides?.find(
        (s) => s.id === searchParams.edit
    );

    /* ================= ADD ================= */
    async function addSlide(formData: FormData) {
        'use server';

        const supabase = createSupabaseAdminClient();

        const file = formData.get('image') as File | null;

        let imageUrl = '';

        if (file && file.size > 0) {
            const safeFileName = file.name.replaceAll(' ', '-').toLowerCase();
            const filePath = `hero/${Date.now()}-${safeFileName}`;

            await supabase.storage.from('media').upload(filePath, file);

            const { data } = supabase.storage
                .from('media')
                .getPublicUrl(filePath);

            imageUrl = data.publicUrl;
        }

        await supabase.from('hero_slides').insert({
            title: String(formData.get('title') ?? ''),
            subtitle: String(formData.get('subtitle') ?? ''),
            button_text: String(formData.get('button_text') ?? ''),
            display_order: Number(formData.get('order') ?? 0),
            image_url: imageUrl,
            is_active: true,
        });

        revalidatePath(`/${params.locale}`);
    }

    /* ================= UPDATE ================= */
    async function updateSlide(formData: FormData) {
        'use server';

        const supabase = createSupabaseAdminClient();

        const id = searchParams.edit;

        await supabase
            .from('hero_slides')
            .update({
                title: String(formData.get('title') ?? ''),
                subtitle: String(formData.get('subtitle') ?? ''),
                button_text: String(formData.get('button_text') ?? ''),
                display_order: Number(formData.get('order') ?? 0),
            })
            .eq('id', id);

        revalidatePath(`/${params.locale}`);
    }

    /* ================= TOGGLE ================= */
    async function toggleSlide(formData: FormData) {
        'use server';

        const supabase = createSupabaseAdminClient();

        const id = formData.get('id');
        const current = formData.get('current') === 'true';

        await supabase
            .from('hero_slides')
            .update({ is_active: !current })
            .eq('id', id);

        revalidatePath(`/${params.locale}`);
    }

    /* ================= DELETE ================= */
    async function deleteSlide(formData: FormData) {
        'use server';

        const supabase = createSupabaseAdminClient();
        const id = formData.get('id');

        await supabase.from('hero_slides').delete().eq('id', id);

        revalidatePath(`/${params.locale}`);
    }

    /* ================= REORDER ================= */
    async function reorderSlides(ids: string[]) {
        'use server';

        const supabase = createSupabaseAdminClient();

        for (let i = 0; i < ids.length; i++) {
            await supabase
                .from('hero_slides')
                .update({ display_order: i })
                .eq('id', ids[i]);
        }

        revalidatePath(`/${params.locale}`);
    }

    return (
        <div className="max-w-5xl mx-auto py-20 space-y-10">
            <h1 className="text-3xl font-bold">{t('heroManagement')}</h1>

            {/* FORM */}
            <form
                action={editingSlide ? updateSlide : addSlide}
                className="space-y-4 border p-6 rounded-xl"
            >
                <input
                    name="title"
                    placeholder={tAdmin('placeholderTitle')}
                    defaultValue={editingSlide?.title ?? ''}
                    className="w-full p-2 border rounded"
                />

                <textarea
                    name="subtitle"
                    placeholder={tAdmin('placeholderSubtitle')}
                    defaultValue={editingSlide?.subtitle ?? ''}
                    className="w-full p-2 border rounded"
                />

                <input
                    name="button_text"
                    placeholder={tAdmin('placeholderButton')}
                    defaultValue={editingSlide?.button_text ?? ''}
                    className="w-full p-2 border rounded"
                />

                <input
                    name="order"
                    type="number"
                    placeholder={tAdmin('placeholderOrder')}
                    defaultValue={editingSlide?.display_order ?? 0}
                    className="w-full p-2 border rounded"
                />

                {!editingSlide && (
                    <input
                        name="image"
                        type="file"
                        accept="image/*"
                        className="w-full"
                    />
                )}

                <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    {editingSlide ? tAdmin('update') : tAdmin('addSlide')}
                </button>
            </form>

            <HeroSortableList
                slides={slides ?? []}
                onReorder={reorderSlides}
                onToggle={toggleSlide}
                onDelete={deleteSlide}
            />
        </div>
    );
}