import { SectionCards } from "@/components/admin/dashboard/section-cards";
import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";

export default async function Page() {
  let allJobs: (typeof jobs.$inferSelect)[] = [];

  try {
    allJobs = await db.select().from(jobs);
  } catch {
    allJobs = [];
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const totalJobs = allJobs.length;
  const fullTimeJobs = allJobs.filter(
    (j) => j.type?.toLowerCase().includes("full") ?? false,
  ).length;
  const locations = new Set(allJobs.map((j) => j.location).filter(Boolean))
    .size;
  const industries = new Set(allJobs.map((j) => j.industry).filter(Boolean))
    .size;
  const recentJobs = allJobs.filter(
    (j) => new Date(j.createdAt) >= startOfMonth,
  ).length;

  return (
    <SectionCards
      totalJobs={totalJobs}
      fullTimeJobs={fullTimeJobs}
      locations={locations}
      industries={industries}
      recentJobs={recentJobs}
    />
  );
}
