"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, TrendingDown } from "lucide-react"
import type { EntryWithDetails } from "@/hooks/useRaceEntries"

interface EntryTableProps {
  entries: EntryWithDetails[]
  onHorseClick?: (entry: EntryWithDetails) => void
}

// 枠番の色分け
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

// 着順の背景色
const getResultBackground = (position?: number) => {
  if (!position) return ""
  if (position === 1) return "bg-yellow-50 border-yellow-200"
  if (position === 2) return "bg-gray-50 border-gray-200"
  if (position === 3) return "bg-orange-50 border-orange-200"
  return ""
}

// 馬体重の増減表示
const getWeightChangeDisplay = (change: number) => {
  if (change === 0) return <span className="text-gray-500">±0</span>
  if (change > 0) {
    return (
      <span className="text-red-600 flex items-center gap-1">
        <TrendingUp className="w-3 h-3" />+{change}
      </span>
    )
  }
  return (
    <span className="text-blue-600 flex items-center gap-1">
      <TrendingDown className="w-3 h-3" />
      {change}
    </span>
  )
}

export function EntryTable({ entries, onHorseClick }: EntryTableProps) {
  return (
    <Card className="border-gray-300 bg-white">
      <CardHeader className="bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-gray-800 flex items-center gap-2">
          <Users className="w-5 h-5 text-red-600" />
          出走馬一覧
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200">
                  枠
                </th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200">
                  馬番
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200">
                  馬名
                </th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200">
                  性齢
                </th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200">
                  斤量
                </th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200">
                  馬体重
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200">
                  騎手
                </th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200">
                  後肢踏込
                </th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200">
                  手前前肢
                </th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200">
                  反手前前肢
                </th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200">
                  ストライド
                </th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200">
                  追走BPM
                </th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                  スパートBPM
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entries.map((entry) => (
                <tr
                  key={entry.id}
                  className={`hover:bg-gray-50 cursor-pointer transition-colors ${getResultBackground(entry.result_position)}`}
                  onClick={() => onHorseClick?.(entry)}
                >
                  {/* 枠番 */}
                  <td className="px-3 py-4 text-center border-r border-gray-200">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${getFrameColor(entry.frame_number)}`}
                    >
                      {entry.frame_number}
                    </div>
                  </td>

                  {/* 馬番 */}
                  <td className="px-3 py-4 text-center border-r border-gray-200">
                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {entry.horse_number}
                    </div>
                  </td>

                  {/* 馬名 */}
                  <td className="px-4 py-4 border-r border-gray-200">
                    <div>
                      <div className="font-bold text-gray-900 text-base">{entry.horse.name}</div>
                      <div className="text-sm text-gray-500">{entry.horse.trainer}</div>
                    </div>
                  </td>

                  {/* 性齢 */}
                  <td className="px-3 py-4 text-center text-sm text-gray-900 border-r border-gray-200">
                    {entry.horse.sex}
                    {entry.horse.age}
                  </td>

                  {/* 斤量 */}
                  <td className="px-3 py-4 text-center text-sm text-gray-900 border-r border-gray-200">
                    {entry.weight}.0kg
                  </td>

                  {/* 馬体重 */}
                  <td className="px-3 py-4 text-center border-r border-gray-200">
                    <div className="text-sm text-gray-900">{entry.horse_weight}kg</div>
                    <div className="text-xs">{getWeightChangeDisplay(entry.horse_weight_change || 0)}</div>
                  </td>

                  {/* 騎手 */}
                  <td className="px-4 py-4 text-sm text-gray-900 border-r border-gray-200">{entry.jockey}</td>

                  {/* 後肢踏込 */}
                  <td className="px-3 py-4 text-center text-sm text-gray-900 border-r border-gray-200">
                    {entry.horse_metrics.hind_leg_step}
                  </td>

                  {/* 手前前肢 */}
                  <td className="px-3 py-4 text-center text-sm text-gray-900 border-r border-gray-200">
                    {entry.horse_metrics.front_leg_leading}
                  </td>

                  {/* 反手前前肢 */}
                  <td className="px-3 py-4 text-center text-sm text-gray-900 border-r border-gray-200">
                    {entry.horse_metrics.front_leg_non_leading}
                  </td>

                  {/* ストライド */}
                  <td className="px-3 py-4 text-center text-sm text-gray-900 border-r border-gray-200">
                    {entry.horse_metrics.stride}
                  </td>

                  {/* 追走BPM */}
                  <td className="px-3 py-4 text-center text-sm text-gray-900 border-r border-gray-200">
                    {entry.horse_metrics.bpm_chasing}
                  </td>

                  {/* スパートBPM */}
                  <td className="px-3 py-4 text-center text-sm text-gray-900">{entry.horse_metrics.bpm_sprint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* モバイル用カード表示 */}
        <div className="md:hidden p-4 space-y-4">
          {entries.map((entry) => (
            <Card
              key={entry.id}
              className={`border-gray-300 cursor-pointer hover:shadow-md transition-shadow ${getResultBackground(entry.result_position)}`}
              onClick={() => onHorseClick?.(entry)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${getFrameColor(entry.frame_number)}`}
                    >
                      {entry.frame_number}
                    </div>
                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {entry.horse_number}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{entry.horse.name}</div>
                      <div className="text-sm text-gray-500">
                        {entry.horse.sex}
                        {entry.horse.age} / {entry.weight}.0kg / {entry.jockey}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-900">{entry.horse_weight}kg</div>
                    <div className="text-xs">{getWeightChangeDisplay(entry.horse_weight_change || 0)}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">後肢踏込:</span>
                    <span className="font-medium">{entry.horse_metrics.hind_leg_step}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">手前前肢:</span>
                    <span className="font-medium">{entry.horse_metrics.front_leg_leading}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">反手前前肢:</span>
                    <span className="font-medium">{entry.horse_metrics.front_leg_non_leading}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ストライド:</span>
                    <span className="font-medium">{entry.horse_metrics.stride}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">追走BPM:</span>
                    <span className="font-medium">{entry.horse_metrics.bpm_chasing}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">スパートBPM:</span>
                    <span className="font-medium">{entry.horse_metrics.bmp_sprint}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
