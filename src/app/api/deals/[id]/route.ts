import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/db";
// import { deals } from "@/db/schema";
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
    const { action, counterPrice, message } = body;

    if (!action || !["accept", "reject", "counter"].includes(action)) {
      return NextResponse.json({ error: "Invalid action. Must be accept, reject, or counter" }, { status: 400 });
    }

    if (action === "counter" && !counterPrice) {
      return NextResponse.json({ error: "Counter price is required for counter action" }, { status: 400 });
    }

    // Connect to database to activate
    // const deal = await db.select().from(deals).where(eq(deals.id, id)).limit(1);
    // if (!deal.length) {
    //   return NextResponse.json({ error: "Deal not found" }, { status: 404 });
    // }

    let status: string;
    let finalPrice: number | null = null;

    switch (action) {
      case "accept":
        status = "accepted";
        // finalPrice = deal[0].counterPrice || deal[0].proposedPrice;
        finalPrice = counterPrice || 0;
        break;
      case "reject":
        status = "rejected";
        break;
      case "counter":
        status = "countered";
        break;
      default:
        status = "open";
    }

    // await db.update(deals).set({
    //   status,
    //   counterPrice: action === "counter" ? counterPrice : undefined,
    //   finalPrice,
    //   farmerMessage: message,
    //   updatedAt: new Date(),
    // }).where(eq(deals.id, id));

    return NextResponse.json({
      success: true,
      deal: {
        id,
        status,
        counterPrice: action === "counter" ? counterPrice : null,
        finalPrice,
        message,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Update deal error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
