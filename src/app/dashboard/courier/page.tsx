"use client";

import { useState } from "react";
import { Search, Truck, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ShipmentTracker } from "@/components/courier/shipment-tracker";
import { mockShipments } from "@/lib/mock-data/shipments";

const statusLabels: Record<string, string> = {
  label_created: "Label Created",
  picked_up: "Picked Up",
  in_transit: "In Transit",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  failed: "Failed",
};

const statusBadge: Record<string, "success" | "warning" | "info" | "danger" | "default"> = {
  label_created: "default",
  picked_up: "info",
  in_transit: "info",
  out_for_delivery: "warning",
  delivered: "success",
  failed: "danger",
};

export default function CourierPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredShipments = mockShipments.filter((s) => {
    const matchesSearch =
      s.productName.toLowerCase().includes(search.toLowerCase()) ||
      s.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.orderNumber.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedShipment = mockShipments.find((s) => s.id === selectedId);

  if (selectedShipment) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setSelectedId(null)}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          &larr; Back to shipments
        </button>
        <ShipmentTracker shipment={selectedShipment} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Courier & Tracking</h1>
        <p className="text-gray-600 mt-1">Track all your shipments</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by tracking number, order, or product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All Status</option>
          <option value="label_created">Label Created</option>
          <option value="picked_up">Picked Up</option>
          <option value="in_transit">In Transit</option>
          <option value="out_for_delivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      {/* Shipment List */}
      {filteredShipments.length > 0 ? (
        <div className="space-y-3">
          {filteredShipments.map((shipment) => (
            <button
              key={shipment.id}
              onClick={() => setSelectedId(shipment.id)}
              className="w-full text-left bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md hover:border-gray-200 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={shipment.productImage} alt={shipment.productName} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-medium text-gray-900">{shipment.productName}</h3>
                    <p className="text-xs text-gray-500">{shipment.carrier} &bull; {shipment.trackingNumber}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {shipment.quantity} {shipment.unit} &bull; To: {shipment.buyerName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={statusBadge[shipment.status]}>
                    {statusLabels[shipment.status]}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">
                    Est: {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Truck className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500">No shipments found.</p>
        </div>
      )}
    </div>
  );
}
