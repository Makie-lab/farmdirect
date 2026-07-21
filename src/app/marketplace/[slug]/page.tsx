"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, Leaf, MapPin, ShoppingCart, Handshake, MessageSquare, Minus, Plus, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MarketplaceHeader } from "@/components/layout/marketplace-header";
import { formatCurrency, getExpiryStatus } from "@/lib/utils";
import { mockProducts } from "@/lib/mock-data/products";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const product = mockProducts.find((p) => p.slug === slug);
  const [quantity, setQuantity] = useState(product?.minOrderQuantity || 1);
  const [showCartSuccess, setShowCartSuccess] = useState(false);
  const [showDealModal, setShowDealModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [dealPrice, setDealPrice] = useState("");
  const [dealMessage, setDealMessage] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [dealSubmitted, setDealSubmitted] = useState(false);
  const [chatSent, setChatSent] = useState(false);

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

  const handleAddToCart = () => {
    setShowCartSuccess(true);
    setTimeout(() => setShowCartSuccess(false), 3000);
  };

  const handleMakeDeal = () => {
    setShowDealModal(true);
    setDealSubmitted(false);
  };

  const handleSubmitDeal = () => {
    setDealSubmitted(true);
    setTimeout(() => {
      setShowDealModal(false);
      setDealPrice("");
      setDealMessage("");
    }, 2000);
  };

  const handleChat = () => {
    setShowChatModal(true);
    setChatSent(false);
  };

  const handleSendChat = () => {
    setChatSent(true);
    setTimeout(() => {
      setShowChatModal(false);
      setChatMessage("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MarketplaceHeader />

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
            <p className="text-gray-600 mb-4">{product.description}</p>

            {/* Location */}
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-green-600" />
              <span>From: {product.farmLocation}</span>
            </div>

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
                <Button className="w-full" onClick={handleAddToCart}>
                  <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={handleMakeDeal}>
                    <Handshake className="w-4 h-4 mr-2" /> Make a Deal
                  </Button>
                  <Button variant="outline" onClick={handleChat}>
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

      {/* Cart Success Toast */}
      {showCartSuccess && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 z-50 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5" />
          <div>
            <p className="font-medium text-sm">Added to Cart!</p>
            <p className="text-xs text-green-100">{quantity} {product.unit} of {product.name}</p>
          </div>
        </div>
      )}

      {/* Make a Deal Modal */}
      {showDealModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Make a Deal</h2>
              <button onClick={() => setShowDealModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {dealSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Deal Submitted!</h3>
                <p className="text-sm text-gray-500">The farmer will review your offer and respond soon.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{product.name}</span> — Current price: {formatCurrency(product.pricePerUnit)}/{product.unit}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Offered Price (per {product.unit})</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₱</span>
                    <input
                      type="number"
                      value={dealPrice}
                      onChange={(e) => setDealPrice(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity ({product.unit})</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message to Farmer</label>
                  <textarea
                    value={dealMessage}
                    onChange={(e) => setDealMessage(e.target.value)}
                    placeholder="e.g., I buy regularly and would like a bulk discount..."
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setShowDealModal(false)} className="flex-1">Cancel</Button>
                  <Button onClick={handleSubmitDeal} className="flex-1" disabled={!dealPrice}>Submit Offer</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Chat with {product.farmerName}</h2>
              <button onClick={() => setShowChatModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {chatSent ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Message Sent!</h3>
                <p className="text-sm text-gray-500">Check your Messages inbox for the farmer&apos;s reply.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                  <img src={product.farmerAvatar} alt={product.farmerName} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-medium text-sm text-gray-900">{product.farmerName}</p>
                    <p className="text-xs text-gray-500">{product.farmName} &bull; {product.farmLocation}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <textarea
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder={`Hi ${product.farmerName}! I'm interested in your ${product.name}...`}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setShowChatModal(false)} className="flex-1">Cancel</Button>
                  <Button onClick={handleSendChat} className="flex-1" disabled={!chatMessage.trim()}>
                    <MessageSquare className="w-4 h-4 mr-2" /> Send Message
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
