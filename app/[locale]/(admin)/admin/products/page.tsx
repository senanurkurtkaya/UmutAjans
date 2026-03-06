import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function ProductsPage() {

  const supabase = await createSupabaseServerClient();

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">
        Products
      </h1>

      <div className="space-y-4">

        {products?.map((product) => (

          <div
            key={product.id}
            className="flex items-center gap-4 border p-4 rounded"
          >

            <img
              src={product.image_url}
              className="w-12 h-12 object-contain"
            />

            <span>{product.title}</span>

          </div>

        ))}

      </div>

    </div>
  );
}