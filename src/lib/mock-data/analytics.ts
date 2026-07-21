export const revenueByMonth = [
  { month: "Jul", revenue: 45000 },
  { month: "Aug", revenue: 52000 },
  { month: "Sep", revenue: 48000 },
  { month: "Oct", revenue: 61000 },
  { month: "Nov", revenue: 55000 },
  { month: "Dec", revenue: 72000 },
  { month: "Jan", revenue: 68000 },
];

export const demandByCategory = [
  { category: "Vegetables", demand: 320, supply: 280 },
  { category: "Fruits", demand: 250, supply: 200 },
  { category: "Grains & Rice", demand: 400, supply: 450 },
  { category: "Root Crops", demand: 150, supply: 120 },
  { category: "Herbs & Spices", demand: 100, supply: 80 },
  { category: "Poultry & Eggs", demand: 280, supply: 250 },
  { category: "Dairy", demand: 180, supply: 140 },
  { category: "Seafood", demand: 220, supply: 190 },
];


export const topProducts = [
  { name: "Nueva Ecija Rice", orders: 312, revenue: 17160, trend: "up" as const },
  { name: "Fresh Bangus", orders: 234, revenue: 65520, trend: "up" as const },
  { name: "Free-Range Eggs", orders: 201, revenue: 2412, trend: "stable" as const },
  { name: "Laguna Purple Yam", orders: 145, revenue: 21750, trend: "up" as const },
  { name: "Benguet Strawberries", orders: 124, revenue: 43400, trend: "down" as const },
  { name: "Baguio Lettuce", orders: 89, revenue: 10680, trend: "stable" as const },
  { name: "Fresh Calamansi", orders: 56, revenue: 4480, trend: "up" as const },
  { name: "Fresh Basil", orders: 45, revenue: 9000, trend: "down" as const },
];

export const leastSoughtProducts = [
  { name: "Dragon Fruit", orders: 3, reason: "High price point" },
  { name: "Organic Quinoa", orders: 5, reason: "Low awareness" },
  { name: "Fresh Wasabi", orders: 2, reason: "Niche market" },
  { name: "Saffron", orders: 1, reason: "Very expensive" },
  { name: "Purple Corn", orders: 7, reason: "Seasonal only" },
];

export const priceComparisonData = [
  { product: "Rice (kg)", farmdirect: 55, middleman: 68, market: 75 },
  { product: "Calamansi (kg)", farmdirect: 80, middleman: 110, market: 130 },
  { product: "Lettuce (kg)", farmdirect: 120, middleman: 155, market: 180 },
  { product: "Eggs (pc)", farmdirect: 12, middleman: 15, market: 18 },
  { product: "Bangus (kg)", farmdirect: 280, middleman: 340, market: 380 },
];

export const weeklyOrderVolume = [
  { day: "Mon", orders: 45 },
  { day: "Tue", orders: 52 },
  { day: "Wed", orders: 38 },
  { day: "Thu", orders: 61 },
  { day: "Fri", orders: 55 },
  { day: "Sat", orders: 72 },
  { day: "Sun", orders: 48 },
];

export const expiryRiskData = [
  { product: "Baguio Lettuce", daysLeft: 2, quantity: 45, urgency: "critical" as const },
  { product: "Fresh Basil", daysLeft: 3, quantity: 12, urgency: "critical" as const },
  { product: "Fresh Bangus", daysLeft: 3, quantity: 30, urgency: "critical" as const },
  { product: "Benguet Strawberries", daysLeft: 5, quantity: 80, urgency: "warning" as const },
  { product: "Fresh Calamansi", daysLeft: 9, quantity: 200, urgency: "moderate" as const },
];

export const dashboardStats = {
  totalRevenue: 401402,
  revenueChange: 12.5,
  totalOrders: 1206,
  ordersChange: 8.3,
  activeProducts: 8,
  productsChange: 2,
  averageRating: 4.68,
  ratingChange: 0.1,
};
