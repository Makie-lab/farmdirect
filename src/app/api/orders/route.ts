import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/db";
// import { orders, products } from "@/db/schema";
// import { eq } from "drizzle-orm";
import { generateOrderNumber } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    // Connect to database to activate
    // let query = db.select().from(orders).where(
    //   or(eq(orders.buyerId, user.id), eq(orders.farmerId, user.id))
    // );
    // if (status) {
    //   query = query.where(eq(orders.status, status));
    // }
    // const orderList = await query;

    const mockOrders = [
      { id: "order-001", orderNumber: "FD-LK8A3-X2YP", product: "Nueva Ecija Rice", quantity: 200, totalAmount: 10000, status: "shipped" },
      { id: "order-002", orderNumber: "FD-MN7B2-Q1ZR", product: "Benguet Strawberries", quantity: 10, totalAmount: 3500, status: "out_for_delivery" },
      { id: "order-003", orderNumber: "FD-PQ9C4-W3AS", product: "Fresh Calamansi", quantity: 30, totalAmount: 2400, status: "delivered" },
    ];

    return NextResponse.json({ orders: mockOrders });
  } catch (error) {
    console.error("Get orders error:", error);
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
    const { productId, quantity, deliveryAddress, deliveryNotes, dealId } = body;

    if (!productId || !quantity || !deliveryAddress) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const orderNumber = generateOrderNumber();

    // Connect to database to activate
    // const product = await db.select().from(products).where(eq(products.id, productId)).limit(1);
    // const unitPrice = dealId ? dealFinalPrice : product[0].pricePerUnit;
    // const totalAmount = unitPrice * quantity;
    //
    // const newOrder = await db.insert(orders).values({
    //   orderNumber,
    //   buyerId: user.id,
    //   farmerId: product[0].farmerId,
    //   productId,
    //   quantity,
    //   unitPrice,
    //   totalAmount,
    //   deliveryAddress,
    //   deliveryNotes,
    //   dealId: dealId || null,
    // }).returning();

    return NextResponse.json({
      success: true,
      order: {
        id: `order-${Date.now()}`,
        orderNumber,
        productId,
        quantity,
        status: "pending",
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
