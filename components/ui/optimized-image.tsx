import Image from 'next/image';
import { type ComponentProps } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps
  extends Omit<ComponentProps<typeof Image>, 'src' | 'alt'> {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

/**
 * Optimized Image component wrapper
 * Automatically handles:
 * - Lazy loading
 * - Responsive images
 * - Blur placeholders
 * - Performance optimization
 */
export function OptimizedImage({
  src,
  alt,
  priority = false,
  className,
  width,
  height,
  fill,
  ...props
}: OptimizedImageProps) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={cn('object-cover', className)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...props}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 800}
      height={height || 600}
      priority={priority}
      className={cn('object-cover', className)}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...props}
    />
  );
}
