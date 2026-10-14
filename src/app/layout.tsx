import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Rock One Square | Premium Commercial Real Estate, Raj Nagar Extension, Ghaziabad',
    template: '%s | Rock One Square',
  },
  description:
    'Rock One Square — A landmark mixed-use commercial destination in Raj Nagar Extension, Ghaziabad. Premium retail, entertainment, modern offices, and studio apartments developed by Senflore Hospitality LLP.',
  keywords: [
    'Rock One Square',
    'Raj Nagar Extension',
    'Ghaziabad commercial property',
    'commercial real estate Ghaziabad',
    'retail space Ghaziabad',
    'office space NCR',
    'studio apartments Ghaziabad',
    'Senflore Hospitality',
    'commercial investment NCR',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Rock One Square',
    title: 'Rock One Square | Premium Commercial Destination, Ghaziabad',
    description:
      'Retail. Entertainment. Modern Offices. Studio Apartments. A Rock Solid Plan to Grow at Raj Nagar Extension, Ghaziabad.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0f1e] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
