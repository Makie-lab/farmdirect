"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Sprout, ArrowLeft } from "lucide-react";
import { mockProducts } from "@/lib/mock-data/products";
import { ProductCard } from "@/components/marketplace/product-card";
import { SearchFilters } from "@/components/marketplace/search-filters";

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [organicOnly, setOrganicOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    let products = [...mockProducts];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.farmerName.toLowerCase().includes(query) ||
          p.farmLocation.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    if (selectedCategory) {
      products = products.filter((p) => p.categorySlug === selectedCategory);
    }

    if (organicOnly) {
      products = products.filter((p) => p.isOrganic);
    }

    switch (sortBy) {
      case "price-low":
        products.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
        break;
      case "price-high":
        products.sort((a, b) => b.pricePerUnit - a.pricePerUnit);
        break;
      case "newest":
        products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "rating":
        products.sort((a, b) => b.farmerRating - a.farmerRating);
        break;
      default:
        products.sort((a, b) => b.orderCount - a.orderCount);
    }

    return products;
  }, [searchQuery, selectedCategory, sortBy, organicOnly]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Sprout className="w-7 h-7 text-green-600" />
              <span className="text-xl font-bold text-gray-900">FarmDirect</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
            <Link href="/sign-in" className="text-sm text-gray-600 hover:text-gray-900">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
          <p className="text-gray-600 mt-1">Fresh produce directly from Filipino farmers</p>
        </div>

        <SearchFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          organicOnly={organicOnly}
          onOrganicToggle={setOrganicOnly}
        />

        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-4">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </p>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
