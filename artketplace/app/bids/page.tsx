import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import { BidItem } from "@/components/bid-item"

export default function MyBidsPage() {
  return (
    <div className="container py-8">
      <Link href="/" className="inline-flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to marketplace
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Bids</h1>
        <Tabs defaultValue="active" className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="active">Active Bids</TabsTrigger>
            <TabsTrigger value="won">Won</TabsTrigger>
            <TabsTrigger value="lost">Lost</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-0 space-y-6">
            <BidItem
              id="1"
              title="Abstract Harmony"
              imageUrl="/placeholder.svg?height=400&width=300"
              yourBid={450}
              currentBid={450}
              endTime="23h 45m"
              status="highest"
            />

            <BidItem
              id="4"
              title="Forest Dreams"
              imageUrl="/placeholder.svg?height=400&width=300"
              yourBid={490}
              currentBid={510}
              endTime="1d 8h"
              status="outbid"
            />

            <BidItem
              id="13"
              title="Autumn Leaves"
              imageUrl="/placeholder.svg?height=400&width=300"
              yourBid={340}
              currentBid={340}
              endTime="5h 20m"
              status="highest"
            />
          </TabsContent>
          <TabsContent value="won" className="mt-0 space-y-6">
            <BidItem
              id="20"
              title="City Lights"
              imageUrl="/placeholder.svg?height=400&width=300"
              yourBid={380}
              currentBid={380}
              endTime="Ended 2 days ago"
              status="won"
            />

            <BidItem
              id="21"
              title="Summer Meadow"
              imageUrl="/placeholder.svg?height=400&width=300"
              yourBid={290}
              currentBid={290}
              endTime="Ended 1 week ago"
              status="won"
            />
          </TabsContent>
          <TabsContent value="lost" className="mt-0 space-y-6">
            <BidItem
              id="22"
              title="Winter Cabin"
              imageUrl="/placeholder.svg?height=400&width=300"
              yourBid={320}
              currentBid={350}
              endTime="Ended 3 days ago"
              status="lost"
            />

            <BidItem
              id="23"
              title="Ocean Waves"
              imageUrl="/placeholder.svg?height=400&width=300"
              yourBid={270}
              currentBid={310}
              endTime="Ended 5 days ago"
              status="lost"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
