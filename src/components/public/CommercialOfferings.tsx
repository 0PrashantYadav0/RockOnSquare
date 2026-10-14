'use client'

import React, { useState } from 'react'
import { Store, Gamepad2, Building2, Hotel, Check, MessageCircle } from 'lucide-react'
import { buildWhatsAppUrl, defaultWhatsAppMessage } from '@/lib/notifications/whatsapp'

const OFFERINGS = [
  {
    id: 'retail',
    title: 'Premium Retail',
    icon: Store,
    colorClass: 'text-[#c9a84c]',
    borderClass: 'border-[rgba(201,168,76,0.4)]',
    bgClass: 'bg-[rgba(201,168,76,0.05)]',
    floors: 'Ground Floor',
    floorBadge: 'bg-[rgba(201,168,76,0.1)] text-[#c9a84c] border-[rgba(201,168,76,0.3)]',
    description:
      'High-visibility commercial spaces with exceptional frontage on Meerut Road. Premium granite finishes, maximum footfall positioning, and direct access make these spaces ideal for established and emerging retail brands.',
    highlights: [
      'Ground floor visibility & access',
      '30 metre road frontage',
      'Premium granite & tile finishes',
      'Maximum footfall corridor',
    ],
  },
  {
    id: 'entertainment',
    title: 'Entertainment Zone',
    icon: Gamepad2,
    colorClass: 'text-[#8b5cf6]',
    borderClass: 'border-[rgba(139,92,246,0.4)]',
    bgClass: 'bg-[rgba(139,92,246,0.05)]',
    floors: '2nd – 3rd Floor',
    floorBadge: 'bg-[rgba(139,92,246,0.1)] text-[#8b5cf6] border-[rgba(139,92,246,0.3)]',
    description:
      'The biggest gaming zone in Ghaziabad — a flagship entertainment destination combining cutting-edge gaming, premium dining, and leisure. For the first time in the region, "Lord of the Drinks" brings an exclusive bar and dining concept.',
    highlights: [
      'Largest gaming zone in Ghaziabad',
      '"Lord of the Drinks" dining concept',
      'Premium bar concept (first in region)',
      'Event & social spaces',
    ],
  },
  {
    id: 'offices',
    title: 'Modern Offices',
    icon: Building2,
    colorClass: 'text-[#3b82f6]',
    borderClass: 'border-[rgba(59,130,246,0.4)]',
    bgClass: 'bg-[rgba(59,130,246,0.05)]',
    floors: '4th Floor',
    floorBadge: 'bg-[rgba(59,130,246,0.1)] text-[#3b82f6] border-[rgba(59,130,246,0.3)]',
    description:
      'Contemporary office spaces designed for the modern workforce — featuring integrated HVAC, high-speed connectivity infrastructure, professional reception, and direct access to the Rock One Square ecosystem.',
    highlights: [
      'Integrated HVAC systems',
      'High-speed connectivity infrastructure',
      'Professional common areas',
      'Access to on-site amenities',
    ],
  },
  {
    id: 'studios',
    title: 'Studio Apartments',
    icon: Hotel,
    colorClass: 'text-[#10b981]',
    borderClass: 'border-[rgba(16,185,129,0.4)]',
    bgClass: 'bg-[rgba(16,185,129,0.05)]',
    floors: '5th – 9th Floor',
    floorBadge: 'bg-[rgba(16,185,129,0.1)] text-[#10b981] border-[rgba(16,185,129,0.3)]',
    description:
      'Premium service apartments and studio units on the upper floors, offering panoramic views, full service facilities, and access to the complete Rock One Square commercial ecosystem — ideal for business travellers and urban professionals.',
    highlights: [
      'Upper floor panoramic views',
      'Service apartment facilities',
      'Modern studio layouts',
      'Access to commercial amenities',
    ],
  },
]

export function CommercialOfferings() {
  const [active, setActive] = useState(0)
  const offering = OFFERINGS[active]
  const Icon = offering.icon
  const waUrl = buildWhatsAppUrl(defaultWhatsAppMessage(offering.title))

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="offerings" className="py-24 bg-[#080d18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest mb-3">
            Commercial Spaces
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white">
            Four Verticals. One Address.
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {OFFERINGS.map((o, i) => {
            const TabIcon = o.icon
            return (
              <button
                key={o.id}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-sm border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] ${
                  i === active
                    ? `${o.borderClass} ${o.bgClass} ${o.colorClass}`
                    : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                {o.title}
              </button>
            )
          })}
        </div>

        {/* Detail Card */}
        <div
          key={offering.id}
          className={`rounded-sm border ${offering.borderClass} ${offering.bgClass} p-6 md:p-10 transition-all duration-300`}
        >
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 rounded-sm border ${offering.borderClass} ${offering.bgClass}`}>
                  <Icon className={`w-6 h-6 ${offering.colorClass}`} />
                </div>
                <span className={`text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-sm border ${offering.floorBadge}`}>
                  {offering.floors}
                </span>
              </div>
              <h3 className={`font-display text-3xl md:text-4xl font-light mb-4 ${offering.colorClass}`}>
                {offering.title}
              </h3>
              <p className="text-white/60 text-base leading-relaxed">{offering.description}</p>
            </div>

            {/* Right */}
            <div>
              <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-4">Key Highlights</p>
              <ul className="space-y-3 mb-8">
                {offering.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 text-white/70 text-sm">
                    <Check className={`w-4 h-4 flex-shrink-0 ${offering.colorClass}`} />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => scrollTo('contact')}
                  className="px-5 py-2.5 bg-[#c9a84c] text-[#0a0f1e] text-sm font-semibold rounded-sm hover:bg-[#e4c870] transition-colors"
                >
                  Enquire Now
                </button>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border border-white/10 text-white/60 text-sm rounded-sm hover:border-white/30 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </div>
              <p className="mt-4 text-white/25 text-xs italic">
                * Pricing is on request. Contact our sales team for availability and details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
