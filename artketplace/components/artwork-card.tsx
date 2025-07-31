"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { HeartIcon, Clock3Icon, TrendingUpIcon, TrendingDownIcon, ShieldCheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { motion } from "framer-motion"

interface ArtworkCardProps {
  id: string
  title: string
  imageUrl: string
  askPrice: number
  lastSalePrice: number
  priceChange: number
  bids: number
  endTime: string
  verified: boolean
}

export function ArtworkCard({
  id,
  title,
  imageUrl,
  askPrice,
  lastSalePrice,
  priceChange,
  bids,
  endTime,
  verified,
}: ArtworkCardProps) {
  const [liked, setLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/artwork/${id}`}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow">
          <div className="aspect-[3/4] relative overflow-hidden">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              fill
              className={cn("object-cover transition-transform duration-700", isHovered ? "scale-110" : "scale-100")}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {verified && (
              <div className="absolute top-2 right-2 bg-black/70 rounded-full p-1">
                <ShieldCheckIcon className="h-4 w-4 text-green-400" />
              </div>
            )}
          </div>
          <CardContent className="p-4 bg-white">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-lg truncate">{title}</h3>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setLiked(!liked)
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <HeartIcon className={cn("h-5 w-5", liked && "fill-red-500 text-red-500")} />
                <span className="sr-only">Like</span>
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-muted-foreground">Lowest Ask</p>
                <p className="font-semibold text-lg">${askPrice}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Last Sale</p>
                <div className="flex items-center gap-1">
                  <p className="font-medium">${lastSalePrice}</p>
                  <span
                    className={cn("text-xs flex items-center", priceChange >= 0 ? "text-green-600" : "text-red-600")}
                  >
                    {priceChange >= 0 ? (
                      <TrendingUpIcon className="h-3 w-3 mr-0.5" />
                    ) : (
                      <TrendingDownIcon className="h-3 w-3 mr-0.5" />
                    )}
                    {Math.abs(priceChange)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex items-center justify-between text-sm text-muted-foreground bg-white">
            <div className="flex items-center">
              <Clock3Icon className="h-4 w-4 mr-1" />
              <span>Ends in {endTime}</span>
            </div>
            <span>{bids} bids</span>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  )
}
