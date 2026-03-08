import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getBaseUrl } from '@/lib/api-base-url';
import { toggleServicePublish } from './action';
import PublishToggle from './components/PublishToggle';

export default async function AdminServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const base = await getBaseUrl();
  const res = await fetch(`${base}/api/services`, { cache: 'no-store' });
  const services = res.ok ? (await res.json()) : [];
  const t = await getTranslations({ locale, namespace: 'admin' });
  const tService = await getTranslations({ locale, namespace: 'servicesPage' });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">{t('services')}</h1>
        <Link
          href={`/${locale}/admin/services/new`}
          className="px-4 py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition shrink-0"
        >
          + {tService('newService')}
        </Link>
      </div>

      <div className="space-y-3">
        {services?.map((service: { id: string; title: string; published: boolean }) => (
          <div
            key={service.id}
            className="p-4 bg-[#0f1a2b] border border-white/10 rounded-xl flex flex-wrap justify-between items-center gap-4 hover:border-white/20 transition-colors shadow-xl"
          >
            <div className="flex flex-wrap items-center gap-4">
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
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-sm font-medium rounded-lg transition"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}