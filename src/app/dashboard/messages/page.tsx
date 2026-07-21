"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { ConversationList } from "@/components/messages/conversation-list";
import { MessageThread } from "@/components/messages/message-thread";
import { mockConversations, mockMessages } from "@/lib/mock-data/messages";

export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(mockConversations[0]?.id || null);

  const selectedConversation = mockConversations.find((c) => c.id === selectedId);
  const selectedMessages = selectedId ? mockMessages[selectedId] || [] : [];

  return (
    <div className="h-[calc(100vh-80px)]">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600 mt-1">Chat with buyers and farmers</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm h-[calc(100%-80px)] flex overflow-hidden">
        {/* Conversation List - hidden on mobile when conversation selected */}
        <div className={`w-full md:w-80 border-r border-gray-100 flex-shrink-0 ${selectedId ? "hidden md:block" : ""}`}>
          <ConversationList
            conversations={mockConversations}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>

        {/* Message Thread */}
        <div className={`flex-1 ${!selectedId ? "hidden md:flex" : "flex"} flex-col`}>
          {selectedConversation ? (
            <MessageThread conversation={selectedConversation} messages={selectedMessages} />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
