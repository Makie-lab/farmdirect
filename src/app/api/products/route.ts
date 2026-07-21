import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/db";
// import { products } from "@/db/schema";
// import { eq } from "drizzle-orm";
import { mockProducts } from "@/lib/mock-data/products";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const organic = searchParams.get("organic");

    // Connect to database to activate
    // const productList = await db.select().from(products).where(...);

    let results = [...mockProducts];

    if (category) {
      results = results.filter((p) => p.categorySlug === category);
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.farmerName.toLowerCase().includes(q)
      );
    }
    if (organic === "true") {
      results = results.filter((p) => p.isOrganic);
    }

    return NextResponse.json({ products: results });
  } catch (error) {
    console.error("Get products error:", error);
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
    const { name, description, pricePerUnit, unit, stockQuantity, minOrderQuantity, category, isOrganic, imageUrl } = body;

    if (!name || !pricePerUnit || !unit || !stockQuantity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Connect to database to activate
    // const newProduct = await db.insert(products).values({
    //   farmerId: user.id,
    //   name,
    //   slug: slugify(name),
    //   description,
    //   pricePerUnit,
    //   unit,
    //   stockQuantity,
    //   minOrderQuantity: minOrderQuantity || 1,
    //   categoryId: category,
    //   isOrganic: isOrganic || false,
    //   imageUrl,
    // }).returning();

    return NextResponse.json({
      success: true,
      product: {
        id: `prod-${Date.now()}`,
        name,
        pricePerUnit,
        unit,
        stockQuantity,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
