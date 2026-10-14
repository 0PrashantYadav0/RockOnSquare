import React from 'react'
import { Navigation } from '@/components/public/Navigation'
import { Footer } from '@/components/public/Footer'
import { MobileActionBar } from '@/components/public/MobileActionBar'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileActionBar />
    </div>
  )
}
