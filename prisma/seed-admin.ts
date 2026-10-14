/**
 * First Admin Setup Script
 *
 * Creates the first administrator account securely.
 * Reads credentials from environment variables.
 *
 * Set these in .env before running:
 *   ADMIN_EMAIL=admin@yourdomain.com
 *   ADMIN_PASSWORD=YourSecurePassword123!
 *   ADMIN_NAME=Your Name
 *
 * Run: pnpm db:seed:admin
 *
 * IMPORTANT: Remove ADMIN_PASSWORD from .env after setup.
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  const name = process.env.ADMIN_NAME || 'Administrator'

  if (!email || !password) {
    console.error('❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env')
    console.error('   Copy .env.example to .env and configure the ADMIN_* variables.')
    process.exit(1)
  }

  if (password.length < 8) {
    console.error('❌ ADMIN_PASSWORD must be at least 8 characters')
    process.exit(1)
  }

  // Check if admin already exists
  const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
  if (existing) {
    console.log(`⚠️  User already exists: ${email}`)
    console.log('   If you need to reset the password, update it directly in the database.')
    process.exit(0)
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  })

  console.log(`✅ Admin account created:`)
  console.log(`   Name:  ${user.name}`)
  console.log(`   Email: ${user.email}`)
  console.log(`   Role:  ${user.role}`)
  console.log(`\n⚠️  IMPORTANT: Remove ADMIN_PASSWORD from your .env file now.`)
  console.log(`   Login at: ${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/login`)
}

main()
  .catch((e) => {
    console.error('❌ Admin setup failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
