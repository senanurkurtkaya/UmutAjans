# Umut Ajans - Automated Setup Script
# Run this script to set up the project from scratch

Write-Host "🚀 Starting Umut Ajans Setup..." -ForegroundColor Cyan

# Step 1: Create Next.js project (if not already created)
if (-not (Test-Path "package.json")) {
    Write-Host "`n📦 Step 1: Creating Next.js project..." -ForegroundColor Yellow
    npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
} else {
    Write-Host "`n✅ Next.js project already exists" -ForegroundColor Green
}

# Step 2: Install core dependencies
Write-Host "`n📦 Step 2: Installing core dependencies..." -ForegroundColor Yellow
npm install next@latest react@latest react-dom@latest

# Step 3: Install TypeScript types
Write-Host "`n📦 Step 3: Installing TypeScript types..." -ForegroundColor Yellow
npm install --save-dev @types/node @types/react @types/react-dom typescript

# Step 4: Install Tailwind CSS (if not already installed)
Write-Host "`n📦 Step 4: Installing Tailwind CSS..." -ForegroundColor Yellow
if (-not (Test-Path "tailwind.config.ts")) {
    npm install --save-dev tailwindcss postcss autoprefixer
    npx tailwindcss init -p --ts
} else {
    Write-Host "✅ Tailwind CSS already configured" -ForegroundColor Green
}

# Step 5: Install shadcn/ui dependencies
Write-Host "`n📦 Step 5: Installing shadcn/ui dependencies..." -ForegroundColor Yellow
npm install class-variance-authority clsx tailwind-merge
npm install --save-dev tailwindcss-animate

# Step 6: Install next-themes
Write-Host "`n📦 Step 6: Installing next-themes..." -ForegroundColor Yellow
npm install next-themes

# Step 7: Install next-intl
Write-Host "`n📦 Step 7: Installing next-intl..." -ForegroundColor Yellow
npm install next-intl

# Step 8: Install framer-motion and lucide-react
Write-Host "`n📦 Step 8: Installing framer-motion and lucide-react..." -ForegroundColor Yellow
npm install framer-motion lucide-react

# Step 9: Install ESLint
Write-Host "`n📦 Step 9: Installing ESLint..." -ForegroundColor Yellow
npm install --save-dev eslint eslint-config-next

# Step 10: Initialize shadcn/ui (interactive)
Write-Host "`n📦 Step 10: Initializing shadcn/ui..." -ForegroundColor Yellow
Write-Host "⚠️  This step requires manual interaction. Please follow the prompts:" -ForegroundColor Yellow
Write-Host "   - Use TypeScript: Yes" -ForegroundColor Gray
Write-Host "   - Style: Default" -ForegroundColor Gray
Write-Host "   - Base color: Slate" -ForegroundColor Gray
Write-Host "   - Global CSS: app/globals.css" -ForegroundColor Gray
Write-Host "   - Use CSS variables: Yes" -ForegroundColor Gray
Write-Host "   - Tailwind config: tailwind.config.ts" -ForegroundColor Gray
Write-Host "   - Components alias: @/components" -ForegroundColor Gray
Write-Host "   - Utils alias: @/lib/utils" -ForegroundColor Gray
npx shadcn-ui@latest init

# Step 11: Add shadcn/ui components
Write-Host "`n📦 Step 11: Adding shadcn/ui components..." -ForegroundColor Yellow
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card

Write-Host "`n✅ Setup complete!" -ForegroundColor Green
Write-Host "`n📝 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Configure i18n (i18n.ts, middleware.ts, messages/)" -ForegroundColor Gray
Write-Host "   2. Set up ThemeProvider component" -ForegroundColor Gray
Write-Host "   3. Create your project structure" -ForegroundColor Gray
Write-Host "   4. Run 'npm run dev' to start development" -ForegroundColor Gray
