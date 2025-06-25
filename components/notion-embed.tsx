"use client"

interface NotionEmbedProps {
  url: string
  title?: string
  className?: string
}

export function NotionEmbed({ url, title = "Notion Page", className = "" }: NotionEmbedProps) {
  return (
    <iframe
      src={url}
      className={`w-full border-0 ${className}`}
      title={title}
      loading="lazy"
      allow="fullscreen"
      style={{
        minHeight: "100vh",
      }}
    />
  )
}
