import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, PlusCircle } from "lucide-react"

export default function SellingPage() {
  return (
    <div className="container py-8">
      <Link href="/" className="inline-flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to marketplace
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Selling</h1>
        <Link href="/selling/new">
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            List New Artwork
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="w-full md:w-auto grid grid-cols-3 md:inline-flex">
          <TabsTrigger value="active">Active Listings</TabsTrigger>
          <TabsTrigger value="sold">Sold</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6 space-y-6">
          {/* …cards… */}
        </TabsContent>
        <TabsContent value="sold" className="mt-6 space-y-6">
          {/* …cards… */}
        </TabsContent>
        <TabsContent value="drafts" className="mt-6 space-y-6">
          {/* …cards… */}
        </TabsContent>
      </Tabs>
    </div>
  )
}
