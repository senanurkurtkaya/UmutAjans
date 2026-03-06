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
  const prevSlide = () =>
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden rounded-b-3xl shadow-xl">

      {/* BACKGROUND IMAGE */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${slide.image_url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
      </AnimatePresence>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white max-w-4xl">

        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-xl tracking-tight">
          {title}
        </h1>

        <p className="text-lg md:text-xl mb-10 text-white/90 drop-shadow-md max-w-2xl mx-auto">
          {subtitle}
        </p>

        {buttonText && (
          <a
            href="#services"
            className="btn btn-primary btn-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            {buttonText}
          </a>
        )}
      </div>

      {/* LEFT BUTTON */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-sm"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* RIGHT BUTTON */}
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-sm"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              i === index
                ? 'bg-primary scale-125 ring-2 ring-white/50'
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}