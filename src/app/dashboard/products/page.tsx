"use client";

import { useState } from "react";
import { Search, Plus, Package, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, getExpiryStatus } from "@/lib/utils";
import { mockProducts } from "@/lib/mock-data/products";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
          <p className="text-gray-600 mt-1">Manage your product listings</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Product Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product) => {
            const expiry = getExpiryStatus(product.expiryDate);
            return (
              <div key={product.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="aspect-video relative">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                  {product.isOrganic && (
                    <Badge variant="success" className="absolute top-2 left-2">Organic</Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
                  <p className="text-lg font-bold text-green-600 mt-1">
                    {formatCurrency(product.pricePerUnit)}<span className="text-sm font-normal text-gray-500">/{product.unit}</span>
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">Stock: {product.stockQuantity} {product.unit}</span>
                    <Badge variant={expiry.color === "green" ? "success" : expiry.color === "orange" ? "warning" : "danger"}>
                      {expiry.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <span>{product.viewCount} views</span>
                    <span>{product.orderCount} orders</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500">No products found.</p>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Add New Product</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input type="text" placeholder="e.g., Fresh Tomatoes" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per Unit (₱)</label>
                  <input type="number" placeholder="0.00" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500">
                    <option>kg</option>
                    <option>piece</option>
                    <option>bundle</option>
                    <option>sack</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={3} placeholder="Describe your product..." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">Cancel</Button>
                <Button className="flex-1">Add Product</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
