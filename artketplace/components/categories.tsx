"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export function Categories() {
  const categories = [
    {
      name: "Abstract",
      image: "/placeholder.svg?height=200&width=200",
      slug: "abstract",
    },
    {
      name: "Landscape",
      image: "/placeholder.svg?height=200&width=200",
      slug: "landscape",
    },
    {
      name: "Portrait",
      image: "/placeholder.svg?height=200&width=200",
      slug: "portrait",
    },
    {
      name: "Modern",
      image: "/placeholder.svg?height=200&width=200",
      slug: "modern",
    },
    {
      name: "Surreal",
      image: "/placeholder.svg?height=200&width=200",
      slug: "surreal",
    },
  ]

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/category/${category.slug}`} className="block group">
              <div className="relative overflow-hidden rounded-lg">
                <div className="aspect-square relative">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white font-medium text-lg">{category.name}</h3>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
