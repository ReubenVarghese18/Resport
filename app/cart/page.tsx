"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { Trash2, ArrowLeft } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="bg-secondary/50 py-12 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold">Shopping Cart</h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-1 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-6">Your cart is empty</p>
              <Link href="/shop">
                <Button className="flex items-center gap-2 mx-auto bg-accent text-accent-foreground hover:bg-primary">
                  <ArrowLeft size={18} />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-card rounded-lg border border-border">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-secondary/30 rounded flex-shrink-0 overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.size && `Size: ${item.size}`}
                          {item.size && item.color && " • "}
                          {item.color && `Color: ${item.color}`}
                        </p>
                        <p className="text-lg font-bold text-accent">${item.price.toFixed(2)}</p>
                      </div>

                      {/* Quantity and Actions */}
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 hover:bg-secondary rounded transition"
                        >
                          <Trash2 size={18} className="text-muted-foreground" />
                        </button>
                        <div className="flex items-center gap-2 bg-secondary rounded px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 hover:text-accent transition"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 hover:text-accent transition"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-lg border border-border p-6 sticky top-24 h-fit">
                  <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>${total > 100 ? "0.00" : "10.00"}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Tax</span>
                      <span>${(total * 0.1).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mb-6">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-accent">${(total + (total > 100 ? 0 : 10) + total * 0.1).toFixed(2)}</span>
                    </div>
                  </div>

                  <Link href="/checkout">
                    <Button className="w-full mb-3 bg-accent text-accent-foreground hover:bg-primary">Checkout</Button>
                  </Link>
                  <Button variant="outline" className="w-full bg-transparent" onClick={() => clearCart()}>
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
