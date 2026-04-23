import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const [job] = await db
    .select({
      id: jobs.id,
      title: jobs.title,
      location: jobs.location,
      type: jobs.type,
      salary: jobs.salary,
      industry: jobs.industry,
      jobFunction: jobs.jobFunction,
      deadline: jobs.deadline,
      createdAt: jobs.createdAt,
    })
    .from(jobs)
    .where(eq(jobs.slug, slug))
    .limit(1);

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  return NextResponse.json(job);
}
