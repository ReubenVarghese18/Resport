"use client"

import { useState, useMemo } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/products"

type Category = "all" | "bags" | "shoes" | "clothing" | "accessories"

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all")
  const [sortBy, setSortBy] = useState<"name" | "price-low" | "price-high" | "rating">("name")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Sort
    const sorted = [...filtered]
    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case "name":
      default:
        sorted.sort((a, b) => a.name.localeCompare(b.name))
    }

    return sorted
  }, [selectedCategory, sortBy, searchQuery])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="bg-secondary/50 py-12 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Shop Our Collection</h1>
          <p className="text-muted-foreground">Explore our sustainable sports accessories</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-1 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Filters */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg p-6 border border-border sticky top-24">
                {/* Search */}
                <div className="mb-6">
                  <h3 className="font-bold mb-3">Search</h3>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 bg-secondary rounded border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="font-bold mb-3">Category</h3>
                  <div className="space-y-2">
                    {(["all", "bags", "shoes", "clothing", "accessories"] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`block w-full text-left px-3 py-2 rounded text-sm transition ${
                          selectedCategory === cat
                            ? "bg-accent text-accent-foreground font-semibold"
                            : "text-muted-foreground hover:bg-secondary"
                        }`}
                      >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h3 className="font-bold mb-3">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-3 py-2 bg-secondary rounded border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="name">Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {filteredAndSortedProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No products found. Try adjusting your filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
