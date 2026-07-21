"use client";

import Link from "next/link";
import { Star, Leaf, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, getExpiryStatus } from "@/lib/utils";
import { MockProduct } from "@/lib/mock-data/products";

interface ProductCardProps {
  product: MockProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const expiry = getExpiryStatus(product.expiryDate);
  const isExpiringSoon = expiry.color === "orange" || expiry.color === "red";

  return (
    <Link href={`/marketplace/${product.slug}`}>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all overflow-hidden group">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {product.isOrganic && (
              <Badge variant="success" className="flex items-center gap-1">
                <Leaf className="w-3 h-3" /> Organic
              </Badge>
            )}
            {isExpiringSoon && (
              <Badge variant="warning" className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {expiry.label}
              </Badge>
            )}
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{product.name}</h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full whitespace-nowrap ml-2">
              {product.category}
            </span>
          </div>
          <p className="text-lg font-bold text-green-600 mb-2">
            {formatCurrency(product.pricePerUnit)}
            <span className="text-sm font-normal text-gray-500">/{product.unit}</span>
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={product.farmerAvatar}
                alt={product.farmerName}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-xs text-gray-600 truncate max-w-[100px]">{product.farmerName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-gray-700">{product.farmerRating}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{product.farmLocation}</p>
        </div>
      </div>
    </Link>
  );
}
