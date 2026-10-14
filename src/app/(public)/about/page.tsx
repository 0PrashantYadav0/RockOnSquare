import type { Metadata } from 'next'
import { ProjectIntro } from '@/components/public/ProjectIntro'
import { CommercialOfferings } from '@/components/public/CommercialOfferings'
import { AmenitiesSection } from '@/components/public/AmenitiesSection'
import { LocationSection } from '@/components/public/LocationSection'

export const metadata: Metadata = {
  title: 'About the Project | Rock One Square',
  description:
    'Learn about Rock One Square — the landmark commercial development in Raj Nagar Extension, Ghaziabad featuring premium retail, entertainment, modern offices, and studio apartments.',
}

export default function AboutPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-[#c9a84c] text-sm uppercase tracking-widest font-medium mb-3">
          ABOUT THE DEVELOPMENT
        </p>
        <h1
          className="text-4xl md:text-5xl font-light text-white mb-4"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
        >
          Rock One Square
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg">
          A landmark mixed-use commercial destination spread across approximately one acre in Raj Nagar Extension, Ghaziabad.
        </p>
      </div>

      <ProjectIntro />
      <CommercialOfferings />
      <AmenitiesSection />
      <LocationSection />
    </main>
  )
}
