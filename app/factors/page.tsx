"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowLeft, ExternalLink, RefreshCw, AlertCircle } from "lucide-react"
import Link from "next/link"
import { NavigationBanner } from "@/components/navigation-banner"

export default function FactorsPage() {
  const [showNotionEmbed, setShowNotionEmbed] = useState(true) // デフォルトでNotion表示
  const [embedError, setEmbedError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // iFrame読み込み完了の処理
  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  // Notion埋め込みエラーハンドリング
  const handleEmbedError = () => {
    setEmbedError(true)
    setIsLoading(false)
  }

  // Notion表示をリトライ
  const handleRetry = () => {
    setEmbedError(false)
    setIsLoading(true)
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
              <BookOpen className="w-5 h-5 text-white" />
              <h1 className="text-xl font-bold">予想ファクター解説</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-20">
        {/* ナビゲーションバナー */}
        <NavigationBanner currentPage="factors" />

        {/* 表示切り替えボタン */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-800">予想ファクター解説</h3>
                <p className="text-sm text-blue-600">Notionで作成した詳細な解説をご覧いただけます</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notion埋め込み表示 */}
        <div className="mb-6">
          {!embedError ? (
            <div className="bg-white rounded-lg border border-gray-300 overflow-hidden shadow-lg">
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Notion埋め込みページ - 予想ファクター詳細解説
                </h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleRetry}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    再読み込み
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href="https://ordinary-loan-b3f.notion.site/ebd/1fde59628679807a893eeddc1161e4e5"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      新しいタブで開く
                    </a>
                  </Button>
                </div>
              </div>

              {/* ローディング表示 */}
              {isLoading && (
                <div className="flex items-center justify-center py-12 bg-gray-50">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Notionページを読み込み中...</p>
                  </div>
                </div>
              )}

              {/* iFrame埋め込み */}
              <iframe
                src="https://ordinary-loan-b3f.notion.site/ebd/1fde59628679807a893eeddc1161e4e5"
                width="100%"
                height="600"
                frameBorder="0"
                allowFullScreen
                title="予想ファクター解説 - Notion"
                className="w-full border-0"
                style={{
                  minHeight: "600px",
                  display: isLoading ? "none" : "block",
                }}
                onLoad={handleIframeLoad}
                onError={handleEmbedError}
              />
            </div>
          ) : (
            <Card className="border-yellow-300 bg-yellow-50">
              <CardContent className="py-8 text-center">
                <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Notionページの読み込みに失敗しました</h3>
                <p className="text-yellow-700 mb-4">
                  ページが見つからないか、アクセス権限がない可能性があります。
                  <br />
                  以下の方法をお試しください：
                </p>
                <div className="space-y-2 text-sm text-yellow-700 mb-6">
                  <p>• ページのURLが正しいか確認してください</p>
                  <p>• Notionページが公開設定になっているか確認してください</p>
                  <p>• ブラウザのセキュリティ設定を確認してください</p>
                </div>
                <div className="flex gap-2 justify-center">
                  <Button onClick={handleRetry} className="bg-yellow-600 hover:bg-yellow-700">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    再試行
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                    <a
                      href="https://ordinary-loan-b3f.notion.site/ebd/1fde59628679807a893eeddc1161e4e5"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Notionで直接開く
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
