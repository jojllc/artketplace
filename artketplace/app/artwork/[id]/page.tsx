"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Clock3,
  Share2,
  Heart,
  Package,
  Shield,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Eye,
  BarChart3,
} from "lucide-react"
import { BidHistory } from "@/components/bid-history"
import { motion } from "framer-motion"
import { SimilarArtworks } from "@/components/similar-artworks"
import { PriceChart } from "@/components/price-chart"

export default function ArtworkPage({ params }: { params: { id: string } }) {
  const [bidAmount, setBidAmount] = useState("460")
  const [liked, setLiked] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  // Mock data for the example
  const artwork = {
    id: params.id,
    title: "Abstract Harmony",
    description:
      "A vibrant abstract piece exploring the relationship between color and emotion. Created using acrylic on canvas with various textures and techniques.",
    images: [
      "/placeholder.svg?height=600&width=450",
      "/placeholder.svg?height=600&width=450",
      "/placeholder.svg?height=600&width=450",
      "/placeholder.svg?height=600&width=450",
    ],
    askPrice: 450,
    lastSalePrice: 420,
    priceChange: 7.14,
    bids: 12,
    endTime: "23h 45m",
    dimensions: '24" × 36"',
    medium: "Acrylic on Canvas",
    created: "2025",
    shipping: "Specialized Art Packaging",
    verified: true,
    views: 342,
    favorites: 28,
  }

  return (
    <div className="container py-8">
      <Link href="/" className="inline-flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <motion.div
            className="relative aspect-[3/4] overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={artwork.images[activeImage] || "/placeholder.svg"}
              alt={artwork.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {artwork.verified && (
              <div className="absolute top-4 right-4 bg-black/70 rounded-full p-2">
                <ShieldCheck className="h-5 w-5 text-green-400" />
              </div>
            )}
          </motion.div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {artwork.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`relative w-20 h-20 rounded-md overflow-hidden ${
                  activeImage === index ? "ring-2 ring-black" : "opacity-70"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${artwork.title} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold">{artwork.title}</h1>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => setLiked(!liked)}>
                  <Heart className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                  <span className="sr-only">Like</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">Original Artwork</Badge>
              <Badge variant="outline">One of a kind</Badge>
            </div>

            <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{artwork.views} views</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{artwork.favorites} favorites</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock3 className="h-4 w-4" />
                <span>Ends in {artwork.endTime}</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Lowest Ask</p>
                  <p className="text-3xl font-bold">${artwork.askPrice}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <p className="text-sm">Last Sale: ${artwork.lastSalePrice}</p>
                    <span
                      className={`text-xs flex items-center ${
                        artwork.priceChange >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {artwork.priceChange >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-0.5" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-0.5" />
                      )}
                      {Math.abs(artwork.priceChange)}%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Highest Bid</p>
                  <p className="text-3xl font-bold">${artwork.askPrice - 10}</p>
                  <p className="text-sm text-muted-foreground mt-1">{artwork.bids} active bids</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex gap-3">
                <Input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="text-lg"
                  min={artwork.askPrice - 10 + 10}
                  step={10}
                />
                <Button size="lg" className="px-8 bg-green-600 hover:bg-green-700">
                  Place Bid
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Enter ${artwork.askPrice - 10 + 10} or more</p>

              <Button variant="outline" size="lg" className="w-full mt-2 bg-transparent">
                Buy Now for ${artwork.askPrice}
              </Button>
            </div>

            <Separator className="my-8" />

            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="bids">Bid History</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-4 space-y-4">
                <p>{artwork.description}</p>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm font-medium">Dimensions</p>
                    <p className="text-sm text-muted-foreground">{artwork.dimensions}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Medium</p>
                    <p className="text-sm text-muted-foreground">{artwork.medium}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Created</p>
                    <p className="text-sm text-muted-foreground">{artwork.created}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Price History
                  </h3>
                  <PriceChart />
                </div>
              </TabsContent>

              <TabsContent value="shipping" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Package className="h-5 w-5 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Specialized Art Packaging</p>
                          <p className="text-sm text-muted-foreground">
                            All artwork is carefully packaged in custom-sized boxes with protective materials to ensure
                            safe delivery.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Authenticity Verification</p>
                          <p className="text-sm text-muted-foreground">
                            Each piece is verified by our team before being shipped to the buyer.
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mt-4">
                        Estimated delivery: 7-10 business days after verification
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bids" className="mt-4">
                <BidHistory artworkId={artwork.id} />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>

      <section className="mt-24">
        <SimilarArtworks />
      </section>
    </div>
  )
}
