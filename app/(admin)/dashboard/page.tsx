import { SectionCards } from "@/components/admin/dashboard/section-cards";
import { db } from "@/lib/db";
import { jobs, applications, contacts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function Page() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  let allJobs: { createdAt: Date }[] = [];
  let allApplications: { status: string; createdAt: Date }[] = [];
  let allContacts: { status: string }[] = [];

  try {
    [allJobs, allApplications, allContacts] = await Promise.all([
      db.select({ createdAt: jobs.createdAt }).from(jobs),
      db
        .select({
          status: applications.status,
          createdAt: applications.createdAt,
        })
        .from(applications),
      db.select({ status: contacts.status }).from(contacts),
    ]);
  } catch {
    // fallback to empty arrays
  }

  const totalJobs = allJobs.length;
  const recentJobs = allJobs.filter(
    (j) => new Date(j.createdAt) >= startOfMonth,
  ).length;

  const totalApplications = allApplications.length;
  const pendingApplications = allApplications.filter(
    (a) => a.status === "pending",
  ).length;
  const recentApplications = allApplications.filter(
    (a) => new Date(a.createdAt) >= startOfMonth,
  ).length;

  const totalMessages = allContacts.length;
  const unreadMessages = allContacts.filter(
    (c) => c.status === "unread",
  ).length;

  return (
    <SectionCards
      totalJobs={totalJobs}
      recentJobs={recentJobs}
      totalApplications={totalApplications}
      pendingApplications={pendingApplications}
      totalMessages={totalMessages}
      unreadMessages={unreadMessages}
      recentApplications={recentApplications}
    />
  );
}
