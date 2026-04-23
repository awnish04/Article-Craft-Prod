import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { applications } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const [app] = await db
    .select({
      resumeData: applications.resumeData,
      resumeMimeType: applications.resumeMimeType,
      resumeFileName: applications.resumeFileName,
    })
    .from(applications)
    .where(eq(applications.id, Number(id)))
    .limit(1);

  if (!app || !app.resumeData) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  const buffer = Buffer.from(app.resumeData, "base64");
  const mimeType = app.resumeMimeType || "application/pdf";
  const fileName = app.resumeFileName || "resume.pdf";

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": mimeType,
      "Content-Disposition": `inline; filename="${fileName}"`,
      "Content-Length": buffer.length.toString(),
    },
  });
}
