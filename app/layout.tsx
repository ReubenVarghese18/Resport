import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { FavoritesProvider } from "@/lib/favorites-context"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ReSport - Eco-Friendly Sports Accessories",
  description: "Performance Meets Sustainability. Shop our recycled and eco-friendly sports accessories.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased bg-background text-foreground`}>
        <CartProvider>
          <FavoritesProvider>
            {children}
            <Analytics />
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  )
}
