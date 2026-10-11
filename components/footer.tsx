"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Instagram, Twitter, Facebook } from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail("")
    // Newsletter signup would be handled here
  }

  return (
    <footer className="bg-secondary text-foreground py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-xl font-bold mb-4">
              <span className="text-accent">Re</span>Sport
            </div>
            <p className="text-muted-foreground text-sm">Performance meets sustainability.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/shop?category=bags" className="hover:text-accent transition">
                  Bags
                </a>
              </li>
              <li>
                <a href="/shop?category=shoes" className="hover:text-accent transition">
                  Shoes
                </a>
              </li>
              <li>
                <a href="/shop?category=clothing" className="hover:text-accent transition">
                  Clothing
                </a>
              </li>
              <li>
                <a href="/shop?category=accessories" className="hover:text-accent transition">
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-accent transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <form onSubmit={handleNewsletterSignup} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 bg-card rounded border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-primary">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Social Links and Copyright */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">&copy; 2025 ReSport. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-accent transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent transition">
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
