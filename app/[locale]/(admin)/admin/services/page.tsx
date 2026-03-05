import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { toggleServicePublish } from './action';
import PublishToggle from './components/PublishToggle';

export default async function AdminServicesPage({
  params,
}: {
  params: { locale: string };
}) {
  const supabase = createSupabaseServerClient();
  const t = await getTranslations({ locale: params.locale, namespace: 'admin' });
  const tService = await getTranslations({ locale: params.locale, namespace: 'servicesPage' });

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="container py-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('services')}</h1>
        <Link
          href={`/${params.locale}/admin/services/new`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + {tService('newService')}
        </Link>
      </div>

            <div className="space-y-4">
                {services?.map((service) => (
                    <div
                        key={service.id}
                        className="p-4 border rounded-lg flex justify-between items-center"
                    >
                        <div>
                            <h2 className="font-semibold">{service.title}</h2>
                            <form
                                action={toggleServicePublish.bind(
                                    null,
                                    service.id,
                                    service.published
                                )}
                            >
                                <PublishToggle published={service.published} />
                            </form>
                        </div>

                        <Link
                            href={`/en/admin/services/${service.id}`}
                            className="px-3 py-1 bg-yellow-500 text-black rounded"
                        >
                            Edit
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}