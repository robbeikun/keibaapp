"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Zap, Users } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useRaceEntries } from "@/hooks/useRaceEntries"
import { RaceOverview } from "@/components/race-overview"
import { EntryTable } from "@/components/entry-table"
import { HorseDetailModal } from "@/components/horse-detail-modal"
import { NavigationBanner } from "@/components/navigation-banner"
import type { EntryWithDetails } from "@/hooks/useRaceEntries"

export default function RacePage() {
  const params = useParams()
  const raceId = params.id as string

  const { race, entries, loading, error, refetch } = useRaceEntries(raceId)
  const [selectedHorse, setSelectedHorse] = useState<EntryWithDetails | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (raceId) {
      refetch()
    }
  }, [raceId])

  const handleHorseClick = (entry: EntryWithDetails) => {
    setSelectedHorse(entry)
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm border-b border-gray-300">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-800">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-xl font-bold text-gray-800">出走表</h1>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-6">
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm border-b border-gray-300">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-800">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-xl font-bold text-gray-800">出走表</h1>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-6">
          <Card className="border-red-300 bg-red-50">
            <CardContent className="text-center py-8">
              <p className="text-red-600">エラーが発生しました: {error}</p>
              <Button onClick={refetch} className="mt-4 bg-red-600 hover:bg-red-700">
                再読み込み
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  if (!race) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm border-b border-gray-300">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-800">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-xl font-bold text-gray-800">出走表</h1>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-6">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-600">レースが見つかりませんでした</p>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b border-gray-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-red-600" />
              <h1 className="text-xl font-bold text-gray-800">出走表</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-20">
        {/* ナビゲーションバナー */}
        <NavigationBanner />

        {/* レース概要 */}
        <RaceOverview race={race} />

        {/* My予想への移動ボタン */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-800">このレースの出走表を確認</h3>
                  <p className="text-sm text-blue-600">出走表を確認して予想を入力しましょう</p>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href={`/my-entries?race=${raceId}`}>
                  <Users className="w-4 h-4 mr-2" />
                  出走表へ
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 出走表 */}
        <EntryTable entries={entries} onHorseClick={handleHorseClick} />

        {/* 馬詳細モーダル */}
        <HorseDetailModal entry={selectedHorse} open={isModalOpen} onOpenChange={setIsModalOpen} />
      </main>
    </div>
  )
}
