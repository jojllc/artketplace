"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Discover Unique Art",
      subtitle: "Anonymous. Authentic. Extraordinary.",
      image: "/placeholder.svg?height=800&width=1200",
      color: "from-purple-500 to-blue-500",
    },
    {
      title: "Bid With Confidence",
      subtitle: "Secure transactions with verified artwork",
      image: "/placeholder.svg?height=800&width=1200",
      color: "from-amber-500 to-red-500",
    },
    {
      title: "Sell Your Creations",
      subtitle: "Connect with buyers while maintaining anonymity",
      image: "/placeholder.svg?height=800&width=1200",
      color: "from-emerald-500 to-teal-500",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="relative h-[70vh] min-h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentSlide === index ? 1 : 0,
            zIndex: currentSlide === index ? 10 : 0,
          }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r opacity-40 z-0" />

          <div className="relative z-20 container h-full flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: currentSlide === index ? 1 : 0,
                y: currentSlide === index ? 0 : 20,
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{slide.title}</h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">{slide.subtitle}</p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-white text-black hover:bg-white/90">
                  Explore Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white/20 bg-transparent"
                >
                  How It Works
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}

      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? "w-8 bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
