"use client"

import Link from "next/link"
import { useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useCart } from "@/lib/cart-context"

const SHIPPING = { standard: 5.99, express: 12.99 }

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [shipping, setShipping] = useState<"standard" | "express">("standard")
  const [payment, setPayment] = useState("card")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [orderId, setOrderId] = useState<string | null>(null)
  const [placedTotal, setPlacedTotal] = useState(0)

  const shippingCost = total > 100 && shipping === "standard" ? 0 : SHIPPING[shipping]
  const tax = total * 0.1
  const grand = total + shippingCost + tax

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const errs: Record<string, string> = {}
    for (const k of ["name", "address", "city", "zip", "phone", "email"]) {
      if (!String(f.get(k) || "").trim()) errs[k] = "Required"
    }
    if (f.get("email") && !/^\S+@\S+\.\S+$/.test(String(f.get("email")))) errs.email = "Enter a valid email"
    if (f.get("phone") && !/^[0-9+\-\s]{7,15}$/.test(String(f.get("phone")))) errs.phone = "Enter a valid phone number"
    setErrors(errs)
    if (Object.keys(errs).length) return
    setPlacedTotal(grand)
    setOrderId("RS-" + Math.floor(100000 + Math.random() * 900000))
    clearCart()
  }

  const field = (name: string, label: string, type = "text") => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label} <span className="text-destructive">*</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="w-full rounded-md border border-border bg-background px-3 py-3 text-base"
      />
      {errors[name] && <p className="text-sm text-destructive mt-1">{errors[name]}</p>}
    </div>
  )

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1 px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {orderId ? (
            <div className="text-center py-16">
              <CheckCircle2 className="mx-auto text-accent mb-4" size={64} />
              <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-muted-foreground mb-1">Thank you for choosing sustainable gear.</p>
              <p className="mb-1">Order number: <strong>{orderId}</strong></p>
              <p className="mb-8">Total paid: <strong>${placedTotal.toFixed(2)}</strong></p>
              <Link href="/shop">
                <Button className="bg-accent text-accent-foreground hover:bg-primary">Continue Shopping</Button>
              </Link>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-6">Your cart is empty</p>
              <Link href="/shop">
                <Button className="bg-accent text-accent-foreground hover:bg-primary">Go to Shop</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <h1 className="text-4xl font-bold">Checkout</h1>

                <section className="bg-card border border-border rounded-lg p-6 space-y-4">
                  <h2 className="text-2xl font-bold">Shipping Address</h2>
                  {field("name", "Full name")}
                  {field("address", "Address")}
                  <div className="grid grid-cols-2 gap-4">
                    {field("city", "City")}
                    {field("zip", "PIN / ZIP code")}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {field("phone", "Phone", "tel")}
                    {field("email", "Email", "email")}
                  </div>
                </section>

                <section className="bg-card border border-border rounded-lg p-6 space-y-3">
                  <h2 className="text-2xl font-bold">Shipping Method</h2>
                  {(["standard", "express"] as const).map((m) => (
                    <label key={m} className="flex items-center justify-between border border-border rounded-md p-4 cursor-pointer min-h-12">
                      <span className="flex items-center gap-3">
                        <input type="radio" checked={shipping === m} onChange={() => setShipping(m)} />
                        {m === "standard" ? "Standard (5-7 days)" : "Express (2-3 days)"}
                      </span>
                      <span>${SHIPPING[m].toFixed(2)}</span>
                    </label>
                  ))}
                  <p className="text-sm text-muted-foreground">Free standard shipping on orders over $100.</p>
                </section>

                <section className="bg-card border border-border rounded-lg p-6 space-y-3">
                  <h2 className="text-2xl font-bold">Payment Method</h2>
                  {[["card", "Credit / Debit Card"], ["upi", "UPI"], ["cod", "Cash on Delivery"]].map(([v, l]) => (
                    <label key={v} className="flex items-center gap-3 border border-border rounded-md p-4 cursor-pointer min-h-12">
                      <input type="radio" checked={payment === v} onChange={() => setPayment(v)} />
                      {l}
                    </label>
                  ))}
                  <p className="text-sm text-muted-foreground">Demo only: no real payment is processed.</p>
                </section>
              </div>

              <aside className="lg:col-span-1">
                <div className="bg-card border border-border rounded-lg p-6 sticky top-24 space-y-3">
                  <h2 className="text-2xl font-bold mb-2">Order Summary</h2>
                  {items.map((i) => (
                    <div key={i.id} className="flex justify-between text-sm">
                      <span>{i.name} × {i.quantity}</span>
                      <span>${(i.price * i.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-3 space-y-1 text-muted-foreground">
                    <div className="flex justify-between"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Shipping</span><span>${shippingCost.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Tax (10%)</span><span>${tax.toFixed(2)}</span></div>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-border pt-3">
                    <span>Total</span><span className="text-accent">${grand.toFixed(2)}</span>
                  </div>
                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-primary">
                    Place Order
                  </Button>
                  <Link href="/cart" className="block text-center text-sm text-muted-foreground hover:text-accent">
                    Back to cart
                  </Link>
                </div>
              </aside>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
