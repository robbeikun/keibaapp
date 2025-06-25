"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Eye, Activity, User, Weight, Target } from "lucide-react"
import type { EntryWithDetails } from "@/hooks/useRaceEntries"

interface HorseDetailModalProps {
  entry: EntryWithDetails | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HorseDetailModal({ entry, open, onOpenChange }: HorseDetailModalProps) {
  if (!entry) return null

  const getFrameColor = (frameNumber: number) => {
    const colors = [
      "bg-white border-gray-300", // 0 (使用しない)
      "bg-white border-gray-800", // 1枠 白
      "bg-black text-white border-black", // 2枠 黒
      "bg-red-500 text-white border-red-500", // 3枠 赤
      "bg-blue-500 text-white border-blue-500", // 4枠 青
      "bg-yellow-400 text-black border-yellow-400", // 5枠 黄
      "bg-green-500 text-white border-green-500", // 6枠 緑
      "bg-orange-500 text-white border-orange-500", // 7枠 橙
      "bg-pink-400 text-white border-pink-400", // 8枠 桃
    ]
    return colors[frameNumber] || "bg-gray-100 border-gray-300"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 ${getFrameColor(entry.frame_number)}`}
              >
                {entry.frame_number}
              </div>
              <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {entry.horse_number}
              </div>
            </div>
            <div>
              <DialogTitle className="text-2xl">{entry.horse.name}</DialogTitle>
              <DialogDescription className="text-lg">
                {entry.horse.age}歳{entry.horse.sex} / {entry.weight}.0kg / {entry.jockey}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* 基本情報 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-red-600" />
                基本情報
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <div>
                    <div className="text-sm text-gray-600">調教師</div>
                    <div className="font-medium">{entry.horse.trainer}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-gray-600" />
                  <div>
                    <div className="text-sm text-gray-600">馬主</div>
                    <div className="font-medium">{entry.horse.owner}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Weight className="w-4 h-4 text-gray-600" />
                  <div>
                    <div className="text-sm text-gray-600">馬体重</div>
                    <div className="font-medium">
                      {entry.horse_weight}kg
                      {entry.horse_weight_change !== 0 && (
                        <span className={entry.horse_weight_change! > 0 ? "text-red-600" : "text-blue-600"}>
                          ({entry.horse_weight_change! > 0 ? "+" : ""}
                          {entry.horse_weight_change})
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 詳細な特徴データ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-red-600" />
                詳細な特徴データ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">後肢踏み込み</div>
                  <div className="font-bold text-lg text-red-700">{entry.horse_metrics.hind_leg_step}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">手前前肢</div>
                  <div className="font-bold text-lg text-red-700">{entry.horse_metrics.front_leg_leading}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">反手前前肢</div>
                  <div className="font-bold text-lg text-red-700">{entry.horse_metrics.front_leg_non_leading}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">ストライド</div>
                  <div className="font-bold text-lg text-red-700">{entry.horse_metrics.stride}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">首の高さ</div>
                  <div className="font-bold text-lg text-red-700">{entry.horse_metrics.neck_height}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">首の動き</div>
                  <div className="font-bold text-lg text-red-700">{entry.horse_metrics.neck_swing}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BPMデータ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-red-600" />
                BPMデータ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">追走時BPM</div>
                  <div className="text-3xl font-bold text-blue-600">{entry.horse_metrics.bpm_chasing}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {entry.horse_metrics.bpm_chasing < 70 && "非常に良好"}
                    {entry.horse_metrics.bpm_chasing >= 70 && entry.horse_metrics.bpm_chasing < 85 && "良好"}
                    {entry.horse_metrics.bpm_chasing >= 85 && entry.horse_metrics.bpm_chasing < 100 && "普通"}
                    {entry.horse_metrics.bpm_chasing >= 100 && "要注意"}
                  </div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">スパート時BPM</div>
                  <div className="text-3xl font-bold text-red-600">{entry.horse_metrics.bmp_sprint}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {entry.horse_metrics.bmp_sprint < 100 && "低め"}
                    {entry.horse_metrics.bmp_sprint >= 100 && entry.horse_metrics.bmp_sprint < 120 && "標準"}
                    {entry.horse_metrics.bmp_sprint >= 120 && "高め"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 注意事項 */}
          <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
            <p>
              ※ このデータは予想の参考材料の一つです。過去の成績、血統、騎手、馬場状態なども総合的に考慮してください。
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
