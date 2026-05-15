import Link from "next/link"

type TagBadgeProps = {
  tag: string
  /** 現在の URL の `tag` と一致するときに強調表示 */
  isActive?: boolean
}

export default function TagBadge({ tag, isActive }: TagBadgeProps) {
  const href = isActive ? "/blog" : `/blog?tag=${encodeURIComponent(tag)}`

  return (
    <Link
      href={href}
      aria-current={isActive ? "true" : undefined}
      className={
        "inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-full border px-3 py-2 text-xs font-medium transition " +
        (isActive
          ? "border-cyan-400/70 bg-cyan-950/70 text-cyan-100 shadow-sm shadow-cyan-900/30"
          : "border-cyan-800/60 bg-cyan-950/40 text-cyan-300/95 hover:border-cyan-500/50 hover:bg-cyan-900/50 hover:text-cyan-100")
      }
    >
      {tag}
    </Link>
  )
}
