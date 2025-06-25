"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, Sun, Cloud, CloudRain, Wind, Navigation } from "lucide-react"
import type { RaceDetails } from "@/hooks/useRaceEntries"

interface RaceOverviewProps {
  race: RaceDetails
}

const getWeatherIcon = (weather: string) => {
  switch (weather) {
    case "晴":
      return <Sun className="w-4 h-4 text-yellow-500" />
    case "曇":
      return <Cloud className="w-4 h-4 text-gray-500" />
    case "雨":
      return <CloudRain className="w-4 h-4 text-blue-500" />
    case "強風":
      return <Wind className="w-4 h-4 text-gray-600" />
    default:
      return <Sun className="w-4 h-4 text-yellow-500" />
  }
}

const getTrackConditionColor = (condition: string) => {
  switch (condition) {
    case "良":
      return "bg-green-100 text-green-700 border-green-300"
    case "稍重":
      return "bg-yellow-100 text-yellow-700 border-yellow-300"
    case "重":
      return "bg-orange-100 text-orange-700 border-orange-300"
    case "不良":
      return "bg-red-100 text-red-700 border-red-300"
    default:
      return "bg-gray-100 text-gray-700 border-gray-300"
  }
}

const getWindSpeedColor = (speed: number) => {
  if (speed < 3) return "text-green-600"
  if (speed < 7) return "text-yellow-600"
  if (speed < 12) return "text-orange-600"
  return "text-red-600"
}

const getWindSpeedDescription = (speed: number) => {
  if (speed < 3) return "微風"
  if (speed < 7) return "軽風"
  if (speed < 12) return "中風"
  if (speed < 18) return "強風"
  return "暴風"
}

export function RaceOverview({ race }: RaceOverviewProps) {
  return (
    <Card className="mb-6 border-gray-300 bg-white">
      <CardHeader className="bg-gray-50 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-red-600" />
              {race.name}
            </CardTitle>
            <div className="flex items-center gap-4 mt-2 text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>
                  {race.date} {race.time}発走
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>大井競馬場</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {race.grade && (
              <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300 font-bold">
                {race.grade}
              </Badge>
            )}
            <Badge variant="outline" className="text-gray-700 border-gray-300">
              {race.distance}
            </Badge>
            <Badge variant="outline" className="text-gray-700 border-gray-300">
              {race.surface}
            </Badge>
            {race.purse && (
              <Badge variant="outline" className="text-gray-700 border-gray-300">
                {race.purse}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-4">
        <div className="grid grid-cols-2 md:grid-cols-8 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">天候:</span>
            <div className="flex items-center gap-1">
              {getWeatherIcon(race.weather)}
              <span className="font-medium">{race.weather}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">馬場:</span>
            <Badge variant="outline" className={getTrackConditionColor(race.track_condition)}>
              {race.surface}
              {race.track_condition}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">風向き:</span>
            <div className="flex items-center gap-1">
              <Navigation className="w-4 h-4 text-blue-600" />
              <span className="font-medium">{race.wind_direction || "無風"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">風速:</span>
            <div className="flex items-center gap-1">
              <Wind className="w-4 h-4 text-gray-600" />
              <span className={`font-medium ${getWindSpeedColor(race.wind_speed || 0)}`}>
                {race.wind_speed || 0}m/s
              </span>
              <span className="text-xs text-gray-500">({getWindSpeedDescription(race.wind_speed || 0)})</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">距離:</span>
            <span className="font-medium">{race.distance}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">出走:</span>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-gray-600" />
              <span className="font-medium">{race.entry_count}頭</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">発走:</span>
            <span className="font-medium">{race.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">開催:</span>
            <span className="font-medium">{race.date}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
