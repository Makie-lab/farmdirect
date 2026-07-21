"use client";

import { useState } from "react";
import { Search, Plus, Package, X, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, getExpiryStatus } from "@/lib/utils";
import { mockProducts } from "@/lib/mock-data/products";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    unit: "kg",
    stock: "",
    description: "",
    category: "vegetables",
    location: "",
    expiryDate: "",
    harvestDate: "",
    isOrganic: false,
  });
  const [productAdded, setProductAdded] = useState(false);

  const filtered = mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddProduct = () => {
    setProductAdded(true);
    setTimeout(() => {
      setShowAddModal(false);
      setProductAdded(false);
      setNewProduct({
        name: "",
        price: "",
        unit: "kg",
        stock: "",
        description: "",
        category: "vegetables",
        location: "",
        expiryDate: "",
        harvestDate: "",
        isOrganic: false,
      });
    }, 2000);
  };

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
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{product.farmLocation}</span>
                  </div>
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
          <div className="bg-white rounded-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Add New Product</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {productAdded ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Product Added!</h3>
                <p className="text-sm text-gray-500">Your product is now visible to buyers in the marketplace.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="e.g., Fresh Organic Tomatoes"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="grains-rice">Grains & Rice</option>
                    <option value="root-crops">Root Crops</option>
                    <option value="herbs-spices">Herbs & Spices</option>
                    <option value="poultry-eggs">Poultry & Eggs</option>
                    <option value="dairy">Dairy</option>
                    <option value="seafood">Seafood</option>
                  </select>
                </div>

                {/* Price & Unit */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price per Unit (₱) *</label>
                    <input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="0.00"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit *</label>
                    <select
                      value={newProduct.unit}
                      onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="kg">kg</option>
                      <option value="piece">piece</option>
                      <option value="bundle">bundle</option>
                      <option value="sack">sack</option>
                      <option value="liter">liter</option>
                      <option value="tray">tray</option>
                    </select>
                  </div>
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    placeholder="Available quantity"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-green-600" /> Farm Location *</span>
                  </label>
                  <input
                    type="text"
                    value={newProduct.location}
                    onChange={(e) => setNewProduct({ ...newProduct, location: e.target.value })}
                    placeholder="e.g., Benguet, Cordillera Region"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-green-600" /> Harvest Date</span>
                    </label>
                    <input
                      type="date"
                      value={newProduct.harvestDate}
                      onChange={(e) => setNewProduct({ ...newProduct, harvestDate: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-orange-500" /> Expiration Date *</span>
                    </label>
                    <input
                      type="date"
                      value={newProduct.expiryDate}
                      onChange={(e) => setNewProduct({ ...newProduct, expiryDate: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <p className="text-[10px] text-orange-600 mt-1">Set the date your product expires to alert buyers</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    rows={3}
                    placeholder="Describe your product — freshness, quality, farming practices..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  />
                </div>

                {/* Organic */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="organic"
                    checked={newProduct.isOrganic}
                    onChange={(e) => setNewProduct({ ...newProduct, isOrganic: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="organic" className="text-sm text-gray-700">This is an organic product (no pesticides/chemicals)</label>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-green-400 transition-colors cursor-pointer">
                    <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Click to upload image</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">Cancel</Button>
                  <Button
                    onClick={handleAddProduct}
                    className="flex-1"
                    disabled={!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.location || !newProduct.expiryDate}
                  >
                    Publish Product
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
