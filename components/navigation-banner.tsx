"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, BookOpen, Search, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"

interface NavigationBannerProps {
  currentPage?: string
}

export function NavigationBanner({ currentPage }: NavigationBannerProps) {
  const navigationItems = [
    {
      href: "/",
      icon: Calendar,
      title: "レース一覧",
      description: "今日のレース情報",
      color: "bg-red-500 hover:bg-red-600",
      isActive: currentPage === "home",
    },
    {
      href: "/my-entries",
      icon: Users,
      title: "出走表",
      description: "予想入力・管理",
      color: "bg-blue-500 hover:bg-blue-600",
      isActive: currentPage === "my-entries",
    },
    {
      href: "/factors",
      icon: BookOpen,
      title: "ファクター解説",
      description: "予想のポイント",
      color: "bg-green-500 hover:bg-green-600",
      isActive: currentPage === "factors",
    },
    {
      href: "/horses",
      icon: Search,
      title: "競走馬検索",
      description: "詳細条件で検索",
      color: "bg-purple-500 hover:bg-purple-600",
      isActive: currentPage === "horses",
    },
  ]

  return (
    <Card className="mb-6 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300">
      <CardContent className="py-4">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-red-600" />
          <h3 className="font-semibold text-gray-800">クイックナビゲーション</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {navigationItems.map((item) => {
            const Icon = item.icon

            if (item.isActive) {
              return (
                <div key={item.href} className="p-3 bg-gray-200 border-2 border-gray-400 rounded-lg opacity-60">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-600 text-sm">{item.title}</span>
                  </div>
                  <p className="text-xs text-gray-500">{item.description}</p>
                  <div className="text-xs text-gray-500 mt-1">現在のページ</div>
                </div>
              )
            }

            return (
              <Button
                key={item.href}
                variant="outline"
                className={`h-auto p-3 ${item.color} text-white border-0 hover:scale-105 transition-all duration-200`}
                asChild
              >
                <Link href={item.href}>
                  <div className="w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4" />
                      <span className="font-medium text-sm">{item.title}</span>
                      <ArrowRight className="w-3 h-3 ml-auto" />
                    </div>
                    <p className="text-xs opacity-90 text-left">{item.description}</p>
                  </div>
                </Link>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
