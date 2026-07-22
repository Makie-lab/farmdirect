export interface IngredientMatch {
  ingredient: string;
  nutritionFacts: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
    vitamins: string[];
  };
  matchedProducts: {
    id: string;
    name: string;
    slug: string;
    price: number;
    unit: string;
    farmerName: string;
    farmLocation: string;
    farmerAvatar: string;
    imageUrl: string;
  }[];
}

export const foodAnalysisResults: Record<string, IngredientMatch[]> = {
  sinigang: [
    {
      ingredient: "Tomatoes",
      nutritionFacts: { calories: 18, protein: "0.9g", carbs: "3.9g", fat: "0.2g", fiber: "1.2g", vitamins: ["Vitamin C", "Vitamin K", "Potassium"] },
      matchedProducts: [
        { id: "prod-001", name: "Fresh Calamansi", slug: "fresh-calamansi", price: 80, unit: "kg", farmerName: "Juan dela Cruz", farmLocation: "Lipa, Batangas", farmerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", imageUrl: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=200" },
      ],
    },
    {
      ingredient: "Kangkong (Water Spinach)",
      nutritionFacts: { calories: 19, protein: "2.6g", carbs: "3.1g", fat: "0.2g", fiber: "2.1g", vitamins: ["Vitamin A", "Vitamin C", "Iron"] },
      matchedProducts: [
        { id: "prod-009", name: "Organic Kangkong", slug: "organic-kangkong", price: 60, unit: "kg", farmerName: "Lorna Bautista", farmLocation: "Tarlac City, Tarlac", farmerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100", imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200" },
      ],
    },
    {
      ingredient: "Ginger (Luya)",
      nutritionFacts: { calories: 80, protein: "1.8g", carbs: "17.8g", fat: "0.8g", fiber: "2g", vitamins: ["Vitamin B6", "Magnesium", "Manganese"] },
      matchedProducts: [
        { id: "prod-011", name: "Fresh Ginger (Luya)", slug: "fresh-ginger-luya", price: 140, unit: "kg", farmerName: "Ramon Bukidnon", farmLocation: "Malaybalay, Bukidnon", farmerAvatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100", imageUrl: "https://images.unsplash.com/photo-1615485500710-aa71860d4026?w=200" },
      ],
    },
    {
      ingredient: "Bangus (Milkfish)",
      nutritionFacts: { calories: 148, protein: "20.5g", carbs: "0g", fat: "6.7g", fiber: "0g", vitamins: ["Omega-3", "Vitamin D", "Calcium"] },
      matchedProducts: [
        { id: "prod-008", name: "Fresh Bangus (Milkfish)", slug: "fresh-bangus-milkfish", price: 280, unit: "kg", farmerName: "Roberto Pangasinan", farmLocation: "Dagupan, Pangasinan", farmerAvatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100", imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200" },
      ],
    },
  ],
  adobo: [
    {
      ingredient: "Garlic",
      nutritionFacts: { calories: 149, protein: "6.4g", carbs: "33g", fat: "0.5g", fiber: "2.1g", vitamins: ["Vitamin C", "Vitamin B6", "Manganese"] },
      matchedProducts: [
        { id: "prod-013", name: "Ilocos Garlic", slug: "ilocos-garlic", price: 250, unit: "kg", farmerName: "Manuel Ilocano", farmLocation: "Vigan, Ilocos Sur", farmerAvatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100", imageUrl: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2571?w=200" },
      ],
    },
    {
      ingredient: "Chicken / Pork",
      nutritionFacts: { calories: 239, protein: "27g", carbs: "0g", fat: "14g", fiber: "0g", vitamins: ["Vitamin B12", "Zinc", "Iron"] },
      matchedProducts: [
        { id: "prod-016", name: "Pampanga Sisig Meat", slug: "pampanga-sisig-meat", price: 320, unit: "kg", farmerName: "Chef Pampanga", farmLocation: "Angeles City, Pampanga", farmerAvatar: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=100", imageUrl: "https://images.unsplash.com/photo-1602473812169-caa80dad937e?w=200" },
      ],
    },
    {
      ingredient: "Rice",
      nutritionFacts: { calories: 130, protein: "2.7g", carbs: "28g", fat: "0.3g", fiber: "0.4g", vitamins: ["Thiamin", "Niacin", "Iron"] },
      matchedProducts: [
        { id: "prod-003", name: "Nueva Ecija Rice (Sinandomeng)", slug: "nueva-ecija-rice-sinandomeng", price: 55, unit: "kg", farmerName: "Pedro Reyes", farmLocation: "Cabanatuan, Nueva Ecija", farmerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", imageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=200" },
      ],
    },
  ],
  salad: [
    {
      ingredient: "Lettuce",
      nutritionFacts: { calories: 15, protein: "1.4g", carbs: "2.9g", fat: "0.2g", fiber: "1.3g", vitamins: ["Vitamin A", "Vitamin K", "Folate"] },
      matchedProducts: [
        { id: "prod-004", name: "Baguio Lettuce", slug: "baguio-lettuce", price: 120, unit: "kg", farmerName: "Rosa Mendoza", farmLocation: "Baguio City, Benguet", farmerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", imageUrl: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=200" },
      ],
    },
    {
      ingredient: "Strawberries",
      nutritionFacts: { calories: 32, protein: "0.7g", carbs: "7.7g", fat: "0.3g", fiber: "2g", vitamins: ["Vitamin C", "Manganese", "Folate"] },
      matchedProducts: [
        { id: "prod-002", name: "Benguet Strawberries", slug: "benguet-strawberries", price: 350, unit: "kg", farmerName: "Maria Santos", farmLocation: "La Trinidad, Benguet", farmerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200" },
      ],
    },
    {
      ingredient: "Eggs",
      nutritionFacts: { calories: 155, protein: "13g", carbs: "1.1g", fat: "11g", fiber: "0g", vitamins: ["Vitamin D", "Vitamin B12", "Selenium"] },
      matchedProducts: [
        { id: "prod-005", name: "Free-Range Eggs", slug: "free-range-eggs", price: 12, unit: "piece", farmerName: "Antonio Garcia", farmLocation: "San Fernando, Pampanga", farmerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", imageUrl: "https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?w=200" },
      ],
    },
  ],
};
