import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArtworkGrid } from "@/components/artwork-grid"
import { HeroSection } from "@/components/hero-section"
import { TrendingSection } from "@/components/trending-section"
import { FilterBar } from "@/components/filter-bar"
import { SearchIcon, BellIcon, UserIcon } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { Categories } from "@/components/categories"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">ArtX</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-sm font-medium">
                Browse
              </Link>
              <Link
                href="/bids"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                My Bids
              </Link>
              <Link
                href="/selling"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Selling
              </Link>
              <Link
                href="/news"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                News
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search artwork..."
                className="w-[200px] lg:w-[300px] pl-8 bg-muted/50 border-none focus-visible:ring-1"
              />
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <BellIcon className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <UserIcon className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <HeroSection />

        <div className="container py-8">
          <Categories />

          <div className="mt-12">
            <TrendingSection />
          </div>

          <div className="mt-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Browse Artwork</h2>
                <p className="text-muted-foreground mt-1">Discover unique pieces from anonymous artists</p>
              </div>
            </div>

            <FilterBar />

            <div className="mt-6">
              <ArtworkGrid />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-black text-white mt-24">
        <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">ArtX</h3>
            <p className="text-gray-400 text-sm">
              The premier marketplace for anonymous art trading. Buy and sell unique artwork with complete privacy.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Marketplace</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/browse" className="hover:text-white transition-colors">
                  Browse All
                </Link>
              </li>
              <li>
                <Link href="/trending" className="hover:text-white transition-colors">
                  Trending Now
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/ending-soon" className="hover:text-white transition-colors">
                  Ending Soon
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">My Account</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/profile" className="hover:text-white transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/bids" className="hover:text-white transition-colors">
                  My Bids
                </Link>
              </li>
              <li>
                <Link href="/selling" className="hover:text-white transition-colors">
                  My Listings
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-white transition-colors">
                  Favorites
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Help</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800">
          <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">© 2025 ArtX. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-gray-500">
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
