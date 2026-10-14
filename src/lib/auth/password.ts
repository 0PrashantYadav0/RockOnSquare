import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

const BCRYPT_REGEX = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/

/**
 * Resolves the admin password hash.
 * Next.js dotenv-expand expands unescaped $ signs in .env files, which can
 * corrupt or empty out a bcrypt hash.
 * This helper first inspects process.env.ADMIN_PASSWORD_HASH. If valid, uses it.
 * If missing, empty, or truncated, it reads the raw .env / .env.local file directly
 * to recover the full 60-character bcrypt hash.
 */
export function getAdminPasswordHash(projectDir: string = process.cwd()): string | null {
  const envHash = process.env.ADMIN_PASSWORD_HASH
  if (envHash && BCRYPT_REGEX.test(envHash.trim())) {
    return envHash.trim()
  }

  try {
    const envFiles = ['.env.local', '.env']
    for (const file of envFiles) {
      const fullPath = path.resolve(projectDir, file)
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf-8')
        const match = content.match(
          /^\s*ADMIN_PASSWORD_HASH\s*=\s*["']?((?:\\\$|\$)2[aby](?:\\\$|\$)\d{2}(?:\\\$|\$)[./A-Za-z0-9]{53})["']?/m
        )
        if (match && match[1]) {
          const normalized = match[1].replace(/\\(\$)/g, '$1')
          if (BCRYPT_REGEX.test(normalized)) {
            return normalized
          }
        }
      }
    }
  } catch {
    // Non-filesystem environments fallback
  }

  return envHash || null
}

/**
 * Verifies a candidate password against the configured admin password hash.
 */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const hash = getAdminPasswordHash()
  if (!hash) {
    return false
  }
  return bcrypt.compare(password, hash)
}
