import { getBaseUrl } from '@/lib/api-base-url';

export default async function ProductsPage() {
  const base = await getBaseUrl();
  const res = await fetch(`${base}/api/products`, { cache: 'no-store' });
  const products = res.ok ? (await res.json()) : [];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold">
        Products
      </h1>

      <div className="space-y-3">
        {products?.map((product: { id: string; title: string; image_url?: string }) => (
          <div
            key={product.id}
            className="flex items-center gap-4 p-4 bg-[#0f1a2b] border border-white/10 rounded-xl hover:border-white/20 transition-colors shadow-xl"
          >
            <img
              src={product.image_url}
              alt=""
              className="w-12 h-12 object-contain rounded-lg"
            />
            <span className="font-medium">{product.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}