# Internationalization (i18n) Implementation Guide

Complete implementation of next-intl for the Umut Ajans website with English and Turkish support.

## ✅ Implementation Complete

The website now supports:
- **English (en)** - Default locale
- **Turkish (tr)** - Secondary locale
- **URL-based routing** - `/en` and `/tr` routes
- **Server and Client Components** - Full compatibility
- **SEO Optimized** - Locale-specific metadata

## Architecture

### File Structure

```
├── i18n.ts                    # i18n configuration
├── middleware.ts              # Next.js middleware for locale detection
├── messages/
│   ├── en.json              # English translations
│   └── tr.json              # Turkish translations
├── lib/i18n/
│   ├── navigation.ts        # Locale-aware navigation utilities
│   ├── server.ts            # Server component helpers
│   └── client.ts            # Client component helpers
└── app/
    └── [locale]/            # Locale-based routes
        ├── layout.tsx        # Locale layout with metadata
        ├── page.tsx          # Home page
        ├── about/
        ├── services/
        └── contact/
```

## Configuration

### 1. i18n Configuration (`i18n.ts`)

```typescript
export const locales = ['en', 'tr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
```

### 2. Middleware (`middleware.ts`)

- Detects user locale from browser/headers
- Redirects to appropriate locale route
- Always shows locale prefix in URL (`localePrefix: 'always'`)

### 3. Next.js Config (`next.config.mjs`)

Uses `next-intl` plugin for automatic configuration.

## Usage

### Server Components

```tsx
import { getTranslations } from 'next-intl/server';
import { generateMetadata } from '@/lib/i18n/server';

// Get translations
export default async function Page() {
  const t = await getTranslations('nav');
  return <h1>{t('home')}</h1>;
}

// Generate metadata
export async function generateMetadata() {
  return generateMetadata('metadata.home.title', 'metadata.home.description');
}
```

### Client Components

```tsx
'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';

export function MyComponent() {
  const t = useTranslations('hero');
  
  return (
    <>
      <h1>{t('title')}</h1>
      <Link href="/about">{t('cta')}</Link>
    </>
  );
}
```

### Navigation

**Always use the locale-aware Link:**

```tsx
import { Link } from '@/lib/i18n/navigation';

// ✅ Correct - automatically includes locale
<Link href="/about">About</Link>

// ❌ Wrong - doesn't include locale
import Link from 'next/link';
<Link href="/about">About</Link>
```

### Language Switcher

The `LanguageSwitcher` component is already integrated in the Header:

```tsx
import { LanguageSwitcher } from '@/components/layout/language-switcher';

<LanguageSwitcher />
```

## Translation Keys

All translations are organized in namespaces:

- `nav.*` - Navigation items
- `hero.*` - Hero section
- `services.*` - Services section
- `stats.*` - Statistics
- `cta.*` - Call-to-action
- `about.*` - About page
- `contact.*` - Contact page
- `process.*` - Process section
- `footer.*` - Footer
- `metadata.*` - Page metadata

## Adding New Translations

### 1. Add to Message Files

**`messages/en.json`:**
```json
{
  "mySection": {
    "title": "My Title",
    "description": "My description"
  }
}
```

**`messages/tr.json`:**
```json
{
  "mySection": {
    "title": "Başlığım",
    "description": "Açıklamam"
  }
}
```

### 2. Use in Components

```tsx
const t = useTranslations('mySection');
<h1>{t('title')}</h1>
```

## Best Practices

### ✅ DO

- Always use `Link` from `@/lib/i18n/navigation`
- Use `useTranslations` hook in client components
- Use `getTranslations` in server components
- Organize translations by feature/page
- Keep translation keys descriptive

### ❌ DON'T

- Don't use `next/link` directly
- Don't hardcode locale in URLs
- Don't mix server and client translation methods
- Don't forget to add translations to all locales

## Testing

### Test Locale Switching

1. Visit `/en` - Should show English
2. Visit `/tr` - Should show Turkish
3. Use language switcher - Should switch locales
4. Check URLs - Should always include locale prefix

### Test SEO

1. Check page source - Should have correct `lang` attribute
2. Check metadata - Should be locale-specific
3. Check Open Graph tags - Should match locale

## Troubleshooting

### Locale Not Switching

- Check middleware is properly configured
- Verify `localePrefix` setting
- Check browser console for errors

### Translations Not Showing

- Verify message files exist
- Check translation keys match exactly
- Ensure namespace is correct

### Navigation Issues

- Always use `Link` from `@/lib/i18n/navigation`
- Don't manually add locale to URLs
- Check middleware matcher configuration

## Production Checklist

- [x] All pages translated
- [x] Metadata localized
- [x] Navigation works in both locales
- [x] Language switcher functional
- [x] SEO metadata correct
- [x] No hardcoded text
- [x] Server and client components work
- [x] Middleware configured correctly

## Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js App Router i18n](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
