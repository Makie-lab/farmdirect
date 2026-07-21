"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, Leaf, MapPin, ShoppingBag, Handshake, MessageSquare, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, getExpiryStatus } from "@/lib/utils";
import { mockProducts } from "@/lib/mock-data/products";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = mockProducts.find((p) => p.slug === slug);
  const [quantity, setQuantity] = useState(product?.minOrderQuantity || 1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <Link href="/marketplace" className="text-green-600 hover:text-green-700">
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const expiry = getExpiryStatus(product.expiryDate);
  const totalPrice = product.pricePerUnit * quantity;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/marketplace" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative rounded-xl overflow-hidden aspect-square">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 flex gap-2">
              {product.isOrganic && (
                <Badge variant="success" size="md" className="flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5" /> Organic
                </Badge>
              )}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">{product.category}</span>
              <Badge variant={expiry.color === "green" ? "success" : expiry.color === "orange" ? "warning" : "danger"}>
                {expiry.label}
              </Badge>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-green-600">{formatCurrency(product.pricePerUnit)}</span>
                <span className="text-gray-500">per {product.unit}</span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm text-gray-600">Quantity ({product.unit}):</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(product.minOrderQuantity, quantity - 1))}
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-gray-100">
                <span className="text-gray-600">Total:</span>
                <span className="text-xl font-bold text-gray-900">{formatCurrency(totalPrice)}</span>
              </div>

              <div className="text-xs text-gray-500 mb-4">
                Min order: {product.minOrderQuantity} {product.unit} &bull; Stock: {product.stockQuantity} {product.unit}
              </div>

              <div className="space-y-3">
                <Button className="w-full">
                  <ShoppingBag className="w-4 h-4 mr-2" /> Place Order
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline">
                    <Handshake className="w-4 h-4 mr-2" /> Make a Deal
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" /> Chat
                  </Button>
                </div>
              </div>
            </div>

            {/* Farmer Info */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">About the Farmer</h3>
              <div className="flex items-start gap-4">
                <img src={product.farmerAvatar} alt={product.farmerName} className="w-14 h-14 rounded-full object-cover" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{product.farmerName}</h4>
                  <p className="text-sm text-gray-600">{product.farmName}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-500">{product.farmLocation}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium text-gray-700">{product.farmerRating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
