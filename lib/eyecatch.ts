import type { Blog } from "@/lib/types"

const EYECATCH_WIDTH = 1200
const EYECATCH_HEIGHT = 630

/** slug ベースのデフォルト画像（picsum） */
export function defaultEyecatchUrl(slug: string): string {
  return `https://picsum.photos/seed/${encodeURIComponent(slug)}/${EYECATCH_WIDTH}/${EYECATCH_HEIGHT}`
}

export function resolveEyecatch(slug: string, eyecatchUrl?: string | null): Blog["eyecatch"] {
  const trimmed = eyecatchUrl?.trim()
  const url = trimmed || defaultEyecatchUrl(slug)
  return {
    url,
    width: EYECATCH_WIDTH,
    height: EYECATCH_HEIGHT,
  }
}
