"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { MockConversation } from "@/lib/mock-data/messages";
import { formatRelativeTime } from "@/lib/utils";

interface ConversationListProps {
  conversations: MockConversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
  const [search, setSearch] = useState("");

  const filtered = conversations.filter(
    (c) =>
      !c.isArchived &&
      (c.otherUser.name.toLowerCase().includes(search.toLowerCase()) ||
        (c.productName || "").toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filtered.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left ${
              selectedId === conv.id ? "bg-green-50" : ""
            }`}
          >
            <div className="relative">
              <img
                src={conv.otherUser.avatar}
                alt={conv.otherUser.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {conv.otherUser.isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 truncate">{conv.otherUser.name}</span>
                <span className="text-xs text-gray-500">{formatRelativeTime(conv.lastMessageAt)}</span>
              </div>
              <p className="text-xs text-gray-500 truncate">{conv.productName}</p>
              <p className="text-sm text-gray-600 truncate mt-0.5">{conv.lastMessage}</p>
            </div>
            {conv.unreadCount > 0 && (
              <span className="min-w-[20px] h-5 bg-green-600 text-white text-xs rounded-full flex items-center justify-center px-1.5">
                {conv.unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
