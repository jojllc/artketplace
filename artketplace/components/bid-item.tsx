import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock3, ArrowUpCircle } from "lucide-react"

interface BidItemProps {
  id: string
  title: string
  imageUrl: string
  yourBid: number
  currentBid: number
  endTime: string
  status: "highest" | "outbid" | "won" | "lost"
}

export function BidItem({ id, title, imageUrl, yourBid, currentBid, endTime, status }: BidItemProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-48 h-48">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 192px"
            />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">{title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Clock3 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{endTime}</span>
                </div>
              </div>
              {status === "highest" && <Badge className="bg-green-500 hover:bg-green-500/90">Highest Bid</Badge>}
              {status === "outbid" && <Badge variant="destructive">Outbid</Badge>}
              {status === "won" && <Badge className="bg-green-500 hover:bg-green-500/90">Won</Badge>}
              {status === "lost" && <Badge variant="secondary">Lost</Badge>}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Your bid</p>
                <p className="font-medium">${yourBid}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current bid</p>
                <p className="font-medium">${currentBid}</p>
              </div>
            </div>

            <div className="mt-auto pt-4 flex gap-3 justify-end">
              <Link href={`/artwork/${id}`}>
                <Button variant="outline">View Artwork</Button>
              </Link>
              {status === "outbid" && (
                <Button>
                  <ArrowUpCircle className="h-4 w-4 mr-2" />
                  Place Higher Bid
                </Button>
              )}
              {status === "won" && <Button>View Shipping Details</Button>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
