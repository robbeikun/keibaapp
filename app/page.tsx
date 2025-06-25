"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, Zap } from "lucide-react"
import Link from "next/link"
import { NavigationBanner } from "@/components/navigation-banner"

// モックデータ
const mockRaces = [
  {
    id: 1,
    name: "第1レース",
    time: "19:15",
    distance: "1200m",
    surface: "ダート",
    entries: 12,
    status: "upcoming",
  },
  {
    id: 2,
    name: "第2レース",
    time: "19:45",
    distance: "1400m",
    surface: "ダート",
    entries: 14,
    status: "upcoming",
  },
  {
    id: 3,
    name: "第3レース",
    time: "20:15",
    distance: "1600m",
    surface: "ダート",
    entries: 16,
    status: "upcoming",
  },
  {
    id: 4,
    name: "第4レース",
    time: "20:45",
    distance: "1200m",
    surface: "ダート",
    entries: 12,
    status: "upcoming",
  },
]

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-red-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-white" />
            <h1 className="text-xl font-bold">大井競馬予想</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* ナビゲーションバナー */}
        <NavigationBanner currentPage="home" />

        {/* 開催日選択 */}
        <div className="mb-6">
          <Card className="border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-red-700">
                <Calendar className="w-5 h-5" />
                開催日選択
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700 font-medium">大井競馬場</span>
              </div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </CardContent>
          </Card>
        </div>

        {/* レース一覧 */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">本日のレース</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {mockRaces.map((race) => (
              <Card key={race.id} className="border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-gray-800">{race.name}</CardTitle>
                    <Badge className="bg-red-100 text-red-700 border-red-300">発走前</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    {race.time}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">距離</span>
                      <span className="font-medium">{race.distance}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">馬場</span>
                      <span className="font-medium">{race.surface}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">出走頭数</span>
                      <span className="font-medium flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {race.entries}頭
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                      <Link href={`/my-entries?race=${race.id}`}>
                        <Users className="w-4 h-4 mr-2" />
                        出走表
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
