import { getBaseUrl } from '@/lib/api-base-url';
import { Link } from '@/lib/i18n/navigation';
import { ProductMenuItemsTable } from './components/ProductMenuItemsTable';

type Item = {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  is_active: boolean;
  display_order: number;
  category?: { title: string } | null;
};

export default async function ProductMenuAdminPage() {
  const base = await getBaseUrl();
  const res = await fetch(`${base}/api/product-menu/items`, { cache: 'no-store' });
  const items: Item[] = res.ok ? await res.json() : [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Ürün Menüsü</h1>
        <div className="flex gap-2">
          <Link href="/admin/product-menu/categories" className="btn btn-ghost btn-sm">
            Kategoriler
          </Link>
          <Link href="/admin/product-menu/new" className="btn btn-primary btn-sm">
            Yeni Ürün
          </Link>
        </div>
      </div>

      <ProductMenuItemsTable initialItems={items} />
    </div>
  );
}

