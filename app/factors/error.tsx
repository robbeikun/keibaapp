"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-red-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-white hover:text-red-300">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">予想ファクター解説</h1>
          </div>
        </div>
      </header>

      {/* エラー表示 */}
      <div className="flex items-center justify-center p-4" style={{ height: "calc(100vh - 72px)" }}>
        <Card className="max-w-md w-full border-red-300 bg-red-50">
          <CardContent className="text-center py-8">
            <div className="text-red-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-red-800 mb-2">ページの読み込みに失敗しました</h2>
            <p className="text-red-600 text-sm mb-4">
              Notionページの表示中にエラーが発生しました。
              <br />
              しばらく時間をおいてから再度お試しください。
            </p>
            <div className="flex gap-2 justify-center">
              <Button onClick={reset} className="bg-red-600 hover:bg-red-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                再試行
              </Button>
              <Button variant="outline" className="border-red-300 text-red-700" asChild>
                <Link href="/">ホームに戻る</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
