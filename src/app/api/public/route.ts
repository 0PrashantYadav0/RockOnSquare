import { NextResponse } from 'next/server'
import {
  getServerBanners,
  getServerAmenities,
  getServerFAQs,
  getServerConstructionUpdates,
  getServerSiteSettings,
} from '@/lib/data/server-data'

// Public endpoints - returns PUBLISHED content from local demo data layer
export async function GET() {
  try {
    const [banners, amenities, faqs, constructionUpdates, settings] = await Promise.all([
      getServerBanners(true),
      getServerAmenities(true),
      getServerFAQs(true),
      getServerConstructionUpdates(true),
      getServerSiteSettings(),
    ])

    return NextResponse.json({
      banners,
      amenities,
      faqs,
      constructionUpdates,
      settings: Object.fromEntries(
        settings.filter((s) => s.isPublic).map((s) => [s.key, s.value])
      ),
    })
  } catch (error) {
    console.error('[Public API] Error fetching site data:', error)
    return NextResponse.json({
      banners: [],
      amenities: [],
      faqs: [],
      constructionUpdates: [],
      settings: {},
    })
  }
}
