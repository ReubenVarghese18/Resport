"use client"

import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useFavorites } from "@/lib/favorites-context"

export default function Navbar() {
  const { items: cartItems } = useCart()
  const { favorites } = useFavorites()

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="text-2xl font-bold text-accent">Re</div>
          <div className="text-2xl font-bold text-foreground">Sport</div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm hover:text-accent transition">
            Home
          </Link>
          <Link href="/shop" className="text-sm hover:text-accent transition">
            Shop
          </Link>
          <Link href="#sustainability" className="text-sm hover:text-accent transition">
            Sustainability
          </Link>
          <Link href="#about" className="text-sm hover:text-accent transition">
            About
          </Link>
          <Link href="#contact" className="text-sm hover:text-accent transition">
            Contact
          </Link>
        </div>

        {/* Cart and Favorites Icons */}
        <div className="flex items-center gap-4">
          <Link href="/favorites" className="relative p-2 hover:bg-secondary rounded-lg transition">
            <Heart size={20} />
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative p-2 hover:bg-secondary rounded-lg transition">
            <ShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="absolute top-1 right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}
