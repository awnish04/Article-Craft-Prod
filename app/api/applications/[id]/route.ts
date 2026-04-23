import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { applications } from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const ids = id.split(",").map(Number).filter(Boolean);

    if (ids.length === 0) {
      return NextResponse.json({ error: "No valid IDs" }, { status: 400 });
    }

    await db
      .delete(applications)
      .where(
        ids.length === 1
          ? eq(applications.id, ids[0])
          : inArray(applications.id, ids),
      );

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
