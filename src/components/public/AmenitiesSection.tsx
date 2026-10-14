'use client'

import React, { useState, useEffect } from 'react'
import {
  Gem, Zap, Wind, Shield, Camera, ArrowUpDown, Car, Package, DoorOpen, ParkingCircle
} from 'lucide-react'
import { getStoredAmenities, subscribeToDataChanges } from '@/lib/data/local-storage'

type LucideIcon = React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>

const ICON_MAP: Record<string, LucideIcon> = {
  Gem, Zap, Wind, Shield, Camera, ArrowUpDown, Car, Package, DoorOpen, ParkingCircle,
}

interface Amenity {
  id: string
  name: string
  description?: string | null
  iconName?: string | null
  sortOrder: number
}

const DEFAULT_AMENITIES = [
  { id: '1', name: 'Premium Finishes', description: 'Granite and premium tile throughout all common areas', iconName: 'Gem', sortOrder: 0 },
  { id: '2', name: 'Dual Power Supply', description: 'Uninterrupted power with DG backup for critical systems', iconName: 'Zap', sortOrder: 1 },
  { id: '3', name: 'Integrated HVAC', description: 'Centralised climate control across commercial zones', iconName: 'Wind', sortOrder: 2 },
  { id: '4', name: 'Advanced Fire Safety', description: 'Multi-zone fire detection and suppression systems', iconName: 'Shield', sortOrder: 3 },
  { id: '5', name: '24×7 CCTV', description: 'Comprehensive surveillance across all levels and access points', iconName: 'Camera', sortOrder: 4 },
  { id: '6', name: '8 High-Speed Elevators', description: 'Fast, high-capacity elevator banks for maximum convenience', iconName: 'ArrowUpDown', sortOrder: 5 },
  { id: '7', name: 'Basement Parking', description: 'Extensive basement parking with modern wayfinding', iconName: 'Car', sortOrder: 6 },
  { id: '8', name: 'Service Areas', description: 'Dedicated back-of-house operations and service entry points', iconName: 'Package', sortOrder: 7 },
  { id: '9', name: 'Grand Entrance', description: 'Architecturally impressive entrance statement and lobby', iconName: 'DoorOpen', sortOrder: 8 },
  { id: '10', name: 'Multi-Level Parking', description: 'Generous parking across multiple basement levels', iconName: 'ParkingCircle', sortOrder: 9 },
]

interface AmenitiesSectionProps {
  amenities?: Amenity[]
}

export function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  const [items, setItems] = useState<Amenity[]>(
    amenities && amenities.length > 0 ? amenities : DEFAULT_AMENITIES
  )

  useEffect(() => {
    const stored = getStoredAmenities()
    if (stored && stored.length > 0) setItems(stored)
    return subscribeToDataChanges(() => {
      const updated = getStoredAmenities()
      if (updated && updated.length > 0) setItems(updated)
    })
  }, [])

  return (
    <section id="amenities" className="py-24 bg-[#0a0f1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-widest mb-3">
            World-Class Amenities
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white">
            Built for <span className="text-[#c9a84c]">Comfort and Prestige</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((amenity) => {
            const Icon = ICON_MAP[amenity.iconName || 'Gem'] || Gem
            return (
              <div
                key={amenity.id}
                className="group p-5 border border-white/5 rounded-sm bg-white/2 hover:border-[rgba(201,168,76,0.25)] hover:-translate-y-0.5 transition-all duration-200 cursor-default"
              >
                <Icon className="w-6 h-6 text-[#c9a84c] mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-white text-sm font-medium mb-1 group-hover:text-[#c9a84c] transition-colors">
                  {amenity.name}
                </h3>
                {amenity.description && (
                  <p className="text-white/40 text-xs leading-relaxed">
                    {amenity.description}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
