/**
 * Validation utilities for runtime type checking and validation
 */

import { type Locale, locales } from '@/i18n';

/**
 * Type guard to check if a string is a valid locale
 */
export function isValidLocale(value: unknown): value is Locale {
  return typeof value === 'string' && locales.includes(value as Locale);
}

/**
 * Safely cast a string to Locale, throwing if invalid
 */
export function assertLocale(value: unknown): Locale {
  if (!isValidLocale(value)) {
    throw new Error(`Invalid locale: ${value}. Expected one of: ${locales.join(', ')}`);
  }
  return value;
}

/**
 * Safely cast a string to Locale, returning default if invalid
 */
export function toLocale(value: unknown, defaultValue: Locale = 'en'): Locale {
  return isValidLocale(value) ? value : defaultValue;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format (basic validation)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

/**
 * Validate required string (not empty after trim)
 */
export function isRequired(value: string): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}
