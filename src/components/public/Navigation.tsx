'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'
import { buildWhatsAppUrl, defaultWhatsAppMessage } from '@/lib/notifications/whatsapp'

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Offerings', href: '#offerings' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Location', href: '#location' },
  { label: 'Progress', href: '#progress' },
  { label: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    if (href.startsWith('#')) {
      const el = document.getElementById(href.slice(1))
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const phone = process.env.NEXT_PUBLIC_SALES_PHONE
  const waUrl = buildWhatsAppUrl(defaultWhatsAppMessage())

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0f1e]/95 backdrop-blur-md border-b border-[rgba(201,168,76,0.2)] shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => scrollTo('#hero')}
              className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded"
            >
              <span className="font-display text-lg md:text-xl font-semibold text-white tracking-wide">
                Rock <span className="text-[#c9a84c]">One</span> Square
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-white/80 hover:text-[#c9a84c] transition-colors duration-200 focus:outline-none focus-visible:text-[#c9a84c]"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-3">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-1.5 text-sm text-white/70 hover:text-[#c9a84c] transition-colors"
                  aria-label="Call us"
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden xl:inline">{phone}</span>
                </a>
              )}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-white/70 hover:text-[#c9a84c] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <button
                onClick={() => scrollTo('#contact')}
                className="px-4 py-2 bg-[#c9a84c] text-[#0a0f1e] text-sm font-semibold rounded-sm hover:bg-[#e4c870] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]"
              >
                Book a Site Visit
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden p-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] rounded"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-72 bg-[#0a0f1e] border-l border-[rgba(201,168,76,0.2)] shadow-2xl transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex items-center justify-between mb-8">
              <span className="font-display text-lg font-semibold text-white">
                Rock <span className="text-[#c9a84c]">One</span> Square
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1 text-white/60 hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-left px-3 py-3 text-white/80 hover:text-[#c9a84c] hover:bg-white/5 rounded transition-colors text-sm"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3">
              <button
                onClick={() => scrollTo('#contact')}
                className="w-full py-3 bg-[#c9a84c] text-[#0a0f1e] font-semibold text-sm rounded-sm hover:bg-[#e4c870] transition-colors"
              >
                Book a Site Visit
              </button>
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center justify-center gap-2 py-3 border border-white/10 rounded-sm text-white/70 text-sm hover:text-white hover:border-white/30 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Us
                </a>
              )}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 border border-[rgba(201,168,76,0.3)] rounded-sm text-[#c9a84c] text-sm hover:bg-[rgba(201,168,76,0.1)] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
