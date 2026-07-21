"use client";

import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import { Sprout, ShieldCheck, Truck, Handshake, TrendingUp, MessageSquare, BarChart3, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: <ShieldCheck className="w-6 h-6" />, title: "Verified Farmers", description: "All farmers are verified to ensure quality and authenticity of produce" },
  { icon: <Handshake className="w-6 h-6" />, title: "Direct Deals", description: "Negotiate prices directly with farmers - no middlemen involved" },
  { icon: <Truck className="w-6 h-6" />, title: "Reliable Delivery", description: "Track your shipments in real-time with trusted courier partners" },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Fair Prices", description: "Save up to 30% compared to traditional market prices" },
  { icon: <MessageSquare className="w-6 h-6" />, title: "Direct Messaging", description: "Chat directly with farmers about products and availability" },
  { icon: <BarChart3 className="w-6 h-6" />, title: "Market Insights", description: "Access real-time analytics on demand, pricing, and trends" },
];

const steps = [
  { step: "1", title: "Browse & Discover", description: "Explore fresh produce from verified local farmers across the Philippines" },
  { step: "2", title: "Negotiate & Order", description: "Chat with farmers, negotiate prices, and place your order directly" },
  { step: "3", title: "Track & Receive", description: "Track your delivery in real-time and receive fresh produce at your doorstep" },
];

const testimonials = [
  { name: "Maria Santos", role: "Restaurant Owner, Makati", quote: "FarmDirect saved my restaurant 25% on produce costs. The quality is always excellent!", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", rating: 5 },
  { name: "Pedro Reyes", role: "Rice Farmer, Nueva Ecija", quote: "I earn 40% more selling directly to buyers. No more middlemen taking my profits.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", rating: 5 },
  { name: "Elena Villanueva", role: "Buyer, Quezon City", quote: "The freshest vegetables I have ever had delivered to my home. Amazing platform!", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100", rating: 5 },
];

export default function HomePage() {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Sprout className="w-7 h-7 text-green-600" />
            <span className="text-xl font-bold text-gray-900">FarmDirect</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/marketplace" className="text-sm text-gray-600 hover:text-gray-900 font-medium">Marketplace</Link>
            {isSignedIn ? (
              <>
                <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 font-medium">Dashboard</Link>
                <UserButton />
              </>
            ) : (
              <>
                <Link href="/sign-in" className="text-sm text-gray-600 hover:text-gray-900">Sign In</Link>
                <Link href="/sign-up">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Farm-Fresh Produce,{" "}
            <span className="text-green-600">Directly to You</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect directly with Filipino farmers. Buy fresh, buy fair, and support local agriculture without the middlemen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/marketplace">
              <Button size="lg">Browse Marketplace <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </Link>
            {isSignedIn ? (
              <Link href="/dashboard">
                <Button variant="outline" size="lg">Go to Dashboard</Button>
              </Link>
            ) : (
              <Link href="/sign-up">
                <Button variant="outline" size="lg">Join as Farmer</Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><p className="text-3xl font-bold text-white">500+</p><p className="text-green-100">Active Farmers</p></div>
          <div><p className="text-3xl font-bold text-white">2,000+</p><p className="text-green-100">Buyers</p></div>
          <div><p className="text-3xl font-bold text-white">10K+</p><p className="text-green-100">Orders Delivered</p></div>
          <div><p className="text-3xl font-bold text-white">30%</p><p className="text-green-100">Avg. Savings</p></div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Why Choose FarmDirect?</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Everything you need to buy and sell fresh produce directly</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-green-100 mb-8 text-lg">Join thousands of farmers and buyers building a more sustainable food system.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {!isSignedIn && (
              <Link href="/sign-up">
                <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">Create Account</Button>
              </Link>
            )}
            <Link href="/marketplace">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">Browse Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Sprout className="w-6 h-6 text-green-500" />
              <span className="text-lg font-bold text-white">FarmDirect</span>
            </div>
            <p className="text-sm">&copy; 2026 FarmDirect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
