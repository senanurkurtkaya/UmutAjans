'use client';

import { useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import React from 'react';

/**
 * Client-side component to mark theme as loaded after hydration
 * This enables smooth transitions after the initial page load
 */
export const ThemeProviderClient = React.memo(function ThemeProviderClient() {
  const { theme, systemTheme } = useTheme();

  // Mark theme as loaded after React hydrates
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme-loaded', 'true');
  }, []);

  // Sync theme changes - memoized to prevent unnecessary re-renders
  const syncTheme = useCallback(() => {
    const root = document.documentElement;
    const currentTheme = theme === 'system' ? systemTheme : theme;
    
    if (currentTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme, systemTheme]);

  useEffect(() => {
    syncTheme();
  }, [syncTheme]);

  return null;
});
