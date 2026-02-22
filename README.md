# Umut Ajans - Digital Marketing Agency Website

A production-ready digital marketing agency website built with Next.js 14, TypeScript, Tailwind CSS, and modern web technologies.

## 🚀 Features

- **Next.js 14 App Router** - Latest Next.js with App Router for optimal performance
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **shadcn/ui** - Beautiful, accessible UI components
- **Dark/Light Mode** - Seamless theme switching with next-themes
- **Framer Motion** - Smooth animations and transitions
- **SEO Optimized** - Comprehensive metadata and semantic HTML
- **Responsive Design** - Mobile-first, fully responsive layout
- **Clean Architecture** - Well-organized, scalable codebase

## 📦 Tech Stack

- **Framework:** Next.js 14.2.0
- **Language:** TypeScript 5.3.0
- **Styling:** Tailwind CSS 3.4.0
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion 11.0.0
- **Icons:** Lucide React 0.344.0
- **Theme:** next-themes 0.2.1

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd UmutAjans
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── services/          # Services page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components (Header, Footer)
│   ├── sections/         # Page sections
│   ├── forms/            # Form components
│   └── providers/        # Context providers
├── lib/                   # Utility functions
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## 🎨 Customization

### Colors

Edit the CSS variables in `app/globals.css` to customize the color scheme:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  /* ... other colors */
}
```

### Content

- Update page content in `app/*/page.tsx` files
- Modify section components in `components/sections/`
- Update metadata in each page's `metadata` export

## 🚀 Build for Production

```bash
npm run build
npm start
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🔧 Configuration

### Next.js

Configuration is in `next.config.js`. Adjust image optimization, redirects, and other settings as needed.

### Tailwind CSS

Tailwind configuration is in `tailwind.config.ts`. Customize the design system, colors, and utilities here.

### TypeScript

TypeScript configuration is in `tsconfig.json`. Path aliases are configured for `@/*` imports.

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or suggestions, please contact the development team.
