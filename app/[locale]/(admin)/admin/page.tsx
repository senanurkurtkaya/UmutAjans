export const dynamic = 'force-dynamic';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { HeroSection } from '@/components/sections/hero-section';
import { StatsSection } from '@/components/sections/stats-section';
import { CTASection } from '@/components/sections/cta-section';

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const supabase = await createSupabaseServerClient();

  const { data: sections } = await supabase
    .from('homepage_sections')
    .select('*')
    .eq('is_active', true);

  const hero = sections?.find(s => s.section_key === 'hero');
  const stats = sections?.find(s => s.section_key === 'stats');
  const cta = sections?.find(s => s.section_key === 'cta');

  return (
    <>
      <HeroSection data={hero?.content} />
      <StatsSection data={stats?.content} />
      <CTASection data={cta?.content} />
    </>
  );
}