import { pgTable, serial, varchar, timestamp, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }),
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
  responsibilities: text("responsibilities"),
  requiredSkills: text("required_skills"),
  goodToHave: text("good_to_have"),
  lookingFor: text("looking_for"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  jobId: serial("job_id").references(() => jobs.id, { onDelete: "cascade" }),
  jobTitle: varchar("job_title", { length: 255 }).notNull(),
  jobSlug: varchar("job_slug", { length: 255 }).notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  address: varchar("address", { length: 500 }).notNull(),
  coverLetter: text("cover_letter").notNull(),
  portfolio: varchar("portfolio", { length: 500 }),
  linkedIn: varchar("linked_in", { length: 500 }),
  resumeFileName: varchar("resume_file_name", { length: 255 }),
  resumeData: text("resume_data"),
  resumeMimeType: varchar("resume_mime_type", { length: 100 }),
  status: varchar("status", { length: 50 }).default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 50 }).default("unread").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;
