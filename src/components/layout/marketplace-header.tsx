"use client";

import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import { Sprout, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MarketplaceHeader() {
  const { isSignedIn } = useUser();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Sprout className="w-7 h-7 text-green-600" />
            <span className="text-xl font-bold text-gray-900">FarmDirect</span>
          </Link>
          <Link href="/marketplace" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-lg">
            <ShoppingBag className="w-4 h-4" />
            Marketplace
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <>
              <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                Dashboard
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <Link href="/sign-in" className="text-sm text-gray-600 hover:text-gray-900">
                Sign In
              </Link>
              <Link href="/sign-up">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
