import { getTranslations } from 'next-intl/server';
import { generateMetadataFromTranslations } from '@/lib/seo/metadata';
import { Card, CardContent } from '@/components/ui/card';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return generateMetadataFromTranslations({
    titleKey: 'metadata.references.title',
    descriptionKey: 'metadata.references.description',
    path: '/referanslar',
  });
}

type Reference = {
  name: string;
  location?: string;
  tags?: string[];
};

const REFERENCES: Reference[] = [
  { name: 'Marka 1', location: 'İstanbul', tags: ['Baskı', 'Kurumsal Kimlik'] },
  { name: 'Marka 2', location: 'Ankara', tags: ['Ambalaj', 'Kutu'] },
  { name: 'Marka 3', location: 'İzmir', tags: ['Promosyon', 'Etiket'] },
  { name: 'Marka 4', location: 'Bursa', tags: ['Katalog', 'Dergi'] },
  { name: 'Marka 5', location: 'Antalya', tags: ['Tabela', 'Outdoor'] },
  { name: 'Marka 6', location: 'Kocaeli', tags: ['Sticker', 'Etiket'] },
];

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');
}

export default async function ReferencesPage() {
  const t = await getTranslations('references');

  return (
    <div className="py-20">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">{t('title')}</h1>
          <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REFERENCES.map((ref) => (
            <Card
              key={ref.name}
              className="rounded-2xl border-base-300/80 bg-base-100 hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    {getInitials(ref.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="font-semibold text-lg truncate">{ref.name}</h2>
                      {ref.location ? (
                        <span className="text-xs text-base-content/60 shrink-0">
                          {ref.location}
                        </span>
                      ) : null}
                    </div>

                    {ref.tags?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {ref.tags.map((tag) => (
                          <span
                            key={tag}
                            className="badge badge-ghost border-base-300/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

