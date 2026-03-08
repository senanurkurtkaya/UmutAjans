'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function HeroSlideImage({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-base-300" />;
  }
  return (
    <img
      src={src}
      alt=""
      className="absolute inset-0 w-full h-full object-cover object-center"
      sizes="100vw"
      fetchPriority="high"
      onError={() => setFailed(true)}
    />
  );
}

type Slide = {
  id: string;
  title: string;
  subtitle: string;
  image_url?: string | null;
  button_text?: string | null;
  button_link?: string | null;
  display_order: number;
};

type HeroContent = {
  title?: string | null;
  subtitle?: string | null;
  button_text?: string | null;
  button_link?: string | null;
};

function isExternalLink(href: string): boolean {
  const t = href.trim();
  return (
    t.startsWith('http://') ||
    t.startsWith('https://') ||
    t.startsWith('tel:') ||
    t.startsWith('mailto:') ||
    t.startsWith('whatsapp:') ||
    t.includes('wa.me/')
  );
}

type Props = {
  slides: Slide[];
  heroContent?: HeroContent;
};

export function HeroSlider({ slides, heroContent }: Props) {
  const [index, setIndex] = useState(0);
  const hasSlides = Boolean(slides?.length);

  useEffect(() => {
    if (!hasSlides) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides!.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [hasSlides, slides?.length]);

  if (!hasSlides) {
    const title = heroContent?.title ?? '';
    const subtitle = heroContent?.subtitle ?? '';
    const buttonText = heroContent?.button_text ?? undefined;
    const buttonLink = heroContent?.button_link?.trim() || '#services';
    const external = isExternalLink(buttonLink);

    if (!title && !subtitle && !buttonText) return null;

    return (
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden rounded-b-3xl shadow-xl mt-4 md:mt-8 mx-4 md:mx-8">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative z-10 container mx-auto px-6 text-center text-white max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-xl tracking-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl mb-10 text-white/90 drop-shadow-md max-w-2xl mx-auto">
            {subtitle}
          </p>
          {buttonText && (
            <a
              href={buttonLink}
              className="btn btn-primary btn-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              {buttonText}
            </a>
          )}
        </div>
      </section>
    );
  }

  const slide = slides[index];
  if (!slide) return null;

  const title = slide.title ?? '';
  const subtitle = slide.subtitle ?? '';
  const buttonText = slide.button_text ?? undefined;
  const buttonLink = slide.button_link?.trim() || '#services';
  const external = isExternalLink(buttonLink);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden rounded-b-3xl shadow-xl mt-4 md:mt-8 mx-4 md:mx-8">

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          {slide.image_url ? (
            <HeroSlideImage src={slide.image_url} />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-base-300" />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

      <div className="relative z-10 container mx-auto px-6 text-center text-white max-w-4xl">

        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-xl tracking-tight">
          {title}
        </h1>

        <p className="text-lg md:text-xl mb-10 text-white/90 drop-shadow-md max-w-2xl mx-auto">
          {subtitle}
        </p>

        {buttonText && (
          <a
            href={buttonLink}
            className="btn btn-primary btn-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
          >
            {buttonText}
          </a>
        )}
      </div>

      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-sm"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-sm"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

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