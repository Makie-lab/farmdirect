"use client";

import { ArrowRight, Check, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { MockDeal } from "@/lib/mock-data/deals";

interface DealCardProps {
  deal: MockDeal;
  userRole: "farmer" | "buyer";
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onCounter?: (id: string) => void;
}

const statusConfig: Record<string, { variant: "success" | "warning" | "danger" | "info" | "default"; label: string }> = {
  open: { variant: "info", label: "Open" },
  countered: { variant: "warning", label: "Countered" },
  accepted: { variant: "success", label: "Accepted" },
  rejected: { variant: "danger", label: "Rejected" },
  expired: { variant: "default", label: "Expired" },
};

export function DealCard({ deal, userRole, onAccept, onReject, onCounter }: DealCardProps) {
  const config = statusConfig[deal.status];
  const showActions =
    (userRole === "farmer" && deal.status === "open") ||
    (userRole === "buyer" && deal.status === "countered");

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img src={deal.productImage} alt={deal.productName} className="w-12 h-12 rounded-lg object-cover" />
          <div>
            <h3 className="font-medium text-gray-900">{deal.productName}</h3>
            <p className="text-xs text-gray-500">
              {deal.quantity} {deal.unit} &bull; {userRole === "farmer" ? deal.buyerName : deal.farmerName}
            </p>
          </div>
        </div>
        <Badge variant={config.variant}>{config.label}</Badge>
      </div>

      {/* Price Flow */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="text-center">
            <p className="text-xs text-gray-500">Original</p>
            <p className="text-sm font-medium text-gray-700">{formatCurrency(deal.originalPrice)}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div className="text-center">
            <p className="text-xs text-gray-500">Proposed</p>
            <p className="text-sm font-medium text-blue-600">{formatCurrency(deal.proposedPrice)}</p>
          </div>
          {deal.counterPrice && (
            <>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <div className="text-center">
                <p className="text-xs text-gray-500">Counter</p>
                <p className="text-sm font-medium text-orange-600">{formatCurrency(deal.counterPrice)}</p>
              </div>
            </>
          )}
          {deal.finalPrice && (
            <>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <div className="text-center">
                <p className="text-xs text-gray-500">Final</p>
                <p className="text-sm font-bold text-green-600">{formatCurrency(deal.finalPrice)}</p>
              </div>
            </>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">Per {deal.unit}</p>
      </div>

      {/* Messages */}
      {deal.buyerMessage && (
        <div className="mb-2">
          <p className="text-xs text-gray-500 mb-1">Buyer:</p>
          <p className="text-sm text-gray-700 bg-blue-50 px-3 py-2 rounded-lg">{deal.buyerMessage}</p>
        </div>
      )}
      {deal.farmerMessage && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Farmer:</p>
          <p className="text-sm text-gray-700 bg-green-50 px-3 py-2 rounded-lg">{deal.farmerMessage}</p>
        </div>
      )}

      {/* Expiry */}
      {(deal.status === "open" || deal.status === "countered") && (
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
          <Clock className="w-3.5 h-3.5" />
          <span>Expires: {new Date(deal.expiresAt).toLocaleDateString()}</span>
        </div>
      )}

      {/* Actions */}
      {showActions && (
        <div className="flex gap-2">
          <Button size="sm" onClick={() => onAccept?.(deal.id)} className="flex-1">
            <Check className="w-4 h-4 mr-1" /> Accept
          </Button>
          <Button size="sm" variant="outline" onClick={() => onCounter?.(deal.id)} className="flex-1">
            Counter
          </Button>
          <Button size="sm" variant="danger" onClick={() => onReject?.(deal.id)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
