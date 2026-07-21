import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/db";
// import { deals, products } from "@/db/schema";
// import { eq, or } from "drizzle-orm";
import { mockDeals } from "@/lib/mock-data/deals";

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    // Connect to database to activate
    // const dealList = await db.select().from(deals).where(
    //   or(eq(deals.buyerId, user.id), eq(deals.farmerId, user.id))
    // );

    let results = [...mockDeals];
    if (status) {
      results = results.filter((d) => d.status === status);
    }

    return NextResponse.json({ deals: results });
  } catch (error) {
    console.error("Get deals error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { productId, proposedPrice, quantity, unit, message } = body;

    if (!productId || !proposedPrice || !quantity || !unit) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Connect to database to activate
    // const product = await db.select().from(products).where(eq(products.id, productId)).limit(1);
    // const newDeal = await db.insert(deals).values({
    //   productId,
    //   buyerId: user.id,
    //   farmerId: product[0].farmerId,
    //   originalPrice: product[0].pricePerUnit,
    //   proposedPrice,
    //   quantity,
    //   unit,
    //   buyerMessage: message,
    //   expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours
    // }).returning();

    return NextResponse.json({
      success: true,
      deal: {
        id: `deal-${Date.now()}`,
        productId,
        proposedPrice,
        quantity,
        unit,
        status: "open",
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Create deal error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
