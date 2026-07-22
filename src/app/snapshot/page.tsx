"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Camera, Upload, Sparkles, Leaf, MessageSquare, ArrowLeft, X, ShoppingBag, Zap, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MarketplaceHeader } from "@/components/layout/marketplace-header";
import { formatCurrency } from "@/lib/utils";
import { foodAnalysisResults, IngredientMatch } from "@/lib/mock-data/snapshot";

type AnalysisState = "idle" | "capturing" | "analyzing" | "results";

export default function SnapshotPage() {
  const [state, setState] = useState<AnalysisState>("idle");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [results, setResults] = useState<IngredientMatch[]>([]);
  const [detectedDish, setDetectedDish] = useState("");
  const [showChatModal, setShowChatModal] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [chatSent, setChatSent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setStream(mediaStream);
      setState("capturing");
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 100);
    } catch {
      alert("Camera not available. Please use the upload option instead.");
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL("image/jpeg");
      setCapturedImage(imageData);
      stopCamera();
      analyzeImage();
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCapturedImage(ev.target?.result as string);
      analyzeImage();
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = () => {
    setState("analyzing");
    // Simulate AI analysis (in production, send to vision API)
    setTimeout(() => {
      const dishes = Object.keys(foodAnalysisResults);
      const randomDish = dishes[Math.floor(Math.random() * dishes.length)];
      setDetectedDish(randomDish);
      setResults(foodAnalysisResults[randomDish]);
      setState("results");
    }, 2500);
  };

  const resetSnapshot = () => {
    stopCamera();
    setState("idle");
    setCapturedImage(null);
    setResults([]);
    setDetectedDish("");
  };

  const handleSendChat = (farmerName: string) => {
    setChatSent(true);
    setTimeout(() => {
      setShowChatModal(null);
      setChatMessage("");
      setChatSent(false);
    }, 2000);
  };

  const totalCalories = results.reduce((sum, r) => sum + r.nutritionFacts.calories, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <MarketplaceHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/marketplace" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              SnapShot
            </h1>
            <p className="text-gray-600 text-sm">
              Take a photo of any food — we will find the ingredients in our marketplace
            </p>
          </div>
        </div>

        {/* Idle State - Choose capture method */}
        {state === "idle" && (
          <div className="space-y-6">
            <Card padding="lg" className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mx-auto mb-6">
                <Camera className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Snap Your Food
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Take a picture of any dish or ingredient. Our AI will identify what is in it and match ingredients available from local farmers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={startCamera} className="gap-2">
                  <Camera className="w-5 h-5" /> Open Camera
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2"
                >
                  <Upload className="w-5 h-5" /> Upload Photo
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </Card>

            {/* How it works */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Card padding="md" className="text-center">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <Camera className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">1. Snap</h3>
                <p className="text-xs text-gray-500">Take a photo of your food or dish</p>
              </Card>
              <Card padding="md" className="text-center">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">2. Analyze</h3>
                <p className="text-xs text-gray-500">AI identifies ingredients and nutrition</p>
              </Card>
              <Card padding="md" className="text-center">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-3">
                  <ShoppingBag className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">3. Connect</h3>
                <p className="text-xs text-gray-500">Find and chat with farmers who have them</p>
              </Card>
            </div>
          </div>
        )}

        {/* Capturing State - Camera view */}
        {state === "capturing" && (
          <Card padding="md" className="text-center">
            <div className="relative rounded-xl overflow-hidden bg-black aspect-[4/3] mb-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-4 border-white/30 rounded-xl pointer-events-none" />
              <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <Button size="lg" onClick={capturePhoto} className="gap-2">
                <Camera className="w-5 h-5" /> Capture
              </Button>
              <Button size="lg" variant="outline" onClick={() => { stopCamera(); setState("idle"); }}>
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Analyzing State */}
        {state === "analyzing" && (
          <Card padding="lg" className="text-center">
            {capturedImage && (
              <div className="relative w-48 h-48 rounded-xl overflow-hidden mx-auto mb-6">
                <img src={capturedImage} alt="Captured food" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-green-600/20 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            )}
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
              <h2 className="text-lg font-bold text-gray-900">Analyzing your food...</h2>
            </div>
            <p className="text-gray-500 text-sm">Identifying ingredients and matching with marketplace</p>
          </Card>
        )}

        {/* Results State */}
        {state === "results" && (
          <div className="space-y-6">
            {/* Summary Card */}
            <Card padding="md">
              <div className="flex items-start gap-4">
                {capturedImage && (
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={capturedImage} alt="Food" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    <Badge variant="success" size="md">AI Detected</Badge>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 capitalize mb-1">
                    {detectedDish}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Found <span className="font-semibold text-green-700">{results.length} ingredients</span> available in our marketplace
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Apple className="w-3.5 h-3.5" />
                      ~{totalCalories} cal per serving
                    </span>
                    <span className="flex items-center gap-1">
                      <Leaf className="w-3.5 h-3.5 text-green-500" />
                      {results.filter((r) => r.matchedProducts.length > 0).length} matched
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={resetSnapshot}>
                  New Scan
                </Button>
              </div>
            </Card>

            {/* Ingredients List */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Ingredients &amp; Marketplace Matches</h3>
              <div className="space-y-4">
                {results.map((item) => (
                  <Card key={item.ingredient} padding="md" hover>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.ingredient}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {item.nutritionFacts.calories} cal &bull; Protein: {item.nutritionFacts.protein} &bull; Carbs: {item.nutritionFacts.carbs} &bull; Fat: {item.nutritionFacts.fat}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.nutritionFacts.vitamins.slice(0, 2).map((v) => (
                          <Badge key={v} variant="info" size="sm">{v}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Matched Products */}
                    {item.matchedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100"
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <Link href={`/marketplace/${product.slug}`} className="text-sm font-medium text-gray-900 hover:text-green-700">
                            {product.name}
                          </Link>
                          <div className="flex items-center gap-2 mt-0.5">
                            <img src={product.farmerAvatar} alt="" className="w-4 h-4 rounded-full" />
                            <span className="text-xs text-gray-500">{product.farmerName} &bull; {product.farmLocation}</span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-bold text-green-700">
                            {formatCurrency(product.price)}/{product.unit}
                          </p>
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-1 text-xs gap-1"
                            onClick={() => setShowChatModal(product.farmerName)}
                          >
                            <MessageSquare className="w-3 h-3" /> Ask Farmer
                          </Button>
                        </div>
                      </div>
                    ))}
                  </Card>
                ))}
              </div>
            </div>

            {/* Nutrition Summary */}
            <Card padding="md">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Apple className="w-5 h-5 text-red-500" /> Nutrition Summary (per serving)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{totalCalories}</p>
                  <p className="text-xs text-gray-600">Calories</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    {results.reduce((s, r) => s + parseFloat(r.nutritionFacts.protein), 0).toFixed(1)}g
                  </p>
                  <p className="text-xs text-gray-600">Protein</p>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">
                    {results.reduce((s, r) => s + parseFloat(r.nutritionFacts.carbs), 0).toFixed(1)}g
                  </p>
                  <p className="text-xs text-gray-600">Carbs</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">
                    {results.reduce((s, r) => s + parseFloat(r.nutritionFacts.fat), 0).toFixed(1)}g
                  </p>
                  <p className="text-xs text-gray-600">Fat</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Message {showChatModal}</h2>
              <button onClick={() => { setShowChatModal(null); setChatSent(false); }} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            {chatSent ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Message Sent!</h3>
                <p className="text-sm text-gray-500">The farmer will reply in your Messages inbox.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-3 text-sm text-green-800">
                  <Sparkles className="w-4 h-4 inline mr-1" />
                  Asking about ingredients detected by SnapShot AI
                </div>
                <textarea
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder={`Hi ${showChatModal}! I saw your product on FarmDirect SnapShot. Is this ingredient available? I'd like to know about freshness and delivery options...`}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setShowChatModal(null)} className="flex-1">Cancel</Button>
                  <Button onClick={() => handleSendChat(showChatModal)} className="flex-1" disabled={!chatMessage.trim()}>
                    <MessageSquare className="w-4 h-4 mr-2" /> Send
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
