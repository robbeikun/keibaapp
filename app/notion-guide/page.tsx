"use client"

import { ArrowLeft, ExternalLink, BookOpen, Zap } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function NotionGuidePage() {
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
              <h1 className="text-xl font-bold">Notion連携ガイド</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-20">
        {/* 説明セクション */}
        <Card className="mb-8 bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Zap className="w-8 h-8" />
              Notionページの埋め込み機能
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-100 text-lg">
              競馬予想に関する詳細な解説記事をNotionで管理し、リアルタイムでWebサイトに反映させています。
              <br />
              編集はNotionで行い、即座にサイトに反映されるため、常に最新の情報をお届けできます。
            </p>
          </CardContent>
        </Card>

        {/* 機能説明 */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-gray-300">
            <CardHeader>
              <CardTitle className="text-red-700">リアルタイム更新</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Notionで記事を編集すると、即座にWebサイトに反映されます。キャッシュの更新を待つ必要がありません。
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 記事の追加・編集が即座に反映</li>
                <li>• 画像やテーブルもそのまま表示</li>
                <li>• Notionの豊富な機能を活用</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-gray-300">
            <CardHeader>
              <CardTitle className="text-red-700">使いやすいインターface</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Notionの直感的なエディターで、競馬予想に関する詳細な解説を作成できます。
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• マークダウン記法対応</li>
                <li>• 表やグラフの挿入が簡単</li>
                <li>• 画像の貼り付けも直感的</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* アクションボタン */}
        <div className="mt-8 text-center">
          <div className="flex gap-4 justify-center">
            <Button className="bg-red-600 hover:bg-red-700" asChild>
              <Link href="/factors">
                <BookOpen className="w-4 h-4 mr-2" />
                ファクター解説を見る
              </Link>
            </Button>
            <Button variant="outline" className="border-red-300 text-red-700" asChild>
              <a
                href="https://ordinary-loan-b3f.notion.site/1fde59628679807a893eeddc1161e4e5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Notionで直接見る
              </a>
            </Button>
          </div>
        </div>

        {/* 注意事項 */}
        <Card className="mt-8 bg-gray-200 border-gray-400">
          <CardHeader>
            <CardTitle className="text-gray-800">ご注意</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>• Notionページの読み込みには数秒かかる場合があります。</p>
              <p>• インターネット接続が不安定な場合、表示に時間がかかることがあります。</p>
              <p>• モバイル端末では、Notionの一部機能が制限される場合があります。</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
