export interface MockShipmentEvent {
  id: string;
  status: string;
  location: string;
  description: string;
  occurredAt: string;
}

export interface MockShipment {
  id: string;
  orderNumber: string;
  trackingNumber: string;
  carrier: string;
  status: "label_created" | "picked_up" | "in_transit" | "out_for_delivery" | "delivered" | "failed";
  productName: string;
  productImage: string;
  quantity: number;
  unit: string;
  buyerName: string;
  buyerAddress: string;
  farmerName: string;
  farmerAddress: string;
  weight: number;
  estimatedDelivery: string;
  deliveredAt: string | null;
  createdAt: string;
  events: MockShipmentEvent[];
}


export const mockShipments: MockShipment[] = [
  {
    id: "ship-001",
    orderNumber: "FD-LK8A3-X2YP",
    trackingNumber: "LBC-2024011401234",
    carrier: "LBC Express",
    status: "in_transit",
    productName: "Nueva Ecija Rice (Sinandomeng)",
    productImage: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600",
    quantity: 200,
    unit: "kg",
    buyerName: "Carlos Aquino",
    buyerAddress: "123 Rizal St, Tagaytay, Cavite",
    farmerName: "Pedro Reyes",
    farmerAddress: "456 Rice Field Rd, Cabanatuan, Nueva Ecija",
    weight: 200,
    estimatedDelivery: "2024-01-16T18:00:00Z",
    deliveredAt: null,
    createdAt: "2024-01-13T08:00:00Z",
    events: [
      { id: "ev-001", status: "label_created", location: "Cabanatuan, Nueva Ecija", description: "Shipping label created", occurredAt: "2024-01-13T08:00:00Z" },
      { id: "ev-002", status: "picked_up", location: "Cabanatuan, Nueva Ecija", description: "Package picked up by courier", occurredAt: "2024-01-13T14:00:00Z" },
      { id: "ev-003", status: "in_transit", location: "LBC Hub, Cabanatuan", description: "Package arrived at sorting facility", occurredAt: "2024-01-14T06:00:00Z" },
      { id: "ev-004", status: "in_transit", location: "LBC Hub, Manila", description: "Package in transit to destination", occurredAt: "2024-01-14T18:00:00Z" },
    ],
  },
  {
    id: "ship-002",
    orderNumber: "FD-MN7B2-Q1ZR",
    trackingNumber: "JT-PH20240114056789",
    carrier: "J&T Express",
    status: "out_for_delivery",
    productName: "Benguet Strawberries",
    productImage: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600",
    quantity: 10,
    unit: "kg",
    buyerName: "Rosa Mendoza",
    buyerAddress: "789 Mango Ave, Makati City",
    farmerName: "Maria Santos",
    farmerAddress: "321 Highland Rd, La Trinidad, Benguet",
    weight: 12,
    estimatedDelivery: "2024-01-14T17:00:00Z",
    deliveredAt: null,
    createdAt: "2024-01-12T10:00:00Z",
    events: [
      { id: "ev-005", status: "label_created", location: "La Trinidad, Benguet", description: "Shipping label created", occurredAt: "2024-01-12T10:00:00Z" },
      { id: "ev-006", status: "picked_up", location: "La Trinidad, Benguet", description: "Package picked up", occurredAt: "2024-01-12T15:00:00Z" },
      { id: "ev-007", status: "in_transit", location: "J&T Hub, Baguio", description: "Departed from origin hub", occurredAt: "2024-01-13T06:00:00Z" },
      { id: "ev-008", status: "in_transit", location: "J&T Hub, Manila", description: "Arrived at destination hub", occurredAt: "2024-01-14T04:00:00Z" },
      { id: "ev-009", status: "out_for_delivery", location: "Makati City", description: "Out for delivery", occurredAt: "2024-01-14T09:00:00Z" },
    ],
  },
  {
    id: "ship-003",
    orderNumber: "FD-PQ9C4-W3AS",
    trackingNumber: "NV-PH2024011409876",
    carrier: "Ninja Van",
    status: "delivered",
    productName: "Fresh Calamansi",
    productImage: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=600",
    quantity: 30,
    unit: "kg",
    buyerName: "Maria Santos",
    buyerAddress: "456 Sampaguita St, Quezon City",
    farmerName: "Juan dela Cruz",
    farmerAddress: "789 Citrus Farm Rd, Lipa, Batangas",
    weight: 32,
    estimatedDelivery: "2024-01-13T17:00:00Z",
    deliveredAt: "2024-01-13T15:30:00Z",
    createdAt: "2024-01-11T09:00:00Z",
    events: [
      { id: "ev-010", status: "label_created", location: "Lipa, Batangas", description: "Shipping label created", occurredAt: "2024-01-11T09:00:00Z" },
      { id: "ev-011", status: "picked_up", location: "Lipa, Batangas", description: "Package collected from farmer", occurredAt: "2024-01-11T14:00:00Z" },
      { id: "ev-012", status: "in_transit", location: "Ninja Van Hub, Batangas", description: "Package at sorting center", occurredAt: "2024-01-12T06:00:00Z" },
      { id: "ev-013", status: "in_transit", location: "Ninja Van Hub, Manila", description: "Arrived at destination hub", occurredAt: "2024-01-13T04:00:00Z" },
      { id: "ev-014", status: "out_for_delivery", location: "Quezon City", description: "Out for delivery", occurredAt: "2024-01-13T10:00:00Z" },
      { id: "ev-015", status: "delivered", location: "Quezon City", description: "Package delivered successfully", occurredAt: "2024-01-13T15:30:00Z" },
    ],
  },
  {
    id: "ship-004",
    orderNumber: "FD-RS5D1-K8BT",
    trackingNumber: "GRB-2024011412345",
    carrier: "Grab Express",
    status: "picked_up",
    productName: "Free-Range Eggs",
    productImage: "https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?w=600",
    quantity: 60,
    unit: "pieces",
    buyerName: "Elena Villanueva",
    buyerAddress: "234 Orchid Lane, Los Baños, Laguna",
    farmerName: "Antonio Garcia",
    farmerAddress: "567 Poultry Farm Rd, San Fernando, Pampanga",
    weight: 4,
    estimatedDelivery: "2024-01-15T14:00:00Z",
    deliveredAt: null,
    createdAt: "2024-01-14T11:00:00Z",
    events: [
      { id: "ev-016", status: "label_created", location: "San Fernando, Pampanga", description: "Shipping label created", occurredAt: "2024-01-14T11:00:00Z" },
      { id: "ev-017", status: "picked_up", location: "San Fernando, Pampanga", description: "Rider picked up package", occurredAt: "2024-01-14T13:00:00Z" },
    ],
  },
  {
    id: "ship-005",
    orderNumber: "FD-TU2E6-N4CV",
    trackingNumber: "FLX-PH2024011498765",
    carrier: "Flash Express",
    status: "label_created",
    productName: "Laguna Purple Yam (Ube)",
    productImage: "https://images.unsplash.com/photo-1546470427-0d62b9f43b2a?w=600",
    quantity: 15,
    unit: "kg",
    buyerName: "Antonio Garcia",
    buyerAddress: "567 Poultry Farm Rd, San Fernando, Pampanga",
    farmerName: "Elena Villanueva",
    farmerAddress: "890 Root Crops Ave, Los Baños, Laguna",
    weight: 16,
    estimatedDelivery: "2024-01-17T17:00:00Z",
    deliveredAt: null,
    createdAt: "2024-01-14T16:00:00Z",
    events: [
      { id: "ev-018", status: "label_created", location: "Los Baños, Laguna", description: "Shipping label created, awaiting pickup", occurredAt: "2024-01-14T16:00:00Z" },
    ],
  },
];
