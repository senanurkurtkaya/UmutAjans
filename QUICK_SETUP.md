# Quick Setup Commands

Copy and paste these commands in order to set up the project.

## Windows PowerShell Commands

```powershell
# 1. Create Next.js project with TypeScript and Tailwind
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes

# 2. Install all production dependencies
npm install next react react-dom next-themes next-intl framer-motion lucide-react class-variance-authority clsx tailwind-merge

# 3. Install all development dependencies
npm install --save-dev @types/node @types/react @types/react-dom typescript tailwindcss postcss autoprefixer tailwindcss-animate eslint eslint-config-next

# 4. Initialize shadcn/ui (interactive - follow prompts)
npx shadcn-ui@latest init

# 5. Add shadcn/ui components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card

# 6. Verify installation
npm list --depth=0

# 7. Start development server
npm run dev
```

## All-in-One Installation (Alternative)

If you want to install everything at once:

```powershell
# Install everything in one command
npm install next react react-dom next-themes next-intl framer-motion lucide-react class-variance-authority clsx tailwind-merge @types/node @types/react @types/react-dom typescript tailwindcss postcss autoprefixer tailwindcss-animate eslint eslint-config-next

# Then initialize shadcn/ui
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card
```

## Automated Setup

Run the PowerShell script:

```powershell
# Execute the setup script
.\setup.ps1
```

## Verification Commands

After installation, verify everything works:

```powershell
# Check TypeScript compilation
npm run type-check

# Check for linting errors
npm run lint

# Start development server
npm run dev
```

## Package Versions (Current)

- Next.js: ^14.2.0
- React: ^18.3.0
- TypeScript: ^5.3.0
- Tailwind CSS: ^3.4.0
- next-themes: ^0.2.1
- next-intl: ^3.5.0
- framer-motion: ^11.0.0
- lucide-react: ^0.344.0
