import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getBaseUrl } from '@/lib/api-base-url';

export default async function ServicesProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const base = await getBaseUrl();
  const res = await fetch(`${base}/api/products`, { cache: 'no-store' });
  const products = res.ok ? (await res.json()) : [];
  const t = await getTranslations('admin');
  const tAlerts = await getTranslations('adminAlerts');

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">
          {t('products')}
        </h1>
        <Link
          href={`/${locale}/admin/services/products/new`}
          className="px-4 py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition shrink-0"
        >
          + {tAlerts('newProduct')}
        </Link>
      </div>
      <div className="space-y-3">
        {products?.map((product: { id: string; title: string; image_url?: string }) => (
          <div
            key={product.id}
            className="flex items-center gap-4 p-4 bg-[#0f1a2b] border border-white/10 rounded-xl hover:border-white/20 transition-colors shadow-xl"
          >
            {product.image_url && (
              <img
                src={product.image_url}
                alt=""
                className="w-12 h-12 object-contain rounded-lg"
              />
            )}
            <span className="font-medium">{product.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
