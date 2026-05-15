import { getAllTags } from "@/lib/posts"
import TagBadge from "@/components/TagBadge"

type TagListProps = {
  /** 現在選択中のタグ（URL の `tag` クエリと照合） */
  activeTag?: string
}

export default function TagList({ activeTag }: TagListProps) {
  const tags = getAllTags()
  const normalized = activeTag?.trim()

  return (
    <nav className="mb-8" aria-label="タグで絞り込み">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Tags</p>
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag}>
            <TagBadge tag={tag} isActive={normalized === tag} />
          </li>
        ))}
      </ul>
    </nav>
  )
}
