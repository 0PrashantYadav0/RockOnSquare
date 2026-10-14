/**
 * WhatsApp click-to-chat link generation.
 * Uses wa.me links — no API credentials required for basic functionality.
 */

export const ENQUIRY_TYPE_LABELS: Record<string, string> = {
  GENERAL: 'General Enquiry',
  SITE_VISIT: 'Book a Site Visit',
  CALLBACK: 'Request a Callback',
  BROCHURE: 'Request Brochure',
  RETAIL: 'Retail Space Enquiry',
  OFFICE: 'Office Space Enquiry',
  STUDIO: 'Studio / Service Apartment Enquiry',
  OTHER: 'Other Commercial Space',
}

export const OFFERING_TYPE_LABELS: Record<string, string> = {
  RETAIL: 'Premium Retail (Ground Floor)',
  ENTERTAINMENT: 'Entertainment & Gaming Zone (2nd–3rd Floor)',
  OFFICE: 'Modern Offices (4th Floor)',
  STUDIO_APARTMENT: 'Studio / Service Apartments (5th–9th Floor)',
  HOTEL: 'Hotel Facilities',
  DINING: 'Dining & Restaurants',
  OTHER: 'Other Commercial Space',
}

export interface EnquiryWhatsAppParams {
  fullName: string
  phone: string
  email?: string | null
  offeringType?: string | null
  enquiryType: string
  preferredDate?: string | null
  preferredTime?: string | null
  message?: string | null
}

export function getWhatsAppNumber(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
  return raw.replace(/[^0-9a-zA-Z]/g, '').trim()
}

/**
 * Format enquiry details into a clean, human-readable WhatsApp message.
 */
export function formatEnquiryWhatsAppMessage(params: EnquiryWhatsAppParams): string {
  const lines: string[] = [
    'Hello Rock One Square team,',
    '',
    'I would like to enquire about your project.',
    '',
    `Name: ${params.fullName.trim()}`,
    `Phone: ${params.phone.trim()}`,
  ]

  if (params.email && params.email.trim()) {
    lines.push(`Email: ${params.email.trim()}`)
  }

  const offering = params.offeringType
    ? OFFERING_TYPE_LABELS[params.offeringType] || params.offeringType.trim()
    : null
  if (offering) {
    lines.push(`Interested In: ${offering}`)
  }

  const typeLabel = ENQUIRY_TYPE_LABELS[params.enquiryType] || params.enquiryType
  lines.push(`Enquiry Type: ${typeLabel}`)

  const visitDetails: string[] = []
  if (params.preferredDate && params.preferredDate.trim()) {
    visitDetails.push(params.preferredDate.trim())
  }
  if (params.preferredTime && params.preferredTime.trim()) {
    visitDetails.push(params.preferredTime.trim())
  }
  if (visitDetails.length > 0) {
    lines.push(`Preferred Site Visit: ${visitDetails.join(' at ')}`)
  }

  if (params.message && params.message.trim()) {
    lines.push('')
    lines.push(`Message: ${params.message.trim()}`)
  }

  lines.push('')
  lines.push('Please contact me with further details.')

  return lines.join('\n')
}

/**
 * Generate a wa.me click-to-chat URL with an optional pre-filled message.
 */
export function buildWhatsAppUrl(message?: string): string {
  const number = getWhatsAppNumber()
  if (!number) {
    console.warn('[WhatsApp] NEXT_PUBLIC_WHATSAPP_NUMBER is not configured')
    return '#whatsapp-not-configured'
  }
  const base = `https://wa.me/${number}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

/**
 * Build a full click-to-chat URL specifically for an enquiry submission.
 */
export function buildEnquiryWhatsAppUrl(params: EnquiryWhatsAppParams): {
  url: string
  encodedMessage: string
  rawMessage: string
  error?: string
} {
  const number = getWhatsAppNumber()
  const rawMessage = formatEnquiryWhatsAppMessage(params)
  const encodedMessage = encodeURIComponent(rawMessage)

  if (!number) {
    return {
      url: '',
      encodedMessage,
      rawMessage,
      error: 'WhatsApp contact number is not configured in the application.',
    }
  }

  return {
    url: `https://wa.me/${number}?text=${encodedMessage}`,
    encodedMessage,
    rawMessage,
  }
}

/**
 * Default greeting for the WhatsApp contact button.
 */
export function defaultWhatsAppMessage(offeringName?: string): string {
  if (offeringName) {
    return `Hello, I am interested in ${offeringName} at Rock One Square, Raj Nagar Extension, Ghaziabad. I would like more information.`
  }
  return `Hello, I am interested in Rock One Square, Raj Nagar Extension, Ghaziabad. I would like more information about the project.`
}

/**
 * Legacy/reference helper for post-enquiry WhatsApp message.
 */
export function postEnquiryWhatsAppMessage(params: {
  referenceId: string
  fullName: string
  enquiryType: string
  offeringType?: string
}): string {
  const lines = [
    `Hello, I just submitted an enquiry on your website.`,
    ``,
    `Name: ${params.fullName}`,
    `Enquiry Type: ${params.enquiryType}`,
    params.offeringType ? `Interested In: ${params.offeringType}` : '',
    `Reference ID: ${params.referenceId}`,
    ``,
    `Please get in touch with me at your earliest convenience.`,
  ].filter(Boolean)

  return lines.join('\n')
}
