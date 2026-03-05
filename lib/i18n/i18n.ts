import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { AbstractIntlMessages } from 'next-intl'

export const locales = ['en', 'tr'] as const
export const defaultLocale = 'en'

export type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale =
    requested && locales.includes(requested as Locale)
      ? (requested as Locale)
      : requested === undefined
        ? defaultLocale
        : null
  if (locale === null) {
    notFound()
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default as AbstractIntlMessages
  }
})