"use client";

import { SignIn } from "@clerk/nextjs";
import { Sprout } from "lucide-react";

export default function SignInPage() {
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
            Welcome back to FarmDirect
          </h1>
          <p className="text-green-100 text-lg">
            Connect directly with farmers and buyers across the Philippines.
            Fresh produce, fair prices, no middlemen.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-2xl font-bold text-white">500+</p>
            <p className="text-green-100 text-sm">Active Farmers</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-2xl font-bold text-white">10K+</p>
            <p className="text-green-100 text-sm">Orders Delivered</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-2xl font-bold text-white">30%</p>
            <p className="text-green-100 text-sm">Avg. Savings</p>
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
          <SignIn
            forceRedirectUrl="/marketplace"
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
