import { ApplicationsTable } from "@/components/admin/applications/ApplicationsTable";
import { db } from "@/lib/db";
import { applications } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export default async function ApplicationsPage() {
  let allApplications: (typeof applications.$inferSelect)[] = [];

  try {
    allApplications = await db
      .select()
      .from(applications)
      .orderBy(desc(applications.createdAt));
  } catch {
    allApplications = [];
  }

  return <ApplicationsTable applications={allApplications} />;
}
