"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Search, Calendar, Trophy, Activity, TrendingUp, Eye, Zap } from "lucide-react"
import Link from "next/link"
import { useHorseSearch, type SearchFilters } from "@/hooks/useHorseSearch"
import { NavigationBanner } from "@/components/navigation-banner"

export default function HorsesPage() {
  const { horses, loading, error, searchHorses } = useHorseSearch()

  // 検索フォームの状態
  const [searchForm, setSearchForm] = useState<SearchFilters>({
    name: "",
    class: "",
    sex: [],
    minAge: undefined,
    maxAge: undefined,
    includeRegistered: false,
    includeRetired: false,
  })

  // 検索実行
  const handleSearch = async () => {
    await searchHorses(searchForm)
  }

  // 検索条件リセット
  const handleReset = () => {
    setSearchForm({
      name: "",
      class: "",
      sex: [],
      minAge: undefined,
      maxAge: undefined,
      includeRegistered: false,
      includeRetired: false,
    })
  }

  // 性別チェックボックスの変更
  const handleSexChange = (sex: string, checked: boolean) => {
    setSearchForm((prev) => ({
      ...prev,
      sex: checked ? [...(prev.sex || []), sex] : (prev.sex || []).filter((s) => s !== sex),
    }))
  }

  // 着順の色分け
  const getResultColor = (result: string) => {
    if (result === "1着") return "bg-yellow-100 text-yellow-800 border-yellow-300"
    if (result === "2着") return "bg-gray-100 text-gray-800 border-gray-300"
    if (result === "3着") return "bg-orange-100 text-orange-800 border-orange-300"
    return "bg-gray-100 text-gray-800 border-gray-300"
  }

  // クラスの色分け
  const getClassColor = (horseClass: string) => {
    if (horseClass.startsWith("A")) return "bg-red-100 text-red-800 border-red-300"
    if (horseClass.startsWith("B")) return "bg-blue-100 text-blue-800 border-blue-300"
    if (horseClass.startsWith("C")) return "bg-green-100 text-green-800 border-green-300"
    return "bg-gray-100 text-gray-800 border-gray-300"
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-red-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-white hover:text-red-300">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-white" />
              <h1 className="text-xl font-bold">競走馬検索</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-20">
        {/* ナビゲーションバナー */}
        <NavigationBanner currentPage="horses" />

        {/* 時短アピール */}
        <Card className="mb-6 bg-red-50 border-red-200">
          <CardContent className="py-3">
            <div className="flex items-center gap-2 text-red-700">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">詳細条件で馬を絞り込み検索</span>
            </div>
          </CardContent>
        </Card>

        {/* 詳細検索フォーム */}
        <Card className="mb-6 bg-white border-gray-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <Search className="w-5 h-5" />
              詳細検索条件
            </CardTitle>
            <CardDescription>各項目を入力して馬を検索できます</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 馬名 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="text-sm font-medium text-gray-700">馬名</label>
              <div className="md:col-span-3">
                <Input
                  placeholder="馬名を入力（全角カタカナ、前方一致）"
                  value={searchForm.name}
                  onChange={(e) => setSearchForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="border-gray-300 focus:border-red-500"
                />
              </div>
            </div>

            {/* クラス */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="text-sm font-medium text-gray-700">クラス（格）</label>
              <div className="md:col-span-3">
                <Select
                  value={searchForm.class}
                  onValueChange={(value) => setSearchForm((prev) => ({ ...prev, class: value === "all" ? "" : value }))}
                >
                  <SelectTrigger className="border-gray-300 focus:border-red-500">
                    <SelectValue placeholder="クラスを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべて</SelectItem>
                    <SelectItem value="A1">A1</SelectItem>
                    <SelectItem value="A2">A2</SelectItem>
                    <SelectItem value="A3">A3</SelectItem>
                    <SelectItem value="B1">B1</SelectItem>
                    <SelectItem value="B2">B2</SelectItem>
                    <SelectItem value="B3">B3</SelectItem>
                    <SelectItem value="C1">C1</SelectItem>
                    <SelectItem value="C2">C2</SelectItem>
                    <SelectItem value="C3">C3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 性別 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <label className="text-sm font-medium text-gray-700 pt-2">性別</label>
              <div className="md:col-span-3 space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="male"
                    checked={searchForm.sex?.includes("牡")}
                    onCheckedChange={(checked) => handleSexChange("牡", checked as boolean)}
                  />
                  <label htmlFor="male" className="text-sm text-gray-700">
                    牡馬
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="female"
                    checked={searchForm.sex?.includes("牝")}
                    onCheckedChange={(checked) => handleSexChange("牝", checked as boolean)}
                  />
                  <label htmlFor="female" className="text-sm text-gray-700">
                    牝馬
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="gelding"
                    checked={searchForm.sex?.includes("騙")}
                    onCheckedChange={(checked) => handleSexChange("騙", checked as boolean)}
                  />
                  <label htmlFor="gelding" className="text-sm text-gray-700">
                    騙馬
                  </label>
                </div>
              </div>
            </div>

            {/* 馬齢 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label className="text-sm font-medium text-gray-700">馬齢</label>
              <div className="md:col-span-3 flex items-center gap-4">
                {/* 最小年齢 */}
                <Select
                  value={searchForm.minAge !== undefined ? searchForm.minAge.toString() : "none"}
                  onValueChange={(value) =>
                    setSearchForm((prev) => ({
                      ...prev,
                      minAge: value === "none" ? undefined : Number.parseInt(value),
                    }))
                  }
                >
                  <SelectTrigger className="w-24 border-gray-300 focus:border-red-500">
                    <SelectValue placeholder="最小" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">指定なし</SelectItem>
                    {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((age) => (
                      <SelectItem key={age} value={age.toString()}>
                        {age}歳
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <span className="text-gray-500">〜</span>

                {/* 最大年齢 */}
                <Select
                  value={searchForm.maxAge !== undefined ? searchForm.maxAge.toString() : "none"}
                  onValueChange={(value) =>
                    setSearchForm((prev) => ({
                      ...prev,
                      maxAge: value === "none" ? undefined : Number.parseInt(value),
                    }))
                  }
                >
                  <SelectTrigger className="w-24 border-gray-300 focus:border-red-500">
                    <SelectValue placeholder="最大" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">指定なし</SelectItem>
                    {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((age) => (
                      <SelectItem key={age} value={age.toString()}>
                        {age}歳
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* その他オプション */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <label className="text-sm font-medium text-gray-700 pt-2">その他オプション</label>
              <div className="md:col-span-3 space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="registered"
                    checked={searchForm.includeRegistered}
                    onCheckedChange={(checked) =>
                      setSearchForm((prev) => ({
                        ...prev,
                        includeRegistered: checked as boolean,
                      }))
                    }
                  />
                  <label htmlFor="registered" className="text-sm text-gray-700">
                    出走登録馬から検索
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="retired"
                    checked={searchForm.includeRetired}
                    onCheckedChange={(checked) =>
                      setSearchForm((prev) => ({
                        ...prev,
                        includeRetired: checked as boolean,
                      }))
                    }
                  />
                  <label htmlFor="retired" className="text-sm text-gray-700">
                    抹消馬を含む
                  </label>
                </div>
              </div>
            </div>

            {/* 検索ボタン */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <Button onClick={handleSearch} disabled={loading} className="bg-red-600 hover:bg-red-700 text-white px-8">
                <Search className="w-4 h-4 mr-2" />
                {loading ? "検索中..." : "検索"}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8"
              >
                リセット
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 検索結果 */}
        {horses.length > 0 && (
          <>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-800">検索結果 ({horses.length}頭)</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {horses.map((horse) => (
                <Card key={horse.id} className="border-gray-300 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl text-gray-800">{horse.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {horse.age}歳{horse.sex} / {horse.trainer}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className={getClassColor(horse.class)}>
                        {horse.class}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* 最近の成績 */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2 flex items-center gap-2 text-red-700">
                        <Trophy className="w-4 h-4" />
                        最近の成績
                      </h4>
                      <div className="space-y-1">
                        {horse.recentRaces.slice(0, 2).map((race, index) => (
                          <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">{race.date}</span>
                              <span className="text-gray-600">{race.distance}</span>
                            </div>
                            <Badge variant="outline" className={getResultColor(race.result)}>
                              {race.result}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 馬の特徴データ */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2 flex items-center gap-2 text-red-700">
                        <Activity className="w-4 h-4" />
                        特徴データ
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">ストライド:</span>
                          <span className="font-medium">{horse.metrics.stride}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">踏み込み:</span>
                          <span className="font-medium">{horse.metrics.hindLegStep}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">BPM追走:</span>
                          <span className="font-medium">{horse.metrics.bmpChasing}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">BPMスパート:</span>
                          <span className="font-medium">{horse.metrics.bmpSprint}</span>
                        </div>
                      </div>
                    </div>

                    {/* アクションボタン */}
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700">
                            詳細を見る
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-xl">{horse.name}</DialogTitle>
                            <DialogDescription>
                              {horse.age}歳{horse.sex} / 調教師: {horse.trainer} / 馬主: {horse.owner}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-6">
                            {/* 基本情報 */}
                            <div>
                              <h3 className="font-semibold mb-3 flex items-center gap-2">
                                <Eye className="w-4 h-4 text-red-600" />
                                基本情報
                              </h3>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">現在のクラス:</span>
                                  <Badge variant="outline" className={getClassColor(horse.class)}>
                                    {horse.class}
                                  </Badge>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">調教師:</span>
                                  <span className="font-medium">{horse.trainer}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">馬主:</span>
                                  <span className="font-medium">{horse.owner}</span>
                                </div>
                              </div>
                            </div>

                            {/* 詳細な特徴データ */}
                            <div>
                              <h3 className="font-semibold mb-3 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-red-600" />
                                詳細な特徴データ
                              </h3>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">ストライド:</span>
                                  <span className="font-medium">{horse.metrics.stride}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">後肢踏み込み:</span>
                                  <span className="font-medium">{horse.metrics.hindLegStep}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">手前前肢:</span>
                                  <span className="font-medium">{horse.metrics.frontLegLeading}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">首の動き:</span>
                                  <span className="font-medium">{horse.metrics.neckSwing}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">BPM（追走時）:</span>
                                  <span className="font-medium">{horse.metrics.bmpChasing}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">BPM（スパート時）:</span>
                                  <span className="font-medium">{horse.metrics.bmpSprint}</span>
                                </div>
                              </div>
                            </div>

                            {/* 最近の全成績 */}
                            <div>
                              <h3 className="font-semibold mb-3 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-red-600" />
                                最近の成績
                              </h3>
                              <div className="space-y-2">
                                {horse.recentRaces.map((race, index) => (
                                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                    <div>
                                      <div className="font-medium">{race.raceName}</div>
                                      <div className="text-sm text-gray-600">
                                        {race.date} / {race.place} / {race.distance}
                                      </div>
                                    </div>
                                    <Badge variant="outline" className={getResultColor(race.result)}>
                                      {race.result}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
                      >
                        予想に追加
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* 検索結果なし */}
        {!loading && horses.length === 0 && (
          <Card className="border-gray-200">
            <CardContent className="text-center py-12">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">検索条件を入力して馬を検索してください</p>
              <p className="text-gray-500 text-sm">詳細な条件を指定することで、より精密な検索が可能です</p>
            </CardContent>
          </Card>
        )}

        {/* エラー表示 */}
        {error && (
          <Card className="border-red-300 bg-red-50">
            <CardContent className="text-center py-8">
              <p className="text-red-600">エラーが発生しました: {error}</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
