import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Page Not Found' }

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-display text-8xl font-light text-[#c9a84c] mb-4">404</p>
        <h1 className="text-white text-2xl font-light mb-3">Page Not Found</h1>
        <p className="text-white/40 text-sm mb-8 max-w-sm">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 bg-[#c9a84c] text-[#0a0f1e] text-sm font-semibold rounded-sm hover:bg-[#e4c870] transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/#contact"
            className="px-5 py-2.5 border border-white/10 text-white/60 text-sm rounded-sm hover:border-white/30 hover:text-white transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
