import { getTranslations } from 'next-intl/server';
import { ContactForm } from '@/components/forms/contact-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { generateMetadataFromTranslations } from '@/lib/seo/metadata';
import { toLocale } from '@/lib/utils/validation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generateMetadataFromTranslations({
    titleKey: 'metadata.contact.title',
    descriptionKey: 'metadata.contact.description',
    path: '/contact',
    locale: toLocale(locale),
  });
}

export default async function ContactPage() {
  const t = await getTranslations('contact');

  return (
    <div className="py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">{t('title')}</h1>
          <p className="text-xl text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <Mail className="h-8 w-8 text-primary mb-4" />
              <CardTitle>{t('email.title')}</CardTitle>
              <CardDescription>{t('email.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href="mailto:info@umutajans.com"
                className="text-primary hover:underline"
              >
                info@umutajans.com
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Phone className="h-8 w-8 text-primary mb-4" />
              <CardTitle>{t('phone.title')}</CardTitle>
              <CardDescription>{t('phone.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href="tel:+1234567890"
                className="text-primary hover:underline"
              >
                +1 (234) 567-890
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MapPin className="h-8 w-8 text-primary mb-4" />
              <CardTitle>{t('address.title')}</CardTitle>
              <CardDescription>{t('address.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">123 Business Street, City, Country</p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
