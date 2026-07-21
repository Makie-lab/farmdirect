"use client";

import { useState } from "react";
import { Handshake } from "lucide-react";
import { DealCard } from "@/components/deals/deal-card";
import { mockDeals } from "@/lib/mock-data/deals";
import { formatCurrency } from "@/lib/utils";

const tabs = [
  { key: "all", label: "All Deals" },
  { key: "open", label: "Open" },
  { key: "countered", label: "Countered" },
  { key: "accepted", label: "Accepted" },
  { key: "rejected", label: "Rejected" },
  { key: "expired", label: "Expired" },
];

export default function DealsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredDeals = activeTab === "all"
    ? mockDeals
    : mockDeals.filter((d) => d.status === activeTab);

  const totalSavings = mockDeals
    .filter((d) => d.status === "accepted")
    .reduce((sum, d) => sum + d.savings, 0);

  const acceptedCount = mockDeals.filter((d) => d.status === "accepted").length;
  const pendingCount = mockDeals.filter((d) => d.status === "open" || d.status === "countered").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Deals</h1>
        <p className="text-gray-600 mt-1">Manage your price negotiations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <Handshake className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Savings</p>
            <p className="text-lg font-bold text-green-600">{formatCurrency(totalSavings)}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Accepted Deals</p>
          <p className="text-lg font-bold text-gray-900">{acceptedCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Pending Deals</p>
          <p className="text-lg font-bold text-gray-900">{pendingCount}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Deal Cards */}
      {filteredDeals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDeals.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              userRole="farmer"
              onAccept={(id) => console.log("Accept:", id)}
              onReject={(id) => console.log("Reject:", id)}
              onCounter={(id) => console.log("Counter:", id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Handshake className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500">No deals found for this filter.</p>
        </div>
      )}
    </div>
  );
}
