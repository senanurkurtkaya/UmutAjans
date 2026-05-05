import { cache } from 'react';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { PRODUCT_MENU, type ProductMenuCategory } from '@/data/product-menu';

type CategoryRow = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  display_order: number;
  is_active: boolean;
};

type ItemRow = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  short_description: string | null;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
};

export type ProductMenuData = {
  categories: ProductMenuCategory[];
};

function fallbackFromLocal(): ProductMenuData {
  return { categories: PRODUCT_MENU };
}

/**
 * Server-side fetch for ProductMegaMenu (Navbar).
 * Falls back to local data if Supabase env/table isn't ready yet.
 */
export const getProductMenuData = cache(async (): Promise<ProductMenuData> => {
  try {
    const supabase = await createSupabaseServerClient();

    const [{ data: cats, error: catsErr }, { data: items, error: itemsErr }] =
      await Promise.all([
        supabase
          .from('product_menu_categories')
          .select('id,title,slug,description,display_order,is_active')
          .eq('is_active', true)
          .order('display_order', { ascending: true }),
        supabase
          .from('product_menu_items')
          .select(
            'id,category_id,name,slug,short_description,image_url,display_order,is_active'
          )
          .eq('is_active', true)
          .order('display_order', { ascending: true }),
      ]);

    if (catsErr || itemsErr || !cats?.length) return fallbackFromLocal();

    const categories = (cats as CategoryRow[]).map((c) => {
      const catItems = (items as ItemRow[] | null | undefined)?.filter(
        (i) => i.category_id === c.id
      );
      return {
        title: c.title,
        slug: c.slug,
        items: (catItems ?? [])
          .filter((i) => i.is_active)
          .sort((a, b) => a.display_order - b.display_order)
          .map((i) => ({
            name: i.name,
            slug: i.slug,
            shortDescription: i.short_description ?? '',
            imageUrl: i.image_url,
          })),
      } satisfies ProductMenuCategory;
    });

    return { categories };
  } catch {
    return fallbackFromLocal();
  }
});
