"use client";

import { useState } from "react";
import { Send, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MockMessage, MockConversation } from "@/lib/mock-data/messages";
import { formatCurrency } from "@/lib/utils";

interface MessageThreadProps {
  conversation: MockConversation;
  messages: MockMessage[];
}

export function MessageThread({ conversation, messages }: MessageThreadProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    // Add message to local display (would send to API in production)
    const newMsg: MockMessage = {
      id: `msg-new-${Date.now()}`,
      conversationId: conversation.id,
      senderId: "user-001",
      senderName: "You",
      content: input.trim(),
      type: "text",
      isRead: true,
      createdAt: new Date().toISOString(),
    };
    messages.push(newMsg);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center gap-3">
        <div className="relative">
          <img
            src={conversation.otherUser.avatar}
            alt={conversation.otherUser.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          {conversation.otherUser.isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          )}
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{conversation.otherUser.name}</h3>
          <p className="text-xs text-gray-500">
            {conversation.otherUser.isOnline ? "Online" : "Offline"} &bull; {conversation.productName}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isOwn = msg.senderName === "You";

          if (msg.type === "deal_offer" && msg.dealInfo) {
            return (
              <div key={msg.id} className="flex justify-center">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 max-w-sm w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <Handshake className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Deal Offer</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">{msg.dealInfo.productName}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 line-through">
                      {formatCurrency(msg.dealInfo.originalPrice)}/{msg.dealInfo.unit}
                    </span>
                    <span className="text-sm font-bold text-green-700">
                      {formatCurrency(msg.dealInfo.proposedPrice)}/{msg.dealInfo.unit}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Qty: {msg.dealInfo.quantity} {msg.dealInfo.unit}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="flex-1">Accept</Button>
                    <Button size="sm" variant="outline" className="flex-1">Counter</Button>
                  </div>
                </div>
              </div>
            );
          }

          if (msg.type === "system") {
            return (
              <div key={msg.id} className="flex justify-center">
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{msg.content}</span>
              </div>
            );
          }

          return (
            <div key={msg.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                  isOwn
                    ? "bg-green-600 text-white rounded-br-md"
                    : "bg-white border border-gray-200 text-gray-900 rounded-bl-md"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${isOwn ? "text-green-100" : "text-gray-400"}`}>
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-green-500"
          />
          <Button onClick={handleSend} disabled={!input.trim()} className="px-3">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
