import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getBaseUrl } from '@/lib/api-base-url'

export default async function AdminServiceCardsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const base = await getBaseUrl()
  const res = await fetch(`${base}/api/service-cards`, { cache: 'no-store' })
  const cards = res.ok ? (await res.json()) : []
  const t = await getTranslations('admin')

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">
          {t('serviceCards')}
        </h1>

        <Link
          href={`/${locale}/admin/service-cards/new`}
          className="px-4 py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition shrink-0"
        >
          + {t('newCard')}
        </Link>
      </div>

      <div className="space-y-3">
        {cards?.map((card: { id: string; title: string; image_url: string }) => (
          <div
            key={card.id}
            className="flex items-center justify-between p-4 bg-[#0f1a2b] border border-white/10 rounded-xl hover:border-white/20 transition-colors shadow-xl"
          >
            <div className="flex items-center gap-4">
              <img
                src={card.image_url}
                alt=""
                className="w-16 h-16 object-cover rounded-lg"
              />
              <h2 className="font-semibold">{card.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}