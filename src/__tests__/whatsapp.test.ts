import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  buildWhatsAppUrl,
  defaultWhatsAppMessage,
  postEnquiryWhatsAppMessage,
  formatEnquiryWhatsAppMessage,
  buildEnquiryWhatsAppUrl,
  getWhatsAppNumber,
} from '@/lib/notifications/whatsapp'

describe('WhatsApp Notifications', () => {
  const originalEnv = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

  beforeEach(() => {
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = '919876543210'
  })

  afterEach(() => {
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = originalEnv
  })

  it('builds a basic wa.me url when number is set', () => {
    const url = buildWhatsAppUrl()
    expect(url).toBe('https://wa.me/919876543210')
  })

  it('builds a url with encoded pre-filled text', () => {
    const msg = 'Hello Rock One Square'
    const url = buildWhatsAppUrl(msg)
    expect(url).toBe(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`)
  })

  it('returns placeholder when number is missing', () => {
    delete process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
    const url = buildWhatsAppUrl('test')
    expect(url).toBe('#whatsapp-not-configured')
  })

  it('formats default message correctly', () => {
    const msg = defaultWhatsAppMessage('Retail Space')
    expect(msg).toContain('Retail Space')
    expect(msg).toContain('Rock One Square')
  })

  it('formats post-enquiry message with reference ID and customer details', () => {
    const msg = postEnquiryWhatsAppMessage({
      referenceId: 'ROS-2025-ABC123',
      fullName: 'Rahul Sharma',
      enquiryType: 'SITE_VISIT',
      offeringType: 'RETAIL',
    })

    expect(msg).toContain('Rahul Sharma')
    expect(msg).toContain('ROS-2025-ABC123')
    expect(msg).toContain('SITE_VISIT')
    expect(msg).toContain('RETAIL')
  })

  describe('formatEnquiryWhatsAppMessage', () => {
    it('formats all customer fields into readable WhatsApp message', () => {
      const msg = formatEnquiryWhatsAppMessage({
        fullName: 'Aarav Gupta',
        phone: '9876543210',
        email: 'aarav@example.com',
        offeringType: 'RETAIL',
        enquiryType: 'SITE_VISIT',
        preferredDate: '2026-10-20',
        preferredTime: 'Morning (10:00 AM – 1:00 PM)',
        message: 'Looking for a 1200 sq.ft retail unit on the ground floor with road visibility.',
      })

      expect(msg).toContain('Hello Rock One Square team,')
      expect(msg).toContain('I would like to enquire about your project.')
      expect(msg).toContain('Name: Aarav Gupta')
      expect(msg).toContain('Phone: 9876543210')
      expect(msg).toContain('Email: aarav@example.com')
      expect(msg).toContain('Interested In: Premium Retail (Ground Floor)')
      expect(msg).toContain('Enquiry Type: Book a Site Visit')
      expect(msg).toContain('Preferred Site Visit: 2026-10-20 at Morning (10:00 AM – 1:00 PM)')
      expect(msg).toContain('Message: Looking for a 1200 sq.ft retail unit on the ground floor with road visibility.')
      expect(msg).toContain('Please contact me with further details.')
    })

    it('formats message cleanly when optional fields are omitted', () => {
      const msg = formatEnquiryWhatsAppMessage({
        fullName: 'Priya Verma',
        phone: '9812345678',
        enquiryType: 'GENERAL',
      })

      expect(msg).toContain('Name: Priya Verma')
      expect(msg).toContain('Phone: 9812345678')
      expect(msg).toContain('Enquiry Type: General Enquiry')
      expect(msg).not.toContain('Email:')
      expect(msg).not.toContain('Interested In:')
      expect(msg).not.toContain('Preferred Site Visit:')
      expect(msg).not.toContain('Message:')
      expect(msg).toContain('Please contact me with further details.')
    })
  })

  describe('buildEnquiryWhatsAppUrl', () => {
    it('builds a valid wa.me URL with correctly encoded query parameters', () => {
      const result = buildEnquiryWhatsAppUrl({
        fullName: 'Vikram Singh',
        phone: '9988776655',
        email: 'vikram@example.com',
        offeringType: 'OFFICE',
        enquiryType: 'CALLBACK',
        message: 'Need pricing details.',
      })

      expect(result.error).toBeUndefined()
      expect(result.url).toMatch(/^https:\/\/wa\.me\/919876543210\?text=/)
      expect(result.url).toContain(encodeURIComponent('Name: Vikram Singh'))
      expect(result.url).toContain(encodeURIComponent('Phone: 9988776655'))
      expect(result.url).toContain(encodeURIComponent('Modern Offices (4th Floor)'))
    })

    it('returns a graceful error when WhatsApp number is not configured', () => {
      delete process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
      expect(getWhatsAppNumber()).toBe('')

      const result = buildEnquiryWhatsAppUrl({
        fullName: 'Neha Patel',
        phone: '9123456789',
        enquiryType: 'GENERAL',
      })

      expect(result.error).toBe('WhatsApp contact number is not configured in the application.')
      expect(result.url).toBe('')
      expect(result.rawMessage).toContain('Name: Neha Patel')
    })
  })
})
