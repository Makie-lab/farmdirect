import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/db";
// import { orders } from "@/db/schema";
// import { eq } from "drizzle-orm";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const validStatuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Connect to database to activate
    // const updatedOrder = await db.update(orders)
    //   .set({ status, updatedAt: new Date() })
    //   .where(eq(orders.id, id))
    //   .returning();

    return NextResponse.json({
      success: true,
      order: {
        id,
        status,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
