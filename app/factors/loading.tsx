export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-red-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-red-400 rounded animate-pulse"></div>
            <div className="h-6 w-32 bg-red-400 rounded animate-pulse"></div>
          </div>
        </div>
      </header>

      {/* ローディング表示 */}
      <div className="flex items-center justify-center" style={{ height: "calc(100vh - 72px)" }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">ページを読み込み中...</p>
        </div>
      </div>
    </div>
  )
}
