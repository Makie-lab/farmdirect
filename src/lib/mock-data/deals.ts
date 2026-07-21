export interface MockDeal {
  id: string;
  productName: string;
  productImage: string;
  buyerName: string;
  buyerAvatar: string;
  farmerName: string;
  farmerAvatar: string;
  originalPrice: number;
  proposedPrice: number;
  counterPrice: number | null;
  finalPrice: number | null;
  quantity: number;
  unit: string;
  status: "open" | "countered" | "accepted" | "rejected" | "expired";
  buyerMessage: string;
  farmerMessage: string | null;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  savings: number;
}

export const mockDeals: MockDeal[] = [
  {
    id: "deal-001",
    productName: "Fresh Calamansi",
    productImage: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=600",
    buyerName: "Maria Santos",
    buyerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    farmerName: "Juan dela Cruz",
    farmerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    originalPrice: 80,
    proposedPrice: 65,
    counterPrice: 72,
    finalPrice: null,
    quantity: 50,
    unit: "kg",
    status: "countered",
    buyerMessage: "I need 50kg for my restaurant. Can you give me a bulk discount?",
    farmerMessage: "I can go as low as ₱72/kg for 50kg. That's already a good deal.",
    expiresAt: "2024-01-16T00:00:00Z",
    createdAt: "2024-01-14T10:00:00Z",
    updatedAt: "2024-01-14T12:00:00Z",
    savings: 400,
  },
  {
    id: "deal-002",
    productName: "Benguet Strawberries",
    productImage: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600",
    buyerName: "Rosa Mendoza",
    buyerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    farmerName: "Maria Santos",
    farmerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    originalPrice: 350,
    proposedPrice: 300,
    counterPrice: null,
    finalPrice: null,
    quantity: 10,
    unit: "kg",
    status: "open",
    buyerMessage: "Planning a big event. Would love a discount for strawberries!",
    farmerMessage: null,
    expiresAt: "2024-01-17T00:00:00Z",
    createdAt: "2024-01-14T14:00:00Z",
    updatedAt: "2024-01-14T14:00:00Z",
    savings: 500,
  },
  {
    id: "deal-003",
    productName: "Nueva Ecija Rice (Sinandomeng)",
    productImage: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600",
    buyerName: "Carlos Aquino",
    buyerAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
    farmerName: "Pedro Reyes",
    farmerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    originalPrice: 55,
    proposedPrice: 48,
    counterPrice: 50,
    finalPrice: 50,
    quantity: 200,
    unit: "kg",
    status: "accepted",
    buyerMessage: "Need 200kg for our carinderia. Best price please!",
    farmerMessage: "For 200kg I can do ₱50/kg. Deal?",
    expiresAt: "2024-01-15T00:00:00Z",
    createdAt: "2024-01-12T08:00:00Z",
    updatedAt: "2024-01-13T10:00:00Z",
    savings: 1000,
  },
  {
    id: "deal-004",
    productName: "Baguio Lettuce",
    productImage: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=600",
    buyerName: "Antonio Garcia",
    buyerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    farmerName: "Rosa Mendoza",
    farmerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    originalPrice: 120,
    proposedPrice: 85,
    counterPrice: null,
    finalPrice: null,
    quantity: 20,
    unit: "kg",
    status: "rejected",
    buyerMessage: "Can you do ₱85/kg? I'll order regularly.",
    farmerMessage: "Sorry, the price is too low for organic produce. Our minimum is ₱110/kg.",
    expiresAt: "2024-01-14T00:00:00Z",
    createdAt: "2024-01-11T09:00:00Z",
    updatedAt: "2024-01-11T15:00:00Z",
    savings: 0,
  },
  {
    id: "deal-005",
    productName: "Fresh Bangus (Milkfish)",
    productImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600",
    buyerName: "Elena Villanueva",
    buyerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
    farmerName: "Roberto Pangasinan",
    farmerAvatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100",
    originalPrice: 280,
    proposedPrice: 250,
    counterPrice: null,
    finalPrice: null,
    quantity: 15,
    unit: "kg",
    status: "expired",
    buyerMessage: "Looking to buy 15kg bangus for a family gathering.",
    farmerMessage: null,
    expiresAt: "2024-01-10T00:00:00Z",
    createdAt: "2024-01-07T11:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
    savings: 0,
  },
];
