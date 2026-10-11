"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/products"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-background to-background">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url("/eco-sports-athletes-action.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-balance mb-6 text-foreground">
            Performance Meets Sustainability
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Eco-friendly and recycled sports accessories built for athletes who care about the planet.
          </p>
          <Link href="/shop">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground"
            >
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-balance">Featured Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-balance">Our Commitment to Sustainability</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-card rounded-lg">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold mb-4">100% Recycled Materials</h3>
              <p className="text-muted-foreground">
                All our products are made from recycled ocean plastic, post-consumer waste, and sustainable sources.
              </p>
            </div>
            <div className="p-8 bg-card rounded-lg">
              <div className="text-4xl mb-4">♻️</div>
              <h3 className="text-2xl font-bold mb-4">Circular Design</h3>
              <p className="text-muted-foreground">
                Our products are designed to last longer and be recyclable at the end of their lifecycle.
              </p>
            </div>
            <div className="p-8 bg-card rounded-lg">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold mb-4">Carbon Neutral</h3>
              <p className="text-muted-foreground">
                We offset 100% of our carbon footprint through verified environmental initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ergonomic Design Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-balance">Built for Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Ergonomic Excellence</h3>
              <p className="text-muted-foreground mb-4">
                Every product is engineered with professional athletes in mind. We combine ergonomic design with
                sustainable materials to deliver comfort without compromise.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li>✓ Optimized fit for maximum comfort</li>
                <li>✓ Advanced moisture-wicking technology</li>
                <li>✓ Durable and long-lasting construction</li>
                <li>✓ Lightweight and breathable materials</li>
              </ul>
            </div>
            <div className="rounded-lg overflow-hidden h-96">
              <img
                src="/athlete-wearing-eco-sports-gear.jpg"
                alt="Athlete wearing ReSport gear"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
