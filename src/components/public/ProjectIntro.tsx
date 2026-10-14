import React from 'react'
import { Store, Gamepad2, Building2, Hotel } from 'lucide-react'

export function ProjectIntro() {
  const stats = [
    { value: '~1 Acre', label: 'Site Area' },
    { value: '16,929', label: 'Built-up Area (sq.m)', note: 'Subject to verification' },
    { value: '30 m', label: 'Road Frontage' },
    { value: '4', label: 'Commercial Verticals' },
  ]

  const verticals = [
    { icon: Store, label: 'Premium Retail', desc: 'High-visibility ground floor commercial' },
    { icon: Gamepad2, label: 'Entertainment', desc: 'Ghaziabad\'s biggest gaming & dining zone' },
    { icon: Building2, label: 'Modern Offices', desc: 'Contemporary workspace on the 4th floor' },
    { icon: Hotel, label: 'Studio Apartments', desc: 'Service apartments on upper floors' },
  ]

  return (
    <section id="about" className="py-24 bg-[#0a0f1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — copy */}
          <div>
            <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest mb-4">
              The Rock Solid Destination
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white leading-tight mb-6">
              Where Commerce{' '}
              <span className="text-[#c9a84c]">Meets Experience</span>
            </h2>
            <div className="space-y-4 text-white/60 text-base leading-relaxed">
              <p>
                Rock One Square is a landmark mixed-use commercial development spread across approximately one acre in Raj Nagar Extension, Ghaziabad — one of the National Capital Region&apos;s fastest-growing commercial corridors.
              </p>
              <p>
                The lower levels form a vibrant public destination combining premium retail, world-class entertainment, acclaimed dining, and hotel facilities. The upper levels offer modern offices and service apartments, creating a self-sustaining commercial ecosystem where businesses, brands, and professionals thrive together.
              </p>
            </div>

            {/* Verticals */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {verticals.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="p-4 border border-white/5 rounded-sm bg-white/2 hover:border-[rgba(201,168,76,0.2)] transition-colors group"
                >
                  <Icon className="w-5 h-5 text-[#c9a84c] mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-white text-sm font-medium">{label}</div>
                  <div className="text-white/40 text-xs mt-0.5">{desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — stats */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ value, label, note }) => (
                <div
                  key={label}
                  className="p-6 border border-[rgba(201,168,76,0.15)] rounded-sm bg-[rgba(201,168,76,0.03)] relative"
                >
                  <div className="font-display text-3xl md:text-4xl text-[#c9a84c] font-light mb-2">{value}</div>
                  <div className="text-white/60 text-sm">{label}</div>
                  {note && <div className="text-white/25 text-xs mt-1 italic">{note}</div>}
                  <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-[#c9a84c]/40 to-transparent" />
                </div>
              ))}
            </div>

            <p className="mt-4 text-white/25 text-xs italic leading-relaxed">
              All specifications are subject to final approvals and builder confirmation. Figures sourced from project documentation provided by Senflore Hospitality LLP.
            </p>

            <div className="mt-8 p-5 border border-[rgba(201,168,76,0.2)] rounded-sm bg-[rgba(201,168,76,0.05)]">
              <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-wider mb-2">Construction Status</p>
              <p className="text-white text-sm font-medium">7 Floors Complete</p>
              <p className="text-white/50 text-xs mt-1">Progressing ahead of schedule — as per builder communication</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
