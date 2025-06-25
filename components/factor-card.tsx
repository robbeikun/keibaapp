"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target, Star, Activity, TrendingUp, Eye, BookOpen } from "lucide-react"
import Link from "next/link"
import type { Factor } from "@/hooks/useFactors"

interface FactorCardProps {
  factor: Factor
}

const iconMap: { [key: string]: JSX.Element } = {
  歩様: <Activity className="w-5 h-5" />,
  生理指標: <TrendingUp className="w-5 h-5" />,
  外観: <Eye className="w-5 h-5" />,
  環境: <Target className="w-5 h-5" />,
  戦術: <Star className="w-5 h-5" />,
  default: <BookOpen className="w-5 h-5" />,
}

const importanceColors = {
  高: "bg-red-100 text-red-700 border-red-300",
  中: "bg-yellow-100 text-yellow-700 border-yellow-300",
  低: "bg-green-100 text-green-700 border-green-300",
}

const categoryColors = {
  歩様: "bg-blue-100 text-blue-700 border-blue-300",
  生理指標: "bg-purple-100 text-purple-700 border-purple-300",
  外観: "bg-green-100 text-green-700 border-green-300",
  環境: "bg-orange-100 text-orange-700 border-orange-300",
  戦術: "bg-pink-100 text-pink-700 border-pink-300",
}

export function FactorCard({ factor }: FactorCardProps) {
  return (
    <Card className="border-gray-300 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg text-red-600">{iconMap[factor.category] || iconMap.default}</div>
            <div>
              <CardTitle className="text-xl text-gray-800">{factor.name}</CardTitle>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className={categoryColors[factor.category as keyof typeof categoryColors]}>
                  {factor.category}
                </Badge>
                <Badge
                  variant="outline"
                  className={importanceColors[factor.importance as keyof typeof importanceColors]}
                >
                  重要度: {factor.importance}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* 説明文 */}
          <p className="text-gray-700 leading-relaxed">{factor.description}</p>

          {/* チェックポイント */}
          {factor.checkPoints && factor.checkPoints.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-red-600" />
                チェックポイント
              </h4>
              <ul className="space-y-1">
                {factor.checkPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 重要なレースの例 */}
          {factor.importantRaces && factor.importantRaces.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-600" />
                このファクターが重要なレース
              </h4>
              <div className="flex flex-wrap gap-2">
                {factor.importantRaces.map((race, index) => (
                  <Badge key={index} variant="outline" className="text-gray-600">
                    {race}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* 注目馬リンク */}
          {factor.featuredHorses && factor.featuredHorses.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">注目馬</h4>
              <div className="flex flex-wrap gap-2">
                {factor.featuredHorses.map((horse, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="border-red-300 text-red-700 hover:bg-red-50"
                    asChild
                  >
                    <Link href={`/horses?search=${horse}`}>{horse}</Link>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
