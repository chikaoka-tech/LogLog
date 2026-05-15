import Image from "next/image"

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

/** アイキャッチ（1200×630）用。レイアウトシフト防止の固定比率 + `fill` */
export default function EyecatchImage({
  title,
  url,
  priority = false,
  sizes,
  className = "",
  imageClassName = "",
}: EyecatchImageProps) {
  return (
    <div className={`relative aspect-[1200/630] w-full bg-slate-900 ${className}`}>
      <Image
        src={url}
        alt={title}
        fill
        sizes={sizes}
        className={`object-cover ${imageClassName}`}
        priority={priority}
      />
    </div>
  )
}
