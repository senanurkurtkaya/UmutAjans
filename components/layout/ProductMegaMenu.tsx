"use client";

import * as React from 'react';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';
import type { ProductMenuCategory, ProductMenuItem } from '@/data/product-menu';

type ProductMegaMenuProps = {
  label: string;
  isActive?: boolean;
  className?: string;
  categories: ProductMenuCategory[];
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? '';
  const second = parts[1]?.[0] ?? '';
  return (first + second).toUpperCase();
}

function Placeholder({ name }: { name: string }) {
  return (
    <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-base-300/70 bg-base-100">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 opacity-[0.95]" />
      <div className="absolute inset-0 bg-grid-pattern text-white/10" />
      <div className="relative h-full p-5 flex flex-col justify-between">
        <div className="text-xs font-semibold tracking-wide text-white/70">
          ÖNİZLEME
        </div>
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <div className="text-lg font-bold text-white line-clamp-2">{name}</div>
            <div className="mt-2 h-2 w-28 rounded-full bg-white/15" />
            <div className="mt-2 h-2 w-44 rounded-full bg-white/10" />
          </div>
          <div className="h-11 w-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white font-extrabold">
            {initials(name) || name[0]?.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewCard({ product }: { product: ProductMenuItem }) {
  const href = `/urunler/${product.slug}`;

  return (
    <div className="flex flex-col gap-4">
      {product.imageUrl ? (
        <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-base-300/70 bg-base-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
        </div>
      ) : (
        <Placeholder name={product.name} />
      )}

      <div className="space-y-2">
        <div className="text-sm font-semibold text-base-content/70">Seçili ürün</div>
        <div className="text-xl font-bold text-slate-900 dark:text-slate-50">
          {product.name}
        </div>
        <p className="text-sm text-base-content/70 leading-relaxed">
          {product.shortDescription}
        </p>
        <Link href={href} className="btn btn-primary btn-sm rounded-xl w-fit">
          Detayları Gör
        </Link>
      </div>
    </div>
  );
}

export function ProductMegaMenu({ label, isActive, className, categories }: ProductMegaMenuProps) {
  const allItems = React.useMemo(() => categories.flatMap((c) => c.items), [categories]);
  const [open, setOpen] = React.useState(false);
  const [activeProduct, setActiveProduct] = React.useState<ProductMenuItem | null>(
    allItems[0] ?? null
  );

  React.useEffect(() => {
    if (!activeProduct && allItems[0]) setActiveProduct(allItems[0]);
  }, [activeProduct, allItems]);

  const close = React.useCallback(() => setOpen(false), []);
  const openMenu = React.useCallback(() => setOpen(true), []);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, close]);

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={openMenu}
      onMouseLeave={close}
    >
      <Link
        href="/urunler"
        className={cn(
          'rounded-xl font-medium transition-colors',
          isActive
            ? 'bg-primary text-primary-content shadow-sm'
            : 'hover:bg-base-200/80 text-base-content'
        )}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {label}
      </Link>

      <div
        className={cn(
          'absolute left-1/2 top-full -translate-x-1/2 pt-4',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
          'transition-opacity duration-150'
        )}
      >
        <div className="w-[980px] rounded-2xl border border-base-300/80 bg-base-100 shadow-xl shadow-base-content/5 overflow-hidden">
          <div className="grid grid-cols-12">
            <div className="col-span-8 p-6 bg-gradient-to-br from-base-100 to-base-200/30">
              <div className="grid grid-cols-3 gap-6">
                {categories.map((cat) => (
                  <div key={cat.slug} className="min-w-0">
                    <div className="text-xs font-extrabold tracking-widest text-slate-900/80 dark:text-slate-50/80">
                      {cat.title}
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {cat.items.map((item) => {
                        const active = item.slug === activeProduct?.slug;
                        return (
                          <li key={item.slug}>
                            <Link
                              href={`/urunler/${item.slug}`}
                              onMouseEnter={() => setActiveProduct(item)}
                              className={cn(
                                'block rounded-xl px-3 py-2 text-sm transition-colors',
                                active
                                  ? 'bg-slate-900 text-white'
                                  : 'hover:bg-base-200/70 text-base-content'
                              )}
                            >
                              {item.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-4 p-6 border-l border-base-300/80 bg-base-100">
              {activeProduct ? (
                <PreviewCard product={activeProduct} />
              ) : (
                <div className="text-sm text-base-content/70">Ürün bulunamadı.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

