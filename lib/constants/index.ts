/**
 * Application constants
 * Centralized constants for better maintainability
 */

export const APP_CONFIG = {
  name: 'Umut Ajans',
  description: 'Professional digital marketing agency',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://umutajans.com',
  contact: {
    email: 'info@umutajans.com',
    phone: '+1 (234) 567-890',
    address: '123 Business Street, City, Country',
  },
  social: {
    facebook: 'https://facebook.com/umutajans',
    twitter: 'https://twitter.com/umutajans',
    instagram: 'https://instagram.com/umutajans',
    linkedin: 'https://linkedin.com/company/umutajans',
  },
} as const;

export const ROUTES = {
  home: '/',
  about: '/about',
  services: '/services',
  contact: '/contact',
} as const;

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;
