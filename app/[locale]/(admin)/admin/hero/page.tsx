export const dynamic = 'force-dynamic';

import { getTranslations } from 'next-intl/server';
import { revalidatePath } from 'next/cache';
import { getBaseUrl } from '@/lib/api-base-url';
import { safeJson } from '@/lib/safe-json';
import { HeroSortableList } from '../components/HeroSortableList';
import { HeroSlideForm } from '../components/HeroSlideForm';

type HeroSlide = { id: string; title?: string; subtitle?: string; button_text?: string; button_link?: string; display_order?: number; image_url?: string; is_active?: boolean };

type Props = {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ edit?: string }>;
};

export default async function HeroAdminPage({
    params,
    searchParams,
}: Props) {
    const { locale } = await params;
    const { edit } = await searchParams;
    const base = await getBaseUrl();
    const t = await getTranslations('adminAlerts');
    const tAdmin = await getTranslations('admin');

    const slidesRes = await fetch(`${base}/api/hero-slides`, { cache: 'no-store' });
    const slidesList = (slidesRes.ok ? await safeJson<HeroSlide[]>(slidesRes) : null) ?? [];
    const editingSlide = (slidesList ?? []).find((s) => s.id === edit);

    async function toggleSlide(formData: FormData) {
        'use server';
        const id = formData.get('id') as string;
        const current = formData.get('current') === 'true';
        const apiBase = await getBaseUrl();
        await fetch(`${apiBase}/api/hero-slides/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_active: !current }),
        });
        revalidatePath(`/${locale}`);
    }

    async function deleteSlide(formData: FormData) {
        'use server';
        const id = formData.get('id') as string;
        const apiBase = await getBaseUrl();
        await fetch(`${apiBase}/api/hero-slides/${id}`, { method: 'DELETE' });
        revalidatePath(`/${locale}`);
    }

    async function reorderSlides(ids: string[]) {
        'use server';
        const apiBase = await getBaseUrl();
        await fetch(`${apiBase}/api/hero-slides/reorder`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids }),
        });
        revalidatePath(`/${locale}`);
    }

    return (
        <div className="max-w-5xl space-y-10">
            <h1 className="text-2xl md:text-3xl font-bold">{t('heroManagement')}</h1>

            <HeroSlideForm
                editingSlide={editingSlide}
                locale={locale}
                labels={{
                    placeholderTitle: tAdmin('placeholderTitle'),
                    placeholderSubtitle: tAdmin('placeholderSubtitle'),
                    placeholderButton: tAdmin('placeholderButton'),
                    placeholderButtonLink: tAdmin('placeholderButtonLink'),
                    placeholderOrder: tAdmin('placeholderOrder'),
                    image: tAdmin('image'),
                    changeImage: tAdmin('changeImage'),
                    addSlide: tAdmin('addSlide'),
                    update: tAdmin('update'),
                }}
            />

            <HeroSortableList
                slides={(slidesList ?? []).map((s) => ({
                    id: s.id,
                    title: s.title ?? '',
                    subtitle: s.subtitle ?? '',
                    display_order: s.display_order ?? 0,
                    image_url: s.image_url,
                    is_active: s.is_active,
                }))}
                onReorder={reorderSlides}
                onToggle={toggleSlide}
                onDelete={deleteSlide}
            />
        </div>
    );
}