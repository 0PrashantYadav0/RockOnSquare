'use client'

import React, { useState, useEffect, useRef } from 'react'
import { MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { buildWhatsAppUrl, defaultWhatsAppMessage } from '@/lib/notifications/whatsapp'
import { getStoredBanners, subscribeToDataChanges } from '@/lib/data/local-storage'

interface Banner {
  id: string
  title: string
  subtitle?: string | null
  description?: string | null
  imageUrl?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  secondaryCtaLabel?: string | null
  secondaryCtaUrl?: string | null
  badge?: string | null
}

interface HeroSectionProps {
  banners?: Banner[]
}

const DEFAULT_BANNERS: Banner[] = [
  {
    id: '1',
    title: 'A Rock Solid Plan to Grow',
    subtitle: 'Retail. Entertainment. Modern Offices. Studio Apartments.',
    description: 'Rock One Square — The premium commercial destination at Raj Nagar Extension, Ghaziabad.',
    ctaLabel: 'Explore the Project',
    ctaUrl: '#offerings',
    secondaryCtaLabel: 'Book a Site Visit',
    secondaryCtaUrl: '#contact',
    badge: 'New Launch',
  },
  {
    id: '2',
    title: 'Lord of the Drinks',
    subtitle: 'For the First Time in Ghaziabad',
    description: 'A curated dining and entertainment ecosystem unlike anything in the region. Anchored by an exclusive premium bar and dining concept.',
    ctaLabel: 'Discover More',
    ctaUrl: '#offerings',
  },
  {
    id: '3',
    title: 'The Biggest Gaming Zone',
    subtitle: 'In Ghaziabad',
    description: 'Entertainment at its finest. Rock One Square brings an unparalleled gaming and leisure experience to Raj Nagar Extension.',
    ctaLabel: 'View Offerings',
    ctaUrl: '#offerings',
  },
]

export function HeroSection({ banners: initialBanners }: HeroSectionProps) {
  const [slides, setSlides] = useState<Banner[]>(
    initialBanners && initialBanners.length > 0 ? initialBanners : DEFAULT_BANNERS
  )
  const [imgError, setImgError] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const sync = () => {
      const stored = getStoredBanners().filter((b) => b.status === 'PUBLISHED')
      if (stored.length > 0) setSlides(stored)
    }
    sync()
    return subscribeToDataChanges(sync)
  }, [])

  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (paused || reducedMotion || slides.length <= 1) return
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [paused, reducedMotion, slides.length])

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent((c) => (c + 1) % slides.length)

  const waUrl = buildWhatsAppUrl(defaultWhatsAppMessage())
  const slide = slides[current]

  const scrollTo = (href: string) => {
    if (!href?.startsWith('#')) return
    const el = document.getElementById(href.slice(1))
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] flex items-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero banner"
    >
      {/* Background */}
      {slide.imageUrl && !imgError[slide.id] ? (
        <img
          src={slide.imageUrl}
          alt=""
          aria-hidden="true"
          onError={() => setImgError((prev) => ({ ...prev, [slide.id]: true }))}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        />
      ) : (
        /* Geometric pattern background */
        <div className="absolute inset-0 bg-[#0a0f1e]">
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(45deg, #c9a84c 1px, transparent 1px), linear-gradient(-45deg, #c9a84c 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e] via-[#111827]/80 to-[#0a0f1e]" />
        </div>
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1e]/90 via-[#0a0f1e]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/60 via-transparent to-[#0a0f1e]/20" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {slide.badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-[rgba(201,168,76,0.4)] bg-[rgba(201,168,76,0.1)] rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
              <span className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest">{slide.badge}</span>
            </div>
          )}

          <h1
            key={`title-${current}`}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-4 transition-all duration-500"
          >
            {slide.title}
          </h1>

          {slide.subtitle && (
            <p className="text-[#c9a84c] text-lg sm:text-xl md:text-2xl font-light mb-4 tracking-wide">
              {slide.subtitle}
            </p>
          )}

          {slide.description && (
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              {slide.description}
            </p>
          )}

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-4">
            {slide.ctaLabel && (
              <button
                onClick={() => scrollTo(slide.ctaUrl || '#offerings')}
                className="px-6 py-3 bg-[#c9a84c] text-[#0a0f1e] font-semibold text-sm rounded-sm hover:bg-[#e4c870] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
              >
                {slide.ctaLabel}
              </button>
            )}
            {slide.secondaryCtaLabel && (
              <button
                onClick={() => scrollTo(slide.secondaryCtaUrl || '#contact')}
                className="px-6 py-3 border border-white/30 text-white text-sm font-medium rounded-sm hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
              >
                {slide.secondaryCtaLabel}
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/brochure"
              className="px-5 py-2.5 border border-white/10 text-white/60 text-sm rounded-sm hover:border-white/30 hover:text-white transition-colors"
            >
              Download Brochure
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 border border-[rgba(201,168,76,0.2)] text-[#c9a84c]/80 text-sm rounded-sm hover:border-[rgba(201,168,76,0.5)] hover:text-[#c9a84c] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Prev / Next arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 border border-white/10 rounded-sm text-white/60 hover:text-white hover:border-white/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 border border-white/10 rounded-sm text-white/60 hover:text-white hover:border-white/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2" role="tablist" aria-label="Slide navigation">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                role="tab"
                aria-selected={i === current}
                aria-label={`Slide ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] ${
                  i === current ? 'w-8 bg-[#c9a84c]' : 'w-3 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2 text-white/30">
        <span className="text-[10px] uppercase tracking-widest rotate-90 origin-center mb-6">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  )
}
