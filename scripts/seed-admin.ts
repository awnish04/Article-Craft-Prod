import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

import { db } from "../app/lib/db/index.js";
import { users } from "../app/lib/db/schema.js";
import { hashPassword } from "../app/lib/auth/password.js";
import { eq } from "drizzle-orm";

async function seed() {
  const email = "articlecraft2026@gmail.com";
  const password = "articlecraft2026@gmail.com";

  // Check if user already exists
  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing) {
    // Update password in case it changed
    const hashed = await hashPassword(password);
    await db
      .update(users)
      .set({ password: hashed })
      .where(eq(users.email, email));
    console.log("✅ Admin user already exists — password updated.");
    process.exit(0);
  }

  const hashed = await hashPassword(password);
  const [newUser] = await db
    .insert(users)
    .values({
      email,
      password: hashed,
      firstName: "Article",
      lastName: "Craft",
    })
    .returning({ id: users.id, email: users.email });

  console.log(`✅ Admin user created: ${newUser.email} (ID: ${newUser.id})`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
