export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: "bags" | "shoes" | "clothing" | "accessories"
  description: string
  material: string
  rating: number
  reviews: number
  ecoRating: number
  certification: string
  recycledContent: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "Eco Gym Bag",
    price: 79.99,
    image: "/eco-friendly-gym-bag-recycled.jpg",
    category: "bags",
    description: "Spacious gym bag made from 100% recycled materials with multiple compartments.",
    material: "Recycled Polyester",
    rating: 4.8,
    reviews: 142,
    ecoRating: 5,
    certification: "GRS Certified",
    recycledContent: "100% recycled",
  },
  {
    id: "2",
    name: "Sustainable Running Shoes",
    price: 129.99,
    image: "/eco-running-shoes-recycled-material.jpg",
    category: "shoes",
    description: "Lightweight running shoes crafted from recycled ocean plastic and sustainable rubber.",
    material: "Recycled Ocean Plastic + Sustainable Rubber",
    rating: 4.9,
    reviews: 89,
    ecoRating: 5,
    certification: "Bluesign Approved",
    recycledContent: "85% recycled",
  },
  {
    id: "3",
    name: "Performance Jersey",
    price: 59.99,
    image: "/eco-sport-jersey-green-sustainable.jpg",
    category: "clothing",
    description: "Breathable performance jersey made from recycled polyester with moisture-wicking technology.",
    material: "Recycled Polyester",
    rating: 4.7,
    reviews: 56,
    ecoRating: 4,
    certification: "OEKO-TEX Standard 100",
    recycledContent: "90% recycled",
  },
  {
    id: "4",
    name: "Eco Water Bottle",
    price: 34.99,
    image: "/sustainable-water-bottle-eco-friendly.jpg",
    category: "accessories",
    description: "Durable water bottle made from recycled aluminum with insulation technology.",
    material: "Recycled Aluminum",
    rating: 4.6,
    reviews: 203,
    ecoRating: 5,
    certification: "Cradle to Cradle",
    recycledContent: "100% recycled",
  },
  {
    id: "5",
    name: "Training Shorts",
    price: 49.99,
    image: "/eco-training-shorts-recycled-polyester.jpg",
    category: "clothing",
    description: "Comfortable shorts with ergonomic fit, made from sustainable recycled materials.",
    material: "Recycled Polyester",
    rating: 4.5,
    reviews: 67,
    ecoRating: 4,
    certification: "GRS Certified",
    recycledContent: "88% recycled",
  },
  {
    id: "6",
    name: "Recycled Backpack",
    price: 89.99,
    image: "/eco-backpack-school-recycled.jpg",
    category: "bags",
    description: "Versatile backpack with laptop compartment made from recycled materials.",
    material: "Recycled Polyester",
    rating: 4.7,
    reviews: 124,
    ecoRating: 5,
    certification: "GRS Certified",
    recycledContent: "100% recycled",
  },
  {
    id: "7",
    name: "Eco Socks 3-Pack",
    price: 24.99,
    image: "/sustainable-sports-socks-organic.jpg",
    category: "accessories",
    description: "Soft, durable socks made from organic cotton and recycled polyester blend.",
    material: "Organic Cotton + Recycled Polyester",
    rating: 4.4,
    reviews: 89,
    ecoRating: 4,
    certification: "GOTS Organic",
    recycledContent: "60% recycled / organic",
  },
  {
    id: "8",
    name: "Trail Running Shoes",
    price: 139.99,
    image: "/eco-trail-running-shoes-sustainable.jpg",
    category: "shoes",
    description: "Rugged trail shoes with superior grip, made from sustainable materials.",
    material: "Recycled Polyester + Plant-Based Rubber",
    rating: 4.8,
    reviews: 71,
    ecoRating: 4,
    certification: "Bluesign Approved",
    recycledContent: "80% recycled",
  },
]
