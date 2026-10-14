'use client'

import { useEffect, useRef } from 'react'
import { signOut } from 'next-auth/react'

const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000 // 15 minutes
const THROTTLE_MS = 10 * 1000 // 10 seconds

export function AdminInactivityTracker() {
  const lastActivityRef = useRef<number>(Date.now())
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleActivity = () => {
      const now = Date.now()
      if (now - lastActivityRef.current > THROTTLE_MS) {
        lastActivityRef.current = now
      }
    }

    const checkTimeout = () => {
      const idleTime = Date.now() - lastActivityRef.current
      if (idleTime >= INACTIVITY_TIMEOUT_MS) {
        // Sign out due to inactivity
        signOut({ callbackUrl: '/admin/login?reason=timeout' })
      }
    }

    // Check every 30 seconds
    timerRef.current = setInterval(checkTimeout, 30 * 1000)

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']
    events.forEach((evt) => {
      window.addEventListener(evt, handleActivity, { passive: true })
    })

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      events.forEach((evt) => {
        window.removeEventListener(evt, handleActivity)
      })
    }
  }, [])

  return null
}
