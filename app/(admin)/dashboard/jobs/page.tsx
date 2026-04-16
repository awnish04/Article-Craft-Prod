import { JobsTable } from "@/components/admin/jobs/JobsTable";
import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export default async function JobsPage() {
  let allJobs: (typeof jobs.$inferSelect)[] = [];

  try {
    allJobs = await db.select().from(jobs).orderBy(desc(jobs.createdAt));
  } catch {
    allJobs = [];
  }

  return <JobsTable jobs={allJobs} />;
}
