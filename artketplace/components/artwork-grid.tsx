"use client"

import { useState } from "react"
import { ArtworkCard } from "@/components/artwork-card"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function ArtworkGrid() {
  const [loading, setLoading] = useState(false)
  const [artworks, setArtworks] = useState([
    {
      id: "1",
      title: "Abstract Harmony",
      imageUrl: "/placeholder.svg?height=400&width=300",
      askPrice: 450,
      lastSalePrice: 420,
      priceChange: 7.14,
      bids: 12,
      endTime: "23h 45m",
      verified: true,
    },
    {
      id: "2",
      title: "Urban Landscape",
      imageUrl: "/placeholder.svg?height=400&width=300",
      askPrice: 320,
      lastSalePrice: 350,
      priceChange: -8.57,
      bids: 8,
      endTime: "2d 12h",
      verified: true,
    },
    {
      id: "3",
      title: "Serene Waters",
      imageUrl: "/placeholder.svg?height=400&width=300",
      askPrice: 275,
      lastSalePrice: 260,
      priceChange: 5.77,
      bids: 5,
      endTime: "4d 6h",
      verified: true,
    },
    {
      id: "4",
      title: "Forest Dreams",
      imageUrl: "/placeholder.svg?height=400&width=300",
      askPrice: 510,
      lastSalePrice: 480,
      priceChange: 6.25,
      bids: 18,
      endTime: "1d 8h",
      verified: true,
    },
    {
      id: "5",
      title: "Geometric Patterns",
      imageUrl: "/placeholder.svg?height=400&width=300",
      askPrice: 190,
      lastSalePrice: 210,
      priceChange: -9.52,
      bids: 3,
      endTime: "5d 14h",
      verified: false,
    },
    {
      id: "6",
      title: "Sunset Reflections",
      imageUrl: "/placeholder.svg?height=400&width=300",
      askPrice: 380,
      lastSalePrice: 350,
      priceChange: 8.57,
      bids: 9,
      endTime: "3d 2h",
      verified: true,
    },
    {
      id: "7",
      title: "Portrait Study",
      imageUrl: "/placeholder.svg?height=400&width=300",
      askPrice: 420,
      lastSalePrice: 400,
      priceChange: 5.0,
      bids: 11,
      endTime: "2d 18h",
      verified: true,
    },
    {
      id: "8",
      title: "Coastal Breeze",
      imageUrl: "/placeholder.svg?height=400&width=300",
      askPrice: 295,
      lastSalePrice: 320,
      priceChange: -7.81,
      bids: 7,
      endTime: "6d 4h",
      verified: true,
    },
  ])

  const loadMore = () => {
    setLoading(true)
    // Simulate loading more artworks
    setTimeout(() => {
      const newArtworks = [
        {
          id: "9",
          title: "Midnight Garden",
          imageUrl: "/placeholder.svg?height=400&width=300",
          askPrice: 210,
          lastSalePrice: 190,
          priceChange: 10.53,
          bids: 2,
          endTime: "6d 23h",
          verified: false,
        },
        {
          id: "10",
          title: "Industrial Revolution",
          imageUrl: "/placeholder.svg?height=400&width=300",
          askPrice: 180,
          lastSalePrice: 200,
          priceChange: -10.0,
          bids: 1,
          endTime: "7d 10h",
          verified: true,
        },
        {
          id: "11",
          title: "Mountain Majesty",
          imageUrl: "/placeholder.svg?height=400&width=300",
          askPrice: 240,
          lastSalePrice: 220,
          priceChange: 9.09,
          bids: 3,
          endTime: "6d 15h",
          verified: true,
        },
        {
          id: "12",
          title: "Desert Mirage",
          imageUrl: "/placeholder.svg?height=400&width=300",
          askPrice: 195,
          lastSalePrice: 180,
          priceChange: 8.33,
          bids: 2,
          endTime: "7d 5h",
          verified: false,
        },
      ]
      setArtworks([...artworks, ...newArtworks])
      setLoading(false)
    }, 1500)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-8">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {artworks.map((artwork) => (
          <motion.div key={artwork.id} variants={item}>
            <ArtworkCard
              id={artwork.id}
              title={artwork.title}
              imageUrl={artwork.imageUrl}
              askPrice={artwork.askPrice}
              lastSalePrice={artwork.lastSalePrice}
              priceChange={artwork.priceChange}
              bids={artwork.bids}
              endTime={artwork.endTime}
              verified={artwork.verified}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="flex justify-center">
        <Button
          onClick={loadMore}
          variant="outline"
          size="lg"
          disabled={loading}
          className="min-w-[200px] bg-transparent"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            "Load More"
          )}
        </Button>
      </div>
    </div>
  )
}
