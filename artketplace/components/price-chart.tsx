"use client"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function PriceChart() {
  const data = [
    { date: "Jan", price: 230 },
    { date: "Feb", price: 250 },
    { date: "Mar", price: 280 },
    { date: "Apr", price: 310 },
    { date: "May", price: 290 },
    { date: "Jun", price: 350 },
    { date: "Jul", price: 380 },
    { date: "Aug", price: 420 },
    { date: "Sep", price: 390 },
    { date: "Oct", price: 420 },
    { date: "Nov", price: 450 },
  ]

  return (
    <Card className="p-4">
      <Tabs defaultValue="6m">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="1m">1M</TabsTrigger>
            <TabsTrigger value="3m">3M</TabsTrigger>
            <TabsTrigger value="6m">6M</TabsTrigger>
            <TabsTrigger value="1y">1Y</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="6m" className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis domain={["dataMin - 50", "dataMax + 50"]} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#000" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="1m" className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.slice(-3)}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis domain={["dataMin - 20", "dataMax + 20"]} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#000" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="3m" className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.slice(-6)}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis domain={["dataMin - 30", "dataMax + 30"]} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#000" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="1y" className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis domain={["dataMin - 50", "dataMax + 50"]} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#000" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="all" className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis domain={["dataMin - 100", "dataMax + 50"]} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#000" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
