"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { categories } from "@/lib/mock-data/products";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  organicOnly: boolean;
  onOrganicToggle: (value: boolean) => void;
}

export function SearchFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  organicOnly,
  onOrganicToggle,
}: SearchFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search products, farmers, locations..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
        />
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => onCategoryChange("")}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            selectedCategory === ""
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => onCategoryChange(cat.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat.slug
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Sort and Filter Row */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={organicOnly}
            onChange={(e) => onOrganicToggle(e.target.checked)}
            className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
          />
          <span className="text-sm text-gray-700">Organic Only</span>
        </label>
      </div>
    </div>
  );
}
