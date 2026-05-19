type EyecatchImageProps = {
  /** アクセシビリティ用（記事タイトルを推奨） */
  title: string
  url: string
  /** LCP 改善のため一覧の先頭などで true */
  priority?: boolean
  sizes: string
  className?: string
  imageClassName?: string
}

/** アイキャッチ（1200×630）。任意 URL に対応するため img を使用 */
export default function EyecatchImage({
  title,
  url,
  priority = false,
  sizes: _sizes,
  className = "",
  imageClassName = "",
}: EyecatchImageProps) {
  void _sizes

  return (
    <div className={`relative aspect-[1200/630] w-full overflow-hidden bg-slate-900 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={title}
        className={`absolute inset-0 h-full w-full object-cover ${imageClassName}`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  )
}
