import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function HomePage() {
  const supabase = createSupabaseServerClient();

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      {/* content */}
    </div>
  );
}