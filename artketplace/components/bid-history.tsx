"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

interface Bid {
  id: string
  bidder: string
  amount: number
  time: string
}

interface BidHistoryProps {
  artworkId: string
}

export function BidHistory({ artworkId }: BidHistoryProps) {
  // Mock data for the example
  const [bids, setBids] = useState<Bid[]>([
    { id: "1", bidder: "User8392", amount: 450, time: "2 hours ago" },
    { id: "2", bidder: "User5671", amount: 430, time: "5 hours ago" },
    { id: "3", bidder: "User2309", amount: 410, time: "8 hours ago" },
    { id: "4", bidder: "User7654", amount: 390, time: "12 hours ago" },
    { id: "5", bidder: "User1122", amount: 370, time: "1 day ago" },
    { id: "6", bidder: "User3344", amount: 350, time: "1 day ago" },
    { id: "7", bidder: "User9876", amount: 330, time: "2 days ago" },
    { id: "8", bidder: "User4455", amount: 310, time: "2 days ago" },
    { id: "9", bidder: "User6677", amount: 290, time: "3 days ago" },
    { id: "10", bidder: "User2233", amount: 270, time: "3 days ago" },
    { id: "11", bidder: "User8899", amount: 250, time: "4 days ago" },
    { id: "12", bidder: "User1010", amount: 230, time: "4 days ago" },
  ])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium">Bid History</h3>
        </div>

        <motion.div
          className="space-y-4 max-h-[300px] overflow-y-auto pr-2"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {bids.map((bid) => (
            <motion.div
              key={bid.id}
              className="flex justify-between items-center text-sm p-2 hover:bg-muted/50 rounded-md transition-colors"
              variants={item}
            >
              <div>
                <p className="font-medium">{bid.bidder}</p>
                <p className="text-muted-foreground">{bid.time}</p>
              </div>
              <p className="font-medium">${bid.amount}</p>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}
