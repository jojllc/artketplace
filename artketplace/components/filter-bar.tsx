"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { FilterIcon, SlidersHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function FilterBar() {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 py-4 border-y">
      <div className="flex flex-wrap gap-3">
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px] bg-muted/50">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="abstract">Abstract</SelectItem>
            <SelectItem value="landscape">Landscape</SelectItem>
            <SelectItem value="portrait">Portrait</SelectItem>
            <SelectItem value="modern">Modern</SelectItem>
            <SelectItem value="surreal">Surreal</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="trending">
          <SelectTrigger className="w-[180px] bg-muted/50">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="trending">Trending</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="ending-soon">Ending Soon</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Checkbox
            id="verified"
            checked={showVerifiedOnly}
            onCheckedChange={(checked) => setShowVerifiedOnly(checked as boolean)}
          />
          <Label htmlFor="verified" className="text-sm cursor-pointer">
            Verified Only
          </Label>
        </div>
      </div>

      <div className="flex gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <SlidersHorizontal className="h-4 w-4" />
              Advanced Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Refine your search with advanced filters</SheetDescription>
            </SheetHeader>

            <div className="py-6 space-y-6">
              <div className="space-y-2">
                <h4 className="font-medium">Price Range</h4>
                <div className="pt-4 px-2">
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={10}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Medium</h4>
                <div className="space-y-2">
                  {["Oil", "Acrylic", "Watercolor", "Digital", "Mixed Media"].map((medium) => (
                    <div key={medium} className="flex items-center gap-2">
                      <Checkbox id={`medium-${medium}`} />
                      <Label htmlFor={`medium-${medium}`} className="text-sm">
                        {medium}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Size</h4>
                <div className="space-y-2">
                  {['Small (under 12")', 'Medium (12-24")', 'Large (24-36")', 'Extra Large (over 36")'].map((size) => (
                    <div key={size} className="flex items-center gap-2">
                      <Checkbox id={`size-${size}`} />
                      <Label htmlFor={`size-${size}`} className="text-sm">
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <SheetFooter>
              <Button className="w-full">Apply Filters</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <Button variant="ghost" size="sm" className="gap-2">
          <FilterIcon className="h-4 w-4" />
          Clear
        </Button>
      </div>
    </div>
  )
}
