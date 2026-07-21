export interface MockConversation {
  id: string;
  otherUser: {
    name: string;
    avatar: string;
    role: "farmer" | "buyer";
    isOnline: boolean;
  };
  productName: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  isArchived: boolean;
}

export interface MockMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  type: "text" | "image" | "deal_offer" | "system";
  isRead: boolean;
  createdAt: string;
  dealInfo?: {
    productName: string;
    proposedPrice: number;
    originalPrice: number;
    quantity: number;
    unit: string;
  };
}

export const mockConversations: MockConversation[] = [
  {
    id: "conv-001",
    otherUser: {
      name: "Maria Santos",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      role: "buyer",
      isOnline: true,
    },
    productName: "Fresh Calamansi",
    lastMessage: "Can you deliver 50kg by Friday?",
    lastMessageAt: "2024-01-14T10:30:00Z",
    unreadCount: 2,
    isArchived: false,
  },
  {
    id: "conv-002",
    otherUser: {
      name: "Pedro Reyes",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      role: "farmer",
      isOnline: false,
    },
    productName: "Nueva Ecija Rice",
    lastMessage: "I can offer you a bulk discount for 100kg",
    lastMessageAt: "2024-01-14T09:15:00Z",
    unreadCount: 0,
    isArchived: false,
  },
  {
    id: "conv-003",
    otherUser: {
      name: "Elena Villanueva",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
      role: "farmer",
      isOnline: true,
    },
    productName: "Laguna Purple Yam",
    lastMessage: "The ube is ready for pickup!",
    lastMessageAt: "2024-01-13T16:45:00Z",
    unreadCount: 1,
    isArchived: false,
  },
  {
    id: "conv-004",
    otherUser: {
      name: "Antonio Garcia",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      role: "farmer",
      isOnline: false,
    },
    productName: "Free-Range Eggs",
    lastMessage: "Thank you for your order! Will ship tomorrow.",
    lastMessageAt: "2024-01-12T14:20:00Z",
    unreadCount: 0,
    isArchived: false,
  },
  {
    id: "conv-005",
    otherUser: {
      name: "Carlos Aquino",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
      role: "farmer",
      isOnline: true,
    },
    productName: "Fresh Basil",
    lastMessage: "New batch of basil harvested today!",
    lastMessageAt: "2024-01-11T08:00:00Z",
    unreadCount: 0,
    isArchived: true,
  },
];

export const mockMessages: Record<string, MockMessage[]> = {
  "conv-001": [
    {
      id: "msg-001",
      conversationId: "conv-001",
      senderId: "user-002",
      senderName: "Maria Santos",
      content: "Hi! I'm interested in your calamansi. Is it still available?",
      type: "text",
      isRead: true,
      createdAt: "2024-01-14T09:00:00Z",
    },
    {
      id: "msg-002",
      conversationId: "conv-001",
      senderId: "user-001",
      senderName: "You",
      content: "Yes, we have about 500kg in stock right now. How much do you need?",
      type: "text",
      isRead: true,
      createdAt: "2024-01-14T09:05:00Z",
    },
    {
      id: "msg-003",
      conversationId: "conv-001",
      senderId: "user-002",
      senderName: "Maria Santos",
      content: "I need around 50kg for my restaurant. Can you do a better price for bulk?",
      type: "text",
      isRead: true,
      createdAt: "2024-01-14T09:15:00Z",
    },
    {
      id: "msg-004",
      conversationId: "conv-001",
      senderId: "user-002",
      senderName: "Maria Santos",
      content: "",
      type: "deal_offer",
      isRead: false,
      createdAt: "2024-01-14T10:00:00Z",
      dealInfo: {
        productName: "Fresh Calamansi",
        proposedPrice: 70,
        originalPrice: 80,
        quantity: 50,
        unit: "kg",
      },
    },
    {
      id: "msg-005",
      conversationId: "conv-001",
      senderId: "user-002",
      senderName: "Maria Santos",
      content: "Can you deliver 50kg by Friday?",
      type: "text",
      isRead: false,
      createdAt: "2024-01-14T10:30:00Z",
    },
  ],
  "conv-002": [
    {
      id: "msg-006",
      conversationId: "conv-002",
      senderId: "user-001",
      senderName: "You",
      content: "Good morning! Do you have Sinandomeng rice available?",
      type: "text",
      isRead: true,
      createdAt: "2024-01-14T08:30:00Z",
    },
    {
      id: "msg-007",
      conversationId: "conv-002",
      senderId: "user-003",
      senderName: "Pedro Reyes",
      content: "Good morning! Yes, we just harvested a new batch. Very fresh.",
      type: "text",
      isRead: true,
      createdAt: "2024-01-14T08:45:00Z",
    },
    {
      id: "msg-008",
      conversationId: "conv-002",
      senderId: "user-003",
      senderName: "Pedro Reyes",
      content: "I can offer you a bulk discount for 100kg",
      type: "text",
      isRead: true,
      createdAt: "2024-01-14T09:15:00Z",
    },
  ],
  "conv-003": [
    {
      id: "msg-009",
      conversationId: "conv-003",
      senderId: "user-004",
      senderName: "Elena Villanueva",
      content: "Your order for 10kg of ube has been prepared.",
      type: "system",
      isRead: true,
      createdAt: "2024-01-13T15:00:00Z",
    },
    {
      id: "msg-010",
      conversationId: "conv-003",
      senderId: "user-004",
      senderName: "Elena Villanueva",
      content: "The ube is ready for pickup!",
      type: "text",
      isRead: false,
      createdAt: "2024-01-13T16:45:00Z",
    },
  ],
  "conv-004": [
    {
      id: "msg-011",
      conversationId: "conv-004",
      senderId: "user-001",
      senderName: "You",
      content: "I'd like to order 60 eggs please.",
      type: "text",
      isRead: true,
      createdAt: "2024-01-12T13:00:00Z",
    },
    {
      id: "msg-012",
      conversationId: "conv-004",
      senderId: "user-005",
      senderName: "Antonio Garcia",
      content: "Thank you for your order! Will ship tomorrow.",
      type: "text",
      isRead: true,
      createdAt: "2024-01-12T14:20:00Z",
    },
  ],
  "conv-005": [
    {
      id: "msg-013",
      conversationId: "conv-005",
      senderId: "user-006",
      senderName: "Carlos Aquino",
      content: "New batch of basil harvested today!",
      type: "text",
      isRead: true,
      createdAt: "2024-01-11T08:00:00Z",
    },
  ],
};
