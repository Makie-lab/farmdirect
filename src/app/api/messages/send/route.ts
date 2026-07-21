import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
// import { db } from "@/db";
// import { messages, conversations } from "@/db/schema";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { conversationId, content, type = "text", dealId } = body;

    if (!conversationId || !content) {
      return NextResponse.json({ error: "Conversation ID and content are required" }, { status: 400 });
    }

    // Connect to database to activate
    // const newMessage = await db.insert(messages).values({
    //   conversationId,
    //   senderId: user.id,
    //   content,
    //   type,
    //   dealId: dealId || null,
    // }).returning();

    // Update conversation last message timestamp
    // await db.update(conversations)
    //   .set({ lastMessageAt: new Date() })
    //   .where(eq(conversations.id, conversationId));

    // Send email notification via Resend
    // await resend.emails.send({
    //   from: "FarmDirect <notifications@farmdirect.ph>",
    //   to: recipientEmail,
    //   subject: `New message from ${user.firstName}`,
    //   text: content,
    // });

    return NextResponse.json({
      success: true,
      message: {
        id: `msg-${Date.now()}`,
        conversationId,
        senderId: user.id,
        content,
        type,
        isRead: false,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Send message error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
