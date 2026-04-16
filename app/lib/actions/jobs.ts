"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { jobs, type Job, type NewJob } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

function slugify(title: string) {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") +
    "-" +
    Date.now()
  );
}

export async function createJob(
  data: Omit<NewJob, "id" | "slug" | "createdAt" | "updatedAt">,
): Promise<Job> {
  const [created] = await db
    .insert(jobs)
    .values({
      ...data,
      slug: slugify(data.title),
    })
    .returning();
  revalidatePath("/dashboard/jobs");
  revalidatePath("/careers");
  return created;
}

export async function updateJob(
  id: number,
  data: Partial<Omit<NewJob, "id" | "slug" | "createdAt" | "updatedAt">>,
): Promise<Job> {
  const [updated] = await db
    .update(jobs)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(jobs.id, id))
    .returning();
  revalidatePath("/dashboard/jobs");
  revalidatePath("/careers");
  return updated;
}

export async function deleteJob(id: number) {
  await db.delete(jobs).where(eq(jobs.id, id));
  revalidatePath("/dashboard/jobs");
  revalidatePath("/careers");
}
