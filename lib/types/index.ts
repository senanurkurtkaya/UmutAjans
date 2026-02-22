/**
 * Shared TypeScript type definitions
 */

import { type Locale } from '@/i18n';

/**
 * Page params with locale
 */
export interface PageParams {
  locale: Locale;
}

/**
 * Async page params (Next.js 15+)
 */
export interface AsyncPageParams {
  params: Promise<PageParams>;
}

/**
 * Form submission status
 */
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

/**
 * API response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Pagination params
 */
export interface PaginationParams {
  page: number;
  limit: number;
  total?: number;
}
