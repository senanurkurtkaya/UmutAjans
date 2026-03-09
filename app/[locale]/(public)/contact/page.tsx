import { getTranslations } from 'next-intl/server';
import { ContactForm } from '@/components/forms/contact-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { generateMetadataFromTranslations } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return generateMetadataFromTranslations({
    titleKey: 'metadata.contact.title',
    descriptionKey: 'metadata.contact.description',
    path: '/contact',
  });
}

export default async function ContactPage() {
  const t = await getTranslations('contact');

  return (
    <div className="py-20">
      <div className="container mx-auto max-w-7xl px-6">

        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">{t('title')}</h1>
          <p className="text-xl text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">

          <Card className="overflow-hidden">
            <CardHeader className="flex flex-col items-center p-6 pb-0 space-y-2 text-center">
              <Mail className="h-6 w-6 text-primary shrink-0" />
              <CardTitle className="text-lg">{t('email.title')}</CardTitle>
              <CardDescription className="text-sm">
                {t('email.description')}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 pt-3 text-center">
              <a
                href="mailto:info@umutajans.com"
                className="text-base text-primary hover:underline"
              >
                info@umutajans.com
              </a>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="flex flex-col items-center p-6 pb-0 space-y-2 text-center">
              <Phone className="h-6 w-6 text-primary shrink-0" />
              <CardTitle className="text-lg">{t('phone.title')}</CardTitle>
              <CardDescription className="text-sm">
                {t('phone.description')}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 pt-3 text-center">
              <a
                href="tel:+1234567890"
                className="text-base text-primary hover:underline"
              >
                +1 (234) 567-890
              </a>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="flex flex-col items-center p-6 pb-0 space-y-2 text-center">
              <MapPin className="h-6 w-6 text-primary shrink-0" />
              <CardTitle className="text-lg">{t('address.title')}</CardTitle>
              <CardDescription className="text-sm">
                {t('address.description')}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col items-center p-6 pt-3 space-y-3 text-center">
              <p className="text-sm text-muted-foreground">
                {t('address.street')}
              </p>

              <div className="relative h-40 w-full overflow-hidden rounded-lg bg-muted/20 ring-1 ring-border/50 shadow-inner">
                <iframe
                  title={t('address.title')}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.254643040779!2d32.850676!3d39.948823000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f9a84dd0d35%3A0xb8dc59a2d74c253b!2sUmut%20Ajans%20Reklam%20Ve%20Matbaa!5e1!3m2!1str!2str!4v1772845043933!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <a
                href="https://maps.app.goo.gl/kv9xH3qtC5157RfW6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/30 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
              >
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                {t('address.openInMap')}
              </a>
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