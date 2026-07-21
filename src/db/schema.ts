import {
  pgTable,
  text,
  varchar,
  integer,
  decimal,
  timestamp,
  boolean,
  pgEnum,
  uuid,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const userRoleEnum = pgEnum("user_role", ["farmer", "buyer"]);
export const productStatusEnum = pgEnum("product_status", ["active", "sold_out", "expired", "draft"]);
export const orderStatusEnum = pgEnum("order_status", ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"]);
export const dealStatusEnum = pgEnum("deal_status", ["open", "countered", "accepted", "rejected", "expired"]);
export const shipmentStatusEnum = pgEnum("shipment_status", ["label_created", "picked_up", "in_transit", "out_for_delivery", "delivered", "failed"]);
export const messageTypeEnum = pgEnum("message_type", ["text", "image", "deal_offer", "system"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  role: userRoleEnum("role").notNull(),
  avatarUrl: text("avatar_url"),
  phone: varchar("phone", { length: 50 }),
  address: text("address"),
  farmName: varchar("farm_name", { length: 255 }),
  farmLocation: varchar("farm_location", { length: 255 }),
  farmDescription: text("farm_description"),
  bio: text("bio"),
  isVerified: boolean("is_verified").default(false).notNull(),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0.00"),
  totalReviews: integer("total_reviews").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  icon: varchar("icon", { length: 50 }),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  farmerId: uuid("farmer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  categoryId: uuid("category_id").references(() => categories.id),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  description: text("description"),
  pricePerUnit: decimal("price_per_unit", { precision: 10, scale: 2 }).notNull(),
  unit: varchar("unit", { length: 50 }).notNull(),
  stockQuantity: decimal("stock_quantity", { precision: 10, scale: 2 }).notNull(),
  minOrderQuantity: decimal("min_order_quantity", { precision: 10, scale: 2 }).default("1"),
  imageUrl: text("image_url"),
  images: jsonb("images").$type<string[]>().default([]),
  harvestDate: timestamp("harvest_date"),
  expiryDate: timestamp("expiry_date"),
  isOrganic: boolean("is_organic").default(false).notNull(),
  status: productStatusEnum("status").default("active").notNull(),
  viewCount: integer("view_count").default(0).notNull(),
  orderCount: integer("order_count").default(0).notNull(),
  tags: jsonb("tags").$type<string[]>().default([]),
  location: varchar("location", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderNumber: varchar("order_number", { length: 50 }).notNull().unique(),
  buyerId: uuid("buyer_id").notNull().references(() => users.id),
  farmerId: uuid("farmer_id").notNull().references(() => users.id),
  productId: uuid("product_id").notNull().references(() => products.id),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: orderStatusEnum("status").default("pending").notNull(),
  deliveryAddress: text("delivery_address").notNull(),
  deliveryNotes: text("delivery_notes"),
  dealId: uuid("deal_id"),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const deals = pgTable("deals", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  buyerId: uuid("buyer_id").notNull().references(() => users.id),
  farmerId: uuid("farmer_id").notNull().references(() => users.id),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }).notNull(),
  proposedPrice: decimal("proposed_price", { precision: 10, scale: 2 }).notNull(),
  counterPrice: decimal("counter_price", { precision: 10, scale: 2 }),
  finalPrice: decimal("final_price", { precision: 10, scale: 2 }),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  unit: varchar("unit", { length: 50 }).notNull(),
  status: dealStatusEnum("status").default("open").notNull(),
  buyerMessage: text("buyer_message"),
  farmerMessage: text("farmer_message"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const conversations = pgTable("conversations", {
  id: uuid("id").primaryKey().defaultRandom(),
  farmerId: uuid("farmer_id").notNull().references(() => users.id),
  buyerId: uuid("buyer_id").notNull().references(() => users.id),
  productId: uuid("product_id").references(() => products.id),
  lastMessageAt: timestamp("last_message_at").defaultNow(),
  isArchivedByFarmer: boolean("is_archived_by_farmer").default(false).notNull(),
  isArchivedByBuyer: boolean("is_archived_by_buyer").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  conversationId: uuid("conversation_id").notNull().references(() => conversations.id, { onDelete: "cascade" }),
  senderId: uuid("sender_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  type: messageTypeEnum("type").default("text").notNull(),
  attachmentUrl: text("attachment_url"),
  dealId: uuid("deal_id").references(() => deals.id),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const shipments = pgTable("shipments", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }).unique(),
  trackingNumber: varchar("tracking_number", { length: 100 }).notNull().unique(),
  carrier: varchar("carrier", { length: 100 }).notNull(),
  status: shipmentStatusEnum("status").default("label_created").notNull(),
  originAddress: text("origin_address").notNull(),
  destinationAddress: text("destination_address").notNull(),
  estimatedDelivery: timestamp("estimated_delivery"),
  deliveredAt: timestamp("delivered_at"),
  weight: decimal("weight", { precision: 8, scale: 2 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const shipmentEvents = pgTable("shipment_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  shipmentId: uuid("shipment_id").notNull().references(() => shipments.id, { onDelete: "cascade" }),
  status: varchar("status", { length: 100 }).notNull(),
  location: varchar("location", { length: 255 }),
  description: text("description"),
  occurredAt: timestamp("occurred_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id").notNull().references(() => orders.id).unique(),
  reviewerId: uuid("reviewer_id").notNull().references(() => users.id),
  revieweeId: uuid("reviewee_id").notNull().references(() => users.id),
  productId: uuid("product_id").references(() => products.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 100 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  link: text("link"),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type Deal = typeof deals.$inferSelect;
export type NewDeal = typeof deals.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
export type Conversation = typeof conversations.$inferSelect;
export type Shipment = typeof shipments.$inferSelect;
export type ShipmentEvent = typeof shipmentEvents.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
