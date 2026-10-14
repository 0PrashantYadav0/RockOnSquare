import { describe, it, expect } from 'vitest'
import { enquirySchema } from '@/lib/validation/schemas'

describe('Enquiry Validation Schema', () => {
  const validPayload = {
    fullName: 'Amit Kumar',
    phone: '9876543210',
    email: 'amit@example.com',
    enquiryType: 'SITE_VISIT',
    consentGiven: true,
  }

  it('validates a correct enquiry payload successfully', () => {
    const result = enquirySchema.safeParse(validPayload)
    expect(result.success).toBe(true)
  })

  it('allows optional email to be empty', () => {
    const result = enquirySchema.safeParse({
      ...validPayload,
      email: '',
    })
    expect(result.success).toBe(true)
  })

  it('fails when Indian phone number does not start with 6-9', () => {
    const result = enquirySchema.safeParse({
      ...validPayload,
      phone: '1234567890',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.phone).toBeDefined()
    }
  })

  it('fails when phone has fewer than 10 digits', () => {
    const result = enquirySchema.safeParse({
      ...validPayload,
      phone: '987654321',
    })
    expect(result.success).toBe(false)
  })

  it('fails when consent is not given', () => {
    const result = enquirySchema.safeParse({
      ...validPayload,
      consentGiven: false,
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.consentGiven).toBeDefined()
    }
  })

  it('fails honeypot check when bot fills _hp field', () => {
    const result = enquirySchema.safeParse({
      ...validPayload,
      _hp: 'spam-bot-input',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors._hp).toBeDefined()
    }
  })

  it('fails on invalid enquiry type enum', () => {
    const result = enquirySchema.safeParse({
      ...validPayload,
      enquiryType: 'INVALID_TYPE',
    })
    expect(result.success).toBe(false)
  })
})
