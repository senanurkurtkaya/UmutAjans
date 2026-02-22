# Production-Ready SEO Implementation

Complete SEO system for Next.js App Router with internationalization support.

## ✅ Features Implemented

- ✅ **Metadata API** - Full Next.js 14 Metadata API integration
- ✅ **generateMetadata()** - Dynamic metadata generation for all pages
- ✅ **OpenGraph Tags** - Complete OpenGraph implementation
- ✅ **Twitter Cards** - Twitter Card metadata
- ✅ **Canonical URLs** - Proper canonical URLs with i18n support
- ✅ **Sitemap** - Dynamic sitemap generation
- ✅ **Robots.txt** - Search engine directives
- ✅ **Structured Data** - JSON-LD schema markup
- ✅ **i18n Support** - Full locale-aware SEO

## Architecture

### File Structure

```
├── lib/seo/
│   ├── config.ts              # SEO configuration
│   ├── metadata.ts            # Metadata generation utilities
│   └── structured-data.ts     # JSON-LD schema generators
├── components/seo/
│   └── structured-data.tsx    # Structured data component
├── app/
│   ├── sitemap.ts            # Dynamic sitemap
│   └── robots.ts             # Robots.txt
└── app/[locale]/
    └── [pages]/              # Pages with generateMetadata()
```

## Configuration

### SEO Config (`lib/seo/config.ts`)

Centralized configuration:

```typescript
export const siteConfig = {
  name: 'Umut Ajans',
  description: '...',
  url: 'https://umutajans.com',
  ogImage: '/og-image.jpg',
  twitterHandle: '@umutajans',
  // ...
};
```

## Usage

### Basic Page Metadata

```tsx
import { generateMetadataFromTranslations } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generateMetadataFromTranslations({
    titleKey: 'metadata.about.title',
    descriptionKey: 'metadata.about.description',
    path: '/about',
    locale: locale as Locale,
  });
}
```

### Advanced Metadata

```tsx
import { generateSEOMetadata } from '@/lib/seo/metadata';

export async function generateMetadata() {
  return generateSEOMetadata({
    title: 'Custom Page Title',
    description: 'Page description',
    path: '/custom-page',
    locale: 'en',
    keywords: ['custom', 'keywords'],
    image: '/custom-og-image.jpg',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00Z',
  });
}
```

### Structured Data

```tsx
import { StructuredData } from '@/components/seo/structured-data';

// In your page component
<StructuredData locale="en" type="organization" />
<StructuredData locale="en" type="website" />

// Breadcrumbs
<StructuredData
  locale="en"
  type="breadcrumb"
  breadcrumbItems={[
    { name: 'Home', url: '/en' },
    { name: 'About', url: '/en/about' },
  ]}
/>
```

## Generated Metadata

Each page automatically includes:

### Basic Metadata
- Title (with template)
- Description
- Keywords
- Authors
- Canonical URL
- Language alternates

### OpenGraph
- Type (website/article)
- Locale
- URL
- Site name
- Title
- Description
- Images (1200x630)
- Published/Modified time (for articles)

### Twitter Card
- Card type (summary_large_image)
- Site handle
- Creator handle
- Title
- Description
- Images

### Robots
- Index/Noindex
- Follow/Nofollow
- Googlebot-specific rules

## Sitemap

Automatically generated at `/sitemap.xml`:

- All locales (en, tr)
- All routes
- Change frequency
- Priority
- Last modified dates
- Language alternates

## Robots.txt

Automatically generated at `/robots.txt`:

- Allows all user agents
- Disallows API routes, Next.js internals
- Googlebot-specific rules
- Sitemap reference

## Structured Data

### Organization Schema
- Company name
- URL
- Description
- Contact information
- Social profiles

### Website Schema
- Site name
- URL
- Search action
- Description

### Breadcrumb Schema
- Navigation hierarchy
- Position indicators

## Canonical URLs

All pages include proper canonical URLs:

```html
<link rel="canonical" href="https://umutajans.com/en/about" />
```

With language alternates:

```html
<link rel="alternate" hreflang="en" href="https://umutajans.com/en/about" />
<link rel="alternate" hreflang="tr" href="https://umutajans.com/tr/about" />
<link rel="alternate" hreflang="x-default" href="https://umutajans.com/en/about" />
```

## Testing

### Verify Metadata

1. **View Page Source**
   - Check `<head>` for metadata tags
   - Verify canonical URLs
   - Check OpenGraph tags

2. **Open Graph Debugger**
   - Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - Test URL: `https://umutajans.com/en`

3. **Twitter Card Validator**
   - Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - Test URL: `https://umutajans.com/en`

4. **Google Rich Results Test**
   - Use [Rich Results Test](https://search.google.com/test/rich-results)
   - Test structured data

5. **Sitemap**
   - Visit: `https://umutajans.com/sitemap.xml`
   - Verify all pages included

6. **Robots.txt**
   - Visit: `https://umutajans.com/robots.txt`
   - Verify rules

## Best Practices

### ✅ DO

- Always use `generateMetadata()` for dynamic metadata
- Include canonical URLs
- Add structured data for better rich snippets
- Use locale-specific metadata
- Keep descriptions under 160 characters
- Use high-quality OG images (1200x630px)
- Update sitemap regularly

### ❌ DON'T

- Don't hardcode metadata
- Don't forget canonical URLs
- Don't duplicate content across locales
- Don't use generic descriptions
- Don't forget hreflang tags
- Don't skip structured data

## Customization

### Update Site Config

Edit `lib/seo/config.ts`:

```typescript
export const siteConfig = {
  name: 'Your Company',
  url: 'https://yoursite.com',
  // ...
};
```

### Add Custom Keywords

```typescript
const customKeywords = ['your', 'custom', 'keywords'];
return generateSEOMetadata({
  // ...
  keywords: customKeywords,
});
```

### Custom OG Images

```typescript
return generateSEOMetadata({
  // ...
  image: '/custom-og-image.jpg',
});
```

## Production Checklist

- [x] All pages have generateMetadata()
- [x] Canonical URLs configured
- [x] OpenGraph tags present
- [x] Twitter Cards configured
- [x] Sitemap generated
- [x] Robots.txt configured
- [x] Structured data added
- [x] i18n support implemented
- [x] OG images optimized
- [x] Meta descriptions optimized
- [x] Keywords relevant

## Resources

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards)
- [Schema.org](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
