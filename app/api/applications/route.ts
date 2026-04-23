import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { applications, jobs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const jobSlug = formData.get("jobSlug") as string;
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const portfolio = formData.get("portfolio") as string;
    const linkedIn = formData.get("linkedIn") as string;
    const resume = formData.get("resume") as File | null;

    if (!jobSlug || !fullName || !email || !phone || !address || !coverLetter) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Get job details
    const [job] = await db
      .select({ id: jobs.id, title: jobs.title })
      .from(jobs)
      .where(eq(jobs.slug, jobSlug))
      .limit(1);

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Convert resume to base64 if provided
    let resumeData: string | null = null;
    let resumeMimeType: string | null = null;
    if (resume && resume.size > 0) {
      if (resume.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Resume file must be under 5MB" },
          { status: 400 },
        );
      }
      const buffer = await resume.arrayBuffer();
      resumeData = Buffer.from(buffer).toString("base64");
      resumeMimeType = resume.type || "application/pdf";
    }

    // Insert application
    const [newApplication] = await db
      .insert(applications)
      .values({
        jobId: job.id,
        jobTitle: job.title,
        jobSlug,
        fullName,
        email,
        phone,
        address,
        coverLetter,
        portfolio: portfolio || null,
        linkedIn: linkedIn || null,
        resumeFileName: resume?.name || null,
        resumeData,
        resumeMimeType,
        status: "pending",
      })
      .returning({ id: applications.id });

    return NextResponse.json(
      { message: "Application submitted successfully", id: newApplication.id },
      { status: 201 },
    );
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
