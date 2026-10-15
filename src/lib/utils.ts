import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a unique enquiry reference ID.
 * Format: ROS-YYYYMMDD-XXXXX (where X is alphanumeric)
 */
export function generateReferenceId(): string {
  const date = new Date()
  const datePart = date.toISOString().slice(0, 10).replace(/-/g, '')
  const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `ROS-${datePart}-${randomPart}`
}

/**
 * Format a number with Indian comma notation.
 */
export function formatIndianNumber(n: number): string {
  return n.toLocaleString('en-IN')
}

/**
 * Format area with unit
 */
export function formatArea(sqM?: number | null, sqFt?: number | null): string {
  if (sqFt) return `${formatIndianNumber(sqFt)} sq.ft`
  if (sqM) return `${formatIndianNumber(sqM)} sq.m`
  return 'Area on request'
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '…'
}

/**
 * Simple in-memory rate limiter for API routes (use Redis/Upstash in production)
 */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(key)

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1 }
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: maxRequests - entry.count }
}

export function clearRateLimit(key: string): void {
  rateLimitStore.delete(key)
}

/**
 * Returns `target` only if it is a same-origin relative path, otherwise `fallback`.
 * Prevents open redirects via ?callbackUrl=https://evil.com or //evil.com.
 */
export function safeRedirectPath(target: string | null | undefined, fallback: string): string {
  if (!target || !target.startsWith('/')) return fallback
  try {
    const base = 'http://internal.invalid'
    const url = new URL(target, base)
    return url.origin === base ? url.pathname + url.search + url.hash : fallback
  } catch {
    return fallback
  }
}
