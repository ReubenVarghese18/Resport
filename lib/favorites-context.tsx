"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"

interface FavoritesContextType {
  favorites: string[]
  addFavorite: (id: string) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("favorites")
    if (saved) setFavorites(JSON.parse(saved))
  }, [])

  useEffect(() => {
    if (mounted) localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites, mounted])

  const addFavorite = useCallback((id: string) => {
    setFavorites((prev) => [...new Set([...prev, id])])
  }, [])

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((fav) => fav !== id))
  }, [])

  const isFavorite = useCallback(
    (id: string) => {
      return favorites.includes(id)
    },
    [favorites],
  )

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error("useFavorites must be used within FavoritesProvider")
  return context
}
