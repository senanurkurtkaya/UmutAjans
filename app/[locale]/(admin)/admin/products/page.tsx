import ProductsClient from './ProductsClient';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function ProductsPage() {
  const supabase = createSupabaseServerClient();

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-red-500 mt-4">DB Error: {error.message}</p>
      </div>
    );
  }

  return <ProductsClient products={products ?? []} />;
}