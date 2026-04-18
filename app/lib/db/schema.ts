import { pgTable, serial, varchar, timestamp, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  resetToken: varchar("reset_token", { length: 255 }),
  resetTokenExpiry: timestamp("reset_token_expiry"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  salary: varchar("salary", { length: 255 }),
  industry: varchar("industry", { length: 255 }),
  jobFunction: varchar("job_function", { length: 255 }),
  experience: varchar("experience", { length: 255 }),
  deadline: varchar("deadline", { length: 100 }),
  description: text("description"),
  roleSummary: text("role_summary"),
  responsibilities: text("responsibilities"), // stored as JSON string
  requiredSkills: text("required_skills"), // stored as JSON string
  goodToHave: text("good_to_have"), // stored as JSON string
  lookingFor: text("looking_for"), // stored as JSON string
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
