/**
 * Theme initialization script to prevent flash of unstyled content (FOUC)
 * This script runs before React hydrates to apply the theme immediately
 * 
 * This prevents the flash of light theme when the user has dark theme selected
 */
export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const storageKey = 'umut-ajans-theme';
            
            const getTheme = () => {
              try {
                const stored = localStorage.getItem(storageKey);
                if (stored === 'dark' || stored === 'light') {
                  return stored;
                }
                // Check system preference
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  return 'dark';
                }
                return 'light';
              } catch (e) {
                return 'light';
              }
            };
            
            const theme = getTheme();
            const root = document.documentElement;
            
            // Apply theme immediately before React hydrates
            if (theme === 'dark') {
              root.classList.add('dark');
            } else {
              root.classList.remove('dark');
            }
            
            // Mark theme as loaded to enable transitions after hydration
            root.setAttribute('data-theme-loaded', 'true');
          })();
        `,
      }}
    />
  );
}
