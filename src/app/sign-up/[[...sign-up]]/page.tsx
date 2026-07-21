"use client";

import { SignUp } from "@clerk/nextjs";
import { Sprout } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-green-800 p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <Sprout className="w-8 h-8 text-white" />
            <span className="text-2xl font-bold text-white">FarmDirect</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Join FarmDirect Today
          </h1>
          <p className="text-green-100 text-lg">
            Whether you are a farmer looking to sell directly or a buyer seeking fresh
            produce, FarmDirect connects you to a thriving agricultural marketplace.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <span className="text-2xl">🌾</span>
            <div>
              <p className="text-white font-semibold">For Farmers</p>
              <p className="text-green-100 text-sm">Sell directly and earn more for your harvest</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <span className="text-2xl">🛒</span>
            <div>
              <p className="text-white font-semibold">For Buyers</p>
              <p className="text-green-100 text-sm">Get fresh produce at farm-gate prices</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <Sprout className="w-7 h-7 text-green-600" />
            <span className="text-xl font-bold text-gray-900">FarmDirect</span>
          </div>
          <SignUp
            forceRedirectUrl="/onboarding"
            appearance={{
              elements: {
                formButtonPrimary: "bg-green-600 hover:bg-green-700",
                card: "shadow-none",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
