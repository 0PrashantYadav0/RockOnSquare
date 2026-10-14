import React from 'react'
import Link from 'next/link'
import { Phone, Mail, MessageCircle, ExternalLink, MapPin } from 'lucide-react'
import { buildWhatsAppUrl, defaultWhatsAppMessage } from '@/lib/notifications/whatsapp'

const QUICK_LINKS = ['Home', 'About', 'Offerings', 'Amenities', 'Location', 'Progress']
const OFFERINGS = ['Premium Retail', 'Entertainment Zone', 'Modern Offices', 'Studio Apartments']

export function Footer() {
  const phone = process.env.NEXT_PUBLIC_SALES_PHONE
  const email = process.env.NEXT_PUBLIC_SALES_EMAIL || 'sales@rockonesquare.com'
  const waUrl = buildWhatsAppUrl(defaultWhatsAppMessage())
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#060a14] border-t border-[rgba(201,168,76,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="font-display text-2xl font-semibold text-white mb-3">
              Rock <span className="text-[#c9a84c]">One</span> Square
            </div>
            <p className="text-[#c9a84c] text-xs tracking-widest uppercase mb-4">A Rock Solid Plan to Grow</p>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              A landmark mixed-use commercial destination in Raj Nagar Extension, Ghaziabad — redefining commercial real estate in the NCR region.
            </p>
            <div className="flex items-center gap-3">
              {[
                { label: 'Instagram', href: '#' },
                { label: 'Facebook', href: '#' },
                { label: 'YouTube', href: '#' },
                { label: 'LinkedIn', href: '#' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-sm border border-white/10 flex items-center justify-center text-white/40 hover:text-[#c9a84c] hover:border-[rgba(201,168,76,0.4)] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#c9a84c] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Offerings */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#c9a84c] mb-4">Commercial Spaces</h3>
            <ul className="space-y-2">
              {OFFERINGS.map((o) => (
                <li key={o}>
                  <a href="#offerings" className="text-white/50 hover:text-white text-sm transition-colors">
                    {o}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#c9a84c] mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 text-sm text-white/50">
                <MapPin className="w-4 h-4 text-[#c9a84c] flex-shrink-0 mt-0.5" />
                <span>Raj Nagar Extension, Ghaziabad, Uttar Pradesh — 201003</span>
              </div>
              {phone ? (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-2.5 text-sm text-white/50 hover:text-[#c9a84c] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#c9a84c] flex-shrink-0" />
                  {phone}
                </a>
              ) : (
                <div className="flex items-center gap-2.5 text-sm text-white/30 italic">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  Phone — coming soon
                </div>
              )}
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2.5 text-sm text-white/50 hover:text-[#c9a84c] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#c9a84c] flex-shrink-0" />
                {email}
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-1 px-4 py-2 bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] text-[#c9a84c] text-sm rounded-sm hover:bg-[rgba(201,168,76,0.2)] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
            <div className="text-center md:text-left space-y-1">
              <p>© {year} Rock One Square. All rights reserved. Developed by Senflore Hospitality LLP.</p>
              <p className="text-white/20">
                <strong className="text-white/30">RERA:</strong> Registration pending. Details will be published upon regulatory approval.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
              <Link href="/disclaimer" className="hover:text-white transition-colors">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
