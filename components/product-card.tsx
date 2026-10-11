"use client"

import type React from "react"

import Link from "next/link"
import { Heart, ShoppingCart, Star, Leaf } from "lucide-react"
import type { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { useFavorites } from "@/lib/favorites-context"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const [addedToCart, setAddedToCart] = useState(false)

  const favorite = isFavorite(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    if (favorite) {
      removeFavorite(product.id)
    } else {
      addFavorite(product.id)
    }
  }

  return (
    <Link href={`/shop/${product.id}`}>
      <div className="group bg-card rounded-lg overflow-hidden border border-border hover:border-accent transition cursor-pointer h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden bg-secondary/30 h-64 group-hover:bg-secondary transition">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />

          {/* Eco badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-accent text-accent-foreground px-2 py-1 text-xs font-semibold">
            <Leaf size={12} /> Eco {product.ecoRating}/5
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition">
            <button
              onClick={handleToggleFavorite}
              className={`p-2 rounded-lg backdrop-blur transition ${
                favorite
                  ? "bg-accent text-accent-foreground"
                  : "bg-background/80 hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Heart size={18} fill={favorite ? "currentColor" : "none"} />
            </button>
            <button
              onClick={handleAddToCart}
              className={`p-2 rounded-lg backdrop-blur transition ${
                addedToCart
                  ? "bg-accent text-accent-foreground"
                  : "bg-background/80 hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-accent transition">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">{product.description}</p>

          <p className="text-xs text-muted-foreground mb-2">
            {product.recycledContent} · {product.certification}
          </p>

          {/* Price */}
          <div className="text-lg font-bold text-accent">${product.price.toFixed(2)}</div>
        </div>
      </div>
    </Link>
  )
}
