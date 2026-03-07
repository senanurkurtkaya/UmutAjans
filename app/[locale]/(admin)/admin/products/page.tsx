import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function ProductsPage() {

  const supabase = await createSupabaseServerClient();

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold">
        Products
      </h1>

      <div className="space-y-3">
        {products?.map((product) => (
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