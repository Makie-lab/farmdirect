"use client";

import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import {
  revenueByMonth,
  weeklyOrderVolume,
  demandByCategory,
  priceComparisonData,
  topProducts,
  leastSoughtProducts,
  expiryRiskData,
} from "@/lib/mock-data/analytics";

const trendIcons = {
  up: <TrendingUp className="w-4 h-4 text-green-600" />,
  down: <TrendingDown className="w-4 h-4 text-red-500" />,
  stable: <Minus className="w-4 h-4 text-gray-400" />,
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Track your farm performance and market insights</p>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardTitle>Revenue Overview</CardTitle>
        <div className="h-72 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} tickFormatter={(v) => `₱${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Area type="monotone" dataKey="revenue" stroke="#16a34a" fill="#dcfce7" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Orders */}
        <Card>
          <CardTitle>Weekly Order Volume</CardTitle>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyOrderVolume}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="orders" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Demand vs Supply */}
        <Card>
          <CardTitle>Demand vs Supply</CardTitle>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandByCategory} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" fontSize={12} />
                <YAxis type="category" dataKey="category" fontSize={11} width={90} />
                <Tooltip />
                <Legend />
                <Bar dataKey="demand" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                <Bar dataKey="supply" fill="#22c55e" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Price Comparison */}
      <Card>
        <CardTitle>Price Comparison (per unit)</CardTitle>
        <div className="h-72 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priceComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="product" fontSize={11} />
              <YAxis fontSize={12} tickFormatter={(v) => `₱${v}`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Bar dataKey="farmdirect" name="FarmDirect" fill="#16a34a" radius={[4, 4, 0, 0]} />
              <Bar dataKey="middleman" name="Middleman" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="market" name="Market" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardTitle>Top Products</CardTitle>
          <div className="mt-4 space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-400 w-5">{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.orders} orders</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(p.revenue)}</span>
                  {trendIcons[p.trend]}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Least Sought */}
        <Card>
          <CardTitle>Least Sought Products</CardTitle>
          <div className="mt-4 space-y-3">
            {leastSoughtProducts.map((p) => (
              <div key={p.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.reason}</p>
                </div>
                <span className="text-sm text-gray-500">{p.orders} orders</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Expiry Risk */}
      <Card>
        <CardTitle>Expiry Risk</CardTitle>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-medium text-gray-500">Product</th>
                <th className="text-left py-2 font-medium text-gray-500">Days Left</th>
                <th className="text-left py-2 font-medium text-gray-500">Quantity</th>
                <th className="text-left py-2 font-medium text-gray-500">Urgency</th>
              </tr>
            </thead>
            <tbody>
              {expiryRiskData.map((item) => (
                <tr key={item.product} className="border-b border-gray-50">
                  <td className="py-3 text-gray-900">{item.product}</td>
                  <td className="py-3">{item.daysLeft} days</td>
                  <td className="py-3">{item.quantity} units</td>
                  <td className="py-3">
                    <Badge variant={item.urgency === "critical" ? "danger" : item.urgency === "warning" ? "warning" : "default"}>
                      {item.urgency}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
