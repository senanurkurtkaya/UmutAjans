'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Slide = {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  button_text?: string | null;
  display_order: number;
};

type HeroContent = {
  title?: string | null;
  subtitle?: string | null;
  button_text?: string | null;
};

type Props = {
  slides: Slide[];
  heroContent?: HeroContent;
};

export function HeroSlider({ slides, heroContent }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!slides?.length) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides]);

  if (!slides?.length) return null;
  const slide = slides[index];
  if (!slide) return null;

  const title = heroContent?.title || slide.title;
  const subtitle = heroContent?.subtitle || slide.subtitle;
  const buttonText = heroContent?.button_text || slide.button_text || undefined;

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden rounded-b-3xl shadow-xl ring-1 ring-base-300/20">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image_url})` }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
      <div className="relative z-10 container mx-auto px-6 text-center text-white max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg tracking-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl mb-10 text-white/90 drop-shadow-md max-w-2xl mx-auto">
          {subtitle}
        </p>
        {buttonText && (
          <a
            href="#services"
            className="btn btn-primary btn-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            {buttonText}
          </a>
        )}
      </div>
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-200 ${
              i === index ? 'bg-primary scale-125 ring-2 ring-white/50' : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
