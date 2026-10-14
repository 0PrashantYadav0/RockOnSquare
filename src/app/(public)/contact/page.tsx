import type { Metadata } from 'next'
import { ContactSection } from '@/components/public/ContactSection'
import { LocationSection } from '@/components/public/LocationSection'

export const metadata: Metadata = {
  title: 'Contact Us | Rock One Square',
  description:
    'Get in touch with the Rock One Square sales team. Book a site visit, request a brochure, or enquire about retail, office, and studio spaces in Raj Nagar Extension, Ghaziabad.',
}

export default function ContactPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-[#c9a84c] text-sm uppercase tracking-widest font-medium mb-3">
            CONNECT WITH US
          </p>
          <h1
            className="text-4xl md:text-5xl font-light text-white mb-4"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            Visit & Enquire
          </h1>
          <p className="text-white/70 text-base md:text-lg">
            Schedule a personal consultation or visit our site office at Raj Nagar Extension, Ghaziabad.
          </p>
        </div>
      </div>

      <ContactSection />
      <LocationSection />
    </main>
  )
}
