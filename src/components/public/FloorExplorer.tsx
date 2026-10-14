'use client'

import React, { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'

interface FloorData {
  floor: number
  label: string
  short: string
  type: string
  color: string
  bgColor: string
  description: string
  highlights: string[]
}

const FLOORS: FloorData[] = [
  { floor: 10, label: 'Tenth Floor', short: '10F', type: 'Hotel Admin', color: '#f59e0b', bgColor: 'rgba(245,158,11,0.08)', description: 'Hotel administration and premium facilities. Hotel management and guest services headquarters.', highlights: ['Hotel administration', 'Premium facilities', 'Management offices'] },
  { floor: 9, label: 'Ninth Floor', short: '9F', type: 'Studio', color: '#10b981', bgColor: 'rgba(16,185,129,0.08)', description: 'Premium service apartments and studio units on the upper levels with panoramic city views.', highlights: ['Service apartments', 'Studio units', 'Panoramic views'] },
  { floor: 8, label: 'Eighth Floor', short: '8F', type: 'Studio', color: '#10b981', bgColor: 'rgba(16,185,129,0.08)', description: 'Service apartments and studio units with full amenity access and modern finishes.', highlights: ['Service apartments', 'Modern finishes', 'City views'] },
  { floor: 7, label: 'Seventh Floor', short: '7F', type: 'Studio', color: '#10b981', bgColor: 'rgba(16,185,129,0.08)', description: 'Studio apartments — construction completed. Premium units with full service facilities.', highlights: ['Construction complete', 'Studio apartments', 'Full services'] },
  { floor: 6, label: 'Sixth Floor', short: '6F', type: 'Studio', color: '#10b981', bgColor: 'rgba(16,185,129,0.08)', description: 'Premium studio apartments with full service facilities and modern amenities.', highlights: ['Premium studios', 'Full services', 'Modern amenities'] },
  { floor: 5, label: 'Fifth Floor', short: '5F', type: 'Studio', color: '#10b981', bgColor: 'rgba(16,185,129,0.08)', description: 'Service apartments and studio units with panoramic views over Raj Nagar Extension.', highlights: ['Service apartments', 'Panoramic views', 'Studio units'] },
  { floor: 4, label: 'Fourth Floor', short: '4F', type: 'Office', color: '#3b82f6', bgColor: 'rgba(59,130,246,0.08)', description: 'Modern office spaces with integrated HVAC, high-speed connectivity, and professional environment.', highlights: ['Modern offices', 'Integrated HVAC', 'Professional setting'] },
  { floor: 3, label: 'Third Floor', short: '3F', type: 'Entertainment', color: '#8b5cf6', bgColor: 'rgba(139,92,246,0.08)', description: 'The entertainment hub — Ghaziabad\'s biggest gaming zone, gymnasium, restaurant cluster, and "Lord of the Drinks" concept.', highlights: ["Ghaziabad's largest gaming zone", 'Restaurant cluster', 'Gymnasium', '"Lord of the Drinks"'] },
  { floor: 2, label: 'Second Floor', short: '2F', type: 'Retail & Dining', color: '#c9a84c', bgColor: 'rgba(201,168,76,0.08)', description: 'Retail continuity, hotel amenities, and a curated dining zone.', highlights: ['Dining zone', 'Hotel amenities', 'Retail expansion'] },
  { floor: 1, label: 'First Floor', short: '1F', type: 'Retail & Hotel', color: '#c9a84c', bgColor: 'rgba(201,168,76,0.08)', description: 'Retail spaces, hotel lobby access, and dining entry points.', highlights: ['Hotel lobby access', 'Retail spaces', 'Dining entry'] },
  { floor: 0, label: 'Ground Floor', short: 'GF', type: 'Premium Retail', color: '#c9a84c', bgColor: 'rgba(201,168,76,0.08)', description: 'Premium retail spaces with direct access from Meerut Road. Maximum footfall, 30m frontage, flagship locations.', highlights: ['Maximum footfall', '30m road frontage', 'Premium finishes', 'Direct road access'] },
]

export function FloorExplorer() {
  const [selected, setSelected] = useState<number>(0)
  const [expanded, setExpanded] = useState<number | null>(0)

  const selectedFloor = FLOORS.find((f) => f.floor === selected) || FLOORS[FLOORS.length - 1]

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="floors" className="py-24 bg-[#0a0f1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest mb-3">Building Explorer</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white">
            Explore <span className="text-[#c9a84c]">Floor by Floor</span>
          </h2>
          <p className="text-white/30 text-xs mt-3 italic max-w-lg mx-auto">
            * Floor distribution is indicative based on planning documents. Final configuration subject to builder confirmation.
          </p>
        </div>

        {/* Desktop: Building SVG + Detail panel */}
        <div className="hidden md:grid md:grid-cols-2 gap-10 items-start">
          {/* Building visualization */}
          <div className="flex flex-col items-center">
            <svg
              viewBox="0 0 200 440"
              className="w-full max-w-[220px]"
              aria-label="Building floor selector"
              role="listbox"
            >
              {/* Building outline */}
              <rect x="20" y="10" width="160" height="420" fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="1" rx="2" />
              {FLOORS.map((f, idx) => {
                const totalFloors = FLOORS.length
                const bandH = 400 / totalFloors
                const y = 10 + idx * bandH
                const isSelected = f.floor === selected
                return (
                  <g key={f.floor}>
                    <rect
                      x="21"
                      y={y}
                      width="158"
                      height={bandH - 1}
                      fill={isSelected ? f.bgColor : 'rgba(255,255,255,0.02)'}
                      stroke={isSelected ? f.color : 'rgba(255,255,255,0.04)'}
                      strokeWidth={isSelected ? 1.5 : 0.5}
                      style={{ cursor: 'pointer', transition: 'all 0.15s' }}
                      onClick={() => setSelected(f.floor)}
                      role="option"
                      aria-selected={isSelected}
                      aria-label={f.label}
                    />
                    <text
                      x="100"
                      y={y + bandH / 2 + 4}
                      textAnchor="middle"
                      fill={isSelected ? f.color : 'rgba(255,255,255,0.3)'}
                      fontSize="9"
                      fontFamily="system-ui"
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                      onClick={() => setSelected(f.floor)}
                    >
                      {f.short} · {f.type}
                    </text>
                  </g>
                )
              })}
            </svg>
            <p className="text-white/30 text-xs mt-3 text-center">Click a floor band to explore</p>
          </div>

          {/* Detail panel */}
          <div
            key={selectedFloor.floor}
            className="p-6 border rounded-sm transition-all duration-300"
            style={{ borderColor: `${selectedFloor.color}40`, backgroundColor: selectedFloor.bgColor }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-widest"
                style={{ color: selectedFloor.color, backgroundColor: `${selectedFloor.color}15`, border: `1px solid ${selectedFloor.color}40` }}
              >
                {selectedFloor.type}
              </span>
            </div>
            <h3 className="font-display text-3xl font-light text-white mb-3" style={{ color: selectedFloor.color }}>
              {selectedFloor.label}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-5">{selectedFloor.description}</p>
            <ul className="space-y-2 mb-6">
              {selectedFloor.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-sm text-white/70">
                  <Check className="w-4 h-4 flex-shrink-0" style={{ color: selectedFloor.color }} />
                  {h}
                </li>
              ))}
            </ul>
            <button
              onClick={scrollToContact}
              className="px-5 py-2.5 text-sm font-semibold rounded-sm transition-colors"
              style={{ backgroundColor: selectedFloor.color, color: '#0a0f1e' }}
            >
              Enquire About This Floor
            </button>
          </div>
        </div>

        {/* Mobile: Expandable accordion */}
        <div className="md:hidden space-y-2">
          {[...FLOORS].reverse().map((f) => (
            <div
              key={f.floor}
              className="border rounded-sm overflow-hidden"
              style={{ borderColor: expanded === f.floor ? `${f.color}50` : 'rgba(255,255,255,0.06)' }}
            >
              <button
                onClick={() => setExpanded(expanded === f.floor ? null : f.floor)}
                className="w-full flex items-center justify-between px-4 py-3 text-left"
                aria-expanded={expanded === f.floor}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-bold w-8 text-center"
                    style={{ color: f.color }}
                  >
                    {f.short}
                  </span>
                  <span className="text-white text-sm">{f.label}</span>
                  <span className="text-xs px-2 py-0.5 rounded-sm" style={{ color: f.color, backgroundColor: `${f.color}12` }}>
                    {f.type}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-white/30 transition-transform ${expanded === f.floor ? 'rotate-180' : ''}`}
                />
              </button>
              {expanded === f.floor && (
                <div className="px-4 pb-4 border-t" style={{ borderColor: `${f.color}20` }}>
                  <p className="text-white/60 text-sm leading-relaxed mt-3 mb-3">{f.description}</p>
                  <ul className="space-y-1.5 mb-4">
                    {f.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-xs text-white/60">
                        <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: f.color }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={scrollToContact}
                    className="w-full py-2 text-xs font-semibold rounded-sm"
                    style={{ backgroundColor: f.color, color: '#0a0f1e' }}
                  >
                    Enquire About This Floor
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
