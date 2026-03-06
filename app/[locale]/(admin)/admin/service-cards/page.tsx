import { createSupabaseServerClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminServiceCardsPage({ params }: any) {

  const supabase = createSupabaseServerClient()

  const { data: cards } = await supabase
    .from('service_cards')
    .select('*')
    .order('created_at', { ascending:false })

  return (

    <div className="container py-20">

      <div className="flex justify-between mb-10">

        <h1 className="text-3xl font-bold">
          Service Cards
        </h1>

        <Link
          href={`/${params.locale}/admin/service-cards/new`}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Yeni Kart
        </Link>

      </div>

      <div className="space-y-4">

        {cards?.map(card => (

          <div
            key={card.id}
            className="flex items-center justify-between border p-4 rounded-lg"
          >

            <div className="flex items-center gap-4">

              <img
                src={card.image_url}
                className="w-16 h-16 object-cover rounded"
              />

              <h2>{card.title}</h2>

            </div>

          </div>

        ))}

      </div>

    </div>

  )
}