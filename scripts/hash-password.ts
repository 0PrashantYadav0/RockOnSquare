import bcrypt from 'bcryptjs'

const password = process.argv[2] || process.env.ADMIN_PASSWORD || 'ChangeThisSecurePassword123!'

if (!password) {
  console.error('Error: Please provide a password to hash.')
  console.error('Usage: pnpm hash-password [password]')
  process.exit(1)
}

const hash = bcrypt.hashSync(password, 12)
const escapedForEnv = hash.split('$').join('\\$')

console.log('='.repeat(60))
console.log('Rock One Square - Admin Password Hash Generator')
console.log('='.repeat(60))
console.log('Add this line to your .env file:')
console.log(`ADMIN_PASSWORD_HASH="${escapedForEnv}"`)
console.log('='.repeat(60))
console.log('Note: The $ characters are escaped with \\$ so Next.js dotenv-expand does not truncate the hash.')
