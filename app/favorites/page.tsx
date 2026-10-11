"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { useFavorites } from "@/lib/favorites-context"
import { products } from "@/lib/products"
import { ArrowLeft } from "lucide-react"

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const favoriteProducts = products.filter((p) => favorites.includes(p.id))

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="bg-secondary/50 py-12 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold">Your Favorites</h1>
          <p className="text-muted-foreground mt-2">{favorites.length} items saved</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-1 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-6">You haven't added any favorites yet</p>
              <Link href="/shop">
                <Button className="flex items-center gap-2 mx-auto bg-accent text-accent-foreground hover:bg-primary">
                  <ArrowLeft size={18} />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {favoriteProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
