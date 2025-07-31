"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export function TrendingSection() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const trendingItems = [
    {
      id: "1",
      title: "Abstract Harmony",
      imageUrl: "/placeholder.svg?height=400&width=300",
      price: 450,
      change: "+12%",
    },
    {
      id: "4",
      title: "Forest Dreams",
      imageUrl: "/placeholder.svg?height=400&width=300",
      price: 510,
      change: "+8%",
    },
    {
      id: "14",
      title: "Jazz Night",
      imageUrl: "/placeholder.svg?height=400&width=300",
      price: 480,
      change: "+15%",
    },
    {
      id: "6",
      title: "Sunset Reflections",
      imageUrl: "/placeholder.svg?height=400&width=300",
      price: 380,
      change: "+9%",
    },
    {
      id: "9",
      title: "Midnight Garden",
      imageUrl: "/placeholder.svg?height=400&width=300",
      price: 210,
      change: "+11%",
    },
    {
      id: "7",
      title: "Portrait Study",
      imageUrl: "/placeholder.svg?height=400&width=300",
      price: 420,
      change: "+5%",
    },
  ]

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollAmount = 320

      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setScrollPosition(scrollContainerRef.current.scrollLeft)
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const showLeftButton = scrollPosition > 0
  const showRightButton = scrollContainerRef.current
    ? scrollPosition < scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth - 10
    : true

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <h2 className="text-2xl font-bold tracking-tight">Trending Now</h2>
        </div>
        <Link href="/trending">
          <Button variant="link" className="text-sm">
            View All
          </Button>
        </Link>
      </div>

      <div className="relative">
        {showLeftButton && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Scroll left</span>
          </Button>
        )}

        <div ref={scrollContainerRef} className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x">
          {trendingItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[250px] snap-start"
            >
              <Link href={`/artwork/${item.id}`}>
                <div className="group relative overflow-hidden rounded-lg">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="250px"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-medium">{item.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-white font-bold">${item.price}</p>
                      <p className="text-green-400 text-sm">{item.change}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {showRightButton && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Scroll right</span>
          </Button>
        )}
      </div>
    </div>
  )
}
