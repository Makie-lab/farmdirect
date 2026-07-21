import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/db";
// import { users } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { role, phone, address, farmName, farmLocation } = body;

    if (!role || !["farmer", "buyer"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    if (!phone || !address) {
      return NextResponse.json({ error: "Phone and address are required" }, { status: 400 });
    }

    // Connect to database to activate
    // const newUser = await db.insert(users).values({
    //   clerkId: user.id,
    //   email: user.emailAddresses[0]?.emailAddress || "",
    //   name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
    //   role,
    //   avatarUrl: user.imageUrl,
    //   phone,
    //   address,
    //   farmName: role === "farmer" ? farmName : null,
    //   farmLocation: role === "farmer" ? farmLocation : null,
    // }).returning();

    return NextResponse.json({
      success: true,
      message: "User onboarded successfully",
      user: {
        clerkId: user.id,
        role,
        phone,
        address,
        farmName,
        farmLocation,
      },
    });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
