'use client';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

type Slide = {
  id: string;
  title: string;
  subtitle: string;
  display_order: number;
  image_url?: string;
  is_active?: boolean;
};

function SlideThumbnail({ src }: { src: string | undefined }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div
        className="w-32 h-20 rounded-lg bg-gradient-to-br from-primary/40 to-base-300 flex items-center justify-center text-white/50 text-xs"
        title="Görsel yok"
      >
        Görsel yok
      </div>
    );
  }
  return (
    <img
      src={src}
      alt="slide"
      className="w-32 h-20 object-cover rounded-lg"
      onError={() => setFailed(true)}
    />
  );
}

export function HeroSortableList({
  slides,
  onReorder,
  onToggle,
  onDelete,
}: {
  slides: Slide[];
  onReorder: (ids: string[]) => Promise<void>;
  onToggle: (formData: FormData) => Promise<void>;
  onDelete: (formData: FormData) => Promise<void>;
}) {
  const [items, setItems] = useState(slides);

  const sensors = useSensors(useSensor(PointerSensor));

  async function handleDragEnd(event: any) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);

    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);

    await onReorder(newItems.map((i) => i.id));
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {items.map((slide) => (
            <SortableItem key={slide.id} id={slide.id}>
              <div className="border border-white/10 p-4 rounded-xl flex flex-wrap justify-between items-center gap-4 bg-[#0f1a2b] text-white cursor-grab hover:border-white/20 transition-colors shadow-xl">

                <div>
                  <p className="font-bold text-lg">{slide.title}</p>
                  <p className="text-sm text-white/70">
                    Order: {slide.display_order}
                  </p>
                  <p className="text-xs text-white/50">
                    {slide.is_active ? 'Aktif' : 'Pasif'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <SlideThumbnail src={slide.image_url} />

                  <a
                    href={`?edit=${slide.id}`}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-sm font-medium rounded-lg transition"
                  >
                    Düzenle
                  </a>

                  <form action={onToggle} className="inline">
                    <input type="hidden" name="id" value={slide.id} />
                    <input
                      type="hidden"
                      name="current"
                      value={slide.is_active ? 'true' : 'false'}
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-sm font-medium rounded-lg transition"
                    >
                      Toggle
                    </button>
                  </form>

                  <form action={onDelete} className="inline">
                    <input type="hidden" name="id" value={slide.id} />
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-red-400 hover:bg-red-500/10 text-sm font-medium rounded-lg transition"
                    >
                      Sil
                    </button>
                  </form>
                </div>

              </div>
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableItem({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}