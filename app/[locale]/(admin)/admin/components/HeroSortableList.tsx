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
        <div className="space-y-4">
          {items.map((slide) => (
            <SortableItem key={slide.id} id={slide.id}>
              <div className="border p-4 rounded flex justify-between items-center bg-zinc-900 text-white cursor-grab">

                <div>
                  <p className="font-bold text-lg">{slide.title}</p>
                  <p className="text-sm opacity-70">
                    Order: {slide.display_order}
                  </p>
                  <p className="text-xs">
                    {slide.is_active ? 'Aktif' : 'Pasif'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {slide.image_url && (
                    <img
                      src={slide.image_url}
                      alt="slide"
                      className="w-32 h-20 object-cover rounded"
                    />
                  )}

                  <a
                    href={`?edit=${slide.id}`}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Düzenle
                  </a>

                  <form action={onToggle}>
                    <input type="hidden" name="id" value={slide.id} />
                    <input
                      type="hidden"
                      name="current"
                      value={slide.is_active ? 'true' : 'false'}
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                      Toggle
                    </button>
                  </form>

                  <form action={onDelete}>
                    <input type="hidden" name="id" value={slide.id} />
                    <button
                      type="submit"
                      className="px-3 py-1 bg-red-600 text-white rounded"
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