"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Sprout, LayoutDashboard, ShoppingBag, MessageSquare, Handshake, BarChart3, Truck, Package, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavItem { label: string; href: string; icon: React.ReactNode; }

const farmerNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "My Products", href: "/dashboard/products", icon: <Package className="w-5 h-5" /> },
  { label: "Marketplace", href: "/marketplace", icon: <ShoppingBag className="w-5 h-5" /> },
  { label: "Messages", href: "/dashboard/messages", icon: <MessageSquare className="w-5 h-5" /> },
  { label: "Deals", href: "/dashboard/deals", icon: <Handshake className="w-5 h-5" /> },
  { label: "Analytics", href: "/dashboard/analytics", icon: <BarChart3 className="w-5 h-5" /> },
  { label: "Courier", href: "/dashboard/courier", icon: <Truck className="w-5 h-5" /> },
];

const buyerNavItems: NavItem[] = [
  { label: "Marketplace", href: "/marketplace", icon: <ShoppingBag className="w-5 h-5" /> },
  { label: "Messages", href: "/dashboard/messages", icon: <MessageSquare className="w-5 h-5" /> },
  { label: "Deals", href: "/dashboard/deals", icon: <Handshake className="w-5 h-5" /> },
  { label: "Courier", href: "/dashboard/courier", icon: <Truck className="w-5 h-5" /> },
];

interface SidebarProps { userRole: "farmer" | "buyer"; userName: string; }

export function Sidebar({ userRole, userName }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navItems = userRole === "farmer" ? farmerNavItems : buyerNavItems;

  return (
    <>
      <button onClick={() => setIsMobileOpen(true)} className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200">
        <Menu className="w-5 h-5 text-gray-600" />
      </button>
      {isMobileOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileOpen(false)} />}
      <aside className={cn("fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-50 transition-transform lg:translate-x-0", isMobileOpen ? "translate-x-0" : "-translate-x-full")}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <Link href="/marketplace" className="flex items-center gap-2">
            <Sprout className="w-7 h-7 text-green-600" />
            <span className="text-xl font-bold text-gray-900">FarmDirect</span>
          </Link>
          <button onClick={() => setIsMobileOpen(false)} className="lg:hidden p-1 rounded hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} onClick={() => setIsMobileOpen(false)} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors", isActive ? "bg-green-50 text-green-700 border border-green-100" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900")}>
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <UserButton />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
              <p className="text-xs text-gray-500 capitalize">{userRole}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
