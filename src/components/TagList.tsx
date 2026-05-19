import { getAllTags } from "@/lib/posts"
import TagBadge from "@/components/TagBadge"

type TagListProps = {
  /** 現在選択中のタグ（URL の `tag` クエリと照合） */
  activeTag?: string
}

export default async function TagList({ activeTag }: TagListProps) {
  const tags = await getAllTags()
  const normalized = activeTag?.trim()

  return (
    <nav className="mb-8 min-w-0" aria-label="タグで絞り込み">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Tags</p>
      <ul className="flex min-w-0 touch-pan-x gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible sm:pb-0">
        {tags.map((tag) => (
          <li key={tag} className="shrink-0">
            <TagBadge tag={tag} isActive={normalized === tag} />
          </li>
        ))}
      </ul>
    </nav>
  )
}
