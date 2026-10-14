'use client'

import React, { useState } from 'react'
import { Building2, Star, Image as ImageIcon } from 'lucide-react'

interface ConstructionUpdate {
  id: string
  title: string
  description?: string | null
  updateDate: Date | string
  floorsCompleted?: number | null
  overallProgress?: number | null
  isMilestone: boolean
  milestoneLabel?: string | null
  photoUrls?: string[]
}

interface ConstructionProgressProps {
  updates?: ConstructionUpdate[]
}

function ConstructionPhoto({ url, index }: { url: string; index: number }) {
  const [error, setError] = useState(false)
  if (error) {
    return (
      <div className="relative aspect-square rounded-sm overflow-hidden bg-white/5 flex items-center justify-center">
        <ImageIcon className="w-5 h-5 text-white/20" />
      </div>
    )
  }
  return (
    <div className="relative aspect-square rounded-sm overflow-hidden bg-white/5">
      <img
        src={url}
        alt={`Construction photo ${index + 1}`}
        className="w-full h-full object-cover"
        onError={() => setError(true)}
      />
    </div>
  )
}

export function ConstructionProgress({ updates }: ConstructionProgressProps) {
  const items = updates && updates.length > 0 ? updates : []

  const formatDate = (d: Date | string) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <section id="progress" className="py-24 bg-[#080d18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest mb-3">
            Construction Progress
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white">
            7 Floors Complete <span className="text-[#c9a84c]">and Rising</span>
          </h2>
        </div>

        {/* Status banner */}
        <div className="flex items-center gap-4 p-5 mb-12 border border-[rgba(201,168,76,0.25)] rounded-sm bg-[rgba(201,168,76,0.06)]">
          <Building2 className="w-8 h-8 text-[#c9a84c] flex-shrink-0" />
          <div>
            <p className="text-white font-medium">7 Floors Complete — Progressing Ahead of Schedule</p>
            <p className="text-white/40 text-xs mt-0.5 italic">
              Based on builder-supplied information. Verify current construction status directly with Senflore Hospitality LLP.
            </p>
          </div>
        </div>

        {/* Timeline */}
        {items.length > 0 ? (
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[rgba(201,168,76,0.2)]" />
            <div className="space-y-8">
              {items.map((update, i) => (
                <div
                  key={update.id}
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-0.5 rounded-full bg-[#c9a84c] border-2 border-[#080d18] z-10" />

                  <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-10' : 'md:pl-10'}`}>
                    <div className="p-5 border border-white/5 rounded-sm bg-white/2 hover:border-[rgba(201,168,76,0.15)] transition-colors">
                      {update.isMilestone && (
                        <div className="flex items-center gap-1.5 mb-2">
                          <Star className="w-3.5 h-3.5 text-[#c9a84c]" />
                          <span className="text-[#c9a84c] text-xs font-semibold uppercase tracking-wider">
                            {update.milestoneLabel || 'Milestone'}
                          </span>
                        </div>
                      )}
                      <p className="text-white/35 text-xs mb-1">{formatDate(update.updateDate)}</p>
                      <h4 className="text-white font-medium mb-2">{update.title}</h4>
                      {update.description && (
                        <p className="text-white/50 text-sm leading-relaxed">{update.description}</p>
                      )}
                      {update.floorsCompleted != null && (
                        <p className="text-[#c9a84c] text-xs mt-2 font-medium">
                          {update.floorsCompleted} floors complete
                        </p>
                      )}
                      {update.photoUrls && update.photoUrls.length > 0 && (
                        <div className="mt-3 grid grid-cols-3 gap-1">
                          {update.photoUrls.slice(0, 3).map((url, pi) => (
                            <ConstructionPhoto key={pi} url={url} index={pi} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-12 border border-white/5 rounded-sm bg-white/2">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-sm border border-white/10 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-white/20" />
              </div>
            </div>
            <p className="text-white/30 text-sm">Construction update photographs and timeline details will be published by the developer.</p>
            <p className="text-white/20 text-xs mt-2 italic">All published progress photographs are dated. Artist&apos;s impressions are clearly labelled.</p>
          </div>
        )}

        <div className="mt-8 p-4 border border-white/5 rounded-sm">
          <p className="text-white/25 text-xs italic leading-relaxed text-center">
            Construction photographs show actual progress. Artist&apos;s impressions are clearly labelled. Completion dates and timelines are subject to builder confirmation.
          </p>
        </div>
      </div>
    </section>
  )
}
