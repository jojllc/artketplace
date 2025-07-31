"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { MenuIcon, SearchIcon, User, Heart, Clock, Package, Bell, LogOut } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] pr-0">
        <SheetHeader>
          <SheetTitle>ArtX</SheetTitle>
        </SheetHeader>

        <div className="mt-6 pr-6">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search artwork..." className="pl-8 bg-muted/50" />
          </div>

          <nav className="mt-6 flex flex-col space-y-1">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:bg-muted transition-colors"
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            <Link
              href="/bids"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:bg-muted transition-colors"
            >
              <Clock className="h-5 w-5" />
              <span>My Bids</span>
            </Link>
            <Link
              href="/selling"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:bg-muted transition-colors"
            >
              <Package className="h-5 w-5" />
              <span>Selling</span>
            </Link>
            <Link
              href="/favorites"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:bg-muted transition-colors"
            >
              <Heart className="h-5 w-5" />
              <span>Favorites</span>
            </Link>
            <Link
              href="/notifications"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:bg-muted transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </Link>
          </nav>

          <div className="mt-6 border-t pt-6">
            <nav className="flex flex-col space-y-1">
              <Link
                href="/browse"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-foreground hover:bg-muted transition-colors"
              >
                Browse All
              </Link>
              <Link
                href="/trending"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-foreground hover:bg-muted transition-colors"
              >
                Trending Now
              </Link>
              <Link
                href="/new-arrivals"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-foreground hover:bg-muted transition-colors"
              >
                New Arrivals
              </Link>
              <Link
                href="/ending-soon"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-foreground hover:bg-muted transition-colors"
              >
                Ending Soon
              </Link>
            </nav>
          </div>

          <div className="mt-6 border-t pt-6">
            <Button variant="ghost" className="w-full justify-start gap-3 px-3">
              <LogOut className="h-5 w-5" />
              <span>Log Out</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
