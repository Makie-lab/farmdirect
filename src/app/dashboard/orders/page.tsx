"use client";

import { useState } from "react";
import { Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const mockOrders = [
  { id: "FD-LK8A3-X2YP", product: "Nueva Ecija Rice (Sinandomeng)", buyer: "Carlos Aquino", quantity: "200 kg", amount: 10000, status: "shipped", date: "2024-01-13" },
  { id: "FD-MN7B2-Q1ZR", product: "Benguet Strawberries", buyer: "Rosa Mendoza", quantity: "10 kg", amount: 3500, status: "out_for_delivery", date: "2024-01-12" },
  { id: "FD-PQ9C4-W3AS", product: "Fresh Calamansi", buyer: "Maria Santos", quantity: "30 kg", amount: 2400, status: "delivered", date: "2024-01-11" },
  { id: "FD-RS5D1-K8BT", product: "Free-Range Eggs", buyer: "Elena Villanueva", quantity: "60 pcs", amount: 720, status: "processing", date: "2024-01-14" },
  { id: "FD-TU2E6-N4CV", product: "Laguna Purple Yam", buyer: "Antonio Garcia", quantity: "15 kg", amount: 2250, status: "pending", date: "2024-01-14" },
  { id: "FD-VW3F7-M5DX", product: "Fresh Basil", buyer: "Maria Santos", quantity: "2 kg", amount: 400, status: "cancelled", date: "2024-01-10" },
];

const statusTabs = ["all", "pending", "processing", "shipped", "out_for_delivery", "delivered", "cancelled"];
const statusColors: Record<string, "success" | "warning" | "info" | "danger" | "default"> = {
  pending: "default",
  processing: "warning",
  shipped: "info",
  out_for_delivery: "info",
  delivered: "success",
  cancelled: "danger",
};

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filtered = mockOrders.filter((o) => {
    const matchesSearch =
      o.product.toLowerCase().includes(search.toLowerCase()) ||
      o.buyer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = activeTab === "all" || o.status === activeTab;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-1">Manage your incoming orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {statusTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors capitalize ${
              activeTab === tab
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab === "all" ? "All" : tab.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      {filtered.length > 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Order</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Buyer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Qty</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">{order.id}</span>
                      <br />
                      <span className="text-xs text-gray-500">{order.date}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{order.product}</td>
                    <td className="py-3 px-4 text-gray-700">{order.buyer}</td>
                    <td className="py-3 px-4 text-gray-700">{order.quantity}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">{formatCurrency(order.amount)}</td>
                    <td className="py-3 px-4">
                      <Badge variant={statusColors[order.status]}>
                        {order.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {order.status === "pending" && (
                        <Button size="sm" variant="outline">Confirm</Button>
                      )}
                      {order.status === "processing" && (
                        <Button size="sm" variant="outline">Ship</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500">No orders found.</p>
        </div>
      )}
    </div>
  );
}
