'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface SlideItem {
  id: number;
  image: string;
  link: string;
  alt: string;
}

interface ImageSliderProps {
  slides: SlideItem[];
  title?: string;
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

export default function ImageSlider({
  slides,
  title,
  autoSlide = true,
  autoSlideInterval = 5000,
}: ImageSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide functionality
  useEffect(() => {
    if (!autoSlide || slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [autoSlide, autoSlideInterval, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) return null;

  return (
    <section className="py-8 md:py-6">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            {title}
          </h2>
        )}

        <div className="relative group">
          {/* Slider Container */}
          <div className="relative w-full h-64 md:h-96 lg:h-[400px] overflow-hidden rounded-lg shadow-lg">
            {slides.map((slide, index) => (
              <Link
                key={slide.id}
                href={slide.link}
                className="absolute w-full h-full transition-opacity duration-500 ease-in-out"
                style={{
                  opacity: index === currentSlide ? 1 : 0,
                  pointerEvents: index === currentSlide ? 'auto' : 'none',
                }}
              >
                <div className="relative w-full h-full cursor-pointer hover:brightness-95 transition-all duration-300">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    priority={index === currentSlide}
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
