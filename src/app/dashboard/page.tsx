"use client";

import { DollarSign, ShoppingBag, Package, Star, AlertTriangle, Handshake, Plus, BarChart3, MessageSquare, Truck } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { dashboardStats, expiryRiskData } from "@/lib/mock-data/analytics";
import { mockDeals } from "@/lib/mock-data/deals";

const recentOrders = [
  { id: "FD-LK8A3-X2YP", product: "Nueva Ecija Rice", buyer: "Carlos Aquino", amount: 10000, status: "shipped" },
  { id: "FD-MN7B2-Q1ZR", product: "Benguet Strawberries", buyer: "Rosa Mendoza", amount: 3500, status: "out_for_delivery" },
  { id: "FD-PQ9C4-W3AS", product: "Fresh Calamansi", buyer: "Maria Santos", amount: 2400, status: "delivered" },
  { id: "FD-RS5D1-K8BT", product: "Free-Range Eggs", buyer: "Elena Villanueva", amount: 720, status: "processing" },
];

const statusColors: Record<string, "success" | "warning" | "info" | "default"> = {
  delivered: "success",
  shipped: "info",
  out_for_delivery: "info",
  processing: "warning",
  pending: "default",
};

const quickActions = [
  { icon: <Plus className="w-5 h-5" />, label: "Add Product", href: "/dashboard/products" },
  { icon: <BarChart3 className="w-5 h-5" />, label: "Analytics", href: "/dashboard/analytics" },
  { icon: <MessageSquare className="w-5 h-5" />, label: "Messages", href: "/dashboard/messages" },
  { icon: <Truck className="w-5 h-5" />, label: "Shipments", href: "/dashboard/courier" },
];

export default function DashboardPage() {
  const pendingDeals = mockDeals.filter((d) => d.status === "open" || d.status === "countered");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here is an overview of your farm.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(dashboardStats.totalRevenue)}</p>
              <p className="text-xs text-green-600">+{dashboardStats.revenueChange}%</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-xl font-bold text-gray-900">{dashboardStats.totalOrders.toLocaleString()}</p>
              <p className="text-xs text-green-600">+{dashboardStats.ordersChange}%</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Products</p>
              <p className="text-xl font-bold text-gray-900">{dashboardStats.activeProducts}</p>
              <p className="text-xs text-green-600">+{dashboardStats.productsChange} new</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Rating</p>
              <p className="text-xl font-bold text-gray-900">{dashboardStats.averageRating}</p>
              <p className="text-xs text-green-600">+{dashboardStats.ratingChange}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <Link href="/dashboard/orders" className="text-sm text-green-600 hover:text-green-700">View all</Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{order.product}</p>
                  <p className="text-xs text-gray-500">{order.buyer} &bull; {order.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{formatCurrency(order.amount)}</p>
                  <Badge variant={statusColors[order.status]}>{order.status.replace("_", " ")}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Expiring Products */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <h3 className="font-semibold text-gray-900">Expiring Soon</h3>
            </div>
            <div className="space-y-2">
              {expiryRiskData.slice(0, 3).map((item) => (
                <div key={item.product} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item.product}</span>
                  <Badge variant={item.urgency === "critical" ? "danger" : "warning"}>
                    {item.daysLeft}d left
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Pending Deals */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Handshake className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Pending Deals</h3>
            </div>
            {pendingDeals.length > 0 ? (
              <div className="space-y-2">
                {pendingDeals.map((deal) => (
                  <div key={deal.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{deal.productName}</p>
                      <p className="text-xs text-gray-500">{deal.buyerName}</p>
                    </div>
                    <Badge variant={deal.status === "open" ? "info" : "warning"}>{deal.status}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No pending deals</p>
            )}
            <Link href="/dashboard/deals" className="block mt-3 text-sm text-green-600 hover:text-green-700">
              View all deals
            </Link>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <Link key={action.label} href={action.href}>
                  <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
                    {action.icon}
                    <span className="text-xs">{action.label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
