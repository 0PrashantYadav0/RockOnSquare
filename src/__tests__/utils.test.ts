import { describe, it, expect } from 'vitest'
import { generateReferenceId, formatIndianNumber, checkRateLimit, cn } from '@/lib/utils'

describe('Utils', () => {
  describe('cn (classNames merger)', () => {
    it('merges multiple class strings correctly', () => {
      expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white')
    })

    it('resolves tailwind conflicts', () => {
      expect(cn('p-4', 'p-8')).toBe('p-8')
    })
  })

  describe('generateReferenceId', () => {
    it('generates an ID starting with ROS-', () => {
      const id = generateReferenceId()
      expect(id).toMatch(/^ROS-\d{8}-[A-Z0-9]{5}$/)
    })

    it('generates unique IDs across consecutive calls', () => {
      const id1 = generateReferenceId()
      const id2 = generateReferenceId()
      expect(id1).not.toBe(id2)
    })
  })

  describe('formatIndianNumber', () => {
    it('formats Indian numbering system correctly', () => {
      expect(formatIndianNumber(100000)).toBe('1,00,000')
      expect(formatIndianNumber(10000000)).toBe('1,00,00,000')
      expect(formatIndianNumber(500)).toBe('500')
    })
  })

  describe('checkRateLimit', () => {
    it('allows requests within the limit', () => {
      const ip = 'test-ip-' + Math.random()
      const res = checkRateLimit(ip, 5, 60000)
      expect(res.allowed).toBe(true)
      expect(res.remaining).toBe(4)
    })

    it('blocks requests exceeding the limit', () => {
      const ip = 'blocked-ip-' + Math.random()
      for (let i = 0; i < 3; i++) {
        checkRateLimit(ip, 3, 60000)
      }
      const overLimit = checkRateLimit(ip, 3, 60000)
      expect(overLimit.allowed).toBe(false)
      expect(overLimit.remaining).toBe(0)
    })
  })
})
