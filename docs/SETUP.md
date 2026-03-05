# Step-by-Step Setup Guide

Follow these commands in order to set up the Umut Ajans project from scratch.

## Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

## Step 1: Create Next.js Project with App Router and TypeScript

```powershell
# Create Next.js project with TypeScript and App Router
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
```

Or if you prefer to create in a new directory:

```powershell
npx create-next-app@latest umut-ajans --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
cd umut-ajans
```

## Step 2: Install Core Dependencies

```powershell
# Install React and Next.js dependencies (usually already included)
npm install next@latest react@latest react-dom@latest

# Install TypeScript types
npm install --save-dev @types/node @types/react @types/react-dom typescript
```

## Step 3: Install and Configure Tailwind CSS

```powershell
# Install Tailwind CSS and dependencies
npm install --save-dev tailwindcss postcss autoprefixer

# Initialize Tailwind config (if not done by create-next-app)
npx tailwindcss init -p --ts
```

The `create-next-app` command with `--tailwind` flag should already set this up, but verify your `tailwind.config.ts` and `postcss.config.js` files exist.

## Step 4: Install and Configure shadcn/ui

```powershell
# Install shadcn/ui dependencies
npm install class-variance-authority clsx tailwind-merge

# Install tailwindcss-animate for animations
npm install --save-dev tailwindcss-animate

# Initialize shadcn/ui (interactive - follow prompts)
npx shadcn-ui@latest init
```

When prompted:
- Would you like to use TypeScript? **Yes**
- Which style would you like to use? **Default**
- Which color would you like to use as base color? **Slate**
- Where is your global CSS file? **app/globals.css**
- Would you like to use CSS variables for colors? **Yes**
- Where is your tailwind.config.js located? **tailwind.config.ts**
- Configure the import alias for components? **@/components**
- Configure the import alias for utils? **@/lib/utils**

Then add components as needed:

```powershell
# Add shadcn/ui components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
```

## Step 5: Install next-themes

```powershell
# Install next-themes for dark/light mode
npm install next-themes
```

## Step 6: Install next-intl

```powershell
# Install next-intl for internationalization
npm install next-intl
```

## Step 7: Install framer-motion and lucide-react

```powershell
# Install animation library
npm install framer-motion

# Install icon library
npm install lucide-react
```

## Step 8: Install Additional Development Dependencies

```powershell
# Install ESLint (usually included with create-next-app)
npm install --save-dev eslint eslint-config-next
```

## Step 9: Verify Installation

```powershell
# Check installed packages
npm list --depth=0

# Run type checking
npm run type-check

# Start development server
npm run dev
```

## Complete Installation Command (All at Once)

If you prefer to install everything in one go:

```powershell
# Install all production dependencies
npm install next react react-dom next-themes next-intl framer-motion lucide-react class-variance-authority clsx tailwind-merge

# Install all development dependencies
npm install --save-dev @types/node @types/react @types/react-dom typescript tailwindcss postcss autoprefixer tailwindcss-animate eslint eslint-config-next
```

## Post-Installation Configuration

After installation, you'll need to:

1. **Configure next-intl**: Set up `i18n.ts`, `middleware.ts`, and message files
2. **Configure next-themes**: Create a ThemeProvider component
3. **Set up Tailwind**: Ensure `globals.css` has Tailwind directives
4. **Configure TypeScript**: Verify `tsconfig.json` paths are set correctly
5. **Set up project structure**: Create folders for components, lib, etc.

## Quick Start Script

You can also create a `setup.ps1` script to automate the process (see `setup.ps1` file).
