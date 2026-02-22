# Dark/Light Theme System Documentation

This project implements a complete, production-ready dark/light theme system using next-themes, Tailwind CSS, and shadcn/ui design tokens.

## Features

✅ **Zero Flicker** - No flash of unstyled content (FOUC) on page load  
✅ **System Theme Detection** - Automatically detects and follows system preferences  
✅ **Smooth Transitions** - Elegant theme switching with CSS transitions  
✅ **Persistent Storage** - Theme preference saved in localStorage  
✅ **Proper Hydration** - No hydration mismatches between server and client  
✅ **Accessible** - Full keyboard navigation and screen reader support  

## Architecture

### Components

1. **ThemeProvider** (`components/providers/theme-provider.tsx`)
   - Wraps the app with next-themes provider
   - Configures theme storage and system detection
   - Handles theme persistence

2. **ThemeProviderClient** (`components/providers/theme-provider-client.tsx`)
   - Client-side component that syncs theme after hydration
   - Enables smooth transitions after initial load
   - Prevents layout shifts

3. **ThemeScript** (`components/scripts/theme-script.tsx`)
   - Inline script that runs before React hydrates
   - Applies theme immediately to prevent flicker
   - Reads from localStorage and system preferences

4. **ThemeToggle** (`components/ui/theme-toggle.tsx`)
   - Dropdown menu with Light/Dark/System options
   - Properly handles hydration to prevent mismatches
   - Accessible and keyboard navigable

### Configuration

#### Tailwind CSS (`tailwind.config.ts`)

```typescript
darkMode: ['class']  // Uses class-based dark mode
```

The `dark` class is applied to the `<html>` element when dark theme is active.

#### CSS Variables (`app/globals.css`)

All colors are defined as CSS variables using HSL format:

```css
:root {
  --background: 0 0% 100%;  /* Light theme */
  --foreground: 222.2 84% 4.9%;
  /* ... */
}

.dark {
  --background: 222.2 84% 4.9%;  /* Dark theme */
  --foreground: 210 40% 98%;
  /* ... */
}
```

#### Layout Integration (`app/[locale]/layout.tsx`)

```tsx
<html lang={locale} suppressHydrationWarning>
  <head>
    <ThemeScript />  {/* Prevents flicker */}
  </head>
  <body>
    <ThemeProvider>
      {/* App content */}
    </ThemeProvider>
  </body>
</html>
```

## How It Works

### 1. Initial Load (No Flicker)

1. **ThemeScript** runs immediately (before React)
   - Reads theme from localStorage or system preference
   - Applies `dark` class to `<html>` if needed
   - Sets `data-theme-loaded` attribute

2. **React Hydrates**
   - ThemeProvider initializes with the same theme
   - No mismatch = no flicker

3. **ThemeProviderClient** runs
   - Enables transitions after hydration
   - Syncs theme state

### 2. Theme Switching

1. User clicks ThemeToggle
2. `setTheme()` updates next-themes state
3. `dark` class is toggled on `<html>`
4. CSS variables update automatically
5. Smooth transition via CSS

### 3. Persistence

- Theme preference saved to localStorage (`umut-ajans-theme`)
- Persists across page reloads
- Works with system theme changes

## Usage

### Using Theme in Components

```tsx
'use client';

import { useTheme } from 'next-themes';

export function MyComponent() {
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  
  return (
    <div>
      <p>Current theme: {currentTheme}</p>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  );
}
```

### Using Theme Colors

All components automatically use theme colors via Tailwind classes:

```tsx
<div className="bg-background text-foreground">
  <p className="text-primary">Primary text</p>
  <button className="bg-primary text-primary-foreground">
    Button
  </button>
</div>
```

### Available Color Tokens

- `background` / `foreground` - Main background and text
- `card` / `card-foreground` - Card backgrounds
- `primary` / `primary-foreground` - Primary brand colors
- `secondary` / `secondary-foreground` - Secondary colors
- `muted` / `muted-foreground` - Muted/subtle colors
- `accent` / `accent-foreground` - Accent colors
- `destructive` / `destructive-foreground` - Error/danger colors
- `border` - Border colors
- `input` - Input border colors
- `ring` - Focus ring colors

## Customization

### Changing Theme Colors

Edit `app/globals.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;  /* Change HSL values */
}

.dark {
  --primary: 217.2 91.2% 59.8%;
}
```

### Changing Storage Key

Update in `components/providers/theme-provider.tsx`:

```tsx
storageKey="your-custom-key"
```

And in `components/scripts/theme-script.tsx`:

```tsx
const storageKey = 'your-custom-key';
```

### Disabling System Theme

In `components/providers/theme-provider.tsx`:

```tsx
<NextThemesProvider
  enableSystem={false}  // Disable system detection
  defaultTheme="light"  // Set default
>
```

## Troubleshooting

### Flicker on Page Load

- ✅ Ensure `ThemeScript` is in `<head>` before body
- ✅ Check that `suppressHydrationWarning` is on `<html>`
- ✅ Verify localStorage key matches in both files

### Theme Not Persisting

- ✅ Check browser localStorage is enabled
- ✅ Verify storage key is consistent
- ✅ Check for localStorage errors in console

### Hydration Mismatch

- ✅ Use `suppressHydrationWarning` on `<html>`
- ✅ Don't access `theme` before `mounted` state
- ✅ Use `ThemeToggle` component which handles this

### Transitions Not Working

- ✅ Ensure `data-theme-loaded` is set after hydration
- ✅ Check CSS transition properties in `globals.css`
- ✅ Verify `disableTransitionOnChange` is `false`

## Best Practices

1. **Always use CSS variables** - Never hardcode colors
2. **Use Tailwind classes** - `bg-background` not `bg-white`
3. **Handle hydration** - Check `mounted` before using theme
4. **Test both themes** - Ensure UI works in light and dark
5. **Accessibility** - Maintain contrast ratios in both themes

## Testing

```bash
# Test theme switching
npm run dev

# Check for console errors
# Verify no flicker on page load
# Test localStorage persistence
# Test system theme detection
```

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

Requires:
- localStorage support
- CSS custom properties (CSS variables)
- classList API
