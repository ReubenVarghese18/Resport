"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { products } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { useFavorites } from "@/lib/favorites-context"
import { Heart, Star, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const product = products.find((p) => p.id === productId)

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState("Black")
  const [addedToCart, setAddedToCart] = useState(false)

  const { addItem } = useCart()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-lg">Product not found</p>
        </div>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const favorite = isFavorite(product.id)

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-border px-4 py-3 bg-secondary/20">
        <div className="max-w-7xl mx-auto text-sm text-muted-foreground">
          <Link href="/shop" className="hover:text-accent">
            Shop
          </Link>
          {" / "}
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-secondary/30 rounded-lg overflow-hidden h-96">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="mb-6">
                  <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-3xl font-bold text-accent mb-6">${product.price.toFixed(2)}</div>

                {/* Description */}
                <p className="text-muted-foreground mb-6">{product.description}</p>

                {/* Material Info */}
                <div className="bg-secondary/30 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold mb-2">Materials</h3>
                  <p className="text-muted-foreground text-sm">{product.material}</p>
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Size</h3>
                  <div className="flex gap-2">
                    {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded border transition ${
                          selectedSize === size
                            ? "bg-accent text-accent-foreground border-accent"
                            : "border-border hover:border-accent"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Color</h3>
                  <div className="flex gap-2">
                    {["Black", "Green", "White"].map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded border transition ${
                          selectedColor === color
                            ? "bg-accent text-accent-foreground border-accent"
                            : "border-border hover:border-accent"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Quantity</h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 border border-border rounded hover:bg-secondary transition"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                      className="w-12 text-center bg-secondary rounded border border-border focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 border border-border rounded hover:bg-secondary transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 ${
                    addedToCart
                      ? "bg-accent text-accent-foreground"
                      : "bg-accent hover:bg-primary text-accent-foreground"
                  }`}
                >
                  <ShoppingCart size={20} />
                  {addedToCart ? "Added!" : "Add to Cart"}
                </Button>
                <Button
                  onClick={() => (favorite ? removeFavorite(product.id) : addFavorite(product.id))}
                  variant="outline"
                  className={`px-4 ${favorite ? "bg-accent/10 text-accent border-accent" : ""}`}
                >
                  <Heart size={20} fill={favorite ? "currentColor" : "none"} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
