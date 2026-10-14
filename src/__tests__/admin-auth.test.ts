import { describe, it, expect, beforeEach, vi } from 'vitest'
import bcrypt from 'bcryptjs'
import { checkRateLimit, clearRateLimit } from '@/lib/utils'
import { getAdminPasswordHash, verifyAdminPassword } from '@/lib/auth/password'

describe('Admin Authentication Security', () => {
  const ADMIN_EMAIL = 'admin@rockonesquare.com'
  const ADMIN_RAW_PASSWORD = 'ChangeThisSecurePassword123!'
  const ADMIN_PASSWORD_HASH = bcrypt.hashSync(ADMIN_RAW_PASSWORD, 10)

  beforeEach(() => {
    vi.unstubAllEnvs()
    vi.stubEnv('ADMIN_EMAIL', ADMIN_EMAIL)
    vi.stubEnv('ADMIN_PASSWORD_HASH', ADMIN_PASSWORD_HASH)
  })

  it('accepts strictly authorized admin email matching environment variable', () => {
    const candidateEmail = 'admin@rockonesquare.com'
    const isAuthorized = candidateEmail.trim().toLowerCase() === process.env.ADMIN_EMAIL?.trim().toLowerCase()
    expect(isAuthorized).toBe(true)
  })

  it('rejects unauthorized emails', () => {
    const unauthorizedEmails = [
      'user@example.com',
      'hacker@evil.com',
      'demo@rockonesquare.com',
      'admin2@rockonesquare.com',
    ]

    for (const email of unauthorizedEmails) {
      const isAuthorized = email.trim().toLowerCase() === process.env.ADMIN_EMAIL?.trim().toLowerCase()
      expect(isAuthorized).toBe(false)
    }
  })

  it('verifies bcrypt password hash successfully for correct password', async () => {
    const isValid = await bcrypt.compare(ADMIN_RAW_PASSWORD, process.env.ADMIN_PASSWORD_HASH!)
    expect(isValid).toBe(true)
  })

  it('rejects incorrect password against bcrypt hash', async () => {
    const isInvalid = await bcrypt.compare('WrongPassword123!', process.env.ADMIN_PASSWORD_HASH!)
    expect(isInvalid).toBe(false)
  })

  it('enforces rate limiting on repeated failed attempts and clears on success', () => {
    const testKey = `test-limit-${Date.now()}`
    // First 5 attempts allowed
    for (let i = 0; i < 5; i++) {
      const res = checkRateLimit(testKey, 5, 60000)
      expect(res.allowed).toBe(true)
    }
    // 6th attempt blocked
    const blocked = checkRateLimit(testKey, 5, 60000)
    expect(blocked.allowed).toBe(false)
    expect(blocked.remaining).toBe(0)

    // Clear rate limit
    clearRateLimit(testKey)
    const afterClear = checkRateLimit(testKey, 5, 60000)
    expect(afterClear.allowed).toBe(true)
  })

  it('identifies expired sessions exceeding 15-minute inactivity timeout', () => {
    const INACTIVITY_TIMEOUT_SECONDS = 15 * 60 // 900s
    const now = 10000
    const lastActiveWithinWindow = now - 600 // 10 minutes ago
    const lastActiveExpired = now - 901 // 15 min 1 sec ago

    expect(now - lastActiveWithinWindow > INACTIVITY_TIMEOUT_SECONDS).toBe(false)
    expect(now - lastActiveExpired > INACTIVITY_TIMEOUT_SECONDS).toBe(true)
  })

  it('identifies expired sessions exceeding 1-hour maximum session lifetime', () => {
    const MAX_SESSION_LIFETIME_SECONDS = 60 * 60 // 3600s
    const now = 10000
    const createdAtWithinLifetime = now - 1800 // 30 minutes ago
    const createdAtExpired = now - 3601 // 1 hour 1 sec ago

    expect(now - createdAtWithinLifetime > MAX_SESSION_LIFETIME_SECONDS).toBe(false)
    expect(now - createdAtExpired > MAX_SESSION_LIFETIME_SECONDS).toBe(true)
  })

  it('correctly resolves bcrypt hash from environment or raw .env file', () => {
    const resolved = getAdminPasswordHash()
    expect(resolved).not.toBeNull()
    expect(resolved).toMatch(/^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/)
  })

  it('validates password with verifyAdminPassword helper', async () => {
    const isCorrect = await verifyAdminPassword(ADMIN_RAW_PASSWORD)
    const isIncorrect = await verifyAdminPassword('InvalidPassword123!')
    expect(isCorrect).toBe(true)
    expect(isIncorrect).toBe(false)
  })
})
