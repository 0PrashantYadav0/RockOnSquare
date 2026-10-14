import React from 'react'
import { MapPin, Navigation } from 'lucide-react'

const LANDMARKS = [
  { label: 'Meerut Road', note: 'Direct frontage' },
  { label: 'Delhi-Meerut Expressway', note: 'Nearby access' },
  { label: 'RRTS Corridor', note: 'Connectivity (verify status)' },
  { label: 'Cricket Stadium', note: 'Proposed — pending confirmation' },
  { label: 'Educational Institutions', note: 'Multiple nearby' },
  { label: 'Hospitals & Healthcare', note: 'Proximity to major facilities' },
  { label: 'Residential Townships', note: 'Large catchment area' },
  { label: 'Delhi-NCR', note: 'Connected via expressway' },
]

export function LocationSection() {
  const mapsUrl = 'https://maps.google.com/?q=Raj+Nagar+Extension+Ghaziabad+Uttar+Pradesh'
  const embedUrl =
    'https://www.openstreetmap.org/export/embed.html?bbox=77.3969%2C28.6565%2C77.4569%2C28.6965&layer=mapnik&marker=28.6765%2C77.4369'

  return (
    <section id="location" className="py-24 bg-[#080d18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest mb-3">
            Location & Connectivity
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white">
            At the Heart of <span className="text-[#c9a84c]">NCR Growth</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Map */}
          <div>
            <div className="relative rounded-sm overflow-hidden border border-white/10" style={{ paddingBottom: '70%' }}>
              <iframe
                src={embedUrl}
                title="Rock One Square Location Map"
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer"
                aria-label="Map showing Rock One Square location in Raj Nagar Extension, Ghaziabad"
              />
            </div>
            {/* Address + Directions */}
            <div className="mt-4 p-4 border border-white/5 rounded-sm bg-white/2 flex items-start justify-between gap-4">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c9a84c] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm font-medium">Rock One Square</p>
                  <p className="text-white/50 text-xs mt-0.5">Raj Nagar Extension, Ghaziabad, Uttar Pradesh – 201003</p>
                </div>
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-[#c9a84c] text-[#0a0f1e] text-xs font-semibold rounded-sm hover:bg-[#e4c870] transition-colors flex-shrink-0"
              >
                <Navigation className="w-3.5 h-3.5" />
                Get Directions
              </a>
            </div>
          </div>

          {/* Connectivity */}
          <div>
            <h3 className="text-white font-medium mb-5 text-lg">Unmatched Connectivity</h3>
            <div className="space-y-3 mb-6">
              {LANDMARKS.map(({ label, note }) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-3 px-4 border border-white/5 rounded-sm bg-white/2 hover:border-[rgba(201,168,76,0.15)] transition-colors"
                >
                  <span className="text-white text-sm">{label}</span>
                  <span className="text-white/35 text-xs">{note}</span>
                </div>
              ))}
            </div>
            <div className="p-4 border border-[rgba(201,168,76,0.2)] rounded-sm bg-[rgba(201,168,76,0.04)]">
              <p className="text-white/40 text-xs italic leading-relaxed">
                Connectivity information is based on supplied project documentation. Travel times, infrastructure status, and proposed facilities should be independently verified and confirmed with the developer before reliance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
