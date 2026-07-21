import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(date);
}

export function generateOrderNumber(): string {
  const prefix = "FD";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function generateTrackingNumber(): string {
  const prefix = "TRK";
  const num = Math.random().toString().substring(2, 14);
  return `${prefix}${num}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function getExpiryStatus(expiryDate: Date | string | null): {
  label: string;
  color: string;
} {
  if (!expiryDate) return { label: "No expiry", color: "gray" };
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffDays = Math.floor((expiry.getTime() - now.getTime()) / 86400000);

  if (diffDays < 0) return { label: "Expired", color: "red" };
  if (diffDays <= 2) return { label: "Expiring soon", color: "orange" };
  if (diffDays <= 7) return { label: `${diffDays} days left`, color: "yellow" };
  return { label: `${diffDays} days left`, color: "green" };
}
