/**
 * Script to create an admin user manually in the database
 *
 * Usage:
 * npx tsx scripts/create-admin.ts
 *
 * Or add to package.json:
 * "scripts": {
 *   "create-admin": "tsx scripts/create-admin.ts"
 * }
 * Then run: npm run create-admin
 */

// Load environment variables from .env.local
import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local file
config({ path: resolve(process.cwd(), ".env.local") });

import { db } from "../app/lib/db/index.js";
import { users } from "../app/lib/db/schema.js";
import { hashPassword } from "../app/lib/auth/password.js";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function createAdmin() {
  console.log("\n=== Create Admin User ===\n");

  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.error("\n❌ Error: DATABASE_URL environment variable is not set");
    console.error("\nPlease create a .env.local file with:");
    console.error('DATABASE_URL="postgresql://user:password@host/database"\n');
    rl.close();
    process.exit(1);
  }

  try {
    const email = await question("Email: ");
    const password = await question("Password: ");
    const firstName = await question("First Name: ");
    const lastName = await question("Last Name: ");
    const phone = await question("Phone (optional): ");

    if (!email || !password || !firstName || !lastName) {
      console.error(
        "\n❌ Error: Email, password, first name, and last name are required",
      );
      rl.close();
      process.exit(1);
    }

    if (password.length < 8) {
      console.error("\n❌ Error: Password must be at least 8 characters long");
      rl.close();
      process.exit(1);
    }

    console.log("\n⏳ Creating admin user...");

    const hashedPassword = await hashPassword(password);

    const [newUser] = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone: phone || null,
      })
      .returning({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
      });

    console.log("\n✅ Admin user created successfully!");
    console.log("\nUser Details:");
    console.log(`  ID: ${newUser.id}`);
    console.log(`  Email: ${newUser.email}`);
    console.log(`  Name: ${newUser.firstName} ${newUser.lastName}`);
    console.log("\n");
  } catch (error: any) {
    if (error.code === "23505") {
      console.error("\n❌ Error: A user with this email already exists");
    } else {
      console.error("\n❌ Error creating admin user:", error.message);
      console.error("\nFull error:", error);
    }
    rl.close();
    process.exit(1);
  }

  rl.close();
  process.exit(0);
}

createAdmin();
