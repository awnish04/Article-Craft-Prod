import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contacts } from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const ids = id.split(",").map(Number).filter(Boolean);

    if (ids.length === 0) {
      return NextResponse.json({ error: "No valid IDs" }, { status: 400 });
    }

    await db
      .delete(contacts)
      .where(
        ids.length === 1 ? eq(contacts.id, ids[0]) : inArray(contacts.id, ids),
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
