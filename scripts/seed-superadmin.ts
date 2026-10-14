/**
 * Superadmin Bootstrap Script
 *
 * Creates the first superadmin account securely.
 * Reads credentials from environment variables — NEVER from user input at runtime.
 *
 * Required .env variables before running:
 *   MONGODB_URI=mongodb+srv://...
 *   SUPERADMIN_BOOTSTRAP_EMAIL=superadmin@yourdomain.com
 *   SUPERADMIN_BOOTSTRAP_PASSWORD=<strong-password>
 *   SUPERADMIN_BOOTSTRAP_NAME=Super Administrator   (optional)
 *
 * Run: pnpm db:seed:superadmin
 *
 * IMPORTANT:
 *   - Remove SUPERADMIN_BOOTSTRAP_PASSWORD from .env after first run.
 *   - This script REFUSES to overwrite an existing superadmin.
 *   - Subsequent admin accounts must be created via the superadmin panel.
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const PASSWORD_MIN_LENGTH = 12;

async function main() {
  const email = process.env.SUPERADMIN_BOOTSTRAP_EMAIL?.trim().toLowerCase();
  const password = process.env.SUPERADMIN_BOOTSTRAP_PASSWORD;
  const name = process.env.SUPERADMIN_BOOTSTRAP_NAME || "Super Administrator";

  // Validate required vars
  if (!email) {
    console.error("SUPERADMIN_BOOTSTRAP_EMAIL is not set in .env");
    process.exit(1);
  }
  if (!password) {
    console.error("SUPERADMIN_BOOTSTRAP_PASSWORD is not set in .env");
    process.exit(1);
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    console.error(
      `SUPERADMIN_BOOTSTRAP_PASSWORD must be at least ${PASSWORD_MIN_LENGTH} characters`
    );
    process.exit(1);
  }

  // Check if ANY superadmin already exists
  const existingSuperAdmin = await prisma.user.findFirst({
    where: { role: "superadmin" },
    select: { email: true },
  });

  if (existingSuperAdmin) {
    console.log(`A superadmin already exists: ${existingSuperAdmin.email}`);
    console.log(
      "This script will not overwrite an existing superadmin account."
    );
    console.log(
      "To manage admins, log in as superadmin and use the /superadmin/users panel."
    );
    process.exit(0);
  }

  // Check if this specific email already exists as any role
  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { email: true, role: true },
  });

  if (existingUser) {
    console.log(`A user already exists with email: ${email} (role: ${existingUser.role})`);
    console.log("Refusing to overwrite existing account.");
    process.exit(1);
  }

  // Hash password with bcrypt (cost 12)
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "superadmin",
      isActive: true,
    },
  });

  console.log("Superadmin account created successfully:");
  console.log(`  Name:  ${user.name}`);
  console.log(`  Email: ${user.email}`);
  console.log(`  Role:  ${user.role}`);
  console.log("");
  console.log("IMPORTANT: Remove SUPERADMIN_BOOTSTRAP_PASSWORD from .env now!");
  console.log(
    `Login at: ${process.env.NEXTAUTH_URL || "http://localhost:3000"}/superadmin/login`
  );
}

main()
  .catch((e) => {
    console.error("Superadmin setup failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
