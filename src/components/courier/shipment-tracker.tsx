"use client";

import { Package, MapPin, Truck, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MockShipment } from "@/lib/mock-data/shipments";

interface ShipmentTrackerProps {
  shipment: MockShipment;
}

const statusSteps = ["label_created", "picked_up", "in_transit", "out_for_delivery", "delivered"];
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

export function ShipmentTracker({ shipment }: ShipmentTrackerProps) {
  const currentStepIndex = statusSteps.indexOf(shipment.status);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-semibold text-gray-900">{shipment.productName}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{shipment.carrier} &bull; {shipment.trackingNumber}</p>
        </div>
        <Badge variant={statusBadge[shipment.status]} size="md">
          {statusLabels[shipment.status]}
        </Badge>
      </div>

      {/* Progress Steps */}
      <div className="mb-6">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200" />
          <div
            className="absolute top-4 left-0 h-0.5 bg-green-500 transition-all"
            style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
          />
          {statusSteps.map((step, i) => {
            const isCompleted = i <= currentStepIndex;
            const isCurrent = i === currentStepIndex;
            return (
              <div key={step} className="relative flex flex-col items-center z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-400"
                  } ${isCurrent ? "ring-4 ring-green-100" : ""}`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                </div>
                <span className="text-xs text-gray-500 mt-2 text-center max-w-[60px]">
                  {statusLabels[step]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Package Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Package</span>
          </div>
          <p className="text-sm text-gray-600">{shipment.quantity} {shipment.unit} &bull; {shipment.weight}kg</p>
          <p className="text-xs text-gray-500 mt-1">Order: {shipment.orderNumber}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Delivery</span>
          </div>
          <p className="text-sm text-gray-600">
            Est: {new Date(shipment.estimatedDelivery).toLocaleDateString()}
          </p>
          {shipment.deliveredAt && (
            <p className="text-xs text-green-600 mt-1">
              Delivered: {new Date(shipment.deliveredAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      {/* Route */}
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <div className="w-0.5 h-8 bg-gray-200" />
            <div className="w-3 h-3 rounded-full bg-red-500" />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <p className="text-xs text-gray-500">From</p>
              <p className="text-sm text-gray-900">{shipment.farmerName}</p>
              <p className="text-xs text-gray-500">{shipment.farmerAddress}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">To</p>
              <p className="text-sm text-gray-900">{shipment.buyerName}</p>
              <p className="text-xs text-gray-500">{shipment.buyerAddress}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Tracking History</h4>
        <div className="space-y-3">
          {[...shipment.events].reverse().map((event) => (
            <div key={event.id} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-900">{event.description}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{event.location}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(event.occurredAt).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
